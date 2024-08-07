import React, {useEffect, useRef, useState} from 'react';
import {
  AMBER,
  AppSafeAreaView,
  AppText,
  BLACK,
  BOLD,
  Button,
  EIGHTEEN,
  ELEVEN,
  FIFTEEN,
  FOURTEEN,
  MEDIUM,
  NORMAL,
  RED,
  SECOND,
  SIXTEEN,
  TEN,
  THIRD,
  THIRTEEN,
  TWELVE,
  TWENTY,
  Toolbar,
  WHITE,
  YELLOW,
} from '../../common';
import {FlatList, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {
  Screen,
  borderWidth,
  smallButtonHeight,
  universalPaddingHorizontal,
} from '../../theme/dimens';
import {colors} from '../../theme/colors';
import FastImage from 'react-native-fast-image';
import {
  LINE_IMG,
  REMOVE,
  bitcoinIcon,
  downIcon,
  upIcon,
} from '../../helper/ImageAssets';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import SpaceBetweenView from '../../common/SpaceBetweenView';
import NavigationService from '../../navigation/NavigationService';
import {STAKING_HISTORY, STAKING_SUCCESS} from '../../navigation/routes';
import {useDispatch} from 'react-redux';
import {
  PLACE_STAKING,
  Place_Staking,
  getStaking,
} from '../../actions/homeActions';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import { twoFixedTwo } from '../../helper/utility';
import { showError } from '../../helper/logger';

const Stacking = ({route}) => {
  const stakingData = route?.params?.stakingCoinDetail;
  const stakingAllData = useAppSelector(state => state.home.stakingHome);
  const stakingDetails = stakingAllData.filter(item => item?.short_name === stakingData?.short_name)
  const [amount, setAmount] = useState('');
  const sheetRef = useRef(null);
  const [stakingDay, setStakingDay] = useState(stakingData?.available_days[0]);
  const [selectedOption, setSelectedOption] = useState('Crypto');
  const [collapse, setCollapse] = useState('Crypto');
  const dispatch = useAppDispatch();
  //YOU WILL RECIEVE-------
  const monthPercentage = stakingData.month_percentage || 0;
  const monthlyIncrease = (amount / 100) * (stakingDay / 30) * monthPercentage;
  const total =
    isNaN(amount) || isNaN(monthlyIncrease)
      ? 0
      : parseFloat((+amount + monthlyIncrease).toFixed(3));
  //-----END -----////

  //TOTAL ESTIMATED REWARD -----
  const estimateIncrease =
    (amount / 100) * (stakingDay / 30) * stakingData?.month_percentage || 0;
  const formattedEstimateIncrease = parseFloat(estimateIncrease.toFixed(3));
  //-----END -----////

  //// Reward Percentage ----
  // <span> {parseFloat(((stakingDays / 30) * stakingModalDetails?.month_percentage)?.toFixed(3))}%</span>
  const rewardPercentage =
    (stakingDay / 30) * stakingData?.month_percentage || 0;
  const formattedrewardPercentage = parseFloat(rewardPercentage.toFixed(3));

  //-----END -----////

  //// END DATE ----

  useEffect(() => {
    if (stakingData?.available_days && stakingData.available_days.length > 0) {
      getInterestEndDate(stakingData.available_days[0]);
    }
  }, [stakingData]);
  const [interestEndDate, setInterestEndDate] = useState('');
  const getInterestEndDate = days => {
    let today = new Date();
    today.setDate(today.getDate() + +days);
    let formattedDate = today.toISOString().split('T')[0];
    setInterestEndDate(formattedDate);
  };
  //-----END -----////
  const handleAmountChange = inputAmount => {
    if (parseFloat(inputAmount) <= parseFloat(stakingData?.max_amount)) {
      setAmount(inputAmount);
    } else {
      showError(`You can only stake min ${stakingData?.min_amount} and max ${stakingData?.max_amount}`)
      setAmount('');
    }
  };
  const onContinuePress = () => {
    if(stakingDetails[0]?.balance < amount) {
      showError("You do not have enough Balance");
      return
    }
    const data = {
      currency_id: stakingData?.currency_id,
      currency_Amount: amount,
      selected_day: stakingDay,
    };
    const stakeCurrency = stakingData?.short_name;
    dispatch(PLACE_STAKING(data, stakeCurrency));
  };

  console.log(stakingDetails, "stakingDetails");
  const _faqRenderItem = ({item, index}) => {
    return (
      <TouchableOpacityView
        onPress={() => {
          setCollapse(index);
        }}
        style={[
          styles.cardBlackContainer,
          {
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        <View style={{width: '80%', marginTop: 5}}>
          <AppText weight={MEDIUM} type={FOURTEEN}>
            How Staking Work?
          </AppText>
          {collapse === index && (
            <AppText weight={MEDIUM} color={SECOND} type={TWELVE}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </AppText>
          )}
        </View>
        <View style={styles.arrowIconStyleContainer}>
          <FastImage
            source={collapse === index ? upIcon : downIcon}
            resizeMode="contain"
            tintColor={'#fff'}
            style={styles.arrowIconStyle}
          />
        </View>
      </TouchableOpacityView>
    );
  };
  return (
    <AppSafeAreaView>
      <Toolbar
        isLogo={false}
        title="Staking"
        isStake={true}
        isSecond
        isLock ={true}
        isFifth
        onFifthPress={() => {
          NavigationService.navigate(STAKING_HISTORY);
        }}
      />
      <View style={styles.tabConatiner}>
        <View style={styles.firstTab}>
          <AppText weight={MEDIUM} type={FOURTEEN} style={styles.numberStyle}>
            1
          </AppText>
        </View>
        <View
          style={[styles.border, {backgroundColor: colors.buttonBg}]}></View>
        <View style={[styles.otherTab, {backgroundColor: colors.buttonBg}]}>
          <AppText
            weight={MEDIUM}
            color={FOURTEEN}
            type={FOURTEEN}
            style={styles.numberStyle}>
            2
          </AppText>
        </View>
        <View style={[styles.border, {backgroundColor: colors.white}]}></View>
        <View style={styles.otherTab}>
          <AppText
            weight={MEDIUM}
            color={THIRD}
            type={FOURTEEN}
            style={styles.numberStyle}>
            3
          </AppText>
        </View>
      </View>
      <ScrollView>
        <AppText weight={MEDIUM} type={FIFTEEN} style={styles.heading}>
          Staking {stakingData?.short_name}
        </AppText>
        <AppText weight={MEDIUM} type={TWELVE} style={styles.heading}>
          Staking {stakingData?.short_name} and receive {stakingData?.short_name} while staking
        </AppText>
        <View style={styles.cardContain}>
          <AppText weight={MEDIUM} type={TWELVE} color={SECOND}>
            Available to Stake
          </AppText>
          <AppText
            weight={MEDIUM}
            type={FOURTEEN}
            color={WHITE}
            style={styles.availableText}>
            {twoFixedTwo(stakingDetails[0]?.balance)} {stakingData?.short_name}
          </AppText>

          <FastImage
            source={LINE_IMG}
            resizeMode="contain"
            style={styles.lineImg}
          />
          <View style={styles.cardSubContain}>
            <View>
              <AppText weight={MEDIUM} type={TWELVE} color={SECOND}>
                Interest Amount
              </AppText>
              <AppText
                weight={MEDIUM}
                type={FOURTEEN}
                color={WHITE}
                style={styles.CardSubContainText}>
                {stakingDetails[0]?.month_percentage}%/Month
              </AppText>
            </View>
          </View>
          <View style={styles.cardBlackContainer}>
            <View style={styles.option1}>
              <TouchableOpacityView
                onPress={() => {
                  setSelectedOption('Crypto');
                }}
                style={[
                  {
                    borderColor:
                      selectedOption == 'Crypto' ? colors.buttonBg : null,
                    marginLeft: 10,
                  },
                  styles.cryptoOption,
                ]}>
                <AppText weight={MEDIUM} type={THIRTEEN} color={AMBER}>
                  Crypto
                </AppText>
              </TouchableOpacityView>

            </View>
            <AppText style={{marginLeft: 12, marginTop: 15}}>Amount</AppText>
            <View style={styles.inputContainer}>
              {/* <View style={styles.getCurrencyContain}>
                <FastImage
                  source={{uri: stakingData?.icon_path}}
                  resizeMode="contain"
                  style={styles.currencyImg}
                />
              </View> */}
              <TextInput
                placeholder="Amount"
                value={amount}
                placeholderTextColor={colors.secondaryText}
                keyboardType="decimal-pad"
                onChangeText={e => {
                  handleAmountChange(e);
                }}
                style={styles.inputStyle}></TextInput>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 5,
                paddingHorizontal: 15,
              }}>
              <AppText weight={NORMAL} type={TEN} color={RED}>
                Min : {stakingData?.min_amount}
              </AppText>
              <AppText weight={NORMAL} type={TEN} color={RED}>
                Max : {stakingData?.max_amount}
              </AppText>
            </View>

            <AppText style={{marginLeft: 12, marginTop: 15}}>
              Staking Days
            </AppText>

            <TouchableOpacityView
              onPress={() => {
                sheetRef?.current?.open();
              }}
              style={styles.inputContainer}>
              <AppText
                style={{marginHorizontal: 10}}
                type={ELEVEN}
                color={stakingDay ? WHITE : SECOND}>
                {stakingDay || 'Enter No of staking days'}
              </AppText>
            </TouchableOpacityView>

            {stakingData?.min_amount <= amount ? (
              <Button
                onPress={() => {
                  onContinuePress();
                }}
                containerStyle={styles.continueBtn}
                isSecond
                children="Stake"
                titleStyle={{color: colors.black}}
              />
            ) : (
              <Button
                disabled
                onPress={() => {
                  NavigationService.navigate(STAKING_SUCCESS);
                }}
                containerStyle={styles.continueBtn}
                isSecond
                children="Stake"
                titleStyle={{color: colors.black}}
              />
            )}
            <View style={{paddingTop: 10}}>
              <SpaceBetweenView
                firstText={'Minimum Staking Amount'}
                secondText={`${stakingData?.min_amount} ${stakingData?.short_name}`}
              />
              <SpaceBetweenView
                firstText={'Maximum Staking Amount'}
                secondText={`${stakingData?.max_amount} ${stakingData?.short_name}`}
              />
              <SpaceBetweenView
                firstText={'You Will Receive'}
                secondText={total}
              />
              <SpaceBetweenView
                firstText={'Transaction Cost'}
                secondText={'NA'}
              />
              {/* <SpaceBetweenView firstText={'Reward Fee'} secondText={'10%'} /> */}
            </View>
            <View
              style={{
                width: '92%',
                padding: 5,
                borderRadius: 5,
                alignSelf: 'center',
              }}>
              <AppText type={FIFTEEN}>Summary</AppText>
              {/* <AppText type={TEN} color={SECOND}>
                Total Est. Rewards 2.5%
              </AppText> */}
            </View>
            <View style={{paddingTop: 5}}>
              <SpaceBetweenView
                firstText={'Total estimate reward'}
                secondText={formattedEstimateIncrease}
              />
              <SpaceBetweenView
                firstText={'Reward Percentage'}
                secondText={`${formattedrewardPercentage}%`}
              />

              <SpaceBetweenView
                firstText={'Interest End Date '}
                secondText={interestEndDate}
              />
            </View>
          </View>
        </View>
        <View style={styles.cardContain}>
          <AppText weight={MEDIUM} type={TWELVE} color={WHITE}>
            FAQ
          </AppText>
          <FlatList data={[1, 2, 3]} renderItem={_faqRenderItem} />
        </View>
      </ScrollView>

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
            Available Days
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
            data={stakingData?.available_days}
            renderItem={({item, index}) => {
              // let imgPath = `${BASE_URL}${item?.icon_path}`;
              return (
                <TouchableOpacityView
                  onPress={() => {
                    getInterestEndDate(item),
                      setStakingDay(item),
                      sheetRef?.current?.close();
                  }}
                  style={styles.dropDownContainer}>
                  <AppText>{item}</AppText>
                </TouchableOpacityView>
              );
            }}
          />
        </View>
      </RBSheet>
    </AppSafeAreaView>
  );
};

export default Stacking;
const styles = StyleSheet.create({
  dropDownContainer: {
    marginTop: 10,
    height: smallButtonHeight,
    borderWidth: borderWidth,
    borderColor: colors.blackFive,
    borderRadius: 5,
    paddingHorizontal: universalPaddingHorizontal,
    // backgroundColor: colors.blackFive,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cryptoSheetContainer: {
    padding: 5,
    width: Screen.Width,
    marginTop: 25,
    flex: 1,
  },
  removeImg: {
    height: 25,
    width: 25,
  },
  emptyView: {
    height: 25,
    width: 25,
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
  sheetContainer: {
    backgroundColor: colors.lightBlack,
    height: Screen.Height / 2.7,
    borderRadius: 10,
  },
  continueBtn: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
  },
  arrowIconStyleContainer: {
    width: '20%',
    alignItems: 'flex-end',
    right: 5,
    marginTop: 5,
  },
  arrowIconStyle: {
    width: 15,
    height: 15,
  },
  maxChar: {},
  currencyImg: {
    width: 25,
    height: 25,
    bottom: 3,
  },
  cryptoOption: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  option1: {
    flexDirection: 'row',
  },
  cardBlackContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.black,
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  CardSubContainText: {
    marginTop: 3,
  },
  cardSubContain: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineImg: {
    width: Screen.Width - 25,
    height: 20,
    alignSelf: 'center',
  },
  availableText: {
    marginTop: 10,
    left: 3,
  },
  cardContain: {
    backgroundColor: colors.blackFive,
    width: Screen.Width - 25,
    padding: 10,
    borderRadius: 10,
    marginVertical: 25,
    alignSelf: 'center',
  },
  getCurrencyContain: {
    width: '15%',
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputStyle: {
    width: '85%',
    height: 45,
    paddingHorizontal: 10,
    color: colors.white,
    fontSize: 13,
  },
  inputContainer: {
    width: '95%',
    height: 45,
    borderRadius: 5,
    borderColor: '#2C383E',
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  heading: {
    marginHorizontal: 20,
  },
  tabConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Screen.Width / 2,
    padding: 5,
    alignSelf: 'center',
    marginVertical: 25,
    justifyContent: 'center',
  },
  firstTab: {
    backgroundColor: colors.buttonBg,
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberStyle: {
    top: 1,
  },
  border: {
    width: 50,
    height: 1,
  },
  otherTab: {
    backgroundColor: colors.white,
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
