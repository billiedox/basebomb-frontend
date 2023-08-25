import React from 'react'
import styled from 'styled-components'
import { BigNumber } from '@ethersproject/bignumber'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { LaunchpadStatus } from 'config/constants/types'
import { DeserializedLaunchpad } from 'state/types'
import { PresaleConfig, PresaleStatus, UserStatus } from 'hooks/usePresale'
import { formatBigNumber } from 'utils/formatBalance'
import { Item } from '../LaunchpadLayout'

export interface LaunchpadStatusProps {
  status: LaunchpadStatus
  presaleConfig: PresaleConfig
  presaleStatus: PresaleStatus
  userStatus: UserStatus
}

const StyledLaunchpadStatus = styled.div`
  margin-bottom: 24px;
`

const Display = styled(Text)`
  font-size: 14px;
  flex: 1;
`

const LaunchpadStatusCard: React.FC<LaunchpadStatusProps> = ({ status, presaleConfig, presaleStatus, userStatus }) => {
  const { t } = useTranslation()
  // const { presalePrice, minPerTx, maxPerUser, fundersCounter, currency, isPrivatesale } = launchpad

  const { min_contribution: minPerTx, max_contribution: maxPerUser, listing_price: presalePrice } = presaleConfig || {}
  const { totalContributors } = presaleStatus || {}
  const { amount: contributedAmount, claimed_amount: totalTokensBought } = userStatus || {}

  const buyTokenSymbol = 'ETH'

  const purchaseTokenAmount =
    Number(formatBigNumber(presalePrice ?? BigNumber.from(0))) *
      Number(formatBigNumber(contributedAmount ?? BigNumber.from(0))) || 0
  return (
    <>
      <StyledLaunchpadStatus>
        <Item>
          <Display>{t('Status')}</Display>
          <Text>{status}</Text>
        </Item>
        <Item>
          <Display>{t('Sale type')}</Display>

          <Text>Private</Text>
        </Item>

        <Item>
          <Display>{t('Minimum Buy')}</Display>
          <Text>
            {formatBigNumber(minPerTx ?? BigNumber.from(0))} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display>{t('Maximum Buy')}</Display>
          <Text>
            {formatBigNumber(maxPerUser ?? BigNumber.from(0))} {buyTokenSymbol}
          </Text>
        </Item>
        <Item>
          <Display>{t('Total Contributors')}</Display>
          <Text>{totalContributors?.toNumber()}</Text>
        </Item>

        <Item>
          <Display>{t('You Purchased')}</Display>
          <Text>{purchaseTokenAmount.toFixed(2) || 0}</Text>
        </Item>
        <Item>
          <Display>{t('Total Tokens Bought')}</Display>
          <Text>{formatBigNumber(totalTokensBought ?? BigNumber.from(0))}</Text>
        </Item>
      </StyledLaunchpadStatus>
    </>
  )
}

export default LaunchpadStatusCard
