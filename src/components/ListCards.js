import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';
import {COLORS, FONTS} from '../constants';
import * as AppActions from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

export default ListCards = ({onPress}) => {
  const [toggleCard, setToggleCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AppActions.getCardsCall(token));
  }, [allCards]);

  const allCards = useSelector(state => state.dashReducer.cards);

  console.log('allCards', allCards);

  const handleCardPress = card => {
    // Card selection display logic
    if (selectedCard == card) {
      // If the selected card is clicked again, deselect it
      setSelectedCard(null);
      onPress(null);
    } else {
      // Otherwise, select the clicked card
      setSelectedCard(card);
      onPress(card);
    }

    // Invoke the callback function onPress with the card details
  };

  const handleRemoveCard = card => {
    dispatch(AppActions.deleteCardCall(card.id, token)).then(() => {
      dispatch(AppActions.getCardsCall(token));
    });
  };

  const Item = ({last4, card}) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={[
          styles.item,
          selectedCard == card
            ? {borderWidth: 2, backgroundColor: 'green'}
            : null,
        ]}
        onPress={() => handleCardPress(card)}>
        <Text style={styles.digits}>XXXX-XXXX-XXXX-{last4}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleRemoveCard(card)}
        style={[
          styles.item,
          {backgroundColor: COLORS.SECONDARY, width: horizontalScale(110)},
        ]}>
        <Text style={styles.digits}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {allCards ? (
        <FlatList
          data={allCards.data}
          renderItem={({item}) => <Item last4={item.last4} card={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={[styles.heading, {fontSize: moderateScale(20)}]}>
          No cards added
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: moderateScale(26),
    marginBottom: verticalScale(5),
    fontFamily: FONTS.w600,
  },
  digits: {
    fontFamily: FONTS.w600,
    fontSize: moderateScale(20),
    color: COLORS.WHITE,
  },
  item: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    alignSelf: 'flex-start',
    padding: verticalScale(10),
  },
});
