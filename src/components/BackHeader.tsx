import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS, IMAGES} from '../constants';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';

interface Props {
  title: string;
}
export default function BackHeader(props: Props) {
  const {goBack} = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backArrowStyle} onPress={() => goBack()}>
        <Image source={IMAGES.BACK_ARROW} style={styles.backArrowImg} />
      </TouchableOpacity>

      <Text style={styles.titleText}>{props.title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: moderateScale(20),
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(10),
  },
  backArrowStyle: {
    width: horizontalScale(25),
    height: verticalScale(25),
    justifyContent: 'center',
  },
  backArrowImg: {
    width: horizontalScale(12),
    height: verticalScale(20),
  },
  titleText: {
    fontSize: moderateScale(26),
    fontFamily: FONTS.w600,
    color: COLORS.BLACK,
    textTransform: 'capitalize',
  },
});
