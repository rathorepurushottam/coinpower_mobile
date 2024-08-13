import React, {useEffect, useRef, useState} from 'react';
import NavigationService from '../../navigation/NavigationService';
import {FORGOT_PASSWORD_SCREEN, REGISTER_SCREEN} from '../../navigation/routes';
import {
  AppSafeAreaView,
  AppText,
  BLACK,
  Button,
  FOURTEEN,
  Input,
  SEMI_BOLD,
  TWENTY,
  TWENTY_SIX,
  Toolbar,
  WHITE,
  YELLOW,
} from '../../common';
import {welcomeBg, welcomeBg2} from '../../helper/ImageAssets';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import {authStyles} from './authStyles';
import {CAPTCHA_KEY, SITE_URL} from '../../helper/Constants';
import KeyBoardAware from '../../common/KeyboardAware';
import {showError} from '../../helper/logger';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {login} from '../../actions/authActions';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import {checkValue, validateEmail} from '../../helper/utility';
import Recaptcha from 'react-native-recaptcha-that-works';
import {Screen} from '../../theme/dimens';
export const RenderTabBarAuth = (props: any) => {
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const routes = [
    {key: 'first', title: checkValue(languages?.mobile)},
    {key: 'second', title: checkValue(languages?.email)},
  ];
  return (
    <View style={authStyles.tabBarMain}>
      {routes.map((route, i) => {
        return (
          <TouchableOpacityView
            key={i}
            onPress={() => props?.setIndex(i)}
            style={
              i === props?.index
                ? authStyles.tabBarActive
                : authStyles.tabBarInActive
            }>
            <AppText
              type={FOURTEEN}
              weight={SEMI_BOLD}
              color={i === props?.index ? YELLOW : WHITE}>
              {route.title}
            </AppText>
          </TouchableOpacityView>
        );
      })}
    </View>
  );
};

const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const passwordInputRef = useRef(null);
  const [getfoucs, setFoucs] = useState(false);
  const [getfoucsPass, setFoucsPass] = useState(false);

  const recaptcha = useRef();

  useEffect(() => {
    setUserName('');
    setPassword('');
  }, [index]);

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

  const onLogin = () => {
    if(index === 1) {
      if(!validateEmail(userName)) {
        showError(checkValue(languages?.error_email));
          return;
      }
    }
    if(index === 0) {
      if(userName.length != 10) {
        showError(checkValue(languages?.error_userName));
         return;
      }
    }
    // else {
    //   
    // }
    if (!userName) {
      showError(checkValue(languages?.error_userName_value));
      return;
    }
  
    if (!password) {
      showError(checkValue(languages?.error_password));
      return;
    }
    Keyboard.dismiss();
    onVerify();
  };
  const onRegister = () => {
    NavigationService.navigate(REGISTER_SCREEN);
  };
  const onForgot = async () => {
    NavigationService.navigate(FORGOT_PASSWORD_SCREEN);
  };

  const onVerify = () => {
    let data = {
      email_or_phone: userName,
      password: password,
    };

    dispatch(login(data));
  };

  const onExpire = () => {};

  return (
    <AppSafeAreaView source={welcomeBg2}>
      <Toolbar isLogo={false} isLogin={true}/>
      <KeyBoardAware>
        <View
          style={[
            authStyles.welcomeSecondContainer2,
            {
              marginTop:
                Platform.OS === 'ios'
                  ? Screen.Height / 2.8
                  : Screen.Height / 2.3,
              // marginTop: getfoucs ? Screen.Height / 3.5 :getfoucsPass ? Screen.Height / 4: Screen.Height / 2.5,
            },
          ]}>
          <AppText type={TWENTY}>
            {checkValue(languages?.login_one)}
            {'\n'}
            <AppText type={TWENTY_SIX} weight={SEMI_BOLD} color={YELLOW}>
              {checkValue(languages?.login_two)}
            </AppText>
          </AppText>

          <AppText type={FOURTEEN}>
            {checkValue(languages?.login_three)}
          </AppText>
          <RenderTabBarAuth index={index} setIndex={setIndex} />
          <View style={[authStyles.mobileContainer, authStyles.marginUp]}>
            <Input
              placeholder={index === 0 ? 'Enter Mobile' : checkValue(languages?.place_login_userName)}
              value={userName}
              onChangeText={text => setUserName(text)}
              keyboardType={index === 0 ? 'numeric' : 'email-address'}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef?.current?.focus()}
              maxLength={100}
              mainContainer={authStyles.mobileInput}
              onfocus={() => setFoucs(true)}
              onBlur={() => setFoucs(false)}
            />
          </View>
          <Input
            placeholder={checkValue(languages?.place_password)}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!isPasswordVisible}
            isSecure={true}
            onSubmitEditing={() => onLogin()}
            onPressVisible={() => setIsPasswordVisible(!isPasswordVisible)}
            onfocus={() => setFoucsPass(true)}
            onBlur={() => setFoucsPass(false)}
          />
          <AppText onPress={() => onForgot()} style={authStyles.forgotText}>
            {checkValue(languages?.login_seven)}
          </AppText>
          <Button
            children={checkValue(languages?.login_four)}
            onPress={() => onLogin()}
            containerStyle={authStyles.welcomeButton}
          />
        </View>
        {!isKeyboardVisible && (
            <AppText
              
              weight={SEMI_BOLD}
              style={authStyles.bottomTextLogin}>
              {checkValue(languages?.login_five)}{' '}
              <AppText weight={SEMI_BOLD} color={YELLOW} onPress={() => onRegister()}>
                {checkValue(languages?.login_six)}
              </AppText>
            </AppText>
        )}
      </KeyBoardAware>

      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default Login;
