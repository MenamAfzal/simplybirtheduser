import {Alert} from 'react-native';
import URL from '../../../constants/url';
import RestClient from '../../../helpers/RestClient';
import {ACTION_TYPE} from '../../actionTypes';
import * as AppActions from '../../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Action called when remember me field is checked on the login page to save the user credentials in the redux store */
export const rememberUser = data => ({
  type: ACTION_TYPE.REMEMBER_USER,
  payload: data,
});

/* Action called to save the token in the redux store */
export const setToken = data => ({
  type: ACTION_TYPE.SET_TOKEN,
  payload: data,
});

/* Action called to store user data in the redux store */
export const setUser = data => ({
  type: ACTION_TYPE.SET_USER,
  payload: data,
});

export const setForgotpass = value => {
  console.log('value', value);
  if (value == true || value == false) globalThis.forgotpass = value;
  return !!globalThis.forgotpass;
};

/* Login action */
export function login(param, navigation) {
  return async (dispatch, getState) => {
    console.log("hiiii em here")
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      console.log("tryingg")
      let json = await RestClient.postCall(
        `${URL.BASE_URL}${URL.LOGIN}`,
        param,
      );

      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log('json from login', json);
      /* Handle success data */
      if (json.status == 'Success') {
        dispatch({
          type: ACTION_TYPE.SET_LOGIN,
          payload: json,
        });
        dispatch({
          type: ACTION_TYPE.SET_TOKEN,
          payload: json?.data?.token,
        });
        dispatch(setUser(json?.data));
      } else {
        /* Handle error data */
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        Alert.alert(json?.data?.message);
        console.log(json?.data?.message, 'Problem in login');
      }
    } catch (error) {
      console.log("error", error)
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      if (error == undefined) {
        Alert.alert(' Error from Server');
      } else if (error?.data?.message == 'Phone Not Verified') {
        Alert.alert(
          error?.data?.message,
          '',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('EmailOtp');
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(error?.data?.message);
      }
    }
  };
}

/* Login action */
export function socialLogin(param, navigation) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.postCall(
        `${URL.BASE_URL}${URL.SOCIALLOGIN}`,
        param,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log('json from login', json);
      /* Handle success data */
      if (json.status == 'Success') {
        dispatch({
          type: ACTION_TYPE.SET_LOGIN,
          payload: json,
        });
        dispatch({
          type: ACTION_TYPE.SET_TOKEN,
          payload: json?.data?.token,
        });
        dispatch(setUser(json?.data));
      } else {
        /* Handle error data */
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        Alert.alert(json?.data?.message);
        console.log(json?.data?.message, 'Problem in login');
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log('error from login(social Login)', error);

      // if (error?.data?.message == 'Phone Not Verified') {
      //   Alert.alert(
      //     error?.data?.message,
      //     '',
      //     [
      //       {
      //         text: 'Ok',
      //         onPress: () => {
      //           navigation.navigate('EmailOtp');
      //         },
      //       },
      //     ],
      //     {cancelable: false},
      //   );
      // } else {
      Alert.alert(error?.data?.message);
      // }
    }
  };
}

/* Action called during sign up*/
export function signUp(param, navigation, token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.postCall(
        `${URL.BASE_URL}${URL.SIGNUP}`,
        param,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json?.status == 'Success') {
        dispatch(setToken(json?.data?.token));
        console.log('data from sign up', json);
        Alert.alert(
          json?.message,
          '',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('EmailOtp');
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        /* Handle error data */
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        console.log(json, 'error from signup');
        Alert.alert(error?.data?.message);
      }
    } catch (error) {
      console.log(error, 'error from signup');
      Alert.alert(error?.data?.message);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

/* Action called during sign up for otp verification, as the app has both email and phone number verification, there are two cases in this action */
export function otpVerify(param, navigation, token, type) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json;
      if (type == 'Email') {
        json = await RestClient.postCall(
          `${URL.BASE_URL}${URL.EMAIL_OTP}`,
          param,
          token,
        );
      } else if (type == 'Phone') {
        console.log('action', token);
        json = await RestClient.postCall(
          `${URL.BASE_URL}${URL.PHONE_OTP}`,
          param,
          token,
        );
      }
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.status == 'Success') {
        console.log('json from emial verification', json);
        //  Save the new token if it exists in the response
        if (json.data.token) {
          dispatch(setToken(json.data.token));
        }

        console.log('token from otp', json.data.token);

        if (type == 'Email') {
          Alert.alert(
            'Email verified',
            'Move to verify phone',
            [
              {
                text: 'Ok',
                onPress: () => {
                  navigation.navigate('PhoneOtp');
                },
              },
            ],
            {cancelable: false},
          );
        } else if (type == 'Phone') {
          Alert.alert(
            'Success',
            'Phone verified',
            [
              {
                text: 'Ok',
                onPress: () => {
                  let check = setForgotpass();
                  console.log('chek', check);
                  check
                    ? (setForgotpass(false),
                      navigation.reset({
                        index: 0,
                        routes: [{name: 'ResetPassword'}],
                      }))
                    : navigation.reset({
                        index: 0,
                        routes: [{name: 'ProfileSetup'}],
                      });
                },
              },
            ],
            {cancelable: false},
          );
        }
      } else {
        /* Handle error data */
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        Alert.alert('Check your Otp');
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(error);
      Alert.alert(error?.data?.message);
    }
  };
}

