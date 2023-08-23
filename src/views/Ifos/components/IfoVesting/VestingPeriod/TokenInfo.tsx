import { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import { BalanceWithLoading } from 'components/Balance'
import { Box, Flex, Text, ChevronDownIcon } from '@pancakeswap/uikit'
import { TokenImage } from 'components/TokenImage'
import { VestingData } from 'views/Ifos/hooks/vesting/fetchUserWalletIfoData'
import { PoolIds } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import Expand from './Expand'

const ArrowIcon = styled(ChevronDownIcon)<{ toggled: boolean }>`
  transform: ${({ toggled }) => (toggled ? 'rotate(180deg)' : 'rotate(0)')};
  height: 24px;
`

interface TokenInfoProps {
  index: number
  data: VestingData
  fetchUserVestingData: () => void
}

const TokenInfo: React.FC<TokenInfoProps> = ({ index, data, fetchUserVestingData }) => {
  const { vestingTitle, token } = data.ifo
  const { vestingComputeReleasableAmount } = data.userVestingData[PoolIds.poolUnlimited]
  const [expanded, setExpanded] = useState(false)
  const shouldRenderExpand = useDelayedUnmount(expanded, 300)

  useEffect(() => {
    if (index === 0) {
      setExpanded(true)
    }
  }, [index])

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  const amountAvailable = useMemo(
    () => getBalanceNumber(vestingComputeReleasableAmount, token.decimals),
    [token, vestingComputeReleasableAmount],
  )

  return (
    <Box>
      <Flex p="24px" m="-24px -24px 0 -24px" style={{ cursor: 'pointer' }} onClick={toggleExpanded}>
        <TokenImage width={32} height={32} token={token} />
        <Flex flexDirection="column" ml="8px">
          <Text bold lineHeight="120%">
            {vestingTitle}
          </Text>
          <Flex>
            <BalanceWithLoading color="secondary" value={amountAvailable} decimals={4} bold fontSize="12px" />
            <Text color="textSubtle" textTransform="uppercase" fontSize="12px" margin="0 2px">
              {token.symbol}
            </Text>
          </Flex>
        </Flex>
        <ArrowIcon toggled={expanded} color="primary" ml="auto" />
      </Flex>
      {shouldRenderExpand && <Expand expanded={expanded} data={data} fetchUserVestingData={fetchUserVestingData} />}
    </Box>
  )
}

export default TokenInfo
