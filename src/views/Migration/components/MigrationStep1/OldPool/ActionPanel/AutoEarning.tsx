import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Heading, useMatchBreakpointsContext } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Balance from 'components/Balance'
import { ActionContainer, ActionTitles, ActionContent } from 'views/Pools/components/PoolsTable/ActionPanel/styles'

const Container = styled(ActionContainer)`
  flex: 2;
  align-self: stretch;
`

interface AutoEarningProps {
  earningTokenBalance: number
  earningTokenDollarBalance: number
  earningTokenPrice: number
}

const AutoEarning: React.FunctionComponent<AutoEarningProps> = ({
  earningTokenBalance,
  earningTokenDollarBalance,
  earningTokenPrice,
}) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpointsContext()

  const actionTitle = (
    <Text fontSize="12px" bold color="secondary" as="span" textTransform="uppercase">
      {t('Recent CAKE profit')}
    </Text>
  )

  if (isMobile) {
    return (
      <Flex justifyContent="space-between">
        <Text>{t('Recent CAKE profit')}</Text>
        <Flex height="20px" alignItems="center">
          {earningTokenBalance > 0 ? (
            <Balance fontSize="16px" value={earningTokenBalance} decimals={5} />
          ) : (
            <Text fontSize="16px">0</Text>
          )}
        </Flex>
      </Flex>
    )
  }

  return (
    <Container>
      <ActionTitles>{actionTitle}</ActionTitles>
      <ActionContent>
        <Flex flex="1" pt="16px" flexDirection="column">
          <>
            {earningTokenBalance > 0 ? (
              <>
                <Balance lineHeight="1" bold fontSize="20px" decimals={5} value={earningTokenBalance} />
                {earningTokenPrice > 0 && (
                  <Balance
                    display="inline"
                    fontSize="12px"
                    color="textSubtle"
                    decimals={2}
                    prefix="~"
                    value={earningTokenDollarBalance}
                    unit=" USD"
                  />
                )}
              </>
            ) : (
              <>
                <Heading color="textDisabled">0</Heading>
                <Text fontSize="12px" color="textDisabled">
                  0 USD
                </Text>
              </>
            )}
          </>
        </Flex>
      </ActionContent>
    </Container>
  )
}

export default AutoEarning
