import React from 'react';
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
import {colors} from '../theme/colors';
import {AppText} from './AppText';

const PickerSelect = ({
  data,
  label,
  onChange,
  style,
  value,
  placeholder,
  container,
  ...props
}) => {
  const _onChange = value => {
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <View style={[styles.container, container]}>
      {label && <AppText>{label}</AppText>}
      <View style={[styles.dropdownWrapper, label && {marginTop: 5}, style]}>
        <RNPickerSelect
          {...props}
          style={{
            inputAndroid: {
              fontFamily: fontFamily,
              fontSize: 12,
              color: colors.white,
            },
            inputIOS: {
              fontFamily: fontFamily,
              fontSize: 12,
              color: colors.white,
            },
            placeholder: {
              fontFamily: fontFamily,
              fontSize: 12,
              color: colors.white,
            },
          }}
          onValueChange={_onChange}
          key={data.length}
          value={value}
          placeholder={placeholder}
          items={data}
          useNativeAndroidPickerStyle={true}
          fixAndroidTouchableBug
          Icon={() =>
            Platform.OS == 'ios' ? (
              <FastImage
                source={downArrowIcon}
                resizeMode="contain"
                style={styles.downArrowStyle}
                tintColor={colors.white}
              />
            ) : (
              <></>
            )
          }
          textInputProps={{
            selection: {start: 0},
            height: inputHeight,
          }}
          pickerProps={{
            dropdownIconColor: colors.white,
            dropdownIconRippleColor: colors.transparent,
            height: inputHeight,
          }}
        />
      </View>
    </View>
  );
};

export {PickerSelect};
const styles = StyleSheet.create({
  dropdownWrapper: {
    borderRadius: 5,
    height: inputHeight,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: Platform.OS === 'ios' ? universalPaddingVertical : 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
  },

  downArrowStyle: {
    height: 12,
    width: 12,
    top: 18,
  },
  container: {
    marginTop: 15,
  },
});
