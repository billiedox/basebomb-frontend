import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import {
  CampaignType,
  SerializedFarmConfig,
  LotteryStatus,
  LotteryTicket,
  DeserializedPoolConfig,
  SerializedPoolConfig,
  Team,
  TranslatableText,
  DeserializedFarmConfig,
  FetchStatus,
  SerializedLaunchpadConfig,
  DeserializedLaunchpadConfig,
} from 'config/constants/types'
import { Token, ChainId } from '@orbitalswap/sdk'
import { TokenInfo, TokenList, Tags } from '@uniswap/token-lists'
import { parseUnits } from '@ethersproject/units'
import { NftToken, State as NftMarketState } from './nftMarket/types'

/**
 * Token instances created from token info.
 */
export class WrappedTokenInfo extends Token {
  public readonly tokenInfo: TokenInfo

  public readonly tags: TagInfo[]

  constructor(tokenInfo: TokenInfo, tags: TagInfo[]) {
    super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name)
    this.tokenInfo = tokenInfo
    this.tags = tags
  }

  public get logoURI(): string | undefined {
    return this.tokenInfo.logoURI
  }
}

export type TokenAddressMap = Readonly<{
  [chainId in ChainId]: Readonly<{ [tokenAddress: string]: { token: WrappedTokenInfo; list: TokenList } }>
}>

type TagDetails = Tags[keyof Tags]
export interface TagInfo extends TagDetails {
  id: string
}

/**
 * An empty result, useful as a default.
 */
export const EMPTY_LIST: TokenAddressMap = {
  [ChainId.MAINNET]: {},
  [ChainId.TESTNET]: {},
}

export enum GAS_PRICE {
  default = '5',
  fast = '6',
  instant = '7',
  testnet = '10',
}

export const GAS_PRICE_GWEI = {
  default: parseUnits(GAS_PRICE.default, 'gwei').toString(),
  fast: parseUnits(GAS_PRICE.fast, 'gwei').toString(),
  instant: parseUnits(GAS_PRICE.instant, 'gwei').toString(),
  testnet: parseUnits(GAS_PRICE.testnet, 'gwei').toString(),
}

export type DeserializedPoolVault = DeserializedPool & DeserializedCakeVault
export type DeserializedPoolLockedVault = DeserializedPool & DeserializedLockedCakeVault

export interface BigNumberToJson {
  type: 'BigNumber'
  hex: string
}

export type SerializedBigNumber = string

interface SerializedFarmUserData {
  allowance: string
  tokenBalance: string
  stakedBalance: string
  earnings: string
}

export interface DeserializedFarmUserData {
  allowance: BigNumber
  tokenBalance: BigNumber
  stakedBalance: BigNumber
  earnings: BigNumber
}

export interface SerializedFarm extends SerializedFarmConfig {
  tokenPriceBusd?: string
  quoteTokenPriceBusd?: string
  tokenAmountTotal?: SerializedBigNumber
  quoteTokenAmountTotal?: SerializedBigNumber
  lpTotalInQuoteToken?: SerializedBigNumber
  lpTotalSupply?: SerializedBigNumber
  tokenPriceVsQuote?: SerializedBigNumber
  poolWeight?: SerializedBigNumber
  userData?: SerializedFarmUserData
}

export interface DeserializedFarm extends DeserializedFarmConfig {
  tokenPriceBusd?: string
  quoteTokenPriceBusd?: string
  tokenAmountTotal?: BigNumber
  quoteTokenAmountTotal?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  lpTotalSupply?: BigNumber
  tokenPriceVsQuote?: BigNumber
  poolWeight?: BigNumber
  userData?: DeserializedFarmUserData
}

export enum VaultKey {
  CakeVaultV1 = 'cakeVaultV1',
  CakeVault = 'cakeVault',
  CakeFlexibleSideVault = 'cakeFlexibleSideVault',
  IfoPool = 'ifoPool',
}

interface CorePoolProps {
  startBlock?: number
  endBlock?: number
  apr?: number
  rawApr?: number
  stakingTokenPrice?: number
  earningTokenPrice?: number
  vaultKey?: VaultKey
}

export interface DeserializedPool extends DeserializedPoolConfig, CorePoolProps {
  totalStaked?: BigNumber
  stakingLimit?: BigNumber
  stakingLimitEndBlock?: number
  profileRequirement?: {
    required: boolean
    thresholdPoints: BigNumber
  }
  userDataLoaded?: boolean
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}

export interface SerializedPool extends SerializedPoolConfig, CorePoolProps {
  totalStaked?: SerializedBigNumber
  stakingLimit?: SerializedBigNumber
  numberBlocksForUserLimit?: number
  profileRequirement?: {
    required: boolean
    thresholdPoints: SerializedBigNumber
  }
  userData?: {
    allowance: SerializedBigNumber
    stakingTokenBalance: SerializedBigNumber
    stakedBalance: SerializedBigNumber
    pendingReward: SerializedBigNumber
  }
}

