import { useCallback } from 'react'
import { MaxUint256 } from '@ethersproject/constants'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useERC20 } from 'hooks/useContract'
import { Token } from '@orbitalswap/sdk'

const useApproveLaunchpad = (token: Token, spenderAddress: string) => {
  const tokenContract = useERC20(token.address)
  const { callWithGasPrice } = useCallWithGasPrice()
  const onApprove = useCallback(async () => {
    return callWithGasPrice(tokenContract, 'approve', [spenderAddress, MaxUint256])
  }, [spenderAddress, tokenContract, callWithGasPrice])

  return onApprove
}

export default useApproveLaunchpad
