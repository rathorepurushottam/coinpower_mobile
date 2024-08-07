import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {
  borderWidth,
  inputHeight,
  smallButtonHeight,
  universalPaddingHorizontal,
} from '../theme/dimens';
import {fontFamily} from '../theme/typography';
import {colors} from '../theme/colors';
import {eye_close_icon, eye_open_icon} from '../helper/ImageAssets';
import TouchableOpacityView from './TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {Button} from './Button';
import {AppText, FOURTEEN, SECOND, WHITE} from './AppText';

interface InputProps extends TextInputProps {
  value?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  isSecure?: boolean;
  onPressVisible?: () => void;
  isOtp?: boolean;
  onSendOtp?: () => void;
  otpText?: string;
  title?: string;
  mainContainer?: ViewStyle;
  currency?: string;
  onfocus?:any;
  assignRef?:any;
}

const Input = ({
  value,
  placeholder,
  onChangeText,
  onEndEditing,
  keyboardType,
  assignRef,
  onSubmitEditing,
  multiline,
  containerStyle,
  inputStyle,
  onPressVisible,
  secureTextEntry,
  isSecure,
  isOtp,
  onSendOtp,
  otpText,
  title,
  mainContainer,
  currency,
  onfocus,
  onBlur,
  ...props
}: InputProps) => {
  return (
    <View style={mainContainer}>
      {title && <AppText style={styles.title}>{title}</AppText>}
      <View style={[styles.container, title && {marginTop: 5}, containerStyle]}>
        <TextInput
          {...props}
          placeholder={placeholder}
          placeholderTextColor={colors.secondaryText}
          autoCorrect={false}
          style={[styles.inputF, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          ref={component => {
            assignRef && assignRef(component);
          }}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          onFocus={onfocus}
          onBlur={onBlur}
        />
        {isSecure && (
          <TouchableOpacityView
            style={styles.eyeIconContainer}
            onPress={onPressVisible}>
            <FastImage
              source={secureTextEntry ? eye_open_icon : eye_close_icon}
              style={styles.eyeIcon}
              resizeMode="contain"
              tintColor={colors.white}
            />
          </TouchableOpacityView>
        )}
        {isOtp && (
          <Button
            children={otpText}
            titleStyle={styles.titleStyle}
            containerStyle={styles.containerStyle}
            onPress={onSendOtp}
          />
        )}
        {currency && (
          <AppText
            style={styles.eyeIconContainer}
            type={FOURTEEN}
            color={WHITE}>
            {currency}
          </AppText>
        )}
      </View>
    </View>
  );
};

export {Input};
const styles = StyleSheet.create({
  inputF: {
    fontFamily: fontFamily,
    fontSize: 12,
    color: colors.white,
    height: inputHeight,
    flex: 1,
  },

  container: {
    marginTop: 15,
    height: inputHeight,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 5,
    paddingHorizontal: universalPaddingHorizontal,
    backgroundColor: colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    height: 22,
    width: 22,
  },
  eyeIconContainer: {
    height: inputHeight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  otpContainer: {
    height: smallButtonHeight,
  },
  titleStyle: {
    fontSize: 12,
  },
  containerStyle: {
    height: smallButtonHeight,
    paddingHorizontal: 15,
  },
  title: {
    marginTop: 15,
  },
});