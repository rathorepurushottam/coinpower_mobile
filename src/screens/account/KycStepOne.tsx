import React, {useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  SEMI_BOLD,
  SIXTEEN,
  Toolbar,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import {Platform, StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import {PickerSelect} from '../../common/PickerSelect';
import {KycTypes, countryList} from '../../helper/dummydata';
import {titleText} from '../../helper/Constants';
import {showError} from '../../helper/logger';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setKycData} from '../../slices/accountSlice';
import NavigationService from '../../navigation/NavigationService';
import {KYC_STEP_TWO_SCREEN} from '../../navigation/routes';
import {checkValue} from '../../helper/utility';

const KycStepOne = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [country, setCountry] = useState('India');
  const [kycType, setKycType] = useState('Personal');

  const onNext = () => {
    if (!country) {
      showError(checkValue(languages?.error_country));
      return;
    }
    if (!kycType) {
      showError(checkValue(languages?.error_kycType));
      return;
    }
    dispatch(setKycData({key: 'country', value: country}));
    dispatch(setKycData({key: 'kyc_type', value: kycType}));
    NavigationService.navigate(KYC_STEP_TWO_SCREEN);
  };
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={checkValue(languages?.kyc_one)} />
      <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {checkValue(languages?.kyc_two)}
        </AppText>
        <View style={styles.divider} />
        <View style={styles.container}>
          <PickerSelect
            data={countryList}
            value={country}
            onChange={setCountry}
            placeholder={{
              label: checkValue(languages?.place_country),
              value: '',
            }}
            label={titleText.country}
          />
          <PickerSelect
            data={KycTypes}
            value={kycType}
            onChange={setKycType}
            placeholder={{
              label: checkValue(languages?.place_kycType),
              value: '',
            }}
            label={titleText.kycType}
          />
        </View>
        <Button
        children={checkValue(languages?.kyc_three)}
        onPress={() => onNext()}
        containerStyle={styles.button}
      />
      </KeyBoardAware>
      
    </AppSafeAreaView>
  );
};

export default KycStepOne;
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
  button: {
    marginTop: Platform.OS === "ios" ? 400 : 300,
  },
});
