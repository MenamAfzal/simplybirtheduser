import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import BackHeader from '../../../components/BackHeader';
import {COLORS} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../redux/actions';
import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {generateStyledHtml} from '../../../utils/HtmlHelper';

export default function AboutUs() {
  const dispatch = useDispatch();
  const {navigate, goBack} = useNavigation();

  const token = useSelector(state => state.authReducer.token);
  const about_us = useSelector(state => state.dashReducer.about_us);
  console.log('about-us---->', about_us);

  useEffect(() => {
    dispatch(AppActions.about_us(token));
  }, [dispatch, token]);

  return (
    <View style={{flex: 1}}>
      <BackHeader title={'About Us'} />

      {about_us?.description && (
        <WebView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          source={{
            html: generateStyledHtml(about_us?.description),
          }}
        />
      )}
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
  title: {
    backgroundColor: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  backButton: {
    color: 'white', // You can customize the text color
    fontSize: 16,
  },
});
