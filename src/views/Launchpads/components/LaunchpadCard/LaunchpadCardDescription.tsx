import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

export interface LaunchpadCardDescriptionProps {
  defaultIsOpen?: boolean
  description: string
}

const StyledLaunchpadCardDescription = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
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

const Description = styled(Text)<{ isOpen: boolean }>`
  color: ${({ theme }) => theme.colors.textSubtle};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  font-size: 15px;
`

const LaunchpadCardDescription: React.FC<LaunchpadCardDescriptionProps> = ({ defaultIsOpen = true, description }) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const {t} = useTranslation()

  const handleClick = () => setIsOpen(!isOpen)

  return (
    <StyledLaunchpadCardDescription>
      <Divider />
      <ToggleButton onClick={handleClick}>
        {isOpen ? t('Hide') : t('Show')}
      </ToggleButton>
      <Description isOpen={isOpen}>{description}</Description>
    </StyledLaunchpadCardDescription>
  )
}

export default LaunchpadCardDescription
