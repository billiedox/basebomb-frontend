import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import Link from 'next/link'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const NotFound = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <Page>
      <StyledNotFound>
        <LogoIcon isDark={theme.isDark} width="64px" mb="8px" />
        <Heading scale="xxl">404</Heading>
        <Text mb="16px">{t('Oops, page not found.')}</Text>
        <Link href="/" passHref>
          <Button as="a" scale="sm">
            {t('Back Home')}
          </Button>
        </Link>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
