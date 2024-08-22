import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {FILE_URL} from '../../../constants/url';
import RenderHtml from 'react-native-render-html';
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
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';
import {Card} from 'react-native-elements';
import {FONTS, COLORS, IMAGES} from '../../../constants';
import * as AppActions from '../../../redux/actions';
import Video from 'react-native-video';
import SearchBox from '../../../components/SearchBox';
import {useDispatch, useSelector} from 'react-redux';
import authReducer from '../../../redux/reducers/auth/index';
import dashReducer from '../../../redux/reducers/dash/index';
import {quiz_list} from '../../../redux/actions/dash/index';
import AppButton from '../../../components/AppButton';
import Profile from '../../../components/Profile';

export default function Learn({navigation}) {
  const dispatch = useDispatch();

  const {navigate} = useNavigation();
  const [tabSelectedIndex, setTabSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const textInputRef = useRef(null);
  const videoPlayer = useRef();
  const handleCustomIndexSelect = index => {
    setTabSelectedIndex(index);
  };
  const token = useSelector(state => state.authReducer.token);
  const blogs = useSelector(state => state.dashReducer.blogs_list);
  const quiz = useSelector(state => state.dashReducer.quiz_list);
  console.log(blogs, 'fdgdfgdf');
  console.log('quiz---->', quiz);

  useEffect(() => {
    dispatch(AppActions.blogs_list(token));
    dispatch(AppActions.quiz_list(token)); // Dispatch the action to fetch blogs
  }, []);
  // Assuming you have a reducer for blogs data
  //  console.log('blogsData', blogsData)
  const handleStartQuiz = async link => {
    const support = await Linking.canOpenURL(link);

    if (support) {
      await Linking.openURL(link);
    } else {
      console.log('error in finding');
    }
  };

  const {width} = useWindowDimensions();
  const VideosList = [];

  const Blogs = () => {
    return (
      <View style={styles.browseView}>
        <SearchBox
          value={searchQuery}
          placeholder="Search blogs"
          onChangeText={text => setSearchQuery(text)}
          onPress={Keyboard.dismiss}
        />
        {blogs?.docs?.length > 0 ? (
          <FlatList
            data={blogs?.docs?.filter(
              item =>
                item?.blogTitle
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                item?.blogContent
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            )}
            contentContainerStyle={{
              paddingBottom: verticalScale(140),
            }}
            showsVerticalScrollIndicator={false}
            // data={blogs.docs} // Use the data fetched from Redux store
            renderItem={({item}) => (
              <View>
                <Card containerStyle={[styles.card, {}]}>
                  <Image
                    style={styles.imageload}
                    resizeMode="cover"
                    loadingStyle={styles.loadingstyle}
                    source={{uri: item?.coverImage}} // Assuming your API response structure is similar
                  />
                  <View>
                    <AppButton
                      label={`${item?.blogTitle?.substring(0, 29)}${
                        item?.blogTitle?.length > 29 ? '...' : ''
                      }`}
                      width={'100%'}
                      onPress={() => navigate('RenderLearn', {item: item})}
                    />
                  </View>
                </Card>
              </View>
            )}
            keyExtractor={item => item._id} // Update this based on your data structure
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
              justifyContent: 'center',
            }}>
            <Text>No Blog Available</Text>
          </View>
        )}
      </View>
    );
  };
  const Quiz = () => {
    return (
      <View style={styles.browseView}>
        <SearchBox
          value={searchQuery}
          placeholder="Search quiz"
          onChangeText={text => setSearchQuery(text)}
          onPress={Keyboard.dismiss}
        />
        {quiz.docs?.length > 0 ? (
          <FlatList
            data={quiz?.docs?.filter(
              item =>
                item?.quizTitle
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                item?.quizContent
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            )}
            contentContainerStyle={{
              paddingBottom: verticalScale(140),
            }}
            showsVerticalScrollIndicator={false}
            // data={quiz.docs} // Use the data fetched from Redux store
            renderItem={({item}) => (
              <Card containerStyle={styles.card}>
                <View>
                  <Image
                    source={{uri: item?.coverImage}}
                    height={verticalScale(220)}
                    width={horizontalScale(380)}
                    borderRadius={moderateScale(10)}
                  />

                  {/* Assuming you have appropriate fields in your quiz data */}
                  <Text style={styles.Title}>{item.quizTitle}</Text>
                  <Text style={styles.Description}>{item.quizContent}</Text>

                  {/* Add other relevant fields here */}
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: COLORS.PRIMARY,
                      alignItems: 'center',
                    }}
                    onPress={() => handleStartQuiz(item.uri)}>
                    <Text style={{color: COLORS.WHITE, fontSize: 18}}>
                      Start Quiz
                    </Text>
                  </TouchableOpacity>
                </View>
              </Card>
            )}
            keyExtractor={item => item._id} // Update this based on your data structure
          />
        ) : (
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
              justifyContent: 'center',
            }}>
            <Text>No Quiz Available</Text>
          </View>
        )}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.outerView}>
        <Text style={styles.learn}> Learn </Text>
        <SegmentedControlTab
          values={['Blog', 'Quiz']}
          selectedIndex={tabSelectedIndex}
          onTabPress={handleCustomIndexSelect}
          borderRadius={moderateScale(50)}
          tabsContainerStyle={styles.tabsContainer}
          tabStyle={styles.tabs}
          activeTabStyle={{backgroundColor: COLORS.PRIMARY}}
          tabTextStyle={styles.tabText}
          activeTabTextStyle={{color: 'white'}}
        />
      </View>
      <View style={styles.segmentedTab}>
        {tabSelectedIndex === 0 && Blogs()}
        {tabSelectedIndex === 1 && Quiz()}
      </View>
    </SafeAreaView>
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
    marginBottom: verticalScale(132),
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
    shadowOffset: {width: 0, height: 5},
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
});
