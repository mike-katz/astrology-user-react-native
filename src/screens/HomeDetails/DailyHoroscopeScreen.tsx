import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  FlatList,
  Dimensions,
  StatusBar,
  Animated,
  Share,
  Pressable,
  Platform,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { colors, Fonts } from "../../styles";
import { BackIcon } from "../../assets/icons";
import ShareIcon from "../../assets/icons/ShareIcon";
import ChatWhiteIcon from "../../assets/icons/ChatWhiteIcon";
import CallWhiteIcon from "../../assets/icons/CallWhiteIcon";
import LoveDIcon from "../../assets/icons/LoveDIcon";
import CareerDIcon from "../../assets/icons/CareerDIcon";
import MoneyDIcon from "../../assets/icons/MoneyDIcon";
import HealthDIcon from "../../assets/icons/HealthDIcon";
import TravelDIcon from "../../assets/icons/TravelDIcon";
import FeedbackDialog from "../../utils/FeedbackDialog";
import NextArrowIcon from "../../assets/icons/NextArrowIcon";

const { width } = Dimensions.get("window");
interface Zodiac {
  id: string;
  name: string;
  avatarUri?: ImageSourcePropType;
}

const ZODIACS: Zodiac[] = [
  { id: "aries", name: "Aries", avatarUri: require("../../assets/images/AriesIcon.png") },
  { id: "taurus", name: "Taurus", avatarUri: require("../../assets/images/TaurusIcon.png") },
  { id: "gemini", name: "Gemini", avatarUri: require("../../assets/images/GeminiIcon.png") },
  { id: "cancer", name: "Cancer", avatarUri: require("../../assets/images/CancerIcon.png") },
  { id: "leo", name: "Leo", avatarUri: require("../../assets/images/LeoIcon.png") },
  { id: "virgo", name: "Virgo", avatarUri: require("../../assets/images/VirgoIcon.png") },
  { id: "libra", name: "Libra", avatarUri:require("../../assets/images/LibraIcon.png")  },
  { id: "scorpio", name: "Scorpio", avatarUri: require("../../assets/images/ScorpioIcon.png") },
  { id: "sagittarius", name: "Sagittarius", avatarUri: require("../../assets/images/SagittariusIcon.png") },
  { id: "capricorn", name: "Capricorn", avatarUri: require("../../assets/images/CapricornIcon.png") },
  { id: "aquarius", name: "Aquarius", avatarUri: require("../../assets/images/AquariusIcon.png") },
  { id: "pisces", name: "Pisces", avatarUri: require("../../assets/images/PiscesIcon.png") },
];

const CATEGORIES = [
  { id: "love", title: "Love", percent: 80,borderbg:'#CF7D8C', bg: "#FCEEED", icon: LoveDIcon },
  { id: "career", title: "Career", percent: 80,borderbg:'#D7B19E', bg: "#FEF5EC", icon: CareerDIcon },
  { id: "money", title: "Money", percent: 80,borderbg:'#68BDB0', bg: "#EFFAF4", icon: MoneyDIcon },
  { id: "health", title: "Health", percent: 80,borderbg:'#729DCA', bg: "#EFFAFE", icon: HealthDIcon },
  { id: "travel", title: "Travel", percent: 80,borderbg:'#A47FAB', bg: "#F8F0FB", icon: TravelDIcon },
];

const Insights = [
  { id: "i1", title: "“Peanut”", desc: "should be included in your diet based on your horoscope", image: "https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/11/14112553/Copy-of-Your-paragraph-text-7-768x488.jpg" },
  { id: "i2", title: "“Going Cycling”", desc: "should be included in your routine based on your horoscope", image: "https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/11/14112553/Copy-of-Your-paragraph-text-7-768x488.jpg" },
];

// Generate random hex color
const getRandomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

// Show emoji based on mood
const getMoodEmoji = (mood) => {
  switch (mood?.toLowerCase()) {
    case "happy": return "😀";
    case "sad": return "😢";
    case "angry": return "😡";
    case "calm": return "😌";
    case "romantic": return "🥰";
    case "excited": return "🤩";
    default: return "🙂"; // default mood
  }
};

