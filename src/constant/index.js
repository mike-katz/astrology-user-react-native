import { LayoutAnimation, Platform, UIManager } from 'react-native';
import { showToastMessage } from '../../src/utils/CustomToast';
import { AppConst, getExchangePrice } from './AppConst';
import Validation from './validation';

export class Constants {
  static safeArea = { bottom: 25, top: 50 };
  static appNavigation;
  static user = {};
}

export class DataHelper {
  static userEmail = null; // Help to show pre typed email
  static filterData = null;
  static activeCompareProduct = null;
  static searchTerm = null;
}

export { Validation };

export const ShowErrorMessage = (heading, message) => {
  showToastMessage({
    heading,
    message,
    type: 'Error',
  });
};

export const ShowSuccessMessage = (heading, message) => {
  showToastMessage({
    heading,
    message,
    type: 'Success',
  });
};

export const ShowNotification = (heading, message, onPress = null) => {
  showToastMessage({
    heading,
    message,
    type: 'Notification',
    onPress: onPress,
  });
};

export const layoutAnimationConfig = () => {
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
};

export const layoutAnimation = () => {
  LayoutAnimation.configureNext({
    duration: 400,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  });
};

export let APP_CONST = {
  currency: '$',
};

export function format_bundle_without_roundoff(num) {
  var multiplier3 = Math.pow(10, 2 || 0); // change 3 to 2 for only bundle price issue
  console.log('changes');
  var result = Math.round(num * multiplier3) / multiplier3;
  console.log('multipler 123', num);

  var multiplier = Math.pow(10, 3 || 0);
  console.log('multiplier %%%%%%%', multiplier);
  var finalresult = Math.round(result * multiplier) / multiplier;
  return formate_price(finalresult);
}

export function format_bundle(num) {
  var multiplier3 = Math.pow(10, 2 || 0); // change 3 to 2 for only bundle price issue

  var result = Math.round(num * multiplier3) / multiplier3;
  console.log('multipler 123', num);

  var multiplier = Math.pow(10, 2 || 0);
  var finalresult = Math.round(result * multiplier) / multiplier;
  return formate_price(finalresult);
}

export function formate_price(num2, currency = null) {
  {
    const num = getExchangePrice(parseFloat(num2)).toFixed(2);

    if (num.toString() == 'NaN') {
      return `${AppConst.appCurrency_icon}00.00`;
    }
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (parseInt(num_parts[1]) > 0) {
      //num_parts[1] = parseInt(num_parts[1] / 10);
      return `${currency || AppConst.appCurrency_icon}${num_parts.join('.')}`;
    }
    return `${currency || AppConst.appCurrency_icon}${num_parts[0]}.00`;
  }
}

export function formate_price_bundle(num2, currency = null) {
  {
    const num = getExchangePrice(parseFloat(num2));

    if (num.toString() == 'NaN') {
      return `${AppConst.appCurrency_icon}00.00`;
    }
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (parseInt(num_parts[1]) > 0) {
      //num_parts[1] = parseInt(num_parts[1] / 10);
      return `${currency || AppConst.appCurrency_icon}${num_parts.join('.')}`;
    }
    return `${currency || AppConst.appCurrency_icon}${num_parts[0]}.00`;
  }
}

export function formate_price_without_currency(num2) {
  {
    const num = parseFloat(num2).toFixed(2);
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (parseInt(num_parts[1]) > 0) {
      return `${num_parts.join('.')}`;
    }
    return `${num_parts[0]}`;
  }
}
