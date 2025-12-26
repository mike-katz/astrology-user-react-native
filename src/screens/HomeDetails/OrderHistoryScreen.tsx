import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import FastImage from "react-native-fast-image";
import Feather from "react-native-vector-icons/Feather";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppSpinner } from "../../utils/AppSpinner";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, Fonts } from "../../styles";
import { chatAcceptOrderApi, chatCancelOrderApi, getOrderList } from "../../redux/actions/UserActions";
import moment from "moment";
import { BackIcon } from "../../assets/icons";
import { CustomDialogManager2 } from "../../utils/CustomDialog2";
import { decryptData, secretKey } from "../../services/requests";
import { useDispatch } from "react-redux";
import { removeWaitListItem, updateWaitListItem } from "../../redux/slices/waitListSlice";
const { width } = Dimensions.get("window");

// Example single item (replace with real data)
const SAMPLE_ORDERS = [
  {
    id: "1",
    avatar:
      "https://d1gcna0o0ldu5v.cloudfront.net/fit-in/135x135/images/77fb9922-d879-4e6c-b981-bb50813cf5c9.jpg",
    name: "Astrologer",
    message: "apki personal life bahut achi rahegi 2025 se",
    date: "29 Nov 2025",
    online: true,
  },
];

const walletData = [
  {
    id: '1',
    title: 'Chat with Astrologer for 2 minutes',
    amount: '+₹ 0.0',
    date: '29 Nov 25, 08:34 PM',
    hash: '#CHAT_NEW295423182',
  },
  {
    id: '2',
    title: 'Call with Astrologer for 5 minutes',
    amount: '+₹ 50.0',
    date: '01 Dec 25, 05:12 PM',
    hash: '#CHAT_CALL293889182',
  },
  {
    id: '3',
    title: 'Chat with Astrologer for 2 minutes',
    amount: '+₹ 0.0',
    date: '29 Nov 25, 08:34 PM',
    hash: '#CHAT_NEW295423182',
  },
  {
    id: '4',
    title: 'Call with Astrologer for 5 minutes',
    amount: '+₹ 50.0',
    date: '01 Dec 25, 05:12 PM',
    hash: '#CHAT_CALL293889182',
  },
  {
    id: '5',
    title: 'Chat with Astrologer for 2 minutes',
    amount: '+₹ 0.0',
    date: '29 Nov 25, 08:34 PM',
    hash: '#CHAT_NEW295423182',
  },
  {
    id: '6',
    title: 'Call with Astrologer for 5 minutes',
    amount: '+₹ 50.0',
    date: '01 Dec 25, 05:12 PM',
    hash: '#CHAT_CALL293889182',
  },
];

export default function OrderHistoryScreen() {
  const navigation = useNavigation<any>();
  const [activity, setActivity] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"wallet" | "orders" | "remedies">(
    "orders"
  );
  const [activeWalletTab, setWalletActiveTab] = useState<'wallet' | 'payment'>('wallet');
  const [activeRemedyTab, setRemedytActiveTab] = useState<'suggested' | 'purchased' | 'remedychat'>('remedychat');

  const [orders, setOrders] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const tabs = useMemo(
    () => [
      { id: "wallet", label: "Wallet" },
      { id: "orders", label: "Orders" },
      { id: "remedies", label: "Remedies" },
    ],
    []
  );
  const tabsRemedy = useMemo(
    () => [
      { id: "suggested", label: "Suggested" },
      { id: "purchased", label: "Purchased" },
      { id: "remedychat", label: "Remedy Chat" },
    ],
    []
  );

  const callOrderListApi = () => {
    setActivity(false);
    getOrderList(page).then(response => {
      setActivity(false);
      console.log("Order List response ==>" + response + "---Page--" + page)
      const result = JSON.parse(response);
      if (result.data.results.length === 0 || result.data.results.length < 20) {
        setLoadingMore(false);
      }
      setRefreshing(false);
      // Append not replace
      setOrders(prev => [...prev, ...(result.data.results)]);
    });
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setOrders([]);
    setTimeout(() => {
      if (page === 1) {
        callOrderListApi();
      } else {
        setPage(1);
      }
      setRefreshing(false);
    }, 0);
  }, []);

  const loadMore = () => {
    if (!loadingMore) {
      setPage(prev => prev + 1);
    }
  };
  // useEffect(() => {
  //   callOrderListApi();
  // }, [page]);

  useEffect(() => {
  if (page > 1) {
    callOrderListApi();
  }
}, [page]);

