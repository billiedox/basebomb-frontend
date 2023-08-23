import styled from 'styled-components'
import { Button, Heading } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import Link from 'next/link'

const StyledComingSoon = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 300px);
  justify-content: center;
`

const Text = styled(Heading).attrs({ as: 'h3', size: 'lg' })`
  text-align: left;
  font-size: 30px;
`
const ComingSoon = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <Page>
      <StyledComingSoon>
        <Text mb='13px'>{t('Coming soon')}</Text>
        <Link href="/" passHref>
          <Button as="a" scale="sm">
            {t('Back Home')}
          </Button>
        </Link>
      </StyledComingSoon>
    </Page>
  )
}

export default ComingSoon
