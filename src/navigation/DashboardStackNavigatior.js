import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CareGiverAppointment from '../screens/dashboard/CareGiverAppointment';
import Notifications from '../screens/dashboard/Notifications';
import Payment from '../screens/dashboard/Payment';
import EditProfile from '../screens/dashboard/Profile/EditProfile';
import SubscriptionPlan from '../screens/dashboard/SubscriptionPlans';
import OpenProfile from '../screens/dashboard/Profile/OpenProfile';
import CaregiverProfile from '../screens/dashboard/Profile/CaregiverProfile';
import ChatScreen from '../screens/dashboard/AllChats/chatScreen';
import DrawerNavigator from './DrawerNavigator';
import VideoUI from '../components/VideoUI';
import Mindful from '../screens/dashboard/Mindful';
import IncomingCallScreen from '../utils/IncomingCallScreen';
import UserProfile from '../screens/dashboard/Profile/UserProfile';
import RenderLearn from '../screens/dashboard/Learn/Learn';
import Loading from '../components/loader';

const Stack = createNativeStackNavigator();
function DashboardStackNavigatior() {
  const [initialRoute, SetinitialRoute] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const isSubscribed = useSelector(
    state => state.authReducer?.loginData?.data?.isSubscribed,
  );

  useEffect(() => {
    const fetchData = async () => {
      const value = JSON.parse(await AsyncStorage.getItem('isSubscribed'));

      isSubscribed || value
        ? SetinitialRoute('Drawer')
        : SetinitialRoute('SubscriptionPlan');

      console.log('isSubscribedddddd', isSubscribed, value);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  console.log(initialRoute, 'initialRoute');

  if (!isLoading) {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={initialRoute}>
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen name="SubscriptionPlan" component={SubscriptionPlan} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Notification" component={Notifications} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="OpenProfile" component={OpenProfile} />
        <Stack.Screen name="CaregiverProfile" component={CaregiverProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="RenderLearn" component={RenderLearn} />
        <Stack.Screen
          name="CareGiverAppointment"
          component={CareGiverAppointment}
        />
        <Stack.Screen name="Mindful" component={Mindful} />
        <Stack.Screen name="VideoCall" component={VideoUI} />
        <Stack.Screen
          name="IncomingCallScreen"
          component={IncomingCallScreen}
        />
      </Stack.Navigator>
    );
  } else <Loading />;
}

export default DashboardStackNavigatior;
