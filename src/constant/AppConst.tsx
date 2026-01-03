
export class AppConst {
  static appCurrency: any = 'USD';
  static appCurrency_icon: any = 'US$';
  static exchangeRates: any = {};
  static baseCurrency = 'USD';
  static countries: any = null;
  static isUserLoggedIn: any = false;
  static isStoreSelected: any = false;

}
export const formatKnowledge = (arr?: string[] | null) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return "";
  }

  return arr
    .map(k => k.charAt(0).toUpperCase() + k.slice(1))
    .join(", ");
};
export const getRoundPriceFrom4DecimalPoints = (price: any) => {
  return Math.round((Number(price) + Number.EPSILON) * 100) / 100;
};


export const Messages = {

  LogoutMessage: 'Are you sure you want to logout?',
  SignUpSuccess: 'Your account is created. We have sent you a 6 digit one time password to complete the account registration',
  LoginSuccess: 'You have logged in successfully',
  LoginError: 'Incorrect username or password',
};

export const ScreenTitles = {
  ForgetPass: 'Forget Password',
};
  // Compare semantic versions
  export const isVersionLower = (current, minimum) => {
    const curr = current.split('.').map(Number);
    const min = minimum.split('.').map(Number);
    for (let i = 0; i < 3; i++) {
      if ((curr[i] || 0) < (min[i] || 0)) return true;
      if ((curr[i] || 0) > (min[i] || 0)) return false;
    }
    return false;
  };

  export const defaultProfile = "https://astrotalkguruji.s3.ap-south-1.amazonaws.com/avatars/1.jpeg";