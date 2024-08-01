import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Profile from '../../../components/Profile';
import SearchBox from '../../../components/SearchBox';
import {COLORS, FONTS} from '../../../constants';
import * as AppActions from '../../../redux/actions';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';
import styles from '../styles';
import {normalize} from 'react-native-elements';

export default function AllChats() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const userId = useSelector(state => state.authReducer.userData._id);
  const chatList = useSelector(state => state.dashReducer.chatList);

  console.log(chatList, 'chatList');

  /* Get the list of people that user can chat with */
  useEffect(() => {
    dispatch(AppActions.getChatList(userId));
  }, [isFocused]);

  const getDateTime = timestamp => {
    /* To compare with the message arrival date */
    const thisDay = moment(new Date()).format('MMMM DD YYYY');
    const thisYear = moment(thisDay).format('YYYY');

    if (timestamp) {
      let year = moment(timestamp).format('YYYY');
      let date = moment(timestamp).format('MMMM DD YYYY');
      let time = moment(timestamp).format('h:mm A');

      if (date == thisDay) {
        // If the message was sent today show time of message
        return time;
      } else if (date < thisDay) {
        // If the message was sent before today show the date
        date = moment(timestamp).format('MMMM DD');
        return date;
      } else if (year < thisYear) {
        // If the message was sent before this year show date with year
        return date;
      }
    }
  };

  handleRefresh = () => {
    setRefreshing(true);
    dispatch(AppActions.getChatList(userId));
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chat</Text>
      <SearchBox
        value={searchQuery}
        placeholder="Search"
        onChangeText={text => setSearchQuery(text)}
        onPress={Keyboard.dismiss}
      />
      {chatList?.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => handleRefresh()}
            />
          }
          data={chatList?.filter(
            item =>
              item?.caregivers?.firstName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              item?.caregivers?.lastName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
          )}
          contentContainerStyle={{
            paddingBottom: verticalScale(75),
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => navigate('ChatScreen', {payload: item})}>
                <View style={innerStyles.flatListContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.profileView}>
                      <Profile
                        image={item?.caregivers?.image}
                        height={moderateScale(60)}
                        width={moderateScale(60)}
                      />
                      <View style={styles.statusContainer}>
                        <View
                          style={{
                            ...styles.status,
                            backgroundColor: item.status
                              ? COLORS.ONLINE
                              : COLORS.OFFLINE,
                          }}
                        />
                      </View>
                    </View>
                    <View style={{flex: 1}}>
                      <View style={innerStyles.textView}>
                        <View style={innerStyles.nameView}>
                          <Text numberOfLines={1} style={innerStyles.userName}>
                            {item?.caregivers?.firstName}{' '}
                            {item?.caregivers?.lastName}
                          </Text>

                          <View>
                            <Text style={innerStyles.time}>
                              {item?.lastMessage
                                ? getDateTime(item?.lastMessage?.createdAt)
                                : null}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View style={innerStyles.lastMessageView}>
                        <View style={{width: '100%'}}>
                          <Text
                            style={innerStyles.lastMessage}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {item?.lastMessage?.message}
                          </Text>
                        </View>
                        {item?.lastMessage?.receiver == userId ? (
                          item?.lastMessage?.isRead ? null : (
                            <View style={innerStyles.unread}>
                              {item.isReadCount != 0 && (
                                <Text style={styles.unreadText}>
                                  {item?.isReadCount}
                                </Text>
                              )}
                            </View>
                          )
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text>No Care Giver Assigned</Text>
        </View>
      )}
    </View>
  );
}

const innerStyles = StyleSheet.create({
  flatListContainer: {
    ...styles.flatlist,
    // justifyContent: 'space-between',
  },
  textView: {
    flex: 1,
    marginHorizontal: horizontalScale(10),
  },
  nameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    ...styles.nameList,
    flex: 1,
    fontSize: moderateScale(20),
  },
  time: {
    color: COLORS.GREY,
    fontSize: moderateScale(14),
    fontFamily: FONTS.w300,
    textAlign: 'center',
  },
  lastMessageView: {
    flex: 1,
    marginHorizontal: horizontalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastMessage: {
    color: COLORS.BLACK,
    fontSize: moderateScale(14),
    fontFamily: FONTS.w300,
  },
  unread: {
    height: moderateScale(25),
    width: moderateScale(25),
    backgroundColor: COLORS.UNREAD_BUBBLE,
    borderRadius: moderateScale(100),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    left: moderateScale(80),
  },
});
