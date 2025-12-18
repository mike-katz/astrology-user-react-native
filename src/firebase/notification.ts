import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

export async function requestNotificationPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
      const token = await messaging().getToken();
  console.log('FCM Token:', token);
    console.log('Notification permission granted');
  }
}
