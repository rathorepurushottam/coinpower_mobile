import React from 'react';
import {AppSafeAreaView, AppText, Button, SECOND, Toolbar} from '../../common';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import KeyBoardAware from '../../common/KeyboardAware';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  inputHeight,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import FastImage from 'react-native-fast-image';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import {copyText} from '../../helper/utility';
import {copyIcon} from '../../helper/ImageAssets';
import NavigationService from '../../navigation/NavigationService';
import {ENTER_OTP_SCREEN} from '../../navigation/routes';

const TwoFactorQr = () => {
  const twoFaQrData = useAppSelector(state => state.home.twoFaQrData);
  const {qr_code, secret} = twoFaQrData ?? '';
  const {base32} = secret ?? '';

  const onSubmit = () => {
    NavigationService.navigate(ENTER_OTP_SCREEN, {
      title: 'Authenticator App',
      authType: 2,
    });
  };
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={'Authenticator App'} />
      <KeyBoardAware>
        <View style={styles.container}>
          <View style={styles.qrCodeContainer}>
            <FastImage
              source={{uri: qr_code}}
              resizeMode="contain"
              style={styles.qrImage}
            />
          </View>
          <View style={styles.addressContainer}>
            <AppText
              ellipsizeMode="middle"
              numberOfLines={1}
              style={styles.address}>
              {base32}
            </AppText>
            <View style={styles.divider} />
            <TouchableOpacityView
              onPress={() => copyText(base32)}
              style={styles.copyIconContainer}>
              <FastImage
                source={copyIcon}
                resizeMode="contain"
                style={styles.copyIcon}
              />
            </TouchableOpacityView>
          </View>
          <AppText style={styles.copyText} color={SECOND}>
            Click above to copy the code
          </AppText>
        </View>
      </KeyBoardAware>
      <Button
        children="Submit"
        onPress={() => onSubmit()}
        containerStyle={styles.button}
      />
    </AppSafeAreaView>
  );
};

export default TwoFactorQr;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    marginTop: universalPaddingTop,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  qrCodeContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  qrImage: {
    height: 250,
    width: 200,
  },
  addressContainer: {
    marginTop: 10,
    height: inputHeight,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 25,
    paddingHorizontal: universalPaddingHorizontal,
    backgroundColor: colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: inputHeight - 10,
    backgroundColor: colors.secondaryText,
    marginHorizontal: 5,
  },
  copyIcon: {
    height: 20,
    width: 20,
  },
  address: {
    flex: 1,
  },
  copyIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyText: {
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    margin: universalPaddingHorizontalHigh,
  },
});
