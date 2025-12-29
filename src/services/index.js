const server = 'https://astrotalkguruji.com'

export const Version = 'v1';
// const BASE_URL = `${server}/api/${Version}/`;
const BASE_URL = `${server}/api/`;

export const App_Policy = {
  Terms_Condition: `${server}terms-of-use`,
  Privacy_Policy: `${server}privacy`,
  About_Us: `${server}about-fairfantansy`,
  Faq: `${server}faq`,
};
export const Apis = {
  Login: `${BASE_URL}auth/login`,
  verifyOtp: `${BASE_URL}auth/verifyOtP`,
  resendOtp: `${BASE_URL}auth/login`,
  getPandit: `${BASE_URL}pandit?`,
  getPanditDetails: `${BASE_URL}pandit/detail?`,
  getUserDetails: `${BASE_URL}user`,
  updateProfile: `${BASE_URL}user/update`,
  getPanditReviewList: `${BASE_URL}pandit/reviewList?`,
  applyFollow: `${BASE_URL}follow`,
  getFollowing: `${BASE_URL}follow?`,
  // getChatMessages: `${BASE_URL}chat/getOrderDetail?`,
  getChatMessages: `${BASE_URL}chat/messages?`,
  createOrder:`${BASE_URL}order/create`,
  getOrderList:`${BASE_URL}order/list?`,
  sendMessage:`${BASE_URL}chat/sendMessage`,
  getChatDetails: `${BASE_URL}chat/getDetail?`,
  chatAcceptOrder:`${BASE_URL}order/acceptOrder`,
  chatCancelOrder:`${BASE_URL}order/cancelOrder`,
  forceEndChat:`${BASE_URL}chat/forceEndChat`,
  endChat:`${BASE_URL}chat/endChat`,
  getProfileList: `${BASE_URL}profile`,
  createProfile: `${BASE_URL}profile`,
  deleteProfile: `${BASE_URL}profile?`,
  editProfile: `${BASE_URL}profile/update`,
  deleteMessage: `${BASE_URL}chat/delete?`,
  deleteOrder: `${BASE_URL}order/delete?`,
  infoOrder: `${BASE_URL}review/detail?`,
  paymentLogs: `${BASE_URL}payment?`,
  paymentTransactions: `${BASE_URL}payment/transactions?`,
  createPayment: `${BASE_URL}payment`,
  deleteSinglePayment:`${BASE_URL}payment`,
  deleteAllPayments:`${BASE_URL}payment/all`,
  deleteSingleTransaction:`${BASE_URL}payment/single/transaction`,
  deleteAllTransaction:`${BASE_URL}payment/all-transaction`,
  updateToken:`${BASE_URL}user/updateToken`,
  userBalance:`${BASE_URL}user`,
  addReview:`${BASE_URL}review`,
};

export const Events = {};
