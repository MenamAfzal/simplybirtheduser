import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import AppTextInput from '../../../components/AppTextInput';
import BackHeader from '../../../components/BackHeader';
import Profile from '../../../components/Profile';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';
import {TextInput} from 'react-native-gesture-handler';
import AppButton from '../../../components/AppButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import DateTimePickerInput from '../../../components/DateTimePicker';

export default function CareGiverAppointment() {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmDate = data => {
    setDate(moment(data).format('MMMM DD YYYY'));
    hideDatePicker();
  };
  const handleConfirmTime = time => {
    setTime(moment(time).format('LT'));
    hideTimePicker();
  };

  const careGiver = {
    id: 0,
    name: 'Willie Foster',
    specialty: 'Gynocologist',
    xp: 2,
  };
  return (
    <View style={styles.container}>
      <BackHeader title="Book Visit" />
      <View style={styles.infoView}>
        <View style={styles.profileView}>
          <Profile height={verticalScale(120)} width={horizontalScale(120)} />
        </View>
        <View style={styles.dataView}>
          <Text style={styles.nameText}>{careGiver.name}</Text>
          <Text style={styles.specialtyText}>{careGiver.specialty}</Text>
          <Text style={styles.xpText}>
            {careGiver.xp} {careGiver.xp > 1 ? 'Years' : 'Year'} experience
          </Text>
        </View>
      </View>
      <View style={styles.dateTimeView}>
        <View style={{flex: 1}}>
          <Text style={styles.dateTimeTitle}>Select date</Text>
          <DateTimePickerInput
            onPress={() => showDatePicker()}
            value={date?.toString()}
            placeholder={'dd/mm/yyyy'}
            image={IMAGES.CALENDAR}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.dateTimeTitle}>Select time</Text>
          {/* <Pressable
            style={styles.dateTimeTextInput}
            onPress={() => {
              showTimePicker();
            }}>
            <TextInput
              placeholder="00:00:00"
              value={time?.toString()}
              pointerEvents="none"
              style={{fontSize: moderateScale(18)}}
            />
            <Image source={IMAGES.CLOCK} style={styles.dateTimeIcon} />
          </Pressable> */}
          <DateTimePickerInput
            onPress={() => showTimePicker()}
            value={time?.toString()}
            placeholder={'00:00:00'}
            image={IMAGES.CLOCK}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
          />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <AppButton
          label="Book Home Visit"
          onPress={() => alert('API integration pending')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: horizontalScale(20),
  },
  profileView: {
    marginHorizontal: horizontalScale(5),
  },
  dataView: {
    marginHorizontal: horizontalScale(20),
  },
  nameText: {
    marginVertical: verticalScale(5),
    fontFamily: FONTS.w600,
    fontSize: moderateScale(24),
  },
  specialtyText: {
    marginVertical: verticalScale(5),
    fontFamily: FONTS.w300,
    fontSize: moderateScale(18),
    color: COLORS.GREY,
  },
  xpText: {
    marginVertical: verticalScale(5),
    fontFamily: FONTS.w300,
    fontSize: moderateScale(18),
    color: COLORS.GREY,
  },
  dateTimeView: {
    flexDirection: 'row',
    marginVertical: verticalScale(10),
  },
  dateTimeTitle: {
    fontFamily: FONTS.w400,
    fontSize: moderateScale(20),
    alignSelf: 'center',
  },
  dateTimeTextInput: {
    flexDirection: 'row',
    width: horizontalScale(185),
    height: verticalScale(50),
    justifyContent: 'space-between',
    backgroundColor: COLORS.TEXTBOX,
    paddingHorizontal: horizontalScale(10),
    alignItems: 'center',
    marginVertical: verticalScale(10),
    alignSelf: 'center',
  },
  dateTimeIcon: {
    height: moderateScale(19),
    width: moderateScale(19),
  },
  textInputStyle: {
    fontSize: moderateScale(18),
    flex: 1,
  },
});