/* Action called during sign up to resend otp */
export function resendOtp(token, type) {
  console.log(type);
  console.log(token);

  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    let json;
    try {
      if (type == 'Email') {
        json = await RestClient.postCallNoData(
          `${URL.BASE_URL}${URL.RESENDEMAILOTP}`,
          token,
        );
      } else if (type == 'Phone') {
        json = await RestClient.postCallNoData(
          `${URL.BASE_URL}${URL.RESENDPHONEOTP}`,
          token,
        );
      }
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.status == 'Success') {
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        dispatch(setToken(json?.data?.token));
        if (type == 'Email') {
          Alert.alert('Resent OTP to your email');
        } else if (type == 'Phone') {
          Alert.alert('Resent OTP to your phone');
        }
      } else {
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        /* Handle error data */
        console.log('error from resend');
        // Alert.alert(json?.message);
      }
    } catch (error) {
      console.log('cautch from resend otp', error);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

/* Action called when user clicks on forgot password button on login page */
export function forgotPassword(param, navigation) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.postCall(
        `${URL.BASE_URL}${URL.FORGOT_PASSWORD}`,
        param,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.status == 'Success') {
        dispatch(setToken(json?.data?.token));

        setForgotpass(true);

        Alert.alert(
          json?.message,
          '',
          [
            {
              text: 'Verification code sent',
              text: 'Ok',
              onPress: () => {
                navigation.navigate('EmailOtp');
              },
            },
          ],
          {cancelable: false},
        );

        // navigation.navigate('ResetPassword');
      } else {
        /* Handle error data */
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        Alert.alert(json.message);
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

/* Action called when user tries to reset the password */
export function resetPassword(param, navigation, token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.postCall(
        `${URL.BASE_URL}${URL.RESET_PASSWORD}`,
        param,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.status == 'Success') {
        dispatch(setToken(json.data.token));
        Alert.alert(
          'Success',
          'Your password has been changed',
          [
            {
              text: 'Ok',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        /* Handle error data */
        Alert.alert(json.message);
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

/* Action called when user information is updated, or set duing sign up */
export function updateUser(param, token, cb = () => {}) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.putCallFormdata(
        `${URL.BASE_URL}${URL.UPDATE_USER}`,
        param,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json?.status == 'Success') {
        console.log(json, 'json from update user');
        // dispatch({
        //   type: ACTION_TYPE.SET_LOGIN,
        //   payload: json,
        // });
        // dispatch({
        //   type: ACTION_TYPE.SET_TOKEN,
        //   payload: json?.data?.token,
        // });
        Alert.alert(json?.message);
        cb(json);
      } else {
        /* Handle error data */
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        Alert.alert(json?.message);
        cb(json);
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log('catch---->', error);
      Alert.alert(error?.message);
      cb(null);
    }
  };
}

/* Logout action */
export function logout() {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ACTION_TYPE.AUTH_RESET,
      });
      (async () => {
        try {
          await AsyncStorage.setItem('isSubscribed', 'false');
          console.log('isSubscribed set to true in AsyncStorage');
        } catch (error) {
          console.error('Error setting isSubscribed in AsyncStorage: ', error);
        }
      })();
    } catch (error) {
      console.log('Error during logout ', error);
    }
  };
}

/* Action called when user tries to delete the account */
export function deleteAccount(param, navigation, token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.postCall(
        `${URL.BASE_URL}${URL.DELETE_ACCOUNT}`,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.status == 'Success') {
        Alert.alert(
          'Success',
          'Your Account has Deleted Successfully',
          [
            {
              text: 'Ok',
              onPress: () => {
                dispatch(AppActions.logout());
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        /* Handle error data */
        Alert.alert(json?.data?.message);
      }
    } catch (error) {
      console.log('error form delete account', error);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

deleteAccount;
