import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../constants';
import {moderateScale} from '../utils/Metrics';
import * as AppActions from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

export default ResendOtpButton = props => {
  const {type} = props;
  const [resendEnabled, setResendEnabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);

  useEffect(() => {
    let timer;
    if (resendEnabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [resendEnabled, countdown]);

  const handleresendOtp = () => {
    // Logic to resend OTP
    dispatch(AppActions.resendOtp(token, type));

    // Enable the resend button and set the countdown
    setResendEnabled(true);
    setCountdown(30);
  };

  return (
    <View>
      {resendEnabled && countdown > 0 ? (
        <Text style={styles.disabledResend}>Resend OTP({countdown})</Text>
      ) : (
        <TouchableOpacity onPress={handleresendOtp}>
          <Text style={styles.enabledResend}>Resend OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  disabledResend: {
    opacity: 0.5,
    color: COLORS.PRIMARY,
    fontFamily: FONTS.w600,
    fontSize: moderateScale(20),
  },
  enabledResend: {
    color: COLORS.PRIMARY,
    fontFamily: FONTS.w600,
    fontSize: moderateScale(20),
  },
});
