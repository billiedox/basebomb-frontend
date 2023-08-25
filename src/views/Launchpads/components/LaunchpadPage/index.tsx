import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BigNumber } from '@ethersproject/bignumber'
import { Box, Card, CardBody, CardRibbon, Flex, Message, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Container from 'components/Layout/Container'
import { getStatus } from 'views/Launchpads/hooks/helpers'
import { DeserializedLaunchpad } from 'state/types'
import { useLaunchpadsPageFetch } from 'state/launchpads/hooks'
import usePresale from 'hooks/usePresale'
import { formatBigNumber } from 'utils/formatBalance'
import LaunchpadLayout, { LaunchpadLayoutWrapper } from '../LaunchpadLayout'
import LaunchpadHeader from './LaunchpadHeader'
import LaunchpadProgress from './LaunchpadProgress'
import LaunchpadDescription from './LaunchpadDescription'
import LaunchpadDetails from './LaunchpadDetails'
import LaunchpadTime from './LaunchpadTime'
import LaunchpadContribute from './LaunchpadContribute'
import LaunchpadStatusCard from './LaunchpadStatusCard'
import { isWhiteListed } from 'views/Launchpads/api'
import { whitelistAddr } from 'config/constants/whitelist'

const StyledLaunchpad = styled(Card)`
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
  margin-top: 24px;
`

const StatusCard = styled(Card)`
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: auto;
  margin-right: auto;
  // max-width: 437px;
  width: 100%;
`

const OwnerActivityContainer = styled(Flex)`
  gap: 22px;
`

const LaunchpadPage = () => {
  useLaunchpadsPageFetch()

  const [state, setState] = useState({
    status: null,
    progress: 0,
    secondsUntilStart: 0,
    secondsUntilEnd: 0,
  })

  const { account } = useWeb3React()
  const [ whiteListed, setWhiteListed ] = useState<boolean>(false)

  const { presaleConfig, presaleStatus, userStatus } = usePresale()

  const { softcap, hardcap, startTime, endTime } = presaleConfig || {}

  const { totalRaised, totalSold, statusEnum } = presaleStatus || {}

  const startDate = startTime?.toNumber()
  const endDate = endTime?.toNumber()

  const releaseAt = 0

  useEffect(() => {
    const interval = setInterval(async () => {
      if (softcap?.gt(0)) {
        const currentTime = Math.floor(Date.now() / 1000)
        const status = getStatus(
          currentTime,
          startDate,
          endDate,
          Number(formatBigNumber(totalRaised ?? BigNumber.from(0))),
          Number(formatBigNumber(softcap ?? BigNumber.from(0))),
          Number(formatBigNumber(hardcap ?? BigNumber.from(0))),
          statusEnum,
        )
        const totalSeconds = endDate - startDate
        const secondsRemaining = endDate - currentTime

        // Calculate the total progress until finished or until start
        const progress =
          currentTime > startDate
            ? ((currentTime - startDate) / totalSeconds) * 100
            : ((currentTime - releaseAt) / (startDate - releaseAt)) * 100

        setState({
          status,
          progress,
          secondsUntilStart: startDate - currentTime,
          secondsUntilEnd: secondsRemaining,
        })
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [startDate, endDate, totalSold, softcap, hardcap, presaleStatus, totalRaised, releaseAt])

  useEffect(() => {
    if (!account) return
    (async () => {
      setWhiteListed(await isWhiteListed(account))
    })()
  }, [account])

  const { t } = useTranslation()

  const isActive = state.status === 'live' || state.status === 'filled'
  const isFinished = state.status === 'finished'

  return (
    <LaunchpadLayout id="current-launchpad" py={['24px', '24px', '40px']}>
      <Container>
        {account && !whiteListed && (
          <Message variant="warning" mb="24px">
            <Box>
              <Text fontWeight="bold">{t('You are not whitelisted')}</Text>
            </Box>
          </Message>
        )}
        <LaunchpadLayoutWrapper>
          <Flex flexDirection="column" width="100%">
            <StyledLaunchpad>
              <CardBody>
                <LaunchpadHeader />
                <LaunchpadDescription />
                <LaunchpadDetails presaleConfig={presaleConfig} presaleStatus={presaleStatus} />
              </CardBody>
            </StyledLaunchpad>
          </Flex>
          <OwnerActivityContainer flexDirection="column" width="100%">
            <StyledLaunchpad>
              <CardBody>
                <LaunchpadTime
                  isLoading={softcap?.eq(0)}
                  status={state.status}
                  secondsUntilStart={state.secondsUntilStart}
                  secondsUntilEnd={state.secondsUntilEnd}
                  block={isActive || isFinished ? endDate : startDate}
                />
                <LaunchpadProgress
                  softcap={Number(formatBigNumber(softcap ?? BigNumber.from(0)))}
                  hardcap={Number(formatBigNumber(hardcap ?? BigNumber.from(0)))}
                  raised={Number(formatBigNumber(totalRaised ?? BigNumber.from(0)))}
                />
                {!account && <ConnectWalletButton width="100%" />}
                {account && (
                  <LaunchpadContribute
                    presaleConfig={presaleConfig}
                    presaleStatus={presaleStatus}
                    userStatus={userStatus}
                    status={state.status}
                  />
                )}
              </CardBody>
            </StyledLaunchpad>
            <StatusCard>
              <CardBody>
                <LaunchpadStatusCard
                  status={state.status}
                  presaleConfig={presaleConfig}
                  presaleStatus={presaleStatus}
                  userStatus={userStatus}
                />
              </CardBody>
            </StatusCard>
          </OwnerActivityContainer>
        </LaunchpadLayoutWrapper>
      </Container>
    </LaunchpadLayout>
  )
}

export default LaunchpadPage
