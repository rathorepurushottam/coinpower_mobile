import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  Button,
  FIFTEEN,
  FOURTEEN,
  Input,
  MEDIUM,
  SEMI_BOLD,
  SIXTEEN,
  THIRTEEN,
  Toolbar,
  WHITE,
  YELLOW,
} from '../../common';
import BuySellTab from '../../common/BuySellTab';
import {Screen} from '../../theme/dimens';
import {colors} from '../../theme/colors';
import FastImage from 'react-native-fast-image';
import {
  Frame1,
  RECYCLE,
  REMOVE,
  bitcoinIcon,
  bitcoin_ic,
  convertTo,
  downIcon,
  starIcon,
  upDownIc,
  uploadIcon,
} from '../../helper/ImageAssets';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import RbSheet from '../../common/RbSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {QS_Buy, getQbsHistory} from '../../actions/homeActions';
import {BASE_URL} from '../../helper/Constants';
import NavigationService from '../../navigation/NavigationService';
import {KYC_STATUS_SCREEN, QS_TRANSACTION} from '../../navigation/routes';
import {getUserWallet} from '../../actions/walletActions';
import {showError} from '../../helper/logger';
import { toFixedSix } from '../../helper/utility';

const QuickBuySell = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const sheetRef = useRef(null);
  const amountRef = useRef(null);
  const [buyAmount, setBuyAmount] = useState(0);
  const [payAmount, setPayAmount] = useState('');
  const [contentChangeKey, setContentChangeKey] = useState('');
  const coinData = useAppSelector(state => state.home.coinPairs);
  const userData = useAppSelector(state => state.auth.userData);


  const filterCurrency = coinData && coinData?.filter(item => item?.quote_currency === 'coinpower');

  const [coinImg, setCoinImg] = useState(filterCurrency[0]?.icon_path);
  const [firstCoin, setFirstCoin] = useState(
    filterCurrency[0]?.base_currency,
  );
  const [secondCoin, setSecondCoin] = useState(
    filterCurrency[0]?.quote_currency,
  );
  const [currencyTotal, setCurrencyTotal] = useState(
    filterCurrency[0]?.buy_price,
  );
  const calculatedAmount = (
    contentChangeKey === 'Buy'
      ? parseFloat(buyAmount) / parseFloat(currencyTotal)
      : parseFloat(buyAmount) * parseFloat(currencyTotal)
  ).toString();
  const displayAmount = isNaN(calculatedAmount) ? '0' : toFixedSix(calculatedAmount);
  const {kycVerified} = userData ?? '';
  const onButtonPress = () => {
    if (kycVerified !== 2) {
      NavigationService.navigate(KYC_STATUS_SCREEN);
      return;
    }
    if (!buyAmount || buyAmount <= 0) {
      showError('Please Enter valid Amount');
      return;
    }
    const data = {
      base_currency: firstCoin,
      quote_currency: secondCoin,
      side: contentChangeKey == 'Buy' ? 'BUY' : 'SELL',
      amount: buyAmount?.toString(),
      swapped_amount: displayAmount,
    };
    dispatch(QS_Buy(data));
    // console.log('Succesfull', buyAmount)
    dispatch(getUserWallet());
    setBuyAmount(0);
  };

  // console.log(contentChangeKey, 'contentChangeKey');
  // console.log(filterCurrency, "filterCurrency");

  return (
    <AppSafeAreaView>
      <ScrollView style={{flex: 1}}>
        <Toolbar
          isSecond
          title="Quick Buy/Sell"
          isLogo={false}
          isFifth
          onFifthPress={() => NavigationService.navigate(QS_TRANSACTION)}
        />
        <BuySellTab
          onKeyPressChange={e => {
            setContentChangeKey(e);
          }}
          onPress={() => {
            // setBuyAmount(''),
            // setPayAmount(''),
            // setCurrencyTotal('380094'),
            // setCurrencyName('Bitcoin'),
            // setCurrencyImg(bitcoinIcon?.uri);
          }}
        />
        {contentChangeKey === 'Buy' ? (
          /* --------BUY CONTENT------- */
          <>
            <TouchableOpacityView
              style={styles.buttonContainer}
              onPress={() => {
                sheetRef?.current?.open();
              }}>
              <View style={styles.btnContent}>
                <FastImage
                  source={{uri: `${BASE_URL}/${coinImg}`}}
                  resizeMode="contain"
                  style={styles.startImg}
                />
                <AppText type={THIRTEEN} style={styles.textContent}>
                  {firstCoin}
                </AppText>
              </View>
              <View style={styles.btnContent1}>
                {/* <AppText>{secondCoin || ''}</AppText> */}
                <FastImage
                  source={downIcon}
                  resizeMode="contain"
                  tintColor={colors.white}
                  style={styles.downImgStyle}
                />
              </View>
            </TouchableOpacityView>
            <AppText style={styles.coinAmount}>
              1 {firstCoin} = {currencyTotal} {secondCoin}
            </AppText>

            <AppText style={styles.payText}>Pay Amount</AppText>

            <View style={styles.inputContainer}>
              <TextInput
                value={buyAmount.toString()}
                keyboardType="decimal-pad"
                onChangeText={e => {
                  setBuyAmount(e);
                }}
                style={styles.inputStyle}></TextInput>
              <View style={styles.getCurrencyContain}>
                <AppText color={YELLOW}>coinpower</AppText>
              </View>
            </View>
            <FastImage
              source={{uri: `${BASE_URL}/${coinImg}`}}
              style={styles.convertIcon}
            />
            <AppText style={styles.currencyText}>Currency You Get</AppText>
            <View style={styles.currencyBox}>
              <TextInput
                editable={false}
                keyboardType="decimal-pad"
                value={displayAmount}
                onChangeText={e => {
                  setPayAmount(e);
                }}
                style={styles.currencyBoxInput}></TextInput>
              <View style={styles.contain}>
                <AppText color={YELLOW} style={styles.coin}>
                  {firstCoin}
                </AppText>
              </View>
            </View>
          </>
        ) : (
          // * --------SELL CONTENT------- *
          <>
            <TouchableOpacityView
              style={styles.buttonContainer}
              onPress={() => {
                sheetRef?.current?.open();
              }}>
              <View style={styles.btnContent}>
                <FastImage
                  source={{uri: `${BASE_URL}/${coinImg}`}}
                  resizeMode="contain"
                  style={styles.startImg}
                />
                <AppText type={THIRTEEN} style={styles.textContent}>
                  {firstCoin}
                </AppText>
              </View>
              <View style={styles.btnContent1}>
                {/* <AppText>{baseCurrency || ''}</AppText> */}
                <FastImage
                  source={downIcon}
                  resizeMode="contain"
                  tintColor={colors.white}
                  style={styles.downImgStyle}
                />
              </View>
            </TouchableOpacityView>
            <AppText style={styles.coinAmount}>
              1 {firstCoin} = {currencyTotal} {secondCoin}
            </AppText>
            <AppText style={styles.payText}>Pay Amount</AppText>

            <View style={styles.inputContainer}>
              <TextInput
                value={buyAmount.toString()}
                keyboardType="decimal-pad"
                onChangeText={e => {
                  setBuyAmount(e);
                }}
                style={styles.inputStyle}></TextInput>
              <View style={styles.getCurrencyContain}>
                <AppText color={YELLOW}>{firstCoin}</AppText>
              </View>
            </View>
            <FastImage
              source={{uri: `${BASE_URL}/${coinImg}`}}
              style={styles.convertIcon}
            />
            <AppText style={styles.currencyText}>Currency You Get</AppText>
            <View style={styles.currencyBox}>
              <TextInput
                editable={false}
                keyboardType="decimal-pad"
                value={displayAmount}
                onChangeText={e => {
                  setPayAmount(e);
                }}
                style={styles.currencyBoxInput}></TextInput>
              <View style={styles.contain}>
                <AppText color={YELLOW} style={styles.coin}>
                  {secondCoin}
                </AppText>
              </View>
            </View>
          </>
        )}
        <View style={{height: 20}}></View>
        <RBSheet
          ref={sheetRef}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={80}
          animationType="none"
          customStyles={{
            container: styles.sheetContainer,
            wrapper: {
              backgroundColor: '#0006',
            },
            draggableIcon: {
              backgroundColor: 'transparent',
            },
          }}>
          <View style={styles.currencyHeader}>
            <View style={styles.emptyView}></View>
            <AppText type={THIRTEEN} weight={MEDIUM}>
              Choose Cryptocurrency
            </AppText>
            <TouchableOpacityView
              onPress={() => {
                sheetRef?.current?.close();
              }}>
              <FastImage source={REMOVE} style={styles.removeImg} />
            </TouchableOpacityView>
          </View>
          <View style={styles.cryptoSheetContainer}>
            <FlatList
              data={filterCurrency}
              renderItem={({item, index}) => {
                let imgPath = `${BASE_URL}${item?.icon_path}`;
                return (
                  <TouchableOpacityView
                    onPress={() => {
                      setCoinImg(item?.icon_path),
                        setFirstCoin(item?.base_currency),
                        setSecondCoin(item?.quote_currency),
                        setCurrencyTotal(item?.buy_price);
                    }}
                    style={styles.cryptoSheetList}>
                    <View style={styles.cryptoContentView}>
                      <FastImage
                        source={{uri: imgPath}}
                        style={styles.bitcoinImg}
                      />
                      <AppText
                        weight={MEDIUM}
                        type={FIFTEEN}
                        style={styles.sheetCurrencyName}>
                        {item?.name ? item?.name : item?.base_currency}
                      </AppText>
                    </View>
                    <View style={styles.currencyName}>
                      <AppText
                        weight={MEDIUM}
                        type={FIFTEEN}
                        style={styles.sheetCurrencyName}>
                        {item?.base_currency}
                      </AppText>
                    </View>
                  </TouchableOpacityView>
                );
              }}
            />
          </View>
        </RBSheet>

        <RBSheet
          ref={amountRef}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={80}
          animationType="none"
          customStyles={{
            container: styles.sheetContainer,
            wrapper: {
              backgroundColor: '#0006',
            },
            draggableIcon: {
              backgroundColor: 'transparent',
            },
          }}>
          <View style={styles.currencyHeader}>
            <View style={styles.emptyView}></View>
            <AppText type={THIRTEEN} weight={MEDIUM}>
              Choose Currency
            </AppText>
            <TouchableOpacityView
              onPress={() => {
                amountRef?.current?.close();
              }}>
              <FastImage source={REMOVE} style={styles.removeImg} />
            </TouchableOpacityView>
          </View>
          <ScrollView style={[styles.cryptoSheetContainer]}>
            <FlatList
              data={[1, 2, 3]}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.currencyListView}>
                    <View>
                      <AppText
                        weight={MEDIUM}
                        type={FIFTEEN}
                        style={{marginLeft: 8}}>
                        $ US Dollars{' '}
                      </AppText>
                    </View>
                  </View>
                );
              }}
            />
            <View style={{height: 10}}></View>
          </ScrollView>
        </RBSheet>
      </ScrollView>
      <Button
        children={
          kycVerified !== 2
            ? 'Verify KYC'
            : contentChangeKey === 'Buy'
            ? 'BUY'
            : 'SELL'
        }
        titleStyle={{color: colors.white}}
        containerStyle={[
          styles.buttonStyle,
          {
            backgroundColor:
              contentChangeKey === 'Buy' ? colors.green : colors.red,
          },
        ]}
        onPress={() => {
          onButtonPress();
        }}
      />
    </AppSafeAreaView>
  );
};

