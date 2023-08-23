import { useContext } from 'react'
import { ThemeContext as StyledThemeContext } from 'styled-components'
import { useTheme as useNextTheme } from 'next-themes'

export const COOKIE_THEME_KEY = 'theme'

const useTheme = () => {
  const { resolvedTheme, setTheme } = useNextTheme()
  const theme = useContext(StyledThemeContext)

  return { isDark: resolvedTheme === 'dark', theme, setTheme }
}

export default useTheme
