import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 4200);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainImage}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/splash.png')}
        />
      </View>
      <View style={styles.gifAlign}>
        <Image
          style={styles.gif}
          source={require('../../../assets/images/ButterFly_v002.gif')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'cover',
    height: verticalScale(350),
    width: horizontalScale(350),
  },
  gifAlign: {
    position: 'absolute',
    top: moderateScale(390),
    marginLeft: moderateScale(20),
  },
  gif: {
    height: verticalScale(500),
    width: horizontalScale(400),
  },
});
