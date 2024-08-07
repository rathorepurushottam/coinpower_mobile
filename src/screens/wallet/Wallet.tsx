import React, {useState, useEffect} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  CustomMaterialMenu,
  FIFTEEN,
  FOURTEEN,
  Header,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  THIRTY,
  THIRTY_FOUR,
  TWENTY,
  TWENTY_SIX,
  YELLOW,
} from '../../common';
import {HOME_BG, walletBg} from '../../helper/ImageAssets';
import KeyBoardAware from '../../common/KeyboardAware';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {
  checkValue,
  dateFormatter,
  depositWithdrawColor,
  toFixedThree,
  twoFixedTwo,
  twoFixedZero,
} from '../../helper/utility';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  Screen,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
} from '../../theme/dimens';
import {colors} from '../../theme/colors';
import {commonStyles} from '../../theme/commonStyles';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import NavigationService from '../../navigation/NavigationService';
import {
  TRADE_HISTORY_DETAILS_SCREEN,
  WALLET_HISTORY_DETAILS_SCREEN,
  WALLET_DETAIL_SCREEN,
} from '../../navigation/routes';
import {
  getUserWallet,
  verifyDeposit,
  verifyWithdraw,
  getTradeHistory,
} from '../../actions/walletActions';
import {ListEmptyComponent} from '../home/MarketCoinList';
import {
  setSelectedTradeHistory,
  setSelectedWalletHistory,
} from '../../slices/walletSlice';
import {TradeHistoryProps, WalletHistoryProps} from '../../helper/types';
import {getHistoricData} from '../../actions/homeActions';
import {useDispatch} from 'react-redux';
import {useIsFocused, useRoute} from '@react-navigation/native';

