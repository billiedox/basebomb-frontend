import { TagProps } from '@pancakeswap/uikit'
import { CancelledTag, ClosedTag, CommunityTag, CoreTag, EndedTag, FilledTag, LiveTag, SoonTag, UpcomingTag, VoteNowTag } from 'components/Tags'
import { LaunchpadStatus } from 'config/constants/types'

interface LaunchpadStateTagProps extends TagProps {
  launchpadState: LaunchpadStatus
}

// 'idle' | 'coming_soon' | 'live' | 'finished'
export const LaunchpadStateTag: React.FC<LaunchpadStateTagProps> = ({ launchpadState, ...props }) => {
  if (launchpadState === 'upcoming') {
    return <UpcomingTag {...props} />
  }

  if (launchpadState === 'live') {
    return <LiveTag {...props} />
  }

  if (launchpadState === 'filled') {
    return <FilledTag {...props} />
  }

  if (launchpadState === 'ended') {
    return <EndedTag {...props} />
  }

  if (launchpadState === 'cancelled') {
    return <CancelledTag {...props} />
  }

  return <ClosedTag {...props} />
}

interface ProposalTypeTagProps extends TagProps {
  isCoreProposal: boolean
}

export const ProposalTypeTag: React.FC<ProposalTypeTagProps> = ({ isCoreProposal, ...props }) => {
  if (isCoreProposal) {
    return <CoreTag {...props} />
  }

  return <CommunityTag {...props} />
}
