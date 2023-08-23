import styled from 'styled-components'
import { Flex, Text, TooltipText, useTooltip, Box, Link } from '@pancakeswap/uikit'

import { BalanceWithLoading } from 'components/Balance'
import { useTranslation } from 'contexts/Localization'
import { useIfoCredit, useIfoCeiling } from 'state/pools/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { getICakeWeekDisplay } from 'views/Pools/helpers'

const InlineLink = styled(Link)`
  display: inline;
`

const IfoCakeRow: React.FC = () => {
  const { t } = useTranslation()
  const credit = useIfoCredit()
  const ceiling = useIfoCeiling()
  const weeksDisplay = getICakeWeekDisplay(ceiling)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <Box>
      <Text>
        {t(
          'The number of iORB equals the locked staking amount if the staking duration is longer than %weeks% weeks. If the staking duration is less than %weeks% weeks, it will linearly decrease based on the staking duration.',
          {
            weeks: weeksDisplay,
          },
        )}
      </Text>
      <InlineLink external href="https://docs.opbomb.finance/products/ifo-initial-farm-offering/iorb">
        {t('Learn more about iORB')}
      </InlineLink>
    </Box>,
    {
      placement: 'bottom-start',
    },
  )

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText>
        <Text ref={targetRef} color="textSubtle" bold fontSize="12px">
          {t('iORB')}
        </Text>
      </TooltipText>
      <BalanceWithLoading color="text" bold fontSize="16px" decimals={3} value={getBalanceNumber(credit)} />
    </Flex>
  )
}

export default IfoCakeRow
