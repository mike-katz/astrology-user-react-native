import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
  Pressable,
  Alert,
} from "react-native";
import Gift1 from "../../assets/icons/Gift1";
import FastImage from "react-native-fast-image";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import RightGreenIcon from "../../assets/icons/RightGreenIcon";
import { colors, Fonts } from "../../styles";
import { BackIcon } from "../../assets/icons";
import ShareIcon from "../../assets/icons/ShareIcon";
import { AppSpinner } from "../../utils/AppSpinner";
import { applyUserFollowApi, getPanditDetails } from "../../redux/actions/UserActions";
import { formatKnowledge } from "../../constant/AppConst";
import ChatIcon from "../../assets/icons/ChatIcon";
import CallIcon from "../../assets/icons/CallIcon";
import { StarRating } from "../../constant/Helper";
import AssistanceIcon from "../../assets/icons/AssistanceIcon";
import RightIcon from "../../assets/icons/RightIcon";
import SendGiftIcon from "../../assets/icons/SendGiftIcon";
import GiftInfoIcon from "../../assets/icons/GiftInfoIcon";
import OptionIcon from "../../assets/icons/OptionIcon";
import WalletBottomSheet from "../Payment/WalletBottomSheet";
import { ServiceConstants } from "../../services/ServiceConstants";

export default function PanditProfileDetailsScreen({route}:any) {
  const { astrologerId } = route.params;
  const navigation = useNavigation<any>();
  const link_web = 'https://astrotalk.com/horoscope/todays-horoscope';
  const [activity, setActivity] = useState<boolean>(false);
  const [astrologersDetails, setAstrologersDetails] = useState<any>({});
  const [expanded, setExpanded] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [showWallet, setShowWallet] = useState(false); //For Wallet
  const [reviews, setReviews] = useState<any[]>([]);

  // const astrologersDetails = {
  //   "id": 3,
  //   "mobile": "9876543210",
  //   "countryCode": "+91",
  //   "name": "Pandit Test User",
  //   "dob": "1990-05-12T00:00:00.000Z",
  //   "city": "Varanasi",
  //   "email": "pandit.test@example.com",
  //   "status": "active",
  //   "isOnline": false,
  //   "isStreaming": false,
  //   "isverified": true,
  //   "availableFor": "call",
  //   "knowledge": [
  //     "vedic",
  //     "tarot"
  //   ],
  //   "experience": "10 years",
  //   "charge": 15,
  //   "language": [
  //     "hindi",
  //     "english"
  //   ],
  //   "totalChat": 0,
  //   "totalCall": 0,
  //   "about": null,
  //   "profile": null,
  //   "whatsAppStatus": null,
  //   "whatsAppExpire": null,
  //   "gallery": [],
  //   "otp": "1234",
  //   "created_at": "2025-12-03T06:51:33.193Z"
  // };

  // const reviews = [
  //   {
  //     user: "Amit",
  //     rating: 5,
  //     review:
  //       "She was mind blowing...too good...accurate predictions...one of the best astrologer in this platform...highly recommended.",
  //     reply: "Thank you so much Amit",
  //   },
  //   {
  //     user: "Amit",
  //     rating: 5,
  //     review:
  //       "She was mind blowing...too good...accurate predictions...one of the best astrologer in this platform...highly recommended.",
  //     reply: "Thank you so much Amit",
  //   },
  //   {
  //     user: "Amit",
  //     rating: 4,
  //     review:
  //       "She was mind blowing...too good...accurate predictions...one of the best astrologer in this platform...highly recommended.",
  //     reply: "Thank you so much Amit",
  //   },
  // ];

  const gifts = [
    { name: "Flowers", price: "₹15", img: require("../../assets/images/Gift1.png") },
    { name: "Pooja Thali", price: "₹21", img: require("../../assets/images/Gift2.png") },
    { name: "Heart", price: "₹21", img: require("../../assets/images/Gift3.png") },
    { name: "Chocolates", price: "₹51", img: require("../../assets/images/Gift4.png") },
    { name: "Sweets", price: "₹101", img: require("../../assets/images/Gift5.png") },
    { name: "Magician", price: "₹101", img: require("../../assets/images/Gift6.png") },
    { name: "Crown", price: "₹501", img: require("../../assets/images/Gift7.png") },
    { name: "Dakshina", price: "₹2100", img: require("../../assets/images/Gift8.png") },
    { name: "Ganesha", price: "₹5100", img: require("../../assets/images/Gift9.png") },
  ];


const showGiftInfo = () => {
  Alert.alert(
    "How Gifts works?",
    `1. Gifts are virtual.\n
2. Gifts are voluntary & non-refundable.\n
3. Company doesn't guarantee any service in exchange of gifts.\n
4. Gifts can be encashed by the astrologer in monetary terms as per company policies.`,
    [
      { text: "Ok", style: "default" }
    ],
    { cancelable: true }
  );
};

const showProfileOptions = () => {
    Alert.alert(
      "",
      "",
      [
        { text: "Report & Block", onPress: () => console.log("Block") },
        {   
          text: isFollowed
      ? `Unfollow ${astrologersDetails?.name?.trim() || 'Astrologer'}`
      : `Follow ${astrologersDetails?.name?.trim() || 'Astrologer'}`, 
          onPress: () =>{
            if(ServiceConstants.User_ID==null){
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'AuthStack' }]
                    });
              }else{
                applyFollowApi();
              }
        }},
        { text: "Cancel", style: "cancel" }
      ],
      { cancelable: true }
    );
};

