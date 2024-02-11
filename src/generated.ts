import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mineblastFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mineblastFactoryAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_swapPairFactory', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'vault',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'pair',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'VaultCreated',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'allVaults',
    outputs: [
      { name: 'vault', internalType: 'address', type: 'address' },
      { name: 'pair', internalType: 'address', type: 'address' },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'ownerShareBps', internalType: 'uint16', type: 'uint16' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseProtocolShareBps',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'supply', internalType: 'uint256', type: 'uint256' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'duration', internalType: 'uint64', type: 'uint64' },
      { name: 'ownerSupplyBps', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'createVaultWithNewToken',
    outputs: [
      { name: 'vaultAddress', internalType: 'address', type: 'address' },
      { name: 'pairAddress', internalType: 'address', type: 'address' },
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'maxElements', internalType: 'uint64', type: 'uint64' },
      { name: 'offset', internalType: 'uint64', type: 'uint64' },
    ],
    name: 'getAllVaults',
    outputs: [
      {
        name: '',
        internalType: 'struct MineblastFactory.VaultInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'vault', internalType: 'address', type: 'address' },
          { name: 'pair', internalType: 'address', type: 'address' },
          { name: 'token', internalType: 'address', type: 'address' },
          { name: 'ownerShareBps', internalType: 'uint16', type: 'uint16' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllVaultsLength',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'maxOwnerShareBps',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'protocolShareFromOwnerShareBps',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'swapPairFactory',
    outputs: [
      {
        name: '',
        internalType: 'contract IMineblastSwapPairFactory',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'wethAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

export const mineblastFactoryAddress =
  '0x28f55fbB7540370446eAef394CB1d3F7921082f2' as const

export const mineblastFactoryConfig = {
  address: mineblastFactoryAddress,
  abi: mineblastFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mineblastLibrary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mineblastLibraryAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'factory', internalType: 'address', type: 'address' },
      { name: 'tokenA', internalType: 'address', type: 'address' },
      { name: 'tokenB', internalType: 'address', type: 'address' },
    ],
    name: 'getReserves',
    outputs: [
      { name: 'reserveA', internalType: 'uint256', type: 'uint256' },
      { name: 'reserveB', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
] as const

export const mineblastLibraryAddress =
  '0xfe2A32f72b0b6D546E3D366209AAf1F7d0c62A48' as const

export const mineblastLibraryConfig = {
  address: mineblastLibraryAddress,
  abi: mineblastLibraryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mineblastPair
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mineblastPairAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Burn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Mint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0In',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1In',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount0Out',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount1Out',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Swap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'reserve0',
        internalType: 'uint112',
        type: 'uint112',
        indexed: false,
      },
      {
        name: 'reserve1',
        internalType: 'uint112',
        type: 'uint112',
        indexed: false,
      },
    ],
    name: 'Sync',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MINIMUM_LIQUIDITY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'burn',
    outputs: [
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'cumulativesTimestamps',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountIn', internalType: 'uint112', type: 'uint112' },
      { name: 'maxSecondWindow', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'getAveragePrice',
    outputs: [{ name: 'result', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getReserves',
    outputs: [
      { name: '_reserve0', internalType: 'uint112', type: 'uint112' },
      { name: '_reserve1', internalType: 'uint112', type: 'uint112' },
      { name: '_blockTimestampLast', internalType: 'uint32', type: 'uint32' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_token0', internalType: 'address', type: 'address' },
      { name: '_token1', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mint',
    outputs: [{ name: 'liquidity', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'price0CumulativeLast',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'price1CumulativeLast',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'price1Cumulatives',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount0Out', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1Out', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'swap',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sync',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token0',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token1',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mineblastRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mineblastRouterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_WETHaddr', internalType: 'address payable', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BLAST',
    outputs: [{ name: '', internalType: 'contract IBlast', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WETHaddr',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenA', internalType: 'address', type: 'address' },
      { name: 'tokenB', internalType: 'address', type: 'address' },
      { name: 'amountADesired', internalType: 'uint256', type: 'uint256' },
      { name: 'amountBDesired', internalType: 'uint256', type: 'uint256' },
      { name: 'amountAMin', internalType: 'uint256', type: 'uint256' },
      { name: 'amountBMin', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addLiquidity',
    outputs: [
      { name: 'amountA', internalType: 'uint256', type: 'uint256' },
      { name: 'amountB', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidity', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'amountTokenDesired', internalType: 'uint256', type: 'uint256' },
      { name: 'amountTokenMin', internalType: 'uint256', type: 'uint256' },
      { name: 'amountETHMin', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addLiquidityETH',
    outputs: [
      { name: 'amountToken', internalType: 'uint256', type: 'uint256' },
      { name: 'amountETH', internalType: 'uint256', type: 'uint256' },
      { name: 'liquidity', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'factory',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'reserveIn', internalType: 'uint256', type: 'uint256' },
      { name: 'reserveOut', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAmountIn',
    outputs: [{ name: 'amountIn', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'reserveIn', internalType: 'uint256', type: 'uint256' },
      { name: 'reserveOut', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAmountOut',
    outputs: [{ name: 'amountOut', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'path', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'getAmountsIn',
    outputs: [
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'path', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'getAmountsOut',
    outputs: [
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountA', internalType: 'uint256', type: 'uint256' },
      { name: 'reserveA', internalType: 'uint256', type: 'uint256' },
      { name: 'reserveB', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'quote',
    outputs: [{ name: 'amountB', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenA', internalType: 'address', type: 'address' },
      { name: 'tokenB', internalType: 'address', type: 'address' },
      { name: 'liquidity', internalType: 'uint256', type: 'uint256' },
      { name: 'amountAMin', internalType: 'uint256', type: 'uint256' },
      { name: 'amountBMin', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'removeLiquidity',
    outputs: [
      { name: 'amountA', internalType: 'uint256', type: 'uint256' },
      { name: 'amountB', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'liquidity', internalType: 'uint256', type: 'uint256' },
      { name: 'amountTokenMin', internalType: 'uint256', type: 'uint256' },
      { name: 'amountETHMin', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'removeLiquidityETH',
    outputs: [
      { name: 'amountToken', internalType: 'uint256', type: 'uint256' },
      { name: 'amountETH', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'path', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swapETHForExactTokens',
    outputs: [
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountOutMin', internalType: 'uint256', type: 'uint256' },
      { name: 'path', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swapExactETHForTokens',
    outputs: [
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'amountOutMin', internalType: 'uint256', type: 'uint256' },
      { name: 'path', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swapExactTokensForETH',
    outputs: [
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountIn', internalType: 'uint256', type: 'uint256' },
      { name: 'amountOutMin', internalType: 'uint256', type: 'uint256' },
      { name: 'path', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'amountInMax', internalType: 'uint256', type: 'uint256' },
      { name: 'path', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swapTokensForExactETH',
    outputs: [
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amountOut', internalType: 'uint256', type: 'uint256' },
      { name: 'amountInMax', internalType: 'uint256', type: 'uint256' },
      { name: 'path', internalType: 'address[]', type: 'address[]' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'swapTokensForExactTokens',
    outputs: [
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

export const mineblastRouterAddress =
  '0x09f180Fe7e71CFDb27e8b42599a99bBf2F5d3299' as const

export const mineblastRouterConfig = {
  address: mineblastRouterAddress,
  abi: mineblastRouterAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// mineblastVault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mineblastVaultAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_outputToken', internalType: 'address', type: 'address' },
      { name: '_swapPair', internalType: 'address', type: 'address' },
      { name: '_duration', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'EmergencyWithdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Harvest',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'outputPerSecond',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LogOutputPerSecond',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'allocPoint',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'lpToken',
        internalType: 'contract IERC20',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'LogPoolAddition',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'allocPoint',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LogSetPool',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'lastRewardTime',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
      {
        name: 'lpSupply',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'accPerShare',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LogUpdatePool',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'pid', internalType: 'uint256', type: 'uint256', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BLAST',
    outputs: [{ name: '', internalType: 'contract IBlast', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'OUTPUT_TOKEN',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'addedTokens',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'depositTokens',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'duration',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'endDate',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_pid', internalType: 'uint256', type: 'uint256' },
      { name: '_user', internalType: 'address', type: 'address' },
    ],
    name: 'getPending',
    outputs: [{ name: 'pending', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getUnlocked',
    outputs: [
      { name: 'unlockedAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'harvest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'initialSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'supply', internalType: 'uint256', type: 'uint256' }],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastOutputChangeDate',
    outputs: [{ name: '', internalType: 'uint64', type: 'uint64' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pids', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'massUpdatePools',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'outputPerSecond',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'poolInfo',
    outputs: [
      { name: 'accPerShare', internalType: 'uint128', type: 'uint128' },
      { name: 'lastRewardTime', internalType: 'uint64', type: 'uint64' },
      { name: 'allocPoint', internalType: 'uint64', type: 'uint64' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'poolLength',
    outputs: [{ name: 'pools', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sentToLP',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'swapPair',
    outputs: [
      { name: '', internalType: 'contract MineblastSwapPair', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAllocPoint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unlocked',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pid', internalType: 'uint256', type: 'uint256' }],
    name: 'updatePool',
    outputs: [
      {
        name: 'pool',
        internalType: 'struct MineblastVault.PoolInfo',
        type: 'tuple',
        components: [
          { name: 'accPerShare', internalType: 'uint128', type: 'uint128' },
          { name: 'lastRewardTime', internalType: 'uint64', type: 'uint64' },
          { name: 'allocPoint', internalType: 'uint64', type: 'uint64' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'userInfo',
    outputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'rewardDebt', internalType: 'int256', type: 'int256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'weth',
    outputs: [{ name: '', internalType: 'contract WETH', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pid', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawAndHarvest',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawAndUnwrap',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'wrapAndDeposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'yieldToLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// weth
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const wethAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawal',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'claim',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'claimable',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'enum YieldMode', type: 'uint8' }],
    name: 'configure',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'getClaimableAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setClaimable',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastFactoryAbi}__
 */
export const useReadMineblastFactory = /*#__PURE__*/ createUseReadContract({
  abi: mineblastFactoryAbi,
  address: mineblastFactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"allVaults"`
 */
export const useReadMineblastFactoryAllVaults =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'allVaults',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"baseProtocolShareBps"`
 */
export const useReadMineblastFactoryBaseProtocolShareBps =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'baseProtocolShareBps',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"getAllVaults"`
 */
export const useReadMineblastFactoryGetAllVaults =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'getAllVaults',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"getAllVaultsLength"`
 */
export const useReadMineblastFactoryGetAllVaultsLength =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'getAllVaultsLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"maxOwnerShareBps"`
 */
export const useReadMineblastFactoryMaxOwnerShareBps =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'maxOwnerShareBps',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMineblastFactoryOwner = /*#__PURE__*/ createUseReadContract(
  {
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'owner',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"protocolShareFromOwnerShareBps"`
 */
export const useReadMineblastFactoryProtocolShareFromOwnerShareBps =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'protocolShareFromOwnerShareBps',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"swapPairFactory"`
 */
export const useReadMineblastFactorySwapPairFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'swapPairFactory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"wethAddress"`
 */
export const useReadMineblastFactoryWethAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'wethAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastFactoryAbi}__
 */
export const useWriteMineblastFactory = /*#__PURE__*/ createUseWriteContract({
  abi: mineblastFactoryAbi,
  address: mineblastFactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"createVaultWithNewToken"`
 */
export const useWriteMineblastFactoryCreateVaultWithNewToken =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'createVaultWithNewToken',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMineblastFactoryRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMineblastFactoryTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastFactoryAbi}__
 */
export const useSimulateMineblastFactory =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"createVaultWithNewToken"`
 */
export const useSimulateMineblastFactoryCreateVaultWithNewToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'createVaultWithNewToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMineblastFactoryRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMineblastFactoryTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastFactoryAbi}__
 */
export const useWatchMineblastFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMineblastFactoryOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastFactoryAbi}__ and `eventName` set to `"VaultCreated"`
 */
export const useWatchMineblastFactoryVaultCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastFactoryAbi,
    address: mineblastFactoryAddress,
    eventName: 'VaultCreated',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastLibraryAbi}__
 */
export const useReadMineblastLibrary = /*#__PURE__*/ createUseReadContract({
  abi: mineblastLibraryAbi,
  address: mineblastLibraryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastLibraryAbi}__ and `functionName` set to `"getReserves"`
 */
export const useReadMineblastLibraryGetReserves =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastLibraryAbi,
    address: mineblastLibraryAddress,
    functionName: 'getReserves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__
 */
export const useReadMineblastPair = /*#__PURE__*/ createUseReadContract({
  abi: mineblastPairAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadMineblastPairDomainSeparator =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"MINIMUM_LIQUIDITY"`
 */
export const useReadMineblastPairMinimumLiquidity =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'MINIMUM_LIQUIDITY',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"PERMIT_TYPEHASH"`
 */
export const useReadMineblastPairPermitTypehash =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'PERMIT_TYPEHASH',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadMineblastPairAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadMineblastPairBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"cumulativesTimestamps"`
 */
export const useReadMineblastPairCumulativesTimestamps =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'cumulativesTimestamps',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadMineblastPairDecimals = /*#__PURE__*/ createUseReadContract(
  { abi: mineblastPairAbi, functionName: 'decimals' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"factory"`
 */
export const useReadMineblastPairFactory = /*#__PURE__*/ createUseReadContract({
  abi: mineblastPairAbi,
  functionName: 'factory',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"getAveragePrice"`
 */
export const useReadMineblastPairGetAveragePrice =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'getAveragePrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"getReserves"`
 */
export const useReadMineblastPairGetReserves =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'getReserves',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"name"`
 */
export const useReadMineblastPairName = /*#__PURE__*/ createUseReadContract({
  abi: mineblastPairAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadMineblastPairNonces = /*#__PURE__*/ createUseReadContract({
  abi: mineblastPairAbi,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"price0CumulativeLast"`
 */
export const useReadMineblastPairPrice0CumulativeLast =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'price0CumulativeLast',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"price1CumulativeLast"`
 */
export const useReadMineblastPairPrice1CumulativeLast =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'price1CumulativeLast',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"price1Cumulatives"`
 */
export const useReadMineblastPairPrice1Cumulatives =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'price1Cumulatives',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadMineblastPairSymbol = /*#__PURE__*/ createUseReadContract({
  abi: mineblastPairAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"token0"`
 */
export const useReadMineblastPairToken0 = /*#__PURE__*/ createUseReadContract({
  abi: mineblastPairAbi,
  functionName: 'token0',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"token1"`
 */
export const useReadMineblastPairToken1 = /*#__PURE__*/ createUseReadContract({
  abi: mineblastPairAbi,
  functionName: 'token1',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadMineblastPairTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastPairAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastPairAbi}__
 */
export const useWriteMineblastPair = /*#__PURE__*/ createUseWriteContract({
  abi: mineblastPairAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteMineblastPairApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastPairAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteMineblastPairBurn = /*#__PURE__*/ createUseWriteContract({
  abi: mineblastPairAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteMineblastPairInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastPairAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteMineblastPairMint = /*#__PURE__*/ createUseWriteContract({
  abi: mineblastPairAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteMineblastPairPermit = /*#__PURE__*/ createUseWriteContract(
  { abi: mineblastPairAbi, functionName: 'permit' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"swap"`
 */
export const useWriteMineblastPairSwap = /*#__PURE__*/ createUseWriteContract({
  abi: mineblastPairAbi,
  functionName: 'swap',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"sync"`
 */
export const useWriteMineblastPairSync = /*#__PURE__*/ createUseWriteContract({
  abi: mineblastPairAbi,
  functionName: 'sync',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteMineblastPairTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastPairAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteMineblastPairTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastPairAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastPairAbi}__
 */
export const useSimulateMineblastPair = /*#__PURE__*/ createUseSimulateContract(
  { abi: mineblastPairAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateMineblastPairApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastPairAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateMineblastPairBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastPairAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateMineblastPairInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastPairAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateMineblastPairMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastPairAbi,
    functionName: 'mint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateMineblastPairPermit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastPairAbi,
    functionName: 'permit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"swap"`
 */
export const useSimulateMineblastPairSwap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastPairAbi,
    functionName: 'swap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"sync"`
 */
export const useSimulateMineblastPairSync =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastPairAbi,
    functionName: 'sync',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateMineblastPairTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastPairAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastPairAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateMineblastPairTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastPairAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastPairAbi}__
 */
export const useWatchMineblastPairEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: mineblastPairAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastPairAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchMineblastPairApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastPairAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastPairAbi}__ and `eventName` set to `"Burn"`
 */
export const useWatchMineblastPairBurnEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastPairAbi,
    eventName: 'Burn',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastPairAbi}__ and `eventName` set to `"Mint"`
 */
export const useWatchMineblastPairMintEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastPairAbi,
    eventName: 'Mint',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastPairAbi}__ and `eventName` set to `"Swap"`
 */
export const useWatchMineblastPairSwapEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastPairAbi,
    eventName: 'Swap',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastPairAbi}__ and `eventName` set to `"Sync"`
 */
export const useWatchMineblastPairSyncEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastPairAbi,
    eventName: 'Sync',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastPairAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchMineblastPairTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastPairAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastRouterAbi}__
 */
export const useReadMineblastRouter = /*#__PURE__*/ createUseReadContract({
  abi: mineblastRouterAbi,
  address: mineblastRouterAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"BLAST"`
 */
export const useReadMineblastRouterBlast = /*#__PURE__*/ createUseReadContract({
  abi: mineblastRouterAbi,
  address: mineblastRouterAddress,
  functionName: 'BLAST',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"WETHaddr"`
 */
export const useReadMineblastRouterWetHaddr =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'WETHaddr',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"factory"`
 */
export const useReadMineblastRouterFactory =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'factory',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"getAmountIn"`
 */
export const useReadMineblastRouterGetAmountIn =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'getAmountIn',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"getAmountOut"`
 */
export const useReadMineblastRouterGetAmountOut =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'getAmountOut',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"getAmountsIn"`
 */
export const useReadMineblastRouterGetAmountsIn =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'getAmountsIn',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"getAmountsOut"`
 */
export const useReadMineblastRouterGetAmountsOut =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'getAmountsOut',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"quote"`
 */
export const useReadMineblastRouterQuote = /*#__PURE__*/ createUseReadContract({
  abi: mineblastRouterAbi,
  address: mineblastRouterAddress,
  functionName: 'quote',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastRouterAbi}__
 */
export const useWriteMineblastRouter = /*#__PURE__*/ createUseWriteContract({
  abi: mineblastRouterAbi,
  address: mineblastRouterAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useWriteMineblastRouterAddLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'addLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"addLiquidityETH"`
 */
export const useWriteMineblastRouterAddLiquidityEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'addLiquidityETH',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useWriteMineblastRouterRemoveLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'removeLiquidity',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"removeLiquidityETH"`
 */
export const useWriteMineblastRouterRemoveLiquidityEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'removeLiquidityETH',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapETHForExactTokens"`
 */
export const useWriteMineblastRouterSwapEthForExactTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapETHForExactTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapExactETHForTokens"`
 */
export const useWriteMineblastRouterSwapExactEthForTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapExactETHForTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapExactTokensForETH"`
 */
export const useWriteMineblastRouterSwapExactTokensForEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapExactTokensForETH',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapExactTokensForTokens"`
 */
export const useWriteMineblastRouterSwapExactTokensForTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapExactTokensForTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapTokensForExactETH"`
 */
export const useWriteMineblastRouterSwapTokensForExactEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapTokensForExactETH',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapTokensForExactTokens"`
 */
export const useWriteMineblastRouterSwapTokensForExactTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapTokensForExactTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastRouterAbi}__
 */
export const useSimulateMineblastRouter =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"addLiquidity"`
 */
export const useSimulateMineblastRouterAddLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'addLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"addLiquidityETH"`
 */
export const useSimulateMineblastRouterAddLiquidityEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'addLiquidityETH',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"removeLiquidity"`
 */
export const useSimulateMineblastRouterRemoveLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'removeLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"removeLiquidityETH"`
 */
export const useSimulateMineblastRouterRemoveLiquidityEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'removeLiquidityETH',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapETHForExactTokens"`
 */
export const useSimulateMineblastRouterSwapEthForExactTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapETHForExactTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapExactETHForTokens"`
 */
export const useSimulateMineblastRouterSwapExactEthForTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapExactETHForTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapExactTokensForETH"`
 */
export const useSimulateMineblastRouterSwapExactTokensForEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapExactTokensForETH',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapExactTokensForTokens"`
 */
export const useSimulateMineblastRouterSwapExactTokensForTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapExactTokensForTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapTokensForExactETH"`
 */
export const useSimulateMineblastRouterSwapTokensForExactEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapTokensForExactETH',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastRouterAbi}__ and `functionName` set to `"swapTokensForExactTokens"`
 */
export const useSimulateMineblastRouterSwapTokensForExactTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastRouterAbi,
    address: mineblastRouterAddress,
    functionName: 'swapTokensForExactTokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__
 */
export const useReadMineblastVault = /*#__PURE__*/ createUseReadContract({
  abi: mineblastVaultAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"BLAST"`
 */
export const useReadMineblastVaultBlast = /*#__PURE__*/ createUseReadContract({
  abi: mineblastVaultAbi,
  functionName: 'BLAST',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"OUTPUT_TOKEN"`
 */
export const useReadMineblastVaultOutputToken =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'OUTPUT_TOKEN',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"addedTokens"`
 */
export const useReadMineblastVaultAddedTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'addedTokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"depositTokens"`
 */
export const useReadMineblastVaultDepositTokens =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'depositTokens',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"duration"`
 */
export const useReadMineblastVaultDuration =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'duration',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"endDate"`
 */
export const useReadMineblastVaultEndDate = /*#__PURE__*/ createUseReadContract(
  { abi: mineblastVaultAbi, functionName: 'endDate' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"getPending"`
 */
export const useReadMineblastVaultGetPending =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'getPending',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"getUnlocked"`
 */
export const useReadMineblastVaultGetUnlocked =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'getUnlocked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"initialSupply"`
 */
export const useReadMineblastVaultInitialSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'initialSupply',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"lastOutputChangeDate"`
 */
export const useReadMineblastVaultLastOutputChangeDate =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'lastOutputChangeDate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"outputPerSecond"`
 */
export const useReadMineblastVaultOutputPerSecond =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'outputPerSecond',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"owner"`
 */
export const useReadMineblastVaultOwner = /*#__PURE__*/ createUseReadContract({
  abi: mineblastVaultAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"poolInfo"`
 */
export const useReadMineblastVaultPoolInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'poolInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"poolLength"`
 */
export const useReadMineblastVaultPoolLength =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'poolLength',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"sentToLP"`
 */
export const useReadMineblastVaultSentToLp =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'sentToLP',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"swapPair"`
 */
export const useReadMineblastVaultSwapPair =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'swapPair',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"totalAllocPoint"`
 */
export const useReadMineblastVaultTotalAllocPoint =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'totalAllocPoint',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"unlocked"`
 */
export const useReadMineblastVaultUnlocked =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'unlocked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"userInfo"`
 */
export const useReadMineblastVaultUserInfo =
  /*#__PURE__*/ createUseReadContract({
    abi: mineblastVaultAbi,
    functionName: 'userInfo',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"weth"`
 */
export const useReadMineblastVaultWeth = /*#__PURE__*/ createUseReadContract({
  abi: mineblastVaultAbi,
  functionName: 'weth',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__
 */
export const useWriteMineblastVault = /*#__PURE__*/ createUseWriteContract({
  abi: mineblastVaultAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteMineblastVaultDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"emergencyWithdraw"`
 */
export const useWriteMineblastVaultEmergencyWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'emergencyWithdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"harvest"`
 */
export const useWriteMineblastVaultHarvest =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'harvest',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteMineblastVaultInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"massUpdatePools"`
 */
export const useWriteMineblastVaultMassUpdatePools =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'massUpdatePools',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteMineblastVaultRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteMineblastVaultTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"updatePool"`
 */
export const useWriteMineblastVaultUpdatePool =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'updatePool',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteMineblastVaultWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"withdrawAndHarvest"`
 */
export const useWriteMineblastVaultWithdrawAndHarvest =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'withdrawAndHarvest',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"withdrawAndUnwrap"`
 */
export const useWriteMineblastVaultWithdrawAndUnwrap =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'withdrawAndUnwrap',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"wrapAndDeposit"`
 */
export const useWriteMineblastVaultWrapAndDeposit =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'wrapAndDeposit',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"yieldToLiquidity"`
 */
export const useWriteMineblastVaultYieldToLiquidity =
  /*#__PURE__*/ createUseWriteContract({
    abi: mineblastVaultAbi,
    functionName: 'yieldToLiquidity',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__
 */
export const useSimulateMineblastVault =
  /*#__PURE__*/ createUseSimulateContract({ abi: mineblastVaultAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateMineblastVaultDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'deposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"emergencyWithdraw"`
 */
export const useSimulateMineblastVaultEmergencyWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'emergencyWithdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"harvest"`
 */
export const useSimulateMineblastVaultHarvest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'harvest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateMineblastVaultInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"massUpdatePools"`
 */
export const useSimulateMineblastVaultMassUpdatePools =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'massUpdatePools',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateMineblastVaultRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateMineblastVaultTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"updatePool"`
 */
export const useSimulateMineblastVaultUpdatePool =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'updatePool',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateMineblastVaultWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"withdrawAndHarvest"`
 */
export const useSimulateMineblastVaultWithdrawAndHarvest =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'withdrawAndHarvest',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"withdrawAndUnwrap"`
 */
export const useSimulateMineblastVaultWithdrawAndUnwrap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'withdrawAndUnwrap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"wrapAndDeposit"`
 */
export const useSimulateMineblastVaultWrapAndDeposit =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'wrapAndDeposit',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link mineblastVaultAbi}__ and `functionName` set to `"yieldToLiquidity"`
 */
export const useSimulateMineblastVaultYieldToLiquidity =
  /*#__PURE__*/ createUseSimulateContract({
    abi: mineblastVaultAbi,
    functionName: 'yieldToLiquidity',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastVaultAbi}__
 */
export const useWatchMineblastVaultEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: mineblastVaultAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastVaultAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchMineblastVaultDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastVaultAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastVaultAbi}__ and `eventName` set to `"EmergencyWithdraw"`
 */
export const useWatchMineblastVaultEmergencyWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastVaultAbi,
    eventName: 'EmergencyWithdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastVaultAbi}__ and `eventName` set to `"Harvest"`
 */
export const useWatchMineblastVaultHarvestEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastVaultAbi,
    eventName: 'Harvest',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastVaultAbi}__ and `eventName` set to `"LogOutputPerSecond"`
 */
export const useWatchMineblastVaultLogOutputPerSecondEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastVaultAbi,
    eventName: 'LogOutputPerSecond',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastVaultAbi}__ and `eventName` set to `"LogPoolAddition"`
 */
export const useWatchMineblastVaultLogPoolAdditionEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastVaultAbi,
    eventName: 'LogPoolAddition',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastVaultAbi}__ and `eventName` set to `"LogSetPool"`
 */
export const useWatchMineblastVaultLogSetPoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastVaultAbi,
    eventName: 'LogSetPool',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastVaultAbi}__ and `eventName` set to `"LogUpdatePool"`
 */
export const useWatchMineblastVaultLogUpdatePoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastVaultAbi,
    eventName: 'LogUpdatePool',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastVaultAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchMineblastVaultOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastVaultAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link mineblastVaultAbi}__ and `eventName` set to `"Withdraw"`
 */
export const useWatchMineblastVaultWithdrawEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: mineblastVaultAbi,
    eventName: 'Withdraw',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__
 */
export const useReadWeth = /*#__PURE__*/ createUseReadContract({ abi: wethAbi })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const useReadWethDomainSeparator = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  functionName: 'DOMAIN_SEPARATOR',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadWethAllowance = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadWethBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"claimable"`
 */
export const useReadWethClaimable = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  functionName: 'claimable',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadWethDecimals = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"getClaimableAmount"`
 */
export const useReadWethGetClaimableAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: wethAbi,
    functionName: 'getClaimableAmount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"name"`
 */
export const useReadWethName = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"nonces"`
 */
export const useReadWethNonces = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  functionName: 'nonces',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadWethSymbol = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadWethTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: wethAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__
 */
export const useWriteWeth = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteWethApprove = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteWethBurn = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteWethClaim = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  functionName: 'claim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"configure"`
 */
export const useWriteWethConfigure = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  functionName: 'configure',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"deposit"`
 */
export const useWriteWethDeposit = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteWethMint = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"permit"`
 */
export const useWriteWethPermit = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  functionName: 'permit',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"setClaimable"`
 */
export const useWriteWethSetClaimable = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  functionName: 'setClaimable',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteWethTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteWethTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteWethWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: wethAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__
 */
export const useSimulateWeth = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateWethApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateWethBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateWethClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  functionName: 'claim',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"configure"`
 */
export const useSimulateWethConfigure = /*#__PURE__*/ createUseSimulateContract(
  { abi: wethAbi, functionName: 'configure' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"deposit"`
 */
export const useSimulateWethDeposit = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  functionName: 'deposit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateWethMint = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"permit"`
 */
export const useSimulateWethPermit = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  functionName: 'permit',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"setClaimable"`
 */
export const useSimulateWethSetClaimable =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wethAbi,
    functionName: 'setClaimable',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateWethTransfer = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateWethTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: wethAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link wethAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateWethWithdraw = /*#__PURE__*/ createUseSimulateContract({
  abi: wethAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wethAbi}__
 */
export const useWatchWethEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: wethAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wethAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchWethApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wethAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wethAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchWethDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wethAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wethAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchWethTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wethAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link wethAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const useWatchWethWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: wethAbi,
    eventName: 'Withdrawal',
  })
