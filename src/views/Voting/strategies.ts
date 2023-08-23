const votePowerAddress = {
  v0: '0xc0FeBE244cE1ea66d27D23012B3D616432433F42',
  v1: '0xE6CCB01cAafc11c21AdCc415BB802FB1cF77d7dE',
}

export const cakeBalanceStrategy = (version: 'v0' | 'v1') => ({
  name: 'contract-call',
  params: {
    address: votePowerAddress[version],
    decimals: 18,
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getOrbBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
})

export const cakeVaultBalanceStrategy = {
  name: 'contract-call',
  params: {
    address: votePowerAddress.v0,
    decimals: 18,
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getOrbVaultBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
}

export const ifoPoolBalanceStrategy = {
  name: 'contract-call',
  params: {
    address: votePowerAddress.v0,
    decimals: 18,
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getIFOPoolBalancee',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
}

export const cakePoolBalanceStrategy = (version: 'v0' | 'v1') => ({
  name: 'contract-call',
  params: {
    address: votePowerAddress[version],
    decimals: 18,
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getOrbPoolBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
})

export const cakeBnbLpBalanceStrategy = (version: 'v0' | 'v1') => ({
  name: 'contract-call',
  params: {
    address: votePowerAddress[version],
    decimals: 18,
    methodABI: {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getOrbBnbLpBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  },
})

export function creatPoolsBalanceStrategy(poolAddress, version: 'v0' | 'v1') {
  return {
    name: 'contract-call',
    params: {
      address: votePowerAddress[version],
      decimals: 18,
      args: ['%{address}', poolAddress],
      methodABI: {
        inputs: [
          {
            internalType: 'address',
            name: '_user',
            type: 'address',
          },
          {
            internalType: 'address[]',
            name: '_pools',
            type: 'address[]',
          },
        ],
        name: 'getPoolsBalance',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    },
  }
}

export function createTotalStrategy(poolAddress, version: 'v0' | 'v1') {
  return {
    name: 'contract-call',
    params: {
      address: votePowerAddress[version],
      decimals: 18,
      args: ['%{address}', poolAddress],
      methodABI: {
        inputs: [
          {
            internalType: 'address',
            name: '_user',
            type: 'address',
          },
          {
            internalType: 'address[]',
            name: '_pools',
            type: 'address[]',
          },
        ],
        name: 'getVotingPower',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    },
  }
}
