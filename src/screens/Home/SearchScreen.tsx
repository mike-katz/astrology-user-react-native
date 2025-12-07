import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { BackIcon } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../styles';

const SearchScreen = () => {
    const navigation = useNavigation<any>();
    const handleBack = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>

                {/* ---------- SEARCH BAR ---------- */}
                <View style={styles.searchRow}>
                    <TouchableOpacity style={styles.backBtn}>
                        <BackIcon size={16} onPress={handleBack} />
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Search astrologer, astromall products"
                        style={styles.searchInput}
                        placeholderTextColor="#A0A0A0"
                    />
                </View>

                {/* ---------- TOP SERVICES ---------- */}
                <Text style={styles.sectionTitle}>Top Services</Text>

                <View style={styles.topServicesContainer}>
                    <TouchableOpacity style={[styles.serviceBtn, styles.callBtn]}>
                        <Text style={styles.serviceIcon}>📞</Text>
                        <Text style={styles.serviceText}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.serviceBtn, styles.chatBtn]}>
                        <Text style={styles.serviceIcon}>💬</Text>
                        <Text style={styles.serviceText}>Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.serviceBtn, styles.mallBtn]}>
                        <Text style={styles.serviceIcon}>🛍️</Text>
                        <Text style={styles.serviceText}>AstroMall</Text>
                    </TouchableOpacity>
                </View>

                {/* ---------- QUICK LINKS ---------- */}
                <Text style={styles.sectionTitle}>Quick Link</Text>

                <View style={styles.quickLinkRow}>

                    <TouchableOpacity style={styles.quickCard}>
                        <Text style={styles.cardIcon}>👛</Text>
                        <Text style={styles.cardText}>Wallet</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickCard}>
                        <Text style={styles.cardIcon}>🎧</Text>
                        <Text style={styles.cardText}>Customer Support</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickCard}>
                        <Text style={styles.cardIcon}>🛒</Text>
                        <Text style={styles.cardText}>Order History</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickCard}>
                        <Text style={styles.cardIcon}>👤</Text>
                        <Text style={styles.cardText}>Profile</Text>
                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default SearchScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 15,
    },

    /* ----------------- SEARCH BAR ----------------- */
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: "center",
    },
    searchInput: {
        flex: 1,
        height: 42,
        borderRadius: 10,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 15,
        fontSize: 15,
        fontFamily:Fonts.Regular,
    },

    /* ----------------- TOP SERVICES ----------------- */
    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 12,
        color: "#333",
        fontFamily:Fonts.SemiBold,
    },

    topServicesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    serviceBtn: {
        flex: 1,
        flexDirection: "row",
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
    },

    callBtn: {
        backgroundColor: "#E7F1FB",
    },

    chatBtn: {
        backgroundColor: "#F6E7F9",
    },

    mallBtn: {
        backgroundColor: "#E5F8EA",
    },

    serviceIcon: {
        marginRight: 6,
        fontSize: 12,
    },
    serviceText: {
        fontFamily:Fonts.Regular,
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
    },

    /* ----------------- QUICK LINKS ----------------- */
    quickLinkRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    quickCard: {
        width: "23%",
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        alignItems: "center",
        paddingHorizontal: 5,
    },

    cardIcon: {
        fontSize: 16,
        marginBottom: 5,
    },

    cardText: {
        fontFamily:Fonts.Regular,
        fontSize: 12,
        fontWeight: "500",
        color: "#333",
        textAlign: "center",
    },
});
