import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppButton from '../../../components/AppButton';
import AppTextInputSideways from '../../../components/AppTextInputSideways';
import {moderateScale, verticalScale} from '../../../utils/Metrics';
import styles from '../styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {letterValidation, numberValidation} from '../../../utils/validation';
import ImagePicker from 'react-native-image-crop-picker';
import {
  requestCameraPermission,
  requestGalleryPermission,
} from '../../../utils/permissions';
import {IMAGES} from '../../../constants';
import {useDispatch, useSelector} from 'react-redux';

export default function ProfileSetup({navigation}) {
  const [profileImage, setProfileImage] = useState();

  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [bio, setBio] = useState();

  let formData = new FormData();

  const token = useSelector(state => state.authReducer.token);
  // const userId = useSelector(state => state.authReducer.userData._id);

  /*----------Image Picker-----------*/

  const createThreeButtonAlert = () => {
    Alert.alert('Upload profile', 'using', [
      {
        text: 'Open Camera',
        onPress: () => handleCameraPermission(),
      },
      {
        text: 'Open Gallery',
        onPress: () => handleGalleryPermission(),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleCameraPermission = async () => {
    const hasCameraPermission = await requestCameraPermission();
    if (hasCameraPermission) {
      openCamera();
    } else {
      Alert.alert('Please Check Camera Permission');
    }
  };

  const handleGalleryPermission = async () => {
    const hasGalleryPermission = await requestGalleryPermission();
    if (hasGalleryPermission) {
      openGallery();
    } else {
      Alert.alert('Please Check Gallery Permission');
    }
  };

  const openCamera = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.imageInsert(image);
    });
  };

  imageInsert = async item => {
    console.log('item --- ', item);
    let image = {
      name: item.filename || 'no_name',
      type: item.mime,
      uri: Platform.OS === 'ios' ? item.path.replace('file://', '') : item.path,
    };
    setProfileImage(image);
  };

  const openGallery = () => {
    try {
      ImagePicker.openPicker({
        mediaType: 'any',
        compressImageQuality: 0.3,
        includeBase64: true,
        cropping: true,
      }).then(async image => {
        if (image.size > 31200) {
          Alert.alert('Maximum image size 3mb');
          return;
        } else {
          console.log('image', image);
          let newImageObject = {
            name: image.filename || 'no_name',
            type: image.mime,
            uri:
              Platform.OS === 'ios'
                ? image.path.replace('file://', '')
                : image.path,
          };
          setProfileImage(newImageObject);
        }
      });
    } catch (e) {
      console.log('@@@ Error opening image picker ==========', e);
    }
  };

  /*----------Image Picker Ends-----------*/

  const handleContinue = () => {
    if (!age) {
      Alert.alert('Please enter your age');
    } else if (!numberValidation(age)) {
      Alert.alert('Please enter valid age');
    } else if (!address) {
      Alert.alert('Please enter your city');
    } else if (!city) {
      Alert.alert('Please enter your city');
    } else if (!state) {
      Alert.alert('Please enter your state');
    } else if (!bio) {
      Alert.alert('Please enter your Bio');
    } else {
      console.log(formData, 'formdata');

      navigation.navigate('BasicHealthInfo', {
        image: profileImage,
        age: age,
        address: address,
        bio: bio,
        city: city,
        state: state,
      });
    }
  };

  return (
    <KeyboardAwareScrollView bounces={false} style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../../assets/images/butterflyback.png')}
      />

      <Image source={require('../../../assets/images/logo.png')} />

      <Text style={styles.header}>Set up your profile</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.profileSetupLabel}>Your Photo</Text>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableOpacity
            style={{
              padding: profileImage ? 0 : 20,
              borderRadius: 50,
              backgroundColor: '#D9D9D980',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => createThreeButtonAlert()}>
            <Image
              style={{
                height: moderateScale(profileImage ? 95 : 45),
                width: moderateScale(profileImage ? 95 : 45),
                resizeMode: 'contain',
                borderRadius: profileImage ? 50 : 0,
              }}
              resizeMode="stretch"
              source={
                profileImage ? {uri: profileImage?.uri} : IMAGES.IMAGE_PICKER
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <AppTextInputSideways
        title="First Name"
        placeholder="Enter your name"
        onChangeText={text => {
          setFname(text.trim());
          // setFormData(Object.assign({}, formData, {firstName: text.trim()}));
        }}
      /> */}
      <AppTextInputSideways
        title="Age"
        placeholder="Enter your age"
        keyboardType="numeric"
        onChangeText={text => {
          setAge(text.trim());
          // setFormData(Object.assign({}, formData, {age: text.trim()}));
        }}
      />
      <AppTextInputSideways
        title="Address"
        placeholder="Enter your address"
        onChangeText={text => setAddress(text)}
      />
      <AppTextInputSideways
        title="City"
        placeholder="Enter your city"
        onChangeText={text => {
          setCity(text);
          // setFormData(Object.assign({}, formData, {address_city: text.trim()}));
        }}
      />
      <AppTextInputSideways
        title="State"
        placeholder="Enter your state"
        onChangeText={text => {
          setState(text);
          // setFormData(
          //   Object.assign({}, formData, {address_state: text.trim()}),
          // );
        }}
      />
      <AppTextInputSideways
        title="Bio"
        placeholder="Enter your short Bio"
        onChangeText={text => setBio(text)}
      />
      <AppButton label="Continue" onPress={() => handleContinue()} />
    </KeyboardAwareScrollView>
  );
}
