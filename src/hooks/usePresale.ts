/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import useActiveWeb3React from './useActiveWeb3React'
import { useTokenSaleContract } from './useContract'
import { useCallWithGasPrice } from './useCallWithGasPrice'

export interface PresaleConfig {
  startTime: BigNumber
  endTime: BigNumber
  listing_price: BigNumber
  max_contribution: BigNumber
  min_contribution: BigNumber
  softcap: BigNumber
  hardcap: BigNumber
  token?: string
  price?: BigNumber
  liquidity_percent: BigNumber
  liquidity_lockup_time: BigNumber
}

export interface PresaleStatus {
  totalRaised: BigNumber
  totalSold: BigNumber
  totalContributors: BigNumber
  statusEnum: number
}

export interface UserStatus {
  amount: BigNumber
  claimed_amount: BigNumber
}

export interface PresaleInfo {
  presaleConfig: PresaleConfig
  presaleStatus: PresaleStatus
  userStatus: UserStatus
  onClaim: () => void
  onEmergencyWithdraw: () => void
  onContribute: () => void
}

const usePresale = () => {
  const { account } = useActiveWeb3React()
  const tokenSaleContract = useTokenSaleContract()
  const [presaleConfig, setPresaleConfig] = useState<PresaleConfig>()
  const [presaleStatus, setPresaleStatus] = useState<PresaleStatus>()
  const [userStatus, setUserStatus] = useState<UserStatus>()

  const { callWithGasPrice } = useCallWithGasPrice()

  const onClaim = useCallback(async () => {
    const tx = await callWithGasPrice(tokenSaleContract, 'withdraw', [])
    tx.wait()

    updateStatus()
  }, [tokenSaleContract, callWithGasPrice])

  const onEmergencyWithdraw = useCallback(async () => {
    const tx = await callWithGasPrice(tokenSaleContract, 'emergencyWithdraw', [])
    await tx.wait()

    updateStatus()
  }, [tokenSaleContract, callWithGasPrice])

  const onContribute = useCallback(
    async (amount: string) => {
      const tx = await callWithGasPrice(tokenSaleContract, 'contribute', [], { value: amount })
      await tx.wait()

      updateStatus()
    },
    [tokenSaleContract, callWithGasPrice],
  )

  const updateStatus = async () => {
    console.log("updating status");
    const totalRaised = await tokenSaleContract.totalRaised()
    const totalSold = await tokenSaleContract.totalSold()
    const totalContributors = await tokenSaleContract.funderCounter()
    const statusEnum = await tokenSaleContract.status()

    if (account) {
      const _userStatus = await tokenSaleContract.funders(account)
      setUserStatus(_userStatus)
    }

    setPresaleStatus({ totalRaised, totalSold, totalContributors, statusEnum })
  }

  useEffect(() => {
    if (tokenSaleContract) {
      (async () => {
        const _presaleConfig = await tokenSaleContract.presaleConfig()
        setPresaleConfig(_presaleConfig)
      })()
      updateStatus()
    }
  }, [tokenSaleContract])

  return { presaleConfig, presaleStatus, userStatus, onClaim, onEmergencyWithdraw, onContribute }
}

export default usePresale
