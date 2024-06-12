import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackHeader from '../../../components/BackHeader';
import Profile from '../../../components/Profile';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';

export default function Invitation() {
  const Team = [
    {
      id: 1,
      name: 'Willie Foster',
      experience: '2 years experience',
      date: '23 Jan',
      time: '10:00 AM',
    },
    {
      id: 2,
      name: 'Julie Hill',
      experience: '4 years experience',
      date: '23 Jan',
      time: '10:00 AM',
    },
  ];
  return (
    <View style={styles.mainView}>
      <BackHeader title="Invitations" />
      <FlatList
        data={Team}
        renderItem={({item, index}) => {
          return (
            <View style={styles.flatListView}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.profileView}>
                  <Profile height={50} width={50} />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.nameText}>{item.name}</Text>
                  <Text style={styles.descriptionText}>{item.description}</Text>
                  <View style={styles.innerView}>
                    <View style={styles.dateView}>
                      <Image source={IMAGES.CALENDAR} />
                      <Text style={styles.dateText}>{item.date}</Text>
                    </View>
                    <View style={styles.timeView}>
                      <Image source={IMAGES.CLOCK} />
                      <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.tickIconView}>
                <Image source={IMAGES.TICK_CIRCLE} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.crossIconView}>
                <Image source={IMAGES.CROSS_CIRCLE} />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  flatListView: {
    margin: moderateScale(20),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    marginVertical: verticalScale(10),
    height: verticalScale(94),
    shadowOffset: {width: 0, height: 1},
    elevation: 5,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 10,
    justifyContent: 'space-around',
  },
  profileView: {
    margin: moderateScale(10),
  },
  textView: {
    margin: moderateScale(10),
  },
  nameText: {
    color: COLORS.BLACK,
    fontSize: moderateScale(16),
    fontFamily: FONTS.w500,
  },
  descriptionText: {
    color: COLORS.BLACK,
    fontSize: moderateScale(14),
    fontFamily: FONTS.w300,
  },
  innerView: {
    flexDirection: 'row',
    columnGap: moderateScale(10),
  },
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: COLORS.GREY,
    fontSize: moderateScale(14),
    fontFamily: FONTS.w300,
    marginLeft: moderateScale(5),
    textAlign: 'center',
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    color: COLORS.GREY,
    fontSize: moderateScale(14),
    fontFamily: FONTS.w300,
    marginLeft: moderateScale(5),
    textAlign: 'center',
  },
  tickIconView: {},
  crossIconView: {
    marginRight: horizontalScale(15),
  },
});
