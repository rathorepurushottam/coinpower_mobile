/* eslint-disable react/no-unstable-nested-components */
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationService from './NavigationService';
import * as routes from './routes';
import * as React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import AuthLoading from '../screens/other/AuthLoading';
import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Register from '../screens/auth/Register';
import OtpVerify from '../screens/auth/OtpVerify';
import ResetPassword from '../screens/auth/ResetPassword';
import FastImage from 'react-native-fast-image';
import {commonStyles} from '../theme/commonStyles';
import {colors} from '../theme/colors';
import {
  account_ic,
  ads,
  home_ic,
  order,
  p2p_Icon,
  profile_bg,
  profile_placeholder_ic,
  trade_ic,
  wallet_ic,
} from '../helper/ImageAssets';
import Home from '../screens/home/Home';
import Wallet from '../screens/wallet/Wallet';
import Account from '../screens/account/Account';
import Trades from '../screens/trades/Trades';
import EditProfile from '../screens/account/EditProfile';
import Notification from '../screens/other/Notification';
import NotificationSettings from '../screens/account/NotificationSettings';
import Settings from '../screens/account/Settings';
import KycStepOne from '../screens/account/KycStepOne';
import KycStatus from '../screens/account/KycStatus';
import InviteAndEarn from '../screens/account/InviteAndEarn';
import ContactUs from '../screens/account/ContactUs';
import CmsPages from '../screens/account/CmsPages';
import BankingSettings from '../screens/account/BankingSettings';
import ChangePassword from '../screens/account/ChangePassword';
import CurrencyPreference from '../screens/account/CurrencyPreference';
import CoinDetails from '../screens/trades/CoinDetails';
import Deposit from '../screens/other/Deposit';
import Withdraw from '../screens/other/Withdraw';
import WalletDetails from '../screens/wallet/WalletDetails';
import WalletHistoryDetails from '../screens/wallet/WalletHistoryDetails';
import TradeHistoryDetails from '../screens/wallet/TradeHistoryDetails';
import KycStepTwo from '../screens/account/KycStepTwo';
import KycStepThree from '../screens/account/KycStepThree';
import KycStepFour from '../screens/account/KycStepFour';
import KycStepFive from '../screens/account/KycStepFive';
import TradeSettings from '../screens/account/TradeSettings';
import FeeSettings from '../screens/account/FeeSettings';
import DownloadReport from '../screens/account/DownloadReport';
import CoinDetailChart from '../screens/home/CoinDetailChart';
import CoinTransactionHistory from '../screens/home/CoinTransactionHistory';
import TwoFactor from '../screens/account/TwoFactor';
import TwoFactorQr from '../screens/account/TwoFactorQr';
import EnterOtp from '../screens/account/EnterOtp';
import ConvertHistory from '../screens/home/ConvertHistory';
import Convert from '../screens/home/Convert';
import LanguagePreference from '../screens/account/LanguagePreference';
import Search from '../screens/trades/Search';
import SwapNEXBCoin from '../screens/trades/SwapNEXBCoin';
import TouchableOpacityView from '../common/TouchableOpacityView';
import {
  AppText,
  BOLD,
  MEDIUM,
  SEMI_BOLD,
  SIXTEEN,
  THIRTY,
  TWENTY_SIX,
  WHITE,
  YELLOW,
} from '../common';
import {View} from 'react-native';
import QuickBuySell from '../screens/QuickBuySell/QuickBuySell';
import Stacking from '../screens/Staking/Staking';
import StakingSuccess from '../screens/Staking/StakingSuccess';
import qsTransaction from '../screens/QuickBuySell/qsTransaction';
import LackedStakes from '../screens/Staking/LackedStakes';
import StakingHistory from '../screens/Staking/StakingHistory';
import BtcCoinDetails from '../screens/trades/BtcCoinDetails';
import p2pHome from '../screens/P2P/p2pHome';
import p2pAmount from '../screens/P2P/p2pOrder';
import p2pProfile from '../screens/P2P/p2pProfile';
import {useAppSelector} from '../store/hooks';
import p2pAds from '../screens/P2P/p2pAds';
import p2pOrder from '../screens/P2P/p2pOrder';
// import p2pFilter from '../screens/P2P/P2pFilter';
// import buyCrypto from '../screens/P2P/buyCrypto';
// import buyByCrypto from '../screens/P2P/BuyByCrypto';
import BuyByCrypto from '../screens/P2P/BuyByCrypto';
import P2pFilter from '../screens/P2P/P2pFilter';
import OrderCreated from '../screens/P2P/OrderCreated';
import OrderHistory from '../screens/trades/OrderHistory';
import { ProjectCommit } from '../screens/trades/ProjectCommit';
import CommitDetails from '../screens/trades/CommitDetails';
import ActivityLogs from '../screens/account/ActivityLogs';
import ReferralList from '../screens/account/ReferralList';
import LandingScreen from '../screens/auth/LandingScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const P2PTab = createBottomTabNavigator();
const P2PStack = createStackNavigator();
const options = {...TransitionPresets.SlideFromRightIOS, headerShown: false};

