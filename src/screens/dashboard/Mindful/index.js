import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FILE_URL } from '../../../constants/url';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Linking,
  Alert,
  ScrollView,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';
import { Card } from 'react-native-elements';
import { FONTS, COLORS, IMAGES } from '../../../constants';
import * as AppActions from '../../../redux/actions';
import Video from 'react-native-video';
import SearchBox from '../../../components/SearchBox';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from '../../../redux/reducers/auth/index';
import dashReducer from '../../../redux/reducers/dash/index';
import { quiz_list } from '../../../redux/actions/dash/index';
import Headers from '../../../components/Headers';
import BackHeader from '../../../components/BackHeader';
import Profile from '../../../components/Profile';

export default function Mindful({ navigation, route }) {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');

  const { navigate } = useNavigation();
  const sessionData = route.params?.sessionData;
  const token = useSelector(state => state.authReducer.token);
  const get_sessions = useSelector(state => state.dashReducer.get_sessions);

  console.log('sessions(mindful)---->', sessionData);

  useEffect(() => {
    dispatch(AppActions.get_sessions(token));
    // Dispatch the action to fetch blogs
  }, []);

  const handleStartLink = async link => {
    const isSupported = link.includes('http');
    if (isSupported) {
      await Linking.openURL(link);
    } else {
      await Linking.openURL('https://' + link);
    }
  };

  return (
    <>
      <ScrollView>
        <BackHeader />
        <View style={styles.browseView}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 22,
              alignSelf: 'center',
              margin: 15,
            }}>
            Session
          </Text>
          <Profile
            image={sessionData?.coverImage}
            width={'100%'}
            height={200}
            borderRadius={10}
          />
          <View>
            <Text style={styles.Title}>{sessionData?.title}</Text>
            <Text style={styles.Description}>
              {''}
              Start Date : {sessionData?.startDate}
            </Text>
            <Text style={styles.Description}>
              {''}
              Start Time : {sessionData?.startTime}
            </Text>
            <Text style={styles.Description}>
              Duration : {sessionData?.duration}
            </Text>
            <Text style={styles.Description}>{sessionData?.description}</Text>
          </View>
          <TouchableOpacity onPress={() => handleStartLink(sessionData?.link)}>
            <View style={styles.startButton}>
              <Text style={styles.startButtonText}>Join</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: horizontalScale(15),
    backgroundColor: COLORS.WHITE,
  },
  outerView: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
    justifyContent: 'space-between',
  },
  browseView: {
    marginBottom: verticalScale(250),
    padding: 9,
  },
  learn: {
    fontSize: moderateScale(27.5),
    marginTop: verticalScale(3),
  },
  tabsContainer: {
    height: verticalScale(44),
    width: horizontalScale(206),
    backgroundColor: COLORS.WHITE,
  },
  tabs: {
    borderColor: COLORS.PRIMARY,
    borderRadius: moderateScale(1),
    alignItems: 'center',
  },
  tabText: {
    color: COLORS.LIGHT_GREY,
    fontFamily: FONTS.w500,
    fontSize: moderateScale(18),
  },
  segmentedTab: {
    marginTop: moderateScale(21),
    margin: 0,
  },
  searchView: {
    flexDirection: 'row',
    height: verticalScale(56),
    justifyContent: 'space-between',
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(6),
    alignItems: 'center',
  },
  searchText: {
    fontSize: moderateScale(19),
    paddingLeft: horizontalScale(10),
    width: horizontalScale(325),
  },
  imgSearch: {
    height: verticalScale(30),
    width: horizontalScale(30),
    marginTop: moderateScale(8),
    marginRight: moderateScale(8),
  },
  card: {
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    margin: moderateScale(8),
    marginBottom: moderateScale(10),
    padding: 0,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    elevation: 5,
  },
  imageload: {
    alignSelf: 'center',
    height: verticalScale(220),
    width: horizontalScale(380),
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    overflow: 'hidden',
  },
  Title: {
    fontSize: moderateScale(21.5),
    fontFamily: FONTS.w700,
    color: COLORS.BLACK,
    marginTop: moderateScale(11),
    paddingLeft: horizontalScale(15),
  },
  Description: {
    fontSize: moderateScale(19.5),
    fontFamily: FONTS.w300,
    flexWrap: 'wrap',
    color: COLORS.GREY,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
    paddingLeft: horizontalScale(15),
  },
  loadingstyle: {
    size: 'large',
    color: COLORS.PRIMARY,
  },
  videoStyle: {
    height: verticalScale(220),
    width: horizontalScale(390),
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    overflow: 'hidden',
  },
  startButton: {
    backgroundColor: '#7EB1B5',
    Padding: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20, // Adjust this margin as needed
    width: 100, // Add this line
    height: 60,
  },
  startButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    top: 15,
  },
});
