import { LaunchpadsById } from '../state/types'
import launchpadsList from '../config/constants/launchpads'

export const launchpadsById: LaunchpadsById = launchpadsList.reduce((accum, launchpad) => {
  return {
    ...accum,
    [launchpad.id]: launchpad,
  }
}, {})