const showChatWithAssistant = () => {
  Alert.alert(
    "",
    `You can chat with astrologer's assistant only when you have taken a paid session with the astrologer.`,
    [
      { text: "Ok", style: "default" }
    ],
    { cancelable: true }
  );
};

  useEffect(() => {
    callPanditProfileApi();
  }, []);
  useEffect(() => {
    
  }, [isFollowed]);
  const callPanditProfileApi = () => {
    setActivity(true)
    getPanditDetails(astrologerId).then(response => {
      setActivity(false)
      const result = JSON.parse(response);
      setIsFollowed(result.data.isFollow);
      setAstrologersDetails(result.data);
      setReviews(result.data.reviews || []);
      console.log('Pandit Details Result:', result);
    });
  }
    const applyFollowApi = () => {
      setActivity(false)
      applyUserFollowApi(astrologerId).then(response => {
        setActivity(false)
        const result = JSON.parse(response);
        setIsFollowed(!isFollowed)
        console.log('Apply Review:', result);
      });
  }

  const handleBack = () => {
    navigation.goBack();
  }

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

  const handleAllReviews = () => {
    navigation.push('PanditReviewListScreen',{astrologerId:astrologerId,astroName:astrologersDetails.name});
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
          {/* ---------- Header ---------- */}
          <Animated.View style={[styles.header,]}>
            <Text style={styles.headerTitle}>Profile</Text>

            <TouchableOpacity style={styles.backBtn}>
              <BackIcon size={16} onPress={handleBack} tintColor={undefined} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
              <ShareIcon
                width={30} height={30}
              />
            </TouchableOpacity>
            <View style={{ position: 'absolute', width: '100%', height: .4, backgroundColor: '#7B7B7B', bottom: 0 }}></View>
          </Animated.View>
         {(activity || !astrologersDetails?.id) ? ( <View/> ):(<ScrollView showsVerticalScrollIndicator={false}>
          {/* ---------- Top Card ---------- */}
          <View style={styles.profileContainer}>
            {/* RIBBON */}
            <View style={styles.ribbonContainer}>
              <View style={styles.ribbon}>
                <View style={styles.ribbonTextWrapper}>
                <Text style={styles.ribbonText}>*Celebrity*</Text>
                </View>
              </View>
            </View>
            <View style={styles.profileCard}>
              <View style={{ alignItems: "center" }}  >
              <FastImage
                source={{ uri: astrologersDetails.profile as any }}
                style={styles.profileImg}
              />
              <StarRating size={12} rating={4} />
              <Text style={styles.orders}>{astrologersDetails.orders} orders</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{astrologersDetails.name|| 'Astrologer'}</Text>
                  <View style={{ marginHorizontal: 6 }}>
                    {astrologersDetails.isverified && <RightGreenIcon width={16} height={16} />}
                  </View>
                  {!isFollowed && (<Pressable style={styles.followBtn} onPress={() => {
                      if(ServiceConstants.User_ID==null){
                              navigation.reset({
                                index: 0,
                                routes: [{ name: 'AuthStack' }]
                              });
                        }else{
                          applyFollowApi();
                        }
                  }}>
                    <Text style={styles.followText}>Follow</Text>
                  </Pressable>)}
              
                  <TouchableOpacity style={{position:'absolute',right:0}} onPress={()=>showProfileOptions()}> <OptionIcon width={20} height={20} /></TouchableOpacity>
                </View>

                <Text style={styles.subText}>{formatKnowledge(astrologersDetails.knowledge)}</Text>
                <Text style={styles.subText}>{formatKnowledge(astrologersDetails.language)}</Text>
                <Text style={styles.subText}>Exp - {astrologersDetails.experience}</Text>
                <Text style={styles.price}>₹ {astrologersDetails.charge}/min</Text>
                {/* <View style={styles.priceRow}>
                  <Text style={styles.oldPrice}>₹ {astrologersDetails.charge}</Text>
                  <Text style={styles.newPrice}>{astrologersDetails.charge}/min</Text>
                </View> */}
              </View>

            </View>

            {/* ---------- Minutes Row ---------- */}
            <View style={styles.minutesCard}>
              <View style={styles.minutesItem}>
                <ChatIcon width={23} height={23} style={styles.minutesIcon}/>
                <Text style={styles.minutesValue}>{astrologersDetails.totalChat} </Text>
                <Text style={styles.minutesLabel}>min</Text>
              </View>
              <View style={{borderWidth:.6,borderColor:'gray',width:.6,height:25}}/>
              <View style={styles.minutesItem}>
                 <CallIcon width={21} height={21} style={styles.minutesIcon}/>
                <Text style={styles.minutesValue}>{astrologersDetails.totalCall} </Text>
                <Text style={styles.minutesLabel}>min</Text>
              </View>
            </View>
          </View>
          {/* ---------- About ---------- */}
          <View style={styles.aboutContainer}>
          <Text style={styles.about}
            numberOfLines={expanded ? undefined : 2}>
            {astrologersDetails.about || "No description available."}
          </Text>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text style={styles.showMore}>
                {expanded ? "Show less" : "Show more"}
              </Text>
            </TouchableOpacity>
          </View>
          {/* ---------- Profile Photos ---------- */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbsRow}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <FastImage
                key={i}
                source={{ uri: 'https://aws.astrotalk.com/consultant_pic/p-115847.jpg' }}
                style={styles.thumbImg}
              />
            ))}
          </ScrollView>


          {/* ---------- Reviews ---------- */}
          <View style={styles.sectionHeader}>
            {reviews.length > 0 ? (<Text style={styles.sectionTitle}>User Reviews</Text>
            ) : null}
            {reviews.length > 0 ? (<TouchableOpacity onPress={()=>handleAllReviews()}>
              <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity> ) : null}
          </View>

          {reviews.map((item, idx) => (
            <View key={idx} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <FastImage
                  source={{ uri:'https://aws.astrotalk.com/consultant_pic/p-115847.jpg' }}
                  style={styles.reviewAvatar} />
                <Text style={styles.reviewUser}>{item.user ||'User'}</Text>
               
              </View>

              <View style={{height:6}}/>
              <StarRating size={12} rating={item.rating} />
              <Text style={styles.reviewText}>{item.message}</Text>

              {item.reply?.trim() ? (<View style={styles.replyBox}>
                <Text style={styles.replyName}>{astrologersDetails.name}</Text>
                <Text>{item.reply}</Text>
              </View>) : null}
            </View>
          ))}

          {reviews.length > 3 ? (<TouchableOpacity onPress={()=>handleAllReviews()}>
            <Text style={styles.seeAllReviews}>See all reviews</Text>
            </TouchableOpacity>
            ) : null}

          {/* ---------- Chat with Assistant ---------- */}
          <Pressable style={styles.optionRow} onPress={()=>showChatWithAssistant()}>
            <AssistanceIcon width={25} height={25} style={styles.optionIcon} />
            <Text style={styles.optionText}>Chat with Assistant</Text>
            <RightIcon width={9} height={17} />
          </Pressable>

          {/* ---------- Send Gift ---------- */}
          <View style={styles.sendGiftContainer} >
          <View style={{ flexDirection:'row',alignItems:'center', paddingHorizontal: 14, }} >
              <SendGiftIcon width={25} height={25} />
              <Text style={styles.giftTitle}>Send Gift to {astrologersDetails.name}</Text>
              <Pressable onPress={()=>showGiftInfo()}><GiftInfoIcon width={18} height={18}  /> </Pressable>
          </View>

                <View style={styles.giftRow}>
                  {gifts.map((item, idx) => {
                    const isSelected = selectedGift === idx;
                    return (
                    <Pressable 
                    onPress={() => setSelectedGift(idx)}
                    style={[styles.giftItem, isSelected && styles.selectedGiftItem]}
                    key={idx}>
                      <View style={{height:50,width:55, justifyContent:'center', alignItems:'center'}}> 
                        <Image source={item.img}  /></View>
                      <Text style={styles.giftAmount}>{item.price}</Text>
                      <Text style={styles.giftName}>{item.name}</Text>
                    </Pressable>
                  )})}
                </View>

                {selectedGift !== null && <View style={styles.actionRow}>
                <Pressable style={styles.rechargeBtn} onPress={() => { setShowWallet(true);}}>
                  <Text style={styles.rechargeText}>Recharge</Text>
                </Pressable>

                <Pressable style={styles.sendBtn} onPress={() => {}}>
                  <Text style={styles.sendText}>Send</Text>
                </Pressable>
              </View>}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>)}

        {/* ---------- Bottom Buttons ---------- */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.chatBtn}>
            <ChatIcon color="#1C9659" width={23} height={23} style={styles.minutesIcon}/>
            <Text style={styles.chatBtnText}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.callBtn}>
            <CallIcon color="#1C9659" width={21} height={21} style={styles.minutesIcon}/>
            <View style={{alignItems:'center'}}>
              <Text style={styles.callBtnText}>Call</Text>
             {/* <Text style={styles.callSub}>Online in 18h 7m</Text>  */}
             </View>
          </TouchableOpacity>
        </View>
         <WalletBottomSheet
            visible={showWallet}
            onClose={() => setShowWallet(false)}
            name={''}
            fromScreen={'chat'}
          />
          <AppSpinner show={activity} />
      </SafeAreaView>
    </SafeAreaProvider>

  );
}