useFocusEffect(
  useCallback(() => {
    // Reset everything when screen is focused
    setOrders([]);
    setPage(1);
    setLoadingMore(false);
    setRefreshing(false);

    // Call API for first page
    callOrderListApi();

    return () => {
      // optional cleanup
    };
  }, [])
);


  const handleBack = () => navigation.goBack?.();

  const updateOrderItem = (id: any, changes: Partial<any>) => {
  setOrders(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, ...changes }
        : item
    )
  );
};

  const callChatCancelApi = (chatOrderId: any) => {
    setActivity(false);
    chatCancelOrderApi(chatOrderId).then(response => {
      setActivity(false);
      console.log("Cancel Order response ==>" + response);
      const result = JSON.parse(response);
      if (result.success === true) {
        console.log("Cancel Order Successfully ==>" + JSON.stringify(result));
        CustomDialogManager2.show({
          title: 'Alert',
          message: "Your chat request has been canceled successfully.",
          type: 2,
          buttons: [
            {
              text: 'Ok',
              onPress: () => {

              },
              style: 'default',
            },
          ],
        });
      } else {
        const result2 = decryptData(result.error, secretKey);
        const result3 = JSON.parse(result2);
        console.log("Chat Cancel Order Error response ==>" + JSON.stringify(result3));
        CustomDialogManager2.show({
          title: 'Alert',
          message: result3.message,
          type: 2,
          buttons: [
            {
              text: 'Ok',
              onPress: () => {

              },
              style: 'default',
            },
          ],
        });
      }

    });
  }

  const callChatAcceptApi = (chatOrderId: any, panditId: any) => {
    setActivity(false);
    chatAcceptOrderApi(chatOrderId).then(response => {
      setActivity(false);
      console.log("Accept Order response ==>" + response);
      const result = JSON.parse(response);
      if (result.success === true) {
        console.log("Accept Order Successfully ==>" + JSON.stringify(result));
        navigation.push('ChatWindow', {
          astrologerId: panditId,
          orderId: chatOrderId,
        });
      } else {
        const result2 = decryptData(result.error, secretKey);
        const result3 = JSON.parse(result2);
        console.log("Chat Accept Order Error response ==>" + JSON.stringify(result3));
        CustomDialogManager2.show({
          title: 'Alert',
          message: result3.message,
          type: 2,
          buttons: [
            {
              text: 'Ok',
              onPress: () => {

              },
              style: 'default',
            },
          ],
        });
      }

    });
  }

  const renderItem = ({ item }: any) => {
    const formatted = moment(item.created_at).format("DD-MMM-YYYY");
    return (
      <TouchableOpacity style={styles.row} onPress={() => {
        {item.status === "completed" &&(
            navigation.push('ChatWindow', {
              astrologerId: item.pandit_id,
              orderId: item.order_id,
            })
        )}

      }}>
        <View style={styles.avatarWrap}>
          <FastImage style={styles.avatar} source={{ uri: item.profile }} />
          {item.online && <View style={styles.onlineDot} />}
        </View>

        <View style={styles.body}>
          <Text style={styles.name}>{item.name || 'Astrologer'}</Text>
          <Text style={styles.message} numberOfLines={1}>
            {item.message}
          </Text>
          <Text style={[styles.status]}>{item.status?.toUpperCase()}</Text>
          {/* {item.status === "cancel" &&<Text style={[styles.status, { color:'red',borderColor: 'red' }]}>{item.status?.toUpperCase()}</Text>} */}
          {/* {item.status === "pending" &&<Text style={[styles.status, { color:'#baab28',borderColor: '#baab28' }]}>{item.status?.toUpperCase()}</Text>} */}
          {item.status === "completed" &&<Text style={[styles.status, { color:'green',borderColor: 'green' }]}>{item.status?.toUpperCase()}</Text>}
          {item.status === "continue" && item.is_accept &&<Text style={[styles.subText,{color:'green'}]}>Your chat is inprogress.</Text>}
          {item.status === "pending" && <Text style={[styles.subText,{color:'red'}]}>Wait for pandit to accept your chat request.</Text>}
        </View>

        <View style={styles.right}>
          <Text style={styles.date}>{formatted}</Text>

          {item.status === "continue" && item.is_accept && (
            <TouchableOpacity style={[styles.statusbtn, { borderColor: 'green' }]} onPress={()=>{
                  navigation.push('ChatWindow', {
                    astrologerId: item.pandit_id,
                    orderId: item.order_id,
                  });
                  updateOrderItem(item.id, {
                    is_accept: true,
                    status: "continue",
                  });
                  // dispatch(removeWaitListItem(item.id));   
            }}>
              <Text style={[styles.subText, { color: 'green' }]}>
                {"Chat"}
              </Text>
            </TouchableOpacity>
          )}



          {item.status === "pending" && item.is_accept && (
            <TouchableOpacity style={[styles.statusbtn, { borderColor: 'green' }]}
              onPress={() => {
                  updateOrderItem(item.id, {
                    is_accept: true,
                    status: "continue",
                  });
                callChatAcceptApi(item.order_id, item.pandit_id);
                // dispatch(removeWaitListItem(item.id));                      
              }}>
              <Text style={[styles.subText, { color: 'green' }]}>
                {"Accept"}
              </Text>
            </TouchableOpacity>
          )}

           {item.status === "pending" && (
            <TouchableOpacity style={[styles.statusbtn, { borderColor: 'red' }]}
              onPress={() => {
                  updateOrderItem(item.id, {
                    is_accept: false,
                    status: "cancel",
                  });
                callChatCancelApi(item.order_id);
                dispatch(removeWaitListItem(item.id));
              }}>
              <Text style={[styles.subText, { color: 'red' }]}>
                {"Reject"}
              </Text>
            </TouchableOpacity>
          )}

        </View>
      </TouchableOpacity>
    )
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.left}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <BackIcon size={16} tintColor={undefined} onPress={() => navigation.goBack()} />
            </TouchableOpacity>
          </View>

          <Text style={styles.headerTitle}>Order History</Text>

          <View style={styles.rightp} />
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {tabs.map((t) => {
            const isActive = activeTab === (t.id as any);
            return (
              <TouchableOpacity
                key={t.id}
                style={styles.tabItem}
                onPress={() => setActiveTab(t.id as any)}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {t.label}
                </Text>
                {isActive && <View style={styles.tabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {activeTab === "wallet" && (
          <View style={styles.walletWrap}>
            {/* Balance Row */}
            <Text style={styles.balanceTitle}>Available Balance</Text>

            <View style={styles.balanceRow}>
              <Text style={styles.balanceAmount}>₹ 0.0</Text>
              <TouchableOpacity style={styles.rechargeBtn}>
                <Text style={styles.rechargeText}>Recharge</Text>
              </TouchableOpacity>
            </View>

            {/* Buttons Row */}
            <View style={styles.walletBtnRow}>
              <TouchableOpacity
                style={[
                  styles.walletInactiveBtn,
                  activeWalletTab === 'wallet' && styles.walletActiveBtn
                ]} onPress={() => setWalletActiveTab('wallet')}>
                <Text style={[
                  styles.walletInactiveText,
                  activeWalletTab === 'wallet' && styles.walletActiveText
                ]}>Wallet Transactions</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.paymentInactiveBtn,
                  activeWalletTab === 'payment' && styles.paymentActiveBtn
                ]} onPress={() => setWalletActiveTab('payment')}
              >
                <Text style={[styles.paymentInactiveText, activeWalletTab === 'payment' && styles.paymentActiveText]}>Payment Logs</Text>
              </TouchableOpacity>
            </View>


            {activeWalletTab === 'wallet' && <FlatList
              data={walletData}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}

              renderItem={({ item }) => (
                <View style={styles.card}>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardTitle}>Chat with Astrologer for 2 minutes</Text>
                    <Text style={styles.cardAmount}>+₹ 0.0</Text>
                  </View>

                  <Text style={styles.cardDate}>29 Nov 25, 08:34 PM</Text>

                  <View style={styles.hashRow}>
                    <Text style={styles.cardHash}>#CHAT_NEW295423182</Text>
                    <Feather name="copy" size={15} color="#777" />
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                  <Text style={{ fontSize: 16, color: "#888", fontFamily: Fonts.Medium }}>
                    No Record Found
                  </Text>
                </View>
              }
              ListFooterComponent={() => (loadingMore ? <View style={styles.loadingMore}><Text>Loading...</Text></View> : null)}
            />}



          </View>
        )}


        {activeTab === "remedies" && (
          <View style={styles.tabs}>
            {tabsRemedy.map((t) => {
              const isActive = activeRemedyTab === (t.id as any);
              return (
                <TouchableOpacity
                  key={t.id}
                  style={[
                    styles.remedyInactiveBtn,
                    isActive && styles.remedyActiveBtn
                  ]}
                  onPress={() => setRemedytActiveTab(t.id as any)}
                  activeOpacity={0.8}>
                  <Text style={[
                    styles.remedyInactiveText,
                    isActive && styles.remedyActiveText
                  ]}>{t.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )

        }


        {/* Content area */}
        <View style={styles.content}>
          {/* If orders list is empty show placeholder */}
          {activeTab === "orders" && SAMPLE_ORDERS.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No orders yet</Text>
            </View>
          ) : activeTab === "orders" && (
            <FlatList
              data={orders}
              keyExtractor={(item, index) => `${item.id || 'no-id'}_${index}`}
              renderItem={renderItem}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              onEndReached={loadMore}
              onEndReachedThreshold={0.4}
              ListFooterComponent={() => (loadingMore ? <View style={styles.loadingMore}><Text>Loading...</Text></View> : null)}
              ListEmptyComponent={
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                  <Text style={{ fontSize: 16, color: "#888", fontFamily: Fonts.Medium }}>
                    No Record Found
                  </Text>
                </View>
              }
            />
          )}
        </View>
        <AppSpinner show={activity} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomColor: "gray",
    borderBottomWidth: 0.4,
  },
  left: {
    width: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  rightp: {
    width: 40, // 👈 same size as left for perfect center
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: Fonts.Medium,
    textAlign: "center",
    flex: 1, // 👈 takes remaining middle space
  },


  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 6,
  },
  tabLabel: {
    fontSize: 14,
    color: "#888",
    paddingVertical: 4,
    fontFamily: Fonts.Medium
  },
  tabLabelActive: {
    color: "#222",
    fontWeight: "600",
  },
  tabIndicator: {
    height: 2,
    width: '80%',
    borderRadius: 3,
    backgroundColor: colors.primaryColor, // yellow
    marginTop: 6,
  },

  remedyActiveBtn: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    borderRadius: 22,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  remedyActiveText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
    fontFamily: Fonts.Medium
  },
  remedyInactiveBtn: {
    flex: 1,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 22,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  remedyInactiveText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
    fontFamily: Fonts.Medium
  },

  content: {
    flex: 1,
    paddingTop: 10,
  },

  list: {
    paddingHorizontal: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 0.6,
    borderColor: "#F2F2F2",
  },

  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "visible",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#F1C42B", // accent border that matches your app
    backgroundColor: "#fff",
  },
  onlineDot: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 12,
    height: 12,
    backgroundColor: "#2AC066",
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },

  body: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
    fontFamily: Fonts.Medium
  },
  message: {
    fontSize: 13,
    color: "#777",
    fontFamily: Fonts.Medium
  },

  right: {
    width: 88,
    alignItems: "flex-end",
    // justifyContent: "center",
    top: 0
  },
  date: {
    fontSize: 12,
    color: "#777",
    fontFamily: Fonts.Medium
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 15,
    fontFamily: Fonts.Medium
  },

  walletWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 210
  },

  balanceTitle: {
    fontSize: 14,
    color: "#777",
    marginBottom: 6,
    fontFamily: Fonts.Medium
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balanceAmount: {
    fontSize: 26,
    fontWeight: "700",
    color: "#000",
    fontFamily: Fonts.Medium
  },
  rechargeBtn: {
    backgroundColor: colors.primaryColor,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  rechargeText: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: Fonts.Medium
  },

  walletBtnRow: {
    flexDirection: "row",
    marginTop: 18,
    marginBottom: 12,
  },
  walletActiveBtn: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    borderRadius: 22,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  walletActiveText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    fontFamily: Fonts.Medium
  },
  walletInactiveBtn: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 22,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  walletInactiveText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    fontFamily: Fonts.Medium
  },
  paymentActiveBtn: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    borderRadius: 22,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentActiveText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    fontFamily: Fonts.Medium
  },
  paymentInactiveBtn: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 22,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentInactiveText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    fontFamily: Fonts.Medium
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EDEDED",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 4,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 15,
    color: "#000",
    fontWeight: "600",
    flex: 1,
    fontFamily: Fonts.Medium
  },
  cardAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0FAD4E",
    marginLeft: 10,
    fontFamily: Fonts.Medium
  },
  cardDate: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
    fontFamily: Fonts.Medium
  },

  hashRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  cardHash: {
    fontSize: 13,
    color: "#666",
    marginRight: 6,
    fontFamily: Fonts.Medium
  },
  loadingMore: { padding: 16, alignItems: 'center', justifyContent: 'center' },
  subText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontFamily: Fonts.Medium
  },
  status: {
    marginTop:6,
    width:'50%',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign:'center'
  },
  statusbtn: {
    marginTop: 10,
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});
