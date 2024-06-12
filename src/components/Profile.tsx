import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';
import {IMAGES} from '../constants';

interface Props {
  title: string;
  onPress: () => void;
  height?: number;
  width?: number;
  borderRadius?: number;
  image: null;
}
export default function Profile(props: Props) {
  return (
    <Pressable style={{}} onPress={props.onPress}>
      <Image
        source={props.image == null ? IMAGES.BACKGROUND : {uri: props?.image}}
        style={{
          backgroundColor: 'lightgrey',
          height: props.height ? props.height : moderateScale(50),
          width: props.width ? props.width : moderateScale(50),
          borderRadius: props.borderRadius
            ? props.borderRadius
            : moderateScale(100),
          resizeMode: 'stretch',
        }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
