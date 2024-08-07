import React, {ReactNode, useEffect, useRef} from 'react';
import {RootState} from './store/store';
// import * as socketIoClient from 'socket.io-client';
import {connect} from 'socket.io-client';
import {BASE_URL} from './helper/Constants';
import {useAppDispatch, useAppSelector} from './store/hooks';
import {
  setCoinData,
  setRandom,
  setSocket,
  setSocketLoading,
} from './slices/homeSlice';

interface EventComponentProps {
  children: ReactNode;
  store: RootState;
}
const connection = connect(BASE_URL, {
  transports: ['websocket'],
  forceNew: true,
  autoConnect: true,
});
const SocketComponent = ({children}: EventComponentProps) => {
  const dispatch = useAppDispatch();

  const coinData = useAppSelector(state => state.home.coinData);
  const random = useAppSelector(state => state.home.random);

  console.log('event:', coinData.length);

  useEffect(() => {
    connection?.on('connect', () => {
      console.log('connected to socket server');
      dispatch(setSocket(connection));
      dispatch(setRandom(Math.random()));
    });

    return () => {
      connection?.off('connect');
    };
  }, []);

  useEffect(() => {
    if (coinData?.length === 0) {
      connection?.emit('message', {message: 'market'});
      console.log('event name message emitted');
    }
  }, [coinData, random]);

  useEffect(() => {
    connection?.on('message', res => {
      dispatch(setCoinData(res));
      dispatch(setSocketLoading(false));
    });
    return () => {
      connection?.off('message');
    };
  }, [random]);

  useEffect(() => {
    connection?.on('disconnect', () => {
      console.log('disconnect to socket server');
    });
    return () => {
      connection?.off('disconnect');
    };
  }, []);

  return <>{children}</>;
};

export default SocketComponent;
