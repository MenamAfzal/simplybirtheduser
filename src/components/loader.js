import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../constants';

const Loading = () => {
  const showLoader = useSelector(state => state.authReducer.isLoading);
  /**Initialize state variables */
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(showLoader);
  }, [showLoader]);
  return isLoading ? (
    <View style={styles.mainContainer}>
      <View style={styles.innerView}>
        <ActivityIndicator color={COLORS.PRIMARY} size="large" />
      </View>
    </View>
  ) : (
    <></>
  );
};

export default Loading;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: 'absolute',
    zIndex: 110,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    elevation: 1,
  },
  innerView: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
