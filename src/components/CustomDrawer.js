import React from 'react';
import {Image, StyleSheet, View, Pressable} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS, IMAGES} from '../constants';
import {moderateScale} from '../utils/Metrics';
import * as AppActions from '../redux/actions';
import DrawerProps from './drawerProps';
import Profile from './Profile';

const CustomDrawer = ({navigation}) => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.dashReducer?.my_profile);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 0.2, backgroundColor: COLORS.PRIMARY}}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={{alignItems: 'flex-end'}}>
          <Image style={styles.crossImage} source={IMAGES.CROSS} />
        </Pressable>
        <View style={styles.profile}>
          <Profile
            image={profile?.docs?.image}
            height={moderateScale(130)}
            width={moderateScale(130)}
          />
        </View>
      </View>
      <View style={{flex: 0.8, ...styles.description}}>
        <DrawerProps
          icon={IMAGES.DRAWERICON_HOME}
          title="Home"
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          }}
        />
        {/* <DrawerProps
          icon={IMAGES.DRAWERICON_INVITATIONS}
          title="Invitations"
          onPress={() => navigation.navigate('Invitation')}
        /> */}
        {/* <DrawerProps
          icon={IMAGES.DRAWERICON_VISIT}
          title="Book home visit"
          onPress={() => navigation.navigate('HomeVisit')}
        /> */}
        <DrawerProps
          icon={IMAGES.DRAWERICON_ABOUTUS}
          title="About us"
          onPress={() => navigation.navigate('AboutUs')}
        />
        <DrawerProps
          icon={IMAGES.DRAWERICON_FAQ}
          title="FAQs"
          onPress={() => navigation.navigate('FAQs')}
        />
        <DrawerProps
          icon={IMAGES.DRAWERICON_TNC}
          title="Terms & Conditions"
          onPress={() => navigation.navigate('TermsAndConditions')}
        />
        <DrawerProps
          icon={IMAGES.DRAWERICON_HOWITWORKS}
          title="How It Works"
          onPress={() => navigation.navigate('HowItWorks')}
        />
        <DrawerProps
          icon={IMAGES.DRAWERICON_LOGOUT}
          title="Logout"
          onPress={() => dispatch(AppActions.logout())}
        />
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  crossImage: {
    top: moderateScale(20),
    right: moderateScale(20),
  },
  profile: {
    position: 'relative',
    zIndex: -100,
    top: moderateScale(50),
    padding: 20,
  },
  description: {
    top: moderateScale(80),
  },
});
