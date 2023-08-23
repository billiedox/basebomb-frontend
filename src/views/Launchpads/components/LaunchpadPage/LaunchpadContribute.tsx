import React, { useMemo, useState } from 'react'
import {BigNumber} from '@ethersproject/bignumber'
import { useModal, Text } from '@pancakeswap/uikit'
import { LaunchpadStatus } from 'config/constants/types'
import { useTokenSaleContract } from 'hooks/useContract'
import { DeserializedLaunchpad } from 'state/types'
import usePresale, { PresaleConfig, PresaleStatus, UserStatus } from 'hooks/usePresale'
import { formatBigNumber } from 'utils/formatBalance'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'

export interface Props {
  status: LaunchpadStatus
  presaleConfig: PresaleConfig
  presaleStatus: PresaleStatus
  userStatus: UserStatus
}

const LaunchpadContribute: React.FC<Props> = ({ status, presaleConfig, presaleStatus, userStatus }) => {
  const [pendingTx, setPendingTx] = useState(false)

  const {min_contribution: minPerTx, max_contribution: maxPerUser} = presaleConfig || {};
  const {totalRaised} = presaleStatus || {};
  const {amount: contributedAmount} = userStatus || {};
  const buyTokenSymbol = 'ETH'

  const tokenSaleContract = useTokenSaleContract();

  const {onClaim} = usePresale();

  const [onPresentContributeModal] = useModal(
    <ContributeModal
      contributeLimit={(maxPerUser ?? BigNumber.from(0)).sub(contributedAmount ?? BigNumber.from(0))}
      minPerTx={minPerTx ?? BigNumber.from(0)}
    />,
  )

  const claim = async () => {
    if (tokenSaleContract) {
      try {
        setPendingTx(true)
        await onClaim()
      } catch (err) {
        console.error(err)
      } finally {
        setPendingTx(false)
      }
    }
  }

  const isFinished = status === 'upcoming'
  // const percentOfUserContribution = totalRaised ? totalRaised.gt(0) ? contributedAmount?.div(totalRaised) : BigNumber.from(0) : BigNumber.from(0)
  const percentOfUserContribution = useMemo(() => {
    if (!totalRaised) return 0;
    return Number(formatBigNumber(contributedAmount)) / Number(formatBigNumber(totalRaised)) * 100;
  }, [totalRaised, contributedAmount])

  if (status === 'live') {
    return (
      <>
        <LabelButton
          // disabled={claimed}
          buttonLabel={`Buy with ${buyTokenSymbol}`}
          label={`Your contribution (${buyTokenSymbol})`}
          value={
            // eslint-disable-next-line no-nested-ternary
            formatBigNumber(contributedAmount ?? BigNumber.from(0))
          }
          // onClick={claimed ? claim : onPresentContributeModal}
          onClick={onPresentContributeModal}
        />
        <Text fontSize="14px" color="textSubtle">
          {isFinished ? `Tokens will be airdropped on Avax` : `${percentOfUserContribution.toFixed(2)}% of total`}
        </Text>
      </>
    )
  }

  if (status === 'filled') {
    const claimable = contributedAmount.toNumber() > 0
    return (
      <>
        <LabelButton
          disabled={!claimable}
          buttonLabel={claimable ? 'Claimed' : 'Claim'}
          label={`Your contribution (${buyTokenSymbol})`}
          value={
            // eslint-disable-next-line no-nested-ternary
            formatBigNumber(contributedAmount ?? BigNumber.from(0))
          }
          onClick={claim}
        />
        <Text fontSize="14px" color="textSubtle">
          {isFinished ? `Tokens will be airdropped on Avax` : `${percentOfUserContribution.toFixed(2)}% of total`}
        </Text>
      </>
    )
  }

  if (status === 'ended') {
    const claimable = contributedAmount.toNumber() > 0
    const noContribute = contributedAmount.toNumber() === 0
    return (
      <>
        <LabelButton
          disabled={!claimable || noContribute}
          buttonLabel={claimable ? 'Claim' : 'Claimed'}
          label={`Your contribution (${buyTokenSymbol})`}
          value={
            // eslint-disable-next-line no-nested-ternary
            formatBigNumber(contributedAmount ?? BigNumber.from(0))
          }
          onClick={claim}
        />
        <Text fontSize="14px" color="textSubtle">
          {isFinished ? `Tokens will be airdropped on Avax` : `${percentOfUserContribution.toFixed(2)}% of total`}
        </Text>
      </>
    )
  }

  if (status === 'cancelled') {
    const claimable = contributedAmount.toNumber() > 0
    const noContribute = contributedAmount.toNumber() === 0
    return (
      <>
        <LabelButton
          disabled={!claimable || noContribute}
          buttonLabel={claimable ? 'Withdraw' : 'Refunded'}
          label={`Your contribution (${buyTokenSymbol})`}
          value={
            // eslint-disable-next-line no-nested-ternary
            formatBigNumber(contributedAmount ?? BigNumber.from(0))
          }
          onClick={claim}
        />
        <Text fontSize="14px" color="textSubtle">
          {claimable ? `You'll get your investment` : ``}
        </Text>
      </>
    )
  }

  return (
    <>
      <LabelButton
        disabled={isFinished}
        // buttonLabel={!isFinished ? (claimed ? 'Claimed' : 'Claim') : `Buy with ${buyTokenSymbol}`}
        buttonLabel={!isFinished ? 'Claim' : `Buy with ${buyTokenSymbol}`}
        label={`Your contribution (${buyTokenSymbol})`}
        value={
          // eslint-disable-next-line no-nested-ternary
          formatBigNumber(contributedAmount ?? BigNumber.from(0))
        }
        onClick={isFinished ? claim : onPresentContributeModal}
      />
      <Text fontSize="14px" color="textSubtle">
        {isFinished ? `Tokens will be airdropped on Avax` : `${percentOfUserContribution.toFixed(2)}% of total`}
      </Text>
    </>
  )
}

export default LaunchpadContribute
