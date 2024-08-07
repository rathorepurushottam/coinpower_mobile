import React, {useEffect, useRef, useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  Checkbox,
  FOURTEEN,
  Input,
  SECOND,
  SEMI_BOLD,
  TWENTY,
  TWENTY_SIX,
  Toolbar,
  WHITE,
  YELLOW,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import {Keyboard, View} from 'react-native';
import {authStyles} from './authStyles';
import {CAPTCHA_KEY, SITE_URL} from '../../helper/Constants';
import {showError} from '../../helper/logger';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {register, sendOtp} from '../../actions/authActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {
  checkValue,
  validateEmail,
  validatePassword,
} from '../../helper/utility';
import NavigationService from '../../navigation/NavigationService';
import {CMS_SCREEN, LOGIN_SCREEN} from '../../navigation/routes';
import {RenderTabBarAuth} from './Login';
import {PickerSelect} from '../../common/PickerSelect';
import {countryCodes} from '../../helper/dummydata';
import Recaptcha from 'react-native-recaptcha-that-works';

const Register = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [email, setEmail] = useState<string>('');
  const [eOtp, setEotp] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [referCode, setReferCode] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [otpText, setOtpText] = useState(checkValue(languages?.register_nine));
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [countryCode, setCountryCode] = useState('91');
  const [isCheck, setIsCheck] = useState(false);

  const otpInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const referCodeInput = useRef(null);
  const recaptcha = useRef();

  // useEffect(() => {
  //   setUserName('');
  //   setOtp('');
  //   setConfirmPassword('');
  //   setPassword('');
  //   setReferCode('');
  // }, [index]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onSubmit = () => {
    // if (!mobile) {
    //   showError(checkValue(languages?.error_userName));
    //   return;
    // }
    // if (!validateEmail(email)) {
    //   showError(checkValue(languages?.error_email));
    //   return;
    // }
    if(index === 1) {
      if(!validateEmail(email)) {
        showError(checkValue(languages?.error_email));
          return;
      }
    }
    if(index === 0) {
      if(mobile.length != 10) {
        showError(checkValue(languages?.error_userName));
         return;
      }
    }
    // if (!otp) {
    //   showError(checkValue(languages?.error_M_otp));
    //   return;
    // }
    if (!eOtp) {
      showError(checkValue(languages?.error_E_otp));
      return;
    }
    if (!validatePassword(password)) {
      showError(checkValue(languages?.error_passwordRegex));
      return;
    }
    if (password !== confirmPassword) {
      showError(checkValue(languages?.error_passwordMismatch));
      return;
    }
    if (!isCheck) {
      showError(checkValue(languages?.error_terms));
      return;
    }
    onVerify();
  };
  const onGetOtp = (addr: any) => {
    if (!addr) {
      showError(checkValue(index === 0 ? languages?.error_Phone : languages?.error_Email));
      return;
    }
    let data = {
      email_or_phone: addr,
      resend: true,
      type: 'registration',
    };
    dispatch(sendOtp(data));
    setOtpText(checkValue(languages?.register_ten));
    Keyboard.dismiss();
  };

  const onLogin = () => {
    NavigationService.navigate(LOGIN_SCREEN);
  };

  const send = () => {
    recaptcha?.current?.open();
  };

  const onVerify = (token: string) => {
    let data = {
      country_code: `+${countryCode}`,
      email_or_phone: index === 0 ? mobile : email,
      // mobileNumber: mobile,
      verification_code: eOtp,
      // motp: otp,
      password: password,
      confirm_password: confirmPassword,
      // verification_code: otp,
      referral_code: referCode,
    };
    console.log(data, '==data');

    dispatch(register(data));
  };
  const onExpire = () => {};
  return (
    <AppSafeAreaView>
      <Toolbar />
      <KeyBoardAware>
        <View style={authStyles.forgotContainer}>
          <AppText type={TWENTY}>
            {checkValue(languages?.register_one)}
            {'\n'}
            <AppText type={TWENTY_SIX} weight={SEMI_BOLD} color={YELLOW}>
              {checkValue(languages?.register_two)}
            </AppText>
          </AppText>
          <AppText type={FOURTEEN}>
            {checkValue(languages?.register_three)}
          </AppText>
          <RenderTabBarAuth index={index} setIndex={setIndex} />
          <Input
            placeholder={index === 0 ? 'Enter Mobile' : checkValue(languages?.place_email)}
            value={index === 0 ? mobile : email}
            onChangeText={text => index === 0 ? setMobile(text) : setEmail(text)}
            keyboardType={index === 0 ? 'numeric' : 'email-address'}
            autoCapitalize="none"
            returnKeyType="next"
            // onSubmitEditing={() => otpInput?.current?.focus()}
            mainContainer={authStyles.mobileInput}
            maxLength={index === 0 ? 10 : 100}
          />
          <Input
            placeholder={checkValue(languages?.place_otp)}
            value={eOtp}
            onChangeText={text => setEotp(text)}
            keyboardType="numeric"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordInput?.current?.focus()}
            assignRef={input => {
              otpInput.current = input;
            }}
            isOtp
            onSendOtp={() => onGetOtp(index === 0 ? mobile :  email)}
            otpText={otpText}
          />
          {/* <View style={authStyles.mobileContainer}>
            {index === 0 && (
              <PickerSelect
                data={countryCodes}
                value={countryCode}
                onChange={setCountryCode}
                placeholder={{
                  label: checkValue(languages?.place_country),
                  value: '',
                }}
                container={authStyles.picker}
              />
            )}
            <Input
              placeholder={checkValue(languages?.place_userName)}
              value={mobile}
              onChangeText={text => setMobile(text)}
              keyboardType={index === 0 ? 'numeric' : 'email-address'}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => otpInput?.current?.focus()}
              mainContainer={authStyles.mobileInput}
              maxLength={index === 0 ? 10 : 100}
            />
          </View> */}

          {/* <Input
            placeholder={checkValue(languages?.place_otp)}
            value={otp}
            onChangeText={text => setOtp(text)}
            keyboardType="numeric"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordInput?.current?.focus()}
            assignRef={input => {
              otpInput.current = input;
            }}
            isOtp
            onSendOtp={() => onGetOtp(mobile, "phone")}
            otpText={otpText}
          /> */}
          <Input
            placeholder={checkValue(languages?.place_signUpPassword)}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible}
            assignRef={input => {
              passwordInput.current = input;
            }}
            returnKeyType="next"
            isSecure
            onSubmitEditing={() => confirmPasswordInput?.current?.focus()}
            onPressVisible={() => setIsPasswordVisible(!isPasswordVisible)}
          />
          <Input
            placeholder={checkValue(languages?.place_signUPConfirmPassword)}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isConfirmPasswordVisible}
            assignRef={input => {
              confirmPasswordInput.current = input;
            }}
            returnKeyType="next"
            isSecure
            onSubmitEditing={() => referCodeInput?.current?.focus()}
            onPressVisible={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          />
          <Input
            placeholder={checkValue(languages?.place_referCode)}
            value={referCode}
            onChangeText={text => setReferCode(text)}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={() => onSubmit()}
          />
          <View style={authStyles.checkboxContainer}>
            <Checkbox value={isCheck} onChange={() => setIsCheck(!isCheck)} />
            <AppText
              onPress={() => {
                NavigationService.navigate(CMS_SCREEN, {
                  id: 'https://coinpowerexchange.com/mobTermsOfUsePage',
                });
              }}
              color={WHITE}>
              {'  '} {checkValue(languages?.register_four)}{' '}
              <AppText color={WHITE} style={authStyles.termsText}>
                {checkValue(languages?.register_five)}
              </AppText>
              <AppText color={WHITE}> *</AppText>
            </AppText>
          </View>
          <Button
            children={checkValue(languages?.register_six)}
            onPress={() => onSubmit()}
            containerStyle={authStyles.marginTop}
          />
        </View>
        {!isKeyboardVisible && (
          <AppText weight={SEMI_BOLD} style={authStyles.bottomTextLogin}>
            {checkValue(languages?.register_seven)}{' '}
            <AppText
              weight={SEMI_BOLD}
              color={YELLOW}
              onPress={() => onLogin()}>
              {checkValue(languages?.register_eight)}
            </AppText>
          </AppText>
        )}
      </KeyBoardAware>
      <Recaptcha
        ref={recaptcha}
        siteKey={CAPTCHA_KEY}
        baseUrl={SITE_URL}
        onVerify={onVerify}
        onExpire={onExpire}
        size="normal"
      />
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default Register;
