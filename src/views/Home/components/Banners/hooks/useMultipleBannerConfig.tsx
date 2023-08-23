import { useMemo } from 'react'
import CompetitionBanner from '../CompetitionBanner'
import IFOBanner from '../IFOBanner'
import LotteryBanner from '../LotteryBanner'
import NewFarmBanner from '../NewFarmBanner'
import useIsRenderIfoBanner from './useIsRenderIFOBanner'
import useIsRenderLotteryBanner from './useIsRenderLotteryBanner'

/**
 * make your custom hook to control should render specific banner or not
 * add new campaign banner easily
 *
 * @example
 * ```ts
 *  {
 *    shouldRender: isRenderIFOBanner,
 *    banner: <IFOBanner />,
 *  },
 * ```
 */
export const useMultipleBannerConfig = () => {
  const isRenderIFOBanner = useIsRenderIfoBanner()
  const isRenderLotteryBanner = useIsRenderLotteryBanner()
  return useMemo(
    () =>
      [
        {
          shouldRender: isRenderIFOBanner,
          banner: <IFOBanner />,
        },
        {
          shouldRender: false,
          banner: <NewFarmBanner />,
        },
        {
          shouldRender: isRenderLotteryBanner,
          banner: <LotteryBanner />,
        },
      ]
        .filter((d) => d.shouldRender)
        .map((d) => d.banner),
    [isRenderIFOBanner, isRenderLotteryBanner],
  )
}
