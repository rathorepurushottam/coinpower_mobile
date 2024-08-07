import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, Share} from 'react-native';
import {USER_TOKEN_KEY} from './Constants';
import {appOperation} from '../appOperation';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Clipboard from '@react-native-community/clipboard';
import {showError} from './logger';
import moment from 'moment';
import {AMBER, GREEN, RED, WHITE} from '../common';
import {colors} from '../theme/colors';
import DeviceInfo from 'react-native-device-info';

export const shareToAny = (message: string) => {
  const shareOptions = {
    message: message,
  };

  Share.share(shareOptions);
};

export const validateEmail = (email: string) => {
  const expression =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  return expression.test(email);
};

export const validatePassword = (value: string) => {
  const expression =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i;

  return expression.test(value);
};

export const isEmptyObject = (obj: Object) => {
  return Object.keys(obj).length === 0;
};

export const checkValidPanCardNumber = (panNumber: string) => {
  let regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  return regex.test(panNumber?.toUpperCase());
};

export const checkValidAdharCardNumber = (adharNumber: string) => {
  let regex = new RegExp(/^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/);
  return regex.test(adharNumber);
};

export const checkValidDrivingLicenseNumber = (
  drivingLicenseNumber: string,
) => {
  let regex = new RegExp(/^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/);
  return regex.test(drivingLicenseNumber);
};


export const setAadharNumber = (text:string) => {
  // Format the Aadhaar number with spaces every 4 digits
  const formattedText = text
    .replace(/[^\d]/g, '') // Remove any non-digit characters
    .replace(/(.{4})/g, '$1 ') // Insert a space every 4 digits
    .trim(); // Remove trailing spaces

  return formattedText;
};
export const twoFixedZero = (value: string | number) => {
  let val = Number(value);
  return val?.toFixed(0);
};
export const twoFixedTwo = (value: string | number) => {
  let val = Number(value);
  return val?.toFixed(2);
};

export const toFixedThree = (value: string | number) => {
  let val = Number(value);
  return val?.toFixed(3);
};

export const checkToFixedThree = (value: string | number) => {
  let val = Number(value);
  if(isNaN(val)) {
    return 0;
  } else {
    return val?.toFixed(3);
  }
  
};

export const toFixedFive = (value: string | number) => {
  let val = Number(value);
  return val?.toFixed(5);
};

export const toFixedSix = (value: string | number) => {
  let val = Number(value);
  return val?.toFixed(6);
};

export const toFixedFour = (value: string | number) => {
  let val = Number(value);
  return val?.toFixed(4);
};

export const toFixedEight = (value: string | number) => {
  let val = Number(value);
  return val < 1 ? val?.toFixed(8) : val?.toFixed(3);
};
export const imagePathCorrection = (value: string) => {
  let temp = value?.replace('\\', '/');
  let temp2 = temp?.replace('\\', '/');
  return temp2;
};

export const onAppStart = async store => {
  try {
    const customerToken = await AsyncStorage.getItem(USER_TOKEN_KEY);
    appOperation.setCustomerToken(customerToken);
  } catch (error) {
    console.log(error);
  }
};

export async function getCameraPermissions() {
  const granted = await request(
    Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
      ios: PERMISSIONS.IOS.CAMERA,
    }),
    {
      title: 'App required Camera permission',
      message:
        'We required Camera permission in order to use device camera' +
        'Please grant us.',
    },
  );

  return granted === RESULTS.GRANTED;
}

export async function getGalleryPermissions() {
  const granted = await request(
    Platform.select({
      android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    }),
    {
      title: 'App required Library permission',
      message: 'We require Library permission in order to access the media library. Please grant us.',
    },
  );

  return granted === RESULTS.GRANTED;
}
export const copyText = (val: string) => {
  Clipboard.setString(val);
  showError('Copied');
};

export const dateFormatter = (date: string) => {
  let temp = moment(date).format('DD MMM, YYYY hh:mm a');
  return temp;
};

export const depositWithdrawColor = (type: string) => {
  if (type === 'DEPOSIT' || type === 'DEBIT') return GREEN;
  if (type === 'WITHDRAWAL' || type === 'CREDIT') return RED;
  else return WHITE;
};
export const statusColor = (status: string) => {
  if (status === 'SUCCESS') return colors.green;
  if (status === 'CANCEL') return colors.red;
  else return colors.amber;
};

export const numberColor = (value: number) => {
  if (value === 0) {
    return AMBER;
  }
  if (value < 0) {
    return RED;
  }
  if (value > 0) {
    return GREEN;
  }
};

export const getLastFour = (value: string) => {
  let temp = value.slice(-4);
  return temp;
};

export const bankStatus = (key: number) => {
  let temp = {
    status: 'PENDING',
    backgroundColor: colors.amber_fifty,
    textColor: AMBER,
    title: 'Bank account verification is pending',
    subtitle: 'Please wait for account verification',
  };
  if (key === 1) {
    temp = {
      status: 'VERIFIED',
      backgroundColor: colors.green_fifty,
      textColor: GREEN,
      title: 'Bank account verfified',
      subtitle: 'You can now make deposits and withdrawal.',
    };
  } else if (key === 2) {
    temp = {
      status: 'REJECTED',
      backgroundColor: colors.red_fifty,
      textColor: RED,
      title: 'Bank account verification is rejected',
      subtitle: 'Contact us for more information',
    };
  }
  return temp;
};

export const calculatePrice = (balance, price) => {
  let temp = Number(balance) * Number(price);
  return toFixedThree(temp);
};

export const calculateDifference = (high, low) => {
  let temp = Number(high) - Number(low);
  return toFixedThree(temp);
};

export function getDaysAgoData(data, daysAgo) {
  // console.log('data::::::', data?.length);

  let filterData = data
    ?.sort((a, b) => calculateTime(b.time).localeCompare(calculateTime(a.time)))
    ?.slice(0, data.length >= daysAgo ? daysAgo : data.length);
  // console.log('filterData::::::', filterData?.length);

  let new_arr = filterData?.reverse();
  // console.log('new_arr::::::', new_arr?.length);

  let priceData = new_arr?.map(item => {
    return Number(item?.close);
  });
  return priceData ?? [];
}

export const calculateTime = (time: string | number) => {
  let temp = Number(time) * 1000;
  return moment(temp).format('YYYY-MM-DD');
};

export const checkValue = (value: string | object) => {
  if (typeof value === 'string') {
    return value;
  } else {
    const text = String(value);
    return text;
  }
};

export const checkValidAmount = (value: any) => {
  const expression = /^\d+(\.\d{1,4})?$/;

  return expression.test(value);
};