export const RenderTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      renderLabel={({route, focused}) => (
        <AppText type={SIXTEEN} color={focused ? YELLOW : SECOND}>
          {route.title}
        </AppText>
      )}
      indicatorStyle={{backgroundColor: colors.yellow}}
      scrollEnabled={!props.scrollEnabled ? props.scrollEnabled : true}
      tabStyle={[{width: 'auto'}, props.tabStyle]}
      pressColor={colors.transparent}
      style={[styles.tabbar, props.style]}
    />
  );
};
const WithdrawHistory = () => {
  const dispatch = useAppDispatch();
  const withdrawHistory = useAppSelector(state => state.wallet.withdrawHistory);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    let data = {
      skip: skip,
      limit: limit,
    };
    dispatch(verifyWithdraw(data));
  }, [skip]);
  // console.log(withdrawHistory, "withdrawHistory")
  const renderItem = ({item}: WalletHistoryRender) => {
    return (
      <TouchableOpacityView
        onPress={() => {
          dispatch(setSelectedWalletHistory(item));
          NavigationService.navigate(WALLET_HISTORY_DETAILS_SCREEN);
        }}
        style={styles.walletHistorySingle}>
        <View>
          <AppText weight={SEMI_BOLD} type={FOURTEEN}>
            {item?.short_name}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {dateFormatter(item?.createdAt)}
          </AppText>
        </View>
        <View style={styles.walletHistorySingleSecond}>
          <AppText color={depositWithdrawColor(item.transaction_type)}>
            {item.transaction_type}
          </AppText>
          <AppText>{toFixedThree(item?.amount)}</AppText>
        </View>
      </TouchableOpacityView>
    );
  };
  return (
    <View style={styles.walletHistoryContainer}>
      <FlatList
        data={withdrawHistory}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<ListEmptyComponent />}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginTop: 5,
              }}>
              {withdrawHistory?.length > 0 && (
                <>
                  <Button
                    containerStyle={{paddingHorizontal: 10}}
                    children="Previous"
                    disabled={skip == 0}
                    onPress={() =>
                      setSkip(prevSkip => prevSkip + -10)
                    }></Button>
                  <Button
                    containerStyle={{paddingHorizontal: 20}}
                    children="Next"
                    disabled={withdrawHistory?.length < 10}
                    onPress={() => setSkip(prevSkip => prevSkip + 10)}></Button>
                </>
              )}
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const Funds = () => {
  const userWallet = useAppSelector(state => state.wallet.userWallet);
  return (
    <KeyBoardAware style={commonStyles.paddingR}>
      <View style={styles.fundContainer}>
        {userWallet?.map((item, index) => {
          let space = index % 2 === 0 ? styles.leftBox : styles.rightBox;
          return (
            <View style={[styles.fundSingleBox, space]} key={item._id}>
              <TouchableOpacityView
                onPress={() => {
                  // let _currency = coinData.find(e => {
                  //   return e.base_currency_id === item?.currency_id;
                  // });
                  // let historicData = {
                  //   base_currency: _currency?.base_currency,
                  //   quote_currency: _currency?.quote_currency,
                  // };
                  NavigationService.navigate(WALLET_DETAIL_SCREEN, {item:item});
                }}
                style={styles.fundSingleBoxSecond}>
                <AppText numberOfLines={1} color={SECOND}>
                  {item?.currency}
                </AppText>
                <AppText weight={SEMI_BOLD}>
                  {twoFixedTwo(Number(item?.balance))}
                </AppText>
                <AppText color={SECOND} type={TEN}>
                  {item?.short_name}
                </AppText>
              </TouchableOpacityView>
              {/* <CustomMaterialMenu
                isInr={item?.short_name === 'INR'}
                walletDetail={item}
              /> */}
            </View>
          );
        })}
      </View>
    </KeyBoardAware>
  );
};
const TradeHistory = () => {
  const dispatch = useAppDispatch();
  const tradeHistory = useAppSelector(state => state.wallet.tradeHistory);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  // console.log(tradeHistory, "tradeHistory");
  useEffect(() => {
    let data = {
      skip: skip,
      limit: limit,
    };
    dispatch(getTradeHistory(data));
  }, [skip]);
  const renderItem = ({item}: TradeHistoryRenderProps) => {
    return (
      <TouchableOpacityView
        onPress={() => {
          dispatch(setSelectedTradeHistory(item));
          NavigationService.navigate(TRADE_HISTORY_DETAILS_SCREEN);
        }}
        style={styles.walletHistorySingle}>
        <View>
          <AppText weight={SEMI_BOLD} type={FOURTEEN}>
            {item?.currency}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {dateFormatter(item?.createdAt)}
          </AppText>
        </View>
        <View style={styles.walletHistorySingleSecond}>
          <AppText color={depositWithdrawColor(item.transaction_type)}>
            {item.transaction_type}
          </AppText>
          <AppText>
            {toFixedThree(item?.price)}*
            <AppText>{toFixedThree(item?.quantity)}</AppText>
          </AppText>
        </View>
      </TouchableOpacityView>
    );
  };
  return (
    <View style={styles.walletHistoryContainer}>
      <FlatList
        data={tradeHistory}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<ListEmptyComponent />}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginTop: 5,
              }}>
              {tradeHistory?.length > 0 && (
                <>
                  <Button
                    containerStyle={{paddingHorizontal: 10}}
                    children="Previous"
                    disabled={skip == 0}
                    onPress={() =>
                      setSkip(prevSkip => prevSkip + -10)
                    }></Button>
                  <Button
                    containerStyle={{paddingHorizontal: 20}}
                    children="Next"
                    disabled={tradeHistory?.length < 10}
                    onPress={() => setSkip(prevSkip => prevSkip + 10)}></Button>
                </>
              )}
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export interface WalletHistoryRender {
  item: WalletHistoryProps;
}
const DepositHistory = () => {
  const dispatch = useAppDispatch();
  const depositHistory = useAppSelector(state => state.wallet.depositHistory);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    let data = {
      skip: skip,
      limit: limit,
    };
    dispatch(verifyDeposit(data));
  }, [skip]);
  const renderItem = ({item}: WalletHistoryRender) => {
    return (
      <TouchableOpacityView
        onPress={() => {
          dispatch(setSelectedWalletHistory(item));
          NavigationService.navigate(WALLET_HISTORY_DETAILS_SCREEN);
        }}
        style={styles.walletHistorySingle}>
        <View>
          <AppText weight={SEMI_BOLD} type={FOURTEEN}>
            {item?.short_name}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {dateFormatter(item?.createdAt)}
          </AppText>
        </View>
        <View style={styles.walletHistorySingleSecond}>
          <AppText color={depositWithdrawColor(item.transaction_type)}>
            {item.transaction_type}
          </AppText>
          <AppText>{toFixedThree(item?.amount)}</AppText>
        </View>
      </TouchableOpacityView>
    );
  };
  return (
    <View style={styles.walletHistoryContainer}>
      <FlatList
        data={depositHistory}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<ListEmptyComponent />}
        ListFooterComponent={() => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginTop: 5,
              }}>
              {depositHistory?.length > 0 && (
                <>
                  <Button
                    containerStyle={{paddingHorizontal: 10}}
                    children="Previous"
                    disabled={skip == 0}
                    onPress={() =>
                      setSkip(prevSkip => prevSkip + -10)
                    }></Button>
                  <Button
                    containerStyle={{paddingHorizontal: 20}}
                    children="Next"
                    disabled={depositHistory?.length < 10}
                    onPress={() => setSkip(prevSkip => prevSkip + 10)}></Button>
                </>
              )}
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};


