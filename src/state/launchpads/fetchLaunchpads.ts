import BigNumber from 'bignumber.js'
import { SerializedLaunchpadConfig } from 'config/constants/types'
import { getBalanceAmount } from 'utils/formatBalance'
import { SerializedLaunchpad } from '../types'
import { fetchLaunchpadPublicData } from './fetchLaunchpadPublicData'

const fetchLaunchpads = async (launchpadsToFetch: SerializedLaunchpadConfig[]): Promise<SerializedLaunchpad[]> => {
  const launchpadResult = await fetchLaunchpadPublicData(launchpadsToFetch)

  return launchpadsToFetch.map((launchpad, index) => {
    const [startDate, endDate, hardcap, softcap, presalePrice, minPerTx, maxPerUser, 
      // liquidityPercent,
       totalSold, totalRaised, status, fundersCounter
      //  , liquidityLockupTime
      ] =
      launchpadResult[index]

    const startDateNum = parseInt(startDate, 10)
    const endDateNum = parseInt(endDate, 10)
    // const liquidityLockupTimeNum = parseInt(liquidityLockupTime, 10)

    return {
      ...launchpad,
      softcap: getBalanceAmount(new BigNumber(softcap), launchpad.currency ? launchpad.currency.decimals : 18).toJSON(),
      hardcap: getBalanceAmount(new BigNumber(hardcap), launchpad.currency ? launchpad.currency.decimals : 18).toJSON(),
      presalePrice: getBalanceAmount(
        new BigNumber(presalePrice),
        launchpad.token ? launchpad.token.decimals : 18,
      ).toJSON(),
      minPerTx: getBalanceAmount(
        new BigNumber(minPerTx),
        launchpad.currency ? launchpad.currency.decimals : 18,
      ).toJSON(),
      maxPerUser: getBalanceAmount(
        new BigNumber(maxPerUser),
        launchpad.currency ? launchpad.currency.decimals : 18,
      ).toJSON(),
      // liquidityPercent: new BigNumber(liquidityPercent).toNumber(),
      fundersCounter: new BigNumber(fundersCounter).toNumber(),
      totalSold: getBalanceAmount(new BigNumber(totalSold), launchpad.token.decimals).toJSON(),
      totalRaised: getBalanceAmount(
        new BigNumber(totalRaised),
        launchpad.currency ? launchpad.currency.decimals : 18,
      ).toJSON(),
      presaleStatus: new BigNumber(status).toNumber(),
      startDate: startDateNum,
      endDate: endDateNum,
      // liquidityLockupTime: liquidityLockupTimeNum,
    }
  })
}

export default fetchLaunchpads
