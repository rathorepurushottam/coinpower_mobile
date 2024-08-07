import React, {useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  Input,
  SECOND,
  SEMI_BOLD,
  THIRTY,
  THIRTY_FOUR,
  Toolbar,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import {Keyboard, StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingTop,
} from '../../theme/dimens';
import {errorText, placeHolderText, titleText} from '../../helper/Constants';
import {twoFixedZero} from '../../helper/utility';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {showError} from '../../helper/logger';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {withdrawInr} from '../../actions/walletActions';
import {useRoute} from '@react-navigation/native';

const WithdrawInr = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const walletDetail = route?.params?.walletDetail;
  const {balance, locked_balance} = walletDetail ?? '';
  console.log('eal:::', walletDetail);

  const walletBalance = Number(balance) + Number(locked_balance);
  const currency = useAppSelector(state => state.home.currency);
  const [amount, setAmount] = useState('');
  const onSubmit = () => {
    if (!amount) {
      showError(errorText.amount);
      return;
    }
    let data = {amount: amount};
    dispatch(withdrawInr(data));
    Keyboard.dismiss();
  };
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={'Withdraw Funds'} />
      <KeyBoardAware>
        <View style={styles.container}>
          <View>
            <AppText type={FOURTEEN}>Your Overall Balance</AppText>
            <AppText type={THIRTY} weight={SEMI_BOLD}>
              {`${currency}${twoFixedZero(walletBalance)}`}
              <AppText type={THIRTY} weight={SEMI_BOLD} color={SECOND}>
                .00
              </AppText>
            </AppText>
          </View>
          <Input
            title={titleText.amount}
            placeholder={placeHolderText.amount}
            value={amount}
            onChangeText={text => setAmount(text)}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => onSubmit()}
          />
        </View>
        <Button
          children="Withdraw"
          onPress={() => onSubmit()}
          containerStyle={styles.button}
        />
      </KeyBoardAware>
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};
export default WithdrawInr;
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
});
