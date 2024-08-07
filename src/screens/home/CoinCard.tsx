import React from 'react';
import {StyleSheet, View,Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  downGraphIcon,
  downIcon,
  upGraphIcon,
  upIcon,
} from '../../helper/ImageAssets';
import {AppText, SECOND, SEMI_BOLD, TEN} from '../../common';
import {toFixedEight, toFixedThree} from '../../helper/utility';
import {colors} from '../../theme/colors';
import {BASE_URL} from '../../helper/Constants';
import {CoinCardProps} from '../../helper/types';
import {commonStyles} from '../../theme/commonStyles';
import {useAppSelector} from '../../store/hooks';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_BOTTOM_TAB_STACK, NAVIGATION_TRADE_STACK, TRADE_SCREEN } from '../../navigation/routes';
import useLanguage from '../../hooks/useLanguage';

const CoinCard = ({item}: CoinCardProps) => {
  const {languageValidation} = useLanguage();
  const navigation = useNavigation();
  const currency = useAppSelector(state => state?.home?.currency);
  const getGraphIcon = () => {
    if (item.change < 0) {
      return downGraphIcon;
    } else {
      return upGraphIcon;
    }
  };
  const getArrowIcon = () => {
    if (item.change < 0) {
      return downIcon;
    } else {
      return upIcon;
    }
  };

  return (
    <TouchableOpacityView
      onPress={() =>
        navigation.navigate(NAVIGATION_BOTTOM_TAB_STACK, {
          screen: NAVIGATION_TRADE_STACK,
          params: {
            screen:TRADE_SCREEN,
            params: {
               coinDetail: item,
               path: "Spot"
            },
          },
        })
      }
      style={[styles.container]}>
      <View style={styles.containerSecond}>
        <FastImage
          resizeMode="contain"
          style={styles.coinLogo}
          source={{uri: `${BASE_URL}${item.icon_path}`}}
        />
        <FastImage
          resizeMode="contain"
          style={styles.graph}
          source={getGraphIcon()}
        />
      </View>
      <View style={styles.containerThird}>
        <View style={commonStyles.flexRow}>
          <AppText type={TEN} weight={SEMI_BOLD} style={styles.coinName}>
            {languageValidation(item.base_currency)}{' '}
          </AppText>
          <AppText type={TEN} color={SECOND} style={styles.coinType}>
            {item.quote_currency}
          </AppText>
        </View>
        <View style={commonStyles.rowCenter}>
          <FastImage
            resizeMode="contain"
            style={styles.arrow}
            source={getArrowIcon()}
          />
          <AppText
            style={[
              styles.pChange,
              item.change < 0 && {
                color: colors.red,
              },
            ]}>
            {toFixedThree(item?.change)}
          </AppText>
        </View>
      </View>
      <AppText>
        {currency} {toFixedEight(item?.buy_price)}
      </AppText>
    </TouchableOpacityView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: colors.white_fifteen,
    padding: 10,
    marginHorizontal: 5,
  },
  coinLogo: {
    height: 22,
    width: 22,
  },
  graph: {
    height: 22,
    width: 50,
  },
  coinName: {},
  coinType: {
    marginLeft: 2,
  },
  pChange: {
    color: colors.green,
    fontSize: 8,
    marginLeft: 5,
  },
  containerSecond: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerThird: {flexDirection: 'row', justifyContent: 'space-between'},
  arrow: {
    height: 6,
    width: 6,
  },
});
export default CoinCard;
