import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import AppButton from '../../../components/AppButton';
import Profile from '../../../components/Profile';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import {useSelector, useDispatch} from 'react-redux';
import * as AppActions from '../../../redux/actions';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';
import styles from '../styles';
import moment from 'moment';
import TimeSlotPicker from '../../../components/CustomTimeSlotPicker';

export default function Meet({navigation}) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.authReducer.loginData);

  console.log('useData-->', userData);

  const {navigate} = useNavigation();
  const [tabSelectedIndex, setTabSelectedIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState();
  const [isSlotVisible, setIsSlotVisible] = useState(false);
  const [combinedData, setCombinedData] = useState([]);
  const [selectedCaregiver, setselectedCaregiver] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const appointments = useSelector(state => state.dashReducer.appoint_list);
  const all_available = useSelector(state => state.dashReducer.all_available);
  const video_call = useSelector(state => state.dashReducer.video_call);
  const get_sessions = useSelector(state => state.dashReducer.get_sessions);

  console.log(all_available, 'all_available');

  console.log(get_sessions, 'get_sessions');

  useEffect(() => {
    setCombinedData(all_available);
  }, [all_available]);

  const handleSingleIndexSelect = index => {
    setTabSelectedIndex(index);
  };

  useEffect(() => {
    dispatch(AppActions.appoint_list(token, userData?.data?._id));
  }, [token]);

  const Booking = item => {
    dispatch(AppActions.available_slots(token, item?._id, selectedDate));
  };

  const startVideoCall = item => {
    console.log('item--->', item);
    const payload = {
      sender_id: userData?.data?._id,
      receiver_id: item?.caregiverId,
    };
    // navigation.navigate('IncomingCallScreen')
    dispatch(AppActions.video_call(token, payload, navigation));
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(AppActions.appoint_list(token, userData?.data?._id));
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{...styles.heading, fontSize: moderateScale(26)}}>
            Meet Up
          </Text>
          <SegmentedControlTab
            values={['Consult', 'Sessions']}
            selectedIndex={tabSelectedIndex}
            onTabPress={handleSingleIndexSelect}
            borderRadius={moderateScale(50)}
            tabsContainerStyle={{
              height: verticalScale(40),
              width: horizontalScale(200),
              borderWidth: 1,
              borderRadius: 20,
              borderColor: COLORS.PRIMARY,
            }}
            tabStyle={{
              //borderColor: COLORS.PRIMARY,
              alignItems: 'center',
              //borderRadius:20
              borderColor: COLORS.WHITE,
              borderWidth: 0,
            }}
            activeTabStyle={{
              backgroundColor: COLORS.PRIMARY,
              borderRadius: 20,
            }}
            tabTextStyle={{
              color: 'rgba(0, 0, 0, 0.6)',
              fontFamily: FONTS.w500,
              fontSize: moderateScale(16),
            }}
            activeTabTextStyle={{color: 'white'}}
          />
        </View>
        {tabSelectedIndex === 0 && (
          <View style={{flex: 0.9}}>
            <Text style={{...styles.heading, marginVertical: moderateScale(5)}}>
              Upcoming Consultations
            </Text>
            {appointments?.length > 0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                  />
                }
                data={appointments}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.flatlist}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.profileView}>
                          <Profile
                            height={50}
                            width={50}
                            image={item?.caregiver[0]?.image}
                            // onPress={() =>
                            //   navigate('CaregiverProfile', {
                            //     caregiverid: item?.caregiverId,
                            //   })
                            // }
                          />
                        </View>
                        <View style={styles.textView}>
                          <Text style={styles.nameList}>
                            {item?.caregiver[0]?.firstName}
                            {item?.caregiver[0]?.lastName}
                          </Text>
                          <Text style={styles.descriptionList}>
                            {item?.meetingType}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              columnGap: moderateScale(5),
                            }}>
                            <View style={styles.moment}>
                              <Image source={IMAGES?.CALENDAR} />
                              <Text style={styles.momentDescription}>
                                {moment(item?.date).format('DD MMM')}
                              </Text>
                            </View>
                            {item?.slot && (
                              <View style={styles.moment}>
                                <Image source={IMAGES?.CLOCK} />
                                <Text style={styles.momentDescription}>
                                  {item?.slot}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                        {item?.date == moment().format('YYYY-MM-DD') &&
                          item?.slot <= moment().format('HH:MM') && (
                            <View style={{right: 10}}>
                              <AppButton
                                label="Start"
                                height={verticalScale(35)}
                                width={horizontalScale(95)}
                                fontSize={moderateScale(20)}
                                onPress={() => {
                                  startVideoCall(item);
                                }}
                              />
                            </View>
                          )}
                      </View>
                    </View>
                  );
                }}
              />
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 60,
                }}>
                <Text style={[styles.dayText, {color: 'grey'}]}>
                  No Upcoming Consultation
                </Text>
              </View>
            )}
          </View>
        )}
        {tabSelectedIndex === 1 && (
          <View style={{flex: 1, paddingBottom: 50}}>
            <Calendar
              theme={{arrowColor: 'rgba(146, 145, 165, 1)'}}
              minDate={new Date().toString()}
              onDayPress={day => {
                dispatch(
                  AppActions.all_available(token, day?.dateString, res => {
                    dispatch(
                      AppActions.get_sessions(token, day?.dateString, res2 => {
                        setCombinedData([...res?.data, ...res2?.data?.docs]);
                      }),
                    );
                  }),
                );
                setSelectedDate(day?.dateString);
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: COLORS.SECONDARY,
                },
              }}
            />

            <FlatList
              // style={{backgroundColor: 'red'}}
              showsVerticalScrollIndicator={false}
              data={combinedData}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.flatlist}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.profileView}>
                        <Profile
                          height={50}
                          width={50}
                          image={
                            item?.description ? item?.coverImage : item?.image
                          }
                        />
                      </View>
                      <View style={styles.textView}>
                        <Text numberOfLines={1} style={styles.nameList}>
                          {item?.firstName || item?.title} {item?.lastName}{' '}
                        </Text>
                        <Text numberOfLines={2} style={styles.descriptionList}>
                          {item?.startDate} {item?.startTime}
                          {item?.designation}
                        </Text>
                        {item?.description ? null : (
                          <View
                            style={{
                              flexDirection: 'row',
                              columnGap: moderateScale(5),
                            }}>
                            <View style={styles.moment}>
                              <Text style={styles.momentDescription}>
                                {item?.address?.city} {item?.address?.state}
                              </Text>
                            </View>
                          </View>
                        )}
                      </View>
                      <View
                        style={{justifyContent: 'flex-end', marginRight: 20}}>
                        {item?.description ? (
                          <AppButton
                            label="Join"
                            height={verticalScale(35)}
                            width={horizontalScale(95)}
                            fontSize={moderateScale(19)}
                            onPress={() => {
                              navigation.navigate('Mindful', {
                                sessionData: item,
                              });
                            }}
                          />
                        ) : (
                          <AppButton
                            label="Register"
                            height={verticalScale(35)}
                            width={horizontalScale(95)}
                            fontSize={moderateScale(19)}
                            onPress={() => {
                              Booking(item),
                                setselectedCaregiver(item),
                                setIsSlotVisible(true);
                            }}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}
        {isSlotVisible && (
          <TimeSlotPicker
            isVisible={isSlotVisible}
            onClose={() => setIsSlotVisible(false)}
            selectedCaregiver={selectedCaregiver}
            selectedDate={selectedDate}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
