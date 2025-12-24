import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const { width } = Dimensions.get("window");

type Props = {
  visible: boolean;
  data: any; 
  onClose: () => void;
};

const OrderDetailsCard = ({ visible,data,onClose }: Props) => {
  return (
     <Modal visible={visible} transparent animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.card}>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Feather name="x" size={22} color="#888" />
        </TouchableOpacity>

        {/* Order Id */}
        <Text style={styles.orderId}>
          Order Id: <Text style={styles.orderIdValue}>00000000406400</Text>
        </Text>

        {/* Content Row */}
        <View style={styles.row}>
          {/* Left Section */}
          <View style={styles.left}>
            <Text style={styles.name}>Uttam Gajjar</Text>

            <Text style={styles.date}>
              24 Dec 2025, 10:53 PM
            </Text>

            <Text style={styles.status}>COMPLETED</Text>

            <Text style={styles.label}>Rate: ₹ 25/min</Text>
            <Text style={styles.label}>Duration: 2 min</Text>
            <Text style={styles.label}>Deduction: ₹ 50</Text>
          </View>

          {/* Right Section */}
          <View style={styles.right}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>avata</Text>
            </View>

            <Text style={styles.rate}>₹ 25/min</Text>
          </View>
        </View>

        {/* Bottom Yellow Bar */}
        <View style={styles.bottomBar} />
      </View>
    </View>
    </Modal>
  );
};

export default OrderDetailsCard;
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width - 40,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    overflow: "hidden",
  },

  closeBtn: {
    position: "absolute",
    right: 12,
    top: 12,
    zIndex: 10,
  },

  orderId: {
    fontSize: 15,
    color: "#777",
    marginBottom: 8,
  },
  orderIdValue: {
    color: "#999",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  left: {
    flex: 1,
    paddingRight: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },

  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },

  status: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2DBE60",
    marginBottom: 10,
  },

  label: {
    fontSize: 15,
    color: "#777",
    marginBottom: 4,
  },

  right: {
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F8B4B4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  rate: {
    fontSize: 14,
    color: "#555",
  },

  bottomBar: {
    height: 6,
    backgroundColor: "#F2E94E",
    marginTop: 14,
    borderRadius: 3,
  },
});
