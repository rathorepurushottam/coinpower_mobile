/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HOME_BG, mainBg} from '../helper/ImageAssets';
import {commonStyles} from '../theme/commonStyles';

interface AppSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
  source?: string;
}

const AppSafeAreaView = ({children, style, source}: AppSafeAreaViewProps) => {
  return Platform.OS === 'ios' ? (
    <SafeAreaView
      edges={['right', 'left']}
      style={[
        {
          flex: 1,
        },
        style,
      ]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <ImageBackground
        source={source ? source : HOME_BG}
        style={commonStyles.screenSize}
        // resizeMethod="auto"
        resizeMode="cover">
        {children}
      </ImageBackground>
    </SafeAreaView>
  ) : (
    <View style={[{flex: 1}, style]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <ImageBackground
        source={source ? source : HOME_BG}
        style={commonStyles.screenSize}
        // resizeMethod="auto"
        resizeMode="cover">
        {children}
      </ImageBackground>
    </View>
  );
};

export {AppSafeAreaView};
