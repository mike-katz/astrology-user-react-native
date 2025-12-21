import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FastImage from "react-native-fast-image";

type Props = {
  visible: boolean;
   data: any; 
  onClose: () => void;
};

export default function WaitlistJoinedModal({ visible,data, onClose }: Props) {
  const userDetailsData = useSelector((state: RootState) => state.userDetails.userDetails);
  const panditDetails =
  Array.isArray(data) && data.length > 0
    ? data[data.length - 1]
    : null;
  // console.log("Waitlist Joined Modal =="+panditDetails);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* ❌ Close */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Feather name="x" size={22} color="#444" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>Waitlist Joined!</Text>

          {/* Avatars */}
          <View style={styles.avatarRow}>
            {/* User */}
            <View style={styles.avatarBlock}>
              <View style={styles.avatarWrapper}>
              <FastImage source={{ uri: panditDetails.profile }} style={styles.avatar} />
              </View>
              <Text style={styles.name}>{panditDetails.name}</Text>
            </View>

            {/* Chat Icon */}
            <View style={styles.chatIcon}>
              <Feather name="message-circle" size={18} color="#fff" />
            </View>

            {/* Astrologer */}
            <View style={styles.avatarBlock}>
              <View style={styles.avatarWrapper}>
                <FastImage source={{ uri: userDetailsData.profile }} style={styles.avatar} />
              </View>
              <Text style={styles.name}>{userDetailsData.name}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            You will receive a chat request when the astrologer is ready.
            {"\n"}
            Don’t worry! You will not be charged for missing this session.
          </Text>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#444",
    marginBottom: 24,
  },

  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  avatarBlock: {
    alignItems: "center",
  },

  avatarWrapper: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 3,
    borderColor: "#FFD200", // yellow ring
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  chatIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 14,
  },

  name: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },

  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 8,
  },
});
