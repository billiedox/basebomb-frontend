import { BigNumber } from '@ethersproject/bignumber'
import Trans from 'components/Trans'
import { VaultKey } from 'state/types'
import { CHAIN_ID } from './networks'
import tokens, { serializeTokens } from './tokens'
import { SerializedPoolConfig, PoolCategory } from './types'

const serializedTokens = serializeTokens()

export const MAX_LOCK_DURATION = 31536000
export const UNLOCK_FREE_DURATION = 604800
export const ONE_WEEK_DEFAULT = 604800
export const BOOST_WEIGHT = BigNumber.from('3000000000000')
export const DURATION_FACTOR = BigNumber.from('31536000')

export const vaultPoolConfig = {
  [VaultKey.CakeVaultV1]: {
    name: <Trans>Auto ORB</Trans>,
    description: <Trans>Automatic restaking</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 800000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.orb.address}.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeVault]: {
    name: <Trans>Stake ORB</Trans>,
    description: <Trans>Stake, Earn - And more!</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 800000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.orb.address}.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.CakeFlexibleSideVault]: {
    name: <Trans>Flexible ORB</Trans>,
    description: <Trans>Secondary flexible pool</Trans>,
    autoCompoundFrequency: 5000,
    gasLimit: 800000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.orb.address}.png`,
      secondarySrc: '/images/tokens/autorenew.svg',
    },
  },
  [VaultKey.IfoPool]: {
    name: 'IFO ORB',
    description: <Trans>Stake ORB to participate in IFOs</Trans>,
    autoCompoundFrequency: 1,
    gasLimit: 800000,
    tokenImage: {
      primarySrc: `/images/tokens/${tokens.orb.address}.png`,
      secondarySrc: `/images/tokens/ifo-pool-icon.svg`,
    },
  },
} as const

export const livePools: SerializedPoolConfig[] = [
  {
    sousId: 0,
    stakingToken: serializedTokens.orb,
    earningToken: serializedTokens.orb,
    contractAddress: {
      97: '',
      56: '0xd67a0CE4B1484DBa8dB53349F9b26a3272dB04F5',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.234375',
    sortOrder: 1,
    isFinished: false,
  },
  {
    sousId: 5,
    stakingToken: serializedTokens.wtytan,
    earningToken: serializedTokens.wbnb,
    contractAddress: {
      97: '',
      56: '0xe9f0cF95A2Cb0b3801c19FfB6cC7EcBd98d67d98',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0001215',
    sortOrder: 2,
    isFinished: false,
  },
  {
    sousId: 6,
    stakingToken: serializedTokens.wtytan,
    earningToken: serializedTokens.orb,
    contractAddress: {
      97: '',
      56: '0x9fB686A2c7a3cF743Fd079Bf45CEb93493e2b41b',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.015625',
    sortOrder: 3,
    isFinished: false,
  },
].filter((p) => !!p.contractAddress[CHAIN_ID])

// known finished pools
const finishedPools: SerializedPoolConfig[] = [
  {
    sousId: 1,
    stakingToken: serializedTokens.wtytan,
    earningToken: serializedTokens.wbnb,
    contractAddress: {
      97: '',
      56: '0xda35277302adfbea46403349aa343e342eb3fcb3',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.0001215',
    sortOrder: 5,
    isFinished: true,
  },
  {
    sousId: 2,
    stakingToken: serializedTokens.wtytan,
    earningToken: serializedTokens.busd,
    contractAddress: {
      97: '',
      56: '0xA2Ab00595235E6Adb6F3C9b0D4CbC5e4EeF7C89E',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.01215',
    sortOrder: 3,
    isFinished: true,
  },
  {
    sousId: 3,
    stakingToken: serializedTokens.orb,
    earningToken: serializedTokens.usdibs,
    contractAddress: {
      97: '',
      56: '0xcC040C3B919E3BeeeBf2A79358D78Ebf2A55fb7d',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.01215',
    sortOrder: 4,
    isFinished: true,
  },
  {
    sousId: 4,
    stakingToken: serializedTokens.wtytan,
    earningToken: serializedTokens.orb,
    contractAddress: {
      97: '',
      56: '0x4b122C3FACBb43ffE49E3Cca1441239862a6eecC',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '0.03125',
    sortOrder: 5,
    isFinished: true,
  },
]
  .filter((p) => !!p.contractAddress[CHAIN_ID])
  .map((p) => ({ ...p, isFinished: true }))
export default [...livePools, ...finishedPools]
