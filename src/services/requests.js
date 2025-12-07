import { ShowErrorMessage } from '../constant';
import { loginAction, logoutUser } from '../redux/actions/UserActions';
import { headerWithoutBearer, headerWithBearer, headerBearerMultiPart } from './ServiceConstants';
import CryptoJS from 'react-native-crypto-js';
import axios from 'axios';
const signalAbortAfter = 40000;

const showLog = (url, Status, method, header, body, res) => {
  console.log('\x1b[33m%s\x1b[0m', '\n---------Fetch Request Started---------\n');
  console.log('[Fetch] Url-->', url);
  console.log('[Fetch] Status-->', Status);
  console.log('[Fetch] Header-->', header);
  console.log('[Fetch] METHOD-->', method);
  console.log('[Fetch] Body-->', JSON.stringify(body));
  console.log('[Fetch] Response-->', JSON.stringify(res));
  console.log('\x1b[33m%s\x1b[0m', '\n---------Fetch Request Ended---------\n');
};

const secretKey = "Va5jzgoprjdz0AbeEMG9uP0JL";
const encryptData = (text, secretKey) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};
const decryptData = (cipherText, secretKey) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const authError = () => {
  // return;
  ShowErrorMessage('Session Expired', 'your session has been expired please login again');
  setTimeout(() => {
    logoutUser(false);
  }, 400);
  return {
    status: false,
    message: 'your session has been expired please login again',
  };
};

export const getRequest = async ({ header = headerWithBearer(),body, url ,method = 'get'}) => {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), signalAbortAfter);
    if (Object.keys(body)?.length > 0) {
      const encrypted = encryptData(JSON.stringify(body), secretKey);
      // convert to string before attach to URL
      const payload = encodeURIComponent(encrypted);
      url = `${url}payload=${payload}`; 
        console.log("GET REQUEST URL →", url,header,method,body);
    }
    
  return axios({
  url,
  method,
  headers: header,
  timeout: 40000,
})
  .then((res) => {
    console.log("RAW AXIOS SUCCESS ---"+res);
      showLog(url, res.status, method, header, null, res.data);
     const result2 = decryptData(res.data.data,secretKey);
    return result2;
  }).catch((error) => {
    console.log("RAW AXIOS ERROR →", error);
      if (error.response.status == 401) {
        return authError();
      }
    if (error.response) {
      console.log("HTTP STATUS →", error.response.status);   // e.g., 400
      console.log("SERVER RESPONSE →", error.response.data); // full body
      console.log("HEADERS →", error.response.headers);
      return decryptData(error.response,secretKey);
    } else {
      // NO response = network error
      console.log("NETWORK ERROR →", error.message);
      return decryptData(error.message,secretKey);
    }
    return error;
  });

  } catch (e) {
    if (e.message == 'Aborted') {
      return abortError();
    }
  }
};

export const postRequest = async ({ header = headerWithBearer(), body, url, method = 'post' }) => {
  try {
    const encryptedPayload = {
      payload: encryptData(JSON.stringify(body), secretKey),
    };
  return axios({
  url,
  method,
  headers: header,
  data: encryptedPayload,
  timeout: 40000,
}).then((res) => {
    showLog(url, res.status, method, header, body, res.data);
    const result2 = decryptData(res.data.data,secretKey);
    console.log("AXIOS SUCCESS →", result2);
    return result2;
  }).catch((error) => {
    console.log("RAW AXIOS ERROR →", error);
      if (error.response.status == 401) {
        return authError();
      }
    if (error.response) {
      console.log("HTTP STATUS →", error.response.status);   // e.g., 400
      console.log("SERVER RESPONSE →", error.response.data); // full body
      console.log("HEADERS →", error.response.headers);
    } else {
      // NO response = network error
      console.log("NETWORK ERROR →", error.message);
    }
    const resultError = decryptData(error.response.data.error,secretKey);
    return resultError;
  });
    
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return abortError();
    }
    console.log("Catch ERROR →", error);
  }
};


// export const postRequest = async ({ header = headerWithBearer(), body, url, method = 'post' }) => {
//   try {
//     const controller = new AbortController();
//     setTimeout(() => controller.abort(), signalAbortAfter);
    
//     const response = await fetch(url, {
//       method: method,
//       headers: header,
//       body:{
//         payload:encryptData(JSON.stringify(body),secretKey),
//       }
//       // signal: controller.signal
//     });
//     // console.log('response: ', response);
//     // const result = await response.json();
//     // console.log('result: ', result);
//     // showLog(url, response.status, method, header, body, result);

//     // if (response.status == 401) {
//     //   return authError();
//     // }
//     return result;

//     // return decryptData(result,secretKey);
//   } catch (e) {
//     if (e.message == 'Aborted') {
//       return abortError();
//     }
//   }
// };

export const postMultiPartRequest = async ({ header = headerBearerMultiPart(), body, url }) => {
  try {
    // const controller = new AbortController();
    // setTimeout(() => controller.abort(), 15000);
    const response = await fetch(url, {
      method: 'post',
      headers: header,
      body,
      // signal: controller.signal
    });
    console.log(response);

    const result = await response.json();
    showLog(url, response.status, header, 'POST', body, result);
    if (response.status == 401) {
      return authError();
    }

    return result;
  } catch (e) {
    if (e.message == 'Aborted') {
      alert('Service Time Out 5 sec');
      return false;
    }
  }
};

const abortError = () => {
  const error = 'Unable to connect with server! Request is taking longer than 30 seconds to fulfill';
  return {
    status: false,
    message: error,
  };
};
