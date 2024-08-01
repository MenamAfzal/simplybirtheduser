import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Profile from '../../../components/Profile';
import {moderateScale, verticalScale} from '../../../utils/Metrics';
import styles from '../styles';
import {useSelector, useDispatch} from 'react-redux';
import authReducer from '../../../redux/reducers/auth/index';
import * as AppActions from '../../../redux/actions';

export default function CareTeam() {
  const {navigate, reset} = useNavigation();
  const dispatch = useDispatch();
  const userId = useSelector(state => state.authReducer.loginData?.data?._id);
  const token = useSelector(state => state.authReducer.token);
  const careTeamData = useSelector(state => state.dashReducer.careTeam);

  useEffect(() => {
    dispatch(AppActions.getCaregiverListCall(userId, token));
  }, [dispatch, userId, token]);

  // Function to navigate to CaregiverProfile
  const navigateToCaregiverProfile = item => {
    navigate('CaregiverProfile', {param: item});
    // Assuming 'CaregiverProfile' is the name of your screen in the navigator
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.header}>My Care Team</Text>

        {careTeamData?.length == 0 ? (
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
              justifyContent: 'center',
            }}>
            <Text>No CareGiver Assigned</Text>
          </View>
        ) : (
          <FlatList
            data={careTeamData}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigateToCaregiverProfile(item)}>
                  <View
                    style={[
                      styles.flatlist,
                      {
                        flex: 1,
                        height: verticalScale(92),
                        justifyContent: 'space-between',
                      },
                    ]}>
                    <View style={styles.profileView}>
                      <Profile image={item?.image} />
                    </View>
                    <View style={styles.textView}>
                      <Text
                        style={{
                          ...styles.nameList,
                          fontSize: moderateScale(20),
                        }}>
                        {item.firstName} {item.lastName}
                      </Text>
                      <Text style={styles.descriptionList}>
                        {item.designation}
                      </Text>
                      <Text style={styles.descriptionList}>
                        {item.experience} years
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
