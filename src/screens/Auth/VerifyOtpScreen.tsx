import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert, Linking,
  StatusBar,
  Image,
  useColorScheme
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Constants } from '../../constant';
import { decryptData, getRequest, postMultiPartRequest, postRequest, secretKey } from '../../services/requests';
import { resendOtp, verifyOtp } from '../../redux/actions/UserActions';
import { ServiceConstants } from '../../services/ServiceConstants';
import { AppSpinner } from '../../utils/AppSpinner';
import { BackIcon } from '../../assets/icons';
import { colors, Fonts } from '../../styles';
import { setUserDetails } from '../../redux/slices/userDetailsSlice';
import { useDispatch } from 'react-redux';
import { CustomDialogManager } from '../../utils/CustomDialog';
import { CustomDialogManager2 } from '../../utils/CustomDialog2';
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
  VerifyOtp: { phone: string };
};
type VerifyOtpScreenProps = {
  route: RouteProp<RootStackParamList, 'VerifyOtp'>;
};
const OTP_LENGTH = 4;
const RESEND_OTP_TIMER = 60;

const VerifyOtpScreen = ({ route, navigation }: VerifyOtpScreenProps) => {
  const { phone, countrycode } = route.params;
  const colorScheme = useColorScheme();
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(RESEND_OTP_TIMER);
  const inputRefs = useRef<TextInput[]>([]);
  const [activity, setActivity] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);


  const handleChange = (value: string, index: number) => {
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const finalOtp = otp.join('');
    if (finalOtp.length !== OTP_LENGTH) {
            CustomDialogManager2.show({
              title: 'Invalid OTP',
              message: `Please enter the complete OTP`,
              type:2,
              buttons: [
                {
                  text: 'Ok',
                  onPress: () => {
                    
                  },
                  style: 'default',
                },
              ],
            });
      return;
    }
    const data = {
      mobileNo: phone,
      countryCode: countrycode,
      verifyOtp: finalOtp,
    };
    setActivity(true)
    verifyOtp(data).then(response => {
      setActivity(false)
      console.log('Verify Otp response:'+response);
         const result = JSON.parse(response);
       if (result.success == true){
          // dispatch(setUserDetails({id:result.data.id}));
        navigation.reset({
                index: 0,
                routes: [{ name: 'MainTabs' }]
              });
         
        }else if(result.success == false){
          console.log("Failure response "+result);
               CustomDialogManager2.show({
               title: 'Alert',
               message: result.message,
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

    // Handle OTP submission
    // Alert.alert('OTP Verified', `Entered OTP: ${finalOtp}`);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(RESEND_OTP_TIMER);
    const data = {
      mobileNo: phone,
      countryCode: countrycode,
    };
    resendOtp(data).then(response => {
         const result = JSON.parse(response);
        if (result.success == true){
          Alert.alert("Otp send successfully.");
        }else if(result.success == false){
          console.log("Failure response "+result);
          const result2 = decryptData(result.error, secretKey);
          const result3 = JSON.parse(result2);
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

  };

  const handleResend1 = (method: 'sms' | 'call') => {
    if (timer > 0) return;
    setOtp(Array(OTP_LENGTH).fill(''));
    setTimer(RESEND_OTP_TIMER);
          CustomDialogManager.show({
              title: 'OTP Resent',
              message: `OTP resent via ${method.toUpperCase()}`,
              buttons: [
                {
                  text: 'Ok',
                  onPress: () => {
                    
                  },
                  style: 'default',
                },
              ],
            });
  };

  const handleBack = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{ width: '40%' }} onPress={handleBack}>
          <View style={styles.backButton}>
            <BackIcon size={16} onPress={handleBack} tintColor={undefined} />
            <Text style={styles.backTitle}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContent}>
        <Text style={styles.title}>Verify Phone</Text>
        <Text style={styles.subtitle}>OTP has been sent to {countrycode}{phone}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref!)}
              style={[styles.otpInput, digit ? styles.filled : styles.empty]}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={value => handleChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              cursorColor={colors.primaryColor}
              placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
                         
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
          <Text style={styles.resendText}>
            {/* Resend OTP in: {timer > 0 ? timer : 'Tap to resend'} */}
            Resend OTP in: {timer}sec
          </Text>
        </TouchableOpacity>

        <Text style={styles.resendIn}>Resend OTP In:</Text>

        <View style={styles.resendButtons}>
          <TouchableOpacity
            style={[
              styles.resendBtn,
              timer > 0 && styles.disabledButton,
            ]}
            onPress={() => handleResend1('sms')}
            disabled={timer > 0}>
            <Text style={styles.resendBtnText}>💬 SMS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.resendBtn,
              timer > 0 && styles.disabledButton,
            ]}
            onPress={() => handleResend1('call')}
            disabled={timer > 0}>
            <Text style={styles.resendBtnText}>📞 Call</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyText}>Verify Phone</Text>
        </TouchableOpacity>

          {timer === 0 &&<Text style={styles.otpAvailable}>
            Resend OTP available
          </Text>}

       {timer === 0 && <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
          <Text style={styles.verifyText}>Resend OTP on SMS</Text>
        </TouchableOpacity>}

        <Text style={styles.consentText}>
          By continuing, you accept that you are above 18 years of age, consent to receiving WhatsApp message & agree to our {'\n'}<Text style={styles.terms} onPress={() => Linking.openURL('https://www.google.com/')}>Terms and Conditions</Text>
        </Text>

      </View>
      <AppSpinner show={activity} />
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerifyOtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: 40
  },
  backButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    width: '40%'
  },
  backTitle: { 
    fontFamily:Fonts.Regular,
    fontSize: 20, marginLeft: 0, color: '#000' },
  bodyContent: {
    paddingHorizontal: 24,
    marginTop: 20
  },
  title: {
    fontFamily:Fonts.SemiBold,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontFamily:Fonts.Regular,
    fontSize: 14,
    marginBottom: 24,
    color: '#666',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  otpInput: {
    borderWidth: 1.5,
    width: 48,
    height: 56,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#000',
    backgroundColor: '#fff',
    fontFamily:Fonts.Medium
  },
  empty: {
  borderColor: '#D3D3D3', // Light gray for default
},
  filled: {
    borderColor: colors.primaryColor,
  },
  resendText: {
    fontFamily:Fonts.Regular,
    textAlign: 'left',
    color: '#999',
    marginTop: 10,
    fontSize: 13,
  },
  resendIn: {
    fontFamily:Fonts.Regular,
    textAlign: 'left',
    color: '#000',
    marginTop: 20,
    fontWeight: '600',
    display: 'none'
  },
  resendButtons: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 16,
    display: 'none'
  },
  resendBtn: {
    backgroundColor: '#F2DFF2',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    display: 'none'
  },
  resendBtnText: {
    fontFamily:Fonts.Regular,
    color: colors.primaryColor,
    fontWeight: '500',
    fontSize: 14,
  },
  disabledButton: {
    opacity: 0.5,
  },
  verifyButton: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50
  },
  verifyText: {
    fontFamily:Fonts.Regular,
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  otpAvailable:{
    fontFamily:Fonts.Regular,
    textAlign: 'left',
    color: '#999',
     marginTop: 20,
    marginBottom: 10,
    fontSize: 13,
  },
    resendButton: {
    backgroundColor: colors.primaryColor,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  consentText: {
    fontFamily:Fonts.Regular,
    fontSize: 12,
    textAlign: 'center',
    color: '#404040',
    paddingHorizontal: 10,
  },
  terms: {
    fontFamily:Fonts.SemiBold,
    // fontWeight: 'bold',
    color: '#000',
  },
});

