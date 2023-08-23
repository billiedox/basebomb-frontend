import styled from 'styled-components'
import { Box, Flex } from '@pancakeswap/uikit'
import Footer from 'components/Menu/Footer'
import { PageMeta } from 'components/Layout/Page'
import { EXCHANGE_DOCS_URLS } from 'config/constants'

const StyledPage = styled.div<{ $removePadding: boolean; $noMinHeight }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ $removePadding }) => ($removePadding ? '0' : '16px')};
  padding-bottom: 0;
  min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 64px)')};
  background: ${({ theme }) => theme.colors.gradients.opacityBack};
  // opacity: .5;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '24px')};
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ $removePadding }) => ($removePadding ? '0' : '32px')};
    padding-bottom: 0;
    min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 100px)')};
  }
`
const StyledBackgroundPage = styled.div`
  position: fixed;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  width: 100%;
  max-width: 1250px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
`
const StyledBack1 = styled.div`
  position: absolute;
  top: 10vw;
  left: 23vw;
  background: radial-gradient(circle at 20% -25%,#aa32af 0,#25b4ce 22.95%,#800597 70.4%,#b4004c 100%);
  opacity: .2;
  height: 400px;
  width: 400px;
  border-radius: 50%;
  -webkit-filter: blur(5px);
  filter: blur(5px);
  z-index: 2;
  -webkit-animation-name: floating-1;
  animation-name: floating-1;
  -webkit-animation-duration: 150s;
  animation-duration: 150s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  @-webkit-keyframes floating-1 {
    0% {
      -webkit-transform: translate(0);
    }
    20% {
      -webkit-transform: translate(-90%, 90%);
    }
    40% {
      -webkit-transform: translate(50%, -80%);
    }
    60% {
      -webkit-transform: translate(-70%, -30%);
    }
    80% {
      -webkit-transform: translate(-10%, -20%);
    }
    100% {
      -webkit-transform: translate(0);
    }
  }

  @keyframes floating-1 {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-90%, 90%);
    }
    40% {
      transform: translate(50%, -80%);
    }
    60% {
      transform: translate(-70%, -30%);
    }
    80% {
      transform: translate(-10%, -20%);
    }
    100% {
      transform: translate(0);
    }
  }
`
const StyledBack2 = styled.div`
  position: absolute;
  bottom: 20px;
  left: 10px;
  background: radial-gradient(circle at 20% -25%,#aa32af 0,#25b4ce 22.95%,#800597 70.4%,#b4004c 100%);
  opacity: .2;
  height: 600px;
  width: 600px;
  border-radius: 50%;
  -webkit-filter: blur(15px);
  filter: blur(15px);
  z-index: 2;
  -webkit-animation-name: floating-2;
  animation-name: floating-2;
  -webkit-animation-duration: 150s;
  animation-duration: 150s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  @-webkit-keyframes floating-2 {
    0% {
      -webkit-transform: translate(0);
    }
    25% {
      -webkit-transform: translate(120px, 120px);
    }
    50% {
      -webkit-transform: translate(-120px);
    }
    75% {
      -webkit-transform: translateY(-120px);
    }
    100% {
      -webkit-transform: translate(0);
    }
  }

  @keyframes floating-2 {
    0% {
      transform: translate(0);
    }
    25% {
      transform: translate(120px, 120px);
    }
    50% {
      transform: translate(-120px);
    }
    75% {
      transform: translateY(-120px);
    }
    100% {
      transform: translate(0);
    }
  }
`

const StyledBack3 = styled.div`
  position: absolute;
  bottom: 180px;
  right: -100px;
  background: radial-gradient(circle at 20% -25%,#aa32af 0,#25b4ce 22.95%,#800597 70.4%,#b4004c 100%);
  opacity: .3;
  height: 800px;
  width: 800px;
  border-radius: 50%;
  -webkit-filter: blur(35px);
  filter: blur(35px);
  z-index: 0;
  -webkit-animation-name: floating-3;
  animation-name: floating-3;
  -webkit-animation-duration: 180s;
  animation-duration: 180s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
  @-webkit-keyframes floating-3 {
    0% {
      -webkit-transform: translate(0);
    }
    20% {
      -webkit-transform: translate(-10%, 20%);
    }
    40% {
      -webkit-transform: translate(30%, -30%);
    }
    60% {
      -webkit-transform: translate(-20%, -30%);
    }
    80% {
      -webkit-transform: translate(-10%,-20%);
    }
    100% {
      -webkit-transform: translate(0);
    }
  }

  @keyframes floating-3 {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-10%, 20%);
    }
    40% {
      transform: translate(30%, -30%);
    }
    60% {
      transform: translate(-20%, -30%);
    }
    80% {
      transform: translate(-10%,-20%);
    }
    100% {
      transform: translate(0);
    }
  }
`

const Page: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    removePadding?: boolean
    hideFooterOnDesktop?: boolean
    noMinHeight?: boolean
    helpUrl?: string
  }
> = ({
  children,
  removePadding = false,
  hideFooterOnDesktop = false,
  noMinHeight = false,
  helpUrl = EXCHANGE_DOCS_URLS,
  ...props
}) => {
  return (
    <>
      <PageMeta />
      <StyledPage $removePadding={removePadding} $noMinHeight={noMinHeight} {...props}>
        <StyledBackgroundPage>
          <StyledBack1 />
          <StyledBack2 />
          <StyledBack3 />
        </StyledBackgroundPage>
        {children}
        <Flex flexGrow={1} />
        <Box display={['block', null, null, hideFooterOnDesktop ? 'none' : 'block']} width="100%">
          {/* <Footer helpUrl={helpUrl} /> */}
        </Box>

      </StyledPage>
    </>
  )
}

export default Page
