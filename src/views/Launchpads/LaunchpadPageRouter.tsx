import { useRouter } from 'next/router'
import PageLoader from '../../components/Loader/PageLoader'
import Launchpad from './Launchpad'

const LaunchpadPageRouter = () => {
  const router = useRouter()

  if (router.isFallback) {
    return <PageLoader />
  }

  return <Launchpad />
}

export default LaunchpadPageRouter
