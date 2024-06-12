import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import {useNavigation} from '@react-navigation/native';
import Socket from '../utils/socket';

function VideoUI(props) {
  const {navigate, reset} = useNavigation();
  const [callConnect, setCallConnect] = useState(false);

  const channel_id =
    props?.route?.params?.param?.data?.videoId ||
    props?.route?.params?.video_id;

  const connectionData = {
    appId: '36ab438fbcd94870b57f4a912e0b5ff3',
    channel: channel_id,
  };

  useEffect(() => {
    onInit();
    if (channel_id) {
      setCallConnect(true);
    }
  }, [props]);

  const onInit = async () => {
    let data = await Socket.videoDisconnect();
    if (data?.channel_id == channel_id) {
      reset({
        index: 0, // Index of the screen to reset to (0 for the first screen)
        routes: [{name: 'Home'}],
      });
    }
  };

  const hangup = () => {
    Socket.videoCallHangup(channel_id);
    reset({
      index: 0, // Index of the screen to reset to (0 for the first screen)
      routes: [{name: 'Home'}],
    });
  };

  return callConnect ? (
    <View
      style={{
        height: '100%',
        width: '100%',
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          marginBottom: -20,
          backgroundColor: 'grey',
        }}>
        <AgoraUIKit
          connectionData={connectionData}
          rtcCallbacks={{
            EndCall: () => {
              hangup();
            },
          }}
          styleProps={customStyleProps}
        />
      </SafeAreaView>
    </View>
  ) : (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Waiting Video Call</Text>
    </View>
  );
}

const customStyleProps = {
  maxViewStyles: {
    width: 412, // Customize the width of the big video panel
    height: 713, // Customize the height of the big video panel
  },
  BtnTemplateStyles: {
    marginTop: 30, // Customize the button's top position
  },
  BtnTemplateContainer: {
    bottom: 20,
  },
};

export default VideoUI;
