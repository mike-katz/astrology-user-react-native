import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Pressable,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import RightGreenIcon from '../../assets/icons/RightGreenIcon';
import MenuIcon from '../../assets/icons/MenuIcon';
import WalletIcon from '../../assets/icons/WalletIcon';
import WalletPlusIcon from '../../assets/icons/WalletPlusIcon';
import SearchIcon from '../../assets/icons/SearchIcon';
import OrderHistoryIcon from '../../assets/icons/OrderHistoryIcon';
import { colors, Fonts } from '../../styles';
import FilterIcon from '../../assets/icons/FilterIcon';
import AllIcon from '../../assets/icons/AllIcon';
import NewIcon from '../../assets/icons/NewIcon';
import LoveIcon from '../../assets/icons/LoveIcon';
import EducationIcon from '../../assets/icons/EducationIcon';
import WalletBottomSheet from '../Payment/WalletBottomSheet';
import SortFilterModal from './Filter/SortFilterModal';
import CareerIcon from '../../assets/icons/CareerIcon';
import MarriageIcon from '../../assets/icons/MarriageIcon';
import HealthIcon from '../../assets/icons/HealthIcon';
import WealthIcon from '../../assets/icons/WealthIcon';
import LegalIcon from '../../assets/icons/LegalIcon';
import FinanceIcon from '../../assets/icons/FinanceIcon';
import RemediesIcon from '../../assets/icons/RemediesIcon';
import ParentsIcon from '../../assets/icons/ParentsIcon';
import { SlideMenu } from './SlideMenu';
import { AppSpinner } from '../../utils/AppSpinner';
import { createOrderApi, getPandit } from '../../redux/actions/UserActions';
import { formatKnowledge } from '../../constant/AppConst';
import { StarRating } from '../../constant/Helper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ServiceConstants } from '../../services/ServiceConstants';
import { CustomDialogManager2 } from '../../utils/CustomDialog2';
import { decryptData, secretKey } from '../../services/requests';
import ProfileSelector from '../HomeDetails/ProfileSelector';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 55;
const FILTERS_HEIGHT = 56;

// local image paths from your uploaded files (they'll be transformed to URLs by your environment)
const BANNER_1 = 'https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/11/14112553/Copy-of-Your-paragraph-text-7-768x488.jpg';
const BANNER_2 = 'https://d2wkagtnczagqh.cloudfront.net/astrology-blog/wp-content/uploads/2025/11/06165917/WhatsApp-Image-2025-11-04-at-5.48.19-PM-300x150.jpeg';


