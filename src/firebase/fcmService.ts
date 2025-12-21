import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFcmTokenAfterLogin = async () => {
  try {
    const savedToken = await AsyncStorage.getItem('fcmToken');
    if (savedToken) {
      console.log('FCM token already exists:', savedToken);
      return savedToken;
    }

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
        return null;
      }
    } else {
      const authStatus = await messaging().requestPermission({
        alert: true,
        badge: true,
        sound: true,
      });

      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        console.log('iOS notification permission denied');
        return null;
      }
    }

    const token = await messaging().getToken();
    console.log('FCM Token:', token);

    await AsyncStorage.setItem('fcmToken', token);
    return token;
  } catch (error) {
    console.log('FCM error:', error);
    return null;
  }
};
