import React from 'react';
import KeyBoardAware from '../../common/KeyboardAware';
import {ListEmptyComponent} from '../home/MarketCoinList';
import { AppSafeAreaView, Toolbar } from '../../common';

const Stacking = () => {
  return (
    <AppSafeAreaView isMargin={false}>
      {/* <Toolbar isSecond title="Staking" /> */}
      <KeyBoardAware>
        <ListEmptyComponent title={'Coming Soon'} />
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default Stacking;
