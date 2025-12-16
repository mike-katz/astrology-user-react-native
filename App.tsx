import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Auth/LoginScreen';
import VerifyOtpScreen from './src/screens/Auth/VerifyOtpScreen';
import { Platform, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from './src/utils/CustomTabBar';


import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { asyncLoginAction } from './src/redux/actions/UserActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomToast from './src/utils/CustomToast';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CustomDialog from './src/utils/CustomDialog';
import CustomDialogComponent from './src/utils/CustomDialog2';

//Screens
import HomeScreen from './src/screens/Home/HomeScreen';
import ChatScreen from './src/screens/Home/ChatScreen';
import LiveScreen from './src/screens/Home/LiveScreen';
import CallScreen from './src/screens/Home/CallScreen';
import RemediesScreen from './src/screens/Home/RemediesScreen';
import GurujiCongrats from './src/screens/Auth/GurujiCongrats';
import WebviewScreen from './src/screens/Profile/WebviewScreen';
import SearchScreen from './src/screens/Home/SearchScreen';
import HelpSupportScreen from './src/screens/Profile/HelpSupportScreen';
import AddMoneyScreen from './src/screens/Payment/AddMoneyScreen';
import AstrologyBlogScreen from './src/screens/Blog/AstrologyBlogScreen';

import './src/localization/i18n';
import FreeChatSteps from './src/screens/Auth/FreeChatSteps';
import BirthPlaceScreen from './src/screens/Auth/SearchPlaceScreen';
import KundliScreen from './src/screens/HomeDetails/KundliListScreen';
import CreateKundliSteps from './src/screens/HomeDetails/CreateKundliSteps';
import EditKundliScreen from './src/screens/HomeDetails/EditKundliScreen';
import DailyHoroscopeScreen from './src/screens/HomeDetails/DailyHoroscopeScreen';
import EditProfileScreen from './src/screens/Profile/EditProfileScreen';
import PanditReviewListScreen from './src/screens/Profile/PanditReviewListScreen';
import PanditProfileDetailsScreen from './src/screens/HomeDetails/PanditProfileDetailsScreen';
import FollowingScreen from './src/screens/Profile/FollowingScreen';
import ChatWindow from './src/screens/HomeDetails/ChatWindow';
import SettingsScreen from './src/screens/Settings/SettingsScreen';
import OrderHistoryScreen from './src/screens/HomeDetails/OrderHistoryScreen';
import KundliMatchingScreen from './src/screens/HomeDetails/KundliMatchingScreen';
import { SocketProvider } from './src/socket/SocketProvider';


 // Types for navigation
 type RootStackParamList = {
   AuthStack: undefined;
   MainTabs: undefined;
   Login: undefined;
   GurujiCongrats: undefined;
   WebviewScreen: undefined;
   SearchScreen: undefined;
   HelpSupportScreen: undefined;
   AddMoneyScreen: undefined;
   AstrologyBlogScreen: undefined;
   FreeChatSteps: undefined;
   SearchPlaceScreen: undefined;
   KundliListScreen: undefined;
   CreateKundliSteps: undefined;
   EditKundliScreen: undefined;
   DailyHoroscopeScreen: undefined;
   PanditProfileDetailsScreen: undefined;
   EditProfileScreen: undefined;
   PanditReviewListScreen: undefined;
   FollowingScreen: undefined;
   ChatWindow:undefined;
   SettingsScreen:undefined;
   OrderHistoryScreen:undefined;
   KundliMatchingScreen:undefined;
 };
 
 type AuthStackParamList = {
   Login: undefined;
   VerifyOtp: { phone: string };
   GurujiCongrats:undefined;
 };

// Create navigators
const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator();


// Auth Stack Navigator
const AuthStackNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { paddingTop: 0 }, // <-- removes extra space
    }}>
    <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="VerifyOtp" component={VerifyOtpScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="GurujiCongrats" component={GurujiCongrats} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);



