import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const requestCameraPermission = async () => {
  if (Platform.OS === 'ios') {
    const result = await check(PERMISSIONS.IOS.CAMERA);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        return false;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        const newResult = await request(PERMISSIONS.IOS.CAMERA);
        console.log(newResult, 'camera result after request');
        return newResult === 'granted';
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        return false;
      case RESULTS.GRANTED:
        console.log('The permission is granted for camera');
        return true;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        return false;
      case RESULTS.DENIED_ONCE:
        console.log('The permission has been denied once, but requestable');
        return false;
      default:
        return false;
    }
  } else {
    const newResult = await request(PERMISSIONS.ANDROID.CAMERA);
    console.log(newResult, 'camera result after request');
    return newResult === 'granted';
  }
};

const requestGalleryPermission = async () => {
  if (Platform.OS === 'ios') {
    const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        return false;
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        const newResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        console.log(newResult, 'gallery result after request');
        return newResult === 'granted';
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        return false;
      case RESULTS.GRANTED:
        console.log('The permission is granted for the gallery');
        return true;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        return false;
      case RESULTS.DENIED_ONCE:
        console.log('The permission has been denied once, but requestable');
        return false;
      default:
        return false;
    }
  } else {
    const newResult = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    console.log(newResult, 'gallery result after request');
    return newResult === 'granted';
  }
};

const requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE); // Use appropriate iOS location permission type
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'Location permission is not available on this device/in this context',
        );
        return false;
      case RESULTS.DENIED:
        console.log(
          'Location permission has not been requested or is denied but requestable',
        );
        const newResult = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE); // Use appropriate iOS location permission type
        console.log('Location result after request:', newResult);
        return newResult === 'granted';
      case RESULTS.LIMITED:
        console.log(
          'Location permission is limited: some actions are possible',
        );
        return false;
      case RESULTS.GRANTED:
        console.log('Location permission is granted');
        return true;
      case RESULTS.BLOCKED:
        console.log(
          'Location permission is denied and not requestable anymore',
        );
        return false;
      case RESULTS.DENIED_ONCE:
        console.log(
          'Location permission has been denied once, but requestable',
        );
        return false;
      default:
        return false;
    }
  } else {
    const newResult = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); // Use appropriate Android location permission type
    console.log('Location result after request:', newResult);
    return newResult === 'granted';
  }
};

const requestMicrophonePermission = async () => {
  if (Platform.OS === 'ios') {
    await check(PERMISSIONS.IOS.MICROPHONE)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            request(PERMISSIONS.IOS.MICROPHONE).then(newResult => {
              console.log(newResult, 'Microphone result after request');
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted for microphone');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    await request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(newResult => {
      console.log(newResult, 'microphone result after request');
    });
  }
};

const requestCallLogPermission = async () => {
  if (Platform.OS === 'ios') {
    await check(PERMISSIONS.IOS.CONTACTS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            request(PERMISSIONS.IOS.MICROPHONE).then(newResult => {
              console.log(newResult, 'Microphone result after request');
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted for call log');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    await request(PERMISSIONS.ANDROID.READ_CALL_LOG).then(newResult => {
      console.log(newResult, 'call log result after request');
    });
  }
};

const requestCallPermission = async () => {
  if (Platform.OS === 'ios') {
    await check(PERMISSIONS.IOS.CONTACTS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            request(PERMISSIONS.IOS.MICROPHONE).then(newResult => {
              console.log(newResult, 'call result after request');
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted for call log');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    await request(PERMISSIONS.ANDROID.READ_PHONE_NUMBERS).then(newResult => {
      console.log(newResult, 'call result after request');
    });
    await request(PERMISSIONS.ANDROID.READ_PHONE_STATE).then(newResult => {
      console.log(newResult, 'call result after request');
    });
  }
};

const requestNotificationPermission = async () => {
  await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(newResult => {
    console.log(newResult, 'notification result after request');
  });
};

export {
  requestCameraPermission,
  requestNotificationPermission,
  requestMicrophonePermission,
  requestCallLogPermission,
  requestCallPermission,
  requestGalleryPermission,
  requestLocationPermission,
};
