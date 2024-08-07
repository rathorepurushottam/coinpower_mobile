import {StyleSheet, Platform} from 'react-native';
import {
  Screen,
  borderWidth,
  inputHeight,
  universalPaddingHorizontalHigh,
} from '../../theme/dimens';
import {colors} from '../../theme/colors';

export const authStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: universalPaddingHorizontalHigh,
  },
  welcomeLogo: {
    height: 500,
    width: 200,
    alignSelf: 'center',
  },
  welcomeSecondContainer: {
    flex: 1,
    marginTop: Screen.Height / 1.7,
  },
  welcomeSecondContainer2: {
    flex: 1,

  },
  tradeSign: {
    height: 20,
    width: 90,
    position: 'absolute',
    left: 200,
    top: 35,
  },
  welcomeButton: {
    marginVertical: 20,
    marginHorizontal: Platform.OS === "ios" ? 15 : 0,
  },
  bottomText: {
    textAlign: 'center',
    position: 'absolute',
    bottom: Platform.OS === "ios" ? 20 : 10,
    right: 0,
    left: 0,
  },
  bottomTextLogin: {
    textAlign: 'center',
    position: 'absolute',
    bottom: Platform.OS === "ios" ? -50 : 10,
    right: 0,
    left: 0,
  },
  forgotText: {
    marginVertical: 12,
    alignSelf: 'flex-end',
  },
  forgotContainer: {
    marginTop: 50,
  },
  marginTop: {
    marginVertical: Platform.OS === 'ios' ? 25 : 20,
    marginHorizontal: Platform.OS === 'ios' ? 10 : 0 
  },
  underlineStyleBase: {
    height: inputHeight,
    borderWidth: borderWidth,
    backgroundColor: colors.inputBackground,
    borderRadius: 40,
    marginTop: 50,
    borderColor: colors.inputBorder,
  },

  underlineStyleHighLighted: {
    borderColor: colors.buttonBg,
  },
  tabbar: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0,
  },
  tabBarMain: {
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    marginTop: 20,
  },
  tabBarActive: {
    alignItems: 'center',
    justifyContent: 'center',
    width:100, 
    borderBottomWidth:1,
    borderBottomColor:colors.buttonBg
  },
  tabBarInActive: {
    alignItems: 'center',
    justifyContent: 'center',
    width:100, 
    borderBottomWidth:1,
    borderBottomColor:colors.white

  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    flex: 0.6,
    marginEnd: 10,
  },
  mobileInput: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 20 : 15,
    marginStart: 5,
  },
  termsText: {
    textDecorationLine: 'underline',
  },
  marginUp: {
    marginTop: 20,
  }
});