export default function DailyHoroscopeScreen({ navigation }: any) {
const TOP_TABS = ["Yesterday", "Today", "Tomorrow"] as const;
const [activeTab, setActiveTab] = useState<typeof TOP_TABS[number]>("Today");
const [selectedZodiac, setSelectedZodiac] = useState<string>("leo");
const MID_TABS = ["Weekly \nHoroscope", "Monthly \nHoroscope", "Yearly \nHoroscope"] as const;
const [midTab, setMidTab] = useState<typeof MID_TABS[number]>("Weekly \nHoroscope");
const link_web ='https://astrotalk.com/horoscope/todays-horoscope';
const [showDialog, setShowDialog] = useState(false);
const luckyColors = Array.from({ length: 2 + Math.floor(Math.random() * 1) })
  .map(() => getRandomColor());
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


const renderZodiac = ({ item }: { item: Zodiac }) => {
    const selected = item.id === selectedZodiac;
    return (
        <View>
      <TouchableOpacity
        style={[styles.zodiacItem, selected && styles.zodiacItemActive]}
        onPress={() => setSelectedZodiac(item.id)}
      >
        <Image 
        source={item.avatarUri}
        style={styles.zodiacAvatar} />
        
      </TouchableOpacity>
      <Text style={[styles.zodiacName, selected && styles.zodiacNameActive]}>{item.name}</Text>
      </View>
    );
  };

  return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>

                  <Animated.View   style={[styles.header,]}>
                    <Text style={styles.headerTitle}>Daily Horoscope</Text>

                    <TouchableOpacity style={styles.backBtn}>
                        <BackIcon size={16} onPress={handleBack} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
                        <ShareIcon
                            width={30} height={30}
                        />
                    </TouchableOpacity>
                    <View style={{ position:'absolute',width:'100%', height: .4,backgroundColor:'#7B7B7B',bottom:0 }}></View>
                </Animated.View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* ZODIAC HORIZONTAL */}
        <View style={styles.zodiacWrap}>
          <FlatList
            horizontal
            data={ZODIACS}
            keyExtractor={(i) => i.id}
            renderItem={renderZodiac}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            contentContainerStyle={{ paddingRight: 12 }}
          />
        </View>

        {/* Tabs */}
        <View style={styles.topTabContainer}>
        {TOP_TABS.map((tab) => {
            const active = activeTab === tab;
            return (
            <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.topTabBtn, active && styles.topTabBtnActive]}
            >
                <Text style={[styles.topTabText, active && styles.topTabTextActive]}>
                {tab}
                </Text>
            </TouchableOpacity>
            );
        })}
        </View>

        {/* Hero Card (dark) */}
        <View style={styles.heroCard}>
          <Text style={styles.heroDate}>22-11-2025</Text>
          <Text style={styles.heroTitle}>Your Daily horoscope is ready!</Text>

          <View style={styles.heroRow}>
            <View style={styles.heroLeft}>
              <Text style={styles.heroSmall}>Lucky Colours</Text>
                   <View style={{ flexDirection: "row", marginTop: 8,marginBottom:4 }}>
                    {luckyColors.map((c, i) => (
                    <View
                        key={i}
                        style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: c,
                        marginRight: 6,
                        }}
                    />
                    ))}
                </View>
              <Text style={styles.heroSmall}>Lucky Number</Text>
              <Text style={styles.heroBold}>2</Text>
            </View>
            <View style={styles.heroRight}>
              <Text style={styles.heroSmall}>Mood of day</Text>
                    <Text style={{ fontSize: 22, marginTop: 4 }}>
                        {getMoodEmoji('happy')}
                    </Text>
              <Text style={styles.heroSmall}>Lucky Time</Text>
              <Text style={styles.heroBold}>03:42 AM</Text>
            </View>
            
            <View style={styles.heroCenter}>
              <View style={styles.zodiacCircle}>
                <Image
                  source={ZODIACS.find(z => z.id === selectedZodiac)?.avatarUri}
                  style={styles.zodiacCircleImg}
                />
              </View>
            </View>

          </View>
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Daily Horoscope</Text>

        {/* Category Cards */}
        <View>
          {CATEGORIES.map((c) => (
            <View key={c.id} style={[styles.catCard, { backgroundColor: c.bg,borderColor:c.borderbg }]}>
              <View style={styles.catHeader}>
                <View style={styles.catLeft}>
                  {/* <Feather name={c.icon as any} size={18} color="#333" style={{ marginRight: 6 }} /> */}
                   <c.icon width={22} height={22} style={{ marginRight: 6 }} />
                  <Text style={styles.catTitle}>{c.title}</Text>
                </View>
                <View style={styles.percentBadge}>
                  <Text style={styles.percentText}>{c.percent}%</Text>
                </View>
              </View>
              <Text style={styles.catDesc}>
                Singles find attraction through shared cultural interests of creative collaborations
                rather than typical social scenes. Couples should focus on appreciating subtle gestures
                over grand romantic displays.
              </Text>
            </View>
          ))}
        </View>

        {/* Insights */}
        <Text style={[styles.sectionTitle, { marginTop: 6 }]}>Daily Horoscope Insights</Text>

        {Insights.map((ins) => (
          <View key={ins.id} style={styles.insightCard}>
            <Image source={{ uri: ins.image }} style={styles.insightImage} />
            <View style={styles.insightBody}>
              <Text style={styles.insightTitle}>{ins.title}</Text>
              <Text style={styles.insightDesc}>{ins.desc}</Text>
            </View>
          </View>
        ))}

        {/* Also Check pills */}
        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Also Check</Text>

                <View style={styles.midTabContainer}>
                {MID_TABS.map((t) => {
                    const active = midTab === t;
                    return (
                    <TouchableOpacity
                        key={t}
                        onPress={() => setMidTab(t)}
                        style={[styles.midTabBtn, active && styles.midTabBtnActive]}
                    >
                        <Text style={[styles.midTabText, active && styles.midTabTextActive]}>
                        {t}
                        </Text>
                    </TouchableOpacity>
                    );
                })}
                </View>

        {/* Overview (long text) */}
        <View style={styles.overviewWrap}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={styles.overviewTitle}>Daily Horoscope</Text>
                <Text style={styles.overviewSub}>16 Nov - 22 Nov</Text>
            </View>
           <Text style={[styles.overviewTitle,{marginBottom:6}]}>Overview</Text>  
          <Text style={styles.overviewText}>
            Singles find attraction through shared cultural interests of creative collaborations rather than
            typical social scenes. The full overview can be long — repeat paragraphs in your screenshot are
            represented here as repeated text to simulate the long content area. Express affection through
            thoughtful questions that show genuine curiosity about your partner's dreams.
                 {'\n'}{'\n'}Singles find attraction through shared cultural interests of creative collaborations rather than
            typical social scenes. The full overview can be long — repeat paragraphs in your screenshot are
            represented here as repeated text to simulate the long content area. Express affection through
            thoughtful questions that show genuine curiosity about your partner's dreams.
                 {'\n'}{'\n'}Singles find attraction through shared cultural interests of creative collaborations rather than
            typical social scenes. The full overview can be long — repeat paragraphs in your screenshot are
            represented here as repeated text to simulate the long content area. Express affection through
            thoughtful questions that show genuine curiosity about your partner's dreams.
                 {'\n'}{'\n'}Singles find attraction through shared cultural interests of creative collaborations rather than
            typical social scenes. The full overview can be long — repeat paragraphs in your screenshot are
            represented here as repeated text to simulate the long content area. Express affection through
            thoughtful questions that show genuine curiosity about your partner's dreams.
          </Text>
        </View>
        
          <TouchableOpacity style={styles.feedbackBtn} onPress={() => setShowDialog(true)}>
            <Text style={styles.feedbackBtnText}>Share Feedback  </Text><NextArrowIcon width={20} height={20}/>
          </TouchableOpacity>

        {/* Spacer so last content isn't blocked by bottom nav */}
        <View style={{ height: 46 }} />
      </ScrollView>


          <View style={styles.bottomContainer}>
      
            {/* Chat Button */}
            <Pressable android_ripple={{ color: '#FBB91730', borderless: true }}
              style={({ pressed }) => [
                styles.chatBtn,
                pressed && { opacity: 0.85 }, // optional visual feedback
              ]}  onPress={() => navigation.navigate('Chat')}>
              <ChatWhiteIcon/>
              <Text style={styles.btnText} numberOfLines={1}
              ellipsizeMode="tail">Chat with Astrologer</Text>
            </Pressable>

            {/* Call Button */}
            <Pressable android_ripple={{ color: '#FBB91730', borderless: true }}
              style={({ pressed }) => [
                styles.callBtn,
                pressed && { opacity: 0.85 }, // optional visual feedback
              ]}  onPress={() => navigation.navigate('GurujiCongrats')}>
             <CallWhiteIcon/>
              <Text style={styles.btnText} numberOfLines={1}
              ellipsizeMode="tail">Call with Astrologer</Text>
            </Pressable>

          </View>

          <FeedbackDialog
                visible={showDialog}
                onClose={() => setShowDialog(false)}
                onSubmit={(value) => console.log("Selected:", value)}
                />
                </SafeAreaView>
            </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
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
          fontFamily:Fonts.Medium
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
          borderRadius:20,
          justifyContent: "center",
          alignItems: "flex-end",
          paddingRight: 15,
      },

  container: {
    paddingHorizontal: 5,
    paddingTop: 12,
    paddingBottom: 34,
    backgroundColor: "#fff",
  },

  zodiacWrap: {
    marginBottom: 12,
  },
  zodiacItem: {
    width: 72,
    height:72,
    borderRadius:36,
    borderWidth:1,
    borderColor:colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
  zodiacItemActive: {
    borderWidth: 1.5,
    backgroundColor:"#FFD776",
    width: 78,
    height:78,
    borderRadius:38,
  },
  zodiacAvatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
  },
  zodiacName: {
    marginTop: 6,
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    textAlign:'center',
    fontFamily:Fonts.Medium
  },
  zodiacNameActive: { color: "#111", fontWeight: "700" },