export interface Profile {
  userId: number
  points: number
  teamId: number
  collectionAddress: string
  tokenId: number
  isActive: boolean
  username: string
  nft?: NftToken
  team?: Team
  hasRegistered: boolean
}

interface SerializedLaunchpadUserData {
  allowance: string
  tokenBalance: string
  contributedAmount: string
  earnings: string
  withdrawableAmount: string
  claimedAmount: string
  whitelisted: boolean
}

export interface DeserializedLaunchpadUserData {
  allowance: BigNumber
  tokenBalance: BigNumber
  contributedAmount: BigNumber
  earnings: BigNumber
  withdrawableAmount: BigNumber
  claimedAmount: BigNumber
  whitelisted: boolean
}

export interface SerializedLaunchpad extends SerializedLaunchpadConfig {
  // liquidityPercent?: number
  softcap?: SerializedBigNumber
  hardcap?: SerializedBigNumber
  presalePrice?: SerializedBigNumber
  minPerTx?: SerializedBigNumber
  maxPerUser?: SerializedBigNumber
  totalSold?: SerializedBigNumber
  totalRaised?: SerializedBigNumber
  fundersCounter?: number
  presaleStatus?: number
  startDate?: number
  endDate?: number
  // liquidityLockupTime?: number

  userData?: SerializedLaunchpadUserData
}

export interface DeserializedLaunchpad extends DeserializedLaunchpadConfig {
  // liquidityPercent?: number
  softcap?: BigNumber
  hardcap?: BigNumber
  presalePrice?: BigNumber
  minPerTx?: BigNumber
  maxPerUser?: BigNumber
  totalSold?: BigNumber
  totalRaised?: BigNumber
  fundersCounter?: number
  presaleStatus?: number
  startDate?: number
  endDate?: number
  // liquidityLockupTime?: number

  userData?: DeserializedLaunchpadUserData
}

// Slices states

export interface SerializedFarmsState {
  data: SerializedFarm[]
  loadArchivedFarmsData: boolean
  userDataLoaded: boolean
  loadingKeys: Record<string, boolean>
  poolLength?: number
  regularCakePerBlock?: number
}

export interface DeserializedFarmsState {
  data: DeserializedFarm[]
  loadArchivedFarmsData: boolean
  userDataLoaded: boolean
  poolLength?: number
  regularCakePerBlock?: number
}

export interface SerializedLaunchpadsState {
  data: SerializedLaunchpad[]
  userDataLoaded: boolean
}

export interface DeserializedLaunchpadsState {
  data: DeserializedLaunchpad[]
  userDataLoaded: boolean
}

export interface SerializedVaultFees {
  performanceFee: number
  withdrawalFee: number
  withdrawalFeePeriod: number
}

export interface DeserializedVaultFees extends SerializedVaultFees {
  performanceFeeAsDecimal: number
}

export interface SerializedVaultUser {
  isLoading: boolean
  userShares: SerializedBigNumber
  cakeAtLastUserAction: SerializedBigNumber
  lastDepositedTime: string
  lastUserActionTime: string
}

export interface SerializedLockedVaultUser extends SerializedVaultUser {
  lockStartTime: string
  lockEndTime: string
  userBoostedShare: SerializedBigNumber
  locked: boolean
  lockedAmount: SerializedBigNumber
  currentPerformanceFee: SerializedBigNumber
  currentOverdueFee: SerializedBigNumber
}

export interface DeserializedVaultUser {
  isLoading: boolean
  userShares: BigNumber
  cakeAtLastUserAction: BigNumber
  lastDepositedTime: string
  lastUserActionTime: string
  balance: {
    cakeAsNumberBalance: number
    cakeAsBigNumber: BigNumber
    cakeAsDisplayBalance: string
  }
}

export interface DeserializedLockedVaultUser extends DeserializedVaultUser {
  lastDepositedTime: string
  lastUserActionTime: string
  lockStartTime: string
  lockEndTime: string
  userBoostedShare: BigNumber
  locked: boolean
  lockedAmount: BigNumber
  currentPerformanceFee: BigNumber
  currentOverdueFee: BigNumber
}

export interface DeserializedCakeVault {
  totalShares?: BigNumber
  totalLockedAmount?: BigNumber
  pricePerFullShare?: BigNumber
  totalCakeInVault?: BigNumber
  fees?: DeserializedVaultFees
  userData?: DeserializedVaultUser
}

