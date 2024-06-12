import {ALL_AVAILABILITY} from '../../constants/url';

export const ACTION_TYPE = {
  /* Auth Action Types */
  SET_LOGIN: 'SET_LOGIN', // Save response from login api to store
  SET_TOKEN: 'SET_TOKEN', // Save the session token to store
  REMEMBER_USER: 'REMEMBER_USER', // Save username and password to store when user checks the remember me box
  SET_USER: 'SET_USER', // Save user data in store
  RESET_PASSWORD: 'RESET_PASSWORD', //
  CHANGE_PASSWORD: 'CHANGE_PASSWORD', //
  TOGGLE_LOADER: 'TOGGLE_LOADER', // Toggle loader between true and false
  AUTH_RESET: 'AUTH_RESET', // Reset all data stored in the auth reducer during logout
  DASH_RESET: 'HOME_RESET', // Reset all data stored in the dash reducer during logout
  RESET_FIRST_TIME: 'RESET_FIRST_TIME', // To check if the app is being opened for the first time after install
  UPDATE_USER: 'UPDATE_USER',

  /* Dashboard Action Types */
  SET_SUBSCRIPTION_PLANS: 'SET_SUBSCRIPTION_PLANS', // Save the subscription plan data in store
  MY_PROFILE: 'MY_PROFILE',
  SET_CARETEAM: 'SET_CARETEAM', // Save careteam data in store
  SET_MEETUPS: 'SET_MEETUPS', // Save meetup data in store
  SET_ARTICLES: 'SET_ARTICLES', // Save articles in store (api might change to blogs in future)
  FAQ: 'FAQ', // Save faq data in the store
  SET_BLOGS: 'SET_BLOGS', // Save blogs data in store
  SET_CARDS: 'SET_CARDS', // Save user saved cards in store
  SET_SUBSCRIPTION_SUCCESS: 'SET_SUBSCRIPTION_SUCCESS', // Save the response from subscribe api on success to store
  CHECK_SUB: 'CHECK_SUB', // Action is called after check subscription call when a user is not subscribed to set the flag to false
  RESUB: 'RESUB', // Action called after subscription call when user is already subscribed to set the flag to true
  SET_CHAT_LIST: 'SET_CHAT_LIST', // Save user's chat list to the store
  SET_CHAT: 'SET_CHAT', // Save chat between user and receiver to the store
  ADD_CHAT: 'ADD_CHAT', // Add a newly received message object to the existing chat array
  LOAD_MORE_CHAT: 'LOAD_MORE_CHAT', // Add the chat the we receive when user loads previous chats to chat array
  CLEAR_CHAT: 'CLEAR_CHAT', // Clear chat from the store when user moves out of the screen
  BLOGS_LIST: 'BLOGS_LIST',
  QUIZ_LIST: 'QUIZ_LIST',
  APPOINTMENT_LIST: 'APPOINTMENT_LIST',
  ALL_AVAILABILITY: 'ALL_AVAILABILITY',
  VIDEO_CALL: 'VIDEO_CALL',
  TERMS_CONDITION: 'TERMS_CONDITION',
  TRANSECTIONS: 'TRANSECTIONS',
  HOW_IT_WORKS: 'HOW_IT_WORKS',
  ABOUT_US: 'ABOUT_US',
  BABY_STAGES: 'BABY_STAGES',
  NOTIFICATION: 'NOTIFICATION',
  GET_SESSIONS: 'GET_SESSIONS',
  AVAILABLE_SLOTS: 'AVAILABLE_SLOTS',
  SLOT_LOCK: 'SLOT_LOCK',
  APPOINMENT_BOOK: 'APPOINMENT_BOOK',
};
