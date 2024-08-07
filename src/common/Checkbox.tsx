import React from 'react';
import TouchableOpacityView from './TouchableOpacityView';
import {StyleSheet, View} from 'react-native';
import {borderWidth} from '../theme/dimens';
import {colors} from '../theme/colors';
import FastImage from 'react-native-fast-image';
import {checkIc} from '../helper/ImageAssets';

const Checkbox = ({value, onChange}) => {
  return (
    <TouchableOpacityView style={styles.container} onPress={onChange}>
      <View
        style={[styles.innerView, value && {backgroundColor: colors.buttonBg}]}>
        <FastImage source={checkIc} resizeMode="contain" style={styles.icon} />
      </View>
    </TouchableOpacityView>
  );
};

export {Checkbox};
const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderWidth: borderWidth,
    borderColor: colors.buttonBg,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    height: 20,
    width: 20,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 12,
    width: 12,
  },
});
