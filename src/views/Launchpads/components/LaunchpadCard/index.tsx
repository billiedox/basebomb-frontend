import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card, CardBody, CardRibbon } from '@pancakeswap/uikit'
import { LaunchpadStatus } from 'config/constants/types'
import { DeserializedLaunchpad } from 'state/types'
import { getStatus } from 'views/Launchpads/hooks/helpers'
import LaunchpadCardHeader from './LaunchpadCardHeader'
import LaunchpadCardProgress from './LaunchpadCardProgress'
import LaunchpadCardDetails from './LaunchpadCardDetails'

export interface LaunchpadCardProps {
  launchpad: DeserializedLaunchpad
}

const StyledLaunchpadCard = styled(Card)<{ ifoId: number }>`
  // background-image: ${({ ifoId }) => `url('/images/ifos/${ifoId}-bg.png')`};
  background-repeat: no-repeat;
  background-size: contain;
  // padding-top: 112px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
`

const getRibbonComponent = (status: LaunchpadStatus, TranslateString: (fallback: string) => any) => {
  if (status === 'upcoming') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString('Coming Soon')} />
  }

  if (status === 'live') {
    return <CardRibbon variantColor="primary" text={TranslateString('LIVE NOW!')} />
  }

  return null
}

const LaunchpadCard: React.FC<LaunchpadCardProps> = ({ launchpad }) => {
  const {
    id,
    name,
    subTitle,
    // liquidityPercent,
    softcap,
    hardcap,
    totalRaised,
    startDate,
    endDate,
    releaseAt,
    presaleStatus,
    currency,
    isTomFork,
    // liquidityLockupTime
  } = launchpad

  const [state, setState] = useState({
    status: null,
    progress: 0,
    secondsUntilStart: 0,
    secondsUntilEnd: 0,
  })

  useEffect(() => {
    const interval = setInterval(async () => {
      if (softcap.gt(0)) {
        const currentTime = Math.floor(Date.now() / 1000)
        console.log(currentTime);
        const status = getStatus(
          currentTime,
          startDate,
          endDate,
          totalRaised.toNumber(),
          softcap.toNumber(),
          hardcap.toNumber(),
          presaleStatus,
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
  }, [softcap, hardcap, presaleStatus, totalRaised, startDate, endDate, releaseAt])

  return (
    <StyledLaunchpadCard ifoId={id}>
      <CardBody>
        <LaunchpadCardHeader launchpadId={id} name={name} subTitle={subTitle} status={state.status} />
        <LaunchpadCardProgress
          softcap={softcap.toNumber()}
          hardcap={hardcap.toNumber()}
          raised={totalRaised.toNumber()}
          // liquidityPercent={liquidityPercent ?? 0}
          currency={currency}
          isTombFork={isTomFork}
          // liquidityLockupTime={liquidityLockupTime}
        />
        <LaunchpadCardDetails
          launchpad={launchpad}
          status={state.status}
          secondsUntilStart={state.secondsUntilStart}
          secondsUntilEnd={state.secondsUntilEnd}
        />
      </CardBody>
    </StyledLaunchpadCard>
  )
}

export default LaunchpadCard
