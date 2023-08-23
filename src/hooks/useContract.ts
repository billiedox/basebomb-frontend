import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  getBep20Contract,
  getCakeContract,
  getBunnyFactoryContract,
  getBunnySpecialContract,
  getPancakeBunniesContract,
  getProfileContract,
  getIfoV1Contract,
  getIfoV2Contract,
  getIfoV3Contract,
  getMasterchefContract,
  getMasterchefV1Contract,
  getPointCenterIfoContract,
  getSouschefContract,
  getClaimRefundContract,
  getTradingCompetitionContractEaster,
  getTradingCompetitionContractFanToken,
  getTradingCompetitionContractMobox,
  getTradingCompetitionContractMoD,
  getEasterNftContract,
  getErc721Contract,
  getCakeVaultV2Contract,
  getPredictionsContract,
  getChainlinkOracleContract,
  getLaunchpadContract,
  getLotteryV2Contract,
  getBunnySpecialCakeVaultContract,
  getBunnySpecialPredictionContract,
  getFarmAuctionContract,
  getBunnySpecialLotteryContract,
  getAnniversaryAchievementContract,
  getNftMarketContract,
  getNftSaleContract,
  getPancakeSquadContract,
  getErc721CollectionContract,
  getBunnySpecialXmasContract,
  getGalaxyNTFClaimingContract,
  getZapContract,
  getCakeFlexibleSideVaultV2Contract,
  getCakePredictionsContract,
  getTokenSaleContarct,
} from 'utils/contractHelpers'
import { getMulticallAddress } from 'utils/addressHelpers'
import {
  Erc20,
  Erc20Bytes32,
  Multicall,
  Weth,
  Cake,
  Erc721collection,
  CakeVaultV2,
  CakeFlexibleSideVaultV2,
} from 'config/abi/types'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { WETH } from '@orbitalswap/sdk'
import IPancakePairABI from '../config/abi/IPancakePair.json'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import ERC20_ABI from '../config/abi/erc20.json'
import WETH_ABI from '../config/abi/weth.json'
import multiCallAbi from '../config/abi/Multicall.json'
import { getContract, getProviderOrSigner } from '../utils'

import { IPancakePair } from '../config/abi/types/IPancakePair'
import { VaultKey } from '../state/types'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getIfoV1Contract(address, library.getSigner()), [address, library])
}

export const useIfoV2Contract = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getIfoV2Contract(address, library.getSigner()), [address, library])
}
export const useLaunchpadContract = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getLaunchpadContract(address, library.getSigner()), [address, library])
}
export const useIfoV3Contract = (address: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getIfoV3Contract(address, library.getSigner()), [address, library])
}

export const useERC20 = (address: string, withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getBep20Contract(address, signer), [address, signer])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string, withSignerIfPossible = true) => {
  const { account, library } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getErc721Contract(address, signer), [address, signer])
}

export const useCake = (): { reader: Cake; signer: Cake } => {
  const { account, library } = useActiveWeb3React()
  return useMemo(
    () => ({
      reader: getCakeContract(null),
      signer: getCakeContract(getProviderOrSigner(library, account)),
    }),
    [account, library],
  )
}

export const useBunnyFactory = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBunnyFactoryContract(library.getSigner()), [library])
}

export const usePancakeBunnies = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getPancakeBunniesContract(library.getSigner()), [library])
}

export const useProfileContract = (withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getProfileContract(signer), [signer])
}

export const useLotteryV2Contract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getLotteryV2Contract(library.getSigner()), [library])
}

export const useMasterchef = (withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getMasterchefContract(signer), [signer])
}

export const useMasterchefV1 = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getMasterchefV1Contract(library.getSigner()), [library])
}

export const useSousChef = (id) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getSouschefContract(id, library.getSigner()), [id, library])
}

export const usePointCenterIfoContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getPointCenterIfoContract(library.getSigner()), [library])
}

export const useBunnySpecialContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialContract(library.getSigner()), [library])
}

export const useClaimRefundContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getClaimRefundContract(library.getSigner()), [library])
}

