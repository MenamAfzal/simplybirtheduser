import CheckBox from 'react-native-check-box';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import {FONTS} from '../constants';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';

export default function AppRadio(props) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return props.items.map(item => (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: verticalScale(20),
      }}>
      <CheckBox
        isChecked={toggleCheckBox == item}
        checkedImage={
          <Image source={require('../assets/images/checked_circle.png')} />
        }
        unCheckedImage={
          <Image source={require('../assets/images/unchecked_circle.png')} />
        }
        // onClick={() => {
        //   setToggleCheckBox(item);
        // }}
        onClick={() => {
          props.onChange(item), setToggleCheckBox(item);
        }}
      />
      <Text
        style={{
          color: '#37354199',
          fontFamily: FONTS.w300,
          fontSize: moderateScale(18),
          marginStart: horizontalScale(12),
        }}>
        {item}
      </Text>
    </View>
  ));
}

const styles = StyleSheet.create({});
