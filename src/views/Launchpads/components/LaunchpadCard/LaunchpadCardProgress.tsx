import React from 'react'
import styled from 'styled-components'
import { Progress, Text } from '@pancakeswap/uikit'
import { Token } from '@orbitalswap/sdk'

interface LaunchpadProgressProps {
  softcap: number
  hardcap: number
  raised: number
  // liquidityPercent: number
  currency?: Token
  isTombFork?: boolean
  // liquidityLockupTime?: number
}

const StyledProgress = styled.div`
  margin-bottom: 16px;
`

const Display = styled(Text)`
  font-size: 14px;
  flex: 1;
`
const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
`

const ProgressBar = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`
const LaunchpadCardProgress: React.FC<LaunchpadProgressProps> = ({ softcap, hardcap, raised, currency }) => {
  const progress1 = (raised / (hardcap ?? 1)) * 100
  const buyTokenSymbol = 'ETH'
  // const lockupDays = liquidityLockupTime / 86400

  return (
    <StyledProgress>
      <Item>
        <Display>Soft/Hard Cap:</Display>
      </Item>
      <Item>
        <Text color="failure">
          {softcap} {buyTokenSymbol} - {hardcap} {buyTokenSymbol}
        </Text>
      </Item>
      <Item>
        <Text>Progress ({progress1.toFixed(2)}%)</Text>
      </Item>
      <ProgressBar>
        <Progress primaryStep={progress1} />
      </ProgressBar>
      <Item>
        <Display>
          {raised} {buyTokenSymbol}
        </Display>
        <Text fontSize="14px">
          {hardcap} {buyTokenSymbol}
        </Text>
      </Item>
      {/* <Item>
        <Display>Liquidity %</Display>
        <Text>{isTombFork? '-' : liquidityPercent} %</Text>
      </Item> */}
      {/* <Item>
        <Display>Liquidity Lockup Time</Display>
        <Text>{lockupDays > 0 ? `${lockupDays} days` : '-'}</Text>
      </Item> */}
    </StyledProgress>
  )
}

export default LaunchpadCardProgress
