import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {onAppStart} from './helper/utility';
import store from './store/store';
import {Provider} from 'react-redux';
import Navigator from './navigation/Navigator';

function App() {
  useEffect(() => {
    onAppStart(store);
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;


  