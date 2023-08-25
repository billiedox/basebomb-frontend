import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Inter', sans-serif;
  }
  body {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #060e1b;

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
