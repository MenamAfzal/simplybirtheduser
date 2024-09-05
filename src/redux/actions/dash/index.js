import RestClient from '../../../helpers/RestClient';
import {ACTION_TYPE} from '../../actionTypes';
import URL from '../../../constants/url';
import {Alert} from 'react-native';
import * as AppActions from '../../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Clear the chat when user moves out of chat screen */
export const clearChat = () => ({
  type: ACTION_TYPE.CLEAR_CHAT,
});

/* Action called when the app pulls subscription tier lists from stripe */
export function getProductsCall(token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      console.log(token, 'token');
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.GET_SUBSCRIPTION_PLANS}`,
        token,
      );
      console.log('plans-------->>>', json);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});

      /* Handle success data */
      if (json.messageID == 200) {
        dispatch({
          type: ACTION_TYPE.SET_SUBSCRIPTION_PLANS,
          payload: json.data,
        });
      } else if (json?.messageID == 500) {
        console.log('error', json?.data?.message);
        Alert.alert('Server connection error');
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});

      if (error?.data?.message == 'Invalid Token')
        dispatch(AppActions.logout(), {
          type: ACTION_TYPE.TOGGLE_LOADER,
          payload: false,
        });
      else {
        Alert.alert(error?.data?.message);
        console.log(error);
      }
    }
  };
}

/* Action called when app pulls saved credit/debit cards in the payment page from the backend */
export function getCardsCall(token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.GET_CARDS}`,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.messageID == 200) {
        dispatch({
          type: ACTION_TYPE.SET_CARDS,
          payload: json.data,
        });
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      } else if (json.messageID > 500) {
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        Alert.alert('Server connection error');
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(error, ' error form get cards call');
      Alert.alert(error?.data?.message);
    }
  };
}

/* Action called when user saves a credit/debit card in the payment page */
export function addCardCall(param, token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.postCall(
        `${URL.BASE_URL}${URL.ADD_CARD}`,
        param,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      if (json.status == 'Success') {
        Alert.alert('Card added succesfully');
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      } else {
        Alert.alert('Failed to add your details');
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log('error form add card', error);
      Alert.alert('Error', error?.data?.message);
    }
  };
}

export function slot_lock(param, token) {
  return async (dispatch, getState) => {
    try {
      let json = await RestClient.postCall(
        `${URL.BASE_URL}${URL.SLOT_LOCK}`,
        param,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      if (json.status == 'Success') {
        console.log('slot selected');
      } else {
        Alert.alert('Failed to add your slot');
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(error?.error);
    }
  };
}
export function appointment_book(data) {
  return async (dispatch, getState) => {
    try {
      let json = await RestClient.postCall(
        `${URL.BASE_URL}${URL.APPOINMENT_BOOK}`,
        data,
      );
      console.log('booked :>> ', json);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      if (json.status == 'Success') {
        Alert.alert('Slot Booked Successfully');
      } else {
        Alert.alert('Failed to book your slot');
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(error, 'error');
      Alert.alert("Your Subscription doesn't allow appointment on this date");
    }
  };
}

/* Action called when a user deletes a card in payment page */
export function deleteCardCall(cardId, token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.postCallNoData(
        `${URL.BASE_URL}${URL.DELETE_CARD}${cardId}`,
        token,
      );
      if (json.status == 'Success') {
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        console.log(json, 'delete card call');
        Alert.alert('Card deleted succesfully');
      } else {
        Alert.alert('Failed to delete your card');
        console.log(json, ' error delete card call');
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      Alert.alert(error.error);
      console.log(error, 'catch error delete card call');
    }
  };
}

/* Action called after the user has selected a card and proceeds with payment in payment page */
export function subscribePlanCall(body, token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.postCall(
        `${URL.BASE_URL}${URL.SUBSCRIBE}`,
        body,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      if (json.status == 'Success') {
        console.log(json, 'json from subscribe plan call');
        return json;
        // await dispatch({
        //   type: ACTION_TYPE.SET_SUBSCRIPTION_SUCCESS,
        //   payload: json,
        // });
      } else {
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        console.log(json, 'error from payment');
        Alert.alert(json?.message);
        return error;
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(error, 'catch from payment');
      Alert.alert(error?.data?.message);
      return error;
    }
  };
}

/*  Action called when app tries to check if a user is subscribed already or not */
export function checkSubscriptionCall(token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.CHECK_SUBSCRIPTION}`,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(json, 'getting data form subs');
      if (
        json?.status == 'Success'
        //  &&
        // json?.data?.subscription_status === 'deactive'
      ) {
        dispatch({
          type: ACTION_TYPE.CHECK_SUB,
          payload: json?.data,
        });
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        console.log('check_sub---->>>', json?.data);
      }
      //  else if (
      //   json.status == 'Success' &&
      //   json.data.subscription_status === 'activate'
      // ) {
      //   dispatch({
      //     type: ACTION_TYPE.RESUB,
      //     payload: json,
      //   });
      //   console.log('reSub---->>>', json.data.subscription_status);
      //   dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      // }
      else {
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      Alert.alert(error?.data?.message);
    }
  };
}

/* Action called when app puuls the list of user's assigned caregiver from the backend */
export function getCaregiverListCall(userId, token) {
  console.log('caregiver api', userId, token);
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.GET_CARE_TEAM}${userId}`,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.messageID == 200) {
        dispatch({
          type: ACTION_TYPE.SET_CARETEAM,
          payload: json.data,
        });
      } else if (json.messageID > 500) {
        Alert.alert('Server connection error');
      }
    } catch (error) {
      console.log('error from caregiver api', error);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      if (error?.data?.message == 'Invalid Token')
        dispatch(AppActions.logout(), {
          type: ACTION_TYPE.TOGGLE_LOADER,
          payload: false,
        });
    }
  };
}

