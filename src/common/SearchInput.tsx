import React, {useState} from 'react';
import {
  Dimensions,
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
  universalPaddingHorizontalHigh,
} from '../theme/dimens';
import {fontFamily} from '../theme/typography';
import {colors} from '../theme/colors';
import {eye_close_icon, eye_open_icon, searchIcon} from '../helper/ImageAssets';
import TouchableOpacityView from './TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {Button} from './Button';
import {AppText, BOLD, FIFTEEN, MEDIUM, NORMAL, YELLOW} from './AppText';
import NavigationService from '../navigation/NavigationService';
import {HOME_SCREEN} from '../navigation/routes';

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
  onFocus?: boolean;
  cancelBtn?: boolean;
  searchContainStyle?: ViewStyle;
  sheetDownButton?:boolean;
  sheetDownPress?:void;
}

const SearchInput = ({
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
  onFocus,
  cancelBtn,
  searchContainStyle,
  sheetDownButton,
  sheetDownPress,
  ...props
}: InputProps) => {
  const [focus, setFocus] = useState(true);

  return (
    <View style={(styles.mainViewStyle, [containerStyle])}>
      <View style={[styles.container, {marginLeft: 10,...searchContainStyle}]}>
        <FastImage
          source={searchIcon}
          resizeMode="contain"
          style={styles.searchIcon}
        />
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
          autoFocus={focus}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
        />
      </View>
      {cancelBtn && (
        <TouchableOpacityView
          style={styles.cancelButton}
          onPress={() => {
            setFocus(false);
            NavigationService.goBack();
          }}>
          <AppText type={FIFTEEN} color={YELLOW} weight={MEDIUM}>
            Cancel
          </AppText>
        </TouchableOpacityView>
      )}

{sheetDownButton && (
        <TouchableOpacityView
          style={styles.cancelButton}
          onPress={sheetDownPress}>
          <AppText type={FIFTEEN} color={YELLOW} weight={MEDIUM}>
            Cancel
          </AppText>
        </TouchableOpacityView>
      )}
    </View>
  );
};

export {SearchInput};
const styles = StyleSheet.create({
  inputF: {
    fontFamily: fontFamily,
    fontSize: 14,
    color: colors.white,
    height: inputHeight,
    flex: 1,
  },
  container: {
    marginTop: 40,
    height: inputHeight,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
    width: Dimensions.get('screen').width - 100,
    // marginHorizontal: universalPaddingHorizontalHigh,
    paddingHorizontal: universalPaddingHorizontal,
    alignSelf: 'flex-start',
  },
  searchIcon: {
    height: 20,
    width: 20,
  },
  cancelButton: {
    position: 'absolute',
    // alignSelf:"flex-start",
    bottom: 0,
    right: 15,
  },
  mainViewStyle: {
    width: Dimensions.get('screen').width,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
