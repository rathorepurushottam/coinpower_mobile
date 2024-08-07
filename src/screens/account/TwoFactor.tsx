import React, {useEffect, useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  SEMI_BOLD,
  Toolbar,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import {StyleSheet, View} from 'react-native';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {generateTwoFactorQr} from '../../actions/accountActions';
import {sendOtp} from '../../actions/authActions';
import NavigationService from '../../navigation/NavigationService';
import {ENTER_OTP_SCREEN} from '../../navigation/routes';
import {commonStyles} from '../../theme/commonStyles';
import {Switch} from 'react-native-switch';
import {colors} from '../../theme/colors';

const SingleBoxNotificationSettings = ({title, state, setState, value}) => {
  return (
    <View style={styles.singleBox}>
      <AppText weight={SEMI_BOLD}>{title}</AppText>
      <Switch
        value={state}
        onValueChange={val => setState(value)}
        disabled={state}
        circleSize={18}
        barHeight={22}
        circleBorderWidth={0}
        backgroundActive={colors.buttonBg}
        backgroundInactive={colors.inputBorder}
        circleActiveColor={colors.white}
        circleInActiveColor={colors.white}
        changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
        renderActiveText={false}
        renderInActiveText={false}
        innerCircleStyle={{}}
        switchLeftPx={3}
        switchRightPx={3}
      />
    </View>
  );
};

const TwoFactor = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.auth.userData);

  const {emailId, mobileNumber} = userData ?? '';
  // console.log('userDAta:', userData);

  const [isAuth, setIsAuth] = useState(0);

  useEffect(() => {
    if (userData && userData['2fa']) {
      setIsAuth(userData['2fa']);
      return;
    }
  }, []);

  const onSubmit = () => {
    if (isAuth === 2) {
      dispatch(generateTwoFactorQr());
    } else {
      const data = {
        email_or_phone: emailId,
        resend: true,
      };
      dispatch(sendOtp(data));
      NavigationService.navigate(ENTER_OTP_SCREEN, {
        title: 'Verify Email OTP',
        removeAuth: true,
        authType: isAuth,
      });
    }
  };
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={'Two Factor Authentication'} />
      <KeyBoardAware style={styles.container}>
        <SingleBoxNotificationSettings
          title={'Authenticator App'}
          state={isAuth === 2}
          setState={setIsAuth}
          value={2}
        />
        {mobileNumber && <SingleBoxNotificationSettings
          title={'Mobile OTP'}
          state={isAuth === 3}
          setState={setIsAuth}
          value={3}
        />}
        {emailId && <SingleBoxNotificationSettings
          title={'Email OTP'}
          state={isAuth === 1}
          setState={setIsAuth}
          value={1}
        />}
        
        <SingleBoxNotificationSettings
          title={'None'}
          state={isAuth === 0}
          setState={setIsAuth}
          value={0}
        />
         <View style={commonStyles.backGround}>
        <Button
          children="Submit"
          onPress={() => onSubmit()}
          disabled={isAuth === userData['2fa']}
          containerStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
        </View>
      </KeyBoardAware>
     
        
      
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default TwoFactor;
const styles = StyleSheet.create({
  container: {
    paddingTop: universalPaddingTop,
  },
  button: {
    margin: universalPaddingHorizontalHigh,
  },
  buttonTitle: {},
  singleBox: {
    paddingHorizontal: universalPaddingHorizontalHigh,
    marginVertical: 5,
    paddingVertical: universalPaddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: borderWidth,
    borderRadius: 10,
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBorder,
    // elevation: 0.5,
  },
});
