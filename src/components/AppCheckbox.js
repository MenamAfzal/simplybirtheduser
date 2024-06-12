import CheckBox from 'react-native-check-box';
import React, {useEffect, useState} from 'react';
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

export default function AppCheckbox({
  items,
  onValueChanged,
  complications,
  setComplications,
  handleCheckboxChange,
}) {
  const [values, setValues] = useState([]);

  useEffect(() => {
    onValueChanged(values);
  }, [values]);

  function onChecked(item) {
    if (values.includes(item)) {
      setValues(arr => arr.filter(k => k != item));
    } else {
      setValues([item, ...values]);
    }
  }

  return items.map((complication, index) => (
    <Pressable
      style={{
        flexDirection: 'row',
        paddingBottom: verticalScale(20),
      }}>
      <CheckBox
        key={index}
        // style={{flex: 1, padding: 10}}
        onClick={() => handleCheckboxChange(complication, index)}
        isChecked={complications.includes(complication)}
        checkedImage={
          <Image source={require('../assets/images/checked_square.png')} />
        }
        unCheckedImage={
          <Image source={require('../assets/images/unchecked_square.png')} />
        }
      />
      <Text
        style={{
          color: '#37354199',
          fontFamily: FONTS.w300,
          fontSize: moderateScale(18),
          marginStart: horizontalScale(12),
        }}>
        {complication}
      </Text>
    </Pressable>
  ));
}

const styles = StyleSheet.create({});
