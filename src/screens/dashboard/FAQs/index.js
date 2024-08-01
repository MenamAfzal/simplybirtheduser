import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackHeader from '../../../components/BackHeader';
import {COLORS} from '../../../constants';
import {moderateScale} from '../../../utils/Metrics';
import {FlatList} from 'react-native-gesture-handler';
import * as AppActions from '../../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

export default function FAQs() {
  const {navigate, goBack} = useNavigation();


  const dispatch = useDispatch();
  

  const token = useSelector((state) => state.authReducer.token);
  const faq = useSelector((state) => state.dashReducer.getfaq);
  console.log('FAQ---->', faq );

  useEffect(() => {
    dispatch(AppActions.faqCall(token));
  }, [dispatch, token]);
  
  const data = [
    {
      question: 'How to upload video?',
      value:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      question: 'How to upload video?',
      value:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      question: 'How to upload video?',
      value:
        'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    },
    {
      question: 'How to upload video?',
      value:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    {
      question: 'How to upload video?',
      value:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    },
    {
      question: 'How to upload video?',
      value:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    },
    {
      question: 'How to upload video?',
      value:
        "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
    },
  ];
  return (
    <View style={styles.mainView}>
      <BackHeader title="FAQ" />
      <View style={styles.innerView}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={faq?.data?.docs}
          renderItem={({item, index}) => {
            return (
              <View style={styles.flatListView}>
                {/* <View style={styles.indexView}>
                  <Text style={styles.questionTextStyle}>
                    {index + 1 + '.'}
                  </Text>
                </View> */}
                <View>
                  <View style={styles.questionView}>
                    <Text style={styles.questionTextStyle}>
                      {item?.question}
                    </Text>
                  </View>
                  <View style={styles.valueView}>
                    <Text style={styles.textStyle}>{item?.answer}</Text>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  innerView: {
    flex: 1,
    padding: moderateScale(20),
  },
  textStyle: {
    fontSize: moderateScale(19),
    fontWeight: '300',
    marginBottom: moderateScale(20),
  },
  flatListView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: moderateScale(30),
  },
  indexView: {},
  valueView: {
    flex: 1,
    paddingHorizontal: moderateScale(12),
  },
  questionView: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  questionTextStyle: {
    fontSize: moderateScale(22),
    fontWeight: '500',
    marginBottom: moderateScale(5),
    color: COLORS.BLACK,
  },
});
