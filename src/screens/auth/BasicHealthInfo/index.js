import React, {useEffect, useState} from 'react';
import {Alert, Image, Pressable, ScrollView, Text, View} from 'react-native';
import AppButton from '../../../components/AppButton';
import AppCheckbox from '../../../components/AppCheckbox';
import AppDropDownSideways from '../../../components/AppDropDownSideways';
import AppRadio from '../../../components/AppRadio';
import AppTextInputSideways from '../../../components/AppTextInputSideways';
import {COLORS, pregnancyComplications} from '../../../constants';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';
import {FONTS} from '../../../constants';
import styles from '../styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {letterValidation, numberValidation} from '../../../utils/validation';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../redux/actions';

export default function BasicHealthInfo({route, navigation}) {
  const [trimester, setTrimester] = useState();
  const [babyName, setBabyName] = useState();
  const [babyGender, setBabyGender] = useState();
  const [prevPregnancies, setPrevPregnancies] = useState();
  const [estDueDate, setEstDueDate] = useState();
  const [estDueDateVal, setEstDueDateVal] = useState();
  const [plannedBirthType, setPlannedBirthType] = useState();
  const [complications, setComplications] = useState([]);
  const [otherComplications, setOtherComplications] = useState([]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const dispatch = useDispatch();

  // const userId = useSelector(state => state.authReducer.userData._id);
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.authReducer.userData);
  let formData = new FormData();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setEstDueDate(moment(date).format('MMMM DD YYYY'));
    setEstDueDateVal(moment(date).format('YYYY-MM-DD').toString());
    hideDatePicker();
  };

  const data = [
    {label: 'Boy', value: 'Boy'},
    {label: 'Girl', value: 'Girl'},
    {label: 'Not known', value: 'Not known'},
  ];

  const handleGenderChange = selectedItem => {
    setBabyGender(selectedItem);
  };

  const handlePlannedBirthTypeChange = value => {
    console.log(value, 'planned birth');
    setPlannedBirthType(value);
  };

  const handleCheckboxChange = (value, index) => {
    const updatedValues = [...complications];
    if (updatedValues.includes(value)) {
      // remove the value from the array if it already exists
      updatedValues.splice(updatedValues.indexOf(value), 1);
    } else {
      // add the value to the array if it doesn't exist
      updatedValues.push(value);
    }
    setComplications(updatedValues);
  };

  const handleOtherInputChange = inputValue => {
    const updatedValues = [...complications];
    const otherOptionIndex = updatedValues.indexOf('Other');

    if (otherOptionIndex !== -1) {
      if (inputValue == '') {
        //   remove the 'Other' option if the input is empty
        updatedValues.splice(otherOptionIndex, 1);
      } else {
        // update the 'Other' option with the user's input
        updatedValues[otherOptionIndex] = otherComplications;
      }
      setComplications(updatedValues);
    }
  };

  const handleContinue = () => {
    if (!babyGender) {
      Alert.alert("Please enter your baby's gender");
    } else if (!prevPregnancies) {
      Alert.alert('Please enter the number of your previous pregnancies');
    } else if (!numberValidation(prevPregnancies)) {
      Alert.alert('Please enter previous pregnancies in digits');
    } else if (estDueDateVal == null) {
      Alert.alert('Please enter Estimate Due Date');
    }
     else {
      formData.append('babyName', babyName);
      formData.append('childSex', babyGender);
      formData.append('previousPregnancies', prevPregnancies);
      formData.append('birthType', plannedBirthType);
      formData.append('estimatedDueDate', estDueDateVal);
      formData.append('PregnancyComplications', complications);
      route?.params?.image && formData.append('image', route?.params?.image);
      route?.params?.age && formData.append('age', route?.params?.age);
      route?.params?.address &&
        formData.append('address', route?.params?.address);
      route?.params?.bio && formData.append('bio', route?.params?.bio);
      route?.params?.city &&
        formData.append('address_city', route?.params?.city);
      route?.params?.state &&
        formData.append('address_state', route?.params?.state);

      console.log(formData, 'formdata');

      dispatch(
        AppActions.updateUser(formData, token, resp => {
          console.log('basic health reponse', resp);
          resp == null ? null : navigation.reset({routes: [{name: 'Login'}]});
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require('../../../assets/images/butterflyback.png')}
      />

      <Image source={require('../../../assets/images/logo.png')} />

      <Text style={styles.header}>Basic Health Info</Text>
      <KeyboardAwareScrollView bounces={false}>
        {/* <AppTextInputSideways
          title="Trimester"
          placeholder="Enter your trimester"
          keyboardType="numeric"
          onChangeText={text => setTrimester(text)}
        /> */}
        <AppTextInputSideways
          title={`Baby Name\n(if any)`}
          placeholder="Enter baby name"
          onChangeText={text => setBabyName(text)}
        />
        <AppDropDownSideways
          data={data}
          labelField="label"
          valueField="value"
          value={babyGender}
          onChange={newValue => {
            handleGenderChange(newValue);
          }}
          title="Gender of baby"
        />
        <AppTextInputSideways
          title="No. of previous pregnancies"
          placeholder="Enter your number"
          keyboardType="numeric"
          onChangeText={text => setPrevPregnancies(text)}
        />

        <AppTextInputSideways
          title={`*Est. due date`}
          editable={false}
          pointerEvents="none"
          value={estDueDateVal}
          onPress={() => {
            showDatePicker();
          }}
          placeholder="Select date"
          rightImage={require('../../../assets/images/calendar.png')}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
        <View style={styles.profileSetupSec}>
          <Text style={styles.profileSetupLabel}>Planned{'\n'}birth type</Text>
          <View style={styles.profileSetupValue}>
            <AppRadio
              items={['Vaginal', 'C-Section', 'TOLAC', 'Not Known']}
              onChange={handlePlannedBirthTypeChange}
            />
          </View>
        </View>

        <View style={[styles.profileSetupSec]}>
          <Text style={styles.profileSetupLabel}>*Pregnancy Complications</Text>
          <View style={styles.profileSetupValue}>
            <AppCheckbox
              onValueChanged={setComplications}
              items={pregnancyComplications}
              complications={complications}
              setComplications={setComplications}
              handleCheckboxChange={handleCheckboxChange}
              //   handleOtherInputChange={handleOtherInputChange}
            />
          </View>
        </View>
        {complications.includes('Other') && (
          <View>
            {/* <AppButton label="Add" style={{alignSelf: 'center'}} /> */}
            <AppTextInputSideways
              title={``}
              placeholder="Enter other complications"
              onChangeText={text => setOtherComplications(text)}
              button={handleOtherInputChange}
              buttonText={'+'}
            />
          </View>
        )}
        <AppButton label="Continue" onPress={() => handleContinue()} />
      </KeyboardAwareScrollView>
    </View>
  );
}
