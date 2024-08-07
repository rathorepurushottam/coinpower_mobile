import React, {useRef, useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  BLACK,
  Button,
  FOURTEEN,
  Input,
  SECOND,
  SEMI_BOLD,
  TEN,
  Toolbar,
  TWELVE,
} from '../../common';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {useRoute} from '@react-navigation/native';
import {sendOtp} from '../../actions/authActions';
import {Keyboard, StyleSheet, View} from 'react-native';
import {showError} from '../../helper/logger';
import {errorText, placeHolderText, titleText} from '../../helper/Constants';
import KeyBoardAware from '../../common/KeyboardAware';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingTop,
} from '../../theme/dimens';
import {withdrawCoin} from '../../actions/walletActions';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import { checkValidAmount, validateEmail } from '../../helper/utility';

const Withdraw = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const walletDetail = route?.params?.walletDetail;
  const balance = route?.params?.balance;
  const userData = useAppSelector(state => state.auth.userData);
  const {chain, currency} = walletDetail ?? '';
  const {emailId} = userData ?? '';
  const [otp, setOtp] = useState<string>('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [coinChain, setCoinChain] = useState(chain[0]);
  const [otpText, setOtpText] = useState('Get OTP');
  const addressInput = useRef(null);
  const amountInput = useRef(null);
  const onGetOtp = () => {
    let data = {
      email_or_phone: emailId,
      resend: true,
      type: false,
    };
    dispatch(sendOtp(data));
    setOtpText('Resend OTP');
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    if (!otp) {
      showError(errorText.otp);
      return;
    }
    if (!address) {
      showError(errorText.wallet);
      return;
    }
    if (!amount) {
      showError(errorText.amount);
      return;
    }
    if (!checkValidAmount(amount) || (parseInt(amount) < 0)) {
        showError("Please Enter Valid Amount");
        return;
    }
    if(parseInt(amount) > balance) {
      showError('You do not have sufficent balance!');
      return;
    }
    
    let data = {
      otp: otp,
      address: address,
      amount: amount,
      email_or_phone: emailId,
      chain: coinChain,
      currency_id: walletDetail?._id
    };
    Keyboard.dismiss();
    dispatch(withdrawCoin(data));
  };

  // console.log(walletDetail, 'walletDetail');
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={`Withdraw ${walletDetail?.short_name}`} />
      <KeyBoardAware>
        <View style={styles.container}>
        <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'space-evenly',
            }}>
            {chain?.length > 0 ? (
              chain?.map(item => (
                <TouchableOpacityView
                  style={{
                    backgroundColor: coinChain === item ? colors.buttonBg :colors.textGray,
                    padding: 10,
                    alignItems: 'center',
                    borderRadius: 10
                  }}
                  onPress={() => setCoinChain(item)}
                  >
                  <AppText color={BLACK} type={TWELVE} weight={SEMI_BOLD}>
                    {item}
                  </AppText>
                </TouchableOpacityView>
              ))
            ) : (
              <AppText>No chain Availbale</AppText>
            )}
          </View>
          <Input
            title={titleText.code}
            placeholder={placeHolderText.code}
            value={otp}
            onChangeText={text => setOtp(text)}
            keyboardType="numeric"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => addressInput?.current?.focus()}
            isOtp
            onSendOtp={() => onGetOtp()}
            otpText={otpText}
          />
          <Input
            title={titleText.wallet}
            placeholder={placeHolderText.wallet}
            value={address}
            onChangeText={text => setAddress(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            assignRef={input => {
              addressInput.current = input;
            }}
            onSubmitEditing={() => amountInput?.current?.focus()}
          />
          <Input
            title={titleText.amount}
            placeholder={placeHolderText.amount}
            value={amount}
            onChangeText={text => setAmount(text)}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => onSubmit()}
            assignRef={input => {
              amountInput.current = input;
            }}
          />
          
        </View>
        <View style={styles.container}>
          <AppText color={SECOND} weight={SEMI_BOLD} type={FOURTEEN}>
            Disclaimer:
          </AppText>
          <AppText style={styles.disclaimerText} color={SECOND}>
            •  Minimum Withdrawal should be of {walletDetail?.min_withdrawal}
          </AppText>
          <AppText style={styles.disclaimerText} color={SECOND}>
            • Maximum Withdrawal should be of : {walletDetail?.max_withdrawal}
          </AppText>
          <AppText style={styles.disclaimerText} color={SECOND}>
            • Withdrawal Fee will be: {walletDetail?.withdrawal_fee}
          </AppText>
        </View>
        <Button
          children="Withdraw"
          onPress={() => onSubmit()}
          containerStyle={styles.button}
        />
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};
export default Withdraw;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    marginTop: universalPaddingTop,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  button: {marginTop: 50},
  disclaimerText: {
    marginVertical: 5,
  },
});
