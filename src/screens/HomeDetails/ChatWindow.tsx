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
    Image,
    Dimensions,
    Pressable,
    Share,
    useColorScheme,
    ImageBackground,
    Alert,
    Modal,
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
import { socket } from '../../../socket';
import RateAstrologerModal from "../../utils/RateAstrologerModal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { requestCameraPermission, requestGalleryPermission, StarRating } from "../../constant/Helper";
import { AppSpinner } from "../../utils/AppSpinner";
import { createOrderApi, getChatDetails, getPanditChatMessages, sendMessageApi } from "../../redux/actions/UserActions";
import moment from "moment";
import { ServiceConstants } from "../../services/ServiceConstants";
import { decryptData, secretKey } from "../../services/requests";
import { CustomDialogManager2 } from "../../utils/CustomDialog2";
const { width } = Dimensions.get("window");
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AttachmentModal from "../../utils/AttachmentModal";
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import { AudioMessage } from "../../utils/AudioMessage";
// import AudioRecorderPlayer from 'react-native-nitro-sound';
import AudioRecorderBar from "../../utils/AudioRecorderBar";


type Message = {
    id: string;
    sender_type: string;
    message: any;
    created_at: string;
    images?: string[];
    type: string;
    duration?: number;
};

export default function ChatWindow({ route }: any) {
    const { astrologerId, orderId } = route.params;
    const navigation = useNavigation<any>();
    const colorScheme = useColorScheme();
    const [isConnected, setIsConnected] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [showRateModal, setShowRateModal] = useState(false);
    const [text, setText] = useState("");
    const flatRef = useRef<FlatList>(null);
    const [isChatEnded, setIsChatEnded] = useState(true);
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
    const dummyUri =
        "https://d1gcna0o0ldu5v.cloudfront.net/fit-in/135x135/images/77fb9922-d879-4e6c-b981-bb50813cf5c9.jpg"; // replace with your avatar or astrologer image

    const [typingUser, setTypingUser] = useState(false);
    //Audio
    const [isRecording, setIsRecording] = useState(false);
    const [recordTime, setRecordTime] = useState('0:00');
    const [audioPath, setAudioPath] = useState('');
    const [paused, setPaused] = useState(false);




    const loadMore = () => {
        if (!loadingMore) {
            setPage(prev => prev + 1);
        }
    };
    useEffect(() => {
        callChatMessagesApi();
    }, [page]);

    const callChatMessagesApi = () => {
        setActivity(false);
        getPanditChatMessages(orderId, page).then(response => {
            setActivity(false);
            console.log("Chat Messages response ==>" + (response) + "page no:-" + page);
            const result = JSON.parse(response);
            if (result.success === true) {
                const messages = (result.data.results);
                if (messages.length == 0) {
                    console.log("Chat Messages lenght ==>" + messages.length);
                    setLoadingMore(false);
                }
                // setMessages1(prev => [...messages, ...prev]);
                setMessages1(prev => [...prev, ...messages]);
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
                console.log("Chat Messages Error response ==>" + JSON.stringify(result3));
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

    useEffect(() => {
        callChatDetailsApi();
    }, []);

    const callChatDetailsApi = () => {
        getChatDetails(astrologerId).then(response => {
            setActivity(false);
            console.log("Chat Details response ==>" + (response));
            const result = JSON.parse(response);
            if (result.success === true) {
                console.log("Chat Details response222 ==>" + JSON.stringify(result));
                setAvatarUri(result.data.profile);
                setPanditName(result.data.name);
                setIsOnline(result.data.isOnline);
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
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
                console.log("Send Messages response ==>" + JSON.stringify(result));
                sendMessage();
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
                console.log("Send Messages Error response ==>" + JSON.stringify(result3));
                CustomDialogManager2.show({
                    title: 'Alert',
                    message: result3.error,
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
        };

        setMessages1(prev => [newMsg, ...prev]);
    };

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }
        function onConnect() {
            setIsConnected(true);
            console.log('socket connected', socket.id);
            // socket.emit('join_chat', {
            //     orderId,
            //     id: ServiceConstants.User_ID,
            //     role: 'user'
            // });
            socket.emit(`go_online`, { orderId: orderId, from_id: ServiceConstants.User_ID, to_id: astrologerId, type: "user" });
        }

        function onDisconnect() {
            setIsConnected(false);
            console.log('socket disconnected', socket.id);
        }

        socket.on('connect', onConnect);
        socket.on(`go_online`, (data) => {
            console.log("go online--" + JSON.stringify(data));
        });

        socket.on('online', (data) => {
            setIsOnline(true);
        });

        socket.on('offline', (data) => {
            setIsOnline(false);
        });

        // 1. go_online = {id, type}
        // 2. ⁠typing = {from_type, from_id, to_type, to_id}
        // 3. ⁠stop_typing = {from_type, from_id, to_type, to_id}

        // socket.on(`typing`, (data) => setTypingUser(data.from_id || data.from));
        socket.on(`typing`, (data) => setTypingUser(true));
        socket.on(`stop_typing`, () => setTypingUser(false));
        socket.on(`receive_message`, (msg) => {
            console.log("receive message--" + JSON.stringify(msg));
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

        socket.on('disconnect', onDisconnect);

        return () => {
            console.log('🔥 ChatWindow unmount → disconnect socket');
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off(`typing`);
            socket.off(`stop_typing`);
            socket.off(`receive_message`);
            socket.off(`go_online`);
        };
    }, []);

    // typing handlers
    let typingTimer: any;
    function handleTyping(val: any) {
        setText(val);
        if (!isConnected) return;
        // STOP typing when input empty
        if (!val.trim()) {
            socket.emit(`stop_typing`, {
                orderId: orderId,
                // from_type: "user",
                // from_id: ServiceConstants.User_ID,
                // to_type: "pandit",
                // to_id: astrologerId,
            });
            return;
        }

        socket.emit(`typing`, {
            orderId: orderId,
            //   from_type: "user", from_id:ServiceConstants.User_ID,
            //   to_type: "pandit", to_id: astrologerId
        });
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            socket.emit(`stop_typing`, {
                orderId: orderId,
                // from_type: "user", from_id: ServiceConstants.User_ID,
                // to_type: "pandit", to_id:astrologerId
            });
        }, 5000);
    }


    const sendMessage = useCallback(() => {
        if (!text.trim()) return;
        // const ids = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        // const newMsg: Message = {
        //     id: ids,
        //     sender_type:"user",
        //     message:text.trim(), 
        //     created_at:new Date().toISOString()
        // };

        // setMessages1(prev => [newMsg, ...prev]);
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
        setIsChatEnded(true);
        setMessages1((p) => [
            ...p,
            {
                id: String(Date.now()),
                sender_type: "system",
                message: "You ended the chat",
                created_at: new Date().toISOString()
            } as any,
        ])
    };
    const startChat = () => {
        setIsChatEnded(false);
        setMessages1(prev => [
            ...prev,
            {
                id: String(Date.now()),
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
                            <FastImage source={{ uri }} style={styles.chatImage} />

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


    const renderMessage = ({ item }: { item: Message }) => {
        if ((item as any).sender_type === "system") {
            const formatted = moment(new Date()).format("HH:mm");
            return (
                <View style={styles.systemRow}>
                    <Text style={styles.systemText}>{item.message}</Text>
                    <Text style={styles.systemTime}>{formatted}</Text>
                </View>
            );
        }

        const isUser = item.sender_type === "user"
        const formatted = moment(item.created_at).format("HH:mm");
        if (item.type === 'audio') {
            return (
            <View style={[styles.msgRow, isUser ? styles.rowRight : styles.rowLeft]}>
                {!isUser && (
                <FastImage source={{ uri: avatarUri }} style={styles.msgAvatar} />
                )}

                <AudioMessage
                uri={item.message}
                duration={item.duration}
                isUser={isUser}
                />

                {isUser && <View style={{ width: 46, }} >
                        <FastImage
                            //  source={dummyUri ? { uri: dummyUri } : DEFAULT_AVATAR}
                            source={DEFAULT_AVATAR}
                            style={styles.msgAvatarUser} />
                    </View>}
            </View>
            );
        }

        return (
            <View style={[styles.msgRow, isUser ? styles.rowRight : styles.rowLeft]}>
                {!isUser && (
                    <FastImage source={{ uri: avatarUri }} style={styles.msgAvatar} />
                )}

                {item.type == "image" && (
                    <ImageGrid images={[item.message]} isUser={isUser} />
                )}

                {item.type == 'text' && item.message ? (<View style={[styles.msgBubble, isUser ? styles.bubbleUser : styles.bubbleAgent]}>
                    <Text style={[styles.msgText, isUser ? styles.msgTextUser : styles.msgTextAgent]}>{item.message}</Text>
                    <Text style={styles.msgTime}>{formatted}</Text>
                </View>) : null}

                {isUser && (
                    <View style={{ width: 46, }} >
                        <FastImage
                            //  source={dummyUri ? { uri: dummyUri } : DEFAULT_AVATAR}
                            source={DEFAULT_AVATAR}
                            style={styles.msgAvatarUser} />
                    </View>
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

        socket.emit(`go_offline`, {
            orderId: orderId,
            // from_type: "user", from_id: ServiceConstants.User_ID,
            // to_type: "pandit", to_id:astrologerId
        });
        navigation.goBack();
    }
    const onEdit = () => {
        setShowRateModal(true);
    }

    const onSubmitRating = (data: any) => {
        console.log("Review Data → ", data);
        setMessage(data.review);
        setRatingStar(data.rating);
    };

    const startRecording = async () => {
    // try {
    //     const path = await AudioRecorderPlayer.startRecorder();

    //     setAudioPath(path);
    //     setIsRecording(true);
    //     setPaused(false);

    //     AudioRecorderPlayer.addRecordBackListener((e: any) => {
    //         const sec = Math.floor(e.currentPosition / 1000);
    //         setRecordTime(`0:${sec < 10 ? '0' + sec : sec}`);
    //     });
    // } catch (e) {
    //     console.log('Start recording error', e);
    // }
};

const pauseRecording = async () => {
    // try {
    //     if (paused) {
    //         await AudioRecorderPlayer.resumeRecorder();
    //     } else {
    //         await AudioRecorderPlayer.pauseRecorder();
    //     }
    //     setPaused(!paused);
    // } catch (e) {
    //     console.log('Pause error', e);
    // }
};

const cancelRecording = async () => {
    // try {
    //     await AudioRecorderPlayer.stopRecorder();
    //     AudioRecorderPlayer.removeRecordBackListener();

        setIsRecording(false);
    //     setPaused(false);
    //     setRecordTime('0:00');
    //     setAudioPath('');
    // } catch (e) {
    //     console.log('Cancel error', e);
    // }
};

const sendAudio = async () => {
    // try {
    //     const path = await AudioRecorderPlayer.stopRecorder();
    //     AudioRecorderPlayer.removeRecordBackListener();

        setIsRecording(false);
    //     setPaused(false);

    //     const audioFile = {
    //         uri: Platform.OS === 'ios' ? path.replace('file://', '') : path,
    //         name: `audio_${Date.now()}.mp3`,
    //         type: 'audio/mpeg',
    //     };

    //     // 🔥 Send to backend
    //     // sendMessageApi([audioFile], '', orderId, true);

    //     // 🔥 Optimistic UI
    //     setMessages1(prev => [
    //         {
    //             id: String(Date.now()),
    //             sender_type: 'user',
    //             message: audioFile.uri,
    //             type: 'audio',
    //             duration: Number(recordTime.split(':')[1]),
    //             created_at: new Date().toISOString(),
    //         },
    //         ...prev,
    //     ]);

    //     setRecordTime('0:00');
    //     setAudioPath('');
    // } catch (e) {
    //     console.log('Send audio error', e);
    // }
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
                setIsRecording(true);
                startRecording();
                break;
            case "video":
                console.log("Pick Video");
                break;
            case "document":
                console.log("Pick Document");
                break;
        }
    };

 


    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.safe}>
                <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
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
                                keyExtractor={(item, index) => `${item.id}-${index}`}
                                renderItem={renderMessage}
                                contentContainerStyle={styles.chatContent}
                                showsVerticalScrollIndicator={false}
                                inverted
                                onEndReached={loadMore}
                                onEndReachedThreshold={0.4}
                                ListFooterComponent={() => (loadingMore ? <View style={styles.loadingMore}><Text>Loading...</Text></View> : null)}
                            />

                            <Text>Status: {isConnected ? 'connected' : 'disconnected'}</Text>
                            {typingUser && <Text>Typing...</Text>}
                            {/* <Text>Transport: { transport }</Text> */}

                            {/* Share row (centered) */}
                            {isChatEnded && (
                                <>
                                    <View style={styles.shareRowWrap}>
                                        <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
                                            <Feather name="message-circle" size={18} color="#0B9E55" />
                                            <Text style={styles.shareBtnText}>Share with your friends</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Rating */}
                                    <View style={styles.ratingRow}>
                                        <View style={{ marginRight: 40 }}>
                                            <View style={{ marginLeft: 5, flexDirection: "row", alignItems: "center" }}>
                                                <StarRating size={20} rating={ratingStar} />
                                            </View>
                                            <Text style={styles.ratingLabel}>{message}</Text>
                                        </View>
                                        <TouchableOpacity onPress={onEdit} style={{ flex: 1, position: 'absolute', right: 20, top: 10 }}>
                                            <Feather name="edit-2" size={16} color="#555" />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Promo / continue chat card */}
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

                                    <TouchableOpacity style={styles.continueBtn}>
                                        <Text style={styles.continueText}>Continue Chat</Text>
                                    </TouchableOpacity></>)}
                        </View>


                        {/* Bottom input */}
                        <View style={styles.inputBarWrap}>
                            <View style={styles.inputLeft}>
                                {/* <TouchableOpacity style={styles.iconBtn}><Feather name="smile" size={20} color="#777" /></TouchableOpacity> */}
                                <TouchableOpacity style={styles.iconBtn} onPress={() => {
                                    setShowAttachment(true);
                                }}><Feather name="paperclip" size={20} color="#777" /></TouchableOpacity>

                                    {/* <TouchableOpacity
                                    style={styles.iconBtn}
                                            onPressIn={async () => {
                                                setIsRecording(true);
                                                // const path = await startRecording();

                                                // recorder.addRecordBackListener((e) => {
                                                // const sec = Math.floor(e.currentPosition / 1000);
                                                // setRecordTime(`0:${sec < 10 ? '0' + sec : sec}`);
                                                // });

                                                // setAudioPath(path);
                                            }}
                                            >
                                    <Feather name="mic" size={20} />
                                    </TouchableOpacity> */}
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
                                    placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
                                    cursorColor={colors.primaryColor}
                                />
                            </View>

                            <View style={styles.inputRight}>
                                <TouchableOpacity onPress={() => {
                                    callSendMessagesApi(false);
                                }}
                                    disabled={isChatEnded}
                                    style={[styles.sendBtn, { opacity: isChatEnded ? 0.4 : 1 }]}>
                                    <Feather name="send" size={18} color="#fff" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.endBtn} onPress={() => {
                                    isChatEnded ? startChat() : endChat();
                                }}>
                                    <Text style={[styles.endBtnText, { color: isChatEnded ? "#0B9E55" : "#D23B3B" }]}>{isChatEnded ? "Start" : "End"}</Text>
                                </TouchableOpacity>

                        

                            </View>
                        </View>

                    </ImageBackground>
                </KeyboardAvoidingView>

                <RateAstrologerModal
                    visible={showRateModal}
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
                        duration={recordTime}
                        paused={paused}
                        onCancel={()=>cancelRecording()}
                        onPause={() => pauseRecording()}
                        onSend={()=>sendAudio()}
                    />
                    
                 ) : (
                    // 🔽 your existing inputBarWrap
                    null
                    )} 

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
        paddingLeft: 10,
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
    headerName: { fontSize: 16, fontWeight: "600" },
    headerStatus: { fontSize: 12, color: "#777" },

    chatWrapper: {
        flex: 1,
        // backgroundColor: "#fff" 
    },
    chatContent: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 18 },

    // message rows
    msgRow: { marginVertical: 6, flexDirection: "row", alignItems: "flex-end" },
    rowLeft: { justifyContent: "flex-start" },
    rowRight: { justifyContent: "flex-end", alignSelf: "stretch" },

    msgAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
    msgAvatarUser: { width: 36, height: 36, borderRadius: 18, marginLeft: 9 },
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
    msgTime: { fontSize: 10, color: "#888", marginTop: 6, alignSelf: "flex-end" },

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
        marginHorizontal: 10,
        marginTop: 6,
        backgroundColor: "#FFF6D9",
        borderRadius: 10,
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
        marginHorizontal: 12,
        marginTop: 10,
        marginBottom: 12,
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
        justifyContent: "center",
    },
    input: { fontSize: 15, padding: 0, paddingVertical: 6 },
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
        aspectRatio: 1,
        margin: '1%',
        borderRadius: 10,
        overflow: 'hidden',
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
    },

});
