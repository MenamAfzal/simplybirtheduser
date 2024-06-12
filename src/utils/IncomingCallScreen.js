import {View, Text, TouchableOpacity, Image, Vibration} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {IMAGES} from '../constants';
import {Avatar} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Sound from 'react-native-sound';
import {useNavigation} from '@react-navigation/native';
import Socket from './socket';

const IncomingCallScreen = props => {
  const {navigate, reset} = useNavigation();
  const [callDetails, setCallDetails] = useState(props.route.params?.param);

  let soundPlayer = '';

  const playAudio = audioFile => {
    soundPlayer = new Sound('ringtone.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      soundPlayer.play();
      console.log('player working');
      // Sound is loaded successfully
    });
  };

  (async () => {
    let data = await Socket.videoDisconnect();
    if (data?.channel_id == callDetails?.data?.videoId) {
      soundPlayer.stop();
      Vibration.cancel();
      reset({
        index: 0, // Index of the screen to reset to (0 for the first screen)
        routes: [{name: 'Home'}],
      });
    }
  })();

  useEffect(() => {
    Vibration.vibrate([1000, 2000, 3000], true);
    playAudio();
  }, []);

  const hangUp = () => {
    Socket.videoCallHangup(callDetails?.data?.videoId);
    soundPlayer.stop();
    Vibration.cancel();
    reset({
      index: 0, // Index of the screen to reset to (0 for the first screen)
      routes: [{name: 'Home'}],
    });
  };

  const callAccept = () => {
    soundPlayer.stop();
    Vibration.cancel();
    if (callDetails) {
      reset({
        index: 0, // Index of the screen to reset to (0 for the first screen)
        routes: [{name: 'VideoCall', params: {param: callDetails}}],
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 0.3,
          backgroundColor: 'grey',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LinearGradient
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2D6EF5',
          }}
          colors={['#5E9EA3', '#ecb688']}
          start={{x: 0, y: 0}}
          end={{x: 1.2, y: 0}}>
          <Text
            style={{
              marginTop: 50,
              fontSize: 22,
              lineHeight: 22,
              letterSpacing: 0.22,
              fontWeight: '500',
              color: '#ffffff',
            }}>
            Incoming call
          </Text>
          <Text
            style={{
              marginBottom: 10,
              fontSize: 29,
              fontWeight: '600',
              color: '#ffffff',
              textTransform: 'capitalize',
            }}>
            {callDetails?.data?.firstName}
          </Text>
          <Text
            style={{
              margin: 15,
              fontSize: 18,
              lineHeight: 22,
              letterSpacing: 0.22,
              fontWeight: '500',
              color: '#ffffff',
            }}>
            Simply Birthed Video Call
          </Text>
        </LinearGradient>
      </View>

      <View
        style={{
          flex: 0.3,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'grey',
        }}>
        <LinearGradient
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2D6EF5',
          }}
          colors={['#5E9EA3', '#ecb688']}
          start={{x: 0, y: 0}}
          end={{x: 1.2, y: 0}}>
          <View
            style={{
              height: 160,
              width: 160,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 250 / 2,
              backgroundColor: 'white',
            }}>
            <TouchableOpacity>
              {!callDetails?.data?.image ? (
                <Avatar.Image
                  source={{uri: callDetails?.data?.image}}
                  size={150}
                />
              ) : (
                <Avatar.Text
                  size={150}
                  label={callDetails?.data?.firstName
                    ?.substring(0, 1)
                    ?.toUpperCase()}
                />
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <View
        style={{
          flex: 0.4,
          backgroundColor: 'grey',
        }}>
        <LinearGradient
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#2D6EF5',
          }}
          colors={['#5E9EA3', '#ecb688']}
          start={{x: 0, y: 0}}
          end={{x: 1.2, y: 0}}>
          <TouchableOpacity
            style={{
              marginLeft: 50,
              height: 80,
              width: 80,
              borderRadius: 80 / 2,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              hangUp();
            }}>
            <Image
              source={IMAGES.ENDCALL}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginRight: 50,
              height: 80,
              width: 80,
              borderRadius: 80 / 2,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              callAccept();
            }}>
            <Image
              source={IMAGES.INCOMING}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

export default IncomingCallScreen;
