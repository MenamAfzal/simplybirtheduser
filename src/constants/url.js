const URL = {
  // BASE_URL: 'http://54.190.192.105:9196/api/v1/', //Staging URL

  //BASE_URL: 'http://192.168.0.161:8001/api/v1/', //Local URL
  //SOCKET_URL: 'http://192.168.0.161:8001', //Local Socket URL

  BASE_URL: 'http://54.215.167.176:8001/api/v1/', //Live URL
  SOCKET_URL: 'http://54.215.167.176:8001', //Live Socket URL

  FILE_URL: 'http://54.190.192.105:8001/',
  // Auth Endpoints
  LOGIN: 'login', // Endpoint for login
  SOCIALLOGIN: 'user/socialsignup', // Endpoint for Sociallogin
  FORGOT_PASSWORD: 'forgetpassword', // Endpoint for forgot password on the login page
  RESET_PASSWORD: 'resetpassword', // Endpoint for reset password after forgot password
  SIGNUP: 'user/signup', // Endpoint for signup
  EMAIL_OTP: 'verifyotp', // Endpoint for email otp verification
  PHONE_OTP: 'phoneverifyotp', // Endpoint for phone otp verification
  RESENDEMAILOTP: 'resendOtp', // Endpoint for resending email otp
  RESENDPHONEOTP: 'resendOtpphone', // Endpoint for resending phone otp
  UPDATE_USER: 'user/profile-update', // Endpoint for updating user data
  DELETE_ACCOUNT: 'deleteAccount',
  // Dash Endpoints
  CALENDAR: '', // Calendar events
  MYPROFILE: 'user/details?_id=', // Get user profile

  UPDATEUSERPROFILE: 'user/profile-update',

  GET_SUBSCRIPTION_PLANS: 'service/listProducts', // Get subscription plans

  FAQ: 'cms/getFAQList?filter=', // Get faq
  GET_CARE_TEAM: 'user/assigned-caregivers-list?userId=', // Get assigned careteam members
  GET_ARTICLES: 'get-article-list?articleTitle=', // Get articles(might be replaced by blogs in future)
  GET_BLOGS: 'get-blog-list?filter=', // Get blogs
  TRANSECTIONS: 'transaction-history', // Get blogs
  UNSUBSCRIBE: 'unsubscribePlan', //unsubscribe
  GET_CARDS: 'getAllCard', // Get user's saved cards for payment
  ADD_CARD: 'addCard', // Save user's card in database
  DELETE_CARD: 'deleteCard?id=', // Remove user's saved card from database
  SUBSCRIBE: 'subscribe-plan', // Subscribe to the selected plan
  CHECK_SUBSCRIPTION: 'getUserSubscription', // Check if the user is subscribed or not
  GET_CHAT_LIST: 'user/chat-caregiver-list?userId=', // Get the list of people you can chat with i.e your assigned caregivers
  GET_CHAT: 'all-chat/', // Get chats between user and the person whose chat with user is opened
  MARK_READ: 'markRead/', // Mark messages as read
  BLOGS_LIST: 'get-blog-list',
  QUIZ_LIST: 'get-quiz-list',
  APPOINMENT_LIST: 'user/appointment-list?userId=', // Meet ups
  ALL_AVAILABILITY: 'user/all-caregiver-availability?date=',
  VIDEO_CALL: 'user/videoCall?sender=',
  TERMS_CONDITION: 'cms/getCMSDetails?id=648fd97011d185f123d83baa',
  HOW_IT_WORKS: 'cms/getCMSDetails?id=648fd99c11d185f123d83bac',
  ABOUT_US: 'cms/getCMSDetails?id=648fd9bc11d185f123d83bae',
  BABY_STAGES: 'baby-stages?week=',
  NOTIFICATION: 'getNotifaction',
  GET_SESSIONS: 'caregiver/getMindfulnessSessionList?date=',
  AVAILABLE_SLOTS: 'user/caregiver-available-slots?caregiverId=',
  SLOT_LOCK: 'user/lock-availability',
  APPOINMENT_BOOK: 'user/appointment',
};

module.exports = URL;