//
// ------------------ Styles ------------------
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
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
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 15,
  },

  // Profile Card
  profileContainer: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderColor: "#eee",
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  profileCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingBottom: 14,
    marginLeft:4,
    marginTop:4
  },
  ribbonContainer: {
  position: "absolute",
    top: 11,
  left: -36, // move left so it cuts diagonally like screenshot
  zIndex: 10,
},
ribbon: {
  width: 110,                       // long enough to cross the corner
  paddingVertical: 2,
  backgroundColor: "#000",       // same golden color
  transform: [{ rotate: "-45deg" }],// angle like screenshot
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 4,
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 3,
  elevation: 4,
},// wrapper rotates back
ribbonTextWrapper: {
  transform: [{ rotate: "-45deg" }],
  alignItems: "center",
  justifyContent: "center",
},
ribbonText: {
  color: "#fff",
  fontSize: 7,
  fontFamily: Fonts.SemiBold,
  transform: [{ rotate: "45deg" }], // rotate text back
},
  profileImg: { width: 70, height: 70, borderRadius: 35, marginRight: 12,
    marginBottom:6,
    borderWidth: 2, borderColor:colors.primaryColor, backgroundColor: '#fff'
   },
  orders: { color: '#777', marginTop: 3, fontSize: 9 },
  nameRow: { flexDirection: "row", alignItems: "center" },
  name: { fontSize: 18, fontWeight: "700", fontFamily: Fonts.Regular },
  followBtn: {
    marginLeft: 4,
    backgroundColor: colors.primaryColor,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 6,
  },
  followText: { color: "#000", fontWeight: "600", fontSize: 10, fontFamily: Fonts.SemiBold },

  subText: { color: "#666", marginTop: 2, fontWeight: "500", fontSize: 13, fontFamily: Fonts.Medium },

  price: { marginTop: 4, fontSize: 14, fontWeight: '600' ,fontFamily:Fonts.Medium},
  priceRow: { flexDirection: "row", marginTop: 5, alignItems: "center" },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#999",
    fontSize: 14,
    marginRight: 6,
  },
  newPrice: { color: "#CA0D33", fontSize: 15, fontWeight: "600" },

  // Minutes Row
  minutesCard: {
    flexDirection: "row",
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 14,
  },
  minutesItem: { flex: 1,     flexDirection: "row", justifyContent:'center', alignItems: "center" },
  minutesIcon: { marginRight: 10 },
  minutesValue :{fontFamily: Fonts.SemiBold, fontSize: 16, fontWeight: "700", color: "#000"},
  minutesLabel:{fontFamily: Fonts.Medium, fontSize: 16, fontWeight: "600", color: "#7B7B7B"},

  // About
  aboutContainer: {    
    padding: 15,
    backgroundColor: "#fff",
    borderColor: "#eee",
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2
  },
  about: {  color: "#939192", lineHeight: 20,fontSize:14,fontWeight:'500',fontFamily: Fonts.Medium },
  showMore: { color: "#0084ff",fontSize:14,fontWeight:'500',fontFamily: Fonts.Medium },

  // Thumbnails
  thumbsRow: { flexDirection: "row", paddingLeft: 15 },
  thumbImg: {
    width: 110,
    height: 110,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#eee",
  },

  // Section Header
  sectionHeader: {
    marginTop:10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: { color:'#000000', fontSize: 18,fontWeight:'600',fontFamily: Fonts.SemiBold },
  viewAll: { color: "#7B7B7B", marginTop: 4,fontSize:14,fontWeight:'500',fontFamily: Fonts.Medium },

  // Reviews
  reviewCard: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2
  },

  reviewHeader: { flexDirection: "row", alignItems: "center" },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20 },
  reviewUser: { marginLeft: 10,fontSize:20, fontWeight: "500", flex: 1 ,fontFamily: Fonts.Medium},
  reviewMenu: { fontSize: 20 },

  reviewText: { marginTop: 8, lineHeight: 18, color: "#939192" ,fontSize:14,fontWeight:'500',fontFamily: Fonts.Medium},

  replyBox: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  replyName: { fontSize:14,fontWeight: "500",fontFamily:Fonts.Medium, marginBottom: 4 },

  seeAllReviews: {
    paddingLeft: 15,
    color: "#189018",
    fontWeight: "600",
    marginBottom: 10,
    fontSize:16,
    fontFamily: Fonts.SemiBold
  },

  // Option Row
  optionRow: {
    flexDirection: "row",
     backgroundColor: "#fff",
     alignItems: "center",
     marginVertical:6,
    margin: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2
  },
  optionIcon: { fontSize: 20, marginRight: 10 },
  optionText: { flex: 1,color:'#000', fontSize: 16 ,fontWeight:'500',fontFamily: Fonts.Medium},


  // Gifts
  sendGiftContainer:{
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2
  },
  giftTitle: { padding: 15, fontSize: 18, fontWeight: "500",fontFamily: Fonts.Medium, color:'#000' },
  giftRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  giftItem: {
    width: "22%",
    margin: "1.5%",
    alignItems: "center",
    paddingVertical: 10,
  },
    selectedGiftItem: {
    backgroundColor: "rgba(0,0,0,0.1)", // light black opacity
    borderWidth: .2,
    borderColor: "#00009",
    borderRadius: 8,
  },
  giftAmount: { fontSize:12,fontWeight: "600",fontFamily:Fonts.SemiBold,  color: "#000",marginTop: 6 },
  giftName: {fontSize:12,fontWeight: "600",fontFamily:Fonts.SemiBold, color: "#000" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  rechargeBtn: {
    flex: 1,
    height: 48,
    backgroundColor: "#FFDD00", // Solid Yellow (like screenshot)
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  rechargeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    fontFamily: Fonts.SemiBold
  },

  sendBtn: {
    flex: 1,
    height: 48,
    backgroundColor: "#F7F1C3", // Light pastel yellow
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  sendText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    fontFamily: Fonts.SemiBold
  },


  // Bottom Bar
  bottomBar: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  chatBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 14,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
        shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.20,
    shadowRadius: 6,
    elevation: 8,
  },
  chatBtnText: { color: "#189018", fontSize: 16, fontWeight: "700",fontFamily: Fonts.SemiBold },

  callBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginLeft: 10,
    padding: 14,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.20,
    shadowRadius: 6,
    elevation: 8,
  },
  callBtnText: { color: "#189018", fontSize: 16, fontWeight: "700" ,fontFamily: Fonts.SemiBold},
  callSub: { color: "#007AFF", fontSize: 12, marginTop: 2, fontWeight: "500" ,fontFamily: Fonts.Medium},
});
