import React, {useRef, useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  Input,
  RadioButton,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  Toolbar,
  WHITE,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import {Keyboard, StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  inputHeight,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {errorText, placeHolderText, titleText} from '../../helper/Constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {calendarIcon} from '../../helper/ImageAssets';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import {showError} from '../../helper/logger';
import {setKycData} from '../../slices/accountSlice';
import NavigationService from '../../navigation/NavigationService';
import {KYC_STEP_FOUR_SCREEN} from '../../navigation/routes';
import {checkValue} from '../../helper/utility';
import {sendOtp} from '../../actions/authActions';

const KycStepTwo = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.auth.userData);

  const {
    mobileNumber,
    firstName: _firstName,
    lastName: _lastName,
    emailId,
  } = userData ?? '';
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [firstName, setFirstName] = useState(_firstName);
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState(_lastName);
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobileOtp, setMobileOtp] = useState('');
  const [isDatePickerVisible, serIsDatePickerVisible] = useState(false);
  const middleNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const addressInput = useRef(null);
  const stateInput = useRef(null);
  const cityInput = useRef(null);
  const pinInput = useRef(null);
  const [email, setEmail] = useState('');
  const [otpText, setOtpText] = useState(checkValue(languages?.register_nine));

  const hideDatePicker = () => {
    serIsDatePickerVisible(false);
  };
  const showDatePicker = () => {
    serIsDatePickerVisible(true);
  };
  const handleConfirm = date => {
    setDob(moment(date).format('DD-MM-YYYY'));
    hideDatePicker();
  };
  const onNext = () => {
    if (!firstName) {
      showError(checkValue(languages?.error_firstName));
      return;
    }
    // if (!middleName) {
    //   showError(checkValue('Please Enter Valid Middle Name'));
    //   return;
    // }
    if (!lastName) {
      showError(checkValue(languages?.error_lastName));
      return;
    }
    if (!dob) {
      showError(checkValue(languages?.error_dob));
      return;
    }
    if (!address) {
      showError(checkValue(languages?.error_address));
      return;
    }
    if (!state) {
      showError(checkValue(languages?.error_state));
      return;
    }
    if (!city) {
      showError(checkValue(languages?.error_city));
      return;
    }
    if (!pin) {
      showError(checkValue(languages?.error_pin));
      return;
    }
    if(!emailOtp) {
      showError(checkValue(languages?.error_E_otp));
      return;
    }
    dispatch(setKycData({key: 'first_name', value: firstName}));
    dispatch(setKycData({key: 'middle_name', value: middleName}));
    dispatch(setKycData({key: 'last_name', value: lastName}));
    dispatch(setKycData({key: 'gender', value: gender}));
    dispatch(setKycData({key: 'dob', value: dob}));
    dispatch(setKycData({key: 'address', value: address}));
    dispatch(setKycData({key: 'state', value: state}));
    dispatch(setKycData({key: 'city', value: city}));
    dispatch(setKycData({key: 'zip_code', value: pin}));
    dispatch(setKycData({key: 'emailId', value: emailId}));
    dispatch(setKycData({key: 'emailOtp', value: emailOtp}));
    dispatch(setKycData({key: 'mobileNumber', value: mobileNumber}));
    dispatch(setKycData({key: 'mobileOtp', value: mobileOtp}));
    NavigationService.navigate(KYC_STEP_FOUR_SCREEN);
  };

  const onGetOtp = (type: any) => {
    let data = {
      email_or_phone : type,
      "resend": true,
    };
    dispatch(sendOtp(data));
    setOtpText(checkValue(languages?.register_ten));
    Keyboard.dismiss();
  };
  // const onGetOtpPhone = () => {
  //   let data = {
  //     email_or_phone: phoneNumber,
  //     resend: true,
  //     type: 'registration',
  //   };
  //   dispatch(sendOtp(data));
  //   setOtpText(checkValue(languages?.register_ten));
  //   Keyboard.dismiss();
  // };

  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={checkValue(languages?.kyc_one)} />
      <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {checkValue(languages?.kyc_four)}
        </AppText>
        <View style={styles.divider} />
        <View style={styles.container}>
          <Input
            title={checkValue(languages?.title_firstName)}
            placeholder={checkValue(languages?.place_firstName)}
            value={firstName}
            onChangeText={text => setFirstName(text)}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => middleNameInput?.current?.focus()}
          />
          <Input
            title={checkValue(languages?.title_middleName)}
            placeholder={checkValue(languages?.place_middleName)}
            value={middleName}
            onChangeText={text => setMiddleName(text)}
            autoCapitalize="none"
            assignRef={input => {
              middleNameInput.current = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => lastNameInput?.current?.focus()}
          />
          <Input
            title={checkValue(languages?.title_lastName)}
            placeholder={checkValue(languages?.place_lastName)}
            value={lastName}
            onChangeText={text => setLastName(text)}
            autoCapitalize="none"
            assignRef={input => {
              lastNameInput.current = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => addressInput?.current?.focus()}
          />
          <View>
            <AppText style={styles.gender}>{titleText.gender}</AppText>
            <View style={styles.genderContainer}>
              <View style={styles.genderContainerSecond}>
                <AppText type={FOURTEEN}>Male</AppText>
                <RadioButton
                  value={gender === 'Male'}
                  onChange={() => setGender('Male')}
                />
              </View>
              <View style={styles.genderContainerThird}>
                <AppText type={FOURTEEN}>Female</AppText>
                <RadioButton
                  value={gender === 'Female'}
                  onChange={() => setGender('Female')}
                />
              </View>
            </View>
          </View>
          <Input
            title={checkValue(languages?.title_phone)}
            placeholder={'Enter Your Phone'}
            value={phoneNumber || mobileNumber}
            autoCapitalize="none"
            onChangeText={e => {
              setPhoneNumber(e);
            }}
            keyboardType='numeric'
            editable={mobileNumber ? false : true}
            isOtp={mobileNumber ? false : true}
            otpText={otpText}
            onSendOtp={() => onGetOtp(type)}
            returnKeyType="next"
          />
          {!mobileNumber && (
            <Input
              title={'OTP'}
              value={mobileOtp}
              onChangeText={e => {
                setMobileOtp(e);
              }}
              placeholder={'Enter OTP'}
              autoCapitalize="none"
              returnKeyType="next"
            />
          )}
          <Input
            title={'Email*'}
            value={email ||emailId}
            onChangeText={e => {
              setEmail(e);
            }}
            placeholder={'Enter Email'}
            autoCapitalize="none"
            editable={emailId ? false : true}
            returnKeyType="next"
            isOtp={true}
            otpText={otpText}
            onSendOtp={() => onGetOtp(type)}
          />
          {!emailId && (
            <Input
              title={'OTP*'}
              value={emailOtp}
              onChangeText={e => {
                setEmailOtp(e);
              }}
              placeholder={'Enter OTP'}
              autoCapitalize="none"
              returnKeyType="next"
            />
          )}
          <View>
            <AppText style={styles.gender}>
              {checkValue(languages?.title_dob)}
            </AppText>
            <TouchableOpacityView
              onPress={() => showDatePicker()}
              style={styles.dateContainer}>
              <AppText type={FOURTEEN} color={dob ? WHITE : SECOND}>
                {dob ? dob : checkValue(languages?.place_dob)}
              </AppText>
              <FastImage
                source={calendarIcon}
                resizeMode="contain"
                style={styles.calendarIcon}
              />
            </TouchableOpacityView>
          </View>
          <Input
            title={checkValue(languages?.title_address)}
            placeholder={checkValue(languages?.place_common)}
            value={address}
            onChangeText={text => setAddress(text)}
            autoCapitalize="none"
            assignRef={input => {
              addressInput.current = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => stateInput?.current?.focus()}
          />
          <Input
            title={checkValue(languages?.title_state)}
            placeholder={checkValue(languages?.place_common)}
            value={state}
            onChangeText={text => setState(text)}
            autoCapitalize="none"
            assignRef={input => {
              stateInput.current = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => cityInput?.current?.focus()}
          />
          <Input
            title={checkValue(languages?.title_city)}
            placeholder={checkValue(languages?.place_common)}
            value={city}
            onChangeText={text => setCity(text)}
            autoCapitalize="none"
            assignRef={input => {
              cityInput.current = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => pinInput?.current?.focus()}
          />
          <Input
            title={checkValue(languages?.title_pin)}
            placeholder={checkValue(languages?.place_common)}
            value={pin}
            onChangeText={text => setPin(text)}
            autoCapitalize="none"
            assignRef={input => {
              pinInput.current = input;
            }}
            returnKeyType="done"
            onSubmitEditing={() => onNext()}
            keyboardType="numeric"
          />
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          maximumDate={moment().subtract(21, 'years').toDate()}
        />
        <Button
          children={checkValue(languages?.kyc_three)}
          onPress={() => onNext()}
          containerStyle={styles.button}
        />
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default KycStepTwo;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  title: {
    marginTop: universalPaddingTop,
  },
  divider: {
    height: borderWidth,
    backgroundColor: colors.inputBorder,
    marginVertical: 15,
  },
  gender: {
    marginTop: 15,
  },
  genderContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  genderContainerSecond: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 60,
    justifyContent: 'space-between',
  },
  genderContainerThird: {
    flexDirection: 'row',
    marginStart: 40,
    alignItems: 'center',
    width: 80,
    justifyContent: 'space-between',
  },
  dateContainer: {
    marginTop: 5,
    height: inputHeight,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 25,
    paddingHorizontal: universalPaddingHorizontal,
    backgroundColor: colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calendarIcon: {
    height: 25,
    width: 25,
  },
  button: {
    marginVertical: universalPaddingHorizontalHigh,
  },
});
