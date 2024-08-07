import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {
  AppText,
  BOLD,
  Button,
  CommonModal,
  SECOND,
  SEMI_BOLD,
  TEN,
  THIRTEEN,
  TWENTY,
  THIRD,
  WHITE,
  YELLOW,
  FIFTEEN,
  FOURTEEN,
  AppSafeAreaView,
  TWELVE,
  Toolbar,
} from '../../common';
import CountDownTimer from '../../common/CountDownTimer';
import KeyBoardAware from '../../common/KeyboardAware';
import {colors} from '../../theme/colors';
import {Screen, universalPaddingHorizontal} from '../../theme/dimens';
import FastImage from 'react-native-fast-image';
import {launchpad, launchpad_Icon, swapCoin} from '../../helper/ImageAssets';
import NavigationService from '../../navigation/NavigationService';
import {COMMIT_DETAIL} from '../../navigation/routes';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import {useAppSelector} from '../../store/hooks';
import {
  getSingleProject,
  projectTotalCommit,
  userCommitUpdateProject,
} from '../../actions/homeActions';
import ModalCommit from '../home/ModalCommit';
import {HOME_BG} from '../../helper/ImageAssets';
import {useRoute} from '@react-navigation/native';
import { twoFixedTwo, checkValidAmount } from '../../helper/utility';
import { showError } from '../../helper/logger';

