import { useEffect, useState } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  useModal,
  ChainMenu as UIKitChainMenu,
  UserMenuItem,
  UserMenuVariant,
  Box,
  CronosIcon,
} from '@pancakeswap/uikit'
import Trans from 'components/Trans'
import { usePendingTransactions } from 'state/transactions/hooks'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useTranslation } from 'contexts/Localization'
import { NETWORK_LABLES } from 'config/constants/networks'
import WalletModal, { WalletView } from './WalletModal'


const ChainMenu = () => {
  const { t } = useTranslation()
  const { account, error, chainId } = useWeb3React()

  const { hasPendingTransactions, pendingNumber } = usePendingTransactions()
  const avatarSrc = ''
  const [userMenuText, setUserMenuText] = useState<string>('')
  const [userMenuVariable, setUserMenuVariable] = useState<UserMenuVariant>('default')
  const isWrongNetwork: boolean = error && error instanceof UnsupportedChainIdError

  useEffect(() => {
    if (hasPendingTransactions) {
      setUserMenuText(t('%num% Pending', { num: pendingNumber }))
      setUserMenuVariable('pending')
    } else {
      setUserMenuText('')
      setUserMenuVariable('default')
    }
  }, [hasPendingTransactions, pendingNumber, t])


  const UserMenuItems = () => {
    return (
      <>
        <UserMenuItem as="a" disabled={isWrongNetwork} href="https://cro.opbomb.finance">
          <CronosIcon />
          {t('Cronos Chain')}
        </UserMenuItem>
      </>
    )
  }

  if (account) {
    return (
      <UIKitChainMenu account={NETWORK_LABLES[chainId]} avatarSrc={avatarSrc} text={userMenuText} variant={userMenuVariable}>
        <UserMenuItems />
      </UIKitChainMenu>
    )
  }

  if (isWrongNetwork) {
    return (
      // <UIKitChainMenu text={t('Network')} variant="danger">
      //   <UserMenuItems />
      // </UIKitChainMenu>
      <></>
    )
  }
  if (account) {
    return (
      <ConnectWalletButton scale="sm">
        <Box display={['none', , , 'block']}>
          <Trans>Connect Wallet</Trans>
        </Box>
        <Box display={['block', , , 'none']}>
          <Trans>Connect</Trans>
        </Box>
      </ConnectWalletButton>
    )
  }

  return (
    <></>
  )
}

export default ChainMenu
