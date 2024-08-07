import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {useDispatch} from 'react-redux';
import { appOperation } from '../../appOperation';
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
} from '../../common';
import CountDownTimer from '../../common/CountDownTimer';
import KeyBoardAware from '../../common/KeyboardAware';
import {colors} from '../../theme/colors';
import {Screen, universalPaddingHorizontal} from '../../theme/dimens';
import FastImage from 'react-native-fast-image';
import {launchpad, launchpad_Icon, swapCoin} from '../../helper/ImageAssets';
import NavigationService from '../../navigation/NavigationService';
import {TRADE_SCREEN, SWAPNEXBCOIN_SCREEN, PROJECT_COMMIT, COMMIT_DETAIL} from '../../navigation/routes';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  getUserEligibility,
  getAllProjects,
  checkCommitExistense,
  userCommitProject,
  getPastAllProjects,
  getUserCommits,
} from '../../actions/homeActions';
import ModalCommit from '../home/ModalCommit';
import { checkValidAmount } from '../../helper/utility';
import { showError } from '../../helper/logger';
import { BASE_URL } from '../../helper/Constants';

export const RenderTabBarAuth = props => {
  const routes = [
    {key: 'first', title: 'Ongoing Event'},
    {key: 'Second', title: 'Past Event'},
    {key: 'third', title: 'Reward History'},
  ];
  return (
    <View style={styles.tabBarMain}>
      {routes.map((route, i) => {
        return (
          <TouchableOpacityView
            key={i}
            onPress={() => props?.setIndex(i)}
            style={
              i === props?.index ? styles.tabBarActive : styles.tabBarInActive
            }>
            <AppText
              type={FOURTEEN}
              weight={SEMI_BOLD}
              color={i === props?.index ? YELLOW : WHITE}>
              {route.title}
            </AppText>
          </TouchableOpacityView>
        );
      })}
    </View>
  );
};