topTabContainer: {
  flexDirection: "row",
  backgroundColor: "#FFF7DF",
  borderRadius: 30,
  padding: 4,
  marginBottom: 14,
},
topTabBtn: {
  flex: 1,
  paddingVertical: 10,
  borderRadius: 20,
  alignItems: "center",
},
topTabBtnActive: {
  backgroundColor: colors.primaryColor,
},
topTabText: {
  fontSize: 14,
  fontWeight: "500",
  color: "#7A6A50",
  textAlign:'center',
  fontFamily:Fonts.Medium
},
topTabTextActive: {
  color: "#000",
  fontWeight: "700",
  textAlign:'center'
},

  heroCard: {
    backgroundColor: "#07102A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    overflow: "hidden",
  },
  heroDate: {
    textAlign: "center",
    color: "rgba(255,255,255,0.6)",
    marginBottom: 8,
    fontSize: 16,
    fontFamily:Fonts.Medium
  },
  heroTitle: { 
    textAlign: "left", 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 12,
    fontFamily:Fonts.SemiBold 
},

  heroRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  heroLeft: { width: (width - 64) / 3, alignItems: "flex-start" },
  heroRight: { width: (width - 64) / 3, alignItems: "flex-start" },
  heroCenter: { width: (width - 64) / 3, alignItems: "flex-end", justifyContent: "center" },

  heroSmall: { color: "rgba(255,255,255,0.8)", fontSize: 12 },
  heroBold: { color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 4 },

  zodiacCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    // backgroundColor: "#0D2040",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.primaryColor,
  },
  zodiacCircleImg: { width: 72, height: 72, borderRadius: 36 },

  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "500", 
    marginBottom: 8, 
    color: "#111",
    fontFamily:Fonts.Medium 
},

  catCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  catHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  catLeft: { flexDirection: "row", alignItems: "center" },
  catTitle: { fontSize: 15, fontWeight: "700", color: "#111" },
  percentBadge: {
    // backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    // borderRadius: 18,
    // borderWidth: 1,
    // borderColor: "#f0f0f0",
    minWidth: 60,
    alignItems: "center",
  },
  percentText: { fontWeight: "700", color: "#333" },
  catDesc: { color: "#555", fontSize: 13, lineHeight: 18 },

  insightCard: {
    marginTop: 10,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 12,
  },
  insightImage: { width: "100%", height: 140 },
  insightBody: { padding: 12 },
  insightTitle: { fontSize: 15, fontWeight: "700", marginBottom: 6 },
  insightDesc: { color: "#666", fontSize: 13 },


