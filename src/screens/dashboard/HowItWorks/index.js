import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React , { useEffect } from 'react';
import BackHeader from '../../../components/BackHeader';
import {moderateScale} from '../../../utils/Metrics';
import {COLORS} from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import * as AppActions from '../../../redux/actions';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';


export default function AboutUs() {


  const {navigate, goBack} = useNavigation();


  const dispatch = useDispatch();
  

  const token = useSelector((state) => state.authReducer.token);
  const how_it_works = useSelector((state) => state.dashReducer.how_it_works);
  console.log('HIW---->', how_it_works);



  useEffect(() => {
    dispatch(AppActions.how_it_works(token));
  }, [dispatch, token]);



  // const urlAsString = JSON.stringify(about_us?.url);
  console.log('URL--:', how_it_works?.url);



  return (
    <View style={{flex: 1}}>
      {/* Custom header with a back button */}
     <BackHeader />

     {/* WebView */}

 
{/* WebView */}

 

<View style={{flex: 0.97}}>

<WebView

  source={{uri: how_it_works?.url}} // Replace with your desired URL

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
