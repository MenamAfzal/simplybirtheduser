import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Invitation from '../screens/dashboard/Invitations';
import HomeVisit from '../screens/dashboard/HomeVisit';
import AboutUs from '../screens/dashboard/AboutUs';
import TermsAndConditions from '../screens/dashboard/TermsAndConditions';
import HowItWorks from '../screens/dashboard/HowItWorks';
import DashboardNavigator from './DashboardNavigator';
import FAQs from '../screens/dashboard/FAQs';
import CustomDrawer from '../components/CustomDrawer';
import {IMAGES} from '../constants';
import Home from '../screens/dashboard/Home';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerStyle: {
          width: '100%',
        },
      }}
      initialRouteName='Home'
      >
      <Drawer.Screen name="Home" component={DashboardNavigator} />
      {/* <Drawer.Screen name="Home" component={Home} /> */}
      {/* <Drawer.Screen name="Invitation" component={Invitation} /> */}
      <Drawer.Screen name="AboutUs" component={AboutUs} />
      <Drawer.Screen name="FAQs" component={FAQs} />
      <Drawer.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Drawer.Screen name="HowItWorks" component={HowItWorks} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;

const styles = StyleSheet.create({});
