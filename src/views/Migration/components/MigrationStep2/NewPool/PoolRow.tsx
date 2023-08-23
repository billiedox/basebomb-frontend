import React, { useState } from 'react'
import styled from 'styled-components'
import useDelayedUnmount from 'hooks/useDelayedUnmount'
import { DeserializedPool } from 'state/types'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { BIG_ZERO } from 'utils/bigNumber'
import NameCell from 'views/Pools/components/PoolsTable/Cells/NameCell'
import AprCell from 'views/Pools/components/PoolsTable/Cells/AprCell'
import AutoAprCell from 'views/Pools/components/PoolsTable/Cells/AutoAprCell'
import ActionPanel from 'views/Pools/components/PoolsTable/ActionPanel/ActionPanel'
import ExpandActionCell from 'views/Pools/components/PoolsTable/Cells/ExpandActionCell'
import AutoEarningsCell from 'views/Pools/components/PoolsTable/Cells/AutoEarningsCell'
import { useMatchBreakpointsContext } from '@pancakeswap/uikit'
import EarningsCell from '../../MigrationStep1/OldPool/Cells/EarningsCell'
import TotalStakedCell from '../../MigrationStep1/OldPool/Cells/TotalStakedCell'
import StakedCell from './Cells/StakedCell'

interface PoolRowProps {
  pool: DeserializedPool
  account: string
}

const StyledRow = styled.div`
  display: flex;
  background-color: transparent;
  cursor: pointer;
`

const PoolRow: React.FC<PoolRowProps> = ({ pool, account }) => {
  const { isXl, isXxl, isXs, isSm, isMd, isLg, isTablet, isDesktop } = useMatchBreakpointsContext()
  const isLargerScreen = isLg || isXl || isXxl
  const isXLargerScreen = isXl || isXxl
  const [expanded, setExpanded] = useState(false)
  const shouldRenderActionPanel = useDelayedUnmount(expanded, 300)

  const { totalCakeInVault } = useVaultPoolByKey(pool.vaultKey)

  const toggleExpanded = () => {
    setExpanded((prev) => !prev)
  }

  return (
    <>
      <StyledRow role="row" onClick={toggleExpanded}>
        <NameCell pool={pool} />
        {isXLargerScreen && pool.vaultKey && <StakedCell pool={pool} account={account} />}
        {pool.vaultKey ? (
          isXLargerScreen && pool.vaultKey && <AutoEarningsCell pool={pool} account={account} />
        ) : (
          <EarningsCell pool={pool} account={account} />
        )}
        {pool.vaultKey ? <AutoAprCell pool={pool} /> : <AprCell pool={pool} />}
        {isLargerScreen && <TotalStakedCell pool={pool} totalCakeInVault={totalCakeInVault} cakeInVaults={BIG_ZERO} />}
        <ExpandActionCell expanded={expanded} isFullLayout={isTablet || isDesktop} />
      </StyledRow>
      {shouldRenderActionPanel && (
        <ActionPanel
          account={account}
          pool={pool}
          expanded={expanded}
          breakpoints={{ isXs, isSm, isMd, isLg, isXl, isXxl }}
        />
      )}
    </>
  )
}

export default PoolRow
