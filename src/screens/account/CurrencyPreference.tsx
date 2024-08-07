import React, {useEffect, useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  SEMI_BOLD,
  Toolbar,
} from '../../common';
import {
  bitcoinIcon,
  bnbIcon,
  checkIcon,
  rupeeIcon,
  tetherIcon,
} from '../../helper/ImageAssets';
import KeyBoardAware from '../../common/KeyboardAware';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import FastImage from 'react-native-fast-image';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {changeCurrencyPreference} from '../../actions/accountActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {showError} from '../../helper/logger';
import {errorText} from '../../helper/Constants';

const CurrencyPreference = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.auth.userData);
  const {currency_prefrence} = userData ?? '';
  const [currency, setCurrency] = useState('');
  const data = [
    // {
    //   name: 'USDT',
    //   title: 'Tether USD (USDT)',
    //   src: tetherIcon,
    //   key: 1,
    // },

    {
      name: 'BTC',
      title: 'BitCoin (BTC)',
      src: bitcoinIcon,
      key: 2,
    },

    // {
    //   name: 'INR',
    //   title: 'Rupee (INR)',
    //   src: rupeeIcon,
    //   key: 3,
    // },

    {
      name: 'BNB',
      title: 'BNB',
      src: bnbIcon,
      key: 4,
    },
  ];
  useEffect(() => {
    setCurrency(currency_prefrence);
  }, [currency_prefrence]);

  const onSubmit = () => {
    // if (currency_prefrence === currency) {
    //   showError(errorText.currency);
    //   return;
    // }
    const _data = {
      currency: currency,
    };
    
    dispatch(changeCurrencyPreference(_data));
  };
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={'Currency Preference'} />
      <KeyBoardAware style={styles.container}>
        {data?.map(e => {
          return (
            <TouchableOpacityView
              onPress={() => setCurrency(e.name)}
              style={[styles.singleBox, e.name === currency && styles.selected]}
              key={e.key?.toString()}>
              <View style={styles.singleBoxSecond}>
                <FastImage
                  source={e?.src}
                  resizeMode="contain"
                  style={styles.icon}
                />
                <AppText weight={SEMI_BOLD}>{e?.title}</AppText>
              </View>
              {e.name === currency && (
                <View style={styles.rightIcContainer}>
                  <FastImage
                    source={checkIcon}
                    resizeMode="contain"
                    style={styles.rightIc}
                  />
                </View>
              )}
            </TouchableOpacityView>
          );
        })}
        <Button
          children="Save Changes"
          onPress={() => onSubmit()}
          containerStyle={styles.button}
        />
      </KeyBoardAware>
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default CurrencyPreference;

const styles = StyleSheet.create({
  singleBox: {
    backgroundColor: colors.inputBackground,
    paddingHorizontal: universalPaddingHorizontalHigh,
    marginVertical: universalPaddingHorizontal,
    paddingVertical: universalPaddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    marginHorizontal: universalPaddingHorizontalHigh,
  },
  selected: {borderColor: colors.buttonBg},
  container: {
    paddingTop: universalPaddingTop,
    paddingHorizontal: 0,
  },
  icon: {
    height: 22,
    width: 22,
    marginEnd: 10,
  },
  singleBoxSecond: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {marginTop: 50, marginHorizontal: universalPaddingHorizontalHigh},
  rightIc: {
    height: 20,
    width: 20,
  },
  rightIcContainer: {
    height: 20,
    width: 20,
    position: 'absolute',
    right: -5,
    top: -8,
  },
});
