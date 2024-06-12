import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackHeader from '../../../components/BackHeader';
import {COLORS} from '../../../constants';
import {moderateScale} from '../../../utils/Metrics';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../redux/actions';
import { terms_condition } from '../../../redux/actions/dash/index';
import { useNavigation } from '@react-navigation/native';
import WebView from 'react-native-webview';

export default function TermsAndConditions() {

  const {navigate, goBack} = useNavigation();


  const dispatch = useDispatch();
  

  const token = useSelector((state) => state.authReducer.token);
  const terms_condition = useSelector((state) => state.dashReducer.terms_condition);
  console.log('T&C---->', terms_condition);



  useEffect(() => {
    dispatch(AppActions.terms_condition(token));
  }, [dispatch, token]);



  // const urlAsString = JSON.stringify(about_us?.url);
  console.log('URL--:', terms_condition?.url);



  return (
    <View style={{flex: 1}}>
      {/* Custom header with a back button */}
   
      <BackHeader />

     {/* WebView */}

 
{/* WebView */}

 

<View style={{flex: 0.97}}>

<WebView

  source={{uri: terms_condition?.url}} // Replace with your desired URL

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
