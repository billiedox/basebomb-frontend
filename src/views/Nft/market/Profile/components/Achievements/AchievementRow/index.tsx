import styled from 'styled-components'
import { AutoRenewIcon, Button, Flex } from '@pancakeswap/uikit'
import { Achievement } from 'state/types'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import { usePointCenterIfoContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import AchievementTitle from 'views/Nft/market/Profile/components/Achievements/AchievementTitle'
import AchievementAvatar from 'views/Nft/market/Profile/components/Achievements/AchievementAvatar'
import AchievementDescription from 'views/Nft/market/Profile/components/Achievements/AchievementDescription'
import PointsLabel from './PointsLabel'

interface AchievementRowProps {
  achievement: Achievement
  onCollectSuccess?: (achievement: Achievement) => void
}

const ActionColumn = styled.div`
  flex: none;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 160px;

    & > button {
      width: 100%;
    }
  }
`

const StyledAchievementRow = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding-bottom: 16px;
  padding-top: 16px;
`

const Details = styled.div`
  flex: 1;
`

const Body = styled(Flex)`
  flex-direction: column;
  flex: 1;
  margin-left: 8px;

  ${({ theme }) => theme.mediaQueries.md} {
    align-items: center;
    flex-direction: row;
  }
`

const AchievementRow: React.FC<AchievementRowProps> = ({ achievement, onCollectSuccess }) => {
  const { t } = useTranslation()
  const pointCenterContract = usePointCenterIfoContract()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: isCollecting } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()

  const handleCollectPoints = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(pointCenterContract, 'getPoints', [achievement.address])
    })
    if (receipt?.status) {
      onCollectSuccess(achievement)
      toastSuccess(t('Points Collected!'), <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
    }
  }

  return (
    <StyledAchievementRow>
      <AchievementAvatar badge={achievement.badge} />
      <Body>
        <Details>
          <AchievementTitle title={achievement.title} />
          <AchievementDescription description={achievement.description} />
        </Details>
        <PointsLabel points={achievement.points} px={[0, null, null, '32px']} mb={['16px', null, null, 0]} />
        <ActionColumn>
          <Button
            onClick={handleCollectPoints}
            isLoading={isCollecting}
            endIcon={isCollecting ? <AutoRenewIcon spin color="currentColor" /> : null}
            disabled={isCollecting}
            variant="secondary"
          >
            {t('Collect')}
          </Button>
        </ActionColumn>
      </Body>
    </StyledAchievementRow>
  )
}

export default AchievementRow
