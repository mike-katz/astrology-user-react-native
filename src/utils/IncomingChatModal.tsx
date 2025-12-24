import React from "react";
import {
  Modal, Text, StyleSheet, View, Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Feather from "react-native-vector-icons/Feather";
import { Fonts } from "../styles";
import FastImage from "react-native-fast-image";
type Props = {
  visible: boolean;
  data: any;
  onAccept: () => void;
  onReject: () => void;
};

const IncomingChatModal = ({ visible, data, onAccept, onReject }: Props) => {
  const panditDetails = Array.isArray(data) && data.length > 0 ? data[0] : null;
  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="fullScreen"
      statusBarTranslucent
    >
      <SafeAreaView style={styles.container}>
        <View style={{ position: 'absolute', top: 0, marginTop: '10%', alignItems: 'center' }}>
          {/* Header Text */}
          <Text style={styles.incomingText}>Incoming Chat request from</Text>

          {/* Brand */}
          <View style={styles.brandRow}>
            <Image
              source={require("../assets/icons/astrologer_logo.png")} // yellow icon
              style={styles.brandIcon}
            />
            <Text style={styles.brandText}>Astrotalk</Text>
          </View>
        </View>

        {/* Avatar */}
        <View style={{ alignItems: 'center', marginBottom: '40%' }}>
          <View style={styles.avatarWrapper}>
            <FastImage source={{ uri: panditDetails.profile }} style={styles.avatar} />
          </View>

          {/* Name */}
          <Text style={styles.name}>{panditDetails.name}</Text>
        </View>

        <View style={{ position: 'absolute', bottom: 0, marginBottom: '20%', alignItems: 'center' }}>
          {/* Start Chat Button */}
          <TouchableOpacity style={styles.startBtn} onPress={() => onAccept()}>
            <Feather name="message-circle" size={20} color="#fff" />
            <Text style={styles.startBtnText}>Start chat</Text>
          </TouchableOpacity>

          {/* Reject */}
          <TouchableOpacity onPress={onReject}>
            <Text style={styles.rejectText}>Reject Chat Request</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default IncomingChatModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: "center",
    paddingTop: 40
  },

  incomingText: {
    fontSize: 16,
    color: "#000",
    marginTop: 30,
    fontFamily: Fonts.SemiBold
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  brandIcon: {
    width: 22,
    height: 22,
    marginRight: 6,
  },

  brandText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    fontFamily: Fonts.SemiBold
  },

  avatarWrapper: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1.5,
    borderColor: "#F3E58C", // light yellow ring
    justifyContent: "center",
    alignItems: "center",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  name: {
    marginTop: 11,
    fontSize: 22,
    fontWeight: "600",
    color: "#000",
    fontFamily: Fonts.SemiBold
  },

  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2DB35D",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 40,
    elevation: 2,
  },

  startBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
    fontFamily: Fonts.SemiBold
  },

  rejectText: {
    marginTop: 26,
    fontSize: 14,
    color: "#E53935",
    fontWeight: "500",
    fontFamily: Fonts.SemiBold
  },
});
