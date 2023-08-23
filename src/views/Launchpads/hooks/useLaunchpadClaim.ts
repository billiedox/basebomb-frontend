import { useCallback } from 'react'
import { ethers, Contract } from 'ethers'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useLaunchpadClaim = (launchpadContract: Contract) => {
  const { callWithGasPrice } = useCallWithGasPrice()
  const onClaim = useCallback(async (): Promise<ethers.providers.TransactionReceipt> => {
    const tx = await callWithGasPrice(launchpadContract, 'withdraw', [])
    return tx.wait()
  }, [launchpadContract, callWithGasPrice])

  return onClaim
}

export default useLaunchpadClaim
