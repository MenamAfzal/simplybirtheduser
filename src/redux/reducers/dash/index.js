import {ACTION_TYPE} from '../../actionTypes';
import {about_us} from '../../actions/dash/index';
const initialState = {
  subPlans: [], // Response from the productlist api
  careTeam: [], // User's assigned care team
  meetUps: [], // List of scheduled meet ups
  appoint_list: [],
  blogs: [], // Blogs list
  blogs_list: [],
  get_sessions: [],
  slot_lock: [],
  quiz_list: [],
  video_call: null,
  activeCalendarEvent: [], // Calendar events
  my_profile: [], //
  getfaq: [], // FAQ
  how_it_works: [], // How it works
  about_us: [], // About us
  cards: [], // User's saved cards for payment
  chatList: [], // List of available chats
  chat: [], // Store chats when user opens a chat with someone
  terms_condition: [],
  baby_stages: [],
  available_slots: [],
  appointment_book: [],
  notification: [],
  all_available: [],
};

function dashReducer(state = initialState, action) {
  let updatedChat = [];
  switch (action.type) {
    case ACTION_TYPE.SET_SUBSCRIPTION_PLANS:
      return {...state, subPlans: action.payload};
    case ACTION_TYPE.SET_CARETEAM:
      return {...state, careTeam: action.payload};
    case ACTION_TYPE.VIDEO_CALL:
      return {...state, video_call: action.payload};
    case ACTION_TYPE.SET_MEETUPS:
      return {...state, meetUps: action.payload};
    case ACTION_TYPE.TRANSECTIONS:
      return {...state, transections: action.payload};
    case ACTION_TYPE.APPOINTMENT_LIST:
      return {...state, appoint_list: action.payload};
    case ACTION_TYPE.AVAILABLE_SLOTS:
      return {...state, available_slots: action.payload};
    case ACTION_TYPE.ALL_AVAILABILITY:
      return {...state, all_available: action.payload};
    case ACTION_TYPE.SET_BLOGS:
      return {...state, blogs: action.payload};
    case ACTION_TYPE.NOTIFICATION:
      return {...state, notification: action.payload};
    case ACTION_TYPE.SLOT_LOCK:
      return {...state, slot_lock: action.payload};
    case ACTION_TYPE.BLOGS_LIST:
      return {...state, blogs_list: action.payload};
    case ACTION_TYPE.GET_SESSIONS:
      return {...state, get_sessions: action.payload};
    case ACTION_TYPE.QUIZ_LIST:
      return {...state, quiz_list: action.payload};
    case ACTION_TYPE.SET_CARDS:
      return {...state, cards: action.payload};
    case ACTION_TYPE.CALENDAR_EVENT:
      return {...state, activeCalendarEvent: action.payload};
    case ACTION_TYPE.MY_PROFILE:
      return {...state, my_profile: action.payload};
    case ACTION_TYPE.BABY_STAGES:
      return {...state, baby_stages: action.payload};
    case ACTION_TYPE.APPOINMENT_BOOK:
      return {...state, appointment_book: action.payload};
    case ACTION_TYPE.FAQ:
      return {...state, getfaq: action.payload};
    case ACTION_TYPE.TERMS_CONDITION:
      return {...state, terms_condition: action.payload};
    case ACTION_TYPE.HOW_IT_WORKS:
      return {...state, how_it_works: action.payload};
    case ACTION_TYPE.ABOUT_US:
      return {...state, about_us: action.payload};
    case ACTION_TYPE.SET_CHAT_LIST:
      return {...state, chatList: action.payload};
    case ACTION_TYPE.SET_CHAT:
      return {...state, chat: action.payload};
    case ACTION_TYPE.ADD_CHAT:
      // Concatenate the new array of chats with the existing chat array
      updatedChat = [...action.payload, ...state.chat];
      // Update the 'chat' property in the Redux state
      return {...state, chat: updatedChat};
    case ACTION_TYPE.LOAD_MORE_CHAT:
      // Concatenate the new array of chats with the existing chat array
      updatedChat = [...state.chat, ...action.payload];
      // Update the 'chat' property in the Redux state
      return {...state, chat: updatedChat};
    case ACTION_TYPE.CLEAR_CHAT:
      return {...state, chat: []};
    case ACTION_TYPE.DASH_RESET:
      return {
        activeCalendarEvent: [],
        profileList: [],
      };

    default:
      return state;
  }
}
export default dashReducer;
