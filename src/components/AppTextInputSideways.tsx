import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ImageSourcePropType,
  Pressable,
} from 'react-native';
import {COLORS, FONTS} from '../constants';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props extends TextInputProps {
  title: string;
  rightImage?: ImageSourcePropType;
  button?: () => void;
  buttonText: string;
  onPress?: () => void;
}

export default function AppTextInputSideways(props: Props) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          marginVertical: verticalScale(10),
          alignItems: 'center',
        },
      ]}>
      <Text
        style={{flex: 1, fontSize: moderateScale(20), fontFamily: FONTS.w400}}>
        {props.title}
      </Text>
      <Pressable
        onPress={props.onPress}
        style={{
          flexDirection: 'row',
          minHeight: verticalScale(45),
          flex: 2,
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#0000004F',
        }}>
        <TextInput
          placeholderTextColor={'#37354166'}
          style={{
            marginTop: verticalScale(5),
            fontSize: moderateScale(18),
            flex: 1,
            fontFamily: FONTS.w400,
            color: COLORS.BLACK,
          }}
          {...props}
        />
        {props.button && (
          <TouchableOpacity style={styles.btnStyle} onPress={props.button}>
            <Text style={styles.btnText}>{props.buttonText}</Text>
          </TouchableOpacity>
        )}
        {props.rightImage && (
          <Image style={{margin: 10}} source={props.rightImage} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btnStyle: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  btnText: {
    color: COLORS.PRIMARY,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
