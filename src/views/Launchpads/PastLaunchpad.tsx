
import { Flex, Grid, Heading, SubMenuItems} from '@pancakeswap/uikit'
import { launchpadsConfig } from 'config/constants'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import PageHeader from 'components/PageHeader'
import PageSection from 'components/PageSection'
import { useLaunchpads, useLaunchpadsPageFetch } from 'state/launchpads/hooks'
import { FetchStatus } from 'config/constants/types'
import PageLoader from 'components/Loader/PageLoader'
import LaunchpadCard from './components/LaunchpadCard'


/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeLaunchpad = launchpadsConfig.find((launchpad) => launchpad.isActive)

const Launchpads = () => {  
  const { t } = useTranslation()
  const { theme } = useTheme()  
  const { launchpads } = useLaunchpads()

  useLaunchpadsPageFetch()

  const router = useRouter()
  const isExact = router.route === '/launchpads/history'
  
  return (
    <>
      <PageMeta />
      <SubMenuItems
          items={[
            {
              label: t('Current Presale'),
              href: '/launchpads',
            },
            {
              label: t('Finished Presale'),
              href: '/launchpads/history',
            },
          ]}
          activeItem={isExact ? '/launchpads/history' : '/launchpads'}
        />
        <PageHeader>  
          <Heading scale="xl">{t('Finished Presale')}</Heading>
        </PageHeader>
          <PageSection
          innerProps={{ style: { margin: '0', width: '100%' } }}
          background={theme.colors.background}
          index={1}
          concaveDivider
          dividerPosition="top"
        >
          <Grid gridGap="16px" gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} mb="64px">
            {launchpads.filter((launchpad) => !launchpad.isActive).slice(0,6).map((launchpad)=> {
              return (
                <LaunchpadCard key={launchpad.id} launchpad={launchpad}/>
              )
            })}
          </Grid>
        </PageSection>
    </>
  )
}
export default Launchpads
