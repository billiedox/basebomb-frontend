import { useMemo } from 'react'
import { menuStatus } from '@pancakeswap/uikit'
import { useTheme } from 'styled-components'
import { useTranslation } from '../../../contexts/Localization'
import { useMenuItemsStatus } from './useMenuItemsStatus'
import config, { ConfigMenuItemsType } from '../config/config'

export const useMenuItems = (): ConfigMenuItemsType[] => {
  const {
    t,
    currentLanguage: { code: languageCode },
  } = useTranslation()
  const { isDark } = useTheme()
  const menuItemsStatus = useMenuItemsStatus()

  const menuItems = useMemo(() => {
    return config(t, isDark, languageCode)
  }, [t, isDark, languageCode])

  return useMemo(() => {
    if (menuItemsStatus && Object.keys(menuItemsStatus).length) {
      return menuItems.map((item) => {
        const innerItems = item.items.map((innerItem) => {
          const itemStatus = menuItemsStatus[innerItem.href]
          if (itemStatus) {
            let itemMenuStatus
            if (itemStatus === 'soon') {
              itemMenuStatus = menuStatus.SOON
            } else if (itemStatus === 'live') {
              itemMenuStatus = menuStatus.LIVE
            } else {
              itemMenuStatus = menuStatus.NEW
            }
            return { ...innerItem, status: itemMenuStatus }
          }
          return innerItem
        })
        return { ...item, items: innerItems }
      })
    }
    return menuItems
  }, [menuItems, menuItemsStatus])
}
