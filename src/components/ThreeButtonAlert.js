import {Alert} from 'react-native';

export default createThreeButtonAlert = props => {
  console.log(props);
  Alert.alert('Upload profile', 'using', [
    {
      text: 'Open Camera',
      onPress: () => props.onPressCamera,
    },
    {
      text: 'Open Gallery',
      onPress: () => props.onPressGallery,
    },
    {
      text: 'Cancel',
      style: 'cancel',
    },
  ]);
};
