import { LaunchpadStatus } from 'config/constants/types'

export const getStatus = (
  currentTime: number,
  startTime: number,
  endTime: number,
  raised: number,
  softcap: number,
  hardcap: number,
  status: number,
): LaunchpadStatus => {
  // Add an extra check to currentTime because it takes awhile to fetch so the initial value is 0
  // making the UI change to an inaccurate status
  if (currentTime === 0) {
    return 'upcoming'
  }

  if (status === 1) return 'cancelled'

  if (status === 2) return 'ended'

  if (currentTime < startTime) {
    return 'upcoming'
  }

  if (currentTime > endTime) {
    if (status === 2) return 'ended'
  }

  if (currentTime >= startTime && currentTime <= endTime) {
    if (status === 2) return 'ended'
    if (raised >= hardcap) {
      return 'filled'
    }
    return 'live'
  }
  return 'ended'
}
export default null
