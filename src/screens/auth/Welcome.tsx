import React from 'react';
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  Button,
  TEN,
  FOURTEEN,
  SECOND,
  THIRTY_FOUR,
  YELLOW,
} from '../../common';
import {tradeSign, welcomeBg} from '../../helper/ImageAssets';
import {View} from 'react-native';
import {authStyles} from './authStyles';
import FastImage from 'react-native-fast-image';
import NavigationService from '../../navigation/NavigationService';
import {LOGIN_SCREEN} from '../../navigation/routes';
import KeyBoardAware from '../../common/KeyboardAware';
import {useAppSelector} from '../../store/hooks';
import {checkValue} from '../../helper/utility';

const Welcome = (): JSX.Element => {
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const onLogin = () => {
    NavigationService.navigate(LOGIN_SCREEN);
  };

  return (
    <AppSafeAreaView source={welcomeBg}>
      <KeyBoardAware>
        <View style={authStyles.welcomeSecondContainer}>
          <AppText type={THIRTY_FOUR} weight={BOLD}>
            {checkValue(languages?.welcome_one)}
            {'\n'}
            {checkValue(languages?.welcome_two)}
          </AppText>
          <FastImage
            source={tradeSign}
            resizeMode="contain"
            style={authStyles.tradeSign}
          />
          <AppText type={FOURTEEN} color={SECOND} style={authStyles.marginTop}>
            {checkValue(languages?.welcome_three)}
            {'\n'}
            {checkValue(languages?.welcome_four)}
          </AppText>
          <Button
            children={checkValue(languages?.welcome_five)}
            containerStyle={authStyles.welcomeButton}
            onPress={() => onLogin()}
          />
        </View>
      </KeyBoardAware>
      <AppText color={SECOND} style={authStyles.bottomText}>
        {checkValue(languages?.welcome_six)}{' '}
        <AppText color={YELLOW}>
          {checkValue(languages?.welcome_seven)}{' '}
        </AppText>
        {checkValue(languages?.welcome_eight)}
      </AppText>
    </AppSafeAreaView>
  );
};

export default Welcome;
