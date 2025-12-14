import AsyncStorageLib from '@react-native-async-storage/async-storage';
// import store from '../../redux/store';
import { Constants, DataHelper, ShowErrorMessage, ShowSuccessMessage } from '../../constant';
import { AppConst, Messages } from '../../constant/AppConst';
import { Apis } from '../../services';
import { getRequest, postMultiPartRequest, postRequest } from '../../services/requests';
import { headerBearerMultiPart, headerWithBearer, ServiceConstants } from '../../services/ServiceConstants';
import { activitySpinner } from '../reducers/AppActivityReducer';
import { changeAppStatus, changeStoreSelection } from '../reducers/AppState';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export const getResponse = (jsonResponse: any) => {
  if (jsonResponse) {
    if (Array.isArray(jsonResponse)) {
      const response = jsonResponse[0];
      return response;
    } else if (typeof jsonResponse == 'object') {
      return jsonResponse;
    }
  }
};

export const loginAction = async (data: any) => {
  const body: any = {};
  body['mobile'] = data.mobileNo;
  // body['country_code'] = data.countryCode;
  const response = await postRequest({ body, url: Apis.Login });
  // const result = getResponse(response);
  return response;
};

export const updateProfileAction = async (data: any) => {
  const body: any = {};
  body['name'] = data.name;
  body['gender'] = data.gender;
  body['birthTime'] = data.birthTime;
  body['birthPlace'] = data.birthPlace;
  body['currentAddress'] = data.currentAddress;
  body['city'] = data.city;
  body['pincode'] = data.pincode;
  body['dob'] = data.dob;
  body['language'] = data.languages;
  const response = await postRequest({ body, url: Apis.updateProfile});
  return response;
};


export const verifyOtp = async (data: any) => {
  const body: any = {};
  body['mobile'] = data.mobileNo;
  // body['country_code'] = data.countryCode;
  body['otp'] = data.verifyOtp;
  const response = await postRequest({ body, url: Apis.verifyOtp });
    const result = JSON.parse(response);
    if(result.success == true){
        ServiceConstants.setBearerToken(result.data.token);
        ServiceConstants.User_ID = result.data.id;
        // ServiceConstants.setUserReferralCode(result.data?.user.self_reffer);
        ServiceConstants.setUserphone(result.data.mobile);
        // await AsyncStorage.setItem('token',result.data?.access_token);
        // await AsyncStorage.setItem('isLoggedIn', 'true');
        setAsyncUser(result.data.token);
        return response;
    }else{
      return response;
    }
  return null;
};

export const resendOtp = async (data: any) => {
  const body: any = {};
  body['mobile'] = data.mobileNo;
  // body['country_code'] = data.countryCode;
  const response = await postRequest({ body, url: Apis.Login });
  return response;
};

export const getUserDetails = async () => {
  const body: any = {};
  const response = await getRequest({
    url: Apis.getUserDetails,
    header: headerWithBearer(),
    body,
  });
  const result = response;
  if(result.success == true){
    return result;
  } else {
    return result;
  }
  return null;
};

export const getPandit = async (page:any) => {
  const body: any = {};
  body['page'] = page;
  body['limit'] = 20;
  const response = await getRequest({
    url: Apis.getPandit,
    header: headerWithBearer(),
    body,
  });
  const result = response;
  if(result.success == true){
    return result;
  } else {
    return result;
  }
  return null;
};

export const getPanditDetails = async (panditId:any) => {
  const body: any = {};
  body['id'] = panditId;
  const response = await getRequest({
    url: Apis.getPanditDetails,
    header: headerWithBearer(),
    body,
  });
  const result = response;
  if(result.success == true){
    return result;
  } else {
    return result;
  }
  return null;
};

