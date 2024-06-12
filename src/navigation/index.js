import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, SafeAreaView, View, StatusBar} from 'react-native';
import AuthNavigator from './AuthNavigator';
import DashboardNavigator from './DashboardNavigator';
import DashboardStackNavigatior from './DashboardStackNavigatior';
import DrawerNavigator from './DrawerNavigator';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

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

const styles = StyleSheet.create({});

export default RootNavigator;
