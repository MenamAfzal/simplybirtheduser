import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import styles from '../styles';
import {passwordValidation} from '../../../utils/validation';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../redux/actions';
import BackHeader from '../../../components/BackHeader';

export default function ResetPassword({navigation}) {
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();

  const dispatch = useDispatch();

  const token = useSelector(state => state.authReducer.token);

  const handleReset = () => {
    if (!passwordValidation(password)) {
      Alert.alert('Invalid password');
    } else if (password !== rePassword) {
      Alert.alert('Oops!', 'Your passwords dont match');
    } else {
      let params = {password: password};
      dispatch(AppActions.resetPassword(params, navigation, token));
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

      <Text style={styles.header}>Reset Password</Text>

      <AppTextInput
        placeholder="Enter new password"
        title="New Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <AppTextInput
        placeholder="Enter your password again"
        title="Confirm Password"
        secureTextEntry
        onChangeText={text => setRePassword(text)}
      />
      <AppButton label="Reset" onPress={() => handleReset()} />
    </View>
  );
}
