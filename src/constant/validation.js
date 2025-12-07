const getAlphaOnly = text => {
  return text.replace(new RegExp(/[^a-zA-Z ]/g, 'g'), '');
};

const getAlphaNumeric = text => {
  return text.replace(new RegExp(/[^a-zA-Z0-9 ]/g, 'g'), '');
};

const getOnlyNumber = text => {
  return text.replace(new RegExp(/\D/g, 'g'), '');
};

const isInvalidString = value => !value || String(value).trim() == '';

const removeWhiteSpace = string => string.replace(/\s/g, '');

function passwordValidate(password) {
  let regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  return regularExpression.test(password);
}

const isInvalidEmailAddress = mail => {
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail == '' || mail == undefined || mail == null) {
    return true;
  }
  if (mail.match(mailformat)) {
    return false;
  } else {
    return true;
  }
};

const isValidArray = arr => Array.isArray(arr);

const removeDuplicateObjects = (arr, key) => {
  if (isValidArray(arr)) {
    return arr.filter(
      (item, index, self) =>
        index === self.findIndex(item_2 => item_2[key] == item[key]),
    );
  }
  return [];
};

const isInValidNumber = value => {
  // return !/^[0-9]*\.?[0-9]*$/.test(value);
  return !/^[1-9]\d*(\.\d+)?$/.test(value);
};

const trimString = str => {
  return str && str.replace(/\s+/g, ' ').trim();
};

const validatePhone = phone => {
  return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone);
};

const Validation = {
  isValidArray,
  removeDuplicateObjects,
  isInvalidString,
  getOnlyNumber,
  isInvalidEmailAddress,
  getAlphaOnly,
  passwordValidate,
  isInValidNumber,
  removeWhiteSpace,
  getAlphaNumeric,
  trimString,
  validatePhone,
};
export default Validation;
