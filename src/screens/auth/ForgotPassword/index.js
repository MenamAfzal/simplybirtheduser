import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import {emailValidation, phoneValidation} from '../../../utils/validation';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';
import {COLORS, FONTS} from '../../../constants';
import * as AppActions from '../../../redux/actions';
import {useDispatch} from 'react-redux';
import BackHeader from '../../../components/BackHeader';

export default function ForgotPassword({navigation}) {
  const {navigate, goBack} = useNavigation();
  const [fieldValue, setFieldValue] = useState();
  const dispatch = useDispatch();

  const handleSend = () => {
    if (!fieldValue) {
      Alert.alert('Please enter your email or phone number');
    } else if (!emailValidation(fieldValue)) {
      if (!phoneValidation(fieldValue)) {
        Alert.alert('Please enter a valid email or phone number');
      }
    } else {
      let params = {email: fieldValue};
      dispatch(AppActions.forgotPassword(params, navigation));
    }
  };

  return (
    <View style={styles.container}>
      <BackHeader />
      <Image
        style={styles.backgroundImage}
        source={require('../../../assets/images/butterflyback.png')}
      />

      <Image
        style={styles.logo}
        source={require('../../../assets/images/logo.png')}
      />

      <Text style={styles.header}>Forgot Password</Text>

      <AppTextInput
        placeholder="Enter email or phone number"
        title="Enter you email or phone number"
        autoCapitalize={'none'}
        onChangeText={text => setFieldValue(text)}
      />
      <AppButton label="Send OTP" onPress={() => handleSend()} />
    </View>
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
    marginTop: verticalScale(30),
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
    marginTop: verticalScale(20),
    fontFamily: FONTS.w600,
  },
});