const TabIcon = ({focused, icon}: any) => (
  <FastImage
    source={icon}
    style={commonStyles.tabIcon}
    tintColor={focused ? colors.buttonBg : colors.tabIcon}
    resizeMode="contain"
  />
);

const MyAuthLoadingStack = () => {
  const p2p = useAppSelector(state => state.home.p2p);
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name={routes.NAVIGATION_AUTH_LOADING_SCREEN}
        component={AuthLoading}
      />
      <Stack.Screen name={routes.NAVIGATION_AUTH_STACK} component={AuthStack} />
      <Stack.Screen
        name={routes.NAVIGATION_BOTTOM_TAB_STACK}
        component={BottomNavigation}
      />
      <Stack.Screen name={routes.EDIT_PROFILE_SCREEN} component={EditProfile} />
      <Stack.Screen
        name={routes.NOTIFICATION_SCREEN}
        component={Notification}
      />
      <Stack.Screen name={routes.SEARCH_SCREEN} component={Search} />

      <Stack.Screen
        name={routes.NOTIFICATION_SETTINGS_SCREEN}
        component={NotificationSettings}
      />
      <Stack.Screen name={routes.SETTINGS_SCREEN} component={Settings} />
      <Stack.Screen name={routes.KYC_STEP_ONE_SCREEN} component={KycStepOne} />
      <Stack.Screen name={routes.KYC_STEP_TWO_SCREEN} component={KycStepTwo} />
      <Stack.Screen
        name={routes.KYC_STEP_THREE_SCREEN}
        component={KycStepThree}
      />
      <Stack.Screen
        name={routes.KYC_STEP_FOUR_SCREEN}
        component={KycStepFour}
      />
      <Stack.Screen
        name={routes.KYC_STEP_FIVE_SCREEN}
        component={KycStepFive}
      />
      <Stack.Screen name={routes.KYC_STATUS_SCREEN} component={KycStatus} />
      <Stack.Screen
        name={routes.BANKING_AND_TRADE_SETTINGS_SCREEN}
        component={BankingSettings}
      />
      <Stack.Screen
        name={routes.INVITE_AND_EARN_SCREEN}
        component={InviteAndEarn}
      />
      <Stack.Screen name={routes.CONTACT_US_SCREEN} component={ContactUs} />
      <Stack.Screen name={routes.CMS_SCREEN} component={CmsPages} />
      <Stack.Screen
        name={routes.CHANGE_PASSWORD_SCREEN}
        component={ChangePassword}
      />
      <Stack.Screen
        name={routes.CURRENCY_PREFERENCE_SCREEN}
        component={CurrencyPreference}
      />
      <Stack.Screen name={routes.DEPOSIT_SCREEN} component={Deposit} />
      <Stack.Screen name={routes.WITHDRAW_SCREEN} component={Withdraw} />
      <Stack.Screen name={routes.CONVERT_SCREEN} component={Convert} />
      <Stack.Screen name={routes.COIN_DETAILS_SCREEN} component={CoinDetails} />
      <Stack.Screen
        name={routes.WALLET_DETAIL_SCREEN}
        component={WalletDetails}
      />
      {/* <Stack.Screen name={routes.DEPOSIT_INR_SCREEN} component={DepositInr} /> */}
      {/* <Stack.Screen name={routes.WITHDRAW_INR_SCREEN} component={WithdrawInr} /> */}
      <Stack.Screen
        name={routes.WALLET_HISTORY_DETAILS_SCREEN}
        component={WalletHistoryDetails}
      />
      <Stack.Screen
        name={routes.TRADE_HISTORY_DETAILS_SCREEN}
        component={TradeHistoryDetails}
      />
      {/* <Stack.Screen
      name={routes.PAYMENT_OPTIONS_SCREEN}
      component={PaymentOptions}
    /> */}
      <Stack.Screen
        name={routes.TRADE_SETTINGS_SCREEN}
        component={TradeSettings}
      />
      <Stack.Screen name={routes.FEE_SETTINGS_SCREEN} component={FeeSettings} />
      <Stack.Screen
        name={routes.DOWNLOAD_TRADE_REPORT_SCREEN}
        component={DownloadReport}
      />
      {/* <Stack.Screen name={routes.ADD_NEW_BANK_SCREEN} component={AddNewBank} /> */}
      <Stack.Screen
        name={routes.COIN_DETAILS_CHART_SCREEN}
        component={CoinDetailChart}
      />
      <Stack.Screen
        name={routes.COIN_TRANSACTION_HISTORY_SCREEN}
        component={CoinTransactionHistory}
      />
      <Stack.Screen
        name={routes.TWO_FACTOR_AUTHENTICATION}
        component={TwoFactor}
      />
       <Stack.Screen
        name={routes.TRADE}
        component={BtcCoinDetails}
      />
      <Stack.Screen
        name={routes.TWO_FACTOR_QR_SCREEN}
        component={TwoFactorQr}
      />
      <Stack.Screen name={routes.ENTER_OTP_SCREEN} component={EnterOtp} />

      <Stack.Screen
        name={routes.CONVERT_HISTORY_SCREEN}
        component={ConvertHistory}
      />
      <Stack.Screen
        name={routes.LANGUAGE_PREFERENCE_SCREEN}
        component={LanguagePreference}
      />
      <Stack.Screen name={routes.QUICK_BUY_SELL} component={QuickBuySell} />

      <Stack.Screen name={routes.QS_TRANSACTION} component={qsTransaction} />

      <Stack.Screen name={routes.STAKING} component={Stacking} />

      <Stack.Screen name={routes.STAKING_SUCCESS} component={StakingSuccess} />
      <Stack.Screen name={routes.LAKED_STAKING} component={LackedStakes} />
      <Stack.Screen name={routes.STAKING_HISTORY} component={StakingHistory} />
      <Stack.Screen name={routes.p2pFilter} component={P2pFilter} />
      <Stack.Screen name={routes.BUY_CRYPTO} component={BuyByCrypto} />
      <Stack.Screen name={routes.ORDER_CREATED} component={OrderCreated} />
      <Stack.Screen name={routes.ORDER_HISTORY} component={OrderHistory} />
      <Stack.Screen name={routes.PROJECT_COMMIT} component={ProjectCommit} />
      <Stack.Screen name={routes.COMMIT_DETAIL} component={CommitDetails} />
      <Stack.Screen name={routes.ACTIVITY_LOGS} component={ActivityLogs} />
      <Stack.Screen name={routes.REFERRAL_LIST} component={ReferralList} />

    </Stack.Navigator>
  );
};
const AuthStack = () => (
  <Stack.Navigator screenOptions={options}>
    {/* <Stack.Screen name={routes.WELCOME_SCREEN} component={Login} /> */}
    <Stack.Screen name={routes.LANDING_SCREEN} component={LandingScreen}/>
    <Stack.Screen name={routes.LOGIN_SCREEN} component={Login} />
    <Stack.Screen
      name={routes.FORGOT_PASSWORD_SCREEN}
      component={ForgotPassword}
    />
    <Stack.Screen name={routes.REGISTER_SCREEN} component={Register} />
    <Stack.Screen name={routes.OTP_VERIFY_SCREEN} component={OtpVerify} />
    <Stack.Screen
      name={routes.RESET_PASSWORD_SCREEN}
      component={ResetPassword}
    />
  </Stack.Navigator>
);

const TradeStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen name={routes.TRADE_SCREEN} component={Trades} />
    <Stack.Screen
      name="P2PBottomTabNavigator"
      component={P2PBottomTabNavigator}
    />
    <Stack.Screen name={routes.SWAPNEXBCOIN_SCREEN} component={SwapNEXBCoin} />
    <Stack.Screen name={routes.COIN_DETAILS_SCREEN} component={CoinDetails} />
    <Stack.Screen
      name={routes.COIN_DETAILS_CHART_SCREEN}
      component={CoinDetailChart}
    />
  </Stack.Navigator>
);

function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={
        routes.HOME_SCREEN
      }
      backBehavior={'history'}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.black,
          height: 60,
          borderTopWidth: 0,
          paddingVertical: 10,
        },
        tabBarIconStyle: {},
        tabBarAllowFontScaling: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 10,
        },
        tabBarActiveTintColor: colors.buttonBg,
        tabBarInactiveTintColor: colors.tabIcon,
      }}>
      <Tab.Screen
        name={routes.HOME_SCREEN}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <TouchableOpacityView>
                  <View style={{alignItems: 'center'}}>
                    <AppText
                      style={{top: 5}}
                      weight={MEDIUM}
                      color={focused ? YELLOW : WHITE}>
                      Home
                    </AppText>
                    <View
                      style={{
                        marginTop: 12,
                        width: 5,
                        height: 5,
                        backgroundColor: colors.buttonBg,
                        borderRadius: 5,
                      }}></View>
                  </View>
                </TouchableOpacityView>
              ) : (
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <TabIcon focused={focused} icon={home_ic} />
                  <AppText color={WHITE} weight={MEDIUM}
                      style={{top: 5}}>Home</AppText>
                </View>
              )}
            </>
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name={routes.NAVIGATION_TRADE_STACK}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <TouchableOpacityView>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <AppText
                      weight={MEDIUM}
                      style={{top: 5}}
                      color={focused ? YELLOW : WHITE}>
                      Trades
                    </AppText>
                    <View
                      style={{
                        marginTop: 12,
                        width: 5,
                        height: 5,
                        backgroundColor: colors.buttonBg,
                        borderRadius: 5,
                      }}></View>
                  </View>
                </TouchableOpacityView>
              ) : (
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <TabIcon focused={focused} icon={trade_ic} />
                  <AppText
                      weight={MEDIUM}
                      style={{top: 5}}
                      color={WHITE}>
                      Trades
                    </AppText>
                  {/* <AppText weight={MEDIUM} color={WHITE}>Trades</AppText> */}
                </View>
              )}
            </>
          ),
        }}
        component={TradeStack}
      />

      <Tab.Screen
        name={routes.WALLET_SCREEN}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <TouchableOpacityView>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <AppText
                      weight={MEDIUM}
                      style={{top: 5}}
                      color={focused ? YELLOW : WHITE}>
                      Wallet
                    </AppText>
                    <View
                      style={{
                        marginTop: 12,
                        width: 5,
                        height: 5,
                        backgroundColor: colors.buttonBg,
                        borderRadius: 5,
                      }}></View>
                  </View>
                </TouchableOpacityView>
              ) : (
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <TabIcon focused={focused} icon={wallet_ic} />
                  <AppText
                      weight={MEDIUM}
                      style={{top: 5}}
                      color={WHITE}>
                      Wallet
                    </AppText>
                </View>
              )}
            </>
          ),
        }}
        component={Wallet}
      />
      <Tab.Screen
        name={routes.ACCOUNT_SCREEN}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <>
              {focused ? (
                <TouchableOpacityView>
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <AppText
                      style={{top: 5}}
                      weight={MEDIUM}
                      color={focused ? YELLOW : WHITE}>
                      Account
                    </AppText>
                    <View
                      style={{
                        marginTop: 12,
                        width: 5,
                        height: 5,
                        backgroundColor: colors.buttonBg,
                        borderRadius: 5,
                      }}></View>
                  </View>
                </TouchableOpacityView>
              ) : (
                <View style={{alignItems: 'center', marginTop: 10}}>
                  <TabIcon focused={focused} icon={account_ic} />

                  <AppText color={WHITE} weight={MEDIUM}>Account</AppText>
                </View>
              )}
            </>
          ),
        }}
        component={Account}
      />
    </Tab.Navigator>
  );
}

const RootStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_LOADING_STACK}
      component={MyAuthLoadingStack}
    />
  </Stack.Navigator>
);

const Navigator = () => {
  return (
    <NavigationContainer
      // theme={DarkTheme}
      ref={navigationRef => {
        NavigationService.setTopLevelNavigator(navigationRef);
      }}>
      <RootStackScreen />
    </NavigationContainer>
  );
};

const P2PBottomTabNavigator = () => (
  <P2PTab.Navigator
    initialRouteName={routes.p2pHome}
    screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        backgroundColor: colors.black,
        height: 60,
        borderTopWidth: 0,
        paddingVertical: 10,
        // borderTopLeftRadius:10,
        // borderTopRightRadius:10,
      },
      tabBarIconStyle: {},
      tabBarAllowFontScaling: false,
      tabBarShowLabel: true,
      tabBarLabelStyle: {
        fontSize: 12,
        marginBottom: 10,
      },
      tabBarActiveTintColor: colors.buttonBg,
      tabBarInactiveTintColor: colors.tabIcon,
    }}>
    <P2PTab.Screen
      options={{
        tabBarLabel: '',
        tabBarIcon: ({focused}) => (
          <>
            {focused ? (
              <TouchableOpacityView>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <AppText
                    style={{top: 5}}
                    weight={MEDIUM}
                    color={focused ? YELLOW : WHITE}>
                    P2P
                  </AppText>
                  <View
                    style={{
                      marginTop: 12,
                      width: 5,
                      height: 5,
                      backgroundColor: colors.buttonBg,
                      borderRadius: 5,
                    }}></View>
                </View>
              </TouchableOpacityView>
            ) : (
              <View style={{alignItems: 'center', marginTop: 10}}>
                <TabIcon focused={focused} icon={p2p_Icon} />

                {/* <AppText color={WHITE} weight={MEDIUM}>Account</AppText> */}
              </View>
            )}
          </>
        ),
      }}
      name={routes?.p2pHome}
      component={p2pHome}
    />
    <P2PTab.Screen
      options={{
        tabBarLabel: '',
        tabBarIcon: ({focused}) => (
          <>
            {focused ? (
              <TouchableOpacityView>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <AppText
                    style={{top: 5}}
                    weight={MEDIUM}
                    color={focused ? YELLOW : WHITE}>
                    Order
                  </AppText>
                  <View
                    style={{
                      marginTop: 12,
                      width: 5,
                      height: 5,
                      backgroundColor: colors.buttonBg,
                      borderRadius: 5,
                    }}></View>
                </View>
              </TouchableOpacityView>
            ) : (
              <View style={{alignItems: 'center', marginTop: 10}}>
                <TabIcon focused={focused} icon={order} />
              </View>
            )}
          </>
        ),
      }}
      name={routes?.p2pOrder}
      component={p2pOrder}
    />
    <P2PTab.Screen
      options={{
        tabBarLabel: '',
        tabBarIcon: ({focused}) => (
          <>
            {focused ? (
              <TouchableOpacityView>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <AppText
                    style={{top: 5}}
                    weight={MEDIUM}
                    color={focused ? YELLOW : WHITE}>
                    Ads
                  </AppText>
                  <View
                    style={{
                      marginTop: 12,
                      width: 5,
                      height: 5,
                      backgroundColor: colors.buttonBg,
                      borderRadius: 5,
                    }}></View>
                </View>
              </TouchableOpacityView>
            ) : (
              <View style={{alignItems: 'center', marginTop: 10}}>
                <TabIcon focused={focused} icon={ads} />
              </View>
            )}
          </>
        ),
      }}
      name={routes?.p2pAds}
      component={p2pAds}
    />

    <P2PTab.Screen
      options={{
        tabBarLabel: '',
        tabBarIcon: ({focused}) => (
          <>
            {focused ? (
              <TouchableOpacityView>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <AppText
                    style={{top: 5}}
                    weight={MEDIUM}
                    color={focused ? YELLOW : WHITE}>
                    Profile
                  </AppText>
                  <View
                    style={{
                      marginTop: 12,
                      width: 5,
                      height: 5,
                      backgroundColor: colors.buttonBg,
                      borderRadius: 5,
                    }}></View>
                </View>
              </TouchableOpacityView>
            ) : (
              <View style={{alignItems: 'center', marginTop: 10}}>
                <TabIcon focused={focused} icon={account_ic} />
              </View>
            )}
          </>
        ),
      }}
      name={routes?.p2pProfile}
      component={p2pProfile}
    />
  </P2PTab.Navigator>
);

export default Navigator;
