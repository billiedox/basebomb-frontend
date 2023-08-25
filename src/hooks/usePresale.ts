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
  onClaim: (merkleProof: string[]) => void
  onContribute: (amount: string, merkleProof: string[]) => void
}

const usePresale = () => {
  const { account } = useActiveWeb3React()
  const tokenSaleContract = useTokenSaleContract()
  const [presaleConfig, setPresaleConfig] = useState<PresaleConfig>()
  const [presaleStatus, setPresaleStatus] = useState<PresaleStatus>()
  const [userStatus, setUserStatus] = useState<UserStatus>()

  const { callWithGasPrice } = useCallWithGasPrice()

  const onClaim = useCallback(async (merkleProof: string[]) => {
    const tx = await callWithGasPrice(tokenSaleContract, 'claim', [merkleProof])
    tx.wait()

    updateStatus()
  }, [tokenSaleContract, callWithGasPrice])

  // const onEmergencyWithdraw = useCallback(async () => {
  //   const tx = await callWithGasPrice(tokenSaleContract, 'emergencyWithdraw', [])
  //   await tx.wait()

  //   updateStatus()
  // }, [tokenSaleContract, callWithGasPrice])

  const onContribute = useCallback(
    async (amount: string, merkleProof: string[]) => {
      const tx = await callWithGasPrice(tokenSaleContract, 'contribute', [merkleProof], { value: amount })
      await tx.wait()

      updateStatus()
    },
    [tokenSaleContract, callWithGasPrice],
  )

  const updateStatus = async () => {
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
        setPresaleConfig({
          token: _presaleConfig.token,
          price: _presaleConfig.price,
          listing_price: _presaleConfig.listing_price,
          liquidity_percent: _presaleConfig.liquidity_percent,
          hardcap: _presaleConfig.hardcap,
          softcap: _presaleConfig.softcap,
          min_contribution: _presaleConfig.min_contribution,
          max_contribution: _presaleConfig.max_contribution,
          startTime: _presaleConfig.white_startTime,
          endTime: _presaleConfig.white_endTime
        })
      })()
      updateStatus()
    }
  }, [tokenSaleContract])

  return { presaleConfig, presaleStatus, userStatus, onClaim, onContribute }
}

export default usePresale
