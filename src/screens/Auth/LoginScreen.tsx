import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StatusBar,
  Linking,
  Pressable,
  Alert,
} from 'react-native';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CustomDialogManager2 } from '../../utils/CustomDialog2';
import { loginAction } from '../../redux/actions/UserActions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, Fonts } from '../../styles';
import { AppSpinner } from '../../utils/AppSpinner';
import AstrotalkGuruji from '../../assets/icons/AstrotalkGuruji';
import { ServiceConstants } from '../../services/ServiceConstants';
import { useDispatch } from 'react-redux';
import { resetUserData, setUserDetails } from '../../redux/slices/userDetailsSlice';
type RootStackParamList = {
  Login: undefined;
  VerifyOtp: { phone: string };
};
import { useTranslation } from 'react-i18next';
import i18n from "../../localization/i18n";
import { resetWaitListData } from '../../redux/slices/waitListSlice';
import { clearProfileList } from '../../redux/slices/profileListSlice';
export default function LoginScreen() {
  const { t } = useTranslation();
  // i18n.changeLanguage('hi');
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [countryCode, setCountryCode] = useState('IN');
  const [country, setCountry] = useState<any>(null);
  const [phone, setPhone] = useState('');
  const [visible, setVisible] = useState(false);
  const colorScheme = useColorScheme(); // returns 'dark' or 'light'
  const [activity, setActivity] = useState<boolean>(false);
  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCountry(country);
    setVisible(false);
  };

    const handleContinue = async() => {
        Keyboard.dismiss();
    if (phone.length === 10) {
      //  navigation.navigate('VerifyOtp', { phone: `${phone}`, countrycode: `+${country?.callingCode?.[0] || '91'}` });
      setActivity(true);
      const data = {
        mobileNo: phone,
        countryCode: `+${country?.callingCode?.[0] || '91'}`,
      };
      loginAction(data).then(response => {
        setActivity(false);
        const result = JSON.parse(response);
        if (result.success == true){
          navigation.navigate('VerifyOtp', { phone: `${phone}`, countrycode: `+${country?.callingCode?.[0] || '91'}` });
        }else if(result.success == false){
            CustomDialogManager2.show({
                title: 'Alert',
                message: result.message,
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
        }
      });
    }
  };

  const handleSkip = async() => {
    ServiceConstants.setBearerToken(null);
    ServiceConstants.User_ID = null;
    ServiceConstants.setUserName(null);
    ServiceConstants.setUserphone(null);
    dispatch(resetUserData());
    dispatch(resetWaitListData());
    dispatch(clearProfileList());
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }]
    });
  };

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
            {/* <KeyboardAvoidingView
              style={styles.container}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}> */}
      {/* Skip */}
      <Pressable android_ripple={{ color: '#FBB91730', borderless: true }}
              style={({ pressed }) => [
                styles.skipBtn,
                pressed && { opacity: 0.85 }, // optional visual feedback
              ]}  onPress={()=>handleSkip()}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/icons/AstroGurujiLogoApp.png')}
          style={styles.logo}
        />
      </View>
  
      {/* Title */}
      {/* <Text style={styles.title}>ASTROTALK</Text> */}
       {/* Subtitle */}
        {/* <Text style={styles.subtitle}>GURUJI</Text> */}

        {/* <AstrotalkGuruji /> */}