export const applyUserFollowApi = async (panditID: any) => {
  const body: any = {};
  body['panditId'] = panditID;
  const response = await postRequest({ body, url: Apis.applyFollow });
    const result = JSON.parse(response);
    if(result.success == true){
        return response;
    }else{
      return response;
    }
  return null;
};
export const getFollowing = async (page:any) => {
    const body: any = {};
    body['page'] = page;
    body['limit'] = 20;
  const response = await getRequest({
    url: Apis.getFollowing,
    header: headerWithBearer(),
    body,
  });
  const result = response;
  if(result.success == true){
    return result;
  } else {
    return result;
  }
  return null;
};

export const getPanditReviewList = async (panditId:any,pagenum:any) => {
  const body: any = {};
   body['panditId'] = panditId;
   body['page'] = pagenum;
   body['limit'] = 100;
  const response = await getRequest({
    url: Apis.getPanditReviewList,
    header: headerWithBearer(),
    body,
  });
  const result = response;
  return result;
};

export const getPanditChatMessages = async (orderId:any,pagenum:any) => {
  const body: any = {};
   body['orderId'] = orderId;
   body['page'] = pagenum;
   body['limit'] = 20;
  const response = await getRequest({
    url: Apis.getChatMessages,
    header: headerWithBearer(),
    body,
  });
  const result = response;
  return result;
};



export const getChatDetails = async (panditId:any) => {
  const body: any = {};
  body['panditId'] = panditId;
  const response = await getRequest({
    url: Apis.getChatDetails,
    header: headerWithBearer(),
    body,
  });
  const result = response;
  if(result.success == true){
    return result;
  } else {
    return result;
  }
  return null;
};

export const sendMessageApi = async (files: any,message:string,orderId:any,isImage:any) => {
  const body = new FormData();
  body.append('orderId', orderId);
  if (isImage) {
    // body.append('message', files);
  files.forEach((img: any, index: number) => {
    body.append('message', {
      uri: img.uri, // or img.uri if using expo
      name: img.name || `image_${index}.jpg`,
      type: img.type || 'image/jpeg',
    } as any);
  });
    body.append('type', "image");
  }else{
    body.append('message', message);
    body.append('type', "text");
  }
    const response = await postMultiPartRequest({
      header: headerBearerMultiPart(),
      body: body,
      url: Apis.sendMessage,
    });
    const result = JSON.parse(response);
    if(result.success == true){
        return response;
    }else{
      return response;
    }
  return null;
};

export const createOrderApi = async (panditID: any,type:string) => {
  const body: any = {};
  body['panditId'] = panditID;
  body['type'] = type;
  const response = await postRequest({ body, url: Apis.createOrder });
    const result = JSON.parse(response);
    if(result.success == true){
        return response;
    }else{
      return response;
    }
  return null;
};
export const getOrderList = async (pagenum:any) => {
  const body: any = {};
   body['page'] = pagenum;
   body['limit'] = 20;
  const response = await getRequest({
    url: Apis.getOrderList,
    header: headerWithBearer(),
    body,
  });
  const result = response;
  return result;
};

const setAsyncUser = (token: any) => AsyncStorageLib.setItem('AsyncUserToken', JSON.stringify(token));

export const logoutUser = (isLogout:any) => {
  // changeAppStatus(1);
  AsyncStorageLib.removeItem('AsyncUserToken');
  AsyncStorage.removeItem('isLoggedIn')
  AsyncStorage.removeItem('token');
  AppConst.isUserLoggedIn = false;
  ServiceConstants.User_ID = null;
  ServiceConstants.setBearerToken(null);
  ServiceConstants.setUserReferralCode(null);
  ServiceConstants.setUserphone(null);
  if(!isLogout)
  RNRestart.Restart();
};

export const asyncLoginAction = () => {
  AsyncStorageLib.getItem('AsyncUserToken')
    .then((token: any) => {
      if (token) {
        const result = JSON.parse(token);
        ServiceConstants.setBearerToken(result.access_token);
        ServiceConstants.User_ID = result.user.id;
        ServiceConstants.setUserReferralCode(result.user.self_reffer);
        ServiceConstants.setUserphone(result.user.mobile_no);
        AsyncStorage.setItem('isLoggedIn', 'true');
      }
    })
    .catch(e => {
      console.log('e: ', e);
    });
};






