import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {AppText} from '.';
import {buttonHeight} from '../theme/dimens';
import {BLACK, SEMI_BOLD, SIXTEEN, WHITE} from './AppText';
import {colors} from '../theme/colors';
import TouchableOpacityView from './TouchableOpacityView';

interface ButtonProps extends TouchableOpacityProps {
  children?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  disabled?: boolean;
  isSecond?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  containerStyle,
  titleStyle,
  disabled,
  onPress,
  isSecond,
  loading,
  ...rest
}: ButtonProps) => {
  return (
    <TouchableOpacityView
      style={[
        styles.buttonStyle(colors),
        containerStyle,
        disabled || loading ? {backgroundColor: colors.buttonBgDisabled} : {},
      ]}
      activeOpacity={1}
      onPress={
        disabled || loading ? console.log('Hello') : onPress
      }
      {...rest}>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.buttonBg} />
      ) : (
        <AppText
          type={SIXTEEN}
          color={isSecond || disabled ? WHITE : BLACK}
          weight={SEMI_BOLD}
          style={titleStyle}>
          {children}
        </AppText>
      )}
    </TouchableOpacityView>
  );
};
const styles = StyleSheet.create({
  buttonStyle: colors => ({
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: buttonHeight,
    borderRadius: 5,
    backgroundColor: colors.buttonBg,
  }),
});

export {Button};