// GetTransectionList
export function getTransectionListCall(userId, token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.TRANSECTIONS}`,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.messageID == 200) {
        console.log(json, 'getting Form transections');
        dispatch({
          type: ACTION_TYPE.TRANSECTIONS,
          payload: json?.data,
        });
      } else if (json.messageID > 500) {
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        Alert.alert('Server connection error');
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

// Unsubscribe
export function UnsubscribeApi(token, data, cb = () => {}) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.putCall(
        `${URL.BASE_URL}${URL.UNSUBSCRIBE}`,
        data,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log('json from unsbscribe', json);
      /* Handle success data */
      if (json?.status == 'Success') {
        Alert.alert(json?.message);
        (async () => {
          try {
            await AsyncStorage.setItem('isSubscribed', 'false');
            console.log('isSubscribed set to true in AsyncStorage');
            return cb(json);
          } catch (error) {
            console.error(
              'Error setting isSubscribed in AsyncStorage: ',
              error,
            );
          }
        })();
      } else {
        Alert.alert(json?.message);
        console.log('this is an errorUnsubscribe', json);
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      }
    } catch (error) {
      Alert.alert(error?.message);
      console.log('this is an errorUnsubscribeApi', error);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

/* Action called when app pulls the list of blogs for the home and learn page from the backend */
export function getBlogsCall(token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.GET_BLOGS}`,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log('json from get blog ', json);
      /* Handle success data */
      if (json.messageID == 204) {
        dispatch({
          type: ACTION_TYPE.SET_BLOGS,
          payload: json,
        });
      } else if (json.messageID == 401) {
        Alert.alert('Token expired, please login again');
      } else if (json.messageID > 500) {
        Alert.alert('Server connection error');
      }
    } catch (error) {
      console.log('this is an error getBlogsCall', error);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

/* Action called when the app pulls the list of frequently asked question from the backend */
export function faqCall() {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(`${URL.BASE_URL}${URL.FAQ}`);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.status == 'Success') {
        dispatch({
          type: ACTION_TYPE.FAQ,
          payload: json,
        });
      } else if (json.messageID == 401) {
        Alert.alert('Token expired, please login again');
      } else if (json.messageID > 500) {
        Alert.alert('Server connection error');
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

/* Action called when the app pulls the chat list data from the backend */
export function getChatList(userId) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.GET_CHAT_LIST}${userId}`,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.status == 'Success') {
        dispatch({
          type: ACTION_TYPE.SET_CHAT_LIST,
          payload: json.data?.sort((a, b) => {
            const dateA = new Date(a?.lastMessage?.createdAt);
            const dateB = new Date(b?.lastMessage?.createdAt);
            return dateB - dateA;
          }),
        });
      } else if (json.messageID == 401) {
        Alert.alert('Token expired, please login again');
      } else if (json.messageID > 500) {
        Alert.alert('Server connection error');
      }
    } catch (error) {
      console.log('error', error);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

/* Action called when the app pulls the chats from the backend */
export function getChatCall(chatId, body, token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.GET_CHAT}${chatId}?page=${body.page}&limit=${body.limit}&sender=${body.sender}&receiver=${body.receiver}`,
        // body,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.status == 'Success') {
        dispatch({
          type: ACTION_TYPE.SET_CHAT,
          payload: json.data,
        });
      } else if (json.messageID == 401) {
        Alert.alert('Token expired, please login again');
      } else if (json.messageID > 500) {
        Alert.alert('Server connection error');
      }
    } catch (error) {
      console.log('error==');
      console.log('in catch block', JSON.stringify(error));
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

/* Action called when the app pulls more chat data from the backend */
export function getMoreChatCall(chatId, body, token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.GET_CHAT}${chatId}?page=${body.page}&limit=${body.limit}&sender=${body.sender}&receiver=${body.receiver}`,
        // body,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /* Handle success data */
      if (json.status == 'Success') {
        dispatch({
          type: ACTION_TYPE.LOAD_MORE_CHAT,
          payload: json.data,
        });
      } else if (json.messageID == 401) {
        Alert.alert('Token expired, please login again');
      } else if (json.messageID > 500) {
        Alert.alert('Server connection error');
      }
    } catch (error) {
      console.log('error==', error);
      console.log('in catch block', JSON.stringify(error));
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

/* Action to mark messages as read */
export function markReadCall(id, token) {
  return async (dispatch, getState) => {
    try {
      let json = await RestClient.putCall(
        `${URL.BASE_URL}${URL.MARK_READ}${id}`,
        {},
        token,
      );
      /* Handle success data */
      if (json.status == 'Success') {
      } else if (json.messageID == 401) {
        Alert.alert('Token expired, please login again');
      } else if (json.messageID > 500) {
        Alert.alert('Server connection error');
      }
    } catch (error) {
      console.log('error==');
      console.log('in catch block', JSON.stringify(error));
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

// CHANGE PASSWORD API (currently not in use)-----------------------------------
export function changePassword(param, navigation) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.putCall(
        `${URL.BASE_URL}${URL.CHANGE_PASSWORD}`,
        param,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      /**Handle success data */
      if (json.status == true) {
        Alert.alert(
          json.message,
          '',
          [
            {
              text: 'OK',
              onPress: () =>
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'AuthStack',
                      state: {
                        routes: [
                          {
                            name: 'Login',
                            params: {},
                          },
                        ],
                      },
                    },
                  ],
                }),
            },
          ],
          {cancelable: false},
        );
      } else {
        /**Handle error data */
        Alert.alert(json.message);
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

export function getMyprofile(token, user_id) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.MYPROFILE}${user_id}`,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(json, 'profileData------->');
      /**Handle success data */
      if (json.status) {
        dispatch({
          type: ACTION_TYPE.MY_PROFILE,
          payload: json?.data,
        });
      } else {
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

export function UpdateUserProfile(token, data, id) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.putCallFormdata(
        `${URL.BASE_URL}${URL.UPDATEUSERPROFILE}`,
        data,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(json, 'update profileData------->');
      /**Handle success data */
      if (json?.status) {
        console.log(json);
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        dispatch(AppActions.getMyprofile(token, id));
        Alert.alert(json?.message);
      } else {
        console.log(json, 'error from update user profile(1)');
        Alert.alert(json?.message);
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(error, 'error from update user profile(2)');
      Alert.alert(error?.message);
    }
  };
}

export function getBabyStage(token, week) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.BABY_STAGES}${week}`,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(json, 'babystages------->');
      /**Handle success data */
      if (json.status) {
        dispatch({
          type: ACTION_TYPE.BABY_STAGES,
          payload: json.data,
        });
      } else {
      }
    } catch (error) {
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(error, 'error from baby stages api');
    }
  };
}
export function blogs_list(token) {
  console.log('blog list API');
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.BLOGS_LIST}`,
        token,
      );
      // console.log(json,'blog_data------->')
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});

      /**Handle success data */
      if (json.status) {
        dispatch({
          type: ACTION_TYPE.BLOGS_LIST,
          payload: json.data,
        });
        console.log(json, 'json from blog list');
      } else {
        console.log(json, 'error from blog list');
      }
    } catch (error) {
      console.log(error, 'blog_error-->blogs_list');
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      dispatch({
        type: ACTION_TYPE.BLOGS_LIST,
        payload: [],
      });
      if (error?.data?.message == 'Invalid Token')
        dispatch(AppActions.logout(), {
          type: ACTION_TYPE.TOGGLE_LOADER,
          payload: false,
        });
    }
  };
}
export function quiz_list(token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});

    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.QUIZ_LIST}`,
        token,
      );
      // console.log(json,'quiz_data------->')
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});

      /**Handle success data */
      if (json.status) {
        dispatch({
          type: ACTION_TYPE.QUIZ_LIST,
          payload: json.data,
        });
      } else {
      }
    } catch (error) {
      console.log(error, 'blog_error--->quiz_list');
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      if (error?.data?.message == 'Invalid Token')
        dispatch(AppActions.logout(), {
          type: ACTION_TYPE.TOGGLE_LOADER,
          payload: false,
        });
    }
  };
}

export function appoint_list(token, user_id) {
  return async (dispatch, getState) => {
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.APPOINMENT_LIST}${user_id}&meetingType=consult`,
        token,
      );
      console.log(json, 'data from api appoint_list');
      /**Handle success data */
      if (json.status) {
        dispatch({
          type: ACTION_TYPE.APPOINTMENT_LIST,
          payload: json.data,
        });
      } else {
      }
    } catch (error) {
      console.error(error, 'blog_error---->appoint_list');
      if (error?.data?.message == 'Invalid Token') {
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
        if (error?.data?.message == 'Invalid Token')
          dispatch(AppActions.logout(), {
            type: ACTION_TYPE.TOGGLE_LOADER,
            payload: false,
          });
      }
    }
  };
}
export function get_sessions(token, date, cb = () => {}) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.GET_SESSIONS}${date}`,
        token,
      );
      console.log(json, 'appoint_data------->');
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(json, 'data from api appoint_list');
      /**Handle success data */
      if (json.status) {
        dispatch({
          type: ACTION_TYPE.GET_SESSIONS,
          payload: json.data,
        });
      } else {
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      }
      return cb(json);
    } catch (error) {
      console.error(error, 'blog_error---->get_sessions');
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      if (error?.data?.message == 'Invalid Token')
        dispatch(AppActions.logout(), {
          type: ACTION_TYPE.TOGGLE_LOADER,
          payload: false,
        });
      return cb(null);
    }
  };
}
export function available_slots(token, user_id, date) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.AVAILABLE_SLOTS}${user_id}&date=${date}`,
        token,
      );
      console.log(json, 'appoint_data------->');
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(json, 'data from api appoint_list');
      /**Handle success data */
      if (json.status) {
        dispatch({
          type: ACTION_TYPE.AVAILABLE_SLOTS,
          payload: json.data,
        });
      } else {
        dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      }
    } catch (error) {
      console.error(error, 'blog_error---->available_slots');
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      if (error?.data?.message == 'Invalid Token')
        dispatch(AppActions.logout(), {
          type: ACTION_TYPE.TOGGLE_LOADER,
          payload: false,
        });
    }
  };
}

