import React, { useState, useEffect, useCallback } from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  Alert,
  Pressable,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
import RightGreenIcon from '../../assets/icons/RightGreenIcon';
import { colors, Fonts } from '../../styles';
import { AppSpinner } from '../../utils/AppSpinner';
import { applyUserFollowApi, getFollowing } from '../../redux/actions/UserActions';
import { formatKnowledge } from '../../constant/AppConst';
import { StarRating } from '../../constant/Helper';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { BackIcon } from '../../assets/icons';

const { width } = Dimensions.get('window');

const FollowingScreen= () =>{
  const navigation = useNavigation<any>(); 
  const [activity, setActivity] = useState<boolean>(false);
  const [astrologers, setFollowing] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    callFollowingApi();
  }, [page]);

  const callFollowingApi = () => {
    setActivity(false)
    getFollowing(page).then(response => {
      setActivity(false)
      console.log("Following Response:",response);
      const result = JSON.parse(response);
      
            if (result.data.results.length === 0) {
        setLoadingMore(false);
      }
      // Append not replace
      setFollowing(prev => [...prev, ...(result.data.results)]);
    });
  }
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setFollowing([]);
      setTimeout(() => {
        setPage(1);
        setRefreshing(false);
      }, 900);
    }, []);


  const loadMore = () => {
    if (!loadingMore) {
      setPage(prev => prev + 1);
    }
  };


  // render chat item
  const renderItem = ({ item }: { item: any }) => (
    <Pressable style={styles.cardWrap} onPress={() => navigation.push('PanditProfileDetailsScreen',{astrologerId:item.id})}>
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
          <FastImage source={{ uri: item.profile }} style={[styles.avatar,{borderColor:colors.primaryColor}]} />
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
          <Text style={styles.exp}>Exp- {item.experience}</Text>
          <Text style={styles.price}>₹ {item.charge}/min</Text>
          {/* <View style={styles.priceRow}>
            <Text style={styles.oldPrice}>₹ {item.charge}</Text>
            <Text style={styles.newPrice}>₹ {item.charge}/min</Text>
          </View> */}
        </View>

        <View style={styles.right}>
          <View style={{marginRight:6}}>
          {item.isverified && <RightGreenIcon width={16} height={16} />}
          </View>
          <TouchableOpacity style={styles.chatButton} onPress={() => {  
            Alert.alert(
              "Unfollow",
              `Are you sure you don't want a notification for live activity of ${item.name}?`,
              [
                {
                  text: "CANCEL",
                  style: "cancel"
                },
                { text: "YES", onPress: () => {
                  handleUnfollow(item.id);
                  console.log("Unfollowed")} }
              ],
              { cancelable: false }
            );
            
            
            }}>
            <Text style={styles.chatBtnText}>Unfollow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );

const handleBack = () => {
    navigation.goBack();
}
const handleUnfollow = (astrologerId: any) => {
    setActivity(false);
    applyUserFollowApi(astrologerId).then(response => {
      setActivity(false)
      const result = JSON.parse(response);
        console.log('Apply Review:', result);
        setFollowing(prev => prev.filter(k => k.id !== astrologerId));
    });
};

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header,]}>
        <Text style={styles.headerTitle}>Following</Text>

        <TouchableOpacity style={styles.backBtn}>
          <BackIcon size={16} onPress={handleBack} tintColor={undefined} />
        </TouchableOpacity>
        <View style={{ position: 'absolute', width: '100%', height: .4, backgroundColor: '#7B7B7B', bottom: 0 }}></View>
      </Animated.View>
      <View style={{ height: 12 }} />
      <FlatList
        data={astrologers}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 120 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={() => (loadingMore ? <View style={styles.loadingMore}><Text>Loading...</Text></View> : null)}
        ListEmptyComponent={
            <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{ fontSize: 16, color: "#888", fontFamily: Fonts.Medium }}>
                No Record Found
            </Text>
            </View>
        }
      />

      <AppSpinner show={activity} />
            </SafeAreaView>
        </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:  0,
  },
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

  cardWrap: { paddingHorizontal: 12 },
  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 0.6, borderColor: '#E6E6E6', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2,overflow:'hidden' },
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
  avatar: { marginLeft:11,marginTop:8,width: 70, height: 70, borderRadius: 35, borderWidth: 2, borderColor:colors.primaryColor, backgroundColor: '#fff' },
  center: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', marginBottom: 2 },
  subtitle: { color: '#888', fontSize: 13 },
  lang: { color: '#999', fontSize: 12, marginTop: 4 },
  exp: { color: '#999', fontSize: 12 },
  metaRow: { alignItems: 'center', marginTop: 6 },
  starsRow: { flexDirection: 'row', alignItems: 'center',justifyContent:'space-between' },
  starIcon: {
    marginRight: 2,
  },
  orders: { color: '#777', marginTop: 3, fontSize: 9 },
  right: { alignItems: 'flex-end', justifyContent: 'space-between',height:88 },
  
  price: { marginTop:4,fontSize: 14, fontWeight: '600' },


  priceRow: { flexDirection: "row", marginTop: 5, alignItems: "center" },
  oldPrice: {
    textDecorationLine: "line-through",
    color: "#999",
    fontSize: 14,
    marginRight: 6,
  },
  newPrice: { color: "#CA0D33", fontSize: 15, fontWeight: "600" },

  chatButton: { 
    borderWidth: 1, 
    borderColor: colors.primaryColor, 
    paddingVertical: 6, 
    paddingHorizontal: 18, borderRadius: 9,
    backgroundColor: colors.primaryLightColor,
   },
  chatBtnText: { color: '#000', fontWeight: '600',fontFamily:Fonts.SemiBold },
  loadingMore: { padding: 16, alignItems: 'center', justifyContent: 'center' },
});

export default FollowingScreen;