import { useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { BIG_ZERO } from 'utils/bigNumber'
import { Token } from '@orbitalswap/sdk'
import { getBep20Contract } from 'utils/contractHelpers'
import { ethers } from 'ethers'
import { useSlowRefreshEffect } from 'hooks/useRefreshEffect'

const useLaunchpadAllowance = (spenderAddress: string, currency?: Token, dependency?: any): BigNumber => {
  const { account, library } = useWeb3React()
  const [allowance, setAllowance] = useState(BIG_ZERO)

  useSlowRefreshEffect(() => {
    const fetch = async () => {
      if (!currency) {
        setAllowance(new BigNumber(ethers.constants.MaxUint256.toJSON()))
        return
      }

      if (!account || !library) {
        setAllowance(BIG_ZERO)
        return
      }

      try {
        const tokenContract = getBep20Contract(currency.address, library?.getSigner())
        const res = await tokenContract.allowance(account, spenderAddress)
        setAllowance(new BigNumber(res.toString()))
      } catch (e) {
        console.error(e)
      }
    }

    fetch()
  }, [account, library, spenderAddress, currency, dependency])

  return allowance
}

export default useLaunchpadAllowance
