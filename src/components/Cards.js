import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../constants';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';

const Cards = props => {
  const {
    allData,
    planType,
    toggleCard,
    toggleSelect,
    selectedPlan,
    isOpen,
    setIsOpen,
  } = props;

  const renderDescriptionItems = description => {
    return description?.map((item, index) => (
      <Text key={index}>
        {'\u25CF '}
        {item}
      </Text>
    ));
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor:
          selectedPlan?._id == allData?._id
            ? COLORS.SHADOW
            : 'rgba(255, 255, 255, 1)',
        borderWidth: selectedPlan?._id == allData?._id ? 2 : 0,
        borderColor:
          selectedPlan?._id == allData?._id
            ? 'rgba(216, 119, 119, 1)'
            : 'rgba(176, 176, 176, 0)',
      }}
      onPress={() => {
        props.onSelect(allData);
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.planText}>{allData?.type}</Text>
        <Text style={styles.titleText}>{allData?.name}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.priceText}>
          ${allData?.default_price_data?.unit_amount}
        </Text>
        <Text style={{...styles.priceText, color: 'rgba(0, 0, 0, 0.75)'}}>
          {planType}
        </Text>
      </View>
      <View style={{marginBottom: 5}}>
        {isOpen == allData?._id
          ? renderDescriptionItems(allData?.description)
          : null}
        <TouchableOpacity
          onPress={() => setIsOpen(isOpen == null ? allData?._id : null)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            marginTop: 5,
          }}>
          <Text style={{color: COLORS.PRIMARY}}>See all benefits</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
    margin: moderateScale(8),
    width: horizontalScale(380),
    borderRadius: moderateScale(25),
  },
  planText: {
    fontFamily: FONTS.w500,
    fontSize: moderateScale(18),
    color: 'rgba(0, 0, 0, 0.75)',
  },
  titleText: {
    fontFamily: FONTS.w700,
    fontSize: moderateScale(22),
    color: 'rgba(216, 119, 119, 1)',
  },
  priceText: {
    fontSize: moderateScale(22),
    fontFamily: FONTS.w500,
    color: COLORS.PRIMARY,
  },
});

export default Cards;
