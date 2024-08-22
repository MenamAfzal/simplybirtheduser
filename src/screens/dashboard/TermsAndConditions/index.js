import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import BackHeader from '../../../components/BackHeader';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../redux/actions';
import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {generateStyledHtml} from '../../../utils/HtmlHelper';

export default function TermsAndConditions() {
  const dispatch = useDispatch();
  const {navigate, goBack} = useNavigation();

  const token = useSelector(state => state.authReducer.token);
  const terms_condition = useSelector(
    state => state.dashReducer.terms_condition,
  );
  console.log('T&C---->', terms_condition);

  useEffect(() => {
    dispatch(AppActions.terms_condition(token));
  }, [dispatch, token]);

  return (
    <View style={{flex: 1}}>
      <BackHeader title={'Terms & Conditions'} />

      {terms_condition?.description && (
        <WebView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}
          source={{
            html: generateStyledHtml(terms_condition?.description),
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
  backButton: {
    color: 'white', // You can customize the text color
    fontSize: 16,
  },
});
