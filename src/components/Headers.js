import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {COLORS, IMAGES} from '../constants';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';
import Profile from './Profile';
import {useSelector} from 'react-redux';
const Headers = props => {
  const {onPress} = props;
  const {openDrawer, navigate} = useNavigation();
  const userData = useSelector(state => state.dashReducer.my_profile?.docs);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => openDrawer()}>
        <Image source={IMAGES.DRAWER} />
      </Pressable>
      <Image style={styles.logo} source={IMAGES.LOGO} />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Pressable
          style={styles.notifications}
          onPress={() => {
            navigate('Notification');
          }}>
          <Image source={IMAGES.BELL} style={styles.notificationImageStyle} />
        </Pressable>
        <Pressable>
          <Profile
            image={userData?.image}
            onPress={() => navigate('UserProfile')}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(15),
    backgroundColor: COLORS.WHITE,
    height: verticalScale(70),
  },
  logo: {
    height: moderateScale(61),
    width: moderateScale(77),
    marginLeft: moderateScale(30),
    position: 'absolute',
    right: moderateScale(180),
  },
  notifications: {
    width: horizontalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: horizontalScale(26),
  },
  notificationImageStyle: {
    height: moderateScale(35),
    width: moderateScale(25),
  },
});
