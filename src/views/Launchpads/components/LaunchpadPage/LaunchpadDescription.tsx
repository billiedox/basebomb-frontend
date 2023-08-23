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
      <Description>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}</Description>
      <Divider />
    </StyledLaunchpadDescription>
  )
}

export default LaunchpadDescription
