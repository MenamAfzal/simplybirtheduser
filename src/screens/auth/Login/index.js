import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import CheckBox from 'react-native-check-box';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import Background from '../../../components/Background';
import {IMAGES} from '../../../constants';
import styles from '../styles';
import {
  letterValidation,
  emailValidation,
  passwordValidation,
} from '../../../utils/validation';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../redux/actions';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import appleAuth, {

} from '@invertase/react-native-apple-authentication';
import {
  requestCameraPermission,
  requestGalleryPermission,
  requestLocationPermission,
  requestMicrophonePermission,
  requestNotificationPermission,
} from '../../../utils/permissions';
import {RequestUserPermission} from '../../../utils/PushNotification';

export default function Login({navigation}) {
  const {navigate, reset} = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [remember, setRemember] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [currentLocation, setCurrentLocation] = useState();
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        await RequestUserPermission();
        await requestNotificationPermission();
        await requestCameraPermission();
        await requestMicrophonePermission();
        await requestGalleryPermission();
        await requestLocationPermission();
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    };

    requestPermissions(); //this will be called just once when component mount
  }, []);

  const invalidPass =
    'Invalid password. Password must contain\nminimum 8 characters with atleast 1 uppercase letter, 1 number and 1 special character (#,?,!,@,$,%,^,&,*,-)';

  /* Set data in case of remember me */
  useEffect(() => {
    const fetchFcmToken = async () => {
      try {
        const Token = await AsyncStorage.getItem('FcmToken');
        console.log('fcmToken--->>>', Token);
        setFcmToken(Token);
      } catch (error) {
        console.error('Error fetching FcmToken:', error);
      }
    };

    fetchFcmToken();
  }, []);

  useEffect(() => {
    const fetchUserCred = async () => {
      try {
        let userCred = JSON.parse(await AsyncStorage.getItem('userCred'));
        console.log('usercred', userCred);
        if (userCred?.remember) {
          setEmail(userCred?.email);
          setPassword(userCred?.password);
          setRemember(userCred?.remember);
          setToggleCheckBox(userCred?.remember);
        } else {
          setEmail(null);
          setPassword(null);
          setRemember(false);
          setToggleCheckBox(false);
        }
      } catch (error) {
        console.error('Error fetching user credentials:', error);
      }
    };

    fetchUserCred();
  }, []); 

  /* Get the location of the device */
  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
      },
      error => {
        console.log('Error getting location:', error);
        if (error.code === 3) {
          Alert.alert('Location request timed out');
        } else {
          Alert.alert(error?.message);
        }
      },
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 10000},
    );
  };

  /*  Check inputs and send the login api call if all cases pass */
  const handleLogin = () => {
    if (email == '') {
      Alert.alert('Please enter your email');
    }
    // else if (!emailValidation(email)) {
    //   Alert.alert('Please enter a valid email');
    // } else if (!password) {
    //   Alert.alert('Please enter your password');
    // } else if (!passwordValidation(password)) {
    //   Alert.alert('Incorrect password');
    // }
    else if (remember) {
      // Refresh location before passing to the API
      getLocation();
      // Params to be passed through the api
      // let params = {
      //   email: email,
      //   password: password,
      //   role: 2,
      //   location: currentLocation,
      //   firebaseToken: fcmToken,
      // };
      let params = {
        email: 'harrisdonna60@yahoo.com',
        password: 'Pupanunu@1',
        role: 2,
        location: {
          longitude: '12.345678',
          latitude: '98.765432',
        },
        firebaseToken: fcmToken,
      };

      let userCred = {
        remember: remember,
        email: email,
        password: password,
      };
      // Handling remember user functionality
      AsyncStorage.setItem('userCred', JSON.stringify(userCred));

      // API call
      dispatch(AppActions.login(params, navigation));
    } else {
      // Refresh location before passing to the API
      getLocation();

      // Params to be passed through the api
      // let params = {
      //   email: email,
      //   password: password,
      //   role: 2,
      //   location: currentLocation,
      //   firebaseToken: fcmToken,
      // };

      let params = {
        email: 'harrisdonna60@yahoo.com',
        password: 'Pupanunu@1',
        role: 2,
        location: {
          longitude: '12.345678',
          latitude: '98.765432',
        },
        firebaseToken: fcmToken,
      };
      // Handling remember user functionality
      let userCred = {
        remember: remember,
      };
      // Handling remember user functionality
      AsyncStorage.setItem('userCred', JSON.stringify(userCred));

      // API call
      dispatch(AppActions.login(params, navigation));
    }
  };

  /* Trim and set the input to lower case before saving */
  const handleEmailInput = data => {
    data = data.trim();
    data = data.toLowerCase();
    setEmail(data);
  };


  return (
    <View style={styles.container}>
      <Background />
      <Image style={styles.logo} source={IMAGES.LOGO} />

      <Text style={styles.header}>Login</Text>

      <AppTextInput
        title="Email"
        placeholder="Enter your email id"
        autoCapitalize={'none'}
        value={email}
        onChangeText={text => handleEmailInput(text)}
      />
      <AppTextInput
        title="Password"
        secureTextEntry
        placeholder="Enter your password"
        autoCapitalize={'none'}
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <View style={styles.forgotCont}>
        <Pressable
          onPress={() => {
            setToggleCheckBox(!toggleCheckBox);
            setRemember(!remember);
          }}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            isChecked={toggleCheckBox}
            checkedImage={<Image source={IMAGES.CHECKED_SQUARE} />}
            unCheckedImage={<Image source={IMAGES.UNCHECKED_SQUARE} />}
            onClick={() => {
              setToggleCheckBox(!toggleCheckBox);
              setRemember(!remember);
            }}
          />
          <Text style={styles.rememberMe}>Remember me</Text>
        </Pressable>
        <Text
          onPress={() => navigate('ForgotPassword')}
          style={styles.forgotPass}>
          Forgot Password?
        </Text>
      </View>

      <AppButton onPress={() => handleLogin()} label="Login" />
      <View style={{flex: 0.3}}>
        <Text style={{alignSelf: 'center'}} onPress={() => navigate('SignUp')}>
          New member? <Text style={{color: '#D87777'}}>Signup</Text>
        </Text>
      </View>
    </View>
  );
}