const ProjectCommit = () => {
  const route = useRoute();
  const detail = route?.params?.commitDetail;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [commitAmount, setCommitAmount] = useState(0);
  const singleProjectDetails = useAppSelector(state => {
    return state.home.singleProject;
  });
  const userProjectTotalCommit = useAppSelector(state => {
    return state.home.userProjectTotalCommit;
  });
  const userProjectUpdateCommit = useAppSelector(state => {
    return state.home.userProjectUpdateCommit;
  });
  useEffect(() => {
    dispatch(getSingleProject(detail?._id));
    dispatch(projectTotalCommit(detail?._id));
  }, []);

  const handleUpdateCommit = () => {
    // console.log(/^\d+(\.\d{1,4})?$/.test(commitAmount), "refgex");
    if(checkValidAmount(commitAmount)) {
      let data = {
        committedQuantity: commitAmount,
      };
      setOpen(false);
      setCommitAmount('');
      dispatch(userCommitUpdateProject(data, detail?._id));
    }else{
      showError("Please Enter Valid Amount");
    }
  
  };
  return (
    <AppSafeAreaView isLogo>
      <Toolbar isCommit={true}/>
      <KeyBoardAware>
        <View style={{marginBottom: 150}}>
          <View style={styles.swapContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                paddingHorizontal: 10,
              }}>
              <FastImage
                source={swapCoin}
                resizeMode="contain"
                style={styles.eventIcon}
              />
              <View>
                <AppText type={TWENTY}>
                  {singleProjectDetails?.projectName}
                </AppText>
                <View
                  style={{
                    backgroundColor: 'green',
                    alignItems: 'center',
                    margin: 5,
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <AppText type={THIRTEEN}>
                    {singleProjectDetails?.status}
                  </AppText>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'column',
                margin: 15,
                // alignItems: "center"
              }}>
              <View style={styles.commonColumn}>
                <AppText type={FIFTEEN} color={SECOND} style={{marginTop: 5}}>
                  Total Prize Pool
                </AppText>
                <AppText type={FIFTEEN} color={SECOND} style={{marginTop: 5}}>
                  Total Commited
                </AppText>
                {/* <AppText type={FIFTEEN} color={SECOND} style={{marginTop: 5}}>
              Token Price
            </AppText> */}
              </View>
              <View style={styles.commonColumn}>
                <AppText type={FIFTEEN} weight={BOLD} style={{marginTop: 5}}>
                  {singleProjectDetails?.totalSupply} SND
                </AppText>
                <AppText type={FIFTEEN} weight={BOLD} style={{marginTop: 5}}>
                  {singleProjectDetails?.totalCommitted} coinpower
                </AppText>
                {/* <AppText type={FIFTEEN} weight={BOLD} style={{marginTop: 5}}>
              {data?.tokenPrice}
            </AppText> */}
              </View>
            </View>
            <AppText type={FIFTEEN} color={SECOND}>
              Commitment stage starts in
            </AppText>
            <CountDownTimer
              startDate={detail?.startDate}
              endDate={detail?.endDate}
            />
          </View>
          <View
            style={[
              styles.swapContainer,
              {backgroundColor: colors.white_fifteen},
            ]}>
            <View>
              <AppText type={TWENTY} weight={BOLD}>
                coinpower Commitment Details
              </AppText>
            </View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                backgroundColor: 'grey',
                margin: 5,
                marginLeft: 150,
                borderRadius: 20,
                padding: 5,
                width: 120,
              }}
              onPress={() => NavigationService.navigate(COMMIT_DETAIL, {detail: detail})}
              >
              <AppText type={THIRTEEN}>Reward History</AppText>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                margin: 15,
                justifyContent: 'space-between',
              }}>
              <View style={styles.detailRow}>
                <AppText type={FIFTEEN} color={SECOND} style={{marginTop: 7}}>
                  My Actual Reward
                </AppText>
                <AppText type={FIFTEEN} color={SECOND} style={{marginTop: 7}}>
                  My Estimated Reward
                </AppText>
                <AppText type={FIFTEEN} color={SECOND} style={{marginTop: 7}}>
                  My Commited Quantity
                </AppText>
                <AppText type={FIFTEEN} color={SECOND} style={{marginTop: 7}}>
                  My Valid Quantity
                </AppText>
              </View>
              <View style={styles.detailRow}>
                <AppText type={FIFTEEN} weight={BOLD} style={{marginTop: 5}}>
                  {userProjectUpdateCommit
                    ? userProjectTotalCommit?.actualRewards
                    : userProjectUpdateCommit?.updatedCommit
                        ?.actualRewards}{' '}
                  SND
                </AppText>
                <AppText type={FIFTEEN} weight={BOLD} style={{marginTop: 5}}>
                  {userProjectUpdateCommit
                    ? twoFixedTwo(userProjectTotalCommit?.estimatedRewards)
                    :  twoFixedTwo(userProjectUpdateCommit?.updatedCommit
                      ?.estimatedRewards)}{' '}
                  SND
                </AppText>
                <AppText type={FIFTEEN} weight={BOLD} style={{marginTop: 5}}>
                  {userProjectUpdateCommit
                    ? userProjectTotalCommit?.totalCommittedQuantity
                    : userProjectUpdateCommit?.updatedCommit
                        ?.committedQuantity}{' '}
                  coinpower
                </AppText>
                <AppText type={FIFTEEN} weight={BOLD} style={{marginTop: 5}}>
                  {userProjectUpdateCommit
                    ? userProjectTotalCommit?.validQuantity
                    : userProjectUpdateCommit?.updatedCommit
                        ?.validQuantity}{' '}
                  coinpower
                </AppText>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderColor: 'white',
                borderRadius: 20,
                borderWidth: 1,
                borderStyle: 'dashed',
                marginVertical: 10,
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}>
              <AppText type={THIRTEEN} color={SECOND} weight={BOLD}>
                My Maximum Commitable
              </AppText>
              <AppText type={FIFTEEN} weight={BOLD}>
                {!userProjectUpdateCommit
                  ?twoFixedTwo(userProjectTotalCommit?.wallet?.balance)
                  : twoFixedTwo(userProjectUpdateCommit?.walletData?.balance)}
              </AppText>
            </View>
            <Button
              //   isSecond
              children={'Update coinpower'}
              onPress={() => setOpen(true)}
              style={{
                backgroundColor: colors.buttonBg,
                borderRadius: 30,
                paddingVertical: 6,
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
          <View style={styles.swapContainer}>
            <AppText type={FIFTEEN} weight={BOLD} style={{alignSelf: 'center'}}>
              coinpower Tier Mechanism
            </AppText>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5}}>
              <View>
                <View style={{marginBottom: 10}}>
                  <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                    Commited
                  </AppText>
                  <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                    Quantity
                  </AppText>
                </View>
                <AppText style={{marginVertical: 5}}>{`1000 < x < 3,000`}</AppText>
                <AppText style={{marginVertical: 5}}>{`3000 < x < 5000`}</AppText>
                <AppText style={{marginVertical: 5}}>{`5000 < x < 10,000`}</AppText>
                <AppText style={{marginVertical: 5}}>{`10,000 < x < 320,000`}</AppText>
                <AppText style={{marginVertical: 5}}>{`20,000 < x < 50,000`}</AppText>
                <AppText style={{marginVertical: 5}}>{`50,000 < x < 100,000`}</AppText>
                <AppText style={{marginVertical: 5}}>{`100,000 < x <  500,000`}</AppText>
              </View>
              <View style={{alignItems: "center"}}>
                <View style={{marginBottom: 10}}>
                  <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                    Commitment
                  </AppText>
                  <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                    Coefficien
                  </AppText>
                </View>
                <AppText style={{marginVertical: 5}}>{`1`}</AppText>
                <AppText style={{marginVertical: 5}}>{`1.05`}</AppText>
                <AppText style={{marginVertical: 5}}>{`1.1`}</AppText>
                <AppText style={{marginVertical: 5}}>{`1.15`}</AppText>
                <AppText style={{marginVertical: 5}}>{`1.2`}</AppText>
                <AppText style={{marginVertical: 5}}>{`1.25`}</AppText>
                <AppText style={{marginVertical: 5}}>{`1.3`}</AppText>
              </View>
            </View>
          </View>
          <ModalCommit
            type={'update'}
            commitExists={open}
            commitAmount={commitAmount}
            setCommitAmount={setCommitAmount}
            onPress={handleUpdateCommit}
            setCommitExists={setOpen}
          />
        </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};
