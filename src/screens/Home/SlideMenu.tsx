import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, Fonts } from "../../styles";
import DeviceInfo from 'react-native-device-info';
import { useNavigation } from "@react-navigation/native";
import { ServiceConstants } from "../../services/ServiceConstants";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AppleIcon from "../../assets/icons/AppleIcon";
import LinkedInIcon from "../../assets/icons/LinkedInIcon";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import InstagramIcon from "../../assets/icons/InstagramIcon";
import WebIcon from "../../assets/icons/WebIcon";
import YoutubeIcon from "../../assets/icons/YoutubeIcon";
import { defaultProfile } from "../../constant/AppConst";

const { width } = Dimensions.get("window");

export const SlideMenu = ({ visible, onClose }:any) => {
const slideAnim = useRef(new Animated.Value(-width)).current;
const navigation = useNavigation<any>();
const version = DeviceInfo.getVersion();       // e.g. "1.1.418"
const buildNumber = DeviceInfo.getBuildNumber(); // e.g. "101"
 const userDetailsData = useSelector((state: RootState) => state.userDetails.userDetails);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible]);

  const handleSocialClick = (name) => {
  console.log("Clicked:", name);

  switch (name) {
    case "apple":
      // open apple login
      break;
    case "google":
      // open google login
      break;
    case "facebook":
      // open facebook
      break;
    default:
      break;
  }
};

  const handleMenuClick = (item:any) => {
  console.log("Menu clicked:", item.title);

  switch (item.title) {
        case "Home":
      navigation.navigate("Home");
      break;

    case "Astrology Blog":
      navigation.push("AstrologyBlogScreen");
      break;

    case "Book a Pooja":
      navigation.navigate("Remedies");
      break;
      
    case "AstroRemedy":
      navigation.navigate("Remedies");
      break;

    case "Chat with Astrologers":
      navigation.navigate("Chat");
      break;

    case "My Following":
        if(ServiceConstants.User_ID==null){
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'AuthStack' }]
                });
          }else{
            navigation.push('FollowingScreen'); 
          }
      break;

    case "Wallet Transactions":
                 if(ServiceConstants.User_ID==null){
          navigation.reset({
                        index: 0,
                        routes: [{ name: 'AuthStack' }]
                      });
       }else
          navigation.push("OrderHistoryScreen");
      break;

    case "Order History":
             if(ServiceConstants.User_ID==null){
          navigation.reset({
                        index: 0,
                        routes: [{ name: 'AuthStack' }]
                      });
       }else
          navigation.push("OrderHistoryScreen");
      break;

    case "Settings":
       if(ServiceConstants.User_ID==null){
          navigation.reset({
                        index: 0,
                        routes: [{ name: 'AuthStack' }]
                      });
       }else
          navigation.push("SettingsScreen");
      break;

    default:
      console.log("No screen mapped");
  }
  onClose();
};

  return (
  <>
    {/* BACKDROP OVERLAY */}
    {visible && (
      <Animated.View
        style={[
          styles.backdrop,
          { opacity: slideAnim.interpolate({
              inputRange: [-width, 0],
              outputRange: [0, 1]
            })
          }
        ]}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPress={onClose} // tap outside to close
        />
      </Animated.View>
    )}

                <Animated.View style={[styles.container, { left: slideAnim }]}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* HEADER */}
                    <View style={styles.header}>
                      <Pressable onPress={()=>{
                        if(ServiceConstants.User_ID==null){
                              navigation.reset({
                                index: 0,
                                routes: [{ name: 'AuthStack' }]
                              });
                        }else{
                          navigation.push('EditProfileScreen'); 
                        }
                        onClose();}} style={{flexDirection:'row', alignItems:'center'}}>
                        <FastImage
                            source={{ uri: userDetailsData.profile?userDetailsData.profile:defaultProfile }}
                            style={styles.profileImg}
                        />
                        <View>
                          <Text style={styles.name}>{userDetailsData.name || "User"}</Text>
                          <Text style={styles.phone}>{ServiceConstants.User_PHONE ? `+91-${ServiceConstants.User_PHONE}` : ""}</Text>
                        </View>
                  </Pressable>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <Icon name="close" size={24} />
                    </TouchableOpacity>
                    </View>

                    {/* MENU LIST */}
                    <View style={{ marginTop: Platform.OS==='ios'?30:10 }}>
                    {MENU_ITEMS.map((item, i) => (
                        <TouchableOpacity key={i} style={styles.menuRow} onPress={()=>handleMenuClick(item)}>
                        <Icon name={item.icon} size={22} color="#444" />

                        <Text style={styles.menuText}>{item.title}</Text>

                        {item.badge && (
                            <View style={styles.badge}>
                            <Text style={styles.badgeText}>New</Text>
                            </View>
                        )}
                        </TouchableOpacity>
                    ))}
                    </View>

                    {/* Social icons */}
                    <View style={{ marginTop: 40, paddingLeft: 20 }}>
                    <Text style={styles.available}>Also available on</Text>

                    <View style={styles.socialRow}>
                     {SOCIAL.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.socialIcon}
                          onPress={() => handleSocialClick(item.name)}
                        >
                          <item.icon width={24} height={24} />
                        </TouchableOpacity>
                      ))}
                    </View>
                    </View>

                    {/* VERSION */}
                    <Text style={styles.version}>Version {version}({buildNumber})</Text>

                </ScrollView>
                </Animated.View>
    </>
  );
};

// MENU ITEMS
const MENU_ITEMS = [
  { icon: "home-outline", title: "Home" },
  { icon: "fire", title: "Book a Pooja", badge: true },
  { icon: "headset", title: "Customer Support Chat" },
  { icon: "wallet-outline", title: "Wallet Transactions" },
  { icon: "gift-outline", title: "Redeem Gift Card" },
  { icon: "clock-outline", title: "Order History" },
  { icon: "shopping", title: "AstroRemedy" },
  { icon: "book-open-outline", title: "Astrology Blog" },
  { icon: "account-voice", title: "Chat with Astrologers" },
  { icon: "account-multiple-outline", title: "My Following" },
  { icon: "star-box-multiple-outline", title: "Free Services" },
  { icon: "cog-outline", title: "Settings" },
];

// Social icons sample
const SOCIAL = [
  { icon: AppleIcon, name: "apple" },
  { icon: WebIcon, name: "web" },
  { icon: FacebookIcon, name: "facebook" },
  { icon: YoutubeIcon, name: "youtube" },
  { icon: InstagramIcon, name: "instagram" },
  { icon: LinkedInIcon, name: "linkedin" },
];

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 998,
  },
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: width * 0.78,
    backgroundColor: "#fff",
    zIndex: 999,
    elevation: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    top:Platform.OS==='ios'?'5%':'3%'
  },
  profileImg: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginRight: 15,
    backgroundColor: colors.primaryLightColor, 
    borderWidth:1,
    borderColor:colors.primaryColor
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily:Fonts.SemiBold
  },
  phone: {
    marginTop: 3,
    color: "#666",
    fontSize: 13,
    fontFamily:Fonts.Regular
  },
  closeBtn: {
    marginLeft: "auto",
  },

  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Platform.OS==='ios'?10:11,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 15,
    marginLeft: 16,
    color: "#222",
  },

  badge: {
    backgroundColor: "#FF5555",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },

  available: {
    fontSize: 13,
    color: "#444",
    marginBottom: 10,
  },

  socialRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialIcon: {
    width: 28,
    height: 28,
    marginRight: 10,
  },

  version: {
    color: colors.primaryColor,
    fontSize: 13,
    textAlign: "center",
    marginVertical: 20,
  },
});
