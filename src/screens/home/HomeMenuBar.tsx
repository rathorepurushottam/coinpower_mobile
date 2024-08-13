import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import {AppText} from '../../common';
import {colors} from '../../theme/colors';
import {universalPaddingHorizontalHigh} from '../../theme/dimens';
import {
  buyCrypto,
  convertIcon,
  depositIcon,
  withdrawIcon,
} from '../../helper/ImageAssets';
import NavigationService from '../../navigation/NavigationService';
import {CONVERT_SCREEN, QUICK_BUY_SELL, STAKING, WALLET_SCREEN} from '../../navigation/routes';
import {useAppSelector} from '../../store/hooks';
import {checkValue} from '../../helper/utility';
import { showError } from '../../helper/logger';

const HomeMenuBar = () => {
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const Data = [
    {
      id: '1',
      title: checkValue(languages?.deposit),
      icon: depositIcon,
      onPress: () => NavigationService.navigate(WALLET_SCREEN, {from: "home"}),
    },
    {
      id: '2',
      title: checkValue(languages?.withdraw),
      icon: withdrawIcon,
      onPress: () => NavigationService.navigate(WALLET_SCREEN, {from: "home"}),
    },
    // {
    //   id: '6',
    //   title: checkValue(languages?.buy_crypto),
    //   icon: buyCrypto,
    //   onPress: () => {NavigationService.navigate(QUICK_BUY_SELL)},
    // },
    // {
    //   id: '4',
    //   title: 'Convert',
    //   icon: convertIcon,
    //   onPress: () => NavigationService.navigate(CONVERT_SCREEN),
    // },
    // {
    //   id: '5',
    //   title: 'Stacking',
    //   icon: convertIcon,
    //   onPress: () => NavigationService.navigate(STAKING),
    // },
  ];

  return (
    <View style={styles.container}>
      {Data.map(item => {
        return (
          <TouchableOpacityView
            onPress={item?.onPress}
            style={styles.singleItem}
            key={item?.id}>
            <FastImage
              resizeMode="contain"
              source={item.icon}
              style={styles.icon}
            />
            <AppText>{item?.title}</AppText>
          </TouchableOpacityView>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: universalPaddingHorizontalHigh,
  },
  icon: {
    height: 25,
    width: 25,
    marginBottom: 5,
  },
  singleItem: {
    width: '40%',
    // alignSelf: 'center',
    alignItems: 'center',
    // justifyContent: "space-evenly"
  },
});
export default HomeMenuBar;
