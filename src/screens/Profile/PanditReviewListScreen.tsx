import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Animated, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, Fonts } from '../../styles';
import { BackIcon } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { AppSpinner } from '../../utils/AppSpinner';
import { getPanditReviewList } from '../../redux/actions/UserActions';
import SortDialog from '../../utils/SortDialog';
import { StarRating } from '../../constant/Helper';
import FastImage from 'react-native-fast-image';
import { CustomDialogManager2 } from '../../utils/CustomDialog2';

const ratingData = [
  { stars: 5, percent: 90 },
  { stars: 4, percent: 6 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 0 },
];

export default function PanditReviewListScreen({route}: any) {
    const { astrologerId , astroName } = route.params;
    const navigation = useNavigation<any>();
    const [activity, setActivity] = useState<boolean>(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [filterSelector, setFilterSelector] = useState<string>("Most helpful"); 
    const [reviews, setReviews] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);


    const handleBack = () => {
        navigation.goBack();
    }

  useEffect(() => {
    loadReviews(page);
  }, [page]);

  const loadReviews = async (pageNo: number, append = false) => {
    // if (append) setLoadingMore(true);
    // else setActivity(true);
    getPanditReviewList(astrologerId, pageNo).then(response => {
      const result = JSON.parse(response);
      if (result.data.results.length === 0) {
        setLoadingMore(false);
      }
      setReviews(prev => [...prev, ...(result.data.results)]);
      
    });
  };

    const onRefresh = async() => {
      setRefreshing(true);
      setReviews([]);
      setTimeout(() => {
        setPage(1);
        setRefreshing(false);
      }, 900);
    };

  const onLoadMore = () => {
    if (!loadingMore) {
      setPage(prev => prev + 1);
    }
  };

    const renderHeader = () => (
    <>
      {/* Tabs */}
      <View style={styles.tabRow}>
        <Text style={styles.tabActive}>Rating and reviews</Text>
        <TouchableOpacity style={styles.tabRight} onPress={() => setDialogVisible(true)}>
          <Text style={styles.tab}>{filterSelector}</Text>
          <Feather name="filter" size={18} color="#444" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>

      {/* Header card */}
      <View style={styles.ratingCard}>
        <View style={styles.leftBox}>
          <Text style={styles.bigRating}>4.97</Text>
          <View style={styles.starRow}>
            {Array(5).fill(0).map((_, i) => (
              <Feather key={i} name="star" size={20} color={colors.primaryColor} />
            ))}
          </View>
          <Text style={styles.orderText}>13734 orders</Text>
        </View>

        {/* Rating bars */}
        <View style={styles.rightBox}>
          {ratingData.map(item => (
            <View style={styles.ratingRow} key={item.stars}>
              <Text style={styles.starNumber}>{item.stars}</Text>

              <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${item.percent}%` }]} />
              </View>

              <Text style={styles.percentText}>{item.percent}%</Text>
            </View>
          ))}
        </View>
      </View>
    </>
  );

    const renderItem = ({ item }: any) => (
    <View style={styles.reviewCard}>
      <View style={styles.row}>
        <FastImage source={{ uri: item.profile }} style={styles.avatar} />
        <Text style={styles.name}>{item.name || 'User'}</Text>
      </View>

      <View style={styles.starRowSmall}>
        <StarRating size={12} rating={item.rating} />
      </View>

      <Text style={styles.review}>{item.message}</Text>

      {item.reply?.trim() ? (
        <View style={styles.replyBox}>
          <Text style={styles.replyName}>{astroName || 'Astrologer'}</Text>
          <Text style={styles.replyText}>{item.replay}</Text>
        </View>
      ) : null}
    </View>
  );
      
  return (
        <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        
          {/* ---------- Header ---------- */}
          <Animated.View style={[styles.header,]}>
            <Text style={styles.headerTitle}>Rating and reviews</Text>

            <TouchableOpacity style={styles.backBtn}>
              <BackIcon size={16} onPress={handleBack} tintColor={undefined} />
            </TouchableOpacity>
            <View style={{ position: 'absolute', width: '100%', height: .4, backgroundColor: '#7B7B7B', bottom: 0 }}></View>
          </Animated.View>
          <View style={styles.container}>
            {/* Reviews */}
              <FlatList
                data={reviews}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={onLoadMore}
                onEndReachedThreshold={0.3}
                ListFooterComponent={
                  loadingMore ? <Text style={{ textAlign: 'center', padding: 14 }}>Loading more...</Text> : null
                }
                showsVerticalScrollIndicator={false}
              />
          </View>

            <SortDialog
                visible={dialogVisible}
                onClose={() => setDialogVisible(false)}
                onApply={(sortType: string) => {
                    setFilterSelector(sortType==='helpful'? "Most helpful" : "Most recent");
                    console.log("User selected:", sortType);
                    // call sort method here
                }}
                />

              <AppSpinner show={activity} />
          </SafeAreaView>
        </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 15,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderBottomWidth: 0.8,
    borderColor: '#eee',
  },
  tabActive: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  tabRight: { flexDirection: 'row', alignItems: 'center' },
  tab: {
    fontSize: 15,
    color: '#666',
    marginRight: 4,
  },

  ratingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 14,
    elevation: 2,
  },

leftBox: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},

rightBox: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
  bigRating: {
    fontSize: 45,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  orderText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 4,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  starNumber: { width: 24, fontSize: 14, color: '#000' },

  barBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#F1F0F0',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  barFill: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#2AC066', // same green shade
  },
  percentText: { width: 42, fontSize: 13, color: '#444' },

  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginHorizontal: 14,
    marginVertical: 7,
    borderWidth: 0.7,
    borderColor: '#EDEDED',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 45, height: 45, borderRadius: 22,
        backgroundColor: '#FFFAE6',        // light yellow fill
    borderWidth: 1,
    borderColor: colors.primaryColor, 
   },
  name: { marginLeft: 10, fontSize: 16, fontWeight: '600', color: '#000' },

  starRowSmall: { flexDirection: 'row', marginTop: 6 },
  review: { marginTop: 6, fontSize: 14.5, color: '#333', lineHeight: 20.5 },

  replyBox: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  replyName: {
    fontWeight: '600',
    marginBottom: 3,
    color: '#000',
  },
  replyText: {
    color: '#444',
    fontSize: 14,
  },
});
