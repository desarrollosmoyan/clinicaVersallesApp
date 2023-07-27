// import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    const fcmToken2 = await messaging().getToken();
    console.log(fcmToken2);
    // GetFCMToken();
  }
}

// async function GetFCMToken() {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   console.log(fcmToken, 'old fcmToken');

//   if (!fcmToken) {
//     try {
//       const fcmToken2 = await messaging().getToken();
//       if (fcmToken) {
//         console.log(fcmToken2, 'newfcmToken');
//         await AsyncStorage.setItem('fcmToken', fcmToken2);
//       }
//     } catch (error) {
//       console.log('error');
//     }
//   }
// }

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('Se recibio una notificacion', remoteMessage);
  });
};
