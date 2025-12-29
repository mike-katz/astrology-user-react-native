import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CustomDialogManager2 } from '../../utils/CustomDialog2';
import { decryptData, secretKey } from '../../services/requests';
import { createPaymentApi } from '../../redux/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../redux/slices/userDetailsSlice';
import { RootState } from '../../redux/store';

const PaymentDetailsScreen = ({route}:any) => {
    const { amount, extra } = route.params;
    const navigation = useNavigation<any>();
    const dispatch = useDispatch();
    const handleBack = () => {
        navigation.goBack();
    }
    const parseAmount = (value: any): number => {
        if (value === null || value === undefined) return 0;
        const num = Number(
            String(value)
            .replace(/[^0-9.-]/g, '') // removes ₹, spaces, text
        );
        return isNaN(num) ? 0 : num;
    };
    const numericAmount = parseAmount(amount);
    const gst = +(numericAmount * 0.18).toFixed(2);
    const payableAmount = +(numericAmount + gst).toFixed(2);
const userDetailsData = useSelector((state: RootState) => state.userDetails.userDetails);
const numericBalance = parseAmount(userDetailsData.balance);


const callCreatePayment = ()=>{
    
    createPaymentApi(payableAmount).then(response => {
          console.log("Payment response ==>" + response);
          const result = JSON.parse(response);
          if (result.success === true) {
            console.log("Payment Successfully ==>" + JSON.stringify(result));
            if(Platform.OS==='ios'){
                      Alert.alert(
                                            "Success",
                                            result.message,
                                            [
                                            
                                            {
                                                text: "Ok",
                                                onPress: () => {
                  dispatch(setUserDetails({balance:(numericAmount+numericBalance)}));
                    navigation.goBack();
                                       
                                                },
                                            },
                                            ]
                                        );
            }else{
         CustomDialogManager2.show({
              title: 'Success',
              message: result.message,
              type: 1,
              buttons: [
                {
                  text: 'Ok',
                  onPress: () => {
                    dispatch(setUserDetails({balance:(numericAmount+numericBalance)}));
                    navigation.goBack();
                  },
                  style: 'default',
                },
              ],
            });
            }
   
          } else {
            const result2 = decryptData(result.error, secretKey);
            const result3 = JSON.parse(result2);
            console.log("Payment Error response ==>" + JSON.stringify(result3));
            if(Platform.OS==='ios'){
                                  Alert.alert(
                                            "Alert",
                                            result3.message,
                                            [
                                            
                                            {
                                                text: "Ok",
                                                onPress: () => {
                
                                       
                                                },
                                            },
                                            ]
                                        );
            }else{
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

          }
    
        });
}

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{
            handleBack();
        }}>
          <Feather name="arrow-left" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Money to Wallet</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>

        {/* AMOUNT CARD */}
        <View style={styles.amountCard}>
          <Row label="Recharge Amount" value={`${amount}`} />
          <Row label="GST (18%)" value={`₹ ${gst}`} />
          <View style={styles.divider} />
          <Row label="Payable Amount" value={`₹ ${payableAmount}`} bold />
        </View>

        {/* CASHBACK BOX */}
        <View style={styles.cashbackBox}>
          <View style={styles.cashbackHeader}>
            <Text style={styles.cashbackTitle}>
              100% extra on recharge of ₹100
            </Text>
            <Feather name="x" size={16} color="#4CAF50" />
          </View>

          <View style={styles.cashbackRow}>
            <MaterialIcons name="check-circle" size={18} color="#2E7D32" />
            <Text style={styles.cashbackDesc}>
              ₹100 Cashback in Astrotalk wallet with this recharge
            </Text>
          </View>
        </View>

        {/* UPI APPS */}
        <Text style={styles.sectionTitle}>Pay with UPI apps</Text>

        <View style={styles.upiRow}>
          {['GPay', 'Paytm', 'BHIM'].map(app => (
            <View key={app} style={styles.upiItem}>
              <View style={styles.upiIcon} />
              <Text style={styles.upiText}>{app}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.otherUpi}>
          <Text style={styles.otherUpiText}>Pay with other UPI apps</Text>
          <Feather name="chevron-right" size={18} />
        </TouchableOpacity>

        {/* OTHER PAYMENT METHODS */}
        <Text style={styles.sectionTitle}>Other Payment Methods</Text>

        <PaymentRow title="UPI" />
        <PaymentRow title="Credit/Debit Card" />
        <PaymentRow title="Net Banking" />
        <PaymentRow title="Wallets" expanded />
        <PaymentRow title="Other Wallets" subtitle="Ola Money, Freecharge, Payzapp" />
        <PaymentRow title="Paytm" />

      </ScrollView>

      {/* BOTTOM CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.securedRow}>
          <Text style={styles.securedText}>Secured by </Text>
          <Text style={styles.securedBold}>Trusted Indian Banks</Text>
          <MaterialIcons name="verified" size={16} color="#2E7D32" />
        </View>

        <TouchableOpacity style={styles.payBtn} onPress={()=>{
            callCreatePayment();
        }}>
          <Text style={styles.payBtnText}>Proceed to Pay</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PaymentDetailsScreen;
const Row = ({ label, value, bold }: any) => (
  <View style={styles.row}>
    <Text style={[styles.label, bold && styles.bold]}>{label}</Text>
    <Text style={[styles.value, bold && styles.bold]}>{value}</Text>
  </View>
);

const PaymentRow = ({ title, subtitle, expanded }: any) => (
  <View style={styles.paymentRow}>
    <View>
      <Text style={styles.paymentTitle}>{title}</Text>
      {subtitle && <Text style={styles.paymentSub}>{subtitle}</Text>}
    </View>
    <MaterialIcons
      name={expanded ? 'keyboard-arrow-up' : 'check-circle-outline'}
      size={20}
      color="#999"
    />
  </View>
);
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },

  amountCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: { fontSize: 14, color: '#555' },
  value: { fontSize: 14 },
  bold: { fontWeight: '700', color: '#000' },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },

  cashbackBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#4CAF50',
    padding: 12,
    marginBottom: 20,
  },
  cashbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cashbackTitle: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  cashbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  cashbackDesc: {
    marginLeft: 6,
    fontSize: 12,
    color: '#2E7D32',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },

  upiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  upiItem: { alignItems: 'center', width: 90 },
  upiIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 6,
  },
  upiText: { fontSize: 12 },

  otherUpi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
otherUpiText: {
  fontSize: 13,
  color: '#6A6A6A',
  fontWeight: '500',
},
  paymentRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentTitle: { fontSize: 14, fontWeight: '500' },
  paymentSub: { fontSize: 11, color: '#777' },

  bottomBar: {
    padding: 16,
    backgroundColor: '#fff',
  },
  securedRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  securedText: { fontSize: 12 },
  securedBold: { fontSize: 12, fontWeight: '600' },

  payBtn: {
    backgroundColor: '#FFC107',
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
