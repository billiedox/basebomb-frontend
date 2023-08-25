import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

export interface LaunchpadDescriptionProps {
  defaultIsOpen?: boolean
  description: string
}

const StyledLaunchpadDescription = styled.div`
  margin-bottom: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: block;
  font-weight: 600;
  outline: 0;
  padding: 24px 16px;
  width: 100%;
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const LaunchpadDescription: React.FC = () => {
  const { t } = useTranslation()

  return (
    <StyledLaunchpadDescription>
      <Divider />
      <Description>{`Welcome to BaseBOMB, your go-to for groundbreaking DeFi innovations. Launching on BaseChain, we're more than a token. Our platform features state-of-the-art DeX versions, a Launchpad, NFT Staking, automated arbitrage bots, and Single Side Staking and much more, coming in future. Ready for explosive financial growth? Enlist with BaseBOMB today.`}</Description>
      <Divider />
    </StyledLaunchpadDescription>
  )
}

export default LaunchpadDescription
