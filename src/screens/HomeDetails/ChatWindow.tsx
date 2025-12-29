import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    Pressable,
    Share,
    useColorScheme,
    ImageBackground,
    Alert,
    PermissionsAndroid,
} from "react-native";
import FastImage from "react-native-fast-image";
import Feather from "react-native-vector-icons/Feather";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, Fonts } from "../../styles";
import CallTab from "../../assets/icons/CallTab";
import RemediesTab from "../../assets/icons/RemediesTab";
import SearchIcon from "../../assets/icons/SearchIcon";
import { BackIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
// import { socket } from '../../../socket';
import RateAstrologerModal from "../../utils/RateAstrologerModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ms, requestCameraPermission, requestGalleryPermission, StarRating, useCountdown } from "../../constant/Helper";
import { AppSpinner } from "../../utils/AppSpinner";
import { addReviewApi, createOrderApi, deleteChatMessageAction, endChatApi, forceEndChatApi, getBalance, getChatDetails, getPanditChatMessages, sendMessageApi, sendMessageAudioApi } from "../../redux/actions/UserActions";
import moment from "moment";
import { ServiceConstants } from "../../services/ServiceConstants";
import { decryptData, secretKey } from "../../services/requests";
import { CustomDialogManager2 } from "../../utils/CustomDialog2";

import AttachmentModal from "../../utils/AttachmentModal";
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import { AudioMessage } from "../../utils/AudioMessage";
import AudioRecorderBar from "../../utils/AudioRecorderBar";
import { AudioEncoderAndroidType, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, createSound } from "react-native-nitro-sound";
import { useSocket } from "../../socket/SocketProvider";
import OrderDetailsCard from "../../utils/OrderDetailsCard";
import { MessageContextMenu } from "../../utils/MessageContextMenu";
import { OrderSeparator } from "../../utils/OrderSeparator";
import { defaultProfile } from "../../constant/AppConst";
import { MessageStatus } from "../../utils/MessageStatus";
import ProfileSelector from "./ProfileSelector";
import { removeWaitListItemOrder } from "../../redux/slices/waitListSlice";
import { ReviewSeparator } from "../../utils/ReviewSeparator";
import { setUserDetails } from "../../redux/slices/userDetailsSlice";

type Message = {
    id: string;
    sender_type: string;
    message: any;
    created_at: string;
    images?: string[];
    type: string;
    duration?: number;
    order_id:string;
    sender_delete:boolean;
    receiver_delete:boolean;
    status:string;
    is_system_generate:boolean;
};
const { width } = Dimensions.get("window");

export default function ChatWindow({ route }: any) {

    const { astrologerId, orderId , isCompleted} = route.params;
    const navigation = useNavigation<any>();
    const colorScheme = useColorScheme();
    const {sendEvent, onEvent,isConnected } = useSocket();
      //Recording Audio
    const soundRef = useRef(createSound());
    const [recordingPath, setRecordingPath] = useState('');
    const [recordPosition, setRecordPosition] = useState(0);
    const [isRecordLoading, setIsRecordLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isStopLoading, setIsStopLoading] = useState(false);
    const [pauseRecord, setPauseRecord] = useState(false);
    const dispatch = useDispatch();


    // const [isConnected, setIsConnected] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [showRateModal, setShowRateModal] = useState(false);
    const [text, setText] = useState("");
    const flatRef = useRef<FlatList>(null);
    const [isChatEnded, setIsChatEnded] = useState(false);
    const userDetailsData = useSelector((state: RootState) => state.userDetails.userDetails);
    const [messages1, setMessages1] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [activity, setActivity] = useState<boolean>(false);
    const BG = require("../../assets/images/chat_pattern_bg.png");
    const [ratingStar, setRatingStar] = useState(0);
    const [message, setMessage] = useState("");
    const [panditName, setPanditName] = useState("Astrologer");
    const link_web = 'https://astrotalkguruji.store';
    const [avatarUri, setAvatarUri] = useState("");
    const [showAttachment, setShowAttachment] = useState(false);
    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const DEFAULT_AVATAR = require('../../assets/images/AquariusProfilePic.png');
    const [typingUser, setTypingUser] = useState(false);
    const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
    const isLayoutChangingRef = useRef(false);
    const [panditDetail, setPanditDetail] = useState<any>();
    const [endTime, setEndTime] = useState('');
    const [showOrderCard, setShowOrderCard] = useState(false);
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number } | null>(null);
    const [selectedItem, setSelectedItem] = useState<any>({});
    const MENU_WIDTH = 140;
    const { width: SCREEN_WIDTH } = Dimensions.get('window');
    const EDGE_PADDING = 12;
    const [profileSelector, setProfileSelector] = useState(false);
    const [selectedName, setSelectedName] = useState<string>(""); 
    const [isLowBalance, setLowBalance] = useState(false);
    const SHOW_LOW_BALANCE_AT = 120; // 2 minutes
    const [selectedAmount, setSelectedAmount] = useState('100');
    const isLowBalanceRef = useRef(false);
    const [refreshRowId, setRefreshRowId] = useState<string | null>(null);
  
useEffect(() => {
  if (isRecording) {
    isLayoutChangingRef.current = true;
  } else {
    // small delay to let layout settle
    setTimeout(() => {
      isLayoutChangingRef.current = false;
    }, 300);
  }
}, [isRecording]);

    const loadMore = () => {
        if (isLayoutChangingRef.current) {
            console.log('⛔ Skipping pagination due to layout change');
            return;
        }
        if (!loadingMore) {
            setPage(prev => prev + 1);
        }
    };
    useEffect(() => {
        callChatMessagesApi();
    }, [page]);

    const callChatMessagesApi = () => {
        setActivity(false);
        getPanditChatMessages(astrologerId, page).then(response => {
            setActivity(false);
            console.log("Chat Messages response ==>" + (response) + "page no:-" + page);
            const result = JSON.parse(response);
            if (result.success === true) {
                const messages = (result.data.results);
                if (messages.length == 0) {
                    setLoadingMore(false);
                }
                
                setMessages1(prev => [...prev, ...messages]);
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
                console.log("Chat Messages Error response ==>" + JSON.stringify(result3));

            }

        });
    }

    useEffect(() => {

        callChatDetailsApi();
    }, []);


     

    const callChatDetailsApi = () => {
        // Alert.alert("ChatWindow Pandit ID="+astrologerId);
        getChatDetails(astrologerId,orderId).then(response => {
            setActivity(false);
            console.log("Chat Details response ==>" + (response));
            const result = JSON.parse(response);
            if (result.success === true) {
              
              setSelectedName(result.name);
             
                setPanditDetail(result.data);
                setAvatarUri(result.data.profile);
                setPanditName(result.data.name);
                setIsOnline(result.data.isOnline);
                setEndTime(result.data.endTime);
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
                console.log("Chat Details Error ==>" + JSON.stringify(result3));
                CustomDialogManager2.show({
                    title: 'Alert',
                    message: result3.message,
                    type: 2,
                    buttons: [
                        {
                            text: 'Ok',
                            onPress: () => {

                            },
                            style: 'default',
                        },
                    ],
                });

            }

        });
    }

    const callSendMessagesApi = (isUploadImage: any) => {
        sendMessageApi(selectedImages, text, orderId, isUploadImage).then(response => {
            setActivity(false);
            console.log("Send Messages response ==>" + response);
            const result = JSON.parse(response);
            if (result.success === true) {
                   if (Array.isArray(result.data)) {
                        // ✅ msg is an array of messages
                        result.data.forEach((m:any) => {
                            addMessage(m);
                        });
                    } else if (result.data && typeof result.data === 'object') {
                        // ✅ msg is a single message object
                        addMessage(result.data);
                    }
                sendMessage();
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
                console.log("Send Messages Error response ==>" + JSON.stringify(result3));
                CustomDialogManager2.show({
                    title: 'Alert',
                    message: result3.message,
                    type: 2,
                    buttons: [
                        {
                            text: 'Ok',
                            onPress: () => {

                            },
                            style: 'default',
                        },
                    ],
                });

            }
        });
    }

    const callSendAudioApi = (audioFile: any) => {
        sendMessageAudioApi(audioFile, orderId).then(response => {
            setActivity(false);
            // console.log("Send Messages response ==>" + response);
            const result = JSON.parse(response);
            if (result.success === true) {
                // console.log("Send Messages response ==>" + JSON.stringify(result));
                // addMessage(result.data);
                   if (Array.isArray(result.data)) {
                        // ✅ msg is an array of messages
                        result.data.forEach((m:any) => {
                            addMessage(m);
                        });
                    } else if (result.data && typeof result.data === 'object') {
                        // ✅ msg is a single message object
                        addMessage(result.data);
                    }
                // sendMessage();
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
                console.log("Send Messages Error response ==>" + JSON.stringify(result3));
                CustomDialogManager2.show({
                    title: 'Alert',
                    message: result3.message,
                    type: 2,
                    buttons: [
                        {
                            text: 'Ok',
                            onPress: () => {

                            },
                            style: 'default',
                        },
                    ],
                });

            }
        });
    }

    const endOrderChatApi = () => {

    }

    const addMessage = (msg: any) => {
        const newMsg: Message = {
            id: msg.id,
            sender_type: msg.sender_type,
            message: msg.message,
            created_at: msg.created_at,
            type: msg.type,
            order_id:msg.order_id,
            sender_delete:msg.sender_delete,
            receiver_delete:msg.receiver_delete,
            status:msg.status,
            is_system_generate:msg.is_system_generate,
        };

        setMessages1(prev => [newMsg, ...prev]);
    };

    


useEffect(() => {
    // if (!astrologerId || !ServiceConstants.User_ID || !orderId) return;

    onEvent('typing', (data) => {
       
      setTypingUser(true);
    });

    onEvent('stop_typing', (data) => {
    //   setIsTypingUS(false);
      setTypingUser(false);
    });

    onEvent('receive_message', (msg) => {
        if (Array.isArray(msg)) {
            // ✅ msg is an array of messages
            msg.forEach((m) => {
                addMessage(m);
            });
        } else if (msg && typeof msg === 'object') {
            // ✅ msg is a single message object
            addMessage(msg);
        }
    });

    onEvent('offline_pandit', (data) => {
      setPanditDetail({ ...panditDetail, isOnline: false });
    });

    onEvent('online_pandit', (data) => {
      setPanditDetail({ ...panditDetail, isOnline: true });
    });

    return () => {
      sendEvent('stop_typing', {
        orderId,
        id: astrologerId,
        user_type: 'pandit',
        type: 'message'
      });
    };
  }, []);




    // typing handlers
    let typingTimer: any;
    function handleTyping(val: any) {
        setText(val);
        if (!isConnected) return;
        // STOP typing when input empty
        if (!val.trim()) {
            // socket.emit(`stop_typing`, {
            //     orderId: orderId,
            // });
            sendEvent('stop_typing', {
                orderId,
                type: 'message'
            });
            return;
        }

        // socket.emit(`typing`, {
        //     orderId: orderId,
        // });
        sendEvent('typing', {
            orderId,
            type: 'message'
        });
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            // socket.emit(`stop_typing`, {
            //     orderId: orderId,
            // });
            sendEvent('stop_typing', {
                orderId,
                type: 'message'
            });
        }, 5000);

    }


    const sendMessage = useCallback(() => {
        if (!text.trim()) return;
        setText("");
        // scroll to end
        setTimeout(() => {
            flatRef.current?.scrollToOffset({
                offset: 0,
                animated: true,
            });
        }, 100);
    }, [text]);

    const endChat = () => {
        callEndChat();
    };
    const startChat = () => {
        setIsChatEnded(false);
        setMessages1(prev => [
            ...prev,
            {
                id: `system_${orderId}`,
                sender_type: "system",
                message: "You started the chat",
                created_at: new Date().toISOString()
            } as any,
        ]);
    };

    const ImageGrid = ({
        images,
        isUser,
    }: {
        images: string[];
        isUser: boolean;
    }) => {
        const max = 5;
        const displayImages = images.slice(0, max);
        const extra = images.length - max;

        return (
            <View style={[
                styles.imageGrid,
                isUser ? styles.alignRight : styles.alignLeft
            ]}>
                {displayImages.map((uri, index) => {
                    const isLast = index === max - 1 && extra > 0;

                    return (
                        <View key={index} style={styles.imageWrapper}>
                            <FastImage source={{ uri }} style={styles.chatImage} 
                            resizeMode={FastImage.resizeMode.contain}/>

                            {isLast && (
                                <View style={styles.overlay}>
                                    <Text style={styles.overlayText}>+{extra}</Text>
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        );
    };



    const renderMessage = ({ item ,index}: { item: Message, index: number}) => {
        const shouldRefresh = item.id === refreshRowId;
        const prevItem = messages1[index+1];
        const currentOrderId = item?.order_id ?? null;
        const prevOrderId = prevItem?.order_id ?? null;
        const isNewOrder = currentOrderId !== prevOrderId;

        const nextItem = messages1[index-1];
        const nextOrderId = nextItem?.order_id ?? null;
        const isOrderCompleted =
            currentOrderId && currentOrderId !== nextOrderId;

        if((item as any).sender_type === "system") {
            const formatted = moment(new Date()).format("HH:mm");
            return (
                <View style={styles.systemRow}>
                    <Text style={styles.systemText}>{item.message}</Text>
                    <Text style={styles.systemTime}>{formatted}</Text>
                </View>
            );
        }


        if(item.type==='recharge'){
            const amountNum = Number(selectedAmount) || 0;
            const gst = +(amountNum * 0.18).toFixed(2);
            const payableAmount = +(amountNum + gst).toFixed(2);
            return(
                <View style={styles.lowBalanceCard}>
  <Text style={styles.lowBalanceText}>
    Low balance! Recharge to continue this chat
  </Text>

  {/* Amount buttons */}
  <View style={styles.amountRow}>
    {['50', '100', '200'].map((amt) => {
      const selected = amt === selectedAmount;
      return (
        <TouchableOpacity
          key={amt}
          onPress={() => setSelectedAmount(amt)}
          style={[
            styles.amountBox,
            selected && styles.amountBoxSelected,
          ]}
        >
          <Text
            style={[
              styles.amountText,
              selected && styles.amountTextSelected,
            ]}
          >
            ₹ {amt}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>

  {/* Bill Row */}
  <View style={styles.billRow}>
    <View>
      <Text style={styles.totalBillText}>Total Bill ₹ {payableAmount}</Text>
      <Text style={styles.taxText}>Incl. all Taxes</Text>
    </View>

    <View style={styles.payUsingRow}>
      <Text style={styles.payUsingText}>PAY USING</Text>
      <Text style={styles.upiText}>UPI ▾</Text>
    </View>
  </View>

  {/* Recharge Button */}
  <TouchableOpacity style={styles.rechargeBtn} onPress={()=>{
       navigation.push("PaymentDetailsScreen", {
              amount: amountNum,
              extra: "100",
            });
  }}>
    <Text style={styles.rechargeBtnText}>Recharge Now</Text>
  </TouchableOpacity>
</View>

            );
        }

    

        const isUser = item.sender_type === "user"
        const formatted = moment(item.created_at).format("HH:mm");
        const isDeleted =
  item.sender_delete || (!isUser && item.receiver_delete);

        if (item.type === 'audio') {
            return (
            <Pressable key={`${item.id}-${shouldRefresh}`} onLongPress={(e)=>{
                    if(!isDeleted){
                        setSelectedItem(item);
                        const { pageX, pageY } = e.nativeEvent;
                        let xPos: number;
                        if (isUser) {
                            // Left bubble → open menu to RIGHT
                            xPos = pageX + MENU_WIDTH;
                        } else {
                            // Right bubble → open menu to LEFT
                            xPos = pageX + MENU_WIDTH;
                        }

                        const safeX = Math.max(
                            EDGE_PADDING,
                            Math.min(xPos, SCREEN_WIDTH - MENU_WIDTH - EDGE_PADDING)
                        );
                        setContextMenuPos({
                        x: safeX,
                        y: pageY,
                        });
                       
                        setShowContextMenu(true);
                    }}}>

           
            {/* 🔹 Show Order Card when order changes */}
            {isNewOrder && (
                <OrderSeparator
                    orderId={item.order_id}
                    dateAt={item.created_at}
                    onPress={() => {
                    console.log('Order separator pressed', item.order_id);
                    }}
                    onInfoPress={() => {
                        setSelectedItem(item);
                        setShowOrderCard(true);

                    }}
                />
                )}
            <View style={[styles.msgRow, isUser ? styles.rowRight : styles.rowLeft]}>
                {!isUser && (
                <FastImage source={{ uri: avatarUri }} style={styles.msgAvatar} />
                )}

                {!isDeleted && <AudioMessage
                    audioId={item.id}
                    uri={item.message}
                    isUser={isUser}
                    activeAudioId={activeAudioId}
                    onRequestPlay={(id) => setActiveAudioId(id)}
                    />}

     { isDeleted  ? (<View style={[styles.msgBubble, isUser ? styles.bubbleUser : styles.bubbleAgent]}>
                    <Text style={[styles.msgText, isUser ? styles.msgTextUser : styles.msgTextAgent,isDeleted && styles.deletedText,item.is_system_generate && styles.deletedText]}>{isDeleted?"You deleted this message.":item.message}</Text>
                    
                    <View style={{flexDirection:'row',alignSelf: "flex-end"}}>
                    <Text style={styles.msgTime}>{formatted}</Text>
                     {isUser && <View style={{marginLeft:6,marginBottom:-6}}><MessageStatus message={"sent"} /></View>}
                     </View>
                </View>) : null}



                {isUser && <View style={{ width: 46, }} >
                        <FastImage
                            source={{uri:defaultProfile}}
                            style={styles.msgAvatarUser} />
                    </View>}
            </View>

                       {/* Review & Rating */}
            {isOrderCompleted && index!=0 &&(
                 <ReviewSeparator
                    orderId={item.order_id}
                    onPress={() => {
                    console.log('Review separator pressed', item.order_id);
                    }}
                    onEdit={() => {

                        setSelectedItem(item);
                        setShowRateModal(true);
                    }}
                />
            )}  
            </Pressable>
            );
        }


        return (
        <View key={`${item.order_id}-${shouldRefresh}`}>


            {/* 🔹 Show Order Card when order changes */}
            {isNewOrder && (
                <OrderSeparator
                    orderId={item.order_id}
                    dateAt={item.created_at}
                    onPress={() => {
                    console.log('Order separator pressed', item.order_id);
                    }}
                    onInfoPress={() => {
                        setSelectedItem(item);
                        setShowOrderCard(true);
                    }}
                />
                )}
            <Pressable 
            style={[styles.msgRow, isUser ? styles.rowRight : styles.rowLeft]} onLongPress={(e)=>{
                    if(!isDeleted){
                        setSelectedItem(item);
                        const { pageX, pageY } = e.nativeEvent;
                        let xPos: number;
                        if (isUser) {
                            // Left bubble → open menu to RIGHT
                            xPos = pageX + MENU_WIDTH;
                        } else {
                            // Right bubble → open menu to LEFT
                            xPos = pageX + MENU_WIDTH;
                        }

                        const safeX = Math.max(
                            EDGE_PADDING,
                            Math.min(xPos, SCREEN_WIDTH - MENU_WIDTH - EDGE_PADDING)
                        );
                        setContextMenuPos({
                        x: safeX,
                        y: pageY,
                        });
                       
                        setShowContextMenu(true);
                    }}}>
                {!isUser && (
                    <FastImage source={{ uri: avatarUri }} style={styles.msgAvatar} />
                )}

                {item.type == "image" && (
                    <ImageGrid images={[item.message]} isUser={isUser} />
                )}

                {item.type == 'text' && item.message ? (<View style={[styles.msgBubble, isUser ? styles.bubbleUser : styles.bubbleAgent]}>
                    <Text style={[styles.msgText, isUser ? styles.msgTextUser : styles.msgTextAgent,isDeleted && styles.deletedText,item.is_system_generate && styles.deletedText]}>{isDeleted?"You deleted this message.":item.message}</Text>
                    
                    <View style={{flexDirection:'row',alignSelf: "flex-end"}}>
                    <Text style={styles.msgTime}>{formatted}</Text>
                     {isUser && <View style={{marginLeft:6,marginBottom:-6}}><MessageStatus message={"sent"} /></View>}
                     </View>
                </View>) : null}

                {isUser && (
                    <View style={{ width: 46, }} >
                        <FastImage
                            //  source={dummyUri ? { uri: dummyUri } : DEFAULT_AVATAR}
                            source={{uri:defaultProfile}}
                            defaultSource={DEFAULT_AVATAR}
                            style={styles.msgAvatarUser} />
                    </View>
                )}

                
            </Pressable>
            
            {/* Review & Rating */}
            {isOrderCompleted && index!=0 &&(
            <ReviewSeparator
                    orderId={item.order_id}
                    onPress={() => {
                    console.log('Review separator pressed', item.order_id);
                    }}
                    onEdit={() => {
                        setSelectedItem(item);
                        setShowRateModal(true);
                    }}
                />
            )}
    
            </View>
        );
    };

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `${link_web}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with activity type:', result.activityType);
                } else {
                    console.log('Shared successfully');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error sharing referral code:', error);
        }
    }

    const handleBack = () => {
        // socket.emit(`go_offline`, {
        //     orderId: orderId,
        //     // from_type: "user", from_id: ServiceConstants.User_ID,
        //     // to_type: "pandit", to_id:astrologerId
        // });
        navigation.goBack();
    }

    const onSubmitRating = (data: any) => {
        console.log("Review Data → ", data);
        // setMessage(data.review);
        // setRatingStar(data.rating);
        
    addReviewApi(astrologerId, data.review, data.data.order_id, data.rating).then(response => {
            setActivity(false);
            console.log("Send Messages response ==>" + response);
            const result = JSON.parse(response);
            if (result.success === true) {
                setRefreshRowId(null);
                setTimeout(() => {
                setRefreshRowId(selectedItem.id);
                }, 0);
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
                console.log("Send Messages Error response ==>" + JSON.stringify(result3));
                CustomDialogManager2.show({
                    title: 'Alert',
                    message: result3.message,
                    type: 2,
                    buttons: [
                        {
                            text: 'Ok',
                            onPress: () => {

                            },
                            style: 'default',
                        },
                    ],
                });

            }
        });

    };

  const requestPermissions = async () => {
    if (Platform.OS !== 'android') return true;
    const sdk = Platform.Version as number;
    if (sdk >= 33) {
      const res = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      return res === PermissionsAndroid.RESULTS.GRANTED;
    }
    const grants = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
    return (
      grants['android.permission.RECORD_AUDIO'] ===
      PermissionsAndroid.RESULTS.GRANTED
    );
  };
  const onStartRecord = async () => {
    if (!(await requestPermissions())) {
      Alert.alert('Permission required', 'Microphone permission needed');
      return;
    }
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: 'aac' as const,
      AVModeIOS: 'measurement' as const,
    };
    try {
      setIsRecordLoading(true);
    //   setLoadingMessage('Loading...');
      const uri = await soundRef.current.startRecorder(
        undefined,
        audioSet,
        true
      );
      setRecordingPath(uri);
      setIsRecording(true);
      setRecordPosition(0);
    } catch (e) {
      Alert.alert('Start record error', String(e));
    } finally {
      setIsRecordLoading(false);
    }

    // Subscribe
    soundRef.current.addRecordBackListener((e) => {
      setIsRecording(e.isRecording ?? true);
      setRecordPosition(e.currentPosition ?? 0);
    });
  };

  const pauseRecording = async () =>{
    if(pauseRecord){
        setPauseRecord(false);
        soundRef.current.resumeRecorder();
    }else{
        setPauseRecord(true);
        soundRef.current.pauseRecorder();
    }
  }
 

  const resetRecorderUI = () => {
  // recording flags
  setIsRecording(false);
  setPauseRecord(false);
  setRecordPosition(0);
  setRecordingPath('');

  // stop listeners safely
  try {
    soundRef.current.removeRecordBackListener();
  } catch {}

  // allow layout changes again
  setTimeout(() => {
    isLayoutChangingRef.current = false;
  }, 300);
};

const onCancelRecord = async () => {
  try {
    await soundRef.current.stopRecorder();
  } catch {}
  finally {
    resetRecorderUI(); // ✅ SAME RESET
  }
};

  const onStopRecord = async () => {
    try {
    const path = await soundRef.current.stopRecorder();

    const audioPath =
      Platform.OS === 'android' ? path : recordingPath;
        const audioFile = {
            uri: audioPath,
            name: `audio_${Date.now()}.mp4`,
            type: 'audio/mpeg',
        };
        callSendAudioApi(audioFile);

    // 🔥 Optimistic UI
    // setMessages1(prev => [
    //   {
    //     id: String(Date.now()),
    //     sender_type: 'user',
    //     message: audioPath,
    //     type: 'audio',
    //     created_at: new Date().toISOString(),
    //   },
    //   ...prev,
    // ]);

    } catch (e) {
      Alert.alert('Stop record error', String(e));
    } finally {
        resetRecorderUI();
    }
  };





    const handleCameraImagePick = async () => {
        const granted = await requestCameraPermission();
        if (!granted) return;
setTimeout(async () => {
        try {
            const image = await ImagePicker.openCamera({
                cropping: true,
                freeStyleCropEnabled: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
            });

            if (image?.path) {
                const optimized = await ImageResizer.createResizedImage(
                    image.path,
                    800,
                    800,
                    'JPEG',
                    70
                );

                const file = {
                    uri: optimized.uri,
                    name: `image_${Date.now()}.jpg`,
                    type: 'image/jpeg',
                };

                setSelectedImages([file]);
                console.log('Selected image:', file);
            }
        } catch (error) {
            console.log('Camera cancelled or failed:', error);
        }
         }, 600); // 👈 REQUIRED on iOS
    };
    const handleGalleryImagePick = async () => {
        const granted = await requestGalleryPermission();
        if (!granted) return;
setTimeout(async () => {
        try {
            const images = await ImagePicker.openPicker({
                cropping: true,
                freeStyleCropEnabled: true,
                compressImageQuality: 0.8,
                mediaType: 'photo',
                multiple: true,          // 👈 enable multiple selection
                maxFiles: 5,
            });

            const processedImages = await Promise.all(
                images.map(async (img: any, index: number) => {
                    const resized = await ImageResizer.createResizedImage(
                        img.path,
                        200,
                        200,
                        'JPEG',
                        70
                    );

                    return {
                        uri: resized.uri,
                        name: `image_${index}.jpg`,
                        type: 'image/jpeg',
                    };
                })
            );
            setSelectedImages(processedImages);
        } catch (error) {
            console.log('Gallery cancelled or failed:', error);
        }
          }, 600); // 👈 REQUIRED on iOS
    };

    useEffect(() => {
        if (selectedImages.length > 0) {
            callSendMessagesApi(true);
        }
    }, [selectedImages]);

    const handleAttachmentSelect = (type: string) => {
        setShowAttachment(false);

        switch (type) {
            case "camera":
                console.log("Open Camera");
                handleCameraImagePick();
                break;
            case "gallery":
                console.log("Open Gallery");
                handleGalleryImagePick();
                break;
            case "audio":
                console.log("Record Audio");
                onStartRecord();
                break;
            case "video":
                console.log("Pick Video");
                break;
            case "document":
                console.log("Pick Document");
                break;
        }
    };




 const {remainingSeconds, secondsLeft} = useCountdown(endTime, () => {
    console.log("⏰ Chat finished");
    setTimeout(() => {
    setIsChatEnded(true);
    callForceEndChat();
    }, 2000);
});
useEffect(() => {
    const showLowBalance = secondsLeft > 0 && secondsLeft <= SHOW_LOW_BALANCE_AT;
    if(showLowBalance){
        setLowBalance(true);
        if(!isLowBalanceRef.current){
            isLowBalanceRef.current=true;
        setMessages1((p) => [
        {
            id: `low_balance_${orderId}`,
            type:'recharge',
            created_at: new Date().toISOString()
        } as any,...p
    ]);
        }
   
    }
}, [secondsLeft]);


    const callForceEndChat = () => {
        forceEndChatApi(orderId).then(response => {
            setActivity(false);
            // console.log("End Chat Messages response ==>" + response);
            const result = JSON.parse(response);
            if (result.success === true) {
                dispatch(removeWaitListItemOrder(orderId));
                setIsChatEnded(true);
                setMessages1((p) => [
                    {
                        id: Date.now(),
                        sender_type: "system",
                        message: "You ended the chat",
                        created_at: new Date().toISOString()
                    } as any,...p
                ])

                 callBalance();
                // console.log("End Chat Messages response ==>" + JSON.stringify(result));
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
                console.log("End Chat Error response ==>" + JSON.stringify(result3));
                CustomDialogManager2.show({
                    title: 'Alert',
                    message: result3.message,
                    type: 2,
                    buttons: [
                        {
                            text: 'Ok',
                            onPress: () => {

                            },
                            style: 'default',
                        },
                    ],
                });
            }
        });
    }

    const callEndChat = () => {

        endChatApi(orderId).then(response => {
            setActivity(false);
            // console.log("End Chat Messages response ==>" + response);
            const result = JSON.parse(response);
            if (result.success === true) {
                dispatch(removeWaitListItemOrder(orderId));
               
                setIsChatEnded(true);
                setMessages1((p) => [
                    
                    {
                        id: Date.now(),
                        sender_type: "system",
                        message: "You ended the chat",
                        created_at: new Date().toISOString()
                    } as any,...p
                ]);
                callBalance();
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
                console.log("End Chat Error response ==>" + JSON.stringify(result3));
                CustomDialogManager2.show({
                    title: 'Alert',
                    message: result3.message,
                    type: 2,
                    buttons: [
                        {
                            text: 'Ok',
                            onPress: () => {

                            },
                            style: 'default',
                        },
                    ],
                });
            }
        });

    }

    const callBalance =()=>{
      getBalance().then(response => {
        const result = JSON.parse(response);
        dispatch(setUserDetails(result.data));
      });
    }
    const callDeleteChatMessage = () =>{
            deleteChatMessageAction(selectedItem.id).then(response => {
                console.log("Delete Messages response ==>" + (response));
                const result = JSON.parse(response);
                if (result.success === true) {
            
                setMessages1(prevMessages =>
                    prevMessages.map(msg =>
                        msg.id === selectedItem.id
                        ? {
                            ...msg,
                            sender_delete: true,
                            message: 'You deleted this message.',
                            }
                        : msg
                    )
                    );
                } else if (result.success === false) {
                    const result2 = decryptData(result.error, secretKey);
                    const result3 = JSON.parse(result2);
                    console.log("Delete Messages Error response ==>" + JSON.stringify(result3));

                }
            });
    }

    const createOrderChatApi=(astrologerId:any,profileId:any)=>{
        createOrderApi(astrologerId,profileId,"chat").then(response => {
        setActivity(false);
        console.log("Create Order response ==>" +response);
        const result = JSON.parse(response);
        if(result.success===true){
            navigation.goBack(); 
        }else{
            const result2 = decryptData(result.error,secretKey);
            const result3 = JSON.parse(result2);
            console.log("Create Messages Error response ==>" +JSON.stringify(result3));
          
            CustomDialogManager2.show({
                title: 'Alert',
                message: result3.message,
                type:2,
                buttons: [
                  {
                    text: 'Ok',
                    onPress: () => {
                        if(ServiceConstants.User_ID==null){
                          navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'AuthStack' }]
                                      });
                        }else{
                          navigation.push("OrderHistoryScreen");
                        }         
                    },
                    style: 'default',
                  },
                ],
              });
        }
        
      });
    }    
const handleCloseProfile = ()=>{
  setProfileSelector(false);
}
const handleStartChat = (item:any)=>{
  setProfileSelector(false);
  createOrderChatApi(astrologerId,item.id);
}

    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.safe} edges={['top']}>
                <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
               
                    {/* Header */}
                    <View style={styles.header}>

                        <TouchableOpacity style={styles.backBtn}>
                            <BackIcon size={16} onPress={handleBack} tintColor={undefined} />
                        </TouchableOpacity>

                        {/* Profile Image wrapper */}
                        <TouchableOpacity style={styles.profileWrapper} onPress={() => { }}>
                            <FastImage
                                source={{ uri: avatarUri }}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>

                        <View style={styles.headerTitle}>
                            <Text style={styles.headerName}>{panditName}</Text>
                            <Text style={styles.headerStatus}>{isOnline ? "Online" : "Offline"}</Text>
                            <Text style={styles.headerStatus}>{isChatEnded?"":remainingSeconds}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => { }} style={{ width: 30, height: 30, padding: 0, justifyContent: 'center' }}>
                                <CallTab width={24} height={24} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('MainTabs', {
                                    screen: 'Remedies',
                                });
                            }} style={{ width: 30, height: 30, padding: 0, justifyContent: 'center' }}>
                                <RemediesTab width={24} height={24} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 30, height: 30, padding: 0, justifyContent: 'center', marginBottom: 10, marginRight: 10 }} >
                                <SearchIcon size={24} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ position: 'absolute', width: '100%', height: .2, backgroundColor: '#7B7B7B', bottom: 0 }}></View>
                    </View>

                    {/* Chat area */}
                    <ImageBackground source={BG} style={{ flex: 1 }} resizeMode="repeat">

                        <View style={styles.chatWrapper}>
                            <FlatList
                                ref={flatRef}
                                data={messages1}
                                keyExtractor={(item) => String(item.id)}
                                renderItem={renderMessage}
                                contentContainerStyle={styles.chatContent}
                                showsVerticalScrollIndicator={false}
                                inverted
                                onEndReached={loadMore}
                                onEndReachedThreshold={0.4}
                                removeClippedSubviews={false}
                                 keyboardDismissMode="on-drag"
                                keyboardShouldPersistTaps="handled"
                                ListFooterComponent={() => (loadingMore ? <View style={styles.loadingMore}><Text>Loading...</Text></View> : null)}
                            />

                            {/* <Text>Status: {isConnected ? 'connected' : 'disconnected'}</Text> */}
                            {typingUser && <Text>Typing...</Text>}
                            {/* <Text>Transport: { transport }</Text> */}

                            {/* Share row (centered) */}
                            {isChatEnded && (
                                <>
                                    {/* <View style={styles.shareRowWrap}>
                                        <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
                                            <Feather name="message-circle" size={18} color="#0B9E55" />
                                            <Text style={styles.shareBtnText}>Share with your friends</Text>
                                        </TouchableOpacity>
                                    </View> */}

                                    {/* Rating */}
                                    {/* <View style={styles.ratingRow}>
                                        <View style={{ marginRight: 40 }}>
                                            <View style={{ marginLeft: 5, flexDirection: "row", alignItems: "center" }}>
                                                <StarRating size={20} rating={ratingStar} />
                                            </View>
                                            <Text style={styles.ratingLabel}>{message}</Text>
                                        </View>
                                        <TouchableOpacity onPress={onEdit} style={{ flex: 1, position: 'absolute', right: 20, top: 10 }}>
                                            <Feather name="edit-2" size={16} color="#555" />
                                        </TouchableOpacity>
                                    </View> */}

                                    {/* Promo / continue chat card */}
                                    <View style={{backgroundColor:'#fff',marginBottom:35,margin:5,borderRadius:12,paddingVertical:10,  // iOS shadow (emboss / raised)
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,

  // Android shadow
  elevation: 4,

  // Optional border for crisp look
  borderWidth: 1,
  borderColor: '#EEE',}}>
                                    <View style={styles.promoCard}>
                                        <FastImage source={{ uri: avatarUri }} style={styles.promoAvatar} />
                                        <View style={styles.promoBody}>
                                            <Text style={styles.promoText}>
                                                "Hi {userDetailsData.name || "User"}, lets continue this chat at discounted price of{" "}
                                                <Text style={styles.promoPrice}>₹ 5/min</Text>{" "}
                                                <Text style={styles.promoOld}>₹ 38/min</Text>"
                                            </Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity style={styles.continueBtn} onPress={()=>{
                                        setProfileSelector(true);
                                    }}>
                                        <Text style={styles.continueText}>Continue Chat</Text>
                                    </TouchableOpacity>
                                    </View>
                                    </>)}

                          {/* Bottom input */}
                          {!isChatEnded && (
                            <View style={styles.inputBarWrap}>
                            <View style={styles.inputLeft}>
                                {/* <TouchableOpacity style={styles.iconBtn}><Feather name="smile" size={20} color="#777" /></TouchableOpacity> */}
                                <TouchableOpacity style={styles.iconBtn} onPress={() => {
                                    setShowAttachment(true);
                                }}><Feather name="paperclip" size={20} color="#777" /></TouchableOpacity>

                               {text.trim().length === 0 && <TouchableOpacity
                                    style={styles.iconBtn}
                                        onPressIn={async () => {
                                            onStartRecord();
                                        }}
                                        >
                                    <Feather name="mic" size={20} color="#777" />
                                </TouchableOpacity>}
                            </View>

                            <View style={styles.inputBox}>
                                <TextInput
                                    value={text}
                                    onChangeText={(val) => {
                                        setText(val);
                                        handleTyping(val);
                                    }}
                                    placeholder="Write a message..."
                                    style={styles.input}
                                    multiline
                                    textAlignVertical="center" 
                                    maxLength={500}
                                    scrollEnabled
                                    placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
                                    cursorColor={colors.primaryColor}
                                />
                            </View>

                            <View style={styles.inputRight}>
                                <TouchableOpacity onPress={() => {
                                    sendEvent('stop_typing', {
                                        orderId,
                                        type: 'message'
                                    });
                                    callSendMessagesApi(false);
                                }}
                                    disabled={isChatEnded}
                                    style={[styles.sendBtn, { opacity: isChatEnded ? 0.4 : 1 }]}>
                                    <Feather name="send" size={18} color="#fff" />
                                </TouchableOpacity>

                                {text.trim().length === 0 && (<TouchableOpacity style={styles.endBtn} onPress={() => {
                                    isChatEnded ? startChat() : endChat();
                                }}>
                                    <Text style={[styles.endBtnText, { color: isChatEnded ? "#0B9E55" : "#D23B3B" }]}>{isChatEnded ? "Start" : "End"}</Text>
                                </TouchableOpacity>)}
                            </View>
                        </View>)}

                        </View>

                    </ImageBackground>
                </KeyboardAvoidingView>

                <RateAstrologerModal
                    visible={showRateModal}
                    data={selectedItem}
                    onClose={() => setShowRateModal(false)}
                    onSubmit={onSubmitRating}
                />

                <AttachmentModal
                    visible={showAttachment}
                    onClose={() => setShowAttachment(false)}
                    onSelect={handleAttachmentSelect}
                />

                    {isRecording ? (
                        <AudioRecorderBar
                            duration={ms(recordPosition)}
                            paused={pauseRecord}
                            onCancel={
                                   () =>{
                                       setIsRecording(false)

                                        onCancelRecord();
                                   }
                            }
                            onPause={
                                pauseRecording
                            }
                            onSend={onStopRecord}
                        />
                    ) : (
                    // 🔽 your existing inputBarWrap
                    null
                    )} 

                <OrderDetailsCard 
                    onClose={() => setShowOrderCard(false)} 
                    visible={showOrderCard} 
                    data={selectedItem}
                    onDelete={()=>{
                        setMessages1(prevMessages =>
                        prevMessages.filter(msg => msg.order_id !== selectedItem.order_id)
                        );
                    }} />

                <MessageContextMenu
                    visible={showContextMenu}
                    position={contextMenuPos}
                    onClose={() => {
                        setShowContextMenu(false);
                        
                    }}
                    onDelete={() => {
                        setShowContextMenu(false);
                        
                        Alert.alert(
                            "Delete Request",
                            `Are you sure you want to delete this message?`,
                            [
                            { text: "No" },
                            {
                                text: "Yes",
                                onPress: () => {

                                    callDeleteChatMessage();

                               
                        
                                },
                            },
                            ]
                        );
 
                
                    }}/>


                    {isLowBalance && <View style={styles.topLowBalanceWrap}>
                    <View style={styles.timerRow}>
                        <Feather name="clock" size={14} color="#E53935" />
                    </View>
                    <Text style={styles.lowBalanceTopText} numberOfLines={1}>
                        Low Balance! <Text style={{color:'#000'}}>Your chat will end soon</Text>
                    </Text>


                    <TouchableOpacity style={styles.rechargeTopBtn} onPress={()=>{
                        navigation.push('AddMoneyScreen')
                    }}>
                        <Text style={styles.rechargeTopBtnText}>Recharge</Text>
                    </TouchableOpacity>
                    </View>}

              <ProfileSelector
                name={selectedName} 
                visible={profileSelector} 
                onClose={handleCloseProfile} 
                onStartChat={handleStartChat} />

                <AppSpinner show={activity} />

            </SafeAreaView>
        </SafeAreaProvider>
    );
}



const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#FFF" },
    flex: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        justifyContent: 'center',
    },
    backBtn: {
        width: 50,
        height: 40,
        justifyContent: "center",
        paddingLeft: 5,
    },
    profileWrapper: {
        width: 35,
        height: 35,
        borderRadius: 35 / 2,
        backgroundColor: '#FFFAE6',        // light yellow fill
        borderWidth: 2,
        borderColor: colors.primaryColor,           // yellow border
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 32 / 2,
    },
    headerTitle: { flex: 1, alignItems: "center" },
    headerName: { fontSize: 14, fontWeight: "600" ,fontFamily:Fonts.Medium},
    headerStatus: { fontSize: 9, color: "#777" ,fontFamily:Fonts.Medium},

    chatWrapper: {
        flex: 1,
        // backgroundColor: "#fff" 
    },
    chatContent: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 18 },

    // message rows
    msgRow: { marginVertical: 6, flexDirection: "row", alignItems: "flex-end" },
    rowLeft: { justifyContent: "flex-start" },
    rowRight: { justifyContent: "flex-end", alignSelf: "stretch" },

    msgAvatar: { 
        width: 36, 
        height: 36, 
        borderRadius: 18, 
        marginRight: 8,
        backgroundColor: colors.primaryLightColor,        // light yellow fill
        borderWidth: 1,
        borderColor: colors.primaryColor, 
     },
    msgAvatarUser: { 
        width: 36, 
        height: 36, 
        borderRadius: 18, 
        marginLeft: 9,
        backgroundColor: colors.primaryLightColor,        // light yellow fill
        borderWidth: 1,
        borderColor: colors.primaryColor,  
    },
    msgBubble: {
        maxWidth: width * 0.74,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 1,
    },
    bubbleAgent: {
        backgroundColor: "#FFF",
        borderWidth: 0.5,
        borderColor: "#E8E8E8",
        marginLeft: 2,
        borderTopLeftRadius: 4,
    },
    bubbleUser: {
        backgroundColor: "#DCF8C6",
        marginRight: 2,
        borderTopRightRadius: 4,
    },
    msgText: { fontSize: 14, lineHeight: 18, color: "#222", fontFamily: Fonts.Medium },
    msgTextUser: { color: "#222", fontFamily: Fonts.Medium },
    msgTextAgent: { color: "#222", fontFamily: Fonts.Medium },
    deletedText: {
    color: 'red',        
    fontStyle: 'italic',
    },
    msgTime: { 
        fontSize: 10, 
        color: "#888", 
        alignSelf: "flex-end",
        fontFamily:Fonts.Medium
     },

    systemRow: {
        alignItems: "center",
        marginVertical: 10
    },
    systemText: { backgroundColor: "#f2f2f2", padding: 8, borderRadius: 12, color: "#444", fontFamily: Fonts.Medium },
    systemTime: { fontSize: 10, color: "#999", marginTop: 6, fontFamily: Fonts.Medium },

    // share row
    shareRowWrap: { alignItems: "center", marginVertical: 12 },
    shareBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        marginRight: 20
    },
    shareBtnText: { color: "#0B9E55", marginLeft: 8, fontWeight: "600", fontFamily: Fonts.Medium },

    // rating row
    ratingRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 10 },
    ratingLabel: { marginLeft: 10, color: "#333", fontWeight: "600", fontFamily: Fonts.Medium },

    // promo card
    promoCard: {
        marginHorizontal: 6,
        backgroundColor: "#FFF6D9",
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.6,
        borderColor: colors.primaryColor,
    },
    promoAvatar: { width: 48, height: 48, borderRadius: 24, marginRight: 10, borderWidth: 1, borderColor: "#F1C42B" },
    promoBody: { flex: 1 },
    promoText: { color: "#2b2b2b", fontSize: 13, fontFamily: Fonts.Medium },
    promoPrice: { fontWeight: "800", color: "#000", fontFamily: Fonts.Medium },
    promoOld: { textDecorationLine: "line-through", color: "#a33", marginLeft: 6 },

    continueBtn: {
        marginHorizontal: 6,
        marginTop: 8,
        backgroundColor: "#F8D84E",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
    },
    continueText: { color: "#000", fontWeight: "800", fontSize: 16, fontFamily: Fonts.SemiBold },

    // bottom input area
    inputBarWrap: {
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderTopWidth: 0.6,
        borderColor: "#EAEAEA",
        backgroundColor: "#fff",
        paddingBottom:Platform.OS==='ios'?26:11,
    },
    inputLeft: { flexDirection: "row", alignItems: "center" },
    iconBtn: { padding: 8 },
    inputBox: {
        flex: 1,
        marginHorizontal: 8,
        minHeight: 44,
        maxHeight: 120,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: "#E8E8E8",
        paddingHorizontal: 12,
        justifyContent: "flex-start",
    },
    input: { 
        fontSize: 15, 
        color:'#000',
        fontFamily:Fonts.Medium
     },
    inputRight: { flexDirection: "row", alignItems: "center" },
    sendBtn: {
        backgroundColor: "#0CA789",
        padding: 10,
        borderRadius: 20,
        marginRight: 8,
    },
    endBtn: {
        backgroundColor: "#FFF",
        borderColor: "#E6E6E6",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
    },
    endBtnText: { color: "#D23B3B", fontWeight: "700" },
    loadingMore: { padding: 16, alignItems: 'center', justifyContent: 'center' },

    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: width * 0.72,
        marginBottom: 6,
    },

    alignRight: {
        alignSelf: 'flex-end',
    },

    alignLeft: {
        alignSelf: 'flex-start',
    },

    imageWrapper: {
        //   width: '48%',
        width: '100%',
        height:200,
        padding:5,
        // aspectRatio: 1,
        margin: '1%',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor:'white'
    },

    chatImage: {
        width: '100%',
        height: '100%',
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    overlayText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        fontFamily:Fonts.Medium
    },
 
topLowBalanceWrap: {
 position:'absolute',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFF4F4',
  paddingHorizontal: 10,
  paddingVertical: 10,
  marginHorizontal: 10,
  borderRadius: 9,
  top: Platform.OS==="android"?'10%':'15%'
},

timerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 6,
},

timerText: {
  marginLeft: 4,
  fontSize: 12,
  color: '#E53935',
  fontWeight: '600',
   fontFamily:Fonts.Medium
},

lowBalanceTopText: {
  flex: 1,
  fontSize: 12,
  color: '#E53935',
  fontWeight: '500',
  fontFamily:Fonts.Medium
},

rechargeTopBtn: {
  backgroundColor: '#D32F2F',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 6,
},

rechargeTopBtnText: {
  color: '#fff',
  fontSize: 12,
  fontWeight: '600',
   fontFamily:Fonts.Medium
},

lowBalanceCard: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
  },

  lowBalanceText: {
    color: '#E53935',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '500',
  },

  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  amountBox: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  amountBoxSelected: {
    borderColor: '#000',
  },

  amountText: {
    fontSize: 14,
    color: '#000',
  },

  amountTextSelected: {
    fontWeight: '700',
  },

  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  totalBillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },

  taxText: {
    fontSize: 12,
    color: '#777',
  },

  payUsingRow: {
    alignItems: 'flex-end',
  },

  payUsingText: {
    fontSize: 10,
    color: '#777',
  },

  upiText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },

  rechargeBtn: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  rechargeBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

});