// Main Tabs Navigator
const MainTabsNavigator = () => (

  <Tab.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      headerShown: false,
      contentStyle: { paddingTop: 0 },
    })}>

    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Chat" component={ChatScreen} />
    {/* <Tab.Screen name="Live" component={LiveScreen} /> */}
    <Tab.Screen name="Call" component={CallScreen} />
    <Tab.Screen name="Remedies" component={RemediesScreen} />
  </Tab.Navigator>


);

const RootNavigator = ({ initialRoute }: { initialRoute: keyof RootStackParamList }) => {
  return (
    <RootStack.Navigator initialRouteName={initialRoute}>
      <RootStack.Screen
        name="AuthStack"
        component={AuthStackNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="MainTabs"
        component={MainTabsNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} />

      <RootStack.Screen
        name="GurujiCongrats"
        component={GurujiCongrats}
        options={{ headerShown: false }} />

      <RootStack.Screen
        name="WebviewScreen"
        component={WebviewScreen}
        options={{ headerShown: false }} />

      <RootStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }} />

      <RootStack.Screen
        name="HelpSupportScreen"
        component={HelpSupportScreen}
        options={{ headerShown: false }} />
      <RootStack.Screen
        name="AddMoneyScreen"
        component={AddMoneyScreen}
        options={{ headerShown: false }} />
      <RootStack.Screen
        name="AstrologyBlogScreen"
        component={AstrologyBlogScreen}
        options={{ headerShown: false }} />

      <RootStack.Screen
        name="FreeChatSteps"
        component={FreeChatSteps}
        options={{ headerShown: false }} />

      <RootStack.Screen
        name="SearchPlaceScreen"
        component={BirthPlaceScreen}
        options={{ headerShown: false }} />

      <RootStack.Screen
        name="KundliListScreen"
        component={KundliScreen}
        options={{ headerShown: false }} />

      <RootStack.Screen
        name="CreateKundliSteps"
        component={CreateKundliSteps}
        options={{ headerShown: false }} />

      <RootStack.Screen
        name="EditKundliScreen"
        component={EditKundliScreen}
        options={{ headerShown: false }} />

     <RootStack.Screen
        name="DailyHoroscopeScreen"
        component={DailyHoroscopeScreen}
        options={{ headerShown: false }} />
        
     <RootStack.Screen
        name="PanditProfileDetailsScreen"
        component={PanditProfileDetailsScreen}
        options={{ headerShown: false }} />

     <RootStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }} />

    <RootStack.Screen
        name="PanditReviewListScreen"
        component={PanditReviewListScreen}
        options={{ headerShown: false }} />

    <RootStack.Screen
        name="FollowingScreen"
        component={FollowingScreen}
        options={{ headerShown: false }} />

    <RootStack.Screen
        name="ChatWindow"
        component={ChatWindow}
        options={{ headerShown: false }} />

    <RootStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }} />

    <RootStack.Screen
        name="OrderHistoryScreen"
        component={OrderHistoryScreen}
        options={{ headerShown: false }} />    

    <RootStack.Screen
        name="KundliMatchingScreen"
        component={KundliMatchingScreen}
        options={{ headerShown: false }} />      
        
    </RootStack.Navigator>)
};

const App = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 1500);
    const checkLogin = async () => {
      try {

        // const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        // if (!hasSeenOnboarding) {
        //   setInitialRoute('Onboarding');
        //   return;
        // }

        // await AsyncStorage.setItem('isLoggedIn','true');
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        setInitialRoute(isLoggedIn === 'true' ? 'MainTabs' : 'AuthStack');

      } catch (error) {
        console.error('Failed to read login state:', error);
        setInitialRoute('AuthStack'); // fallback
      }
    };
    checkLogin();
    asyncLoginAction();
  }, []);

  // Show nothing or splash screen until route is decided
  if (!initialRoute) return null;


  return (

    <Provider store={store}>
      <SafeAreaProvider>

         <SocketProvider>   {/* 🔥 GLOBAL SOCKET */}
          <NavigationContainer >
            <CustomToast />
            <CustomDialog />
            <CustomDialogComponent />
            {Platform.OS === 'android' && (<StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />)}
            <RootNavigator initialRoute={initialRoute} />
          </NavigationContainer>
         </SocketProvider>
      </SafeAreaProvider>
    </Provider>

  );
};

export default App;
