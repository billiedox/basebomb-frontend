import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { CHAIN_ID } from './networks'

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
   {
    pid: 0,
    lpSymbol: 'ORB',
    lpAddresses: {
      97: '',
      56: '0x42b98A2f73a282D731b0B8F4ACfB6cAF3565496B',
      43113: '0x42b98A2f73a282D731b0B8F4ACfB6cAF3565496B',
      84531: '0x42b98A2f73a282D731b0B8F4ACfB6cAF3565496B',
      8453: '0x42b98A2f73a282D731b0B8F4ACfB6cAF3565496B'
    },
    token: serializedTokens.syrup,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'ORB-BNB LP',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      56: '0x451a503b59A4DEA428b8eb88D6df27DE8A7fcfe1',
      43113: '0x42b98A2f73a282D731b0B8F4ACfB6cAF3565496B',
      84531: '0x42b98A2f73a282D731b0B8F4ACfB6cAF3565496B',
      8453: '0x42b98A2f73a282D731b0B8F4ACfB6cAF3565496B'
    },
    token: serializedTokens.orb,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x57423151Ad2AAFA5378afbA274D30f5fab0d69Df',
    },
    token: serializedTokens.busd,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'USDT-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x6D8163E9dB6c949e92e49C9B3cdB36C69395b680',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 5,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x5cd108dFa59B8a2713FeCf0e3BeaDA5C58BC9f89',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: 6,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xfeC8Ee2fd97CF04FA7a2013299496E3EdF497EbC',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.btcb,
  },
  {
    pid: 7,
    lpSymbol: 'BTCB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x3ec9B8e424486FCf4923d5e1424B838feee628E8',
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: 8,
    lpSymbol: 'ORB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xE1a104f204c6063B06577d8A7E6C796058494e82',
    },
    token: serializedTokens.orb,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: 9,
    lpSymbol: 'ORB-USDC LP',
    lpAddresses: {
      97: '',
      56: '0xaB5d13feE7B4eCC6B2D019BB16793D18ab8c9982',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.orb,
  },
  {
    pid: 10,
    lpSymbol: 'ETH-USDC LP',
    lpAddresses: {
      97: '',
      56: '0x80fBD8Daa1516ac96c26b02798df6CC4919ef354',
    },
    token: serializedTokens.usdc,
    quoteToken: serializedTokens.eth,
  },
  {
    pid: 19,
    lpSymbol: 'LINK-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x89A07ce088bbec4338e17A61D5B9d4e2cAB5e63e',
    },
    token: serializedTokens.link,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 14,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xc9b39b94a09a1F772CD98fB9DBfC66696C921ab9',
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 11,
    lpSymbol: 'BTCB-ETH LP',
    lpAddresses: {
      97: '',
      56: '0x9fb8c330d0804C6Af7cC3E044cE8717021AaEBCE',
    },
    token: serializedTokens.eth,
    quoteToken: serializedTokens.btcb,
  },
  {
    pid: 12,
    lpSymbol: 'AVAX-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x2111849199aA24C83CB462e86b3BF5E44Cf72cc2',
    },
    token: serializedTokens.avax,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 13,
    lpSymbol: 'AVAX-PIGGY LP',
    lpAddresses: {
      97: '',
      56: '0xE5FcBAad5c0a22375A3Ee2EC7A85707807eDFd29',
    },
    token: serializedTokens.piggy,
    quoteToken: serializedTokens.avax,
  },
  {
    pid: 15,
    lpSymbol: 'MAGIK-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x3Cd3E322f0112a296192E3Dc2742E96D5107DcF8',
    },
    token: serializedTokens.magik,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 17,
    lpSymbol: 'DRIP-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x48ED1d5C8A428c191B94D99bEe674020e8956127',
    },
    token: serializedTokens.drip,
    quoteToken: serializedTokens.busd,
  },
  {
    pid: 18,
    lpSymbol: 'wTYTAN-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x2f60eFd93B1E1dFA93AEd5899d116d0ddeF6A75F',
    },
    token: serializedTokens.wtytan,
    quoteToken: serializedTokens.busd,
  },
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
