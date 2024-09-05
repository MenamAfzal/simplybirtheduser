import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Platform,
} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../utils/Metrics';
import {COLORS, FONTS} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../redux/actions';
import {CardField, createToken, useStripe} from '@stripe/stripe-react-native';
import {Portal, Modal} from 'react-native-paper';

export default AddCard = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);

  console.log('token(addCard)', token);

  useEffect(() => {
    dispatch(AppActions.getCardsCall(token));
  }, [token]);

  const handleSaveCard = async () => {
    await createToken({type: 'Card'})
      .then(d => {
        console.log('token created', d);
        if (!d.error) {
          dispatch(AppActions.addCardCall({token: d?.token?.id}, token))
            .then(() => {
              dispatch(AppActions.getCardsCall(token));
              setModalVisible(false);
            })
            .catch(error => {
              console.log('add card error', error);
            });
        } else {
          Alert.alert(d?.error?.message);
        }
      })
      .catch(error => {
        Alert.alert('Error from Stripe');
      });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setModalVisible(true)}>
      <View style={styles.emptyCard}>
        <Text style={styles.plusSign}>Add card</Text>
      </View>

      {isModalVisible && (
        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={() => setModalVisible(false)}
            contentContainerStyle={{flex: 1}}>
            <KeyboardAvoidingView
              style={styles.modalContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.modalContent}>
                <CardField
                  postalCodeEnabled={false}
                  placeholders={{
                    number: '4242 4242 4242 4242',
                  }}
                  cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                  }}
                  style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                  }}
                  onCardChange={cardDetails => {
                    console.log('cardDetails', cardDetails);
                  }}
                  onFocus={focusedField => {
                    console.log('focusField', focusedField);
                  }}
                />
                <View style={styles.buttonContainer}>
                  <Button title="Save" onPress={handleSaveCard} />
                  <Button title="Cancel" onPress={handleCancel} color="gray" />
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        </Portal>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  emptyCard: {
    backgroundColor: COLORS.SECONDARY,
    alignSelf: 'flex-start',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(10),
    width: horizontalScale(110),
    marginVertical: verticalScale(5),
  },
  plusSign: {
    fontFamily: FONTS.w600,
    fontSize: moderateScale(20),
    color: COLORS.WHITE,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // translucent background
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    padding: moderateScale(16),
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
