/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {colors} from '../../theme/colors';
import {
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
} from '../../theme/dimens';
import HomeCoinTabs from './HomeCoinTabs';
import MarketTabs from './MarketTabs';
import {AppText, SECOND} from '../../common';
import MarketCoinList from './MarketCoinList';
import FastImage from 'react-native-fast-image';
import {upDownIc} from '../../helper/ImageAssets';
import {commonStyles} from '../../theme/commonStyles';
import {useAppSelector} from '../../store/hooks';
import {checkValue} from '../../helper/utility';


const CoinList = () => {
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [activeTab, setActiveTab] = useState('ALL');
  const [activeTabList, setActiveTabList] = useState(0);
  return (
    <View style={[styles.container,{marginBottom:50}]}>
      <HomeCoinTabs activeTab={activeTabList} setActiveTab={setActiveTabList} />
      <View style={styles.marketTabContainer}>
        <MarketTabs
          activeTab={activeTab}
          activeTabList={activeTabList}
          changeActiveTab={(value: string) => setActiveTab(value)}
        />
      </View>
      <View style={styles.heading}>
        <View style={styles.containerSecond}>
          <AppText color={SECOND} style={styles.text}>
            {checkValue(languages?.symbol)}
          </AppText>
        </View>
        <View style={styles.containerThird}>
          <AppText color={SECOND} style={styles.text}>
            {checkValue(languages?.last_price)}
          </AppText>
        </View>
        <View style={styles.containerThird}>
          <View style={commonStyles.rowCenter}>
            <AppText color={SECOND} style={styles.text}>
              {checkValue(languages?.change)}
            </AppText>
            <FastImage
              source={upDownIc}
              resizeMode="contain"
              style={styles.upDownIc}
            />
          </View>
        </View>
      </View>
      <View style={styles.marketCoinContainer}>
        <MarketCoinList activeTab={activeTab} activeTabList={activeTabList} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    // marginRight: 10,
    marginBottom: 10,
  },
  text: {},
  container: {
    marginVertical: 10,
    backgroundColor: colors.white_fifteen,
    paddingHorizontal: universalPaddingHorizontalHigh,
    paddingVertical: universalPaddingHorizontal,
  },
  marketTabContainer: {marginVertical: 10},
  marketCoinContainer: {
    // marginBottom: 90,
  },
  upDownIc: {
    height: 15,
    width: 15,
  },
  containerSecond: {flex: 1, flexDirection: 'row'},
  containerThird: {flex: 1, alignItems: 'flex-end'},
});
export default CoinList;