<View style={styles.yellowSection}>


        <View style={styles.freeChatLabel}>
            <Text style={styles.freeChatText}>
            First Chat with Astrologer is Free!
            </Text>
        </View>

      {/* Phone Row */}
      <View style={styles.phoneRow}>
        <TouchableOpacity style={styles.countryBox}>
          <CountryPicker
            {...{
              countryCode,
              withCallingCode: true,
              withFilter: true,
              withFlag: true,
              withModal: true,
              onSelect,
              visible, // manually control visibility
              onClose: () => setVisible(false),
            }}
            renderFlagButton={() => (
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => setVisible(true)} >
                <Image
                  source={{ uri: `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png` }}
                  style={{ width: 30, height: 20, marginLeft: 5 }}
                />
                <Text style={{ color: '#000', fontSize: 16, marginLeft: 5,fontFamily: Fonts.SemiBold, }}>+{country?.callingCode?.[0] || '91'}</Text>
              </TouchableOpacity>
            )}
          />
        </TouchableOpacity>

        <TextInput
          placeholder="Enter Phone number"
          keyboardType="number-pad"
          style={styles.phoneInput}
          value={phone}
          placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#666'}
          onChangeText={(text) => {
            const digitsOnly = text.replace(/[^0-9]/g, ""); // remove any non-digit
            setPhone(digitsOnly);
          }}
          maxLength={10}
          cursorColor={colors.primaryColor}
        />
        
      </View>

      {/* Continue */}
      <TouchableOpacity
        disabled={phone.length !== 10}
        style={[styles.btnContinue, phone.length !== 10 && styles.btnDisabled]}
        onPress={handleContinue}
      >
        <Text style={styles.continueText}>GET OTP</Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footerText}>
        By signing up, you agree to our
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.google.com/')}> Terms of Use </Text>
        {' '}and{' '}
        <Text style={styles.link} onPress={() => Linking.openURL('https://www.google.com/')}> Privacy Policy</Text>
      </Text>

    {/* Divider */}
      <View style={styles.dividerWrap}>
        <View style={styles.divider} />
        <Text style={styles.or}>Or</Text>
        <View style={styles.divider} />
      </View>

      {/* Truecaller */}
      <Pressable android_ripple={{ color: '#FBB91730', borderless: true }}
              style={({ pressed }) => [
                styles.truecallerBtn,
                pressed && { opacity: 0.85 }, // optional visual feedback
              ]} >
        <Text style={styles.truecallerText}>📱 Login with Truecaller</Text>
      </Pressable>

      {/* Bottom Info */}
      <View style={styles.bottomStats}>
        <View style={styles.stat}>
          <Text style={styles.value}>100%</Text>
          <Text style={styles.label}>Privacy</Text>
        </View>
        
        <View style={styles.divider2} />
        <View style={styles.stat}>
          <Text style={styles.value}>10000+</Text>
          <Text style={styles.label}>Top astrologers of India</Text>
        </View>
        <View style={styles.divider2} />
        <View style={styles.stat}>
          <Text style={styles.value}>3Cr+</Text>
          <Text style={styles.label}>Happy customers</Text>
        </View>
      </View>
      </View>

     <AppSpinner show={activity} />
    {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    paddingTop: 10, 
    backgroundColor: '#fff' ,
},

  skipBtn: {
    position: 'absolute',
    right: 20,
    top: '6%',
    paddingVertical:10,
    paddingHorizontal:10
  },
  skipText: {
    color: '#999',
    fontSize: 14,
    fontFamily: Fonts.SemiBold,
  },
  logoContainer: {
    marginTop: 40,
    marginBottom: 15,
  },
  logo: {
    height: 150,
    width: 150,
  },
  title: {
    fontFamily: Fonts.SemiBold,
    fontSize: 28,
    fontWeight: '700',
    color: colors.primaryColor,
  },
  subtitle: {
    fontFamily: Fonts.SemiBold,
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    // borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 10,
    // borderColor: '#ddd',
    backgroundColor: '#fff',
    height: 55,
  },
  countryBox: {
    width: 50,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 15,
    fontFamily: Fonts.SemiBold,
    left:'7%'
  },

  btnContinue: {
    marginTop: 20,
    width: '85%',
    height: 54,
    backgroundColor: '#000',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDisabled: {
    backgroundColor: '#ddd',
  },
  continueText: {
    color: '#fff',
    fontWeight: '600',
  },

  dividerRow: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    marginVertical: 25,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#555',
  },

  footerText: {
    marginTop: 25,
    textAlign: 'center',
    width: '75%',
    color: '#666',
    fontSize: 12,
    fontFamily: Fonts.SemiBold,
  },
  link: {
    textDecorationLine: 'underline',
    color: '#000',
    fontWeight: '600',
  },

dividerWrap: {
    marginTop: 20,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  or: {
    marginHorizontal: 10,
    color: '#333',
  },

  truecallerBtn: {
    backgroundColor: '#fff',
    width: '85%',
    paddingVertical: 12,
    marginTop: 10,
    alignItems: 'center',
    // borderColor:'gray',
    // borderWidth:1,
    height: 54,
    borderRadius: 14,
    justifyContent: 'center',
   
  },
  truecallerText: {
    color: '#1778F2',
    fontWeight: '600',
  },

  bottomStats: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
divider2: {
    height: 50,
    width: 1,
    backgroundColor: '#7B7B7B',
  },
  stat: {
    alignItems: 'center',
    width: '30%',
  },
  value: {
    fontWeight: '700',
    color: '#000',
    fontSize: 18,
    fontFamily: Fonts.SemiBold,
  },
  label: {
    textAlign: 'center',
    fontSize: 11,
    fontFamily: Fonts.SemiBold,
    color: '#333',
  },
   yellowSection: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.primaryColor, // AstroTalk Yellow
    width: '100%',
    height: '60%',
    alignItems: 'center',
  },

  freeChatLabel: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7B7B7B',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    top: -20,
  },
  freeChatText: {
    fontFamily: Fonts.SemiBold,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});
