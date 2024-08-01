import React, {useEffect, useState} from 'react';
import Cards from '../../../components/Cards';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONTS} from '../../../constants';
import styles from '../styles';
import * as AppActions from '../../../redux/actions';
import AppButton from '../../../components/AppButton';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/Metrics';
import {ForegroundNotificationHandler} from '../../../utils/PushNotification';

const SubscriptionPlan = ({navigation}) => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.authReducer.loginData);
  const token = useSelector(state => state.authReducer.token);
  const subPlans = useSelector(state => state?.dashReducer?.subPlans);

  const userId = useSelector(state => state.authReducer.loginData?.data?._id);

  const [tabSelectedIndex, setTabSelectedIndex] = useState(0);
  const [flatlistData, setFlatlistData] = useState([]);
  const [toggleCard, setToggleCard] = useState(1000);
  const [toggleSelect, setToggleSelect] = useState(1000);
  const [isPlanSelected, setIsPlanSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleToggle = id => {
    setToggleCard(id === toggleCard ? 1000 : id);
  };

  const handleToggleSelect = id => {
    setToggleSelect(id === toggleSelect ? 1000 : id);
  };

  const handleSelect = () => {
    setIsPlanSelected(!isPlanSelected);
  };

  /* On clicking buy button, check if the user has a plan selected, if so redirect them to the payment page */
  const handleBuy = () => {
    if (selectedPlan == null) {
      Alert.alert('Please select a plan to proceed with payment');
    } else {
      navigation.navigate('Payment', {
        selectedPlan: selectedPlan,
      });
    }
  };

  const renderPlansBasedOnTab = () => {
    if (tabSelectedIndex === 0) {
      // Filter monthly plans
      let monthlyplans =
        subPlans &&
        subPlans?.filter(
          plan => plan?.default_price_data?.recurring?.interval === 'month',
        );
      setFlatlistData(monthlyplans);
    } else {
      // Filter yearly plans
      let yearly =
        subPlans &&
        subPlans?.filter(
          plan => plan?.default_price_data?.recurring?.interval === 'year',
        );
      setFlatlistData(yearly);
    }
  };

  const handleSingleIndexSelect = index => {
    setTabSelectedIndex(index);
    renderPlansBasedOnTab();
  };

  useEffect(() => {
    handleSelect(); // Call the function with initial tab index (0 for monthly, 1 for yearly)
    renderPlansBasedOnTab(); // Render plans based on the initial tab
  }, [subPlans, tabSelectedIndex]);

  useEffect(() => {
    // Fetch data here using dispatch if needed
    dispatch(AppActions.getProductsCall(token));
  }, [userId, token]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={innerStyles.innerModalView}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.modalHeading}>Pick your plan</Text>
          <Text style={styles.modalSubheading}>
            Your plan starts after{' '}
            <Text
              style={{
                fontSize: FONTS.w700,
                fontSize: moderateScale(22),
              }}>
              7 days
            </Text>{' '}
            free trial
          </Text>
          <Text> For the first month you will be charged $5 </Text>
          <Text style={{marginBottom: 20}}>
            {' '}
            irrespective of any plan you choose
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <SegmentedControlTab
            values={['Monthly', 'Yearly']}
            selectedIndex={tabSelectedIndex}
            onTabPress={handleSingleIndexSelect}
            borderRadius={moderateScale(50)}
            tabsContainerStyle={innerStyles.segmentedTabContainerStyles}
            tabStyle={innerStyles.segmentedTabStyles}
            activeTabStyle={{backgroundColor: COLORS.PRIMARY}}
            tabTextStyle={innerStyles.segmentedTabTextStyles}
            activeTabTextStyle={{color: 'white'}}
          />
          <FlatList
            data={flatlistData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?._id}
            style={{height: '65%'}}
            renderItem={({item}) => {
              return (
                <View>
                  <Cards
                    allData={item}
                    planType={tabSelectedIndex === 0 ? '/m' : '/y'}
                    handleToggle={id => handleToggle(id)}
                    onSelect={p => {
                      setSelectedPlan(
                        selectedPlan?._id != p?._id || selectedPlan == null
                          ? p
                          : null,
                      );
                    }}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    selectedPlan={selectedPlan}
                    toggleCard={toggleCard}
                    toggleSelect={toggleSelect}
                    isSelected={isPlanSelected}
                  />
                </View>
              );
            }}
          />
        </View>
        <View style={innerStyles.modalButtonView}>
          <AppButton
            label="SKIP"
            width={horizontalScale(165)}
            color={'rgba(231, 158, 137, 1)'}
            onPress={() => {
              navigation.navigate('Drawer');
            }}
          />
          <AppButton
            label="BUY"
            width={horizontalScale(165)}
            onPress={() => handleBuy()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const innerStyles = StyleSheet.create({
  innerModalView: {
    flex: 1,
    backgroundColor: 'rgba(251, 243, 232, 1)',
    borderRadius: moderateScale(10),
    shadowColor: COLORS.SHADOW,
    height: verticalScale(930),
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },

  segmentedTabContainerStyles: {
    height: verticalScale(50),
    width: horizontalScale(200),
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentedTabStyles: {
    borderColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  segmentedTabTextStyles: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontFamily: FONTS.w500,
    fontSize: moderateScale(18),
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginLeft: moderateScale(10),
  },
});

export default SubscriptionPlan;
