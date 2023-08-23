import { FC } from 'react'
import ComingSoon from 'views/ComingSoon'
import Farms, { FarmsContext } from './Farms'

export const FarmsPageLayout: FC = ({ children }) => {
  return <ComingSoon />
  // return <Farms>{children}</Farms>
}

export { FarmsContext }
