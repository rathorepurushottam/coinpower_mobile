import {ACCOUNT_SCREEN} from './../navigation/routes';
import {appOperation} from '../appOperation';
import {logger, showError} from '../helper/logger';
import {
  AlertsProps,
  ChangePasswordProps,
  CurrencyPreferenceProps,
  DownloadTradeReportProps,
  RatingProps,
} from '../helper/types';
import NavigationService from '../navigation/NavigationService';
import {
  NAVIGATION_AUTH_STACK,
  NAVIGATION_BOTTOM_TAB_STACK,
  TWO_FACTOR_QR_SCREEN,
} from '../navigation/routes';
import {setUserBankData} from '../slices/accountSlice';
import {setLoading, setUserData} from '../slices/authSlice';
import {
  setCurrency,
  setReferCode,
  setReferCount,
  setTwoFaData,
} from '../slices/homeSlice';
import {AppDispatch} from '../store/store';
import {logoutAction} from './authActions';
import {getUserPortfolio} from './walletActions';
import { Alert } from 'react-native';
import { getReferralList } from './homeActions';

export const getUserProfile =
  (isNavigate = false, isHome = false) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.get_profile();
      if (response?.success) {
        console.log(response, "getUserProfile");
        dispatch(setUserData(response?.data));
        dispatch(setCurrency(response?.data?.currency_prefrence));
        isNavigate ? NavigationService.goBack() : null;
        isHome ? NavigationService.reset(NAVIGATION_BOTTOM_TAB_STACK) : null;
      } else if (!response?.success || response?.code === 401) {
        NavigationService.reset(NAVIGATION_AUTH_STACK);
      }
      //  else {
      //   NavigationService.reset(NAVIGATION_AUTH_STACK);
      // }
    } catch (e) {
      logger(e);
      // if (e?.code === 401 || e?.code === 403) {
      NavigationService.reset(NAVIGATION_AUTH_STACK);
      
      // }
    } finally {
      dispatch(setLoading(false));
    }
  };

export const editUserProfile =
  (data: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.edit_profile(data);
      // console.log('res:::', response);
      if (response?.success) {
        showError(response?.message);
        dispatch(getUserProfile(true));
      } else {
        showError(response?.message);
      }
    } catch (e) {
      console.log(e,'====e>>>>');
      
      showError(e?.message);

      logger(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const changePassword =
  (data: ChangePasswordProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.change_password(data);
      // console.log('res:::', response);

      if (response?.success) {
        showError(response?.message);
        dispatch(logoutAction());
      } else {
        showError(response?.message);
      }
    } catch (e) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const changeCurrencyPreference =
  (data: CurrencyPreferenceProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      
      const response: any = await appOperation.customer.change_currency(data);
      if (response?.success) {
        showError(response?.message);
        dispatch(getUserProfile());
        dispatch(getUserPortfolio());
      } else {
        showError(response?.message);
      }
    } catch (e) {
      logger(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const kycVerification = (data: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.kyc_verification(data);
    console.log('res:::', response);
    if (response?.success) {
      showError(response?.message);
      NavigationService.navigate(ACCOUNT_SCREEN);
    } else {
      showError(response?.message);
    }
  } catch (e) {
    logger(e);
    showError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const setPriceAlert =
  (data: AlertsProps) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await appOperation.customer.price_alert(data);
      // console.log('res:::', response);
      if (response.success) {
        dispatch(getUserProfile());
      }
    } catch (e) {
      logger(e);
    }
  };
export const setCommissionAlert =
  (data: AlertsProps) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await appOperation.customer.commission_alert(data);
      // console.log('res:::', response);
      if (response.success) {
        dispatch(getUserProfile());
      }
    } catch (e) {
      logger(e);
    }
  };
export const setTradeSetting =
  (data: AlertsProps) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await appOperation.customer.trade_setting(data);
      // console.log('res:::', response);
      if (response.success) {
        dispatch(getUserProfile());
      }
    } catch (e) {
      logger(e);
    }
  };
export const setFeeSetting =
  (data: AlertsProps) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await appOperation.customer.fee_setting(data);
      // console.log('res:::', response);
      if (response.success) {
        dispatch(getUserProfile());
      }
    } catch (e) {
      logger(e);
    }
  };

export const getUserBankDetails = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.user_bank_detail();
    // console.log('res:::', response);
    if (response.sucess) {
      dispatch(setUserBankData(response?.data));
    }
  } catch (e) {
    logger(e);
  }
};

export const addNewBakAccount =
  (data: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.add_new_bank(data);
      // console.log('res:::', response);
      if (response.sucess) {
        dispatch(getUserBankDetails());
        showError(response?.message);
        NavigationService.goBack();
      }
    } catch (e) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const updateBankAccount =
  (data: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.edit_bank(data);
      // console.log('res:::', response);
      if (response.sucess) {
        dispatch(getUserBankDetails());
        showError(response?.message);
        NavigationService.goBack();
      }
    } catch (e) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const deleteBankAccount = (id: any) => async (dispatch: AppDispatch) => {
  try {
    let data = {
      _id: id,
    };
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.delete_bank(data);
    // console.log('res:::', response);
    if (response.sucess) {
      dispatch(getUserBankDetails());
      showError(response?.message);
    }
  } catch (e) {
    logger(e);
    showError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateRating =
  (data: RatingProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.add_rating(data);
      // console.log('res:::', response);/
      if (response.success) {
        showError(response?.message);
        dispatch(setLoading(false));
      }
    } catch (e) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getUserReferCode = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.user_refer_code();
    console.log('res:::', response);
    if (response.success) {
      dispatch(setReferCode(response?.data));
      dispatch(getReferralList(response?.data))
    }
  } catch (e) {
    logger(e);
  }
};
export const getUserReferCount = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.user_refer_count();
    console.log('res:::', response);
    if (response.success) {
      dispatch(setReferCount(response?.data));
    }
  } catch (e) {
    logger(e);
  }
};

export const deleteAccount = () => async (dispatch: AppDispatch) => {
  try {
    let data = {status: 'Inactive'};
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.delete_account(data);
    if (response.success) {
      showError(response?.message);
      dispatch(logoutAction());
    }
  } catch (e) {
    logger(e);
    showError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const downLoadTradeReport =
  (data: DownloadTradeReportProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.download_trade_report(
        data,
      );
      if (response.success) {
        showError(response?.message);
      }
    } catch (e) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const generateTwoFactorQr = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.two_factor_auth_qr();
    if (response.success) {
      dispatch(setTwoFaData(response?.data));
      NavigationService.navigate(TWO_FACTOR_QR_SCREEN);
    }
  } catch (e) {
    logger(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const enableTwoFa = (data: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.enable_two_fa(data);
    if (response.success) {
      dispatch(getUserProfile());
      NavigationService.navigate(NAVIGATION_BOTTOM_TAB_STACK);
      showError(response?.message);
    } else {
      showError(response?.message);
    }
  } catch (e) {
    logger(e);
    showError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};
