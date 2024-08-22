import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../styles';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  moderateScale,
  verticalScale,
  horizontalScale,
} from '../../../utils/Metrics';
import Background from '../../../components/Background';
import AddCard from '../../../components/AddCard';
import {useDispatch, useSelector} from 'react-redux';
import * as AppActions from '../../../redux/actions';
import ListCards from '../../../components/ListCards';
import {useNavigation, CommonActions} from '@react-navigation/native';

export default function Payment({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const subscriptionStatus = useSelector(
    state => state.authReducer.isSubscribed,
  );
  const checkSub = useSelector(state => state.authReducer.checkSub);

  const {selectedPlan} = route.params;

  const [apiPayload, setApiPayload] = useState();

  const [verificationURL, setVerificationURL] = useState(null);

  console.log('selectedPlan', selectedPlan);

  const [visibleModal, setVisiblemodal] = useState(false);

  const showModal = () => {
    setVisiblemodal(true);
    setTimeout(() => {
      setVisiblemodal(false);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Drawer',
              state: {
                routes: [{name: 'Dashboard'}],
              },
            },
          ],
        }),
      );
    }, 1500);
  };

  const handleCardPress = card => {
    // Perform action with the clicked card details
    console.log(card, 'select card');
    if (apiPayload?.card == null) {
      setApiPayload({
        priceId: selectedPlan?.default_price_data?.price?.id,
        startprice: selectedPlan?.starting_price_data?.price?.id,
        card: card?.id,
        productId: selectedPlan?.stripeProductId,
      });
    } else {
      setApiPayload({
        card: null,
      });
    }
  };

  // Function to handle Pay button click
  const handlePay = () => {
    if (apiPayload?.card == null) {
      Alert.alert('No card selected');
    } else {
      dispatch(AppActions.subscribePlanCall(apiPayload, token)).then(
        response => {
          console.log(response?.data, 'response, handlePay');
          if (response?.status == 'Failed') {
            console.log(response);
          } else if (response?.data?.returnURL) {
            Linking.openURL(
              response?.data?.returnURL?.use_stripe_sdk?.stripe_js,
            );
            showModal();
            setIsSubscribed();
            dispatch(AppActions.checkSubscriptionCall(token));
          } else {
            showModal();
            setIsSubscribed();
          }
        },
      );
    }
  };

  const setIsSubscribed = async () => {
    try {
      await AsyncStorage.setItem('isSubscribed', 'true');
      console.log('isSubscribed set to true in AsyncStorage');
    } catch (error) {
      console.error('Error setting isSubscribed in AsyncStorage: ', error);
    }
  };

  return (
    <View
      style={{
        ...styles.container,
      }}>
      <Background />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={innerStyles.returnButton}>
        <Image source={IMAGES.BACK_ARROW} />
        <Text style={innerStyles.returnButtonText}>Return</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Payment detail</Text>
      <View style={innerStyles.details}>
        <Text style={innerStyles.headings}>Plan name</Text>
        <Text style={innerStyles.values}>{selectedPlan?.name}</Text>
      </View>
      <View style={innerStyles.details}>
        <Text style={innerStyles.headings}>Plan type</Text>
        <Text style={innerStyles.values}>{selectedPlan?.type}</Text>
      </View>
      <View style={innerStyles.details}>
        <Text style={innerStyles.headings}>Recurring</Text>
        <Text style={innerStyles.values}>
          {selectedPlan?.default_price_data?.recurring?.interval == 'month'
            ? 'Monthly'
            : 'Yearly'}
        </Text>
      </View>
      <View style={innerStyles.details}>
        <Text style={innerStyles.headings}>Total payment </Text>
        <Text style={innerStyles.priceStyle}>
          ${selectedPlan?.default_price_data?.unit_amount}
        </Text>
      </View>
      <AppButton
        label="Pay"
        onPress={() => {
          handlePay();
        }}
      />
      <View style={innerStyles.details}>
        <Text style={styles.header}>Saved cards</Text>
        <AddCard />
      </View>

      <ListCards onPress={card => handleCardPress(card)} />

      <Modal visible={visibleModal} transparent={true} animationType="fade">
        <View style={innerStyles.modalContainer}>
          <View style={innerStyles.modalInnerView}>
            <View style={innerStyles.checkImageView}>
              <Image source={IMAGES.TICK} />
            </View>
            <Text style={innerStyles.paymentSuccessView}>
              Payment Successful!
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const innerStyles = StyleSheet.create({
  headings: {
    fontFamily: FONTS.w400,
    fontSize: moderateScale(24),
    color: 'rgba(55, 53, 65, 1)',
    marginVertical: verticalScale(10),
  },
  values: {
    fontFamily: FONTS.w400,
    fontSize: moderateScale(20),
    color: 'rgba(55, 53, 65, 1)',
    marginVertical: verticalScale(10),
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceStyle: {
    fontFamily: FONTS.w800,
    fontSize: 26,
    color: COLORS.SECONDARY,
    marginVertical: verticalScale(10),
  },
  modalContainer: {
    flex: 1,
    top: 290,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  modalInnerView: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    margin: moderateScale(8),
    borderColor: COLORS.PRIMARY,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    height: verticalScale(190),
    width: horizontalScale(348),
  },
  checkImageView: {
    backgroundColor: COLORS.PRIMARY,
    height: verticalScale(120),
    width: horizontalScale(120),
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: -40,
    left: horizontalScale(110),
  },
  paymentSuccessView: {
    color: COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: FONTS.w700,
    fontSize: moderateScale(30),
  },
  returnButton: {
    alignSelf: 'flex-start',
    borderRadius: 5,
    marginBottom: verticalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  returnButtonText: {
    fontFamily: FONTS.w600,
    fontSize: moderateScale(18),
    marginLeft: horizontalScale(10),
  },
});
