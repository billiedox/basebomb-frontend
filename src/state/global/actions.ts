import { createAction } from '@reduxjs/toolkit'
import { ChainId } from '@orbitalswap/sdk'

// fired once when the app reloads but before the app renders
// allows any updates to be applied to store data loaded from localStorage
export const updateVersion = createAction<void>('global/updateVersion')

export const resetUserState = createAction<{ chainId: ChainId }>('global/resetUserState')
