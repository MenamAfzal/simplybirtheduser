import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import React from 'react';
import {IMAGES} from '../constants';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';

export default SearchBox = props => {
  return (
    <View style={styles.searchView}>
      <TextInput
        style={styles.searchText}
        placeholder={props.placeholder}
        value={props.searchQuery}
        onChangeText={props.onChangeText}
      />
      <TouchableOpacity onPress={Keyboard.dismiss}>
        <Image source={IMAGES.SEARCH} style={styles.imgSearch} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchView: {
    flexDirection: 'row',
    height: verticalScale(56),
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(6),
    alignItems: 'center',
  },
  searchText: {
    fontSize: moderateScale(19),
    paddingLeft: horizontalScale(10),
    width: horizontalScale(325),
  },
  imgSearch: {
    height: verticalScale(36),
    width: horizontalScale(35),
    marginTop: moderateScale(8),
    marginRight: moderateScale(8),
  },
});