export const useTradingCompetitionContractEaster = (withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getTradingCompetitionContractEaster(signer), [signer])
}

export const useTradingCompetitionContractFanToken = (withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getTradingCompetitionContractFanToken(signer), [signer])
}

export const useTradingCompetitionContractMobox = (withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getTradingCompetitionContractMobox(signer), [signer])
}

export const useTradingCompetitionContractMoD = (withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getTradingCompetitionContractMoD(signer), [signer])
}

export const useEasterNftContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getEasterNftContract(library.getSigner()), [library])
}

export const useVaultPoolContract = (vaultKey: VaultKey): CakeVaultV2 | CakeFlexibleSideVaultV2 => {
  const { library } = useActiveWeb3React()
  return useMemo(() => {
    if (vaultKey === VaultKey.CakeVault) {
      return getCakeVaultV2Contract(library.getSigner())
    }
    if (vaultKey === VaultKey.CakeFlexibleSideVault) {
      return getCakeFlexibleSideVaultV2Contract(library.getSigner())
    }
    return null
  }, [library, vaultKey])
}

export const useCakeVaultContract = (withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getCakeVaultV2Contract(signer), [signer])
}

export const usePredictionsContract = (address: string, tokenSymbol: string) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => {
    const getPredContract = tokenSymbol === 'CAKE' ? getCakePredictionsContract : getPredictionsContract

    return getPredContract(address, library.getSigner())
  }, [library, address, tokenSymbol])
}

export const useChainlinkOracleContract = (address, withSignerIfPossible = true) => {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getChainlinkOracleContract(address, signer), [signer, address])
}

export const useSpecialBunnyCakeVaultContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialCakeVaultContract(library.getSigner()), [library])
}

export const useSpecialBunnyPredictionContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialPredictionContract(library.getSigner()), [library])
}

export const useBunnySpecialLotteryContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialLotteryContract(library.getSigner()), [library])
}

export const useBunnySpecialXmasContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getBunnySpecialXmasContract(library.getSigner()), [library])
}

export const useAnniversaryAchievementContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getAnniversaryAchievementContract(library.getSigner()), [library])
}

export const useGalaxyNFTClaimingContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getGalaxyNTFClaimingContract(library.getSigner()), [library])
}

export const useNftSaleContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getNftSaleContract(library.getSigner()), [library])
}

export const useTokenSaleContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getTokenSaleContarct(library.getSigner()), [library])
}

export const usePancakeSquadContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getPancakeSquadContract(library.getSigner()), [library])
}

export const useFarmAuctionContract = (withSignerIfPossible = true) => {
  const { account, library } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getFarmAuctionContract(signer), [signer])
}

export const useNftMarketContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getNftMarketContract(library.getSigner()), [library])
}

export const useErc721CollectionContract = (
  collectionAddress: string,
): { reader: Erc721collection; signer: Erc721collection } => {
  const { library, account } = useActiveWeb3React()
  return useMemo(
    () => ({
      reader: getErc721CollectionContract(null, collectionAddress),
      signer: getErc721CollectionContract(getProviderOrSigner(library, account), collectionAddress),
    }),
    [account, library, collectionAddress],
  )
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )

  const canReturnContract = useMemo(
    () => address && ABI && (withSignerIfPossible ? library : true),
    [address, ABI, library, withSignerIfPossible],
  )

  return useMemo(() => {
    if (!canReturnContract) return null
    try {
      return getContract(address, ABI, signer)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, signer, canReturnContract]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWBNBContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<Erc20Bytes32>(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): IPancakePair | null {
  return useContract(pairAddress, IPancakePairABI, withSignerIfPossible)
}

export function useMulticallContract() {
  return useContract<Multicall>(getMulticallAddress(), multiCallAbi, false)
}

export function useZapContract(withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React()
  const signer = useMemo(
    () => (withSignerIfPossible ? getProviderOrSigner(library, account) : null),
    [withSignerIfPossible, library, account],
  )
  return useMemo(() => getZapContract(signer), [signer])
}
