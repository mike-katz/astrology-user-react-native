import React, { useEffect, useState } from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  StatusBar,
  Platform,
  Dimensions,
  Pressable,
  Alert
} from 'react-native';

import MenuIcon from '../../assets/icons/MenuIcon';
import HelpIcon from '../../assets/icons/HelpIcon';
import WalletIcon from '../../assets/icons/WalletIcon';
import WalletPlusIcon from '../../assets/icons/WalletPlusIcon';

import DailyHoroIcon from '../../assets/icons/DailyHoroIcon';
import FreeKundliIcon from '../../assets/icons/FreeKundliIcon';
import KundliMatchIcon from '../../assets/icons/KundliMatchIcon';
import FreeChatIcon from '../../assets/icons/FreeChatIcon';
import AstrologyBlogIcon from '../../assets/icons/AstrologyBlogIcon';
import { colors, Fonts } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import PrivateIcon from '../../assets/icons/PrivateIcon';
import SearchIcon from '../../assets/icons/SearchIcon';
import VerifiedIcon from '../../assets/icons/VerifiedIcon';
import SecureIcon from '../../assets/icons/SecureIcon';
import ChatWhiteIcon from '../../assets/icons/ChatWhiteIcon';
import CallWhiteIcon from '../../assets/icons/CallWhiteIcon';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import { SlideMenu } from './SlideMenu';
import { getPandit, getUserDetails } from '../../redux/actions/UserActions';
import { AppSpinner } from '../../utils/AppSpinner';
import WalletBottomSheet from '../Payment/WalletBottomSheet';
import { ServiceConstants } from '../../services/ServiceConstants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setUserDetails } from '../../redux/slices/userDetailsSlice';

const features = [
  {id: 1, title: 'Daily Horoscope', icon: DailyHoroIcon },
  { id:2,title: 'Free Kundali', icon: FreeKundliIcon },
  {id:3, title: 'Kundali Matching', icon: KundliMatchIcon },
  { id:4,title: 'Free Chat', icon: FreeChatIcon },
];

// const astrologers = [
// { id: '1', name: 'Anvay', price: '₹93/min', img: 'https://d1gcna0o0ldu5v.cloudfront.net/fit-in/50x50//consultant_pic/p-37580.jpg' },
// { id: '2', name: 'Rishank', price: '₹88/min', img: 'https://d1gcna0o0ldu5v.cloudfront.net/fit-in/50x50//consultant_pic/p-37584.jpg' },
// { id: '3', name: 'PriyankaS', price: '₹66/min', img: 'https://d1gcna0o0ldu5v.cloudfront.net/fit-in/50x50//consultant_pic/p-37592.jpg' },
// ];


const remedies = [
{ id: '1', name: 'Gemstone Consultation', img: 'https://d1gcna0o0ldu5v.cloudfront.net/fit-in/135x135/images/77fb9922-d879-4e6c-b981-bb50813cf5c9.jpg' },
{ id: '2', name: 'VIP E-Pooja', img: 'https://d1gcna0o0ldu5v.cloudfront.net/fit-in/135x135/images/4f7fbd56-ade5-42b8-b4a0-224d7ba0b50f.jpeg' },
{ id: '3', name: 'Problem Remedy', img: 'https://d1gcna0o0ldu5v.cloudfront.net/fit-in/135x135/images/149fef6f-8254-4ee9-b116-17f6b662149d.jpeg' },
];

const latestBlogs = [
  { name: 'How Astrotalk is Using AI to Become a Smarter, More Trusted Astrology Platform', img: 'https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/11/14112553/Copy-of-Your-paragraph-text-7-768x488.jpg', comp:'Astrologer Anshika',dt:'07 Nov 2023',link:'https://astrotalk.com/horoscope/todays-horoscope' ,views:100},
  { name: 'Mars in Scrorpio:Why Does winning seem to be all you can think about!', img: 'https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/11/06165917/WhatsApp-Image-2025-11-04-at-5.48.19-PM-300x150.jpeg', comp:'Astrologer Anshika',dt:'03 Nov 2023',link:'https://astrotalk.com/freekundli' ,views:10},
  { name: 'Suddenly Everyone\'s Talking about Marriage? Jupiter in Cancer might be the Reason', img: 'https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/10/29162102/Banners-1-300x150.png', comp:'Astrologer Anshika',dt:'02 Nov 2023',link:'https://astrotalk.com/compatibility',views:87 },
];

