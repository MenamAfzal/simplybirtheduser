import {ACTION_TYPE} from '../../actionTypes';

const initialState = {
  token: null, // Authentication token
  isLoggedIn: false, // Login status of the user
  isLoading: false, // Loader handling
  loginData: null, // Response received after login
  isFirsttime: true, // Is the app opening for the first time
  authToken: null, //
  userData: {}, // User data
  isSubscribed: false, // Does the user have subscription
  isSubscribedData: {}, // Response received after successful subscrition
  checkSub: false, // Check if the user has subscription
  update_user: {},
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE.SET_LOGIN:
      return {...state, loginData: action.payload, isLoggedIn: true};
    case ACTION_TYPE.UPDATE_USER:
      return {...state, update_user: action.payload, isLoggedIn: true};
    case ACTION_TYPE.SET_TOKEN:
      return {...state, token: action.payload};
    case ACTION_TYPE.SET_USER:
      return {...state, userData: action.payload};
    case ACTION_TYPE.SET_SUBSCRIPTION_SUCCESS:
      return {...state, isSubscribedData: action.payload, isSubscribed: true};
    case ACTION_TYPE.CHECK_SUB:
      return {...state, checkSub: action.payload, isSubscribed: false};
    case ACTION_TYPE.RESUB:
      return {...state, checkSub: action.payload, isSubscribed: true};
    case ACTION_TYPE.TOGGLE_LOADER:
      return {...state, isLoading: action.payload};
    case ACTION_TYPE.RESET_FIRST_TIME:
      return {...state, isFirsttime: false};
    case ACTION_TYPE.AUTH_RESET:
      return {
        isLoggedIn: false,
        isLoading: false,
        loginData: null,
        token: null,
        userData: {},
      };

    default:
      return state;
  }
}
export default authReducer;
