import React, {useEffect, useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  Input,
  SEMI_BOLD,
  TWENTY,
  TWENTY_SIX,
  Toolbar,
  YELLOW,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import {ImageBackground, Keyboard, View} from 'react-native';
import {authStyles} from './authStyles';
import {showError} from '../../helper/logger';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {sendOtp} from '../../actions/authActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {RenderTabBarAuth} from './Login';
import {PickerSelect} from '../../common/PickerSelect';
import {countryCodes} from '../../helper/dummydata';
import {checkValue, validateEmail} from '../../helper/utility';
import { HOME_BG } from '../../helper/ImageAssets';
import { Screen } from '../../theme/dimens';

const ForgotPassword = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [userName, setUserName] = useState<string>('');
  const [index, setIndex] = useState(0);
  const [countryCode, setCountryCode] = useState('91');

  useEffect(() => {
    setUserName('');
  }, [index]);

  const onGetOtp = () => {
    if (index === 0 && !userName) {
      showError(checkValue(languages?.error_userName));
      return;
    }
    if (index === 1 && !validateEmail(userName)) {
      showError(checkValue(languages?.error_email));
      return;
    }
    let data = {
      email_or_phone: userName,
      resend: true,
      type: 'forgot',
    };
    Keyboard.dismiss();
    dispatch(sendOtp(data, true));
  };

  return (
    <AppSafeAreaView>
    <ImageBackground source={HOME_BG}style={{ height:Screen.Height,width:Screen.Width}}>
      <Toolbar />
      <KeyBoardAware>
        <View style={authStyles.forgotContainer}>
          <AppText type={TWENTY}>
            {checkValue(languages?.forgot_one)}
            {'\n'}
            <AppText type={TWENTY_SIX} weight={SEMI_BOLD} color={YELLOW}>
              {checkValue(languages?.forgot_two)}
            </AppText>
          </AppText>
          <AppText type={FOURTEEN}>
            {checkValue(languages?.forgot_three)}
          </AppText>
          <RenderTabBarAuth index={index} setIndex={setIndex} />
          <View style={authStyles.mobileContainer}>
            {/* {index === 0 && (
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
            )} */}
            <Input
              placeholder={
                index ===0 ? 'Enter Mobile' : checkValue(languages?.place_email)
              }
              value={userName}
              onChangeText={text => setUserName(text)}
              keyboardType={index === 0 ? 'numeric' : 'email-address'}
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={() => onGetOtp()}
              maxLength={index === 0 ? 10 : 100}
              mainContainer={authStyles.mobileInput}
            />
          </View>

          <Button
            children={checkValue(languages?.forgot_four)}
            onPress={() => onGetOtp()}
            containerStyle={authStyles.marginTop}
          />
        </View>
      </KeyBoardAware>
      <SpinnerSecond />
      </ImageBackground>
    </AppSafeAreaView>
  );
};

export default ForgotPassword;
