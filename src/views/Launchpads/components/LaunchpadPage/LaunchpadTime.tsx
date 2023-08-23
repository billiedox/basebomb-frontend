import React from 'react'
import styled from 'styled-components'
import { Link, Text } from '@pancakeswap/uikit'
import { LaunchpadStatus } from 'config/constants/types'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'

export interface LaunchpadTimeProps {
  isLoading: boolean
  status: LaunchpadStatus
  secondsUntilStart: number
  secondsUntilEnd: number
  block: number
}

const Details = styled.div`
  align-items: center;
  // display: flex;
  justify-content: center;
  margin-bottom: 24px;
`

const Countdown = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`
const StyledLaunchpadDetails = styled.div`
  margin-bottom: 24px;
`
const TimerSpan = styled.span`
  font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji';
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  padding: 0.5rem;
  margin-right: 0.5rem;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`

const LaunchpadTime: React.FC<LaunchpadTimeProps> = ({ isLoading, status, secondsUntilStart, secondsUntilEnd, block }) => {
  const {t} = useTranslation()
  const countdownToUse = status === 'upcoming' ? secondsUntilStart : secondsUntilEnd
  const timeUntil = getTimePeriods(countdownToUse)

  if (isLoading) {
    return <Details>{t('Loading...')}</Details>
  }

  if (status === 'cancelled' || status === 'ended' || status === 'filled') {
    return (
      <Details>
        <Text bold>{t(`This pool has ${status}.`)}</Text>
      </Details>
    )
  }

  return (
    <Details>
      <Item>{status === 'upcoming' ? 'Presale Starts in' : 'Presale Ends in'}</Item>
      <Countdown>
        <strong>
          <TimerSpan >{timeUntil.days.toString().padStart(2, '0')}</TimerSpan>
          <TimerSpan >{timeUntil.hours.toString().padStart(2, '0')}</TimerSpan>
          <TimerSpan >{timeUntil.minutes.toString().padStart(2, '0')}</TimerSpan>
          <TimerSpan >{timeUntil.seconds.toString().padStart(2, '0')}</TimerSpan>
        </strong>
      </Countdown>
    </Details>
  )
}

export default LaunchpadTime
