/* eslint-disable camelcase */
import React from 'react'
import styled from 'styled-components'
import { Text, LinkExternal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { BigNumber } from '@ethersproject/bignumber'
import { PresaleConfig, PresaleStatus } from 'hooks/usePresale'
import { formatBigNumber } from 'utils/formatBalance'
import { Item } from '../LaunchpadLayout'

export interface LaunchpadDetailsProps {
  presaleConfig: PresaleConfig
  presaleStatus: PresaleStatus
}
const StyledLaunchpadDetails = styled.div`
  margin-bottom: 24px;
`

const Display = styled(Text)`
  font-size: 14px;
  flex: 1;
`

const LaunchpadDetails: React.FC<LaunchpadDetailsProps> = ({ presaleConfig, presaleStatus }) => {
  const { t } = useTranslation()

  const {
    startTime,
    endTime,
    hardcap,
    softcap,
    min_contribution: minPerTx,
    max_contribution: maxPerUser,
    listing_price: presalePrice,
  } = presaleConfig || {}

  const {
    totalRaised,
    totalSold
  } = presaleStatus || {}

  const buyTokenSymbol = 'ETH'
  const presaleTokenSymbol = 'opBOMB';

  return (
    <>
      <StyledLaunchpadDetails>
        <Item>
          <Display>{t('Launch Time')}</Display>
          <Text>
            {`${new Date(startTime?.toNumber() * 1000).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              timeZone: 'America/Toronto',
            })} (EDT)`
            }
          </Text>
        </Item>
        <Item>
          <Display>{t('Hardcap')}</Display>
          <Text>{formatBigNumber(hardcap ?? BigNumber.from(0))} {buyTokenSymbol}</Text>
        </Item>
        <Item>
          <Display>{t('TokenPrice')}</Display>
          <Text>{formatBigNumber(presalePrice ?? BigNumber.from(0))} {presaleTokenSymbol}</Text>
        </Item>
        <Item>
          <Display>{t('Min Buy')}</Display>
          <Text>{formatBigNumber(minPerTx ?? BigNumber.from(0))} {buyTokenSymbol}</Text>
        </Item>
        <Item>
          <Display>{t('Max Buy')}</Display>
          <Text>{formatBigNumber(maxPerUser ?? BigNumber.from(0))} {buyTokenSymbol}</Text>
        </Item>
        <Item>
          <Display>{t('Total raised (% of target)')}</Display>
          <Text>
            {`${formatBigNumber(totalRaised ?? BigNumber.from(0))} ${buyTokenSymbol}`}
            {/* {`(${totalRaised.div(hardcap).times(100).toFixed(2)}%)`} */}
          </Text>
        </Item>

      </StyledLaunchpadDetails>
    </>
  )
}

export default LaunchpadDetails
