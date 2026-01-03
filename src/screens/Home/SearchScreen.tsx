import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, useColorScheme, FlatList, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { BackIcon } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { colors, Fonts } from '../../styles';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import { StarRating } from '../../constant/Helper';
import { formatKnowledge } from '../../constant/AppConst';
import RightGreenIcon from '../../assets/icons/RightGreenIcon';
import { getPandit } from '../../redux/actions/UserActions';
import { ServiceConstants } from '../../services/ServiceConstants';

const SearchScreen = () => {
    const navigation = useNavigation<any>();
    const colorScheme = useColorScheme(); 
    const [activeTab, setActiveTab] = useState<'astrologer' | 'astromall'>('astrologer');
    const [astrologers, setAstrologers] = useState<any[]>([]);
    
    const [textSearch, setTextSearch] = useState<string>("");
      const [activity, setActivity] = useState<boolean>(false);
      const [page, setPage] = useState(1);
    const handleBack = () => {
        navigation.goBack();
    }


    const callPanditApi = () => {
    setActivity(false);
    getPandit(page).then(response => {
        setActivity(false);
        console.log("Chat - Pandit response ==>" + response)
        const result = JSON.parse(response);
        if (result.data.results.length === 0) {
        // setLoadingMore(false);
        }
        // Append not replace
        setAstrologers(prev => [...prev, ...(result.data.results)]);
    });
    }
    useEffect(() => {
    callPanditApi();
    }, [page]);


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
          <FastImage source={{ uri: item.profile }} style={[styles.avatar, { borderColor: colors.primaryColor }]} />
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
            navigation.push('ChatWindow', { astrologerId: item.id });
            // setSelectedName(item.name);
            // setShowWallet(true)
          }}>
            <Text style={styles.chatBtnText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );




    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>

                {/* ---------- SEARCH BAR ---------- */}
                <View style={styles.searchRow}>
                    <TouchableOpacity style={styles.backBtn}>
                        <BackIcon size={16} onPress={handleBack} tintColor={undefined} />
                    </TouchableOpacity>

                    <TextInput
                        placeholder="Search astrologer, astromall products"
                        style={styles.searchInput}
                       value={textSearch}
                        onChangeText={setTextSearch}
                        placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
                        cursorColor={colors.primaryColor}
                    />
                </View>
                {textSearch.length < 3 && (<>
                {/* ---------- TOP SERVICES ---------- */}
                <Text style={styles.sectionTitle}>Top Services</Text>

                <View style={styles.topServicesContainer}>
                    <TouchableOpacity style={[styles.serviceBtn, styles.callBtn]} onPress={ ()=>navigation.navigate('MainTabs', { screen: 'Call' })}>
                        <Text style={styles.serviceIcon}>📞</Text>
                        <Text style={styles.serviceText}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.serviceBtn, styles.chatBtn]} onPress={ ()=>navigation.navigate('MainTabs', { screen: 'Chat' })}>
                        <Text style={styles.serviceIcon}>💬</Text>
                        <Text style={styles.serviceText}>Chat</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.serviceBtn, styles.mallBtn]} onPress={ ()=>navigation.navigate('MainTabs', { screen: 'Remedies' })}>
                        <Text style={styles.serviceIcon}>🛍️</Text>
                        <Text style={styles.serviceText}>AstroMall</Text>
                    </TouchableOpacity>
                </View>

                {/* ---------- QUICK LINKS ---------- */}
                <Text style={styles.sectionTitle}>Quick Link</Text>

                <View style={styles.quickLinkRow}>

                    <TouchableOpacity style={styles.quickCard} onPress={ ()=>{
                                if(ServiceConstants.User_ID!=null){
                                      navigation.push('AddMoneyScreen');
                                    }else {
                                      navigation.reset({
                                                      index: 0,
                                                      routes: [{ name: 'AuthStack' }]
                                                    });
                                    }
                    }
                      
                      
                      }>
                        <Text style={styles.cardIcon}>👛</Text>
                        <Text style={styles.cardText}>Wallet</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickCard} onPress={ ()=>
                      {
                            if(ServiceConstants.User_ID!=null){
                                      navigation.push('HelpSupportScreen');
                                    }else {
                                      navigation.reset({
                                                      index: 0,
                                                      routes: [{ name: 'AuthStack' }]
                                                    });
                                    }
                      }
                      
                      
                      }>
                        <Text style={styles.cardIcon}>🎧</Text>
                        <Text style={styles.cardText}>Customer Support</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickCard} onPress={ ()=>
                      {
                                 if(ServiceConstants.User_ID!=null){
                                      navigation.push('OrderHistoryScreen');
                                    }else {
                                      navigation.reset({
                                                      index: 0,
                                                      routes: [{ name: 'AuthStack' }]
                                                    });
                                    }
                      }
                      
                      
                      }>
                        <Text style={styles.cardIcon}>🛒</Text>
                        <Text style={styles.cardText}>Order History</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.quickCard} onPress={ ()=>{
                                   if(ServiceConstants.User_ID!=null){
                                      navigation.push('EditProfileScreen');
                                    }else {
                                      navigation.reset({
                                                      index: 0,
                                                      routes: [{ name: 'AuthStack' }]
                                                    });
                                    }
                    }
                      }>
                        <Text style={styles.cardIcon}>👤</Text>
                        <Text style={styles.cardText}>Profile</Text>
                    </TouchableOpacity>

                </View>
                </>)}

               {textSearch.length > 3 && ( <View>
                    <View style={styles.walletBtnRow}>
                    <TouchableOpacity 
                        style={[
                    styles.walletInactiveBtn,
                    activeTab === 'astrologer' && styles.walletActiveBtn
                    ]} onPress={()=>setActiveTab('astrologer')}>
                        <Text style={[
                    styles.walletInactiveText,
                    activeTab === 'astrologer' && styles.walletActiveText
                    ]}>Astrologer</Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity 
                        style={[
                    styles.paymentInactiveBtn,
                    activeTab === 'astromall' && styles.paymentActiveBtn
                    ]} onPress={()=>setActiveTab('astromall')}
                    >
                        <Text style={[styles.paymentInactiveText, activeTab === 'astromall' && styles.paymentInactiveText]}>Astromall</Text>
                    </TouchableOpacity>
                    </View>
                    {activeTab === 'astrologer' && <FlatList
                        data={astrologers}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingVertical: 10 }}
                        renderItem={renderItem}
                        ListEmptyComponent={
                            <View style={{ flex:1, justifyContent:'center', alignItems:'center', marginTop: 50 }}>
                            <Text style={{ fontSize: 16, color: "#888", fontFamily: Fonts.Medium }}>
                                No Record Found
                            </Text>
                            </View>
                        }
                        />}
                </View> )}

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default SearchScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal: 15,
    },

    /* ----------------- SEARCH BAR ----------------- */
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },
    backBtn: {
        width: 40,
        height: 40,
        justifyContent: "center",
        left:-10
    },
    searchInput: {
        flex: 1,
        height: 42,
        borderRadius: 10,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 15,
        fontSize: 15,
        fontFamily:Fonts.Regular,
    },

    /* ----------------- TOP SERVICES ----------------- */
    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 12,
        color: "#333",
        fontFamily:Fonts.SemiBold,
    },

    topServicesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    serviceBtn: {
        flex: 1,
        flexDirection: "row",
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
    },

    callBtn: {
        backgroundColor: "#E7F1FB",
    },

    chatBtn: {
        backgroundColor: "#F6E7F9",
    },

    mallBtn: {
        backgroundColor: "#E5F8EA",
    },

    serviceIcon: {
        marginRight: 6,
        fontSize: 12,
    },
    serviceText: {
        fontFamily:Fonts.Regular,
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
    },

    /* ----------------- QUICK LINKS ----------------- */
    quickLinkRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    quickCard: {
        width: "23%",
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E5E5",
        alignItems: "center",
        paddingHorizontal: 5,
    },

    cardIcon: {
        fontSize: 16,
        marginBottom: 5,
    },

    cardText: {
        fontFamily:Fonts.Regular,
        fontSize: 12,
        fontWeight: "500",
        color: "#333",
        textAlign: "center",
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
    fontFamily:Fonts.Medium
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
    fontFamily:Fonts.Medium
  },
  paymentActiveBtn: {
    flex: 1,
    backgroundColor:colors.primaryColor,
    borderRadius: 22,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentActiveText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    fontFamily:Fonts.Medium
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
    fontFamily:Fonts.Medium
  },

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
});
