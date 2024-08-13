import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet,ScrollView, TouchableOpacity } from 'react-native';
import {
  AppSafeAreaView,
  AppText,
  Button,
  FIFTEEN,
  FOURTEEN,
  Header,
  THIRTEEN,
  TWELVE,
  Toolbar,
} from '../../common';
import { getReferralList } from '../../actions/homeActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { colors } from '../../theme/colors';
import { twoFixedTwo, dateFormatter } from '../../helper/utility';
import KeyBoardAware from '../../common/KeyboardAware';
import { useRoute } from '@react-navigation/native';
import {Screen} from '../../theme/dimens';

const ReferralList = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  const userData = useAppSelector(state => state.auth.userData);
  const referralList = useAppSelector(state => state.home.referralList);
  const coinData = useAppSelector(state => state.home.coinPairs);
  const [level, setLevel] = useState(1);
  const [userId, setUserId] = useState(userData?._id);
  useEffect(() => {
    let data = {
      level: level,
      userId: userId
    }
    fetchReferralList(data);
  }, [level, userId]);

  const fetchReferralList = (data) => {
    setIsLoading(true);
    dispatch(getReferralList(data)) 
      .then(response => {
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error fetching Referral List:', error);
      });
  };

  const handleReferralLevel = (item) => {
    setLevel(level + 1);
    setUserId(item?.userId);
  };

 

  // const handleStartReached = ({ nativeEvent }) => {
  //   const offsetY = nativeEvent.contentOffset.y;
  //   const isStartReached = offsetY <= 0;

  //   if (!isLoading && isStartReached && skip > 0) {
  //     setSkip(skip - limit);
  //   }
  // };

  // const handleScroll = ({ nativeEvent }) => {
  //   const offsetY = nativeEvent.contentOffset.y;
  //   const contentHeight = nativeEvent.contentSize.height;
  //   const height = nativeEvent.layoutMeasurement.height;
  //   const isEndReached = offsetY >= contentHeight - height;

  //   if (!isLoading && isEndReached) {
  //     setSkip(skip + limit);
  //   }
  // };


  console.log(referralList, "userData");

  return (
    <AppSafeAreaView>
      <Toolbar isLogo={false} title='Referral List' isSecond  />
      <ScrollView style={{flex:1}}>
        {referralList?.length > 0 ? (
          <View>
            <View style={styles.tableContainer}>
              <View style={[styles.tableHeader, styles.row]}>
                <AppText type={FIFTEEN} style={styles.headerCell}>
                 Level
                </AppText>
                <AppText type={FIFTEEN} style={styles.headerCell}>
                user Id
                </AppText>
                
              </View>
              {referralList?.map((item, index) => {
                return (
                  <TouchableOpacity key={index} style={[styles.row]} onPress={() => handleReferralLevel(item)}>
                    <AppText type={TWELVE} style={styles.cell}>
                      {level}
                    </AppText>
                    <AppText type={TWELVE} style={styles.cell}>
                    {item?.userId}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <AppText style={{}}>Nothing to show.</AppText>
          </View>
        )}
      </ScrollView>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#191f208f',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: Screen.Width - 50,
  },
  button: {
    backgroundColor: colors.buttonBg,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  tableContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  tableHeader: {
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "space-between"
    // backgroundColor: "red"
    
  },

  headerCell: {
    width: 140,
    textAlign: 'center',
    padding: 8,
    color: colors.textGray,
  },
  cell: {
    textAlign: 'center',
    width: 160,
    // padding: 8,
    color: colors.white,
  },
});

export default ReferralList;