export interface DeserializedLockedCakeVault extends Omit<DeserializedCakeVault, 'userData'> {
  totalLockedAmount?: BigNumber
  userData?: DeserializedLockedVaultUser
}

export interface SerializedLockedCakeVault extends Omit<SerializedCakeVault, 'userData'> {
  totalLockedAmount?: SerializedBigNumber
  userData?: SerializedLockedVaultUser
}

export interface SerializedCakeVault {
  totalShares?: SerializedBigNumber
  pricePerFullShare?: SerializedBigNumber
  totalCakeInVault?: SerializedBigNumber
  fees?: SerializedVaultFees
  userData?: SerializedVaultUser
}

// Ifo
export interface IfoState extends PublicIfoData {
  credit: string
}

export interface PublicIfoData {
  ceiling: string
}

export interface PoolsState {
  data: SerializedPool[]
  ifo: IfoState
  cakeVault: SerializedLockedCakeVault
  cakeFlexibleSideVault: SerializedCakeVault
  userDataLoaded: boolean
}

export type TeamsById = {
  [key: string]: Team
}

export type LaunchpadsById = {
  [key: string]: SerializedLaunchpad
}

export interface Achievement {
  id: string
  type: CampaignType
  address: string
  title: TranslatableText
  description?: TranslatableText
  badge: string
  points: number
}

// Predictions

export enum BetPosition {
  BULL = 'Bull',
  BEAR = 'Bear',
  HOUSE = 'House',
}

export enum PredictionStatus {
  INITIAL = 'initial',
  LIVE = 'live',
  PAUSED = 'paused',
  ERROR = 'error',
}

export enum PredictionSupportedSymbol {
  BNB = 'BNB',
  CAKE = 'CAKE',
}

export enum PredictionsChartView {
  TradingView = 'TradingView',
  Chainlink = 'Chainlink Oracle',
}

export interface Round {
  id: string
  epoch: number
  position: BetPosition
  failed: boolean
  startAt: number
  startBlock: number
  startHash: string
  lockAt: number
  lockBlock: number
  lockHash: string
  lockPrice: number
  lockRoundId: string
  closeAt: number
  closeBlock: number
  closeHash: string
  closePrice: number
  closeRoundId: string
  totalBets: number
  totalAmount: number
  bullBets: number
  bullAmount: number
  bearBets: number
  bearAmount: number
  bets?: Bet[]
}

export interface Market {
  paused: boolean
  epoch: number
}

export interface Bet {
  id?: string
  hash?: string
  amount: number
  position: BetPosition
  claimed: boolean
  claimedAt: number
  claimedBlock: number
  claimedHash: string
  claimedBNB: number
  claimedNetBNB: number
  createdAt: number
  updatedAt: number
  user?: PredictionUser
  round?: Round
}

export interface PredictionUser {
  id: string
  createdAt: number
  updatedAt: number
  block: number
  totalBets: number
  totalBetsBull: number
  totalBetsBear: number
  totalBNB: number
  totalBNBBull: number
  totalBNBBear: number
  totalBetsClaimed: number
  totalBNBClaimed: number
  winRate: number
  averageBNB: number
  netBNB: number
  bets?: Bet[]
}

export enum HistoryFilter {
  ALL = 'all',
  COLLECTED = 'collected',
  UNCOLLECTED = 'uncollected',
}

export interface LedgerData {
  [key: string]: {
    [key: string]: ReduxNodeLedger
  }
}

export interface RoundData {
  [key: string]: ReduxNodeRound
}

export interface ReduxNodeLedger {
  position: BetPosition
  amount: BigNumberToJson
  claimed: boolean
}

export interface NodeLedger {
  position: BetPosition
  amount: EthersBigNumber
  claimed: boolean
}

export interface ReduxNodeRound {
  epoch: number
  startTimestamp: number | null
  lockTimestamp: number | null
  closeTimestamp: number | null
  lockPrice: BigNumberToJson | null
  closePrice: BigNumberToJson | null
  totalAmount: BigNumberToJson
  bullAmount: BigNumberToJson
  bearAmount: BigNumberToJson
  rewardBaseCalAmount: BigNumberToJson
  rewardAmount: BigNumberToJson
  oracleCalled: boolean
  lockOracleId: string
  closeOracleId: string
}

export interface NodeRound {
  epoch: number
  startTimestamp: number | null
  lockTimestamp: number | null
  closeTimestamp: number | null
  lockPrice: EthersBigNumber | null
  closePrice: EthersBigNumber | null
  totalAmount: EthersBigNumber
  bullAmount: EthersBigNumber
  bearAmount: EthersBigNumber
  rewardBaseCalAmount: EthersBigNumber
  rewardAmount: EthersBigNumber
  oracleCalled: boolean
  closeOracleId: string
  lockOracleId: string
}

