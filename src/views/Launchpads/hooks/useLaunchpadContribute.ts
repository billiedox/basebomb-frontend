import { useCallback } from 'react'
import { ethers, Contract } from 'ethers'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'

const useLaunchpadContribute = (launchpadContract: Contract) => {
  const { callWithGasPrice } = useCallWithGasPrice()

  const onContribute = useCallback(
    async (amount: string, isToken = false): Promise<ethers.providers.TransactionReceipt> => {
      let tx
      if (isToken) {
        tx = await callWithGasPrice(launchpadContract, 'contribute', [amount])
      } else {
        tx = await callWithGasPrice(launchpadContract, 'contribute', ["0"], {
          value: amount,
        })
      }
      return tx.wait()
    },
    [launchpadContract, callWithGasPrice],
  )

  return onContribute
}

export default useLaunchpadContribute
