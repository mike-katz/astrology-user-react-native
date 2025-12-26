import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { decryptData, secretKey } from "../services/requests";
import { deleteChatOrderAction, getChatInfoOrder } from "../redux/actions/UserActions";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { defaultProfile } from "../constant/AppConst";
import { colors, Fonts } from "../styles";
import { CustomDialogManager2 } from "./CustomDialog2";

const { width } = Dimensions.get("window");

type Props = {
  visible: boolean;
  data: any; 
  onClose: () => void;
  onDelete:() => void;
};

const OrderDetailsCard = ({ visible,data,onClose,onDelete }: Props) => {
const [selectedItem, setSelectedItem] = useState<any>({});

  useEffect(()=>{
    callInfoOrder();
  },[visible]);

  const callInfoOrder=()=>{
        getChatInfoOrder(data.order_id).then(response => {
            console.log("Info Order response ==>" + (response));
            const result = JSON.parse(response);
            if (result.success === true) {
                setSelectedItem(result.data);
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
                console.log("Info Order Error response ==>" + JSON.stringify(result3));
            }
        });
  }
  const callDeleteOrder = () =>{
            deleteChatOrderAction(data.order_id).then(response => {
            console.log("Info Order response ==>" + (response));
            const result = JSON.parse(response);
            if (result.success === true) {
            Alert.alert(
                "Success",
                result.message,
                [
                {
                    text: "Ok",
                    onPress: () => {
                        onDelete()
                    },
                },
                ]
            );
                
            } else if (result.success === false) {
                const result2 = decryptData(result.error, secretKey);
                const result3 = JSON.parse(result2);
                console.log("Info Order Error response ==>" + JSON.stringify(result3));
            }
        });
  }


  return (
     <Modal visible={visible} 
     transparent 
     animationType="fade">
    <View style={styles.overlay}>
      <View style={styles.card}>

        {/* Close Button */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Feather name="x" size={22} color="#888" />
        </TouchableOpacity>

        {/* Order Id */}
        <Text style={styles.orderId}>
          Order Id: <Text style={styles.orderIdValue}>#{selectedItem.order_id}</Text>
        </Text>

        {/* Content Row */}
        <View style={styles.row}>
          {/* Left Section */}
          <View style={styles.left}>
            <Text style={styles.name}>{selectedItem.name}</Text>

            <Text style={styles.date}>
              {moment(selectedItem.start_time).format("DD MMM YYYY, HH:mm A")}
            </Text>

            <Text style={styles.status}>{selectedItem?.status?.toUpperCase()}</Text>

            <Text style={styles.label}>Rate: ₹ {selectedItem.rate}/min</Text>
            <Text style={styles.label}>Duration: {selectedItem.duration} min</Text>
            <Text style={styles.label}>Deduction: ₹ {selectedItem.deduction}</Text>
          </View>

          {/* Right Section */}
          <View style={styles.right}>
            <View style={styles.avatar}>
              {/* <Text style={styles.avatarText}>avata</Text> */}
            
            <FastImage
                source={{uri:selectedItem.profile?selectedItem.profile:defaultProfile}}
                style={styles.avatar}
              />
            </View>

            <Text style={styles.rate}>₹ {selectedItem.rate}/min</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>{
            onClose()
            Alert.alert(
                "Delete Request",
                `Are you sure you want to delete this order?`,
                [
                { text: "No" },
                {
                    text: "Yes",
                    onPress: () => {
                        callDeleteOrder();
                    },
                },
                ]
            );
        }}>
        <Text style={{fontSize:18,color:"red",fontFamily:Fonts.Medium,textDecorationLine: "underline",}}>Delete Order</Text>
        </TouchableOpacity>
    
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
    borderBottomColor:colors.primaryColor,
    borderBottomWidth:11
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
});
