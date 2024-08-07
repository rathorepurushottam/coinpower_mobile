import React, {useState} from 'react';
import {AppSafeAreaView, AppText, Button, Input, Toolbar} from '../../common';
import {useRoute} from '@react-navigation/native';
import KeyBoardAware from '../../common/KeyboardAware';
import {Keyboard, StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import {errorText, placeHolderText} from '../../helper/Constants';
import {showError} from '../../helper/logger';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {enableTwoFa} from '../../actions/accountActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {verifyOtp} from '../../actions/authActions';

const EnterOtp = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.auth.userData);
  const {emailId} = userData ?? '';
  const route = useRoute();
  const title = route?.params?.title ?? '';
  const isLogin = route?.params?.isLogin ?? '';
  const authType = route?.params?.authType ?? '';
  const [code, setCode] = useState('');
  const onSubmit = () => {
    if (!code) {
      showError(errorText.otp);
      return;
    }

    Keyboard.dismiss();
    if (isLogin) {
      const data = {
        email_or_phone: emailId,
        otp: code,
        type: authType,
      };
      dispatch(verifyOtp(data));
    } else {
        const data = {
          email_or_phone: emailId,
         type: authType,
         verification_code: code,
       };
       dispatch(enableTwoFa(data));
      
     
    }
    setCode('');
  };
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={title} />
      <KeyBoardAware>
        <AppText style={{alignSelf: "center"}}>{authType === 2 ? "Your Code will be sent to Authenticator App" :`Your Code will be sent to ${emailId}`}</AppText>
        <View style={styles.container}>
          <Input
            title={placeHolderText.code}
            placeholder={placeHolderText.code}
            value={code}
            onChangeText={text => setCode(text)}
            autoCapitalize="none"
            returnKeyType="done"
            keyboardType="numeric"
            onSubmitEditing={() => onSubmit()}
          />
        </View>
        <Button
        children="Submit"
        disabled={!code}
        onPress={() => onSubmit()}
        containerStyle={styles.button}
      />
      </KeyBoardAware>
      
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default EnterOtp;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    marginTop: universalPaddingTop,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  button: {
    marginTop: 500
  },
});