interface TradeHistoryRenderProps {
  item: TradeHistoryProps;
}

const renderScene = SceneMap({
  first: Funds,
  second: DepositHistory,
  third: WithdrawHistory,
  fourth: TradeHistory,
});

const Wallet = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const walletBalance = useAppSelector(state => state.wallet.walletBalance);
  const currency = useAppSelector(state => state.home.currency);
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [index, setIndex] = React.useState(0);
  const isFocus = useIsFocused();
  const [routes] = React.useState([
    {key: 'first', title: checkValue(languages?.wallet_one)},
    {key: 'second', title: 'Deposit History'},
    {key: 'third', title: 'Withdraw History'},
    {key: 'fourth', title: checkValue(languages?.wallet_three)},
  ]);

  useEffect(() => {
    if (isFocus) {
      setIndex(0);
      dispatch(getUserWallet());
    }
  }, [isFocus]);

  useEffect(() => {
    dispatch(getUserWallet());
    // setIndex(0);
  }, [isFocus]);

  console.log(walletBalance, "wallet balance");
  return (
    <AppSafeAreaView source={HOME_BG}>
      <Header title={'Wallet'} />
      <View style={styles.container}>
        <View style={styles.balanceContainer}>
          <AppText type={FOURTEEN}>
            {checkValue(languages?.wallet_four)}
          </AppText>
          <AppText type={TWENTY_SIX} weight={SEMI_BOLD}>
          {`${twoFixedTwo(walletBalance)}`}
          </AppText>
          {/* <AppText type={FIFTEEN} color={SECOND} weight={SEMI_BOLD}>
            {`$${twoFixedTwo(walletBalance)}`}
          </AppText> */}
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: Screen.Width}}
          renderTabBar={props => (
            <RenderTabBar {...props} scrollEnabled={true} />
          )}
          // swipeEnabled
        />
      </View>
      {/* <SpinnerSecond /> */}
    </AppSafeAreaView>
  );
};

export default Wallet;
const styles = StyleSheet.create({
  balanceContainer: {
    marginVertical: 20,
  },
  tabbar: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0,
  },
  fundSingleBox: {
    backgroundColor: colors.white_fifteen,
    padding: universalPaddingHorizontal,
    width: '48%',
    marginVertical: 5,
    flexDirection: 'row',
  },
  leftBox: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  rightBox: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  fundContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: universalPaddingHorizontalHigh,
  },
  container: {
    paddingHorizontal: universalPaddingHorizontalHigh,
    flex: 1,
    marginBottom: 5,
  },
  menuIcon: {
    height: 15,
    width: 15,
  },
  fundSingleBoxSecond: {
    flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  menuIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
  },
  walletHistorySingle: {
    backgroundColor: colors.white_fifteen,
    padding: universalPaddingHorizontal,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletHistorySingleSecond: {
    alignItems: 'flex-end',
  },
  walletHistoryContainer: {
    marginTop: universalPaddingHorizontalHigh,
  },
});
