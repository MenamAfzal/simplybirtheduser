import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTS, IMAGES} from '../../../../constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../../utils/Metrics';
import * as AppActions from '../../../../redux/actions';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import AppButton from '../../../../components/AppButton';
import Cards from '../../../../components/Cards';
import BackHeader from '../../../../components/BackHeader';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

const UserProfile = ({navigation}) => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.authReducer.token);

  const profile = useSelector(state => state.dashReducer?.my_profile);
  const userID = useSelector(state => state.authReducer?.loginData?.data?._id);

  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const userData = useSelector(state => state.authReducer.loginData);

  console.log('useData-->', userData);

  useEffect(() => {
    dispatch(AppActions.checkSubscriptionCall(token));
    dispatch(AppActions.getTransectionListCall(token));
    dispatch(AppActions.getMyprofile(token, userID));
  }, [check_Subscription]);

  const check_Subscription = useSelector(state => state.authReducer?.checkSub);
  const transaction = useSelector(state =>
    state.dashReducer?.transections?.filter(item => item !== null),
  );

  console.log(check_Subscription, 'check_Subscription');
  console.log(transaction, 'transaction');

  const toggleMoreDetails = () => {
    setShowMoreDetails(!showMoreDetails);
  };

  const renderMoreDetails = item => {
    if (showMoreDetails) {
      return item?.serviceData?.description?.slice(2)?.map((detail, id) => (
        <View style={{flexDirection: 'row'}} key={id}>
          <Text style={{marginRight: 5}}>{'\u2022'}</Text>
          <Text style={styles.planDetailsText}>{detail}</Text>
        </View>
      ));
    }
    return null;
  };

  const UnsubscribeCall = item => {
    let data = {id: item?.stipe_subscriber_id};
    dispatch(AppActions.UnsubscribeApi(token, data , cb => {
      navigation.navigate('Home')
    }))
  };

  const renderPlans = ({item}) => {
    console.log(item?.subscription_status, 'check_Subscription');
    return (
      <View style={styles.planContainer}>
        <View style={styles.planTitle}>
          <Text style={styles.planTitleText}>{item?.serviceData?.type}</Text>
          <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
            <Text style={styles.planTitleDescription}>
              {item?.serviceData?.name}
            </Text>
            <Text style={styles.planDetailsText}>
              {' '}
              Status : {item?.subscription_status}
            </Text>
          </View>
        </View>
        <View style={styles.planPrice}>
          <Text style={styles.planPriceText}>
            {item?.serviceData?.default_price_data?.unit_amount}
            <Text style={styles.planPerMonthText}>/m</Text>
          </Text>
        </View>
        <View style={styles.planDetails}>
          <View>
            {item?.serviceData?.description?.slice(0, 2).map((detail, id) => (
              <View style={{flexDirection: 'row'}} key={id}>
                <Text style={{marginRight: 5, color: COLORS.BLACK}}>
                  {'\u2022'}
                </Text>
                <Text style={styles.planDetailsText}>{detail}</Text>
              </View>
            ))}
            {showMoreDetails ? null : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={toggleMoreDetails}>
                  <Text
                    style={{
                      color: COLORS.PRIMARY,
                      marginVertical: moderateScale(10),
                    }}>
                    See all benefits
                  </Text>
                </TouchableOpacity>

                {(item?.subscription_status == 'active' ||
                  item?.subscription_status == 'trialing') && (
                  <TouchableOpacity onPress={() => UnsubscribeCall(item)}>
                    <Text style={styles.unsubStyle}>Unsubscribe</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            {renderMoreDetails(item)}

            {showMoreDetails && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={toggleMoreDetails}>
                  <Text
                    style={{
                      color: COLORS.PRIMARY,
                      marginVertical: moderateScale(10),
                    }}>
                    Hide
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Unsubscribe API')}>
                  <Text style={styles.unsubStyle}>Unsubscribe</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderTransection = ({item}) => {
    return (
      <View style={styles.transactionHistoryContainer}>
        <View style={styles.transactionHistoryHeader}>
          {item?.plan && (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{item?.plan}</Text>
            </View>
          )}
          {item?.created && (
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>
                {item?.created
                  ? moment(item.created)?.format('YYYY-MM-DD')
                  : 'N/A'}
              </Text>
            </View>
          )}
        </View>
        {(item?.amount || item?.status) && (
          <View style={styles.transactionHistoryDetails}>
            <Text style={styles.transactionPriceText}>${item?.amount}</Text>
            <View style={styles.paymentStatusView}>
              <Text style={styles.paymentStatusText}>{item?.status}</Text>
            </View>
          </View>
        )}
        {item?.pdf && (
          <View style={styles.transactionHistoryDetails}>
            <TouchableOpacity onPress={() => Linking.openURL(item?.pdf)}>
              <Text style={styles.transactionPriceText}>Download Invoice</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackHeader title={profile?.docs?.firstName} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: verticalScale(5),
        }}>
        <View>
          <Image
            style={styles.imgSearch}
            source={{uri: profile?.docs?.image}}
            resizeMode="stretch"
          />
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <AppButton
          label="View Profile"
          width={horizontalScale(165)}
          color={COLORS.PRIMARY}
          onPress={() => navigation.navigate('OpenProfile')}
        />
        <AppButton
          label="Logout"
          width={horizontalScale(165)}
          color={COLORS.SECONDARY}
          onPress={() => dispatch(AppActions.logout())}
        />
      </View>
      <View
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          marginHorizontal: horizontalScale(20),
          marginVertical: verticalScale(10),
          borderColor: COLORS.BLACK,
        }}></View>
      <ScrollView style={{marginBottom: 20}}>
        <Text style={styles.textPlan}>Your Plan</Text>
        {check_Subscription?.length == 0 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            <Text>No Subsription Found</Text>
          </View>
        ) : (
          <FlatList
            data={check_Subscription}
            renderItem={renderPlans}
            keyExtractor={item => item}
          />
        )}
        <View style={{flex: 1}}>
          <Text style={[styles.textPlan, {marginTop: verticalScale(15)}]}>
            Transaction History
          </Text>
          {transaction == undefined ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text>No Transections Found</Text>
            </View>
          ) : (
            <FlatList
              data={transaction}
              renderItem={renderTransection}
              keyExtractor={item => item}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  imgSearch: {
    borderRadius: 100,
    height: 120,
    width: 120,
  },
  textarea: {
    fontSize: 26,
    paddingVertical: verticalScale(15),
  },
  textPlan: {
    fontSize: 20,
    paddingLeft: 20,
  },
  planContainer: {
    marginHorizontal: moderateScale(25),
    marginVertical: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: COLORS.SECONDARY,
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  planTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(15),
    paddingTop: horizontalScale(10),
  },
  planTitleText: {
    fontFamily: FONTS.w500,
    fontSize: moderateScale(18),
    color: COLORS.BLACK,
  },
  planTitleDescription: {
    fontFamily: FONTS.w700,
    fontSize: moderateScale(22),
    color: COLORS.SECONDARY,
  },
  planPrice: {
    marginHorizontal: horizontalScale(15),
  },
  planPriceText: {
    fontFamily: FONTS.w700,
    fontSize: moderateScale(22),
    color: COLORS.PRIMARY,
  },
  planPerMonthText: {
    color: COLORS.BLACK,
  },
  planDetails: {
    marginHorizontal: horizontalScale(15),
  },
  planDetailsText: {
    fontFamily: FONTS.w300,
    fontSize: moderateScale(16),
    color: COLORS.BLACK,
  },
  unsubStyle: {
    color: COLORS.SECONDARY,
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    fontFamily: FONTS.w500,
    fontSize: moderateScale(16),
    textDecorationLine: 'underline',
  },
  transactionHistoryContainer: {
    marginHorizontal: moderateScale(25),
    marginVertical: moderateScale(10),
    borderRadius: 10,
    backgroundColor: COLORS.WHITE,
    elevation: 5,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    padding: moderateScale(10),
  },
  transactionHistoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageContainer: {
    flex: 1,
    marginRight: moderateScale(10),
  },
  messageText: {
    color: COLORS.BLACK,
    fontFamily: FONTS.w500,
    fontSize: moderateScale(20),
  },
  dateContainer: {
    marginLeft: moderateScale(5),
  },
  dateText: {
    color: COLORS.GREY,
    fontFamily: FONTS.w300,
    fontSize: moderateScale(14),
  },
  transactionHistoryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10, // Add padding for spacing
  },
  transactionPriceText: {
    fontFamily: FONTS.w700,
    fontSize: moderateScale(22),
    color: COLORS.PRIMARY,
  },
  paymentStatusView: {
    backgroundColor: COLORS.PAYMENTBACKGROUND,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(12),
    borderRadius: 5,
  },
  paymentStatusText: {
    color: COLORS.BLACK,
  },
});
