import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Text, LinkExternal, Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import getTimePeriods from 'utils/getTimePeriods'
import { LaunchpadStatus } from 'config/constants/types'
import { DeserializedLaunchpad } from 'state/types'
import { getAddress } from 'utils/addressHelpers'

export interface LaunchpadCardDetailsProps {
  launchpad: DeserializedLaunchpad
  status: LaunchpadStatus
  secondsUntilStart: number
  secondsUntilEnd: number
}

const StyledLaunchpadCardDetails = styled.div`
  margin-bottom: 24px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  margin-bottom: 4px;
`

const Display = styled(Text)`
  font-size: 14px;
  flex: 1;
`

const LaunchpadCardDetails: React.FC<LaunchpadCardDetailsProps> = ({
  launchpad,
  status,
  secondsUntilStart,
  secondsUntilEnd,
}) => {
  const { t } = useTranslation()
  const { projectSiteUrl } = launchpad


  const countdownToUse = status === 'upcoming' ? secondsUntilStart : secondsUntilEnd
  const timeUntil = getTimePeriods(countdownToUse)

  if (status === 'filled' || status === 'ended') {
    return (
      <>
        <StyledLaunchpadCardDetails>
          <Item>
            <Display>
              <Text>Presale:</Text>
              <Text>{status === 'filled' ? 'Filled' : 'Ended'}</Text>
            </Display>
            <div>
              <Button variant="primary">
                <Link href={`/launchpads/${getAddress(launchpad.address)}`} passHref>
                  {t('View Pool')}
                </Link>
              </Button>
            </div>
          </Item>
        </StyledLaunchpadCardDetails>
        <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
          {t('View project site')}
        </LinkExternal>
      </>
    )
  }

  if (status === 'cancelled') {
    return (
      <>
        <StyledLaunchpadCardDetails>
          <Item>
            <Display>
              <Text>Presale:</Text>
              <Text>Cancelled</Text>
            </Display>
            <div>
              <Button variant="primary">
                <Link href={`/launchpads/${getAddress(launchpad.address)}`} passHref>
                  {t('View Pool')}
                </Link>
              </Button>
            </div>
          </Item>
        </StyledLaunchpadCardDetails>
        <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
          {t('View project site')}
        </LinkExternal>
      </>
    )
  }

  return (
    <>
      <StyledLaunchpadCardDetails>
        <Item>
          <Display>
            <Text>{status === 'upcoming' ? 'Sale Starts in' : 'Sale Ends in'}</Text>
            <Text>
              {timeUntil.days.toString().padStart(2, '0')}:{timeUntil.hours.toString().padStart(2, '0')}:
              {timeUntil.minutes.toString().padStart(2, '0')}:{timeUntil.seconds.toString().padStart(2, '0')}
            </Text>
          </Display>
          <div>
            <Button variant="primary">
              <Link href={`/launchpads/${getAddress(launchpad.address)}`} passHref>
                {t('View Pool')}
              </Link>
            </Button>
          </div>
        </Item>
      </StyledLaunchpadCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
        {t('View project site')}
      </LinkExternal>
    </>
  )
}

export default LaunchpadCardDetails
