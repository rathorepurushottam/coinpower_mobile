import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import CoinCard from './CoinCard';
import Carousel from 'react-native-reanimated-carousel';
import {useAppSelector} from '../../store/hooks';
import {CoinCardProps} from '../../helper/types';
const width = Dimensions.get('window').width;

const baseOptions = {
  width: width / 2,
};

const CoinSlider = () => {

  const hotCoins = useAppSelector(state => state.home.hotCoins);
  const renderItem = ({item, index}: CoinCardProps) => {
    return <CoinCard item={item} index={index} />;
  };
  return (
    <Carousel
      {...baseOptions}
      data={hotCoins}
      style={styles.container}
      renderItem={renderItem}
      autoPlay={true}
      pagingEnabled={true}
      autoPlayInterval={1000}
    />
  );
};

export default CoinSlider;
const styles = StyleSheet.create({
  container: {width: '100%', height: 100, marginTop: 12},
});
