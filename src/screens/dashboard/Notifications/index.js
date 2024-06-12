import moment from 'moment';
import React, {useEffect} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import BackHeader from '../../../components/BackHeader';
import {COLORS} from '../../../constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../redux/actions';

const Notifications = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);

  const notify = useSelector(state => state.dashReducer.notification);

  useEffect(() => {
    dispatch(AppActions.notification(token));
  }, [dispatch, token]);

  return (
    <View style={styles.mainView}>
      <BackHeader title="Notifications" />
      {notify?.length > 0 ? (
        <FlatList
          data={notify}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <Pressable style={styles.innerView}>
                {/* Code to render the day of the message sent begins */}
                {moment(item?.createdAt).format('MMM Do YY') ==
                  moment().format('MMM Do YY') && (
                  <View style={styles.dayView}>
                    <Text style={styles.dayText}>Today</Text>
                  </View>
                )}
                {moment(item?.createdAt).format('MMM Do YY') ==
                  moment().subtract(1, 'days').format('MMM Do YY') && (
                  <View style={styles.dayView}>
                    <Text style={styles.dayText}>Yesterday</Text>
                  </View>
                )}
                {moment(item?.createdAt).format('MMM Do YY') <=
                  moment().subtract(2, 'days').format('MMM Do YY') && (
                  <View style={styles.dayView}>
                    <Text style={styles.dayText}>{item.date}</Text>
                  </View>
                )}
                {/* Code to render the day of the message sent ends */}

                {/* Code to render the message sent begins */}
                <View style={styles.messageView}>
                  <Text style={styles.messageText}>{item?.content}</Text>
                </View>
                {/* Code to render the message sent ends */}

                {/* Code to render the time of message sent begins */}
                <View style={styles.timeView}>
                  <Text style={styles.timeText}>
                    {moment(item?.createdAt).format('MMM Do YY , HH MM')}
                  </Text>
                </View>
                {/* Code to render the time of message sent ends */}
              </Pressable>
            );
          }}
          keyExtractor={item => item.id}
        />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 60,
          }}>
          <Text style={[styles.dayText, {color: 'grey'}]}>
            You're All Caught Up
          </Text>
        </View>
      )}
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  innerView: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(5),
  },
  dayView: {
    marginVertical: verticalScale(5),
  },
  messageView: {},
  timeView: {
    marginTop: verticalScale(5),
  },
  dayText: {
    fontWeight: '500',
    fontSize: moderateScale(18),
    color: COLORS.RED,
  },
  messageText: {
    fontSize: moderateScale(18),
    fontWeight: '300',
  },
  timeText: {
    fontSize: moderateScale(12),
    fontWeight: '300',
    marginTop: moderateScale(5),
    color: 'rgba(0, 0, 0, 0.5)',
  },
});
