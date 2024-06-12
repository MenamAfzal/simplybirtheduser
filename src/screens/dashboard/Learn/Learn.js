import {View, Text, useWindowDimensions, ScrollView} from 'react-native';
import React from 'react';
import {Card, Image} from 'react-native-elements';
import BackHeader from '../../../components/BackHeader';
import styles from '../styles';
import RenderHTML from 'react-native-render-html';

const RenderLearn = props => {
  const {width} = useWindowDimensions();

  const fullBlogTitle = props?.route?.params?.item?.blogTitle;

  // Function to truncate the title to the first 5 words
  const truncateTitle = (title, wordsCount) => {
    const words = title.split(' ');
    if (words.length > wordsCount) {
      return words.slice(0, wordsCount).join(' ') + '...';
    }
    return title;
  };

  // Truncate the title to the first 5 words
  const truncatedTitle = truncateTitle(fullBlogTitle, 6);

  return (
    <>
      <BackHeader title={truncatedTitle} />
      <View style={{padding: 10, flex: 1}}>
        <ScrollView>
          <View containerStyle={styles?.card}>
            <Image
              style={[styles.imageload, {height: 170, width: 390}]}
              resizeMode="cover"
              loadingStyle={styles.loadingstyle}
              source={{uri: props?.route?.params?.item?.coverImage}} // Assuming your API response structure is similar
            />
          </View>
          <Text style={styles.Title}>
            {props?.route?.params?.item?.blogTitle}
          </Text>

          <View style={{paddingHorizontal: 10}}>
            <RenderHTML
              contentWidth={width}
              source={{html: props?.route?.params?.item?.blogContent}}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default RenderLearn;
