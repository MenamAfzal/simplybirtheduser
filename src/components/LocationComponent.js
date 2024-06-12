import React, {useEffect, useState} from 'react';
import {Text, View, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, check, request} from 'react-native-permissions';

const requestLocationPermission = async () => {
  try {
    let granted = null;

    if (Platform.OS === 'android') {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

        {
          title: 'Location Permission',

          message: 'App needs access to your location',

          buttonNeutral: 'Ask Me Later',

          buttonNegative: 'Cancel',

          buttonPositive: 'OK',
        },
      );
    } else if (Platform.OS === 'ios') {
      const permissionStatus = await check(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );

      if (permissionStatus === 'granted') {
        granted = PermissionsAndroid.RESULTS.GRANTED;
      } else {
        granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }
    }

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission denied');

      // Get current location

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;

          console.log(latitude, longitude, 'adsjsjdi');

          setCurrentLocation({latitude, longitude});
        },

        error => {
          console.log(error, 'jkdhfsjkh');
        },

        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err, 'dfgdfg');
  }
};
