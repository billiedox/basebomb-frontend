import { SubMenuItems } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { PageMeta } from 'components/Layout/Page'
import { useRouter } from 'next/router'
import Hero from './components/Hero'

export const LaunchpadPageLayout = ({ children }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const isExact = router.route === '/launchpads'

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
            href: '/launchpads/history',
          },
        ]}
        activeItem={isExact ? '/launchpads' : '/launchpads/history'}
      /> */}
      <Hero />
      {children}
    </>
  )
}
