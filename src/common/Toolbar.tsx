import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import TouchableOpacityView from './TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {
  LOCKED,
  back_ic,
  history,
  logo,
  logoTwo,
  starFillIcon,
  starIcon,
} from '../helper/ImageAssets';
import {universalPaddingHorizontalHigh} from '../theme/dimens';
import NavigationService from '../navigation/NavigationService';
import {AppText, SEMI_BOLD, SIXTEEN} from './AppText';
import {
  CONVERT_HISTORY_SCREEN,
  HOME_SCREEN,
  LAKED_STAKING,
  NAVIGATION_BOTTOM_TAB_STACK,
  NAVIGATION_TRADE_STACK, TRADE_SCREEN
} from '../navigation/routes';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setP2P} from '../slices/homeSlice';
import { useNavigation } from '@react-navigation/native';

interface ToolbarProps {
  isLogo?: boolean;
  isSecond?: boolean;
  title?: string;
  isThird?: boolean;
  isFavorite?: boolean;
  onAdd?: () => void;
  isFourth?: boolean;
  isFifth?: boolean;
  onFifthPress?: () => void;
  isLock?: boolean;
  isCommit: boolean;
  isStake: boolean;
  isLogin: boolean;
}
const Toolbar = ({
  isLogo = true,
  isSecond,
  title,
  isThird,
  isStake,
  isFavorite,
  onAdd,
  isFourth,
  isFifth,
  onFifthPress,
  isCommit,
  isLogin,
  isLock = false,
}: ToolbarProps) => {
  const p2p = useAppSelector(state => state.home.p2p);
  
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        {justifyContent: isLogo || isSecond ? 'center' : 'flex-start'},
      ]}>
        {!isLogin && <TouchableOpacityView
        style={
          isLogo || isSecond ? styles.backContainer : styles.backContainer2
        }
        onPress={() => {
          if (p2p) {
            dispatch(setP2P(''));
          } else if (isCommit) {
            navigation.navigate(NAVIGATION_BOTTOM_TAB_STACK, {
              screen: NAVIGATION_TRADE_STACK,
              params: {
                screen:TRADE_SCREEN,
                params: {
                   path: "Launchpad"
                },
              },
            })
          }else if(isStake) {
            navigation.navigate(NAVIGATION_BOTTOM_TAB_STACK, {
              screen: NAVIGATION_TRADE_STACK,
              params: {
                screen:TRADE_SCREEN,
                params: {
                   path: "Staking"
                },
              },
            })
          }else {
            NavigationService.goBack();
          }
        }}>
        <FastImage
          source={back_ic}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacityView>}
      
      {isLogo && !isSecond && (
        <FastImage
          source={logoTwo}
          style={styles.mainLogo}
          resizeMode="contain"
        />
      )}
      {isSecond && (
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {title}
        </AppText>
      )}

      {isThird && (
        <TouchableOpacityView onPress={onAdd} style={styles.starContainer}>
          <FastImage
            source={isFavorite ? starFillIcon : starIcon}
            resizeMode="contain"
            style={styles.star}
          />
        </TouchableOpacityView>
      )}
      {isFourth && (
        <TouchableOpacityView
          activeOpacity={0.5}
          style={styles.starContainer}
          onPress={() => NavigationService.navigate(CONVERT_HISTORY_SCREEN)}>
          <FastImage
            resizeMode="contain"
            source={history}
            style={styles.star}
          />
        </TouchableOpacityView>
      )}
      {isLock && (
        <TouchableOpacityView
          activeOpacity={0.5}
          style={styles.starContainer}
          onPress={() => NavigationService.navigate(LAKED_STAKING)}>
          <FastImage
            resizeMode="contain"
            source={LOCKED}
            style={{right: 35, width: 25, height: 25}}
          />
        </TouchableOpacityView>
      )}
      {isFifth && (
        <TouchableOpacityView
          activeOpacity={0.5}
          style={styles.starContainer}
          onPress={onFifthPress}>
          <FastImage
            resizeMode="contain"
            source={history}
            style={styles.star}
          />
        </TouchableOpacityView>
      )}
    </View>
  );
};

export {Toolbar};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 30  : 40,
  },
  backContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 30 : 22,
    padding: universalPaddingHorizontalHigh,
    left: 0,
  },
  backContainer2: {
    padding: universalPaddingHorizontalHigh,
  },
  backIcon: {
    height: 16,
    width: 16,
    marginTop: 14
  },
  mainLogo: {
    height: 40,
    width: 100,
    marginTop: 14,
  },
  title: {
    marginTop: 18,
  },
  star: {
    height: 25,
    width: 25,
  },
  starContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 15 : 40,
    padding: universalPaddingHorizontalHigh,
    right: 0,
  },
});
