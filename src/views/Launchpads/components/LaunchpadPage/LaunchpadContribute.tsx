import React, { useMemo, useState } from 'react'
import {BigNumber} from '@ethersproject/bignumber'
import { useModal, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { LaunchpadStatus } from 'config/constants/types'
import { useTokenSaleContract } from 'hooks/useContract'
import { DeserializedLaunchpad } from 'state/types'
import usePresale, { PresaleConfig, PresaleStatus, UserStatus } from 'hooks/usePresale'
import { formatBigNumber } from 'utils/formatBalance'
import { fetchMerkleProof } from 'views/Launchpads/api'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'

export interface Props {
  status: LaunchpadStatus
  presaleConfig: PresaleConfig
  presaleStatus: PresaleStatus
  userStatus: UserStatus
  whiteListed: boolean
}

const LaunchpadContribute: React.FC<Props> = ({ status, presaleConfig, presaleStatus, userStatus, whiteListed }) => {
  const [pendingTx, setPendingTx] = useState(false)

  const { account } = useWeb3React();

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
      const merkleProof = fetchMerkleProof(account);
      try {
        setPendingTx(true)
        await onClaim(merkleProof)
      } catch (err) {
        console.error(err)
      } finally {
        setPendingTx(false)
      }
    }
  }

  const isFinished = status === 'upcoming'
  const percentOfUserContribution = useMemo(() => {
    if (!totalRaised) return 0;
    return Number(formatBigNumber(contributedAmount)) / Number(formatBigNumber(totalRaised)) * 100;
  }, [totalRaised, contributedAmount])

  if (status === 'live') {
    return (
      <>
        <LabelButton
          disabled={!whiteListed}
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

  if (status === 'ended' || status === 'filled') {
    return (
      <>
        <LabelButton
          disabled
          buttonLabel="Claim"
          label={`Your contribution (${buyTokenSymbol})`}
          value={
            // eslint-disable-next-line no-nested-ternary
            formatBigNumber(contributedAmount ?? BigNumber.from(0))
          }
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={()=>{}}
        />
        <Text fontSize="14px" color="textSubtle">
          {isFinished ? `Tokens will be airdropped on Avax` : `${percentOfUserContribution.toFixed(2)}% of total`}
        </Text>
      </>
    )
  }

  if (status === 'claimable') {
    const claimable = contributedAmount.toNumber() > 0
    return (
      <>
        <LabelButton
          disabled={!claimable || !whiteListed}
          buttonLabel={claimable ? 'Claim' : 'Nothing to claim'}
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

  return (
    <>
      <LabelButton
        disabled={isFinished}
        // buttonLabel={!isFinished ? (claimed ? 'Claimed' : 'Claim') : `Buy with ${buyTokenSymbol}`}
        buttonLabel={`Buy with ${buyTokenSymbol}`}
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
