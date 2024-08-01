import React from 'react';
import {Image, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Headers from '../components/Headers';
import AllChats from '../screens/dashboard/AllChats';
import CareTeam from '../screens/dashboard/CareTeam';
import Home from '../screens/dashboard/Home';
import Learn from '../screens/dashboard/Learn';
import Meet from '../screens/dashboard/Meet';
import {COLORS, IMAGES} from '../constants';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';

const Tab = createBottomTabNavigator();

function DashboardNavigator() {
  return (
    <View style={{flex: 1}}>
      <Headers />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarActiveBackgroundColor: COLORS.PRIMARY,
          tabBarShowLabel: false,
          tabBarItemStyle: {
            borderRadius: 200,
            marginHorizontal: 12,
            marginVertical: 8,
          },
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'white',
            height: verticalScale(70),
            width: horizontalScale(400),
            marginLeft: moderateScale(15),
            bottom: moderateScale(4),
            borderRadius: moderateScale(50),
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.8,
            shadowRadius: moderateScale(5),
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'CareTeam') {
              iconName = focused
                ? IMAGES.CARETEAMICONFOCUSED
                : IMAGES.CARETEAMICONUNFOCUSED;
            } else if (route.name === 'Meet') {
              iconName = focused
                ? IMAGES.MEETICONFOCUSED
                : IMAGES.MEETICONUNFOCUSED;
            } else if (route.name === 'Home') {
              iconName = focused
                ? IMAGES.HOMEICONFOCUSED
                : IMAGES.HOMEICONUNFOCUSED;
            } else if (route.name === 'AllChats') {
              iconName = focused
                ? IMAGES.CHATICONFOCUSED
                : IMAGES.CHATICONUNFOCUSED;
            } else if (route.name === 'Learn') {
              iconName = focused
                ? IMAGES.LEARNICONFOCUSED
                : IMAGES.LEARNICONUNFOCUSED;
            }

            return <Image source={iconName} resizeMode="contain" />;
          },
        })}>
        <Tab.Screen name="CareTeam" component={CareTeam} />
        <Tab.Screen name="Meet" component={Meet} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="AllChats" component={AllChats} />
        <Tab.Screen name="Learn" component={Learn} />
      </Tab.Navigator>
    </View>
  );
}
export default DashboardNavigator;
