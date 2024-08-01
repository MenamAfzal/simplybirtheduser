import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utils/Metrics';
import AppTextInputSideways from '../../../../components/AppTextInputSideways';
import AppButton from '../../../../components/AppButton';
import * as AppActions from '../../../../redux/actions';
import BackHeader from '../../../../components/BackHeader';
import {
  requestCameraPermission,
  requestGalleryPermission,
} from '../../../../utils/permissions';

import {COLORS, FONTS, IMAGES} from '../../../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Profile from '../../../../components/Profile';

const EditProfile = (props, {navigation}) => {
  console.log('props :>>', props?.route);

  const param = props?.route?.params?.profile?.docs;

  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState({
    uri: param?.image,
  });

  const [params, setParams] = useState({
    _id: param?._id,
    fname: param?.firstName,
    age: param?.age,
    address: param?.address?.line1,
    city: param?.address?.city,
    state: param?.address?.state,
  });

  const userID = useSelector(state => state.authReducer?.loginData?.data?._id);
  const token = useSelector(state => state.authReducer.token);

  /* ----------Image Picker ----------- */

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

  console.log(profileImage, 'profileImage');

  const handleGalleryPermission = async () => {
    const hasGalleryPermission = await requestGalleryPermission();
    if (hasGalleryPermission) {
      openGallery();
    } else {
      Alert.alert('Please Check Gallery Permission');
    }
  };

  /* Opens the camera for image and saves the relevant data once an image is clicked */
  const openCamera = async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      imageInsert(image);
    });
  };

  const imageInsert = async item => {
    let image = {
      name: item.filename || 'no_name',
      type: item.mime,
      uri: Platform.OS === 'ios' ? item.path.replace('file://', '') : item.path,
    };
    setProfileImage(image);
  };

  /* Opens the gallery for image selection and saves the relevant data once an image is selected */
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

  /* ----------Image Picker Ends----------- */

  const handleUpdate = () => {
    if (!params.fname) {
      Alert.alert('First name is empty');
      return;
    }

    let formData = new FormData();

    formData.append('_id', params?._id);
    profileImage?.name && formData.append('image', profileImage);
    formData.append('firstName', params?.fname);
    formData.append('age', params?.age);
    formData.append('address_line1', params?.address);
    formData.append('address_city', params?.city);
    formData.append('address_state', params?.state);

    console.log(formData, 'formdataaa');

    // Dispatch the updateProfile action with the token and params
    dispatch(AppActions.UpdateUserProfile(token, formData, params?._id));
  };
  return (
    <SafeAreaView style={styles.container}>
      <BackHeader title="Edit Profile" />
      <KeyboardAwareScrollView>
        <View style={styles.innerView}>
          <Text style={styles.textarea}>Your Photo</Text>
          <View>
            <View>
              <Image
                style={{
                  height: verticalScale(95),
                  width: verticalScale(95),
                  borderRadius: 50,
                  backgroundColor: '#D9D9D980',
                  position: 'absolute',
                  resizeMode: 'stretch',
                }}
                source={
                  profileImage?.uri
                    ? {uri: profileImage?.uri}
                    : IMAGES.IMAGE_PICKER
                }
              />
            </View>
            <TouchableOpacity
              style={styles.imgSearch}
              onPress={() => createThreeButtonAlert()}>
              <Image
                style={{
                  height: verticalScale(18),
                  width: verticalScale(18),
                  justifyContent: 'center',
                }}
                source={IMAGES.IMAGE_PICKER}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.formView}>
            <AppTextInputSideways
              title="First Name"
              placeholder="Enter your name"
              onChangeText={text => setParams({...params, fname: text.trim()})}
              value={params?.fname}
            />
            <AppTextInputSideways
              title="Age"
              keyboardType="numeric"
              placeholder="Enter your age"
              onChangeText={text => setParams({...params, age: text.trim()})}
              value={params?.age?.toString()}
            />
            <AppTextInputSideways
              title="Address"
              placeholder="Enter your address"
              onChangeText={text => setParams({...params, address: text})}
              value={params?.address}
            />
            <AppTextInputSideways
              title="City"
              placeholder="Enter your city"
              onChangeText={text => setParams({...params, city: text})}
              value={params.city}
            />
            <AppTextInputSideways
              title="State"
              placeholder="Enter your state"
              onChangeText={text => setParams({...params, state: text})}
              value={params.state}
            />
          </View>
          <View style={styles.buttonView}>
            <AppButton label="Update" onPress={handleUpdate} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  imgSearch: {
    backgroundColor: '#F5ABAC',
    height: verticalScale(32),
    width: horizontalScale(32),
    borderRadius: 50,
    marginStart: horizontalScale(65),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textarea: {
    fontSize: moderateScale(22),
    fontFamily: FONTS.w400,
    marginBottom: verticalScale(10),
  },
  innerView: {
    padding: horizontalScale(20),
  },
  formView: {
    marginTop: verticalScale(60),
    alignItems: 'center',
  },
  textPlan: {
    fontSize: 20,
    paddingLeft: 20,
  },
  buttonView: {
    marginVertical: verticalScale(15),
  },
});
