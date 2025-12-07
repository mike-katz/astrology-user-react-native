export class ServiceConstants {
  static BEARER_TOKEN = null;
  static User_ID = null;
  static User_NAME = null;
  static User_ReferralCode = null;
  static User_PHONE = null;
  static User_Selected_Level_ID = null;

  static getBearerToken() {
    return this.BEARER_TOKEN;
  }
  static setBearerToken(token = this.BEARER_TOKEN) {
    this.BEARER_TOKEN = token;
  }

  static getUserReferralCode() {
    return this.User_ReferralCode;
  }
  static setUserReferralCode(referral = this.User_ReferralCode) {
    this.User_ReferralCode = referral;
  }

  static getUserPhone() {
    return this.User_PHONE;
  }
  static setUserphone(phone = this.User_PHONE) {
    this.User_PHONE = phone;
  }

    static getUserName() {
    return this.User_NAME;
  }
  static setUserName(name = this.User_NAME) {
    this.User_NAME = name;
  }
  
}

export const headerWithoutBearer = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const headerWithBearer = () => {
  const token = ServiceConstants.getBearerToken();

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // add only if token exists
  };
};

export const headerBearerMultiPart = () => {
  return {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${ServiceConstants.getBearerToken()}`,
  };
};
