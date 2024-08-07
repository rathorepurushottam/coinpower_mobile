import React, {useEffect, useRef, useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  Input,
  PictureModal,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  Toolbar,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import {StyleSheet, View} from 'react-native';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import {colors} from '../../theme/colors';
import {PickerSelect} from '../../common/PickerSelect';
import {accountTypes} from '../../helper/dummydata';
import {errorText, placeHolderText, titleText} from '../../helper/Constants';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {doneIcon, uploadIcon} from '../../helper/ImageAssets';
import ImageCropPicker from 'react-native-image-crop-picker';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {useAppDispatch} from '../../store/hooks';
import {
  addNewBakAccount,
  updateBankAccount,
} from '../../actions/accountActions';
import {showError} from '../../helper/logger';
import {useRoute} from '@react-navigation/native';

const AddNewBank = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const userBankData = route?.params?.userBankData;
  // console.log('userBankData::::::::::::', userBankData);

  const [accountType, setAccountType] = useState('Saving Account');
  const [bankName, setBankName] = useState('');
  const [holderName, setHolderName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [branch, setBranch] = useState('');
  const [passbook, setPassbook] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const holderNameInput = useRef(null);
  const accountNoInput = useRef(null);
  const ifscInput = useRef(null);
  const branchInput = useRef(null);

  useEffect(() => {
    if (userBankData && userBankData.length !== 0) {
      setAccountType(userBankData[0]?.account_type);
      setBankName(userBankData[0]?.bank_name);
      setHolderName(userBankData[0]?.account_holder_name);
      setAccountNo(userBankData[0]?.account_number);
      setIfsc(userBankData[0]?.ifsc_code);
      setBranch(userBankData[0]?.branch_name);
      setPassbook(userBankData[0]?.passbook_picture);
    }
  }, []);

  const onPressCamera = () => {
    ImageCropPicker.openCamera({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        let mime = image?.mime?.split('/');
        let tempphoto = {
          uri: image.path,
          name: 'passbook_image' + image.modificationDate + '.' + mime[1],
          type: image.mime,
        };
        setPassbook(tempphoto);
      })

      .catch(error => {
        console.log(error);
      });
  };
  const onPressGallery = () => {
    ImageCropPicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        let mime = image?.mime?.split('/');

        let tempphoto = {
          uri: image.path,
          name: 'passbook_image' + image.modificationDate + '.' + mime[1],
          type: image.mime,
        };
        setPassbook(tempphoto);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSave = () => {
    if (!accountType) {
      showError(errorText.accountType);
      return;
    }
    if (!bankName) {
      showError(errorText.bank);
      return;
    }
    if (!accountType) {
      showError(errorText.accountType);
      return;
    }
    if (!holderName) {
      showError(errorText.holder);
      return;
    }
    if (!accountNo) {
      showError(errorText.number);
      return;
    }
    if (!ifsc) {
      showError(errorText.ifsc);
      return;
    }
    if (!branch) {
      showError(errorText.branch);
      return;
    }
    if (!passbook) {
      showError(errorText.passbook);
      return;
    }
    let data = new FormData();
    data.append('account_type', accountType);
    data.append('account_holder_name', holderName);
    data.append('account_number', accountNo);
    data.append('ifsc_code', ifsc);
    data.append('branch_name', branch);
    data.append('bank_name', bankName);
    if (typeof passbook === 'string') {
      data.append('passbook-photo', undefined);
    } else {
      data.append('passbook-photo', passbook);
    }

    if (userBankData && userBankData.length !== 0) {
      data.append('_id', userBankData[0]?._id);
      dispatch(updateBankAccount(data));
      // console.log('json', JSON.stringify(data));
    } else {
      dispatch(addNewBakAccount(data));
    }
  };
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={'Add Bank Account'} />
      <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          Enter Bank Details
        </AppText>
        <View style={styles.divider} />
        <View style={styles.container}>
          <PickerSelect
            data={accountTypes}
            value={accountType}
            onChange={setAccountType}
            placeholder={{label: placeHolderText.accountType, value: ''}}
            label={titleText.accountType}
          />
          <Input
            title={titleText.bank}
            placeholder={placeHolderText.bank}
            value={bankName}
            onChangeText={text => setBankName(text)}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => holderNameInput?.current?.focus()}
          />
          <Input
            title={titleText.holder}
            placeholder={placeHolderText.holder}
            value={holderName}
            onChangeText={text => setHolderName(text)}
            autoCapitalize="none"
            assignRef={input => {
              holderNameInput.current = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => accountNoInput?.current?.focus()}
          />
          <Input
            title={titleText.number}
            placeholder={placeHolderText.number}
            value={accountNo}
            onChangeText={text => setAccountNo(text)}
            autoCapitalize="none"
            assignRef={input => {
              accountNoInput.current = input;
            }}
            returnKeyType="next"
            keyboardType="numeric"
            onSubmitEditing={() => ifscInput?.current?.focus()}
          />
          <Input
            title={titleText.ifsc}
            placeholder={placeHolderText.ifsc}
            value={ifsc}
            onChangeText={text => setIfsc(text)}
            autoCapitalize="none"
            assignRef={input => {
              ifscInput.current = input;
            }}
            returnKeyType="next"
            onSubmitEditing={() => branchInput?.current?.focus()}
          />
          <Input
            title={titleText.branch}
            placeholder={placeHolderText.branch}
            value={branch}
            onChangeText={text => setBranch(text)}
            autoCapitalize="none"
            assignRef={input => {
              branchInput.current = input;
            }}
            returnKeyType="done"
          />
          <AppText style={styles.gender}>{'Passbook Image'}</AppText>
          <AppText color={SECOND} type={TEN}>
            (Only JPEG, PNG & JPG formats and file size upto 5MB are supported)
          </AppText>
          <TouchableOpacityView
            onPress={() => setIsVisible(true)}
            style={styles.fileContainer}>
            <FastImage
              source={passbook ? doneIcon : uploadIcon}
              style={styles.uploadIcon}
              resizeMode="contain"
            />
            <AppText color={SECOND}>
              {passbook ? 'File Uploaded' : 'Choose a File'}
            </AppText>
          </TouchableOpacityView>
        </View>
      </KeyBoardAware>
      <Button
        children="Save"
        onPress={() => onSave()}
        containerStyle={styles.button}
      />
      <PictureModal
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
        onPressGallery={() => {
          onPressGallery();
        }}
        onPressCamera={() => {
          onPressCamera();
        }}
      />
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};
export default AddNewBank;

const styles = StyleSheet.create({
  title: {
    marginTop: universalPaddingTop,
  },
  divider: {
    height: borderWidth,
    backgroundColor: colors.inputBorder,
    marginVertical: 15,
  },
  container: {
    backgroundColor: colors.white_fifteen,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
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
  gender: {
    marginTop: 15,
  },
  button: {
    margin: universalPaddingHorizontalHigh,
  },
});
