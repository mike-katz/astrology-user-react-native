import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { BackIcon } from "../../assets/icons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { colors, Fonts } from "../../styles";
import { ServiceConstants } from "../../services/ServiceConstants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FastImage from "react-native-fast-image";
const HelpSupportScreen = () =>{
    const navigation = useNavigation<any>();
    const userDetailsData = useSelector((state: RootState) => state.userDetails.userDetails);
    
    const handleBack = () => {
        navigation.goBack();
    }
  return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>

    {/* ----------  HEADER ---------- */}
    <Animated.View   style={[
                styles.header,
                // { backgroundColor: headerBackgroundColor }
            ]}>
      

        <Text style={styles.headerTitle}>Help & support</Text>

        <TouchableOpacity style={styles.backBtn}>
            <BackIcon size={16} onPress={handleBack} />
        </TouchableOpacity>
        <View style={{ position:'absolute',width:'100%', height: .1,backgroundColor:'#7B7B7B',bottom:0 }}></View>
    </Animated.View>

    <ScrollView style={styles.container}>
      

      {/* User Card */}
      <View style={styles.userCard}>
        <View style={styles.row}>
          <FastImage
              source={{ uri: userDetailsData.profile }}
              style={styles.avatar}/>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userDetailsData.name || "User"}</Text>
            <Text style={styles.userNumber}>{ServiceConstants.User_PHONE}</Text>
          </View>

          <TouchableOpacity style={styles.editIconWrapper} onPress={() => {
                   if(ServiceConstants.User_ID==null){
                      navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'AuthStack' }]
                                  });
                   }else{
                      navigation.push('EditProfileScreen')
                   }
            }}>
             <Feather name="edit-3" size={14} color="#444" />
          </TouchableOpacity>

        </View>

        <View style={styles.walletBox}>
          <Text style={styles.walletLabel}>Wallet & Recharge</Text>
          <View style={styles.walletRow}>
            <Text style={styles.walletAmount}>₹ 0</Text>

            <TouchableOpacity style={styles.rechargeBtn} onPress={() => navigation.push('AddMoneyScreen')}>
              <Text style={styles.rechargeText}>Recharge</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Options Row */}
      <View style={styles.optionsRow}>
        <TouchableOpacity style={styles.optionBox}>
            <Feather name="shopping-bag" size={20} color="#000" />
          <Text style={styles.optionText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBox}>
           <Feather name="credit-card" size={20} color="#000" />
          <Text style={styles.optionText}>My Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionBox}>
          <MaterialCommunityIcons name="account-star" size={20} color="#000" />
          <Text style={styles.optionText}>Astrologer Assistant</Text>
        </TouchableOpacity>
      </View>

      {/* Customer Support */}
      <TouchableOpacity style={styles.supportBox}>
          <Feather name="headphones" size={20} color="#000" />
        <Text style={styles.supportText}>Customer Support</Text>
        <View style={{ transform: [{ scaleX: -1 }] }}>
          <BackIcon size={16} />
        </View>
      </TouchableOpacity>

      {/* Account & Settings */}
      <View style={styles.settingsWrapper}>
        <Text style={styles.settingsTitle}>Account & Settings</Text>

        <TouchableOpacity style={styles.settingsItem}>
           <Feather name="heart" size={18} />
          <Text style={styles.settingsItemText}>Favorite Astrologers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
           <Feather name="settings" size={18} />
          <Text style={styles.settingsItemText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingsItem}>
          <Feather name="lock" size={18} />
          <Text style={styles.settingsItemText}>Manage my Privacy</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
    </SafeAreaView>
        </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
        fontFamily:Fonts.Medium
    },
    backBtn: {
        width: 60,
        height: 40,
        justifyContent: "center",
        paddingLeft: 10,
    },


  /* User Card */
  userCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: "#FFE8A6",
  },

  userInfo: {
    marginLeft: 12,
  },

  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    fontFamily:Fonts.Medium
  },

  userNumber: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
    fontFamily:Fonts.Medium
  },

  editIconWrapper: {
    marginLeft: "auto",
    backgroundColor: "#F2F2F2",
    padding: 6,
    borderRadius: 5,
    marginBottom: 30,
  },

  walletBox: {
    margin:-15,
    marginTop: 15,
    backgroundColor: "#FFF9D6",
    padding: 12,
    borderRadius: 10,
  },

  walletLabel: {
    color: "#777",
    marginBottom: 5,
    fontSize: 12,
    fontFamily:Fonts.Medium
  },

  walletRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  walletAmount: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily:Fonts.Medium
  },

  rechargeBtn: {
    marginLeft: "auto",
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 8,
  },

  rechargeText: {
    fontWeight: "600",
    fontFamily:Fonts.Medium
  },

  /* Option Boxes */
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginTop: 20,
  },

  optionBox: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 12,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    alignItems: "center",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222",
    textAlign: "center",
    fontFamily:Fonts.Medium
  },

  /* Customer Support */
  supportBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 25,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },

  supportText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily:Fonts.Medium
  },

  /* Settings Section */
  settingsWrapper: {
    marginTop: 30,
    paddingHorizontal: 15,
  },

  settingsTitle: {
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 20,
    fontFamily:Fonts.SemiBold
  },

  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.8,
    borderBottomColor: "#E5E5E5",
  },

  settingsItemText: {
    marginLeft: 15,
    fontSize: 15,
    color: "#222",
    fontWeight: "500",
    fontFamily:Fonts.Medium
  },
});

export default HelpSupportScreen;
