import React, { useEffect } from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  RED,
  SEMI_BOLD,
  Toolbar,
} from '../../common';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  kyc_completed,
  kyc_due,
  kyc_pending,
  kyc_rejected,
} from '../../helper/ImageAssets';
import KeyBoardAware from '../../common/KeyboardAware';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
} from '../../theme/dimens';
import {colors} from '../../theme/colors';
import {commonStyles} from '../../theme/commonStyles';
import NavigationService from '../../navigation/NavigationService';
import {KYC_STEP_ONE_SCREEN, SEARCH_SCREEN, TRADE_SCREEN, NAVIGATION_BOTTOM_TAB_STACK, NAVIGATION_TRADE_STACK} from '../../navigation/routes';
import {useAppSelector} from '../../store/hooks';
import { useDispatch } from 'react-redux';
import { getUserProfile } from '../../actions/accountActions';
import { useNavigation } from '@react-navigation/native';

const KycPending = () => {
  return (
    <View>
      <FastImage
        source={kyc_pending}
        resizeMode="contain"
        style={styles.icon}
      />
      <AppText weight={SEMI_BOLD} style={styles.title2}>
        Your coinpower Exchange Account KYC approval is pending. Please wait for the
        approval.
      </AppText>
      <Button
        children="Start Trading"
        disabled
        containerStyle={styles.button}
      />
    </View>
  );
};

const KycRejected = () => {
  const dispatch = useDispatch();
  const userData = useAppSelector(state => state.auth.userData);
  useEffect(() => {
    dispatch(getUserProfile()); 
  },[]);
  const {kyc_reject_reason} = userData ?? '';
  return (
    <View>
      <FastImage
        source={kyc_rejected}
        resizeMode="contain"
        style={styles.icon}
      />
      <AppText
        weight={SEMI_BOLD}
        style={[styles.title, {color: colors.text_one}]}>
        Your coinpower Exchange Account KYC is rejected. Please complete your KYC again.
      </AppText>
      <View style={styles.reasonContainer}>
        <AppText style={commonStyles.centerText} color={RED}>
          Reason:{kyc_reject_reason}
        </AppText>
      </View>
      <Button
        children="Verify Again"
        onPress={() => NavigationService.navigate(KYC_STEP_ONE_SCREEN)}
        containerStyle={styles.button}
      />
    </View>
  );
};
const KycDue = () => {
  return (
    <View>
      <FastImage source={kyc_due} resizeMode="contain" style={styles.icon} />
      <AppText
        weight={SEMI_BOLD}
        style={[styles.title, {color: colors.text_two}]}>
        Your coinpower Exchange Account KYC is Due. Please complete your KYC.
      </AppText>
      <Button
        children="Complete Your KYC"
        onPress={() => NavigationService.navigate(KYC_STEP_ONE_SCREEN)}
        containerStyle={styles.button}
      />
    </View>
  );
};
const KycCompleted = () => {
  const navigation = useNavigation();
  return (
    <View>
      <FastImage
        source={kyc_completed}
        resizeMode="contain"
        style={styles.icon}
      />
      <AppText weight={SEMI_BOLD} style={[styles.title, {color: colors.green}]}>
        Your coinpower Exchange Account KYC is Completed.
      </AppText>

      <Button
        children="Start Trading"
        onPress={() =>
          navigation.navigate(NAVIGATION_BOTTOM_TAB_STACK, {
             screen: NAVIGATION_TRADE_STACK,
             params: {
               screen:TRADE_SCREEN,
             },
           })}
        containerStyle={styles.button}
      />
    </View>
  );
};

const KycStatus = () => {
  const userData = useAppSelector(state => state.auth.userData);
  const {kycVerified} = userData ?? '';

  const kycStatus = () => {
    if (kycVerified === 0) {
      return <KycDue />;
    } else if (kycVerified === 1) {
      return <KycPending />;
    } else if (kycVerified === 2) {
      return <KycCompleted />;
    } else if (kycVerified === 3) {
      return <KycRejected />;
    }
  };
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={'KYC'} />
      <KeyBoardAware>{kycStatus()}</KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default KycStatus;
const styles = StyleSheet.create({
  icon: {
    height: 200,
    width: 250,
    alignSelf: 'center',
    marginTop: 50,
  },
  title: {
    textAlign: 'center',
    marginHorizontal: universalPaddingHorizontalHigh,
  },
  title2: {
    textAlign: 'center',
    marginHorizontal: universalPaddingHorizontalHigh,
    marginTop: 20,
    color: colors.text_three,
  },
  button: {
    marginTop: 60,
  },
  reasonContainer: {
    backgroundColor: colors.redBg,
    borderWidth: borderWidth,
    borderColor: colors.red,
    padding: universalPaddingHorizontal,
    borderRadius: 10,
    marginTop: 10,
  },
});
