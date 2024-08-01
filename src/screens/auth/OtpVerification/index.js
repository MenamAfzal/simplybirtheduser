import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../../components/AppButton';
import ResendOtpButton from '../../../components/ResendOtpButton';
import * as AppActions from '../../../redux/actions';
import {moderateScale, verticalScale} from '../../../utils/Metrics';
import styles from '../styles';

export default function EmailOtp() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);

  const handleVerify = () => {
    let params = {otp: otp};
    let type = 'Email';
    dispatch(AppActions.otpVerify(params, navigation, token, type));
  };
  return (
    <View style={{...styles.container}}>
      <Image
        style={styles.backgroundImage}
        source={require('../../../assets/images/butterflyback.png')}
      />

      <Image
        style={styles.logo}
        source={require('../../../assets/images/logo.png')}
      />

      <Text style={styles.header}>Email Verification</Text>
      <Text style={styles.subtitle}>
        We’ve sent you an OTP on your email address, please check and verify
        your account.
      </Text>
      <OtpInputs
        handleChange={setOtp}
        numberOfInputs={6}
        style={{flexDirection: 'row', marginVertical: verticalScale(20)}}
        inputContainerStyles={styles.otpStyle}
        inputStyles={{fontSize: moderateScale(24), textAlign: 'center'}}
      />
      <ResendOtpButton type="Email" />
      <AppButton label="Verify" onPress={() => handleVerify()} />
    </View>
  );
}