midTabContainer: {
  flexDirection: "row",
  backgroundColor: "#FFF7DF",
  borderRadius: 30,
  padding: 4,
  marginBottom: 14,
},
midTabBtn: {
  flex: 1,
  paddingVertical: 10,
  borderRadius: 30,
  alignItems: "center",
},
midTabBtnActive: {
    backgroundColor: colors.primaryColor,
},
midTabText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#7A6A50",
  textAlign:'center'
},
midTabTextActive: {
  color: "#000",
  fontWeight: "700",
  textAlign:'center'
},

  overviewWrap: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#F3E7CF",
  },
  overviewTitle: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  overviewSub: { color: "#8a7560", marginBottom: 8 },
  overviewText: { color: "#444", fontSize: 14, lineHeight: 20, marginBottom: 12 },

  feedbackBtn: {
    flexDirection:'row',
    borderRadius: 12,
    backgroundColor: "#FFF0C6",
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FFD27A",
    justifyContent:'center'
  },
  feedbackBtnText: { fontSize:17,fontWeight: "500", color: "#311E00",fontFamily:Fonts.Medium },

  bottomContainer: {
      position: 'absolute',
      bottom: Platform.OS==='android'?85:95,   // <-- PLACE ABOVE YOUR TAB BAR
      width: width,
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 999,
    },
  
    chatBtn: {
      flexDirection:'row',
      flex: 1,
      marginRight: 5,
      paddingHorizontal:20,
      backgroundColor: '#FBB917',
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.20,
      shadowRadius: 6,
      elevation: 8,
    },
  
    callBtn: {
      flexDirection:'row',
      flex: 1,
      marginLeft: 5,
      backgroundColor: '#FBB917',
      paddingVertical: 8,
      paddingHorizontal:20,
      borderRadius: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.20,
      shadowRadius: 6,
      elevation: 8,
    },
  
    btnText: {
      color: '#FFF',
      fontSize: 12,
      fontWeight: '600',
      fontFamily: Fonts.SemiBold,
      paddingHorizontal:10,
    },

});
