import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { BackIcon } from '../../assets/icons';
import { Fonts } from '../../styles';
import {useNavigation } from '@react-navigation/native';
import WalletIcon from '../../assets/icons/WalletIcon';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ServiceConstants } from '../../services/ServiceConstants';
import { getBalance } from '../../redux/actions/UserActions';
import { setUserDetails } from '../../redux/slices/userDetailsSlice';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 3; // 3-column grid

const amounts = [
  { id: 1, price: '₹ 50', extra: '100% Extra' },
  { id: 2, price: '₹ 100', extra: '100% Extra' },
  { id: 3, price: '₹ 200', extra: '50% Extra' },
  { id: 4, price: '₹ 500', extra: '50% Extra', popular: true },
  { id: 5, price: '₹ 1000', extra: '5% Extra' },
  { id: 6, price: '₹ 2000', extra: '10% Extra' },
  { id: 7, price: '₹ 3000', extra: '10% Extra' },
  { id: 8, price: '₹ 4000', extra: '12% Extra' },
  { id: 9, price: '₹ 8000', extra: '12% Extra' },
  { id: 10, price: '₹ 15000', extra: '15% Extra' },
  { id: 11, price: '₹ 20000', extra: '15% Extra' },
  { id: 12, price: '₹ 50000', extra: '20% Extra' },
  { id: 13, price: '₹ 100000', extra: '20% Extra' },
  { id: 14, price: '₹ 101000', extra: '10% Extra', popular: true },
];

const AddMoneyScreen = () => {
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const handleBack = () => {
        navigation.goBack();
    }
    const userDetailsData = useSelector((state: RootState) => state.userDetails.userDetails);

    useEffect(() => {
      if(ServiceConstants.User_ID!=null){
          callBalance();
      }
    },[]);

    const callBalance =()=>{
          getBalance().then(response => {
          const result = JSON.parse(response);
          dispatch(setUserDetails(result.data));
        });
    }

  return (
       <SafeAreaProvider>
           <SafeAreaView style={styles.container}>
      
               {/* ----------  HEADER ---------- */}
        <Animated.View   style={[
                    styles.header,
                    // { backgroundColor: headerBackgroundColor }
                ]}>
            <Text style={styles.headerTitle}>Add Money to Wallet</Text>

            <TouchableOpacity style={styles.backBtn}>
                <BackIcon size={16} onPress={handleBack} tintColor={undefined} />
            </TouchableOpacity>
                   <View style={styles.walletBox}>
                      <WalletIcon width={12} height={12}
                      style={styles.walletIcon}/>
                    <Text style={styles.walletAmount}>₹ {userDetailsData.balance}</Text>
                  </View>
            <View style={{ position:'absolute',width:'100%', height: .1,backgroundColor:'#7B7B7B',bottom:0 }}></View>
        </Animated.View>

      {/* FlatList */}
      <FlatList
        data={amounts}
        numColumns={3}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={()=>{
            navigation.push("PaymentDetailsScreen", {
              amount: item.price,
              extra: item.extra,
            });
          }}>
            {item.popular && (
              <View style={styles.popularTag}>
                <Text style={styles.popularText}>Most Popular</Text>
              </View>
            )}

            <Text style={styles.amount}>{item.price}</Text>

            <View style={styles.extraBox}>
              <Text style={styles.extraText}>{item.extra}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

            </SafeAreaView>
        </SafeAreaProvider>
  );
};

export default AddMoneyScreen;

const styles = StyleSheet.create({
    container: {
    flex: 1,
    marginTop: 0,
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
        right:0,
        fontSize: 18,
        fontWeight: "500",
        color: "#000",
        fontFamily:Fonts.Medium
    },
    backBtn: {
        width: 60,
        height: 40,
        justifyContent: "center",
        paddingLeft: 2,
    },
    walletBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginRight:10
    },

    walletIcon: {
        marginRight: 6,
        
    },

    walletAmount: {
        fontSize: 11,
        fontWeight: '600',
        fontFamily:Fonts.Medium
    },

  // Cards
  card: {
    width: ITEM_WIDTH,
    height: 70,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#D6D6D6',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    marginRight: 10, 
  },

  // Most Popular Tag
  popularTag: {
    position: 'absolute',
    top: -8,
    backgroundColor: '#FF8A00',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
  },
  popularText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily:Fonts.Medium
  },

  amount: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 18,
    fontFamily:Fonts.Medium
  },

  extraBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 24,
    backgroundColor: '#E7F9E9',
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  extraText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#129D34',
    fontFamily:Fonts.Medium
  },
});

