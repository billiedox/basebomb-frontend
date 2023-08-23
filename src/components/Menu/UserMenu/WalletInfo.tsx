import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Skeleton, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import tokens from 'config/constants/tokens'
import { FetchStatus } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import useAuth from 'hooks/useAuth'
import useTokenBalance, { useGetBnbBalance } from 'hooks/useTokenBalance'

import { getBaseScanLink, getBscScanLink } from 'utils'
import { formatBigNumber, getFullDisplayBalance } from 'utils/formatBalance'
import CopyAddress from './CopyAddress'

interface WalletInfoProps {
  hasLowBnbBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo: React.FC<WalletInfoProps> = ({ hasLowBnbBalance, onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { balance: cakeBalance, fetchStatus: cakeFetchStatus } = useTokenBalance(tokens.orb.address)
  const { logout } = useAuth()

  const handleLogout = () => {
    onDismiss?.()
    logout()
  }

  return (
    <>
      <Text color="white" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
        {t('Your Address')}
      </Text>
      <CopyAddress account={account} mb="24px" />
      {hasLowBnbBalance && (
        <Message variant="warning" mb="24px">
          <Box>
            <Text fontWeight="bold">{t('ETH Balance Low')}</Text>
            <Text as="p">{t('You need ETH for transaction fees.')}</Text>
          </Box>
        </Message>
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="textSubtle">{t('ETH Balance')}</Text>
        {fetchStatus !== FetchStatus.Fetched ? (
          <Skeleton height="22px" width="60px" />
        ) : (
          <Text>{formatBigNumber(balance, 6)}</Text>
        )}
      </Flex>
      <Flex alignItems="center" justifyContent="end" mb="24px" mt="12px">
        <LinkExternal href={getBaseScanLink(account, 'address')} color="white">{t('View on BaseScan')}</LinkExternal>
      </Flex>
      <Button variant="secondary" width="100%" onClick={handleLogout}>
        {t('Disconnect Wallet')}
      </Button>
    </>
  )
}

export default WalletInfo