const astroNews = [
  { name: 'Decoding Astrotalk\'s Fortunes:How The Astrology Startup Hit 4x Profit Growth.', img: 'https://d1gcna0o0ldu5v.cloudfront.net/fit-in/140x105/images/7f9237e7-88eb-4aa7-b993-77b252f96735.png', comp:'inc42',dt:'07 Nov 2023',link:'https://astrotalk.com/horoscope/todays-horoscope' },
  { name: 'Astro tech Startup, Astrotalk, appoints Anmol Jain as the new Co-founder', img: 'https://d1gcna0o0ldu5v.cloudfront.net/fit-in/140x105/images/dfb8a7e6-4fc7-4841-91a1-e785401fd190.jpg', comp:'CXO',dt:'03 Nov 2023',link:'https://astrotalk.com/freekundli' },
  { name: 'EXCLUSIVE:Rs37k salary to Rs 600cr company - How an astrology prediction', img: 'https://d1gcna0o0ldu5v.cloudfront.net/fit-in/140x105/images/8803fb32-453f-4531-8a48-3ed170d4a117.png', comp:'ET NOW',dt:'02 Nov 2023',link:'https://astrotalk.com/compatibility' },
];
const { width } = Dimensions.get('window');

const HomeScreen = () =>{
const navigation = useNavigation<any>();
const dispatch = useDispatch();
const [menuVisible, setMenuVisible] = useState(false);
const [activity, setActivity] = useState<boolean>(false);
const [astrologers, setAstrologers] = useState([]);
const [showWallet, setShowWallet] = useState(false); //For Wallet
const [selectedName, setSelectedName] = useState<string>(""); 
const [walletBalance, setWalletBalance] = useState<number>(0);
 const userDetailsData = useSelector((state: RootState) => state.userDetails.userDetails);
 const [page, setPage] = useState(1); 
useEffect(() => {
  callPanditApi();
  if(ServiceConstants.User_ID!=null){
      getUserDetailsApi();
  }
}, []);

const callPanditApi = () => {
  setActivity(false)
  getPandit(page).then(response => {
    setActivity(false)
    console.log('Home - Pandit list response '+response);
    const result = JSON.parse(response);
    setAstrologers(result.data.results);
  });
}

  const getUserDetailsApi = () => {
    setActivity(false)
    getUserDetails().then(response => {
      setActivity(false);
      const result = JSON.parse(response);
      console.log("User Details Response:", result);
      dispatch(setUserDetails(result.data));
    });
  }

    return(
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        {/* Profile Image wrapper */}
      <TouchableOpacity style={styles.profileWrapper} onPress={() => setMenuVisible(true)}>
        <FastImage
          source={{uri:userDetailsData.profile}}
          style={styles.profileImage}
        />
          
          {/* Menu icon on bottom-right */}
          <TouchableOpacity style={styles.menuIconContainer} onPress={() => setMenuVisible(true)}>
            <MenuIcon
              width={8} height={6}
            />
          </TouchableOpacity>
      </TouchableOpacity>

  

        <Text style={styles.welcomeText}>Hi, {userDetailsData.name || "User"}</Text>

        <TouchableOpacity style={styles.addCashBtn} onPress={() => navigation.push('AddMoneyScreen')}>
           <WalletIcon width={12} height={12}
            style={styles.walletIcon}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.addCashText}>Add Cash</Text>
            <WalletPlusIcon width={12} height={12} style={{ marginLeft: 6 }} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.push('HelpSupportScreen')} style={{ backgroundColor:'#FFF',padding:3,borderRadius:30 }}>
          <HelpIcon
            width={30} height={30}
          />
        </TouchableOpacity>
      </View>


  <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

    <Pressable style={styles.wrapper} onPress={() => navigation.push('SearchScreen')}>
      {/* SEARCH BAR */}
      <View style={styles.searchContainer}>
        
        <TextInput
          placeholder="Search"
          placeholderTextColor="#888"
          style={styles.input}
          editable={false}        // <-- cannot type
          pointerEvents="none"    // <-- prevents blocking touch
        />
        <SearchIcon width={20} height={20} />
      </View>

      {/* YELLOW BOTTOM BORDER */}
      <View style={styles.yellowBar} />
    </Pressable>
      
      {/* Features Row */}
      <View style={styles.featuresRow}>
        {features.map((item, idx) => {
          const IconComponent = item.icon;
          return(
          <TouchableOpacity style={styles.featureItem} key={idx} onPress={() => {
                if (item.id === 1) navigation.navigate("DailyHoroscopeScreen");
                else if (item.id === 2) navigation.push("KundliListScreen");
                else if (item.id === 3) navigation.navigate("Chat");
                else if (item.id === 4) navigation.navigate("Chat");
            }}>
            <IconComponent width={60} height={60} />
            <Text style={styles.featureText}>{item.title}</Text>
          </TouchableOpacity>
        )})}
      </View>

      {/* Banner 1 */}
      <Pressable style={styles.banner} onPress={() => navigation.navigate('Chat')}>
        <FastImage 
        source={{uri:'https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/11/14112553/Copy-of-Your-paragraph-text-7-768x488.jpg'}}        
        style={styles.bannerImg} />
      </Pressable>

      {/* Banner 2 */}

      <Pressable style={[styles.banner]} onPress={() => navigation.navigate('Call')}>
        <FastImage
        source={{uri:'https://aws.astrotalk.com/images/7f9237e7-88eb-4aa7-b993-77b252f96735.png'}} 
        style={[styles.bannerImg]} 
        />
      </Pressable>

      {/* Astrologers Section */}
      <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Astrologers</Text>
      <Pressable onPress={() => navigation.navigate('Chat')}>
        <Text style={styles.viewAll}>View All</Text>
      </Pressable>
      </View>


      <FlatList
          data={astrologers}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ overflow: 'visible',paddingHorizontal: 12,paddingVertical:12 }}
          renderItem={({ item }:any) => (
          <Pressable style={styles.astroCard} onPress={() => navigation.push('PanditProfileDetailsScreen',{astrologerId:item.id})}>
          {/* <View style={styles.badge}>
            <Text style={styles.badgeText}>{'*Celebrity*'}</Text>
            </View> */}
            <View style={styles.ribbonContainer}>
              <View style={styles.ribbon}>
                <View style={styles.ribbonTextWrapper}>
                <Text style={styles.ribbonText}>Top Choice</Text>
                </View>
              </View>
            </View>


          <FastImage source={{uri:item.profile}} style={styles.astroImg1} />
          <Text style={styles.astroName}>{item.name}</Text>
          <Text style={styles.astroPrice}>₹{item.charge}/min</Text>
          {/* <View style={styles.priceRow}>
            <Text style={styles.oldPrice}>₹ {item.charge}</Text>
            <Text style={styles.newPrice}>₹ {item.charge}/min</Text>
          </View> */}
          <TouchableOpacity style={styles.astroChatBtn} onPress={()=>{
              setSelectedName(item.name);
              navigation.push('ChatWindow');
              // if(walletBalance==0){
              //   setShowWallet(true);
              // }else{

              // }
          }}><Text style={styles.chatBtnText}>Chat</Text></TouchableOpacity>
          </Pressable>
      )}
      />

      {/* Remedy Section */}
      <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>AstroRemedy</Text>
      <Pressable onPress={() => navigation.navigate('Remedies')}>
      <Text style={styles.viewAll}>View All</Text>
      </Pressable>
      </View>


      <FlatList
            data={remedies}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            renderItem={({ item }) => (
            <Pressable style={styles.remedyCard}>
              <FastImage source={{uri:item.img}} style={styles.remedyImg} />
              <View style={styles.remedyOverlay}>
              <Text style={styles.remedyText}>{item.name}</Text>
              </View>
            </Pressable>
            )}
      />

      {/* Latest from blog List Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Latest from blog</Text>
        <Pressable onPress={() => navigation.push('AstrologyBlogScreen')}>
        <Text style={styles.viewAll}>View all</Text>
        </Pressable>
      </View>

      {/* Horizontal List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.astrologerList}
      >
        {latestBlogs.map((item, idx) => (
          <Pressable style={styles.card} key={idx} onPress={() => navigation.push('WebviewScreen', { link_web: item.link })}>
            <FastImage source={{uri:item.img}} style={styles.astroImg} />
                    {/* Viewer Badge */}
        <View style={styles.viewerBadge}>
          <Feather name="eye" size={12} color="#000" />
          <Text style={styles.viewerText}>{item.views}</Text>
        </View>

            <Text style={styles.astroName} numberOfLines={2}
              ellipsizeMode="tail">{item.name}</Text>
            <View style={styles.newsRow}>
              <Text style={styles.newsCompany}>{item.comp}</Text>
              <Text style={styles.newsDate}>{item.dt}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Astrotalk in News List Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Astrotalk in News</Text>
         <Pressable onPress={() => navigation.navigate('Remedies')}>
        <Text style={styles.viewAll}>View all</Text>
        </Pressable>
      </View>

      {/* Horizontal List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.astrologerList}
      >
        {astroNews.map((item, idx) => (
          <Pressable style={styles.card} key={idx} onPress={() => navigation.navigate('WebviewScreen', { link_web: item.link })}>
            <FastImage source={{uri:item.img}} style={styles.astroImg} />
            <Text style={styles.astroName} numberOfLines={2}
              ellipsizeMode="tail">{item.name}</Text>
            <View style={styles.newsRow}>
              <Text style={styles.newsCompany}>{item.comp}</Text>
              <Text style={styles.newsDate}>{item.dt}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Bottom Info */}
      <View style={styles.bottomStats}>
        <View style={styles.stat}>
          <PrivateIcon width={60} height={60} />
          <Text style={styles.value}>Private &</Text>
          <Text style={styles.label}>Confidential</Text>
        </View>
        
        <View style={styles.divider2} />
        <View style={styles.stat}>
          <VerifiedIcon width={60} height={60} />
          <Text style={styles.value}>Verified</Text>
          <Text style={styles.label}>Astrologers</Text>
        </View>
        <View style={styles.divider2} />
        <View style={styles.stat}>
          <SecureIcon width={60} height={60} />
          <Text style={styles.value}>Secure</Text>
          <Text style={styles.label}>Payments</Text>
        </View>
      </View>

      <View style={{ height: 130 }} />  {/* Spacer to allow for bottom buttons */}

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

         <WalletBottomSheet
            visible={showWallet}
            onClose={() => setShowWallet(false)}
            name={selectedName}
            fromScreen={'chat'}
          />

          <SlideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />

             <AppSpinner show={activity} />
        </SafeAreaView>
    </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },

profileWrapper: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: '#FFFAE6',        // light yellow fill
    borderWidth: 2,
    borderColor: colors.primaryColor,           // yellow border
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
  },

  menuIconContainer: {
    position: 'absolute',
    bottom: 2,
    right: -4,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },

  welcomeText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    fontFamily: Fonts.Medium,
  },

  addCashBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderColor:'#000',
    borderWidth:.6,
  },

  addCashText: { 
    fontSize: 12, 
    fontWeight: '500',
    fontFamily: Fonts.Medium,
  },
  walletIcon: {
    marginRight: 6,
  },

  wrapper: {
    backgroundColor: "#fff",
  },

  searchContainer: {
    marginHorizontal: 15,
    marginTop: 10,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,

    // iOS glassy/light shadow
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },

  yellowBar: {
    width: "100%",
    height: 2,
    backgroundColor: "#FBB917",
    // Only bottom-left & bottom-right radius
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,

    marginTop: 10, 
  },

  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginTop: 10,
  },

  featureItem: {
    alignItems: 'center',
    width: 85,
  },

  featureText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: Fonts.Regular,
    fontWeight: '400',
  },

  banner: {
    width: '100%',
    height: 140,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  bannerImg: {
    width: '100%',
    height: 110,
    backgroundColor: '#FBB917',
    marginLeft: 10,
    marginEnd: 10,
    resizeMode: 'cover',
    borderRadius: 20,
   
    elevation: 4, // Android shadow
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },

  sectionHeader: {
    marginTop: 20,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.SemiBold,
  },

  viewAll: {
    color: '#7B7B7B',
    fontSize: 12,
    fontFamily: Fonts.Medium,
    fontWeight: '500',
  },

astroCard: {
    width: 150,
    backgroundColor: '#fff',
    marginRight: 14,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    elevation: 3,
    overflow: 'hidden', 
},
ribbonContainer: {
  position: "absolute",
  top: 16,
  left: -30, // move left so it cuts diagonally like screenshot
  zIndex: 10,
},
ribbon: {
  width: 110,                       // long enough to cross the corner
  paddingVertical: 2,
  backgroundColor: "#E3B23C",       // same golden color
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


astroImg1: { 
  width: 90, 
  height: 90, 
  borderRadius: 45, 
  marginTop: 16,
  backgroundColor: '#FFFAE6',        // light yellow fill
  borderWidth: 2,
  borderColor: '#F1C42B',  
},
astroPrice: { fontSize: 13, color: '#555', marginBottom: 10 },

priceRow: { flexDirection: "row", marginBottom: 10, alignItems: "center" },
oldPrice: {
  textDecorationLine: "line-through",
  color: "#999",
  fontSize: 13,
  marginRight: 6,
},
newPrice: { color: "#CA0D33", fontSize: 13, fontWeight: "600" },


chatBtnText: { 
  color: '#0CA789', 
  fontWeight: '600',
  fontFamily: Fonts.SemiBold, 
},
astroChatBtn: {
  borderWidth: 1,
  borderColor: '#0CA789',
  paddingVertical: 6,
  paddingHorizontal: 22,
  borderRadius: 20,
},

remedyCard: {
    width: 180,
    height: 180,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop:10,
},
remedyImg: { width: '100%', height: '100%' },
remedyOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
},
remedyText: { 
  color: '#fff', 
  fontSize: 12, 
  fontWeight: '600',
  fontFamily: Fonts.SemiBold, 
  textAlign: 'center'
},

  astrologerList: {
    paddingLeft: 16,
    paddingVertical: 16,
  },

  card: {
    position: 'relative',
    width: 285,
    backgroundColor: '#fff',
    marginRight: 12,
    borderRadius: 12,
    // padding: 12,
    elevation: 3,
  },
viewerBadge: {
  position: 'absolute',
  top: 10,
  right: 10,
  backgroundColor: 'rgba(255,255,255,0.75)',
  paddingHorizontal: 8,
  paddingVertical: 3,
  borderRadius: 12,
  flexDirection: 'row',
  alignItems: 'center',
},

viewerText: {
  marginLeft: 5,
  fontSize: 10,
  fontWeight: '600',
  color: '#000',
  fontFamily:Fonts.Medium
},
  astroImg: {
    width: '100%',
    height: 140,
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  astroName: {
    // marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingTop: 8,
  },
  newsRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingHorizontal: 10,
  paddingVertical: 8,
},

newsCompany: {
  fontSize: 12,
  color: '#777',
},

newsDate: {
  fontSize: 12,
  color: '#777',
},

  bottomStats: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
divider2: {
    height: 120,
    width: 1,
    backgroundColor: '#7B7B7B',
  },
  stat: {
    alignItems: 'center',
    width: '30%',
  },
  value: {
    color: '#333',
    fontSize: 12,
    fontFamily: Fonts.Regular,
    marginTop: 8,
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: Fonts.Regular,
    color: '#333',
  },
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

    // **OUTER SHADOW (iOS + Android)**
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

    // **OUTER SHADOW (iOS + Android)**
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.20,
    shadowRadius: 6,
    elevation: 8,
  },

  btnText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: Fonts.SemiBold,
    paddingHorizontal:10,
  },
});

export default HomeScreen;