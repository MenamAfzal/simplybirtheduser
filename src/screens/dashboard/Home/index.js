import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {useDispatch, useSelector} from 'react-redux';
import AppButton from '../../../components/AppButton';
import Cards from '../../../components/Cards';
import Profile from '../../../components/Profile';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';
import styles from '../styles';
import * as AppActions from '../../../redux/actions';
import {ACTION_TYPE} from '../../../redux/actionTypes';
import Socket from '../../../utils/socket';
import CareTeam from '../CareTeam/index';
import {color} from 'react-native-reanimated';
import {FILE_URL} from '../../../constants/url';
import {ForegroundNotificationHandler} from '../../../utils/PushNotification';
import {addEventListener} from '@react-native-community/netinfo';
import SubscriptionPlan from '../SubscriptionPlans';
import {normalize} from 'react-native-elements';

export default function Home({navigation}) {
  const {navigate} = useNavigation();
  const [isPlanSelected, setIsPlanSelected] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    ForegroundNotificationHandler(navigation);
  }, []);

  const dispatch = useDispatch();

  const userData = useSelector(state => state.authReducer.loginData);
  const token = useSelector(state => state.authReducer.token);
  const userId = useSelector(state => state.authReducer.loginData?.data?._id);
  const profile = useSelector(state => state.dashReducer?.my_profile);

  /* Calling all the necessary apis for the home page */
  useEffect(() => {
    dispatch(AppActions.getCaregiverListCall(userId, token));
    dispatch(AppActions.getBlogsCall(token));
    dispatch(AppActions.appoint_list(token, userId));
    dispatch(AppActions.blogs_list(token));
    dispatch(AppActions.getMyprofile(token, userId));
  }, [userId, token]);

  // Fetch care team data
  const careTeamData = useSelector(state => state.dashReducer.careTeam);

  // Fetch appointment/meetup list data
  const appointments = useSelector(state => state.dashReducer.appoint_list);

  const blogs = useSelector(state => state.dashReducer.blogs_list);

  console.log('appointmentsssssss', appointments);

  /* Establishing socket connection */
  useEffect(() => {
    Socket.socketInit(userId, dispatch);
    console.log('>>>>>> initialization');
  }, [userId]);

  /* Handling the selected plans in the Cards component through callback */
  const handleSelect = () => {
    if (isPlanSelected == true) {
      setIsPlanSelected(false);
    } else {
      setIsPlanSelected(true);
    }
  };

  useEffect(() => {
    handleSelect(); // Call the function with initial tab index (0 for monthly, 1 for yearly)
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(AppActions.getCaregiverListCall(userId));
    dispatch(AppActions.getBlogsCall(token));
    dispatch(AppActions.appoint_list(token, userId));
    dispatch(AppActions.blogs_list(token));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{flex: 1, maxHeight: verticalScale(680)}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }>
        <View
          style={[innerStyles.greetingView, {maxHeight: verticalScale(128)}]}>
          <Text style={innerStyles.hiText}>Hi {profile?.docs?.firstName}</Text>
          <Text style={innerStyles.greetingText}>Have a beautiful day!</Text>
          <View style={innerStyles.greetingImageView}>
            <Image
              style={innerStyles.greetingImageStyles}
              source={IMAGES.BACKGROUND}
            />
          </View>
        </View>
        <View style={{flex: 0.18}}>
          <Text style={innerStyles.heading}>My Care Team</Text>

          {careTeamData?.length == 0 ? (
            <View
              style={{
                alignItems: 'center',
                marginTop: 20,
                justifyContent: 'center',
              }}>
              <Text>No CareGiver Assigned</Text>
            </View>
          ) : (
            <FlatList
              data={careTeamData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity style={innerStyles.careTeamClickables}>
                    <View style={styles.profileView}>
                      <Profile image={item?.image} />
                    </View>
                    <View style={[styles.textView, {left: 5}]}>
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          flexWrap: 'wrap',
                        }}>
                        <Text style={styles.nameList} numberOfLines={1}>
                          {item?.firstName}{' '}
                        </Text>
                        {item?.lastName ? (
                          <Text style={styles.nameList} numberOfLines={1}>
                            {item?.lastName}
                          </Text>
                        ) : null}
                      </View>
                      <Text style={styles.descriptionList}>
                        {item?.designation}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          )}
        </View>
        <View
          style={{
            flex: appointments?.length == 0 ? 0.15 : 0.3,
          }}>
          <Text style={innerStyles.heading}>Meet-ups</Text>
          {appointments?.length == 0 ? (
            <View
              style={{
                alignItems: 'center',
                marginTop: 20,
                justifyContent: 'center',
              }}>
              <Text>No Meet Up found</Text>
            </View>
          ) : (
            <FlatList
              data={appointments}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[innerStyles.meetUpClickables]}
                    onPress={() => navigate('Meet')}>
                    <View style={[styles.profileView, {flex: 0.2}]}>
                      <Profile image={item?.caregiver[0]?.image} />
                    </View>

                    <View
                      style={{
                        flex: 0.34,
                        flexDirection: 'column',
                      }}>
                      <Text style={{right: moderateScale(40)}}>
                        {item?.caregiver[0]?.firstName}
                      </Text>
                      <Text
                        style={{
                          right: moderateScale(37),
                          color: COLORS.BLACK,
                          fontSize: moderateScale(14),
                          fontFamily: FONTS.w300,
                        }}>
                        {item?.caregiver[0]?.designation}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginHorizontal: moderateScale(30),
                      }}>
                      <View style={styles.moment}>
                        <Image source={IMAGES.CALENDAR} />
                        <Text style={styles.momentDescription}>
                          {item?.date}
                        </Text>
                      </View>
                      <View
                        style={{...styles.moment, marginTop: moderateScale(5)}}>
                        <Image source={IMAGES.CLOCK} />
                        <Text
                          style={[
                            styles.momentDescription,
                            {marginLeft: moderateScale(14)},
                          ]}>
                          {item?.slot}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
        <View style={{flex: 0.3}}>
          <Text style={innerStyles.heading}>Learn</Text>

          {blogs.docs?.length > 0 ? (
            <FlatList
              data={blogs.docs}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{...styles.homeLearn}}
                    onPress={() => navigate('RenderLearn', {item: item})}>
                    <View>
                      <View>
                        <Image
                          style={styles.imageload}
                          resizeMode="cover"
                          loadingStyle={styles.loadingstyle}
                          source={{uri: item?.coverImage}} // Assuming your API response structure is similar
                        />
                        <View style={{marginLeft: 10, marginBottom: 30}}>
                          <Text numberOfLines={2} style={styles.Title}>
                            {item.blogTitle}
                          </Text>
                          <View>
                            <Text numberOfLines={1} style={{}}>
                              {/* {item.blogContent} */}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          ) : (
            <View
              style={{
                margin: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.momentDescription}>
                {' '}
                Learn Template are Avilable with Subscription Plans{' '}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const innerStyles = StyleSheet.create({
  innerModalView: {
    flex: 1,
    backgroundColor: 'rgba(251, 243, 232, 1)',
    margin: moderateScale(8),
    borderRadius: moderateScale(10),
    shadowColor: COLORS.SHADOW,
    height: verticalScale(830),
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  segmentedTabContainerStyles: {
    height: verticalScale(50),
    width: horizontalScale(200),
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentedTabStyles: {
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  segmentedTabTextStyles: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: FONTS.w500,
    fontSize: moderateScale(18),
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: moderateScale(10),
  },
  greetingView: {
    flex: 0.15,
    backgroundColor: 'rgba(236, 182, 136, 0.31)',
    borderRadius: moderateScale(15),
    marginHorizontal: horizontalScale(5),
    marginBottom: verticalScale(10),
  },
  hiText: {
    fontFamily: FONTS.w700,
    fontSize: moderateScale(26),
    padding: horizontalScale(10),
  },
  greetingText: {
    fontFamily: FONTS.w300,
    fontSize: moderateScale(18),
    marginHorizontal: horizontalScale(10),
  },
  greetingImageView: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  greetingImageStyles: {
    bottom: moderateScale(80),
    height: verticalScale(110),
    width: horizontalScale(125),
    right: moderateScale(25),
    resizeMode: 'contain',
  },
  heading: {
    ...styles.heading,
    marginHorizontal: horizontalScale(5),
  },
  careTeamClickables: {
    ...styles.flatlist,
    height: verticalScale(72),
    width: horizontalScale(184),
  },
  meetUpClickables: {
    ...styles.flatlist,
    flex: 1,
    height: verticalScale(72),
    justifyContent: 'space-between',
  },
});
