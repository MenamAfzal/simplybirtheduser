import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import BackHeader from '../../../../components/BackHeader';
import Profile from '../../../../components/Profile';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utils/Metrics';
import {COLORS, FONTS} from '../../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../../redux/actions';
import Socket from '../../../../utils/socket';

export default CaregiverProfile = props => {
  console.log('props CP', props?.route?.params?.param?._id);
  const dispatch = useDispatch();

  const token = useSelector(state => state.authReducer.token);
  const profile = useSelector(state => state.dashReducer.my_profile);

  console.log('profile---->', profile);

  useEffect(() => {
    dispatch(AppActions.getMyprofile(token, props?.route?.params?.param?._id));
  }, [token, props?.route?.params?.param?._id]);

  return (
    <View style={styles.container}>
      <BackHeader />
      <ScrollView
        scrollEnabled={true}
        nestedScrollEnabled={true}
        style={styles.mainView}
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.profileView}>
          <Profile
            image={profile?.docs?.image}
            height={verticalScale(100)}
            width={horizontalScale(100)}
          />
          <View style={styles.heads}>
            <Text style={styles.detailInfo}>
              {profile?.docs?.firstName} {profile?.docs?.lastName}
            </Text>
            <Text style={styles.detailInfo}>
              Hii!!! We are here to help you!!
            </Text>
          </View>
        </View>

        {/* Left column of the profile details */}
        <View style={styles.detailsView}>
          <View style={styles.leftDetailsView}>
            <View style={styles.detailTextView}>
              <Text style={styles.detailHeadings}>First Name</Text>
              <Text style={styles.detailInfo}>{profile?.docs?.firstName}</Text>
            </View>
            <View style={styles.detailTextView}>
              <Text style={styles.detailHeadings}>Profile</Text>
              <Text style={styles.detailInfo}>{profile?.docs?.email}</Text>
            </View>
          </View>

          {/* Right column of the profile details */}
          <View style={styles.rightDetailsView}>
            <View style={styles.detailTextView}>
              <Text style={styles.detailHeadings}>Last Name</Text>
              <Text style={styles.detailInfo}>{profile?.docs?.lastName}</Text>
            </View>
            <View style={styles.detailTextView}>
              <Text style={styles.detailHeadings}>Experience</Text>
              <Text style={styles.detailInfo}>{profile?.docs?.experience}</Text>
            </View>
          </View>
        </View>
        <View style={styles.complicationsView}>
          <Text style={styles.detailHeadings}>Short Bio</Text>
          <Text style={styles.detailInfo}>{profile?.docs?.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    // paddingHorizontal: horizontalScale(15),
  },
  mainView: {
    flex: 1,
    flexWrap: 'wrap',
    paddingHorizontal: horizontalScale(15),
  },
  profileView: {
    flex: 0.2,
    flexDirection: 'row',
    top: 50,
    marginRight: 10,
  },
  detailsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  complicationsView: {
    flex: 0.8,
    // marginTop: verticalScale(10),
  },
  leftDetailsView: {
    flex: 0.6,
  },
  rightDetailsView: {
    flex: 0.4,
    marginLeft: verticalScale(60),
  },
  detailTextView: {
    marginVertical: verticalScale(10),
  },
  detailHeadings: {
    fontFamily: FONTS.w300,
    fontSize: moderateScale(19),
    color: COLORS.PROFILEDETAILS,
    top: 20,
    marginLeft: 22,
  },
  detailInfo: {
    fontFamily: FONTS.w600,
    fontSize: moderateScale(21),
    color: COLORS.PROFILEDETAILS,
    top: 20,
    marginLeft: 22,
  },
});
