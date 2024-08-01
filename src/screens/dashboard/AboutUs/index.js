import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackHeader from '../../../components/BackHeader';
import {moderateScale} from '../../../utils/Metrics';
import {COLORS} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../redux/actions';
import authReducer from '../../../redux/reducers/auth/index';
import {about_us} from '../../../redux/actions/dash/index';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import WebView from 'react-native-webview';

export default function AboutUs() {
  const {navigate, goBack} = useNavigation();
  const [isLoading, setIsLoading] = useState(true); // Initially set loading to true

  const dispatch = useDispatch();

  const token = useSelector(state => state.authReducer.token);
  const about_us = useSelector(state => state.dashReducer.about_us);
  console.log('about-us---->', about_us);

  useEffect(() => {
    dispatch(AppActions.about_us(token));

    // Simulate a 3-second loading delay
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); // After 3 seconds, set loading to false
    }, 8000);

    return () => {
      // Clear the timeout if the component unmounts before the 3 seconds
      clearTimeout(loadingTimeout);
    };
  }, [dispatch, token]);


  
  // const urlAsString = JSON.stringify(about_us?.url);
  console.log('URL--:', about_us?.url);

  return (
    <View style={{flex: 1}}>
      {/* Custom header with a back button */}
      <View>
        <BackHeader />
      </View>

      <View style={{flex: 0.97}}>
        <WebView
          source={{uri: about_us?.url}} // Replace with your desired URL
          style={{flex: 1}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 0.03,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'grey', // You can customize the header background color
  },
  backButton: {
    color: 'white', // You can customize the text color
    fontSize: 16,
  },
});
