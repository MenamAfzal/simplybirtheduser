import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import {COLORS, IMAGES} from '../constants';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';

export const renderInputToolbar = props => {
  return <InputToolbar {...props} containerStyle={styles.composerContainer} />;
};

export const renderBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: styles.wrapperLeft,
        right: styles.wrapperRight,
      }}
    />
  );
};

export const renderSend = props => (
  <Send {...props} alwaysShowSend={true} containerStyle={styles.sendContainer}>
    <Image source={IMAGES.CHAT_SEND} style={styles.sendButtonImage} />
  </Send>
);

const styles = StyleSheet.create({
  composerContainer: {
    marginHorizontal: horizontalScale(10),
    borderRadius: 10,
    backgroundColor: COLORS.CHAT_COMPOSER,
    justifyContent: 'center',
    borderWidth: moderateScale(0.18),
    borderTopWidth: moderateScale(0.18), //BorerWidth doesn't affect this for reasons unknown to man
    padding: verticalScale(5),
    marginBottom: verticalScale(5),
  },
  wrapperLeft: {
    backgroundColor: COLORS.SENDER_CHAT_BUBBLE,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  wrapperRight: {
    backgroundColor: COLORS.RECEIVER_CHAT_BUBBLE,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  sendContainer: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonImage: {
    height: moderateScale(45),
    width: moderateScale(45),
    marginHorizontal: horizontalScale(10),
  },
});
