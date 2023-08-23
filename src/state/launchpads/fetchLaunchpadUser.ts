import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import launchpadABI from 'config/abi/launchpad.json'
import erc20ABI from 'config/abi/erc20.json'
import { SerializedLaunchpadConfig } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import { simpleRpcProvider } from 'utils/providers'
import { getBalanceAmount } from 'utils/formatBalance'

export const fetchLaunchpadUserTokenAllowances = async (
  account: string,
  launchpadsToFetch: SerializedLaunchpadConfig[],
) => {
  const bnbLaunchpads = launchpadsToFetch.filter((launchpad) => !launchpad.currency)
  const tokenLaundpads = launchpadsToFetch.filter((launchpad) => launchpad.currency)

  const calls = tokenLaundpads.map((launchpad) => {
    return { address: launchpad.currency.address, name: 'allowance', params: [account, getAddress(launchpad.address)] }
  })

  const rawTokenAllowances = await multicall<BigNumber[]>(erc20ABI, calls)
  const parsedTokenAllowances = tokenLaundpads.reduce(
    (acc, launchpad, index) => ({ ...acc, [launchpad.id]: new BigNumber(rawTokenAllowances[index]).toJSON() }),
    {},
  )
  const bnbAllowances = bnbLaunchpads.reduce(
    (acc, launchpad) => ({ ...acc, [launchpad.id]: new BigNumber(ethers.constants.MaxInt256.toString()).toJSON() }),
    {},
  )
  return { ...parsedTokenAllowances, ...bnbAllowances }
}

export const fetchLaunchpadUserTokenBalances = async (
  account: string,
  launchpadsToFetch: SerializedLaunchpadConfig[],
) => {
  const bnbLaunchpads = launchpadsToFetch.filter((launchpad) => !launchpad.currency)
  const tokenLaundpads = launchpadsToFetch.filter((launchpad) => launchpad.currency)

  const calls = tokenLaundpads.map((launchpad) => {
    return {
      address: launchpad.currency.address,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  let parsedTokenBalances = tokenLaundpads.reduce(
    (acc, launchpad, index) => ({ ...acc, [launchpad.id]: new BigNumber(rawTokenBalances[index]).toJSON() }),
    {},
  )

  for (let i = 0; i < bnbLaunchpads.length; i++) {
    const launchpad = bnbLaunchpads[i]
    // eslint-disable-next-line no-await-in-loop
    const bnbBalance = await simpleRpcProvider.getBalance(account)
    parsedTokenBalances = { ...parsedTokenBalances, [launchpad.id]: new BigNumber(bnbBalance.toString()).toJSON() }
  }

  return parsedTokenBalances
}

export const fetchLaunchpadUserContributedAmounts = async (
  account: string,
  launchpadsToFetch: SerializedLaunchpadConfig[],
) => {
  const calls = launchpadsToFetch.map((launchpad) => {
    return {
      address: getAddress(launchpad.address),
      name: 'funders',
      params: [account],
    }
  })

  const rawContributedAmounts = await multicall(launchpadABI, calls)
  const parsedStakedBalances = launchpadsToFetch.reduce((acc, launchpad, index) => {
    return {
      ...acc,
      [launchpad.id]: {
        amount: getBalanceAmount(
          new BigNumber(rawContributedAmounts[index].amount._hex),
          launchpad.currency?.decimals ?? 18,
        ).toJSON(),
        withdrawableAmount: getBalanceAmount(
          new BigNumber(rawContributedAmounts[index].totalClaimAmount._hex),
          launchpad.currency?.decimals ?? 18,
        ).toJSON(),
        claimedAmount: getBalanceAmount(
          new BigNumber(rawContributedAmounts[index].claimedAmount._hex),
          launchpad.currency?.decimals ?? 18,
        ).toJSON(),
      },
    }
  }, {})
  return parsedStakedBalances
}

export const fetchLaunchpadUserWhitelisted = async (
  account: string,
  launchpadsToFetch: SerializedLaunchpadConfig[],
) => {
  const calls = launchpadsToFetch.map((launchpad) => {
    if (launchpad.isPrivatesale) {
      return {
        address: getAddress(launchpad.address),
        name: 'whitelisted',
        params: [account],
      }
    }
    return {
      address: getAddress(launchpad.address),
      name: 'funders',
      params: [account],
    }
  })

  const rawWhitelisted = await multicall(launchpadABI, calls)
  const parsedWhitelisted = launchpadsToFetch.reduce(
    (acc, launchpad, index) => ({
      ...acc,
      [launchpad.id]: launchpad.isPrivatesale ? rawWhitelisted[index][0] : rawWhitelisted[index].claimed,
    }),
    {},
  )
  return parsedWhitelisted
}
