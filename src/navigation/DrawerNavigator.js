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

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerStyle: {width: '100%'},
      }}
      initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={DashboardNavigator} />
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
