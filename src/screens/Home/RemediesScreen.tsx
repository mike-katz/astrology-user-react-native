import React, { useState } from 'react';
import {View, FlatList, StyleSheet, Text, StatusBar, Platform, TouchableOpacity, Image, Alert, Animated, ActivityIndicator} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { colors, Fonts } from '../../styles';
import MenuIcon from '../../assets/icons/MenuIcon';
import SearchIcon from '../../assets/icons/SearchIcon';
import OrderHistoryIcon from '../../assets/icons/OrderHistoryIcon';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';
import { SlideMenu } from './SlideMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const RemediesScreen = () =>{
const navigation = useNavigation<any>();
const userDetailsData = useSelector((state: RootState) => state.userDetails.userDetails);
const [menuVisible, setMenuVisible] = useState(false);
const  link_web  = 'https://astroguruji.store';

const scrollY = React.useRef(new Animated.Value(0)).current;
const [loading, setLoading] = React.useState(true); 
React.useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 5000);
  return () => clearTimeout(timer);
}, []);

    return(
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
                          {/* Header */}
      <View style={styles.header}>
        {/* Profile Image wrapper */}
      <TouchableOpacity style={styles.profileWrapper} onPress={() => setMenuVisible(true)}>
        <Image
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
      
        <Text style={styles.welcomeText}></Text>
        <Text style={styles.headerTitle}>AstroRemedy</Text>
        <TouchableOpacity onPress={() => navigation.push('SearchScreen')} style={{ backgroundColor:'#FFF',padding:3,borderRadius:30,marginRight:6 }}>
          <SearchIcon
            width={30} height={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('OrderHistory clicked')} style={{ backgroundColor:'#FFF',padding:3,borderRadius:30 }}>
          <OrderHistoryIcon
            width={30} height={30}
          />
        </TouchableOpacity>
      </View>

        <View style={{ flex: 1 }}>
            {loading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.primaryColor} />
                <Text style={{ marginTop: 8, fontSize: 14 }}>Loading...</Text>
              </View>
            )}
            <WebView
                  source={{ uri: link_web }}
                  style={{ flex: 1,marginBottom:50 }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  onLoadStart={() => setLoading(true)}   // 👈 Show loader
                  onLoadEnd={() => setLoading(false)}    // 👈 Hide loader
                  onError={() => setLoading(false)}
                  setSupportMultipleWindows={false}
                  userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
                  scrollEventThrottle={16}
                  onScroll={(event) => {
                    scrollY.setValue(event.nativeEvent.contentOffset.y);
                  }}
                    // 👇 FIXED LOADER
                  onLoadProgress={({ nativeEvent }) => {
                    if (nativeEvent.progress === 1) {
                      setLoading(false);   // hide loader when fully loaded
                    }
                  }}
                  />
                </View>

          <SlideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
                  
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
      justifyContent:'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 7,
      backgroundColor:'#FFF',
      borderBottomWidth:.4,
      borderBottomColor:'gray',
    },
  
profileWrapper: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: colors.primaryLightColor,        
    borderWidth: 2,
    borderColor: colors.primaryBorderColor,         
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
    headerTitle:{
      position: 'absolute',
      textAlign:'center',
      fontSize:16,
      fontWeight:'700',
      fontFamily:Fonts.SemiBold,
      justifyContent:'center',
      alignItems:'center'
    },
    loaderContainer: {
      position: 'absolute',
      top: '45%',
      left: 0,
      right: 0,
      alignItems: 'center',
      zIndex: 100,
    }
  
});

export default RemediesScreen;