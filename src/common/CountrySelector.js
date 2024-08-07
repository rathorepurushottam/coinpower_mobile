import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import RNPickerSelect from 'react-native-picker-select';
import {fontFamily} from '../theme/typography';
import {
  borderWidth,
  inputHeight,
  universalPaddingVertical,
} from '../theme/dimens';
import {downArrowIcon} from '../helper/ImageAssets';
import CountryPicker from 'react-native-country-picker-modal';

import {colors} from '../theme/colors';
const CountrySelector = ({visible, onSelectCountry, style, ...props}) => {
  const [country, setCountry] = useState({
    cca2: 'AE',
    callingCode: ['971'],
    name: 'United Arab Emirates',
  });

  return (
    <View style={[styles.dropdownWrapper, style]}>
      <CountryPicker
        onSelect={onSelectCountry}
        // withFlagButton
        withFilter
        containerButtonStyle={styles.inputPhoneF}
        // withAlphaFilter
        // withCallingCode
        countryCode={country && country.cca2}
        visible={visible}
      />
      <FastImage
        source={downArrowIcon}
        resizeMode="contain"
        style={styles.downArrowStyle}
        tintColor={colors.primaryText}
      />
    </View>
  );
};

export {CountrySelector};
const styles = StyleSheet.create({
  dropdownWrapper: {
    borderRadius: 25,
    height: inputHeight,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: Platform.OS === 'ios' ? universalPaddingVertical : 0,
    alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  downArrowStyle: {
    height: 12,
    width: 12,
  },
  inputPhoneF: {},
});
