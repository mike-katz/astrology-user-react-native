// SettingsScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
    ScrollView,
    Platform,
    Linking,
    Alert,
    Animated,
} from "react-native";
import Feather from "react-native-vector-icons/Feather"; // optional icon pack
import { colors, Fonts } from "../../styles";
import { AppSpinner } from "../../utils/AppSpinner";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { BackIcon } from "../../assets/icons";

export default function SettingsScreen({ navigation }: any) {
    // toggles
    const [astromallChat, setAstromallChat] = useState(true);
    const [liveEvents, setLiveEvents] = useState(true);
    const [allowReviewName, setAllowReviewName] = useState(true);
    const [activity, setActivity] = useState<boolean>(false);


    // handlers - replace with real logic / API
    const handleToggleAstromallChat = (v: boolean) => setAstromallChat(v);
    const handleToggleLiveEvents = (v: boolean) => setLiveEvents(v);
    const handleToggleAllowReview = (v: boolean) => setAllowReviewName(v);

    const handleLicense = () => {
        // navigation or open screen
        console.log("License");
        Linking.openURL('https://astrotalkguruji.store');
    };
    const handleManagePrivacy = () => {
        console.log("Manage your privacy");
    };
    const handleTerms = () => {
        console.log("Terms and Conditions");
        Linking.openURL('https://astrotalkguruji.store');
    };
    const handlePrivacyPolicy = () => {
        console.log("Privacy policy");
        Linking.openURL('https://astrotalkguruji.store');
    };
    const handleLogout = () => {
        // do logout
        console.log("Logout");
        Alert.alert(
            "Logout?",
            "Are you sure you want to Logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK", onPress: () => {

                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AuthStack' }],
                        });

                    }
                }
            ]
        );
    };
    const handleDeleteAccount = () => {
        // show confirm dialog then delete
        console.log("Delete account");
        Alert.alert(
            "Delete Account?",
            "Are you sure you want to delete your account?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK", onPress: () => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AuthStack' }],
                        });

                    }
                }
            ]
        );
    };
    const handleBack = () => {
        navigation.goBack();
    }

    return (

        <SafeAreaProvider>
            <SafeAreaView style={s.safe}>

                {/* Header */}
                <Animated.View style={[
                    s.header,
                    // { backgroundColor: headerBackgroundColor }
                ]}>


                    <Text style={s.headerTitle}>Settings</Text>

                    <TouchableOpacity style={s.backBtn}>
                        <BackIcon size={16} onPress={handleBack} />
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', width: '100%', height: .1, backgroundColor: '#7B7B7B', bottom: 0 }}></View>
                </Animated.View>


                <ScrollView contentContainerStyle={s.container}>
                    {/* Notifications Card */}
                    <View style={s.card}>
                        <Text style={s.cardHeading}>Notifications</Text>

                        <View style={s.row}>
                            <View style={s.rowLeft}>
                                <Feather name="message-circle" size={18} color="#6B6B6B" style={{ marginRight: 12 }} />
                                <Text style={s.rowText}>Astromall chat</Text>
                            </View>
                            <Switch
                                value={astromallChat}
                                onValueChange={handleToggleAstromallChat}
                                trackColor={{ true: colors.primaryColor || "#3ad25a", false: "#ddd" }}
                                thumbColor={Platform.OS === "android" ? (astromallChat ? "#fff" : "#fff") : undefined}
                            />
                        </View>

                        <View style={[s.row, { marginTop: 8 }]}>
                            <View style={s.rowLeft}>
                                <Feather name="calendar" size={18} color="#6B6B6B" style={{ marginRight: 12 }} />
                                <Text style={s.rowText}>Live Events</Text>
                            </View>
                            <Switch
                                value={liveEvents}
                                onValueChange={handleToggleLiveEvents}
                                trackColor={{ true: colors.primaryColor || "#3ad25a", false: "#ddd" }}
                            />
                        </View>
                    </View>

                    {/* Privacy Card */}
                    <View style={s.card}>
                        <Text style={s.cardHeading}>Privacy</Text>
                        <Text style={s.smallNote}>
                            Give Permission to show my name in Review section of astrologer's profile when i review a session
                            with Astrologer
                        </Text>

                        <View style={[s.row, { marginTop: 12 }]}>
                            <View style={s.rowLeft}>
                                <Feather name="lock" size={18} color="#6B6B6B" style={{ marginRight: 12 }} />
                                <Text style={s.rowText}>Show my name in reviews</Text>
                            </View>
                            <Switch
                                value={allowReviewName}
                                onValueChange={handleToggleAllowReview}
                                trackColor={{ true: colors.primaryColor || "#3ad25a", false: "#ddd" }}
                            />
                        </View>
                    </View>

                    {/* Simple List Items */}
                    <TouchableOpacity style={s.listItem} onPress={handleManagePrivacy}>
                        <Text style={s.listText}>Manage Your Privacy!</Text>
                        <Feather name="chevron-right" size={18} color="#6B6B6B" />
                    </TouchableOpacity>

                    <TouchableOpacity style={s.listItem} onPress={handleTerms}>
                        <Text style={s.listText}>Terms and Conditions</Text>
                        <Feather name="chevron-right" size={18} color="#6B6B6B" />
                    </TouchableOpacity>

                    <TouchableOpacity style={s.listItem} onPress={handlePrivacyPolicy}>
                        <Text style={s.listText}>Privacy policy</Text>
                        <Feather name="chevron-right" size={18} color="#6B6B6B" />
                    </TouchableOpacity>

                    <TouchableOpacity style={s.listItem} onPress={handleLicense}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={s.iconBox}>
                                <Feather name="file-text" size={18} color={colors.primaryColor || "#F1C42B"} />
                            </View>
                            <Text style={[s.listText, { marginLeft: 8 }]}>License</Text>
                        </View>
                        <Feather name="chevron-right" size={18} color="#6B6B6B" />
                    </TouchableOpacity>

                    {/* Logout */}
                    <TouchableOpacity style={s.listItem} onPress={handleLogout}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={s.iconBox}>
                                <Feather name="log-out" size={18} color="#333" />
                            </View>
                            <Text style={[s.listText, { marginLeft: 8 }]}>Logout</Text>
                        </View>
                        <Feather name="chevron-right" size={18} color="#6B6B6B" />
                    </TouchableOpacity>

                    {/* Delete - red */}
                    <TouchableOpacity style={[s.listItem, { borderColor: "transparent" }]} onPress={handleDeleteAccount}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={[s.iconBox, { backgroundColor: "#fff", borderWidth: 0 }]}>
                                <Feather name="trash-2" size={18} color="#D23B3B" />
                            </View>
                            <Text style={[s.listText, { marginLeft: 8, color: "#D23B3B", fontWeight: "600" }]}>
                                Delete my Account
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ height: 30 }} />
                </ScrollView>
                <AppSpinner show={activity} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: "#F3F3F3" },
    container: {
        padding: 16,
        paddingBottom: 32,
    },
    header: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingHorizontal: 15,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerTitle: {
        position: 'absolute',
        textAlign: 'center',
        left: 0,
        right: 0,
        fontSize: 20,
        fontWeight: "500",
        color: "#000",
        fontFamily: Fonts.Medium
    },
    backBtn: {
        width: 60,
        height: 40,
        justifyContent: "center",
        paddingLeft: 10,
    },
    // Card style that closely resembles screenshot
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 14,
        marginBottom: 12,
        // iOS shadow
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        // android elevation
        elevation: 2,
    },
    cardHeading: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 10,
        color: "#111",
    },
    smallNote: {
        color: "#666",
        fontSize: 13,
        lineHeight: 18,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 6,
    },
    rowLeft: { flexDirection: "row", alignItems: "center" },
    rowText: { fontSize: 15, color: "#222" },

    // common list item style
    listItem: {
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#eee",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // shadows
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },
    listText: {
        fontSize: 15,
        color: "#222",
    },

    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#eee",
        alignItems: "center",
        justifyContent: "center",
    },
});