export default QuickBuySell;

const styles = StyleSheet.create({
  cryptoSheetContainer: {
    padding: 5,
    width: Screen.Width,
    marginTop: 25,
    flex: 1,
  },
  currencyName: {
    width: '30%',
    alignItems: 'flex-end',
    right: 20,
  },
  bitcoinImg: {
    width: 30,
    height: 30,
  },
  cryptoContentView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
  cryptoSheetList: {
    width: Screen.Width,
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.thirdText,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: colors.lightBlack,
    height: Screen.Height / 2.7,
    borderRadius: 10,
  },
  currencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#27282C',
    position: 'absolute',
    width: Screen.Width,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  emptyView: {
    height: 25,
    width: 25,
  },
  removeImg: {
    height: 25,
    width: 25,
  },
  currencyListView: {
    width: Screen.Width,
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.thirdText,
    marginTop: 10,
  },
  coin: {
    position: 'absolute',
    left: -50,
  },
  contain: {
    width: '20%',
    height: 50,
    // backgroundColor: "transparent",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    //  zIndex: 9999
  },
  currencyBoxInput: {
    width: '100%',
    height: 50,
    borderColor: colors.blackFive,
    paddingHorizontal: 10,
    // backgroundColor: "transparent",
    color: 'white',
  },
  currencyBox: {
    marginTop: 5,
    width: Screen.Width / 1.09,
    height: 50,
    borderRadius: 5,
    borderColor: colors.blackFive,
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  convertIcon: {
    width: 28,
    height: 28,
    alignSelf: 'center',
    borderRadius: 15,
    marginVertical: 15,
  },
  secondBoxContainer: {
    width: 28,
    height: 28,
    backgroundColor: colors.buttonBg,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 15,
  },
  downIconStyle: {
    width: 10,
    height: 10,
    marginStart: 10,
  },
  getCurrencyContain: {
    width: '20%',
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputStyle: {
    width: '80%',
    height: 50,
    borderRightWidth: 1,
    borderColor: colors.blackFive,
    paddingHorizontal: 10,
    // backgroundColor: "transparent"
    color: colors.white,
  },
  inputContainer: {
    marginTop: 5,
    width: Screen.Width / 1.09,
    height: 50,
    borderRadius: 5,
    borderColor: colors.blackFive,
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currencyText: {
    marginHorizontal: 18,
  },
  coinAmount: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  payText: {
    marginHorizontal: 18,
    marginTop: 20,
  },
  buttonContainer: {
    width: Screen.Width / 1.09,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: colors.lightBlack,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  btnContent: {
    flexDirection: 'row',
    width: '65%',
  },
  startImg: {
    height: 18,
    width: 18,
    top: 1,
  },
  textContent: {
    marginLeft: 5,
  },
  btnContent1: {
    flexDirection: 'row',
    width: '35%',
    justifyContent: 'flex-end',
  },
  downImgStyle: {
    height: 12,
    top: 3,
    width: 12,
    marginHorizontal: 10,
  },
  convertToIconContainer: {
    backgroundColor: colors.buttonBg,
    // borderWidth: 2,
    borderColor: colors.black,
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 80,
    alignSelf: 'center',
  },
  buttonStyle: {
    bottom: Platform.OS === 'ios' ? 15 : 10,
    width: Screen.Width / 1.09,
    alignSelf: 'center',
    marginBottom: Platform.OS === 'ios' ? 30 : 0,
  },
  sheetCurrencyName: {
    marginLeft: 8,
  },
});