export type LeaderboardFilterTimePeriod = '1d' | '7d' | '1m' | 'all'

export interface LeaderboardFilter {
  address?: string
  orderBy?: string
  timePeriod?: LeaderboardFilterTimePeriod
}

export interface PredictionsState {
  status: PredictionStatus
  isLoading: boolean
  isHistoryPaneOpen: boolean
  chartView: PredictionsChartView
  isChartPaneOpen: boolean
  isFetchingHistory: boolean
  historyFilter: HistoryFilter
  currentEpoch: number
  intervalSeconds: number
  minBetAmount: string
  bufferSeconds: number
  history: Bet[]
  totalHistory: number
  currentHistoryPage: number
  hasHistoryLoaded: boolean
  rounds?: RoundData
  ledgers?: LedgerData
  claimableStatuses: {
    [key: string]: boolean
  }
  leaderboard: {
    selectedAddress: string
    loadingState: FetchStatus
    filters: LeaderboardFilter
    skip: number
    hasMoreResults: boolean
    addressResults: {
      [key: string]: PredictionUser
    }
    results: PredictionUser[]
  }
}

// Voting

/* eslint-disable camelcase */
/**
 * @see https://hub.snapshot.page/graphql
 */
export interface VoteWhere {
  id?: string
  id_in?: string[]
  voter?: string
  voter_in?: string[]
  proposal?: string
  proposal_in?: string[]
}

export enum SnapshotCommand {
  PROPOSAL = 'proposal',
  VOTE = 'vote',
}

export enum ProposalType {
  ALL = 'all',
  CORE = 'core',
  COMMUNITY = 'community',
}

export enum ProposalState {
  ACTIVE = 'active',
  PENDING = 'pending',
  CLOSED = 'closed',
}

export interface Space {
  id: string
  name: string
}

export interface Proposal {
  author: string
  body: string
  choices: string[]
  end: number
  id: string
  snapshot: string
  space: Space
  votes: number
  start: number
  state: ProposalState
  title: string
}

export interface Vote {
  id: string
  voter: string
  created: number
  space: Space
  proposal: {
    choices: Proposal['choices']
  }
  choice: number
  metadata?: {
    votingPower: string
  }
}

export interface LotteryRoundUserTickets {
  isLoading?: boolean
  tickets?: LotteryTicket[]
}

interface LotteryRoundGenerics {
  isLoading?: boolean
  lotteryId: string
  status: LotteryStatus
  startTime: string
  endTime: string
  treasuryFee: string
  firstTicketId: string
  lastTicketId: string
  finalNumber: number
}

export interface LotteryRound extends LotteryRoundGenerics {
  userTickets?: LotteryRoundUserTickets
  priceTicketInOrb: BigNumber
  discountDivisor: BigNumber
  amountCollectedInOrb: BigNumber
  orbPerBracket: string[]
  countWinnersPerBracket: string[]
  rewardsBreakdown: string[]
}

export interface LotteryResponse extends LotteryRoundGenerics {
  priceTicketInOrb: SerializedBigNumber
  discountDivisor: SerializedBigNumber
  amountCollectedInOrb: SerializedBigNumber
  orbPerBracket: SerializedBigNumber[]
  countWinnersPerBracket: SerializedBigNumber[]
  rewardsBreakdown: SerializedBigNumber[]
}

export interface LotteryState {
  currentLotteryId: string
  maxNumberTicketsPerBuyOrClaim: string
  isTransitioning: boolean
  currentRound: LotteryResponse & { userTickets?: LotteryRoundUserTickets }
  lotteriesData?: LotteryRoundGraphEntity[]
  userLotteryData?: LotteryUserGraphEntity
}

export interface LotteryRoundGraphEntity {
  id: string
  totalUsers: string
  totalTickets: string
  winningTickets: string
  status: LotteryStatus
  finalNumber: string
  startTime: string
  endTime: string
  ticketPrice: SerializedBigNumber
}

export interface LotteryUserGraphEntity {
  account: string
  totalOrb: string
  totalTickets: string
  rounds: UserRound[]
}

export interface UserRound {
  claimed: boolean
  lotteryId: string
  status: LotteryStatus
  endTime: string
  totalTickets: string
  tickets?: LotteryTicket[]
}

export interface PredictionConfig {
  address: string
  api: string
  chainlinkOracleAddress: string
  minPriceUsdDisplayed: EthersBigNumber
  token: Token
}

// Global state

export interface State {
  farms: SerializedFarmsState
  farmsV1: SerializedFarmsState
  pools: PoolsState
  launchpads: SerializedLaunchpadsState
  predictions: PredictionsState
  lottery: LotteryState
  nftMarket: NftMarketState
}
