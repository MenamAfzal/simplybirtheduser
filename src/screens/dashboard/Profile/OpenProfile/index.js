import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import BackHeader from '../../../../components/BackHeader';
import Profile from '../../../../components/Profile';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utils/Metrics';
import {COLORS, FONTS, IMAGES} from '../../../../constants';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../../redux/actions';
import Socket from '../../../../utils/socket';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import RenderHTML from 'react-native-render-html';

const OpenProfile = () => {
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const userID = useSelector(state => state.authReducer?.loginData?.data?._id);
  const token = useSelector(state => state.authReducer.token);
  const profile = useSelector(state => state.dashReducer?.my_profile);
  const baby_stages = useSelector(state => state.dashReducer?.baby_stages);
  const week = useSelector(
    state => state?.dashReducer?.my_profile?.docs?.currentWeek,
  );

  const navigation = useNavigation();

  // State to handle description truncation
  const [showFullDescription, setShowFullDescription] = useState(false);

  console.log('baby_stages :>>', baby_stages);

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile', {profile: profile});
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    dispatch(AppActions.getMyprofile(token, userID));
    dispatch(AppActions.getBabyStage(token, week));
  }, [token, userID]);

  return (
    <View style={styles.container}>
      <BackHeader title={profile?.docs?.firstName} />

      {/* Segmented Control Tabs */}
      <View style={{alignItems: 'center'}}>
        <SegmentedControlTab
          values={['My Profile', 'My Baby']} // Tab titles
          selectedIndex={selectedTabIndex}
          onTabPress={index => setSelectedTabIndex(index)}
          borderRadius={50}
          tabsContainerStyle={styles.segmentedTabContainerStyles}
          tabStyle={styles.segmentedTabStyles}
          activeTabStyle={{backgroundColor: COLORS.PRIMARY}}
          tabTextStyle={styles.segmentedTabTextStyles}
          activeTabTextStyle={{color: 'white'}}
        />
      </View>
      {/* Content */}
      {selectedTabIndex === 0 ? (
        <ScrollView style={styles.mainView}>
          <View style={styles.profileView}>
            <Profile
              height={verticalScale(100)}
              width={horizontalScale(100)}
              image={profile?.docs?.image}
            />
          </View>
          <View style={styles.detailsView}>
            <View style={styles.leftDetailsView}>
              {profile?.docs?.firstName ? (
                <View style={styles.detailTextView}>
                  <Text style={styles.detailHeadings}>Full Name</Text>
                  <Text style={styles.detailInfo}>
                    {profile?.docs?.firstName} {profile?.docs?.lastName}
                  </Text>
                </View>
              ) : null}
              {profile?.docs?.remainingWeeks ? (
                <View style={styles.detailTextView}>
                  <Text style={styles.detailHeadings}>Remaining Weeks</Text>
                  <Text style={styles.detailInfo}>
                    {profile?.docs?.remainingWeeks}
                  </Text>
                </View>
              ) : null}

              {profile?.docs?.email ? (
                <View style={styles.detailTextView}>
                  <Text style={styles.detailHeadings}>Email</Text>
                  <Text style={styles.detailInfo}>{profile?.docs?.email}</Text>
                </View>
              ) : null}

              {profile?.docs?.estimatedDueDate ? (
                <View style={styles.detailTextView}>
                  <Text style={styles.detailHeadings}>Est. due date</Text>
                  <Text style={styles.detailInfo}>
                    {profile?.docs?.estimatedDueDate}
                  </Text>
                </View>
              ) : null}
              {profile?.docs?.address?.state ? (
                <View style={styles.detailTextView}>
                  <Text style={styles.detailHeadings}>State</Text>
                  <Text style={styles.detailInfo}>
                    {profile?.docs?.address?.state}
                  </Text>
                </View>
              ) : null}
              {profile?.docs?.address?.city ? (
                <View style={styles.detailTextView}>
                  <Text style={styles.detailHeadings}>City</Text>
                  <Text style={styles.detailInfo}>
                    {profile?.docs?.address?.city}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.rightDetailsView}>
              {profile?.docs?.age ? (
                <View style={styles.detailTextView}>
                  <Text style={styles.detailHeadings}>Age</Text>
                  <Text style={styles.detailInfo}>{profile?.docs?.age}</Text>
                </View>
              ) : null}
              {profile?.docs?.phone ? (
                <View style={styles.detailTextView}>
                  <Text style={styles.detailHeadings}>Mobile No.</Text>
                  <Text style={styles.detailInfo}>{profile?.docs?.phone}</Text>
                </View>
              ) : null}
              {profile?.docs?.birthType ? (
                <View style={[styles.detailTextView, {marginTop: 105}]}>
                  <Text style={styles.detailHeadings}>Planned birth type</Text>
                  <Text style={styles.detailInfo}>
                    {profile?.docs?.birthType}
                  </Text>
                </View>
              ) : null}
              {profile?.docs?.currentWeek ? (
                <View style={styles.detailTextView}>
                  <Text style={styles.detailHeadings}>Baby Weeks</Text>
                  <Text style={styles.detailInfo}>
                    {profile?.docs?.currentWeek}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
      ) : (
        <>
          {baby_stages?.uri ? (
            <View style={styles.profileView}>
              <Image
                source={{uri: baby_stages?.uri}}
                style={{
                  resizeMode: 'contain',
                  width: width,
                  height: verticalScale(200),
                }}
              />
            </View>
          ) : null}

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.mainView}>
            {baby_stages?.length !== 0 ? (
              <>
                <View style={styles.detailedView}>
                  <View style={styles.leftDetailsView}>
                    {baby_stages?.heading ? (
                      <View style={styles.detailTextView}>
                        {/* <Text style={styles.detailingInfo}>Description</Text> */}
                        <Text style={styles.detailingInfo}>
                          {baby_stages?.heading}
                        </Text>
                      </View>
                    ) : null}
                    <View style={styles.detailingTextView}>
                      {baby_stages?.week ? (
                        <Text
                          style={[
                            styles.detailingInfo,
                            {fontSize: 18, color: '#373541'},
                          ]}>
                          {baby_stages?.week} Weeks
                        </Text>
                      ) : null}
                      {baby_stages?.description ? (
                        <View style={styles.descriptionTextView}>
                          {/* {showFullDescription ? (
                          <Text style={styles.detailInfo}>
                            {baby_stages?.description}
                          </Text>
                        ) : ( */}
                          <RenderHTML
                            contentWidth={width}
                            source={{
                              html: baby_stages?.description
                                ?.split('<br>')
                                ?.slice(0, 5)
                                ?.join('<br>'),
                            }}
                          />
                          {/* )} */}
                          {/* <TouchableOpacity onPress={toggleDescription}>
                          <Text style={styles.showMore}>
                            {showFullDescription ? 'Show Less' : 'Show More'}
                          </Text>
                        </TouchableOpacity> */}
                        </View>
                      ) : null}
                    </View>
                  </View>
                </View>
              </>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 30,
                }}>
                <Text style={styles.detailHeadings}>No Baby Profile Found</Text>
              </View>
            )}
          </ScrollView>
        </>
      )}

      {/* Edit Profile Button */}
      {selectedTabIndex === 0 ? (
        <>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigateToEditProfile()}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.editProfileButton,
              {marginVertical: 5, backgroundColor: null, flexDirection: 'row'},
            ]}
            onPress={() =>
              Alert.alert(
                'We are sorry to see you leave',
                'Once deleted the account it cannot be recovered again',
                [
                  {
                    text: 'Cancel', // Adding the "Cancel" button
                    style: 'cancel', // This style makes it look like a cancel button
                  },
                  {
                    text: 'Ok',
                    onPress: () => {
                      dispatch(AppActions.deleteAccount(token));
                    },
                  },
                ],
                {cancelable: false},
              )
            }>
            <Text style={[styles.editProfileButtonText, {color: 'red'}]}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  mainView: {
    flex: 1,
    paddingHorizontal: horizontalScale(15),
  },
  profileView: {
    marginTop: 10,
    marginVertical: 2,
  },
  detailsView: {
    flex: 0.4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailedView: {
    flex: 0.4,

    flexWrap: 'wrap',
  },
  complicationsView: {
    flex: 0.2,
    marginTop: verticalScale(10),
  },
  leftDetailsView: {
    flex: 0.6,
  },
  rightDetailsView: {
    flex: 0.4,
  },
  detailTextView: {
    marginVertical: verticalScale(10),
  },
  detailingTextView: {
    // marginVertical: verticalScale(30),
  },
  detailHeadings: {
    fontFamily: FONTS.w500,
    fontSize: moderateScale(19),
    color: COLORS.PROFILEDETAILS,
  },
  detailInfo: {
    fontFamily: FONTS.w300,
    fontSize: moderateScale(21),
    color: COLORS.PROFILEDETAILS,
  },
  detailingInfo: {
    fontFamily: FONTS.w700,
    fontSize: moderateScale(25),
    color: COLORS.PRIMARY,
  },
  detailedInfo: {
    fontFamily: FONTS.w600,
    fontSize: moderateScale(21),
    color: COLORS.PROFILEDETAILS,
    marginTop: verticalScale(10),
    color: '#5E9EA2',
  },
  segmentedTabContainerStyles: {
    height: verticalScale(50),
    width: horizontalScale(220),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 50,
  },
  segmentedTabStyles: {
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
    borderWidth: 0,
  },
  segmentedTabTextStyles: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: FONTS.w500,
    fontSize: moderateScale(18),
  },
  editProfileButton: {
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(50),
    marginHorizontal: horizontalScale(50),
    borderRadius: moderateScale(10)
  },
  editProfileButtonText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.w500,
    fontSize: moderateScale(18),
  },
  showMore: {
    color: COLORS.PRIMARY,
    fontSize: moderateScale(16),
    marginTop: verticalScale(5),
  },
  heading: {
    marginTop: 160,
    right: 150,
  },
  descriptionTextView: {
    marginTop: 10,
  },
});

export default OpenProfile;
