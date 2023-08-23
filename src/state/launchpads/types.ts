import BigNumber from 'bignumber.js'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'

import { SerializedLaunchpadConfig } from 'config/constants/types'
// PoolCharacteristics retrieved from the contract
export interface PublicLaunchpadData extends SerializedLaunchpadConfig {
  isLoading: boolean
  startDateNum: number
  endDateNum: number
  hardcap: number
  softcap: number
  presalePrice: number
  minPerTx: number
  maxPerUser: number
  totalSold: number
}

export interface UserLaunchpadData {
  contributedAmount: BigNumber
  withdrawableAmount: BigNumber
  claimedAmount: BigNumber
}
