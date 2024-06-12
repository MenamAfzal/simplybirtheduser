import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useNavigation} from '@react-navigation/native';

export async function RequestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await getFcmToken();
    }
  } catch (error) {
    console.log(error, 'from firebase config');
  }
}

const getFcmToken = async () => {
  try {
    let FcmToken = await AsyncStorage.getItem('FcmToken');
    console.log('FcmToken from AsyncStorage:', FcmToken);

    if (!FcmToken) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('Newly generated FcmToken:', fcmToken);
        await AsyncStorage.setItem('FcmToken', fcmToken);
      }
    }
  } catch (error) {
    console.log('Error fetching/generating FCM Token:', error);
  }

  PushNotification.createChannel(
    {
      channelId: 'com.simplybirtheduser', // (required)
      channelName: 'com.simplybirtheduser', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      playSound: true,
      priority: 'high',
    },

    created => console.log('***********CHANNEL_CREATED************', created),

    // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

export const ForegroundNotificationHandler = navigation => {
  messaging().onMessage(message => {
    // Handle notification when the app is in the foreground
    console.log('Foreground motification:', message);
    console.log('call picked');

    if (message?.data?.type == 'call') {
      navigation.reset({
        index: 0, // Index of the screen to reset to (0 for the first screen)
        routes: [{name: 'IncomingCallScreen', params: {param: message}}],
      });
    } else {
      PushNotification.localNotification({
        channelId: 'com.simplybirtheduser',
        title: message.notification.title,
        message: message.notification.body,
        playSound: true,
        soundName: 'default',
        priority: 'high',
      });
    }
  });

  //For background state notification on open handler
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Background notification openedd:', remoteMessage);
    // Perform any desired action based on the initial notification
    if (remoteMessage?.data?.type == 'call') {
      navigation.reset({
        index: 0, // Index of the screen to reset to (0 for the first screen)
        routes: [{name: 'IncomingCallScreen', params: {param: remoteMessage}}],
      });
    }
  });

  setTimeout(async () => {
    try {
      // Get the initial notification
      const initialNotification = await messaging().getInitialNotification();
  
      // Simulate a delay of 9 seconds before processing the notification
      await new Promise(resolve => setTimeout(resolve, 9000));
  
      // Retrieve the notification data from AsyncStorage
      const storedNotification = JSON.parse(
        await AsyncStorage.getItem('killNotification')
      );
  
      console.log(storedNotification, 'stored notification from AsyncStorage');
  
      // Use the stored notification if available, otherwise use the initial notification
      const remoteMessage = storedNotification || initialNotification;
  
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification
        );
        console.log('Initial notification:', remoteMessage.notification);
  
        let currentTime = Date.now() - 60000;
  
        console.log('currentTime', currentTime);
  
        // Perform any desired action based on the initial notification
        if (
          remoteMessage?.data?.type == 'call' &&
          remoteMessage?.sentTime > currentTime
        ) {
          navigation.navigate('IncomingCallScreen', {
            param: remoteMessage,
          });
  
          // Clear the stored notification after processing
          await AsyncStorage.setItem('killNotification', JSON.stringify(null));
        }
      }
    } catch (error) {
      console.error('Error handling initial notification:', error);
    }
  }, 2300);
  
};