export {ProjectCommit};
const styles = StyleSheet.create({
  topContainer: {
    borderRadius: 18,
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    marginTop: 30,
  },
  inerContainer: {
    backgroundColor: colors.inputBackground,
    paddingHorizontal: universalPaddingHorizontal,
    paddingVertical: 10,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  swapStyle: {
    height: 30,
    width: 30,
  },
  inContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  launchContainer: {
    paddingHorizontal: 10,
    paddingVertical: 1,
    backgroundColor: colors.white_fifteen,
    borderRadius: 5,
    marginLeft: 0,
  },
  launchIcon: {
    height: 24,
    width: 24,
  },
  detailsCotainer: {
    paddingHorizontal: universalPaddingHorizontal,
    paddingVertical: 10,
  },
  commonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  commonColumn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailRow: {
    flexDirection: 'column',
    // justifyContent: "space-between",
  },
  swapContainer: {
    paddingHorizontal: universalPaddingHorizontal,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    width: Screen.Width / 1.17,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  bigSwapIcon: {
    height: 94,
    width: 94,
  },
  eventIcon: {
    height: 64,
    width: 64,
  },
  button: {
    width: '100%',
    marginTop: 25,
  },
  layerSwapCoin: {
    height: 104,
    width: 104,
    borderRadius: 50,
    borderColor: colors.inputBorder,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight:
  },
  tabBarMain: {
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  tabBarActive: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: 100,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.buttonBg,
  },
  tabBarInActive: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: 100,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowContent: {
    flexDirection: 'row',
    flex: 1,
    // justifyContent: 'space-evenly',
    // justifyContent:'space-between'
  },

  header: {
    flex: 1,
    fontWeight: 'bold',
    // paddingHorizontal: 5,
  },
  cell: {
    textAlign: 'center',
    // flex: 1,
    backgroundColor: 'green',
    // width:100,
    marginHorizontal: 5,
    fontWeight: 'bold',
  },
  tableHeader: {
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  imgBg: {
    width: Screen.Width,
    height: Screen.Height,
  },
});
