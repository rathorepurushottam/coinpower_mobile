import React, {useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  CommonModal,
  FOURTEEN,
  RED,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  Toolbar,
  YELLOW,
} from '../../common';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {StyleSheet, View} from 'react-native';
import KeyBoardAware from '../../common/KeyboardAware';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import {colors} from '../../theme/colors';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import NavigationService from '../../navigation/NavigationService';
import {ADD_NEW_BANK_SCREEN} from '../../navigation/routes';
import Accordion from 'react-native-collapsible/Accordion';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {bankStatus, getLastFour} from '../../helper/utility';
import FastImage from 'react-native-fast-image';
import {downIcon, editIcon, upIcon} from '../../helper/ImageAssets';
import {commonStyles} from '../../theme/commonStyles';
import {deleteBankAccount} from '../../actions/accountActions';

const PaymentOptions = () => {
  const dispatch = useAppDispatch();
  const userBankData = useAppSelector(state => state.account.userBankData);
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isDeleteId, setIsDeleteId] = useState(0);

  const _updateSections = (_activeSections: number[]) => {
    setActiveSections(_activeSections);
  };

  const onDelete = index => {
    setIsDelete(true);
    setIsDeleteId(index);
  };

  const _renderHeader = (section, index, isActive) => {
    const {verified, bank_name, account_number, account_type} = section ?? '';
    return (
      <View
        style={[
          styles.singleContainer,
          isActive && styles.singleContainerHeader,
        ]}>
        <View style={commonStyles.flex}>
          <View style={styles.headerNameContainer}>
            <AppText
              type={FOURTEEN}
              weight={SEMI_BOLD}>{`${bank_name} - ${getLastFour(
              account_number,
            )}`}</AppText>
            <TouchableOpacityView
              onPress={() =>
                NavigationService.navigate(ADD_NEW_BANK_SCREEN, {
                  userBankData: [section],
                })
              }>
              <FastImage
                source={editIcon}
                resizeMode="contain"
                style={styles.editIcon}
              />
            </TouchableOpacityView>
          </View>
          <View style={styles.headerNameContainer}>
            <AppText style={styles.default} color={RED}>
              {account_type}
            </AppText>
            <AppText
              style={[
                styles.status,
                {backgroundColor: bankStatus(verified).backgroundColor},
              ]}
              color={bankStatus(verified).textColor}>
              {bankStatus(verified).status}
            </AppText>
          </View>
        </View>
        <FastImage
          source={isActive ? upIcon : downIcon}
          resizeMode="contain"
          style={styles.arrow}
          tintColor={colors.white}
        />
      </View>
    );
  };
  const _renderContent = (section, index, isActive) => {
    const {
      verified,
      bank_name,
      account_number,
      account_holder_name,
      account_type,
      branch_name,
      ifsc_code,
      _id,
    } = section ?? '';
    const validation = bankStatus(verified);

    const Data = [
      {
        id: '1',
        title: 'Bank Name',
        value: bank_name,
      },
      {
        id: '2',
        title: 'Account Holder Name',
        value: account_holder_name,
      },
      {
        id: '3',
        title: 'Account Type',
        value: account_type,
      },
      {
        id: '4',
        title: 'Account Number',
        value: account_number,
      },
      {
        id: '5',
        title: 'IFSC Code',
        value: ifsc_code,
      },
      {
        id: '6',
        title: 'Branch Name',
        value: branch_name,
      },
    ];

    return (
      <View style={styles.singleContainerBody}>
        <View
          style={{
            backgroundColor: validation.backgroundColor,
            paddingHorizontal: universalPaddingHorizontal,
            paddingVertical: universalPaddingHorizontalHigh,
            marginTop: universalPaddingHorizontalHigh,
          }}>
          <AppText color={validation.textColor}>{validation.title}</AppText>
          <AppText>{validation.subtitle}</AppText>
        </View>
        <View style={styles.singleContainerBodySecond}>
          <AppText>Your bank account details for IMPS payments</AppText>
          {Data.map(e => {
            return (
              <View key={e.id} style={styles.singleItem}>
                <AppText type={TEN} color={SECOND}>
                  {e.title}
                </AppText>
                <AppText>{e.value}</AppText>
              </View>
            );
          })}
          <Button
            children="Remove"
            onPress={() => onDelete(index)}
            containerStyle={styles.button}
            isSecond
          />
        </View>
      </View>
    );
  };
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={'Payment Options'} />
      <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          BANK ACCOUNT
        </AppText>
        <View style={styles.divider} />
        <Accordion
          sections={userBankData}
          activeSections={activeSections}
          renderHeader={_renderHeader}
          renderContent={_renderContent}
          onChange={_updateSections}
          underlayColor={colors.transparent}
        />
        <TouchableOpacityView
          onPress={() => NavigationService.navigate(ADD_NEW_BANK_SCREEN)}
          style={styles.new}>
          <AppText color={YELLOW}>ADD A NEW BANK ACCOUNT</AppText>
        </TouchableOpacityView>
      </KeyBoardAware>
      <CommonModal
        isVisible={isDelete}
        onBackButtonPress={() => setIsDelete(false)}
        title={'Are you sure you want to delete\nyou account details?'}
        onPressNo={() => setIsDelete(false)}
        onPressYes={() => {
          setIsDelete(false);
          dispatch(deleteBankAccount(userBankData[isDeleteId]?._id));
        }}
      />
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default PaymentOptions;
const styles = StyleSheet.create({
  title: {
    marginTop: universalPaddingTop,
  },
  divider: {
    height: borderWidth,
    backgroundColor: colors.inputBorder,
    marginVertical: 15,
  },
  new: {
    backgroundColor: colors.white_fifteen,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  singleContainer: {
    backgroundColor: colors.white_fifteen,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  singleContainerBody: {
    backgroundColor: colors.white_fifteen,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
    borderTopWidth: 0,
  },

  headerNameContainer: {
    flexDirection: 'row',
  },
  editIcon: {
    height: 12,
    width: 12,
    marginStart: 10,
  },
  default: {
    backgroundColor: colors.red_fifty,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  status: {
    paddingHorizontal: 15,
    borderRadius: 25,
    marginStart: 10,
  },
  arrow: {
    height: 12,
    width: 12,
  },
  singleContainerBodySecond: {
    padding: universalPaddingHorizontal,
  },
  singleItem: {
    marginVertical: 5,
  },
  button: {
    marginVertical: universalPaddingHorizontal,
    backgroundColor: colors.red,
  },
  singleContainerHeader: {
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
});