export function all_available(token, data, cb = () => {}) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.ALL_AVAILABILITY}${data}`,
        token,
      );
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      console.log(json, 'data from api all_available');
      /**Handle success data */
      if (json.status) {
        dispatch({
          type: ACTION_TYPE.ALL_AVAILABILITY,
          payload: json?.data,
        });
      } else {
      }
      return cb(json);
    } catch (error) {
      console.error(error, 'blog_error------>all_available');
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
      if (error?.data?.message == 'Invalid Token')
        dispatch(AppActions.logout(), {
          type: ACTION_TYPE.TOGGLE_LOADER,
          payload: false,
        });
      return cb(null);
    }
  };
}
export function video_call(token, data, navigation) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});

    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.VIDEO_CALL}${data.sender_id}&receiver=${data.receiver_id}`,
        token,
      );
      console.log(json.data.videoId, 'VIDEO_CALL------->');
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});

      /**Handle success data */
      if (json.status) {
        dispatch({
          type: ACTION_TYPE.VIDEO_CALL,
          payload: json.data,
        });
        navigation.navigate('VideoCall', {video_id: json.data.videoId});
      } else {
      }
    } catch (error) {
      console.error(error, 'video call error');
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}

export function terms_condition(token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    console.log(token);
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.TERMS_CONDITION}`,
        token,
      );
      console.log('------>T', json);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});

      /**Handle success data */
      if (json.status == 'Success') {
        dispatch({
          type: ACTION_TYPE.TERMS_CONDITION,
          payload: json.data,
        });
      } else {
      }
    } catch (error) {
      console.log('err', error);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}
export function how_it_works(token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    console.log(token);
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.HOW_IT_WORKS}`,
        token,
      );
      // console.log('------>H', json);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});

      /**Handle success data */
      if (json.status == 'Success') {
        dispatch({
          type: ACTION_TYPE.HOW_IT_WORKS,
          payload: json.data,
        });
      } else {
      }
    } catch (error) {
      console.log('errfgdfgdfgdf', error);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}
export function about_us(token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.ABOUT_US}`,
        token,
      );
      console.log('------>A', json);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});

      /**Handle success data */
      if (json.status == 'Success') {
        dispatch({
          type: ACTION_TYPE.ABOUT_US,
          payload: json.data,
        });
      } else {
      }
    } catch (error) {
      console.log('errfgdfgdfgdf', error);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}
export function notification(user_id, token) {
  return async (dispatch, getState) => {
    dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: true});
    try {
      let json = await RestClient.getCall(
        `${URL.BASE_URL}${URL.NOTIFICATION}?userId=${user_id}`,
        token,
      );
      console.log('------>notification', json);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});

      /**Handle success data */
      if (json.status == 'Success') {
        console.log(' json from notification', json);
        dispatch({
          type: ACTION_TYPE.NOTIFICATION,
          payload: json.data,
        });
      } else {
        console.log(' json from notification', json);
      }
    } catch (error) {
      console.log('error from notification', error);
      dispatch({type: ACTION_TYPE.TOGGLE_LOADER, payload: false});
    }
  };
}