const Launchpad = ({onSelectedKey, onSelectedSlide}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserEligibility());
    dispatch(getAllProjects({status: 2}));
    dispatch(getPastAllProjects({status: 1}));
    dispatch(getUserCommits());
  }, []);
  const userEligibility = useAppSelector(state => {
    return state.home.userEligibility;
  });
  const allProjectsList = useAppSelector(state => {
    return state.home.allProjectsList;
  });

  // const checkCommitUser = useAppSelector(state => {
  //   return state.home.checkCommitExistense;
  // });

  const pastAllProjects = useAppSelector(state => {
    return state.home.pastAllProjects;
  });
  const userCommits = useAppSelector(state => {
    return state.home.userCommits;
  });

  const [index, setIndex] = useState(0);
  const [commitExists, setCommitExists] = useState(false);
  const [commitAmount, setCommitAmount] = useState(0);
  const [commitItem, setCommitItem] = useState('');
  const [checkCommitUser, setCheckCommitUser] = useState('');
  const minHolding = 1000;
  const holdingDuration = 30;

  const checkCommit = item => {
    if (!(userEligibility?.balance >= minHolding && userEligibility?.holding_duration >= holdingDuration)) {
      showError("You are not eligible to participate")
      return
  };
  checkCommitExistensee(item?._id, item);
    setCommitItem(item);
   
  };

  const checkCommitExistensee = async (id, item)  => {
    try {
      const response = await appOperation.customer.check_commit_existense(id);
      console.log(response, '===checkCommitExistense');
      if (response?.success) {
        if(response?.exists) {
          setCheckCommitUser(response);
          NavigationService.navigate(PROJECT_COMMIT,{commitDetail: item})
          // dispatch(setCheckCommitExistense(response));
        }else {
          setCommitExists(true);
        }
       
      }
    } catch (e) {
      logger(e);
    } finally {
    }
  };

  const handleCommit = () => {
    if(checkValidAmount(commitAmount)) {
     let data = {
      committedQuantity: commitAmount,
      projectId: commitItem?._id,
      projectName: commitItem?.projectName,
      projectSymbol: commitItem?.projectSymbol,
    };
    dispatch(userCommitProject(data));
    setCommitAmount('');
    setCommitExists(false);
    }else{
      showError("Please Enter Valid Amount");
    }
  };


  function parseISODate(dateString) {
    const parts = dateString.split('T');
    const datePart = parts[0];
    const timePart = parts[1] ? parts[1].split('.')[0] : '00:00:00';
    const [year, month, day] = datePart.split('-');
    const [hours, minutes, seconds] = timePart.split(':');
    return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  // console.log(allProjectsList, "allProjectsList");

  const renderItem = ({item}) => {
    const now = new Date();
    const start = parseISODate(item?.startDate);
    const end = parseISODate(item?.endDate);
    const isLive = (now < end);
    console.log(item, "proijects s")
    return (
      <View style={[styles.swapContainer]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingHorizontal: 10,
          }}>
          <FastImage
            source={{uri: `${BASE_URL}/${item?.token_image_path}`}}
            resizeMode="contain"
            style={styles.eventIcon}
          />
          <View>
            <AppText type={TWENTY}>{item?.projectName} {`(${item?.projectSymbol})`}</AppText>
            <View
              style={{
                backgroundColor: index === 0 ? "orange" : "green" ,
                alignItems: 'center',
                margin: 5,
                borderRadius: 20,
                padding: 5,
              }}>
              <AppText type={THIRTEEN}>{index === 0 ? "Ongoing" : "Completed"}</AppText>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 15,
          }}>
          <View style={styles.commonColumn}>
            <AppText type={FIFTEEN} color={SECOND} style={{marginTop: 5}}>
              Total Prize Pool
            </AppText>
            <AppText type={FIFTEEN} color={SECOND} style={{marginTop: 5}}>
              Total Commited
            </AppText>
            <AppText type={FIFTEEN} color={SECOND} style={{marginTop: 5}}>
              Token Price
            </AppText>
          </View>
          <View style={styles.commonColumn}>
            <AppText type={FIFTEEN} weight={BOLD} style={{marginTop: 5}}>
              {item?.totalSupply} {item?.projectSymbol}
            </AppText>
            <AppText type={FIFTEEN} weight={BOLD} style={{marginTop: 5}}>
              {item?.totalCommitted} coinpower
            </AppText>
            <AppText type={FIFTEEN} weight={BOLD} style={{marginTop: 5}}>
              {item?.tokenPrice} coinpower
            </AppText>
          </View>
        </View>
        <AppText type={FIFTEEN} color={SECOND}>
          Commitment stage starts in
        </AppText>
        {/* <View
        style={{
          borderColor: 'white',
          borderRadius: 20,
          borderWidth: 1,
          borderStyle: 'dashed',
          marginVertical: 10,
          paddingVertical: 10
        }}>
        <View
          style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <AppText type={TWENTY} weight={BOLD}>
            0
          </AppText>
          <AppText type={TWENTY} weight={BOLD}>
            0
          </AppText>
          <AppText type={TWENTY} weight={BOLD}>
            0
          </AppText>
          <AppText type={TWENTY} weight={BOLD}>
            0
          </AppText>
        </View>
        <View
          style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <AppText type={TWENTY} weight={BOLD} color={SECOND}>
            Days
          </AppText>
          <AppText type={TWENTY} weight={BOLD} color={SECOND}>
            Hrs
          </AppText>
          <AppText type={TWENTY} weight={BOLD} color={SECOND}>
            min.
          </AppText>
          <AppText type={TWENTY} weight={BOLD} color={SECOND}>
            sec.
          </AppText>
        </View>
      </View> */}
         {index === 0 ? <CountDownTimer startDate={item?.startDate} endDate={item?.endDate} /> : ""}
        <Button
          //   isSecond
          children={index === 1 ? 'View Commit' : 'Commit coinpower'}
          onPress={() => (index === 1 ? NavigationService.navigate(COMMIT_DETAIL, {detail: item}) : checkCommit(item))}
          // disabled={now>end}
          style={{
            backgroundColor: colors.buttonBg,
            borderRadius: 30,
            paddingVertical: 8,
            marginTop: index === 1 ? 15 : 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
    );
  };
  return (
    <KeyBoardAware>
      <View style={{marginBottom: 150}}>
        <View style={styles.topContainer}>
          <View style={styles.inerContainer}>
            <View style={styles.inContainer}>
              <View style={styles.launchContainer}>
                <AppText type={TWENTY} weight={SEMI_BOLD} color={YELLOW}>
                  Launchpad
                </AppText>
              </View>
            </View>
            <FastImage
              source={launchpad}
              resizeMode="contain"
              style={styles.launchIcon}
            />
          </View>
          <View style={styles.detailsCotainer}>
            <View style={styles.commonRow}>
              <AppText type={THIRTEEN} color={SECOND}>
                coinpower Holder Privileges - Join and share New Tokens
              </AppText>
            </View>
            <View style={{alignItems: 'stretch', marginHorizontal: 50}}>
              <View style={styles.commonRow}>
                <AppText color={SECOND}>Event APY</AppText>
                <AppText color={SECOND}>Total Projects</AppText>
              </View>
              <View style={styles.commonRow}>
                <AppText weight={BOLD}>3.99%</AppText>
                <AppText weight={BOLD}>{allProjectsList?.length}</AppText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.swapContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View>
              <AppText type={THIRTEEN} weight={SEMI_BOLD}>
                Hold coinpower to enjoy massive {'\n'}free new token airdrops
              </AppText>

              <View style={{marginTop: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 15,
                      borderWidth: 2,
                      borderColor:"black",
                      backgroundColor: userEligibility?.balance >= 1000 ? colors.buttonBg : "white",
                    }}></View>
                  <AppText
                    color={THIRD}
                    style={{marginLeft: 10}}>{`Holding > 1000 coinpower`}</AppText>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 15,
                      backgroundColor: userEligibility?.holding_duration >= 30 ? colors.buttonBg : "white",
                      borderWidth: 2,
                      borderColor:"black",
                    }}></View>
                  <AppText
                    color={THIRD}
                    style={{
                      marginLeft: 10,
                    }}>{`Holding duration > 30 days`}</AppText>
                </View>
              </View>
            </View>
            <View style={styles.layerSwapCoin}>
              <FastImage
                source={launchpad_Icon}
                resizeMode="contain"
                style={styles.bigSwapIcon}
              />
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: colors.inputBorder,
              borderRadius: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <AppText color={THIRD} type={TEN} weight={SEMI_BOLD}>
              Total Valid Quantity Today
            </AppText>
            <AppText color={SECOND} type={FIFTEEN} weight={BOLD}>
              {' '}
              <AppText type={FIFTEEN} weight={BOLD}>
                {userEligibility?.balance?.toFixed(2)}
              </AppText>{' '}
              coinpower
            </AppText>
          </View>
          <Button
            //   isSecond
            children={'Buy coinpower'}
            onPress={() => {
              onSelectedKey('Spot'), onSelectedSlide(0);
            }}
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

        <RenderTabBarAuth index={index} setIndex={setIndex} />
        {index === 0 ? (
          allProjectsList?.length > 0 ? (
            <FlatList
              horizontal={true}
              data={allProjectsList}
              renderItem={renderItem}
            />
          ) : (
            <View style={{alignItems: 'center', marginVertical: 50}}>
              <AppText type={FIFTEEN}>New Project will Live</AppText>
            </View>
          )
        ) : index === 1 ? (
          pastAllProjects?.length > 0 ? (
            <FlatList
              horizontal={true}
              data={pastAllProjects}
              renderItem={renderItem}
            />
          ) : (
            <View style={{alignItems: 'center', marginVertical: 50}}>
              <AppText type={FIFTEEN}>There are no Past Events</AppText>
            </View>
          )
        ) : index === 2 ? (
          userCommits?.length > 0 ? (
            <>
              <ScrollView horizontal>
                <View style={{flex: 1}}>
                  <View style={{
                    flex:1,
                     borderBottomWidth: 1,
                     borderColor: '#000',
                     flexDirection:"row",
                     alignItems:"center"
                  }}>
                    <AppText type={THIRTEEN} style={[styles.header,{width:45,textAlign:"center"}]}>S.NO.</AppText>
                    <AppText type={THIRTEEN} style={[styles.header,{width:80,textAlign:"center"}]}>Date</AppText>
                    <AppText type={THIRTEEN} style={[styles.header,{width:120,textAlign:"center"}]}>Project Name</AppText>
                    <AppText  type={THIRTEEN} style={[styles.header,{width:100,textAlign:'center'}]}>Commited Currency</AppText>
                    <AppText type={THIRTEEN} style={[styles.header,{width:100,textAlign:'center'}]}>Commited Quantity</AppText>
                    <AppText type={THIRTEEN} style={[styles.header,{width:100,textAlign:'center'}]}>Estimated Reward</AppText>
                    <AppText type={THIRTEEN} style={[styles.header,{width:100,textAlign:'center'}]} >Valid Quantity</AppText>
                  </View>
                  {userCommits?.map((item, index) => {
                    // {console.log();}
                    return (
                      <View key={index} style={[styles.rowContent,]}>
                        <AppText type={THIRTEEN} style={[{width:45,textAlign:"center",
                      marginVertical:5}]}>
                          {index + 1}
                        </AppText>
                        <AppText type={THIRTEEN} style={[{width:80,textAlign:"center",
                      marginVertical:5}]}>
                          {moment(item?.createdAt).format('DD/MM/YYYY')}
                        </AppText>
                        <AppText type={THIRTEEN} style={[{width:120,textAlign:"center",
                      marginVertical:5}]}>
                          {item?.projectName}
                        </AppText>
                        <AppText type={THIRTEEN} style={[{width:100,textAlign:"center",
                      marginVertical:5}]}>
                          {item?.commitCurrency}
                        </AppText>
                        <AppText type={THIRTEEN} style={[{width:100,textAlign:"center",
                      marginVertical:5}]}>
                          {item?.committedQuantity}
                        </AppText>
                        <AppText type={THIRTEEN} style={[{width:100,textAlign:"center",
                      marginVertical:5}]}>
                          {item?.estimatedRewards}
                        </AppText>
                        <AppText type={THIRTEEN} style={[{width:100,textAlign:"center",
                      marginVertical:5}]}>
                          {item?.validQuantity}
                        </AppText>
                        {/* <AppText type={TWELVE} style={styles.cell}>
                          {item?.projectName}
                        </AppText>
                        <AppText type={TWELVE} style={styles.cell}>
                          {item?.commitCurrency}
                        </AppText>
                        <AppText type={TWELVE} style={styles.cell}>
                          {item?.committedQuantity}
                        </AppText>
                        <AppText type={TWELVE} style={styles.cell}>
                          {item?.estimatedRewards}
                        </AppText>
                        <AppText type={TWELVE} style={styles.cell}>
                          {item?.validQuantity}
                        </AppText> */}
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </>
          ) : (
            <View style={{alignItems: 'center', marginVertical: 50}}>
              <AppText type={FIFTEEN}>There are no Rewards</AppText>
            </View>
          )
        ) : (
          ''
        )}
      </View>
      <ModalCommit
        commitExists={commitExists}
        commitAmount={commitAmount}
        setCommitAmount={setCommitAmount}
        onPress={handleCommit}
        setCommitExists={setCommitExists}
      />
    </KeyBoardAware>
  );
};
export {Launchpad};
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
    flexDirection: 'column',
    // justifyContent:
    // alignItems: "center",
    // marginBottom: 10,
  },
  swapContainer: {
    paddingHorizontal: universalPaddingHorizontal,
    paddingVertical: 10,
    backgroundColor: colors.white_fifteen,
    borderRadius: 10,
    borderColor: colors.inputBorder,
    // flexDirection: "row",
    // justifyContent: "space-around",
    // alignItems: "center",
    borderWidth: 1,
    width: Screen.Width / 1.17,
    // alignSelf: "center",
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
    flex:1,
    borderBottomWidth: 1,
    borderBottomColor: colors.buttonBg,
  },
  tabBarInActive: {
    alignItems: 'center',
    justifyContent: 'center',
    // width: 100,
    flex:1,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowContent: {
    flexDirection: 'row',
    flex:1,
    // justifyContent: 'space-evenly',
    // justifyContent:'space-between'
  },

  header: {
    flex: 1,
    fontWeight: 'bold',
    // paddingHorizontal: 5,
  },
  cell: {
    textAlign:"center",
    // flex: 1,
    backgroundColor:'green',
      // width:100,
      marginHorizontal:5,
      fontWeight: 'bold',

  },
  tableHeader: {
    borderBottomWidth: 1,
    borderColor: '#000',
  },
});
