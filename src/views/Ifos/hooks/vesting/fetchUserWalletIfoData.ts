import { Ifo, PoolIds } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { multicallv2 } from 'utils/multicall'
import ifoV3Abi from 'config/abi/ifoV3.json'

export interface VestingCharacteristics {
  vestingId: string
  offeringAmountInToken: BigNumber
  vestingReleased: BigNumber
  vestingAmountTotal: BigNumber
  vestingComputeReleasableAmount: BigNumber
  vestingInformationPercentage: number
}

export interface VestingData {
  ifo: Ifo
  userVestingData: {
    [PoolIds.poolBasic]: VestingCharacteristics
    [PoolIds.poolUnlimited]: VestingCharacteristics
  }
}

export const fetchUserWalletIfoData = async (ifo: Ifo, account: string): Promise<VestingData> => {
  const { address } = ifo
  let userVestingData = {
    poolBasic: {
      vestingId: '0',
      offeringAmountInToken: BIG_ZERO,
      vestingReleased: BIG_ZERO,
      vestingAmountTotal: BIG_ZERO,
      vestingComputeReleasableAmount: BIG_ZERO,
      vestingInformationPercentage: 0,
    },
    poolUnlimited: {
      vestingId: '0',
      offeringAmountInToken: BIG_ZERO,
      vestingReleased: BIG_ZERO,
      vestingAmountTotal: BIG_ZERO,
      vestingComputeReleasableAmount: BIG_ZERO,
      vestingInformationPercentage: 0,
    },
  }

  if (account) {
    const [[basicId], [unlimitedId]] = await multicallv2(
      ifoV3Abi,
      [
        { address, name: 'computeVestingScheduleIdForAddressAndPid', params: [account, 0] },
        { address, name: 'computeVestingScheduleIdForAddressAndPid', params: [account, 1] },
      ],
      { requireSuccess: false },
    )

    const ifov3Calls = [
      {
        address,
        name: 'viewUserOfferingAndRefundingAmountsForPools',
        params: [account, [0, 1]],
      },
      {
        address,
        name: 'getVestingSchedule',
        params: [basicId],
      },
      {
        address,
        name: 'getVestingSchedule',
        params: [unlimitedId],
      },
      {
        address,
        name: 'computeReleasableAmount',
        params: [basicId],
      },
      {
        address,
        name: 'computeReleasableAmount',
        params: [unlimitedId],
      },
      {
        address,
        name: 'viewPoolVestingInformation',
        params: [0],
      },
      {
        address,
        name: 'viewPoolVestingInformation',
        params: [1],
      },
    ]

    const [
      amounts,
      basicSchedule,
      unlimitedSchedule,
      basicReleasableAmount,
      unlimitedReleasableAmount,
      basicVestingInformation,
      unlimitedVestingInformation,
    ] = await multicallv2(ifoV3Abi, ifov3Calls, { requireSuccess: false })

    userVestingData = {
      [PoolIds.poolBasic]: {
        ...userVestingData[PoolIds.poolBasic],
        vestingId: basicId ? basicId.toString() : '0',
        offeringAmountInToken: new BigNumber(amounts[0][0][0].toString()),
        vestingReleased: basicSchedule ? new BigNumber(basicSchedule[0].released.toString()) : BIG_ZERO,
        vestingAmountTotal: basicSchedule ? new BigNumber(basicSchedule[0].amountTotal.toString()) : BIG_ZERO,
        vestingComputeReleasableAmount: basicReleasableAmount
          ? new BigNumber(basicReleasableAmount.toString())
          : BIG_ZERO,
        vestingInformationPercentage: basicVestingInformation ? basicVestingInformation[0].toNumber() : 0,
      },
      [PoolIds.poolUnlimited]: {
        ...userVestingData[PoolIds.poolUnlimited],
        vestingId: unlimitedId ? unlimitedId.toString() : '0',
        offeringAmountInToken: new BigNumber(amounts[0][1][0].toString()),
        vestingReleased: unlimitedSchedule ? new BigNumber(unlimitedSchedule[0].released.toString()) : BIG_ZERO,
        vestingAmountTotal: unlimitedSchedule ? new BigNumber(unlimitedSchedule[0].amountTotal.toString()) : BIG_ZERO,
        vestingComputeReleasableAmount: unlimitedReleasableAmount
          ? new BigNumber(unlimitedReleasableAmount.toString())
          : BIG_ZERO,
        vestingInformationPercentage: unlimitedVestingInformation ? unlimitedVestingInformation[0].toNumber() : 0,
      },
    }
  }

  return {
    ifo,
    userVestingData,
  }
}
