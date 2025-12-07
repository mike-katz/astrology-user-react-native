import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { colors, Fonts } from "../../styles";
import WalletIcon from "../../assets/icons/WalletIcon";

const { width } = Dimensions.get("window");

const AMOUNTS = [
  { id: 1, amount: 100, extra: "100% Extra" },
  { id: 2, amount: 200, extra: "100% Extra" },
  { id: 3, amount: 500, extra: "40% Extra", tag: "MOST POPULAR" },
  { id: 4, amount: 1000, extra: "20% Extra" },
  { id: 5, amount: 2000, extra: "10% Extra" },
  { id: 6, amount: 3000, extra: "10% Extra" },
  { id: 7, amount: 4000, extra: "12% Extra" },
  { id: 8, amount: 8000, extra: "12% Extra" },
];

const WalletBottomSheet = ({ visible, onClose,name,fromScreen }: any) => {
  const [selected, setSelected] = useState(2);

  const renderAmountBox = ({ item }: any) => {
    const isSelected = item.id === selected;

    return (
      <TouchableOpacity
        style={[
          styles.amountBox,
          isSelected && styles.amountBoxSelected,
        ]}
        onPress={() => setSelected(item.id)}
      >
        {item.tag && (
          <View style={styles.tagWrap}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        )}

        <Text style={styles.amountText}>₹{item.amount}</Text>

        <View style={styles.extraWrap}>
          <Text style={styles.extraText}>{item.extra}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Low wallet balance!</Text>

                  <View style={styles.walletBox}>
                    <WalletIcon
                      style={styles.walletIcon}
                    />
                    <Text style={styles.walletAmount}>₹ 0</Text>
                  </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Grey note */}
          <Text style={styles.minText}>
            Minimum balance required: ₹120 (for 5 minutes){'\n'}
            <Text style={styles.needText}>
              {fromScreen === "chat"
                ? `You need ₹120 more to start chat with ${name}`
                : `You need ₹200 more to start call with ${name}`}
          </Text>
          </Text>

      

          {/* Amount List */}
          <FlatList
            data={AMOUNTS}
            numColumns={4}
            renderItem={renderAmountBox}
            keyExtractor={(i) => i.id.toString()}
            columnWrapperStyle={{ justifyContent: "flex-start" }}
            contentContainerStyle={{ paddingHorizontal:5, paddingTop: 10 }}
          />

          {/* Proceed Button */}
          <TouchableOpacity style={styles.proceedBtn}>
            <Text style={styles.proceedText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default WalletBottomSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  container: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 30,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  headerTitle: {
    flex: 1,
    fontSize: 18,
    color: "#000",
    fontFamily:Fonts.SemiBold
  },

  walletBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginRight:20
    },

    walletIcon: {
        marginRight: 6,
        
    },

    walletAmount: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily:Fonts.Medium
    },

  closeBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },

  closeBtnText: {
    fontSize: 28,
    lineHeight: 28,
    marginTop: -4,
    fontFamily:Fonts.SemiBold
  },

  minText: {
    marginTop: 5,
    backgroundColor: "#F7F7F7",
    padding: 12,
    borderRadius: 10,
    fontSize: 13,
    color: "#333",
    fontFamily:Fonts.Medium
  },

  needText: {
    fontSize: 11,
    color: "#555",
    marginTop: 10,
    fontFamily:Fonts.Medium
  },

  amountBox: {
    width: (width-58) / 4,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
     marginRight: 7, 
  },

  amountBoxSelected: {
    borderWidth: 2,
    borderColor: colors.primaryColor,
    backgroundColor: "#FFF8D8",
  },

  amountText: {
    fontSize: 12,
    color: "#000",
    fontFamily:Fonts.Medium,
    marginBottom:13
  },

  extraWrap: {
    width: "100%",
    backgroundColor: "#EAF7E9",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },

  extraText: {
    fontSize: 10,
    color: "#2C9A57",
    fontWeight: "500",
    fontFamily:Fonts.SemiBold
  },

  tagWrap: {
    position: "absolute",
    top: -10,
    backgroundColor: "#FF6F3C",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  tagText: {
    color: "#fff",
    fontSize: 6,
    fontWeight: "600",
    fontFamily:Fonts.Medium
  },

  proceedBtn: {
    backgroundColor: colors.primaryColor,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },

  proceedText: {
    fontSize: 16,
    color: "#000",
    fontFamily:Fonts.SemiBold
  },
});
