import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Flex } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'

interface LaunchpadHeaderProps {
  launchpadId: number
  name: string
  subTitle: string
}

const BombFilledIcon = styled.img`
  margin-left: 20px;
  margin-bottom: 8px;
  max-width: 120px;
`;
const StyledLaunchpadHeader = styled(Flex)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  & > div {
    flex: 1;
  }
`

const Name = styled(Heading).attrs({ as: 'h3', size: 'lg' })`
  text-align: left;
`

const Description = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  text-align: left;
  margin-left : 1.5rem;
`

const LaunchpadHeader: React.FC = () => {
  const { theme } = useTheme()
  return (
    <StyledLaunchpadHeader mb="12px" alignItems="center">
      <BombFilledIcon src="/images/bomb-filled.png" width={80} height={80} />
      <div>
        <Name>OPBOMB FINANCE</Name>
      </div> 
    </StyledLaunchpadHeader>
  )

}
export default LaunchpadHeader;
