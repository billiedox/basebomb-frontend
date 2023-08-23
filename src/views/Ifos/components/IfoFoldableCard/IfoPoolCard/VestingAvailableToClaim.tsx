import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface VestingAvailableToClaimProps {
  amountToReceive: BigNumber
  percentage: number
  decimals: number
}

const VestingAvailableToClaim: React.FC<VestingAvailableToClaimProps> = ({ amountToReceive, percentage, decimals }) => {
  const { t } = useTranslation()

  const num = useMemo(() => {
    const vestingaPercentage = new BigNumber(100).minus(percentage).div(100)
    const total = new BigNumber(amountToReceive).times(vestingaPercentage)
    return getFullDisplayBalance(total, decimals, 2)
  }, [amountToReceive, percentage, decimals])

  return (
    <Text fontSize="14px" color="textSubtle">
      {t('~%num% available to claim at sales end', { num })}
    </Text>
  )
}

export default VestingAvailableToClaim
