import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  MEDIUM,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  SearchInput,
  TEN,
  TWELVE,
} from '../../common';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {CoinCardProps, CoinDataProps} from '../../helper/types';
import {BASE_URL, placeHolderText} from '../../helper/Constants';
import {ImageBackground, Platform, ScrollView, StyleSheet, View} from 'react-native';
import KeyBoardAware from '../../common/KeyboardAware';
import {Screen, universalPaddingHorizontalHigh, universalPaddingVertical} from '../../theme/dimens';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import NavigationService from '../../navigation/NavigationService';
import { LOGIN_SCREEN, NAVIGATION_BOTTOM_TAB_STACK, NAVIGATION_TRADE_STACK, REGISTER_SCREEN, TRADE_SCREEN } from '../../navigation/routes';
import FastImage from 'react-native-fast-image';
import {checkValue, toFixedEight, toFixedThree, twoFixedTwo} from '../../helper/utility';
import { downIcon, HOME_BG, upIcon } from '../../helper/ImageAssets';
import { connect } from 'socket.io-client';
import {
  setCoinData,
  setRandom,
  setSocket,
  setSocketLoading,
} from '../../slices/homeSlice';
import { authStyles } from './authStyles';
import HomeCoinTabs from '../home/HomeCoinTabs';
import MarketCoinList from '../home/MarketCoinList';
import { colors } from '../../theme/colors';

const socket = connect(BASE_URL, {
    transports: ['websocket'],
    forceNew: true,
    autoConnect: true,
  });
  

const LandingScreen = () => {
    const dispatch = useAppDispatch();
  const hotCoins = useAppSelector(state => state.home.coinPairs);
  // const coinData = useAppSelector(state => state.home.coinData);
  const currency = useAppSelector(state => state.home.currency);
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [activeTab, setActiveTab] = useState('spot');
//   const [value, setValue] = useState('');
//   const [list, setList] = useState([]);

  useEffect(() => {
    // Handle socket connection
    const handleSocketConnect = () => {
      console.log('Connected to socket server');
      dispatch(setSocket(socket)); 
      dispatch(setRandom(Math.random()));
    };

    socket.on('connect', handleSocketConnect);

    return () => {
      socket.off('connect', handleSocketConnect); 
    };
  }, []);

  useEffect(() => {
    // Emit a message to the socket every 5 seconds
    socket.emit('message', { message: 'market' });
    const intervalId = setInterval(() => {
      socket.emit('message', { message: 'market' });
      // console.log('Emitting message to market');
    }, 5000); // 5000 ms for 5 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {                                                                     
    // Handle incoming socket messages
    const handleSocketMessage = (res) => {
      // console.log(':', res); 
      dispatch(setCoinData(res)); // Update Redux state with received data
      dispatch(setSocketLoading(false)); // Change loading state
    };

    socket.on('message', handleSocketMessage);

    return () => {
      socket.off('message', handleSocketMessage); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    // Handle socket disconnection
    const handleSocketDisconnect = () => {
      console.log('Disconnected from socket server');
    };

    socket.on('disconnect', handleSocketDisconnect);

    return () => {
      socket.off('disconnect', handleSocketDisconnect); // Cleanup on unmount
    };
  }, []);


  const handleNavigate = (type) => {
    if(type === 'Login') {
      NavigationService.navigate(LOGIN_SCREEN);
    } else {
      NavigationService.navigate(REGISTER_SCREEN);
    }
  };


 const RenderItem = ({ item, currency }) => {
    let url = `${BASE_URL}${item?.icon_path}`;
    const navigation = useNavigation();
    return (
      <TouchableOpacityView
        style={styles.container}
        // onPress={() =>
        //  navigation.navigate(NAVIGATION_BOTTOM_TAB_STACK, {
        //     screen: NAVIGATION_TRADE_STACK,
        //     params: {
        //       screen:TRADE_SCREEN,
        //       params: {
        //          coinDetail: item,
        //          path: "Spot"
        //       },
        //     },
        //   })
        // }
        >
        <View style={styles.containerSecond}>
          <FastImage
            source={{ uri: url }}
            resizeMode="contain"
            style={styles.icon}
          />
          <View>
            <AppText>{item?.base_currency}</AppText>
            <AppText type={TEN} color={SECOND}>
              {item?.quote_currency}
            </AppText>
          </View>
        </View>
        <View style={styles.containerThird}>
          <AppText weight={SEMI_BOLD}>
            {currency} {toFixedEight(item?.buy_price)}
          </AppText>
          <AppText numberOfLines={1} color={SECOND}>
            {twoFixedTwo(item?.volume)}
          </AppText>
        </View>
        <View style={styles.containerThird}>
          <View
            style={[
              styles.bedge,
              item?.change < 0 && {
                backgroundColor: colors.red,
              },
            ]}>
            <FastImage
              resizeMode="contain"
              source={item?.change >= 0 ? upIcon : downIcon}
              tintColor={colors.white}
              style={styles.arrow}
            />
            <AppText>{toFixedThree(item?.change)}</AppText>
          </View>
        </View>
      </TouchableOpacityView>
    );
  };
  return (
    <AppSafeAreaView>
      <ImageBackground  source={HOME_BG} style={styles.imgBg} >
      <View style={{marginTop: 40,flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
        <Button children='Login' containerStyle={{width: 100}} onPress={() => handleNavigate('Login')}></Button>
        <Button children='Register' containerStyle={{width: 100}} onPress={() => handleNavigate('Register')}></Button>
      </View>
     <View style={[styles?.Main_Container, { marginBottom: 290 }]}>
      <View style={styles?.Heading}>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%'}}>Asset</AppText>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%'}}>Last Price</AppText>
        <AppText type={TWELVE} color={colors.textGray} style={{width: '33%'}}>24H Change</AppText>
      </View>
      <ScrollView style={styles?.MarketCoinList}>
       {hotCoins?.length !== 0 ? (
    hotCoins?.map(item => {
      return <View key={item?._id} style={{}}>{RenderItem({ item , currency})}</View>
      
    })) : <View style={styles.emptyContainer}><AppText type={FOURTEEN}>Nothing to show.</AppText></View>}
      </ScrollView>
    </View>
    </ImageBackground>
    </AppSafeAreaView>

  );
};

export default LandingScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bedge: {
    height: 25,
    borderRadius: 5,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  arrow: {
    height: 8,
    width: 8,
    marginEnd: 5,
    marginBottom: 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  icon: {
    height: 30,
    width: 30,
    marginEnd: 10,
  },
  containerSecond: { flex: 1, flexDirection: 'row' },
  containerThird: { flex: 1, alignItems: 'flex-end' },
  Main_Container: {
    marginVertical: 10,
    paddingHorizontal: universalPaddingHorizontalHigh,
    paddingVertical: universalPaddingVertical,
    // backgroundColor: "#0C0C0C",
  },
  Heading: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    marginBottom: 10,
    marginLeft: 30
  },
  MarketCoinList: {
    marginTop: 10,
  },

});
