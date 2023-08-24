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
      <Description>{`Welcome to BaseBOMB, the frontline of decentralized finance where strategy meets opportunity. BaseBOMB is Built on the formidable BaseChain backed by CoinBase, BaseBOMB is more than just a token—it's a full-scale financial operation aimed at revolutionizing the DeFi landscape. With innovative offerings like our v2, v3 DeX, Launchpad, NFT Staking, and automated arbitrage bots, Single Side Staking BaseBOMB is designed for those ready to enlist in a financial future that's explosive in potential. Enlist today and march towards victory with BaseBOMB—the arsenal you need for unparalleled success in the DeFi battlefields.`}</Description>
      <Divider />
    </StyledLaunchpadDescription>
  )
}

export default LaunchpadDescription
