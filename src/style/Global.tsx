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
    background-image: linear-gradient(0deg, #1F162C 0%, #1F162C 100%), linear-gradient(180deg, #0D1529 0%, rgba(91, 43, 96, 0.00) 100%);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #150D1E;

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
