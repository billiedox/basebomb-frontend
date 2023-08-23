import tokens from './tokens'
import { SerializedFarmConfig } from './types'

const priceHelperLps: SerializedFarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChef LPs (farms.ts).
   * This list is added to the MasterChefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absence of a PID means the masterchef contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchef + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  // {
  //   pid: null,
  //   lpSymbol: 'ANKR-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x3147F98B8f9C53Acdf8F16332eaD12B592a1a4ae',
  //   },
  //   token: tokens.ankr,
  //   quoteToken: tokens.wbnb,
  // },
  {
    pid: null,
    lpSymbol: 'USDibs-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xADB3C33d435cEFd6A43e802cae917D9f9EE15A0b',
    },
    token: tokens.usdibs,
    quoteToken: tokens.busd,
  },
  // {
  //   pid: null,
  //   lpSymbol: 'ETH-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xc9b39b94a09a1F772CD98fB9DBfC66696C921ab9',
  //   },
  //   token: tokens.eth,
  //   quoteToken: tokens.wbnb,
  // },
]

export default priceHelperLps
