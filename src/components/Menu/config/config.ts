import {
  MenuItemsType,
  DropdownMenuItemType,
  SwapIcon,
  SwapFillIcon,
  EarnFillIcon,
  EarnIcon,
  LaunchpadIcon,
  TrophyIcon,
  TrophyFillIcon,
  NftIcon,
  NftFillIcon,
  MoreIcon,
} from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import { perpLangMap } from 'utils/getPerpetualLanguageCode'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean } & {
  items?: ConfigMenuDropDownItemsType[]
}

const config: (t: ContextApi['t'], isDark: boolean, languageCode?: string) => ConfigMenuItemsType[] = (
  t,
  isDark,
  languageCode,
) => [
  {
    label: t('Trade'),
    icon: SwapIcon,
    fillIcon: SwapFillIcon,
    href: '/swap',
    showItemsOnMobile: false,
    items: [],
  },
  {
    label: t('Farms'),
    href: '/farms',
    icon: EarnIcon,
    fillIcon: EarnFillIcon,
    items: [],
  },
  {
    label: t('Pools'),
    href: '/lottery',
    icon: TrophyIcon,
    fillIcon: TrophyFillIcon,
    items: [],
  },
  {
    label: t('Presale'),
    href: '/presale',
    icon: TrophyIcon,
    fillIcon: TrophyFillIcon,
    items: [],
  },
  {
    label: t('Docs'),
    href: 'https://docs.tytan.finance',
    items: [],
  },
]

export default config
