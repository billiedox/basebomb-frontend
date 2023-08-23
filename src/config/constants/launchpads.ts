import { serializeTokens } from './tokens'
import { SerializedLaunchpadConfig } from './types'

const serializedTokens = serializeTokens()

const launchpads: SerializedLaunchpadConfig[] = [
  {
    id: 1,
    address: {

      97: '0x0Ff075BD752Ef55CE0B17458f0292cDbf75Ae6d2',
      56: '0x9DD8bf75C58b9E38B8Fb9FD269F3Bf85ec3967C7',
    },
    isActive: true,
    isPrivatesale: true,
    name: 'DeFirm Finance',
    subTitle: 'Whitelist Presale',
    description:
      "Our goal is to bridge the world of DeFi and real world assets. We have an LLC where we’ll be acquiring assets including property. In the real world we’ll be functioning as private equity. On-chain these assets will be represented through NFTs to generate passive income to holders backed by these assets. NOTE: Token will launch on Avalanche network, your tokens will be airdropped to your address",
    projectSiteUrl: 'https://defirmfinance.com/',
    releaseAt: 0,
    currency: serializedTokens.busd,
    token: serializedTokens.busd,
  },
  {
    id: 2,
    address: {
      97: '0x0Ff075BD752Ef55CE0B17458f0292cDbf75Ae6d2',
      56: '0xca51234f44e02ce8fb06ae64adcb0e03a98441a3',
    },
    isActive: true,
    isPrivatesale: false,
    name: 'DeFirm Finance',
    subTitle: 'Public Presale',
    description:
      "Our goal is to bridge the world of DeFi and real world assets. We have an LLC where we’ll be acquiring assets including property. In the real world we’ll be functioning as private equity. On-chain these assets will be represented through NFTs to generate passive income to holders backed by these assets. NOTE: Token will launch on Avalanche network, your tokens will be airdropped to your address",
    projectSiteUrl: 'https://defirmfinance.com/',
    releaseAt: 0,
    currency: serializedTokens.busd,
    token: serializedTokens.busd,

  }
]

export default launchpads
