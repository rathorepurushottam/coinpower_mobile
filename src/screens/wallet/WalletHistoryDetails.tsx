import React from 'react';
import {
  AppSafeAreaView,
  AppText,
  NORMAL,
  SECOND,
  SEMI_BOLD,
  TEN,
  Toolbar,
} from '../../common';
import {useAppSelector} from '../../store/hooks';
import KeyBoardAware from '../../common/KeyboardAware';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingTop,
} from '../../theme/dimens';
import {
  dateFormatter,
  depositWithdrawColor,
  statusColor,
  toFixedThree,
  twoFixedTwo,
} from '../../helper/utility';

const WalletHistoryDetails = () => {
  const selectedWalletHistory = useAppSelector(
    state => state.wallet.selectedWalletHistory,
  );
  const {
    currency,
    chain,
    short_name,
    transaction_number,
    amount,
    transaction_type,
    description,
    fee,
    status,
    createdAt,
    currency_id,
    from_address,
    to_address,
  } = selectedWalletHistory ?? '';

  const data = [
    {
      id: '1',
      title: 'Status',
      value: status,
    },
    {
      id: '2',
      title: 'Amount',
      value: twoFixedTwo(amount),
    },
    {
      id: '3',
      title: 'Date & Time',
      value: dateFormatter(createdAt),
    },
    {
      id: '4',
      title: 'Currency',
      value: currency,
    },
    {
      id: '5',
      title: 'Currency ID',
      value: currency_id,
    },
    {
      id: '6',
      title: 'Transaction Fee',
      value: toFixedThree(fee),
    },
    {
      id: '7',
      title: 'Chain',
      value: chain,
    },
    {
      id: '8',
      title: 'From Address',
      value: from_address,
    },
    {
      id: '9',
      title: 'To Address',
      value: to_address,
    },
    {
      id: '10',
      title: 'Transaction No.',
      value: transaction_number,
    },
    {
      id: '11',
      title: 'Short Name',
      value: short_name,
    },
    {
      id: '12',
      title: 'Transaction Type',
      value: transaction_type,
    },
    {
      id: '13',
      title: 'Remarks',
      value: description,
    },
  ];

  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={''} />
      <KeyBoardAware>
        <View style={styles.container}>
          {data.map(e => {
            return e.value ? (
              <View style={styles.itemContainer} key={e.id}>
                <AppText type={TEN} style={{flex: 0.5}} color={SECOND}>
                  {e.title}
                </AppText>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <AppText
                    numberOfLines={2}
                    // ellipsizeMode="middle"
                    weight={e.id === '1' ? SEMI_BOLD : NORMAL}
                    color={depositWithdrawColor(e.value)}
                    style={[
                      e.id === '1' && {
                        backgroundColor: statusColor(e.value),
                        paddingHorizontal: 10,
                        paddingVertical: 2,
                        borderRadius: 30,
                      },
                    ]}>
                    {e.value}
                  </AppText>
                </View>
              </View>
            ) : (
              <></>
            );
          })}
        </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default WalletHistoryDetails;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    marginTop: universalPaddingTop,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  statusContainer: {
    borderRadius: 5,
    height: 25,
  },
});
