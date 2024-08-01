import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';
import {COLORS, IMAGES} from '../constants';

export default DateTimePickerInput = ({onPress, image, value, placeholder}) => {
  return (
    <Pressable style={styles.dateTimeTextInput} onPress={onPress}>
      <TextInput
        placeholder={placeholder}
        value={value}
        pointerEvents="none"
        editable={false}
        style={styles.textInputStyle}
      />

      <Image source={image} style={styles.dateTimeIcon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  dateTimeTextInput: {
    flexDirection: 'row',
    width: horizontalScale(185),
    height: verticalScale(50),
    justifyContent: 'space-between',
    backgroundColor: COLORS.TEXTBOX,
    paddingHorizontal: horizontalScale(10),
    alignItems: 'center',
    marginVertical: verticalScale(10),
    alignSelf: 'center',
  },
  dateTimeIcon: {
    height: moderateScale(19),
    width: moderateScale(19),
  },
  textInputStyle: {
    fontSize: moderateScale(18),
    flex: 1,
  },
});
