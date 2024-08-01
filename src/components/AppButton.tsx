import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewProps,
} from 'react-native';
import {COLORS, FONTS} from '../constants';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';

interface AppButtonProps {
  label: string;
  onPress?: () => void;
  height?: number;
  width?: number;
  color?: String;
  fontSize?: number;
}

export default function AppButton(props: AppButtonProps) {
  return (
    <TouchableOpacity
      style={{
        height: props.height ? props.height : moderateScale(50),
        width: props.width ? props.width : horizontalScale(400),
        backgroundColor: props.color ? props.color : COLORS.PRIMARY,
        ...styles.btn,
      }}
      onPress={props.onPress}>
      <Text
        style={{
          ...styles.btnTitle,
          fontSize: props.fontSize ? props.fontSize : moderateScale(22),
        }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginVertical: moderateScale(15),
    borderRadius: moderateScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  btnTitle: {
    color: 'white',
    fontFamily: FONTS.w700,
  },
});
