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
} from "react-native";
import FastImage from "react-native-fast-image";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, Fonts } from "../../styles";
import CallTab from "../../assets/icons/CallTab";
import RemediesTab from "../../assets/icons/RemediesTab";
import SearchIcon from "../../assets/icons/SearchIcon";
import { BackIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { socket } from '../../../socket';
const { width } = Dimensions.get("window");


type Message = {
    id: string;
    from: "user" | "agent";
    text: string;
    time: string;
};

const DUMMY_MESSAGES: Message[] = [
    { id: "1", from: "agent", text: "Apki kundli mai saturn ki antar dasha chal rahi hai.", time: "08:34 PM" },
    { id: "2", from: "agent", text: "apki personal life bahut achi rahegi 2025 se", time: "08:34 PM" },
    { id: "3", from: "user", text: "U ended the chat", time: "08:34 PM" },
    { id: "4", from: "agent", text: "But yes, I've noticed something very interesting in your horoscope", time: "08:35 PM" },
    { id: "5", from: "agent", text: "Your personal life is going to take a new turn very soon", time: "08:36 PM" },
    { id: "6", from: "agent", text: "Connect again, I'll explain everything in detail", time: "08:36 PM" },
];

export default function ChatWindow() {
    const navigation = useNavigation<any>();
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState('N/A');

    const [messages, setMessages] = useState<Message[]>(DUMMY_MESSAGES);
    const [text, setText] = useState("");
    const flatRef = useRef<FlatList>(null);
    const [isChatEnded, setIsChatEnded] = useState(false);
    const link_web  = 'https://astrotalkguruji.store';
    const avatarUri =
        "https://d1gcna0o0ldu5v.cloudfront.net/fit-in/135x135/images/77fb9922-d879-4e6c-b981-bb50813cf5c9.jpg"; // replace with your avatar or astrologer image


        useEffect(() => {
            if (socket.connected) {
            onConnect();
            }

            function onConnect() {
                    setIsConnected(true);
                    setTransport(socket.io.engine.transport.name);

                    socket.io.engine.on('upgrade', (transport) => {
                        setTransport(transport.name);
                    });
            }

            function onDisconnect() {
                setIsConnected(false);
                setTransport('N/A');
            }

            socket.on('connect', onConnect);
            socket.on('disconnect', onDisconnect);

            return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            };
        }, []);



    const sendMessage = useCallback(() => {
        if (!text.trim()) return;
        const newMsg: Message = {
            id: String(Date.now()),
            from: "user",
            text: text.trim(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((p) => [...p, newMsg]);
        setText("");
        // scroll to end
        setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
    }, [text]);

    const endChat = () => {
        setIsChatEnded(true);
        // placeholder: handle end chat action
        setMessages((p) => [
            ...p,
            {
                id: String(Date.now()),
                from: "system",
                text: "You ended the chat",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            } as any,
        ]);
    };
    const startChat = () => {
  setIsChatEnded(false);

  setMessages(prev => [
            ...prev,
            {
                id: String(Date.now()),
                from: "system",
                text: "You started the chat",
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            } as any,
  ]);

  setTimeout(() => flatRef.current?.scrollToEnd({ animated: true }), 100);
};

    const renderMessage = ({ item }: { item: Message }) => {
        if ((item as any).from === "system") {
            return (
                <View style={styles.systemRow}>
                    <Text style={styles.systemText}>{item.text}</Text>
                    <Text style={styles.systemTime}>{item.time}</Text>
                </View>
            );
        }

        const isUser = item.from === "user";
        return (
            <View style={[styles.msgRow, isUser ? styles.rowRight : styles.rowLeft]}>
                {!isUser && (
                    <FastImage source={{ uri: avatarUri }} style={styles.msgAvatar} />
                )}

                <View style={[styles.msgBubble, isUser ? styles.bubbleUser : styles.bubbleAgent]}>
                    <Text style={[styles.msgText, isUser ? styles.msgTextUser : styles.msgTextAgent]}>{item.text}</Text>
                    <Text style={styles.msgTime}>{item.time}</Text>
                </View>

                {isUser && (
                    <View style={{ width: 36 }} /> // keep spacing on right
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
        navigation.goBack();
    }
    const onEdit = () =>{

    }

    useEffect(() => {
    flatRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    return (

        <SafeAreaProvider>
            <SafeAreaView style={styles.safe}>
                <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
                    {/* Header */}
                    <View style={styles.header}>

                        <TouchableOpacity style={styles.backBtn}>
                            <BackIcon size={16} onPress={handleBack} />
                        </TouchableOpacity>

                        {/* Profile Image wrapper */}
                        <TouchableOpacity style={styles.profileWrapper} onPress={() => { }}>
                            <FastImage
                                source={{ uri: avatarUri }}
                                style={styles.profileImage}
                            />
                        </TouchableOpacity>

                        <View style={styles.headerTitle}>
                            <Text style={styles.headerName}>Astrologer</Text>
                            <Text style={styles.headerStatus}>Offline</Text>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => { }} style={{width:30,height:30,padding: 0,justifyContent:'center'}}>
                            <CallTab width={24} height={24} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={{width:30,height:30,padding: 0,justifyContent:'center'}}>
                            <RemediesTab width={24} height={24} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:30,height:30,padding: 0,justifyContent:'center',marginBottom:10,marginRight:10}} >
                            <SearchIcon size={24} />
                        </TouchableOpacity>
                        </View>
                         <View style={{ position:'absolute',width:'100%', height: .2,backgroundColor:'#7B7B7B',bottom:0 }}></View>
                    </View>

                    {/* Chat area */}
                    <View style={styles.chatWrapper}>
                        <FlatList
                            ref={flatRef}
                            data={messages}
                            keyExtractor={(i) => i.id}
                            renderItem={renderMessage}
                            contentContainerStyle={styles.chatContent}
                            showsVerticalScrollIndicator={false}
                        />

                        <Text>Status: { isConnected ? 'connected' : 'disconnected' }</Text>
                        <Text>Transport: { transport }</Text>

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
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Feather key={i} name="star" size={14} color={i < 4 ? colors.primaryColor : "#D1D1D1"} style={{ marginRight: 6 }} />
                                ))}
                            </View>
                            <Text style={styles.ratingLabel}>Test</Text>
                            <TouchableOpacity onPress={onEdit} style={{position:'absolute',right:10}}>
                                <Feather name="edit-2" size={16} color="#555" />
                            </TouchableOpacity>
                        </View>

                        {/* Promo / continue chat card */}
                        <View style={styles.promoCard}>
                            <FastImage source={{ uri: avatarUri }} style={styles.promoAvatar} />
                            <View style={styles.promoBody}>
                                <Text style={styles.promoText}>
                                    "Hi User, lets continue this chat at discounted price of{" "}
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
                            <TouchableOpacity style={styles.iconBtn}><Feather name="smile" size={20} color="#777" /></TouchableOpacity>
                            <TouchableOpacity style={styles.iconBtn}><Feather name="paperclip" size={20} color="#777" /></TouchableOpacity>
                        </View>

                        <View style={styles.inputBox}>
                            <TextInput
                                value={text}
                                onChangeText={setText}
                                placeholder="Write a message..."
                                style={styles.input}
                                multiline
                            />
                        </View>

                        <View style={styles.inputRight}>
                            <TouchableOpacity  onPress={sendMessage}
                              disabled={isChatEnded}
                              style={[styles.sendBtn, { opacity: isChatEnded ? 0.4 : 1 }]}>
                                <Feather name="send" size={18} color="#fff" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.endBtn} onPress={() => {
                                isChatEnded ? startChat() : endChat();
                                }}>
                                <Text style={[styles.endBtnText,{color:isChatEnded?"#0B9E55":"#D23B3B"}]}>{isChatEnded ? "Start" : "End"}</Text>
                            </TouchableOpacity>
                       
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

// const BG = require("./assets/chat_pattern.png"); // optional: if you have a pattern image. else remove usage.

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#FFF" },
    flex: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        justifyContent:'center',
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

    chatWrapper: { flex: 1, backgroundColor: "#fff" },
    chatContent: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 18 },

    // message rows
    msgRow: { marginVertical: 6, flexDirection: "row", alignItems: "flex-end" },
    rowLeft: { justifyContent: "flex-start" },
    rowRight: { justifyContent: "flex-end", alignSelf: "stretch" },

    msgAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },

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
    msgText: { fontSize: 14, lineHeight: 18, color: "#222" ,fontFamily:Fonts.Medium},
    msgTextUser: { color: "#222",fontFamily:Fonts.Medium},
    msgTextAgent: { color: "#222" ,fontFamily:Fonts.Medium},
    msgTime: { fontSize: 10, color: "#888", marginTop: 6, alignSelf: "flex-end" },

    systemRow: { alignItems: "center", marginVertical: 10 },
    systemText: { backgroundColor: "#f2f2f2", padding: 8, borderRadius: 12, color: "#444",fontFamily:Fonts.Medium },
    systemTime: { fontSize: 10, color: "#999", marginTop: 6,fontFamily:Fonts.Medium },

    // share row
    shareRowWrap: { alignItems: "center", marginVertical: 12 },
    shareBtn: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        marginRight:20
    },
    shareBtnText: { color: "#0B9E55", marginLeft: 8, fontWeight: "600",fontFamily:Fonts.Medium },

    // rating row
    ratingRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 10, marginBottom: 10 },
    ratingLabel: { marginLeft: 10, color: "#333", fontWeight: "600",fontFamily:Fonts.Medium },

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
    promoText: { color: "#2b2b2b", fontSize: 13 ,fontFamily:Fonts.Medium},
    promoPrice: { fontWeight: "800", color: "#000" ,fontFamily:Fonts.Medium},
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
    continueText: { color: "#000", fontWeight: "800", fontSize: 16,fontFamily:Fonts.SemiBold },

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
    inputLeft: { flexDirection: "row", alignItems: "center",display: 'none' },
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
});
