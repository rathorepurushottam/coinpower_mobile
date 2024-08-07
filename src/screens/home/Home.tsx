import React, {useState ,useEffect } from 'react';
import { AppSafeAreaView, Header } from '../../common';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Linking, Alert } from 'react-native';
import HomeSlider from './HomeSlider';
import CoinSlider from './CoinSlider';
import HomeMenuBar from './HomeMenuBar';
import KeyBoardAware from '../../common/KeyboardAware';
import { commonStyles } from '../../theme/commonStyles';
import CoinList from './CoinList';
import { connect } from 'socket.io-client';
import {
  setCoinData,
  setRandom,
  setSocket,
  setSocketLoading,
} from '../../slices/homeSlice';
import { BASE_URL } from '../../helper/Constants';
import { getBannerList, getCoinList, getFavorites, getNotificationList } from '../../actions/homeActions';
import { getAdminBankDetails, getTradeHistory, getUserPortfolio, getUserWallet, getWalletHistory } from '../../actions/walletActions';
import { getVersion } from 'react-native-device-info';
import { SpinnerSecond } from '../../common/SpinnerSecond';

// Create a socket instance and ensure correct connection options
const socket = connect(BASE_URL, {
  transports: ['websocket'],
  forceNew: true,
  autoConnect: true,
});

const Home = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => {
    return state.auth.userData;
  });
  const loading = useAppSelector(state => {
    return state.auth.isLoading;
  });
  const [CheckCurrent, setCheckCurrent] = useState(getVersion());
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

  useEffect(() => {
    // Dispatch Redux actions to initialize data
    dispatch(getBannerList());
    dispatch(getCoinList());
    dispatch(getUserPortfolio());
    dispatch(getUserWallet());
    dispatch(getAdminBankDetails());
    dispatch(getTradeHistory());
    dispatch(getWalletHistory());
    dispatch(getFavorites());
    dispatch(getNotificationList());
  }, []);

  useEffect(() => {
    console.log(CheckCurrent,userData?.version, "version");
    if(CheckCurrent != userData?.version) {
      // InstallAPK();
    } 
  }, [userData?.version]);
  const InstallAPK = async () => {
    Alert.alert(
      'Update APK',
      'Please Update the latest verison.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Update', onPress: () => DownloadApk() }
      ]
    );
  };
  const DownloadApk = () => {
    const apkDownloadUrl = 'https://api.coinpowerexchange.com/downloads';
    Linking.openURL(apkDownloadUrl)
      .catch((error) => {
        console.error('Error opening download link:', error);
      });
  }

  return (
    <AppSafeAreaView>
      <Header />
      {!useAppSelector((state) => state.home.socketLoading) && (
        <KeyBoardAware style={commonStyles.zeroPadding}>
          <HomeSlider />
          <CoinSlider />
          <HomeMenuBar />
          <CoinList />
        </KeyBoardAware>
      )}
      <SpinnerSecond loading={loading}/>
    </AppSafeAreaView>
  );
};

export default Home;
