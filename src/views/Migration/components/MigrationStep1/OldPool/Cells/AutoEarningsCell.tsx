import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Box, useMatchBreakpointsContext } from '@pancakeswap/uikit'
import Balance from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import BaseCell, { CellContent } from 'views/Pools/components/PoolsTable/Cells/BaseCell'

interface AutoEarningsCellProps {
  hasEarnings: boolean
  earningTokenBalance: number
}

const StyledCell = styled(BaseCell)`
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    flex: 2 0 100px;
  }
`

const AutoEarningsCell: React.FC<AutoEarningsCellProps> = ({ hasEarnings, earningTokenBalance }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpointsContext()
  const labelText = t('Recent CAKE profit')

  return (
    <StyledCell role="cell">
      <CellContent>
        <Text fontSize="12px" color="textSubtle" textAlign="left">
          {labelText}
        </Text>
        <Flex>
          <Box mr="8px" height="32px">
            <Balance
              mt="4px"
              fontSize={isMobile ? '14px' : '16px'}
              color={hasEarnings ? 'text' : 'textDisabled'}
              decimals={hasEarnings ? 5 : 1}
              value={hasEarnings ? earningTokenBalance : 0}
            />
          </Box>
        </Flex>
      </CellContent>
    </StyledCell>
  )
}

export default AutoEarningsCell
