import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';
import {CoinDataProps, HomeSliceProps} from '../helper/types';
import {getDaysAgoData} from '../helper/utility';

export const initialState: HomeSliceProps = {
  bannerList: [],
  hotCoins: [],
  newListedCoins: [],
  coinPairs: [],
  currency: '',
  coinData: [],
  favorites: [],
  notificationList: [],
  referCode: undefined,
  referCount: 0,
  socketLoading: true,
  favoriteArray: [],
  openOrders: [],
  pastOrders: [],
  fiveDaySymbolData: [],
  oneMonthSymbolData: [],
  ThreeMonthSymbolData: [],
  oneYearSymbolData: [],
  fiveYearSymbolData: [],
  socket: undefined,
  feeDetails: undefined,
  buyOrders: [],
  sellOrders: [],
  orderData: undefined,
  random: 1,
  twoFaQrData: undefined,
  conversionHistory: [],
  conversion: '',
  coinList: [],
  qbsHistory:[],
  lakedHistory:[],
  stakingHistory:[],
  userEligibility: [],
  allProjectsList: [],
  checkCommitExistense: [],
  userCommitProject: [],
  pastAllProjects: [],
  userCommits: [],
  singleProject: [],
  userProjectTotalCommit: [],
  userProjectUpdateCommit: [],
  commitDetails: [],
  activityLogs: [],
  referralList: [],
};
export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setBannerList: (state, {payload}) => {
      state.bannerList = payload;
    },
    setCoinData: (state, {payload}) => {
      state.hotCoins = payload?.hot?.filter((e: CoinDataProps) => {
        return e.quote_currency;
      });
      state.newListedCoins = payload?.new_listed?.filter((e: CoinDataProps) => {
        return e.quote_currency;
      });
      state.coinPairs = payload?.pairs?.filter((e: CoinDataProps) => {
        return e.quote_currency;
      });
      let temp = [].concat(
        state?.hotCoins,
        state?.newListedCoins,
        state?.coinPairs,
      );
      let temp2 = _.uniqWith(temp, _.isEqual);
      let temp3 = temp2.filter((e: CoinDataProps) => {
        return e;
      });
      state.coinData = temp3;
    },
    setFavorites: (state, {payload}) => {
      state.favorites = payload;
    },
    setNotificationList: (state, {payload}) => {
      state.notificationList = payload;
    },
    setReferCode: (state, {payload}) => {
      state.referCode = payload;
    },
    setReferCount: (state, {payload}) => {
      state.referCount = payload;
    },
    setSocketLoading: (state, {payload}) => {
      state.socketLoading = payload;
    },
    setFavoriteArray: (state, {payload}) => {
      state.favoriteArray = payload;
    },
    setOpenOrders: (state, {payload}) => {
      state.openOrders = payload;
    },
    setPastOrders: (state, {payload}) => {
      state.pastOrders = payload;
    },
    onCancelOrder: (state, {payload}) => {
      let openOrders = state.openOrders;
      const index = openOrders.findIndex(e => {
        return e._id === payload;
      });

      openOrders.splice(index, 1);
    },
    setHistoricData: (state, {payload}) => {
      state.openOrders = payload;
      state.fiveDaySymbolData = getDaysAgoData(payload, 5);
      state.oneMonthSymbolData = getDaysAgoData(payload, 30);
      state.ThreeMonthSymbolData = getDaysAgoData(payload, 90);
      state.oneYearSymbolData = getDaysAgoData(payload, 365);
      state.fiveYearSymbolData = getDaysAgoData(payload, 9999);
    },
    setSocket: (state, {payload}) => {
      state.socket = payload;
    },
    setFeeDetails: (state, {payload}) => {
      state.feeDetails = payload;
    },
    setBuyOrders: (state, {payload}) => {
      state.buyOrders = payload;
    },
    setSellOrders: (state, {payload}) => {
      state.sellOrders = payload;
    },
    setOrderData: (state, {payload}) => {
      state.orderData = payload;
    },
    setRandom: (state, {payload}) => {
      state.random = payload;
    },
    setTwoFaData: (state, {payload}) => {
      state.twoFaQrData = payload;
    },
    setConversionHistory: (state, {payload}) => {
      state.conversionHistory = payload;
    },
    setConversion: (state, {payload}) => {
      state.conversion = payload;
    },
    setCoinList: (state, {payload}) => {
      state.coinList = payload;
    },
    setCurrency: (state, {payload}) => {
      state.currency = payload;
    },
    setQbsHistory: (state, {payload}) => {
      state.qbsHistory = payload;
    },
    setStaking: (state, {payload}) => {
      state.stakingHome = payload;
    },
    setLakedStaking: (state, {payload}) => {
      state.lakedHistory = payload;
    },
    setStakingHistory: (state, {payload}) => {
      state.stakingHistory = payload;
    },
    setP2P: (state, {payload}) => {
      state.p2p = payload;
    },
    setUserEligibility: (state, {payload}) => {
      state.userEligibility = payload;
    },
    setAllProjectList: (state, {payload}) => {
      state.allProjectsList = payload;
    },
    setCheckCommitExistense: (state, {payload}) => {
      state.checkCommitExistense = payload;
    },
    setUserCommitProject: (state, {payload}) => {
      state.userCommitProject = payload;
    },
    setPastAllProjects: (state, {payload}) => {
      state.pastAllProjects = payload;
    },
    setUserCommits: (state, {payload}) => {
      state.userCommits = payload;
    },
    setSingleProject: (state, {payload}) => {
      state.singleProject = payload;
    },
    setUserProjectTotalCommit: (state, {payload}) => {
      state.userProjectTotalCommit = payload;
    },
    setUserProjectUpdateCommit: (state, {payload}) => {
      state.userProjectUpdateCommit = payload;
    },
    setCommitDetails: (state, {payload}) => {
      state.commitDetails = payload;
    },
    setActivityLogs: (state, {payload}) => {
      state.activityLogs = payload;
    },
    setReferralList: (state, {payload}) => {
      state.referralList = payload;
    }
  },
});
export const {
  setBannerList,
  setCoinData,
  setFavorites,
  setNotificationList,
  setReferCode,
  setReferCount,
  setSocketLoading,
  setFavoriteArray,
  setOpenOrders,
  setPastOrders,
  onCancelOrder,
  setHistoricData,
  setSocket,
  setFeeDetails,
  setBuyOrders,
  setSellOrders,
  setOrderData,
  setRandom,
  setTwoFaData,
  setConversionHistory,
  setConversion,
  setCoinList,
  setCurrency,
  setQbsHistory,
  setStaking,
  setLakedStaking,
  setStakingHistory,
  setP2P,
  setUserEligibility,
  setAllProjectList,
  setCheckCommitExistense,
  setUserCommitProject,
  setPastAllProjects,
  setUserCommits,
  setSingleProject,
  setUserProjectTotalCommit,
  setUserProjectUpdateCommit,
  setCommitDetails,
  setActivityLogs,
  setReferralList
} = homeSlice.actions;
export const homeReducer = homeSlice.reducer;
