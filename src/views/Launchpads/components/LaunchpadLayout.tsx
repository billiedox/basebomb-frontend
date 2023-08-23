import { Box, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'

const LaunchpadLayout = styled(Box)`
  > div:not(.sticky-header) {
    margin-bottom: 32px;
  }
`

export const LaunchpadLayoutWrapper = styled(Flex)`
column-gap: 32px;
display: grid;
grid-template-columns: 1fr;

${({ theme }) => theme.mediaQueries.md} {
  grid-template-columns: minmax(462px, 2fr) minmax(462px, 1fr);
}

> div {
  margin: 0 auto;
  align-items: flex-start;
}
`

export const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.cardBorder};
`

export default LaunchpadLayout
