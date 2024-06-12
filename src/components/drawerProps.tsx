import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale, moderateScale} from '../utils/Metrics';
import {COLORS, FONTS} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
interface Props {
  title: string;
  onPress?: () => void;
}
export default function DrawerProps(props: Props) {
  return (
    <View style={styles.mainViewStyle}>
      <TouchableHighlight
        onPress={props.onPress}
        activeOpacity={0.6}
        underlayColor={COLORS.SHADOW}
        style={{borderRadius: 10}}>
        <View style={styles.pressableStyle}>
          <Image source={props.icon} style={styles.imageStyle} />
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  mainViewStyle: {
    marginLeft: moderateScale(5),
  },
  pressableStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: moderateScale(10),
  },
  imageStyle: {
    marginRight: moderateScale(15),
  },
  title: {
    fontFamily: FONTS.w400,
    fontSize: moderateScale(24),
    color: 'rgba(0, 0, 0, 1)',
    // marginBottom: moderateScale(20),
  },
});