const ChatScreen = () => {
  const navigation = useNavigation<any>();
  const userDetailsData = useSelector((state: RootState) => state.userDetails.userDetails);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showWallet, setShowWallet] = useState(false); //For Wallet
  const [selectedName, setSelectedName] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [showFilterModal, setShowFilterModal] = useState(false); //For Sort and Filter
  const [activity, setActivity] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  // scrollY controls banner collapse
  //   const scrollY = useRef(new Animated.Value(0)).current;
  //   const bannerTranslateY = scrollY.interpolate({
  //     inputRange: [0, BANNER_HEIGHT],
  //     outputRange: [0, -BANNER_HEIGHT],
  //     extrapolate: 'clamp',
  //   });
  //   const bannerOpacity = scrollY.interpolate({
  //     inputRange: [0, BANNER_HEIGHT / 2, BANNER_HEIGHT],
  //     outputRange: [1, 0.6, 0],
  //     extrapolate: 'clamp',
  //   });

  //   const filterTranslateY = scrollY.interpolate({
  //   inputRange: [0, BANNER_HEIGHT],
  //   outputRange: [0, -BANNER_HEIGHT],  // moves up exactly with banner height
  //   extrapolate: "clamp",
  // });

  // const filterOpacity = scrollY.interpolate({
  //   inputRange: [0, BANNER_HEIGHT / 2, BANNER_HEIGHT],
  //   outputRange: [1, 1, 1], // keep fully visible
  // });

  // data & states
  const [astrologers, setAstrologers] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);


  const filters = useMemo(() => [
    { id: 'filter', title: 'Filter', icon: <FilterIcon />, color: '#BABABA' },
    { id: 'all', title: 'All', icon: <AllIcon />, color: '#FFD700' },
    // { id: 'tarot', title: 'Tarot',icon:<FilterIcon/> },
    // { id: 'palm', title: 'Palmistry',icon:<FilterIcon/> },
    // { id: 'numerology', title: 'Numerology',icon:<FilterIcon/> },
    // { id: 'face reading', title: 'Face Reading',icon:<FilterIcon/> },
    // { id: 'vedic', title: 'Vedic',icon:<FilterIcon/> },
    { id: 'new', title: 'New!', icon: <NewIcon />, color: '#60D1E2' },
    { id: 'love', title: 'Love', icon: <LoveIcon />, color: '#FF6170' },
    { id: 'education', title: 'Education', icon: <EducationIcon />, color: '#FF84BC' },
    { id: 'career', title: 'Career', icon: <CareerIcon />, color: '#58A3F2' },
    { id: 'marriage', title: 'Marriage', icon: <MarriageIcon />, color: '#FF84BC' },
    { id: 'health', title: 'Health', icon: <HealthIcon />, color: '#FEA37A' },
    { id: 'wealth', title: 'Wealth', icon: <WealthIcon />, color: '#E17BF1' },
    { id: 'legal', title: 'Legal', icon: <LegalIcon />, color: '#58A3F2' },
    { id: 'finance', title: 'Finance', icon: <FinanceIcon />, color: '#37CFBD' },
    { id: 'remedies', title: 'Remedies', icon: <RemediesIcon />, color: '#FF6170' },
    { id: 'parents', title: 'Parents', icon: <ParentsIcon />, color: '#E17BF1' },
  ], []);
  const [activeFilterTab, setActiveFilterTab] = useState<'filter' | 'all' | 'new' | 'love' | 'education' | 'career' | 'marriage' | 'health' | 'wealth' | 'legal' | 'finance' | 'remedies' | 'parents'>('filter');
  const [activeFilter, setActiveFilter] = useState('all');
  const activeFilterColor = filters.find(f => f.id === activeFilter)?.color || '#BABABA';

  const [profileSelector, setProfileSelector] = useState(false);


  const callPanditApi = () => {
    setActivity(false);
    getPandit(page).then(response => {
      setActivity(false);
      console.log("Chat - Pandit response ==>" + response)
      const result = JSON.parse(response);
      if (result.data.results.length === 0) {
        setLoadingMore(false);
      }
      // Append not replace
      setAstrologers(prev => [...prev, ...(result.data.results)]);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setAstrologers([]);
    setTimeout(() => {
      setPage(1);
      setRefreshing(false);
    }, 900);
  }, []);

  useEffect(() => {
    callPanditApi();
  }, [page]);

  const loadMore = () => {
    if (!loadingMore) {
      setPage(prev => prev + 1);
    }
  };

  const handleCloseProfile = ()=>{
  setProfileSelector(false);
}
const handleStartChat = (item:any)=>{
  setProfileSelector(false);
  createOrderChatApi(selectedId,item.id);
}

     const createOrderChatApi=(astrologerId:any,profileId:any)=>{
          createOrderApi(astrologerId,profileId,"chat").then(response => {
          setActivity(false);
          console.log("Create Order response ==>" +response);
          const result = JSON.parse(response);
          console.log("Create Order response222 ==>" +JSON.stringify(result.success));
          if(result.success===true){
            // navigation.push('ChatWindow', { astrologerId: astrologerId,orderId:result.data.orderId }); 
          }else{
              const result2 = decryptData(result.error,secretKey);
              const result3 = JSON.parse(result2);
              console.log("Create Messages Error response ==>" +JSON.stringify(result3));
            
              CustomDialogManager2.show({
                  title: 'Alert',
                  message: result3.message,
                  type:2,
                  buttons: [
                    {
                      text: 'Ok',
                      onPress: () => {
                          if(ServiceConstants.User_ID==null){
                            navigation.reset({
                                          index: 0,
                                          routes: [{ name: 'AuthStack' }]
                                        });
                          }else{
                            navigation.push("OrderHistoryScreen");
                          }         
                      },
                      style: 'default',
                    },
                  ],
                });
          }
          
        });
      }

  // --- CAROUSEL state ---
  const carouselRef = useRef<Animated.ScrollView | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselImages = [BANNER_1, BANNER_2, BANNER_1]; // repeat to feel like more
  // render chat item
  const renderItem = ({ item }: { item: any }) => (
    <Pressable style={styles.cardWrap} onPress={() => navigation.push('PanditProfileDetailsScreen', { astrologerId: item.id })}>
      <View style={styles.card}>
        {/* RIBBON */}
        <View style={styles.ribbonContainer}>
          <View style={styles.ribbon}>
            <View style={styles.ribbonTextWrapper}>
              <Text style={styles.ribbonText}>*Celebrity*</Text>
            </View>
          </View>
        </View>
        <View style={styles.left}>
          <FastImage source={{ uri: item.profile }} style={[styles.avatar, { borderColor: activeFilterColor }]} />
          <View style={styles.metaRow}>
            <View style={styles.starsRow}>
              <StarRating rating={4} />
            </View>
            <Text style={styles.orders}>{item.orders} orders</Text>
          </View>
        </View>
        <View style={styles.center}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subtitle}>{formatKnowledge(item.knowledge)}</Text>
          <Text style={styles.lang}>{formatKnowledge(item.language)}</Text>
          <Text style={styles.exp}>Exp- {item.experience} years</Text>
          <Text style={styles.price}>₹ {item.charge}/min</Text>
          {/* <View style={styles.priceRow}>
            <Text style={styles.oldPrice}>₹ {item.charge}</Text>
            <Text style={styles.newPrice}>₹ {item.charge}/min</Text>
          </View> */}
        </View>

        <View style={styles.right}>
          <View style={{ marginRight: 6 }}>
            {item.isverified && <RightGreenIcon width={16} height={16} />}
          </View>
          <TouchableOpacity style={styles.chatButton} onPress={() => {
            setSelectedName(item.name);
            setSelectedId(item.id);
              if(ServiceConstants.User_ID==null){
                navigation.reset({
                              index: 0,
                              routes: [{ name: 'AuthStack' }]
                            });
              }else{
                  //  createOrderChatApi(item.id); 
                  setProfileSelector(true);
              }
            
            // setShowWallet(true)
          }}>
            <Text style={styles.chatBtnText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );

  const Carousel = () => (
    <View style={styles.carouselWrap}>
      <Animated.ScrollView
        ref={carouselRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {carouselImages.map((uri, idx) => (
          <FastImage
            key={`${uri}-${idx}`}
            source={{ uri }}
            style={styles.bannerImg}
            resizeMode={FastImage.resizeMode.stretch}
          />
        ))}
      </Animated.ScrollView>

      {/* pill indicators */}
      <View style={styles.pagerWrap} pointerEvents="none">
        {carouselImages.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const w = scrollX.interpolate({
            inputRange,
            outputRange: [8, 28, 8],
            extrapolate: "clamp",
          });

          const bg = scrollX.interpolate({
            inputRange,
            outputRange: [
              "rgba(255, 255, 255, 0.78)",
              "rgba(241,196,43,1)",  // GOLD in rgba
              "rgba(255,255,255,0.78)"
            ],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`pill-${i}`}
              style={[styles.pill, { width: w, backgroundColor: bg }]}
            />
          );
        })}
      </View>
    </View>
  );

  const ListHeader = useMemo(() => (
    <View style={{ marginBottom: 8 ,paddingBottom:10, backgroundColor:'#FFFFFF'}}>
      <View style={{ height: BANNER_HEIGHT }}>
        <Carousel />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersList}>
        {filters.map((item, index) => {
          const isActive = activeFilterTab === (item.id as any);
          return (
            <View key={`filter-${item.id}`} style={{flexDirection:'row'}}>
              <TouchableOpacity
                onPress={() => {
                  setActiveFilterTab(item.id as any);
                  setActiveFilter(item.id);

                  // open filter modal for index 0
                  if (index === 0) {
                    // onOpenFilterModal();
                    setShowFilterModal(true);
                  }
                }}
                activeOpacity={0.8}
                style={[
                  styles.filterItem,
                  isActive && styles.filterActive,
                  isActive && {
                    borderColor: item.color,
                    shadowColor: item.color,
                  },
                ]}
              >
                {item.icon && <View style={styles.iconWrap}>{item.icon}</View>}

                <Text
                  style={[
                    styles.filterText,
                    isActive && styles.filterTextActive,
                  ]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>

              {/* Divider after first item */}
              {index === 0 && (
                      <View
                        style={{
                          width: 1,
                          height: 30,
                          backgroundColor: "#ccc",
                          marginHorizontal: 6,
                          marginLeft: -3,
                        }}
                      />
                    )} 
            </View>
          );
        })}
      </ScrollView>

    </View>
  ), [activeFilterTab]);

  const handleApplyFilters = (filters: any) => {
    setShowFilterModal(false);
    const message = Object.entries(filters)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    Alert.alert("Selected Options", message);
    console.log("Selected Options:", filters);
    // Alert.alert(JSON.stringify(filters, null, 2));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* Profile Image wrapper */}
          <TouchableOpacity style={styles.profileWrapper} onPress={() => setMenuVisible(true)}>
            <FastImage
              source={{ uri: userDetailsData.profile }}
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

          <TouchableOpacity onPress={() => navigation.push('SearchScreen')} style={{ backgroundColor: '#FFF', padding: 3, borderRadius: 30, marginRight: 6 }}>
            <SearchIcon
              width={30} height={30}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('OrderHistory clicked')} style={{ backgroundColor: '#FFF', padding: 3, borderRadius: 30 }}>
            <OrderHistoryIcon
              width={30} height={30}
            />
          </TouchableOpacity>
        </View>

        {/* <ListHeader/> */}
        {/* <Animated.View style={{ marginTop:10,transform: [{ translateY: bannerTranslateY }] }}> */}
        <FlatList
          data={astrologers}
          keyExtractor={(i) => String(i.id)}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 120 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.4}
          ListHeaderComponent={ListHeader}
          stickyHeaderIndices={[0]} // 0 = banner, 1 = filters
          // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
          scrollEventThrottle={16}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          ListFooterComponent={() => (loadingMore ? <View style={styles.loadingMore}><Text>Loading...</Text></View> : null)}
        />
        {/* </Animated.View> */}

        <WalletBottomSheet
          visible={showWallet}
          onClose={() => setShowWallet(false)}
          name={selectedName}
          fromScreen={'chat'}
        />


        {/* SORT & FILTER MODAL */}
        <SortFilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApply={handleApplyFilters}
        />

                    <ProfileSelector
                name={selectedName} 
                visible={profileSelector} 
                onClose={handleCloseProfile} 
                onStartChat={handleStartChat} />

        <SlideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
        <AppSpinner show={activity} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

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
    borderColor: '#000',
    borderWidth: .6,
  },

  addCashText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: Fonts.Medium,
  },
  walletIcon: {
    marginRight: 6,
  },

  carouselWrap: {
    borderRadius: 10,
    height: BANNER_HEIGHT,
    width: '100%',
    justifyContent: 'center'
  },
  bannerImg: {
    borderRadius: 10,
    width: width - 10,
    height: BANNER_HEIGHT,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: colors.primaryColor
  },

  // arrows
  arrowBtn: {
    position: 'absolute',
    top: '45%',
    backgroundColor: 'rgba(255,255,255,0.85)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  leftArrow: { left: 12 },
  rightArrow: { right: 12 },

  // pill indicators
  pagerWrap: { position: 'absolute', bottom: 10, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  pill: { height: 6, borderRadius: 6, marginHorizontal: 6, backgroundColor: 'rgba(0,0,0,1)' },

  filtersWrap: { height: FILTERS_HEIGHT, backgroundColor: '#fff', borderBottomWidth: 0.3, borderBottomColor: '#eee', justifyContent: 'center' },
  filtersList: { 
    height:40,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 10
  },
  filterItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 22, borderWidth: 1, borderColor: '#ddd', marginRight: 10, backgroundColor: '#fff' },
  filterActive: {
    borderColor: '#6B6B6B',
    backgroundColor: '#fff',
    shadowColor: '#6B6B6B',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3
  },

  iconWrap: {
    marginRight: 6,
  },
  filterText: { fontSize: 14, color: '#555' },
  filterTextActive: { color: '#000', fontWeight: '600' },

  cardWrap: { paddingHorizontal: 12 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 0.6, borderColor: '#E6E6E6', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2, overflow: 'hidden' },
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
  left: { marginRight: 12 },
  avatar: { marginLeft: 11, marginTop: 8, width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor: colors.primaryColor, backgroundColor: '#fff' },
  center: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  subtitle: { color: '#888', fontSize: 13 },
  lang: { color: '#999', fontSize: 12, marginTop: 4 },
  exp: { color: '#999', fontSize: 12 },
  metaRow: { alignItems: 'center', marginTop: 6 },
  starsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  starIcon: {
    marginRight: 2,
  },
  orders: { color: '#777', marginTop: 3, fontSize: 9 },
  right: { alignItems: 'flex-end', justifyContent: 'space-between', height: 88 },

  price: { marginTop: 4, fontSize: 14, fontWeight: '600' },


  priceRow: { flexDirection: "row", marginTop: 5, alignItems: "center" },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#999",
    fontSize: 14,
    marginRight: 6,
  },
  newPrice: { color: "#CA0D33", fontSize: 15, fontWeight: "600" },

  chatButton: {
    borderWidth: 1, borderColor: '#0CA789', paddingVertical: 6, paddingHorizontal: 18, borderRadius: 9,
  },
  chatBtnText: { color: '#0CA789', fontWeight: '600' },
  loadingMore: { padding: 16, alignItems: 'center', justifyContent: 'center' },
});

export default ChatScreen;