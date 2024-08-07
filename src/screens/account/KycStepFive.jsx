import React, {useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  PictureModal,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  Toolbar,
  YELLOW,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {doneIcon, uploadIcon} from '../../helper/ImageAssets';
import ImageCropPicker from 'react-native-image-crop-picker';
import {commonStyles} from '../../theme/commonStyles';
import {showError} from '../../helper/logger';
import {errorText} from '../../helper/Constants';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {kycVerification} from '../../actions/accountActions';
import {checkValue} from '../../helper/utility';

const KycStepFive = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const userData = useAppSelector(state => state.auth.userData);
  const kycData = useAppSelector(state => state.account.kycData);
  const [selfie, setSelfie] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const onPressCamera = () => {
    ImageCropPicker.openCamera({
      useFrontCamera: true,
      multiple: false,
      mediaType: 'photo',
      cropping: true,
      compressImageQuality: 1
    })
      .then(image => {
        if(image?.size < 5000000 && (image?.mime === "image/png" || image?.mime === "image/jpeg" || image?.mime === "image/jpg")) {
          let mime = image?.mime?.split('/');
          let tempphoto = {
            uri: image.path,
            name: image?.path ||'image_name',
            type: image.mime,
          };
          setSelfie(tempphoto);
        } else {
          setSelfie('');
          showError("Only JPEG, PNG & JPG formats and file size upto 5MB are supported");
          return;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const onSubmit = () => {
    if (!selfie) {
      showError(errorText?.selfie);
      return;
    }

    var formData = new FormData();
    formData.append("document_front_image",  kycData?.document_front_image);
    formData.append("document_back_image",  kycData?.document_back_image);
    formData.append("user_selfie", selfie);
    formData.append("pancard_image", kycData?.pancard_image);
    formData.append("address",  kycData?.address);
    formData.append("city", kycData?.city);
    formData.append("state",  kycData?.state);
    formData.append("country", kycData?.country);
    formData.append("document_number", kycData?.document_number);
    formData.append("pancard_number",  kycData?.pancard_number?.toUpperCase());
    formData.append("confirm_pancard_number", kycData?.confirm_pancard_number?.toUpperCase());
    formData.append("dob",  kycData?.dob?.split('-')?.reverse()?.join("-"));
    formData.append("zip_code", kycData?.zip_code);
    formData.append("first_name", kycData?.first_name);
    formData.append("middle_name", kycData?.middle_name);
    formData.append("last_name", kycData?.last_name);
    formData.append("kyc_type",  kycData?.kyc_type);
    formData.append("gender", kycData?.gender);
    formData.append("emailId", kycData?.emailId);
    formData.append("eotp", parseInt(kycData?.emailOtp));  
    formData.append("document_type", kycData?.document_type);
    console.log('data::::::::', formData);
    dispatch(kycVerification(formData));
  };

  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={checkValue(languages?.kyc_one)} />
      <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {checkValue(languages?.kyc_sixteen)}
        </AppText>
        <View style={styles.divider} />
        <View style={styles.container}>
          <AppText style={styles.gender}>
            {checkValue(languages?.kyc_seventeen)}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {checkValue(languages?.kyc_nine)}
          </AppText>
          <TouchableOpacityView
            onPress={() => {
              setIsVisible(true);
            }}
            style={styles.fileContainer}>
            <FastImage
              source={selfie ? doneIcon : uploadIcon}
              style={styles.uploadIcon}
              resizeMode="contain"
            />
            <AppText color={SECOND}>
              {selfie
                ? checkValue(languages?.kyc_ten)
                : checkValue(languages?.kyc_eleven)}
            </AppText>
          </TouchableOpacityView>
        </View>
        <View>
        <AppText style={commonStyles.centerText} type={FOURTEEN} color={YELLOW}>
          {checkValue(languages?.kyc_eighteen)}
        </AppText>
        <AppText style={commonStyles.centerText}>
          {checkValue(languages?.kyc_nineteen)}
          {'\n'}
          {checkValue(languages?.kyc_twenty)}
        </AppText>
      </View>
      <Button
        children={'Submit'}
        onPress={() => onSubmit()}
        containerStyle={styles.button}
      />
      </KeyBoardAware>
      
      <PictureModal
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
        onPressCamera={() => {
          onPressCamera();
        }}
        isFront
      />
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default KycStepFive;
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
  fileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderWidth: borderWidth,
    borderColor: colors.buttonBg,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginTop: 20,
  },
  uploadIcon: {
    height: 50,
    width: 50,
  },
  button: {
    margin: universalPaddingHorizontalHigh,
  },
});
