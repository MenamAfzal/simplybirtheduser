import {Image, Pressable, Text, View} from 'react-native';
import React from 'react';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import Profile from '../../../components/Profile';
import {horizontalScale, moderateScale} from '../../../utils/Metrics';
import styles from '../../dashboard/styles';

export default function RecentChats({navigation}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: moderateScale(25),
          borderBottomWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          padding: 10,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image source={IMAGES.BACK_ARROW} />
        </Pressable>
        <View>
          <Profile height={40} width={40} />
        </View>
        <Text
          style={{
            fontSize: moderateScale(22),
            fontFamily: FONTS.w500,
            color: COLORS.BLACK,
          }}>
          Willie Foster
        </Text>
      </View>
    </View>
  );
}
