// eslint-disable-next-line camelcase
import { useLaunchpadFromId } from 'state/launchpads/hooks'
import LaunchpadPageRouter from 'views/Launchpads/LaunchpadPageRouter'
import LaunchpadPage from 'views/Launchpads/components/LaunchpadPage'


const PresalePage = () => {
    const launchpad = useLaunchpadFromId(1)

  return (
    <LaunchpadPage launchpad={launchpad} />
  )
}

export default PresalePage

