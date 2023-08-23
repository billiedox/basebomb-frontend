import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Flex } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { LaunchpadStatus } from 'config/constants/types'
import { LaunchpadStateTag } from './tags'

interface LaunchpadCardHeaderProps {
  launchpadId: number
  name: string
  subTitle: string
  status: LaunchpadStatus
}

const StyledLaunchpadCardHeader = styled(Flex)`
  padding-top: 12px;
  & > div {
    flex: revert;
  }
  justify-content: space-between;
  // height: 35px;
`

const Name = styled(Heading).attrs({ as: 'h3', size: 'lg' })`
  margin-bottom: 8px;
  text-align: center;
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  text-align: center;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
`
const LogoItem = styled.div<{ isDark: boolean, launchpadId: number }>`
  background-image: ${({ isDark, launchpadId }) => (isDark ? `url(/images/launchpads/${launchpadId}.png)` : `url(/images/launchpads/${launchpadId}-white.png)`)};
  width: 158px;
  height: 35px;
  background-size: contain;
  background-repeat-x: no-repeat;
`


const LaunchpadCardHeader: React.FC<LaunchpadCardHeaderProps> = ({ launchpadId, name, subTitle, status }) => {
  const theme = useTheme();
  return (
    <StyledLaunchpadCardHeader mb="24px">
     <LogoItem isDark={theme.isDark} launchpadId={launchpadId}/>
      <Description>{subTitle}</Description>
      <Item>
        <LaunchpadStateTag launchpadState={status} />
      </Item>
      
    </StyledLaunchpadCardHeader>
    
  )
}

export default LaunchpadCardHeader
