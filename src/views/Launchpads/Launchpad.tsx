import { SubMenuItems } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import { launchpadsConfig } from 'config/constants'
import { CHAIN_ID } from 'config/constants/networks'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useRouter } from 'next/router'
import { useLaunchpadFromId } from 'state/launchpads/hooks'
import { getAddress } from 'utils/addressHelpers'
import LaunchpadPage from './components/LaunchpadPage'


/**
 * Note: currently there should be only 1 active IFO at a time
 */


const Launchpad = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const isExact = router.route === '/launchpads'

  const launchpadAddress = router.query.launchpadAddress as string
  const activeLaunchpad = launchpadsConfig.find((launchpad) => (getAddress(launchpad.address) === launchpadAddress))

  const launchpad = useLaunchpadFromId(activeLaunchpad.id)
  return (
    <>
      <PageMeta />
      {/* <SubMenuItems
          items={[
            {
              label: t('All launchpads'),
              href: '/launchpads',
            },
            {
              label: t('My Contributions'),
              href: `/launchpads/${launchpadAddress}`,
            },
          ]}
          activeItem={isExact ? '/launchpads' : '/launchpads/history'}
        /> */}
      <LaunchpadPage launchpad={launchpad} />
    </>
  )
}
export default Launchpad
