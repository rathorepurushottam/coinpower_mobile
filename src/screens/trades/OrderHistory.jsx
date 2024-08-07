import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import moment from 'moment';
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
import {colors} from '../../theme/colors';
import {useSelector} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getPastOrders} from '../../actions/homeActions';
import {Screen} from '../../theme/dimens';
import SpaceBetweenView from '../../common/SpaceBetweenView';
import { twoFixedTwo } from '../../helper/utility';

const OrderHistory = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
    const currencies = route?.params?.data;
    const name = route?.params?.currencyName;

  useEffect(() => {
   dispatch(getPastOrders(currencies));
  }, []);

  const pastOrder = useAppSelector(state => state.home.pastOrders);
  console.log(name, "name");
  return (
    <AppSafeAreaView>
      {/* <Header /> */}
      <Toolbar isLogo={false} isSecond title="Order History" />
      <ScrollView style={{flex:1}}>
        {pastOrder?.length > 0 ? (
          <ScrollView horizontal>
            {/* <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <TouchableOpacity
                style={styles.modalBackground}
                activeOpacity={1}
                onPressOut={() => setModalVisible(false)}>
                <View style={styles.modalContent}>
                  <AppText type={FOURTEEN}>
                    Do you want to break staking?
                  </AppText>
                  <View
                    style={{
                      width: Screen.Width - 50,
                      height: 0.5,
                      backgroundColor: colors.white,
                      marginVertical: 10,
                    }}></View>
                  <View style={{width: Screen.Width - 50}}>
                    <SpaceBetweenView
                      firstText={'Breaking Rewards (From Reward) :'}
                      secondText={'2%'}
                    />

                    <SpaceBetweenView
                      firstText={'Reward Gained :'}
                      secondText={'2%'}
                    />

                    <SpaceBetweenView
                      firstText={'Breaking Deduction :'}
                      secondText={'2%'}
                    />

                    <SpaceBetweenView
                      firstText={'You Will Get'}
                      secondText={'2%'}
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        marginTop: 15,
                      }}>
                      <Button
                        children="Break"
                        titleStyle={{color: 'white'}}
                        containerStyle={{
                          backgroundColor: colors.buttonBg,
                          width: Screen.Width / 2 - 50,
                        }}
                        onPress={() => {}}
                      />
                      <Button
                        titleStyle={{color: 'white'}}
                        children="Cancel"
                        containerStyle={{
                          backgroundColor: '#3b4041a1',
                          width: Screen.Width / 2 - 50,
                        }}
                        onPress={() => {
                          setModalVisible(false);
                        }}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal> */}
            <View style={styles.tableContainer}>
              <View style={[styles.tableHeader, styles.row]}>
                <AppText type={FIFTEEN} style={styles.headerCell}>
                  Date
                </AppText>
                <AppText type={FIFTEEN} style={styles.headerCell}>
                 Trading Pair
                </AppText>
                <AppText type={FIFTEEN} style={styles.headerCell}>
                  Order Type 
                </AppText>
                <AppText type={FIFTEEN} style={styles.headerCell}>
                  All
                </AppText>
                <AppText type={FIFTEEN} style={styles.headerCell}>
                  Executed
                </AppText>
                <AppText type={FIFTEEN} style={styles.headerCell}>
                  Price
                </AppText>
                <AppText type={FIFTEEN} style={styles.headerCell}>
                  Quantity
                </AppText>
                <AppText type={FIFTEEN} style={styles.headerCell}>
                  Total
                </AppText>
                <AppText type={FIFTEEN} style={styles.headerCell}>
                  Status
                </AppText>
              </View>
              {pastOrder?.map((item, index) => {
                return (
                  <View key={index} style={[styles.row]}>
                    <AppText type={TWELVE} style={styles.cell}>
                      {moment(item?.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                    </AppText>
                    <AppText type={TWELVE} style={styles.cell}>
                     {`${name?.firstCoin}/${name?.secondCoin}`}
                    </AppText>
                    <AppText type={TWELVE} style={styles.cell}>
                      {item?.order_type}
                    </AppText>
                    <AppText type={TWELVE} style={[styles.cell, {color: item?.side === 'SELL' ? "red" : "green"}]}>
                      {item?.side}
                    </AppText>
                    <AppText type={TWELVE} style={styles.cell}>
                      {item?.filled}
                    </AppText>
                    <AppText type={TWELVE} style={styles.cell}>
                      {item?.price}
                    </AppText>
                    <AppText type={TWELVE} style={styles.cell}>
                    {twoFixedTwo(item?.quantity)}
                    </AppText>
                    <AppText type={TWELVE} style={styles.cell}>
                      {twoFixedTwo(item?.price * item?.quantity)}
                    </AppText>
                    <AppText type={TWELVE} style={styles.cell}>
                      {item?.status}
                    </AppText>
                  </View>
                );
              })}
            </View>
          </ScrollView>
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
  },

  headerCell: {
    width: 120,
    textAlign: 'center',
    padding: 10,
    color: colors.textGray,
  },
  cell: {
    textAlign: 'center',
    width: 120,
    padding: 10,
    color: colors.white,
  },
});

export default OrderHistory;
