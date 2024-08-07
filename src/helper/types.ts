import * as socketIoClient from 'socket.io-client';

export interface HomeSliceProps {
  bannerList: BannerListProps[];
  hotCoins: CoinDataProps[];
  newListedCoins: CoinDataProps[];
  coinPairs: CoinDataProps[];
  currency: string;
  coinData: CoinDataProps[];
  favorites: CoinDataProps[];
  notificationList: NotificationProps[];
  referCode?: number;
  referCount: number;
  socketLoading: boolean;
  favoriteArray: string[];
  openOrders: any[];
  pastOrders: any[];
  fiveDaySymbolData: HistoricDataProps[];
  oneMonthSymbolData: HistoricDataProps[];
  ThreeMonthSymbolData: HistoricDataProps[];
  oneYearSymbolData: HistoricDataProps[];
  fiveYearSymbolData: HistoricDataProps[];
  socket?: socketIoClient.Socket<any>;
  feeDetails?: any;
  buyOrders?: OrdersProps[];
  sellOrders?: OrdersProps[];
  orderData?: any;
  random?: any;
  twoFaQrData?: any;
  conversionHistory?: any[];
  conversion?: any;
  coinList?: any;
  qbsHistory?: [];
  stakingHome?: any;
  lakedHistory?:any;
  stakingHistory?:[];
  p2p?:any;
  userEligibility: any;
  allProjectsList: any;
  checkCommitExistense: any;
  userCommitProject: any;
  pastAllProjects: any;
  userCommits: any;
  singleProject: any;
  userProjectTotalCommit: any;
  userProjectUpdateCommit: any;
  commitDetails: any;
  activityLogs: any;
  referralList: any;
}

export interface WalletSliceProps {
  walletBalance: number | string;
  userWallet: WalletProps[];
  walletAddress: string;
  adminBankDetails?: AdminBankDetailsProps;
  walletHistory: WalletHistoryProps[];
  tradeHistory: TradeHistoryProps[];
  selectedWalletHistory?: WalletHistoryProps;
  selectedTradeHistory?: TradeHistoryProps;
  transactionHistory: WalletHistoryProps[];
  depositHistory: any,
  withdrawHistory: any
  coinDetails: any,
}

export interface SendOtpRegistrationProps {
  email_or_phone: string;
  resend: boolean;
  type?: string | boolean;
}

export interface RegistrationProps {
  cid: number;
  email_or_phone: string;
  password: string;
  confirm_password: string;
  verification_code: string;
  referal: string;
}

export interface LoginProps {
  email_or_phone: string;
  password: string;
}
export interface ForgotPasswordProps {
  email_or_phone: string;
  new_password: string;
  verification_code: string;
}

export interface ChangePasswordProps {
  confirm_password: string;
  current_password: string;
  email_or_phone: string;
  new_password: string;
  verification_code: string;
}

export interface CurrencyPreferenceProps {
  currency: string;
}

export interface CoinDataProps {
  __v: number;
  _id: string;
  available: string;
  base_currency: string;
  base_currency_id: string;
  buy_price: number;
  change: number;
  createdAt: string;
  high: number;
  icon_path: string;
  low: number;
  open: number;
  quote_currency: string;
  quote_currency_id: string;
  sell_price: number;
  status: string;
  type: string;
  updatedAt: string;
  volume: number;
}
export interface CoinCardProps {
  item: CoinDataProps;
  index: number;
  currency?:any;
}

export interface BannerListProps {
  __v: number;
  _id: string;
  bannerPath?: string;
  bannerType?: string;
  createdAt: string;
  sequrence?: string;
  status: string;
  updatedAt: string;
  banner_path?: string;
  banner_sequence?: string;
  banner_type?: string;
}
export interface qbsHistoryProps {
  __v: number;
  _id: string;
  from:string;
  // bannerPath?: string;
  // bannerType?: string;
  // createdAt: string;
  // sequrence?: string;
  // status: string;
  // updatedAt: string;
  // banner_path?: string;
  // banner_sequence?: string;
  // banner_type?: string;
}

export interface WalletProps {
  _id: string;
  balance: number;
  chain: string[];
  currency: string;
  currency_id: string;
  icon_path: string;
  locked_balance: number;
  short_name: string;
  user_id: string;
}
export interface AdminBankDetailsProps {
  _id: string;
  account_number: number;
  __v: number;
  bank_name: string;
  branch: string;
  createdAt: string;
  holder_name: string;
  ifsc: string;
  updatedAt: string;
  id: string;
}
export interface WalletHistoryProps {
  _id: string;
  user_id: string;
  currency: string;
  currency_id: string;
  chain: string;
  short_name: string;
  deposit_slip: string;
  transaction_number: number;
  description: string;
  amount: number;
  transaction_type: string;
  fee: number;
  status: string;
  from_address: string;
  to_address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface TradeHistoryProps {
  _id: string;
  user_id: string;
  order_id: string;
  currency: string;
  currency_id: string;
  quantity: number;
  price: number;
  amount: number;
  side: string;
  transaction_type: string;
  order_type: string;
  fee_type: string;
  fee: number;
  tds: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GenerateAddressProps {
  currency_id: string;
  chain: string;
}

export interface WithdrawCurrencyProps {
  otp: string;
  address: string;
  amount: string;
  email_or_phone: string;
  chain: string;
}

export interface WithdrawInrProps {
  amount: string;
}

export interface AlertsProps {
  type: boolean;
}

export interface RatingProps {
  rating: number;
  message?: string;
}

export interface NotificationProps {
  __v: number;
  _id: string;
  createdAt: string;
  message: string;
  subject: string;
  updatedAt: string;
}

export interface AddToFavoriteProps {
  pair_id: string;
}

export interface OpenOrdersProps {
  base_currency: string;
  quote_currency: string;
}

export interface PastOrdersProps {
  base_currency_id: string;
  quote_currency_id: string;
}

export interface CancelOrderProps {
  order_id: string;
}

export interface PlaceOrderProps {
  base_currency_id: string;
  order_type: string;
  price: string;
  quantity: string;
  quote_currency_id: string;
  side: string;
}

export interface HistoricDataProps {
  _id: string;
  base_currency_id: string;
  quote_currency_id: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  time: number;
}

export interface GetFeeDetailProps {
  currency_id: string;
}

export interface DeleteAccountProps {
  status: string;
}

export interface DownloadTradeReportProps {
  range: string;
}
export interface OrdersProps {
  _id: string;
  user_id: string;
  order_type: string;
  base_currency_id: string;
  quote_currency_id: string;
  ask_currency: string;
  side: string;
  price: number;
  quantity: number;
  filled: number;
  remaining: number;
  maker_fee: number;
  taker_fee: number;
  status: string;
  transaction_fee: number;
  tds: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
