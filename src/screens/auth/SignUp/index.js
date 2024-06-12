import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import {IMAGES, FONTS, COLORS} from '../../../constants';
import {
  emailValidation,
  letterValidation,
  numberValidation,
  passwordValidation,
  phoneValidation,
} from '../../../utils/validation';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import * as AppActions from '../../../redux/actions';
import BackHeader from '../../../components/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({navigation}) {
  const {goBack, navigate} = useNavigation();
  const [fcmToken, setFcmToken] = useState(null);

  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  (async () => {
    const Token = await AsyncStorage.getItem('FcmToken');
    console.log('fcmToken--->>>', Token);
    setFcmToken(Token);
  })();

  function onSubmit() {
    if (!fname) {
      Alert.alert('Please enter first name');
    } else if (!letterValidation(fname)) {
      Alert.alert('Name should contain letters only');
    } else if (!lname) {
      Alert.alert('Please enter last name');
    } else if (!letterValidation(lname)) {
      Alert.alert('Name should contain letters only');
    } else if (!email) {
      Alert.alert('Please enter your email');
    } else if (!emailValidation(email)) {
      Alert.alert('Please enter valid email');
    } else if (!password) {
      Alert.alert('Please enter your password');
    } else if (!passwordValidation(password)) {
      Alert.alert(
        'requires:8 characters, atleast 1 uppercase, 1 number and 1 special charcter',
      );
    } else if (!phone) {
      Alert.alert('Please enter your phone number');
    } else if (!phoneValidation(phone)) {
      Alert.alert('Please enter valid phone number');
    } else {
      // Params to be passed through the API
      let params = {
        firstName: fname,
        lastName: lname,
        email: email,
        password: password,
        phone: phone,
        firebaseToken: fcmToken,
        role: 2,
      };

      //API call
      dispatch(AppActions.signUp(params, navigation));
    }
  }

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
      <BackHeader />

      <Image
        style={styles.backgroundImage}
        source={require('../../../assets/images/butterflyback.png')}
      />
      <Image
        style={styles.logo}
        source={require('../../../assets/images/logo.png')}
      />

      <Text style={styles.header}>Signup</Text>

      <AppTextInput
        placeholder="Enter your first name"
        title="First Name"
        onChangeText={text => {
          text = text.trim();
          setFName(text);
        }}
      />
      <AppTextInput
        placeholder="Enter your last name"
        title="Last Name"
        onChangeText={text => {
          text = text.trim();
          setLName(text);
        }}
      />
      <AppTextInput
        placeholder="Enter your email"
        title="Email"
        autoCapitalize={'none'}
        onChangeText={text => {
          text = text.trim();
          setEmail(text);
        }}
      />
      <AppTextInput
        placeholder="Enter your phone number"
        title="Phone Number"
        keyboardType="numeric"
        maxLength={10}
        onChangeText={text => setPhone(text)}
      />
      <AppTextInput
        title="Password"
        secureTextEntry
        placeholder="Enter your password"
        autoCapitalize={'none'}
        value={password}
        onChangeText={text => {
          text = text.trim();
          setPassword(text);
        }}
      />

      <AppButton label="Sign Up" onPress={onSubmit} />

      {/* <View style={styles.dividerCont}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or signup using</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialLogin}>
        <TouchableOpacity onPress={() => alert('Google login pending')}>
          <Image source={IMAGES.GOOGLE} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Facebook login pending')}>
          <Image source={IMAGES.FACEBOOK} />
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <TouchableOpacity onPress={() => alert('Apple login pending')}>
            <Image source={IMAGES.APPLE} />
          </TouchableOpacity>
        )}
      </View> */}

      <Text style={{alignSelf: 'center'}} onPress={() => goBack()}>
        Already a member? <Text style={{color: '#D87777'}}>Login</Text>
      </Text>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: horizontalScale(15),
  },
  logo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: verticalScale(95),
    width: horizontalScale(120),
  },
  backgroundImage: {
    position: 'absolute',
    height: horizontalScale(348),
    width: verticalScale(392),
    alignSelf: 'center',
    bottom: 0,
    resizeMode: 'contain',
  },
  header: {
    fontSize: moderateScale(40),
    marginBottom: verticalScale(5),
    fontFamily: FONTS.w600,
  },
  forgotCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(10),
    alignItems: 'center',
  },
  profileSetupSec: {flexDirection: 'row', marginTop: verticalScale(15)},
  profileSetupLabel: {
    fontFamily: FONTS.w400,
    flex: 1,
    fontSize: moderateScale(20),
  },
  profileSetupValue: {flex: 2},
  subtitle: {fontFamily: FONTS.w400, fontSize: moderateScale(22)},
  rememberMe: {
    fontFamily: FONTS.w400,
    fontSize: moderateScale(18),
    marginStart: horizontalScale(10),
  },
  forgotPass: {
    fontFamily: FONTS.w500,
    color: '#D87777',
    fontSize: moderateScale(18),
  },
  dividerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(5),
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#00000033',
  },
  dividerText: {
    fontFamily: FONTS.w300,
    flex: 1,
    color: '#373541CC',
    textAlign: 'center',
    fontSize: moderateScale(18),
  },
  socialLogin: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: verticalScale(20),
  },
});
