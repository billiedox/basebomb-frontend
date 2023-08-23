import {ArrowBackIcon, ArrowForwardIcon, BunnyCardsIcon, Flex, IconButton} from '@pancakeswap/uikit'
import styled from 'styled-components'
import {useGetSortedRoundsCurrentEpoch} from 'state/predictions/hooks'
import Image from "next/image";
import useSwiper from '../hooks/useSwiper'
import SpacePlanetArt from '../../../../public/images/space_planet_art.png'

const StyledPrevNextNav = styled(Flex)`
  align-items: center;
  display: none;
  justify-content: space-between;
  overflow: initial;
  position: relative;
  width: 128px;

  box-shadow: ${({theme}) => theme.shadows.level1};
  border-radius: ${({theme}) => theme.radii.default};
  background-color: ${({theme}) => theme.card.background};

  ${({theme}) => theme.mediaQueries.lg} {
    display: flex;
  }
`

const Icon = styled.div`
  cursor: pointer;
  left: 50%;
  margin-left: -32px;
  position: absolute;
`

const PrevNextNav = () => {
    const {swiper} = useSwiper()
    const {currentEpoch, rounds} = useGetSortedRoundsCurrentEpoch()

    const handlePrevSlide = () => {
        swiper.slidePrev()
    }

    const handleNextSlide = () => {
        swiper.slideNext()
    }

    const handleSlideToLive = () => {
        const currentEpochIndex = rounds.findIndex((round) => round.epoch === currentEpoch)

        swiper.slideTo(currentEpochIndex - 1)
        swiper.update()
    }

    return (
        <StyledPrevNextNav>
            <IconButton variant="text" scale="sm" onClick={handlePrevSlide}>
                <ArrowBackIcon color="primary" width="24px"/>
            </IconButton>
            <Icon onClick={handleSlideToLive}
                  style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 0,
                      transform: 'translateX(-50%) scale(1.3)',
                  }}
            >
                <Image src={SpacePlanetArt}/>
                {/* <BunnyCardsIcon width="64px" /> */}
            </Icon>
            <IconButton variant="text" scale="sm" onClick={handleNextSlide}>
                <ArrowForwardIcon color="primary" width="24px"/>
            </IconButton>
        </StyledPrevNextNav>
    )

}

export default PrevNextNav
