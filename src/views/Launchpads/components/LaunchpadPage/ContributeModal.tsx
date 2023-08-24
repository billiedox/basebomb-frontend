import React, { useEffect, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { parseUnits } from '@ethersproject/units'
import { Modal, Button, Flex, Text } from '@pancakeswap/uikit'
import { Currency, Token } from '@orbitalswap/sdk'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { useETHBalance } from 'state/wallet/hooks'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import usePresale from 'hooks/usePresale'
import { formatBigNumber } from 'utils/formatBalance'

interface Props {
  contributeLimit: BigNumber
  minPerTx: BigNumber
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({ contributeLimit, minPerTx, onDismiss }) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('0')
  const [pendingTx, setPendingTx] = useState(false)
  const [isLimit, reachedLimit] = useState(false)
  const [tooSmall, setTooSmall] = useState(false)
  const [insufficient, setInsufficient] = useState(false)

  const { account } = useWeb3React()
  const ethBalance = useETHBalance(account)

  const { onContribute } = usePresale()

  const buyTokenSymbol = 'ETH'

  const isDisabled = pendingTx || Number(value) === 0 || isLimit || tooSmall || insufficient

  useEffect(() => {
    setInsufficient(Number(value) > Number(ethBalance?.toExact()))
    reachedLimit(parseUnits(Number(value).toString()).gt(contributeLimit))
    setTooSmall(parseUnits(Number(value).toString()).lt(minPerTx))
  }, [value, contributeLimit, minPerTx])

  return (
    <Modal title={`Contribute ${buyTokenSymbol}`} onDismiss={onDismiss}>
      <CurrencyInputPanel
        id="ifo-contribute-input"
        onUserInput={(input) => setValue(input)}
        onCurrencySelect={undefined}
        disableCurrencySelect
        showMaxButton
        onMax={() => {
          setValue(Math.max(Number(ethBalance.toFixed()) - 0.01, 0).toString())
        }}
        value={value}
        currency={Currency.ETHER}
      />
      {(isLimit || tooSmall || insufficient) && (
        <Text color="warning" fontSize="12px" textAlign="right">
          {insufficient
            ? `Insufficient ETH Balance`
            : isLimit
            ? `Max ${formatBigNumber(contributeLimit)} ${buyTokenSymbol} contributable now`
            : tooSmall
            ? `Min.Tx ${formatBigNumber(minPerTx)} ${buyTokenSymbol}`
            : ''}
        </Text>
      )}
      <Flex justifyContent="space-between" mt="24px">
        <Button width="100%" variant="primary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button
          width="100%"
          disabled={isDisabled}
          variant={!isDisabled ? 'primary' : 'none'}
          onClick={async () => {
            try {
              setPendingTx(true)
              if (onContribute) {
                await onContribute(parseUnits(Number(value).toString()).toString())
              }
            } catch (err) {
              console.error(err)
            } finally {
              setPendingTx(false)
              onDismiss()
            }
          }}
        >
          Confirm
        </Button>
      </Flex>
    </Modal>
  )
}

export default ContributeModal
