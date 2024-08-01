import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './AuthNavigator';
import DashboardStackNavigatior from './DashboardStackNavigatior';

function RootNavigator() {
  const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      <NavigationContainer>
        {isLoggedIn ? <DashboardStackNavigatior /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default RootNavigator;
