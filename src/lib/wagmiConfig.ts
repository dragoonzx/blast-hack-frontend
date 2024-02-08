import { default as mineblastPairAbi } from '../../src/abi/swap/MineblastSwapPair.sol/MineblastSwapPair.json';
import { default as mineblastPairFactoryAbi } from '../../src/abi/swap/MineblastSwapPairFactory.sol/MineblastSwapPairFactory.json';
import { default as mineblastVaultAbi } from '../../src/abi/MineblastVault.sol/MineblastVault.json';
import { default as mineblastFactoryAbi } from '../../src/abi/MineblastFactory.sol/MineblastFactory.json';
import { default as mineblastRouterAbi } from '../../src/abi/swap/MineblastRouter.sol/MineblastRouter.json';
import { default as mineblastLibraryAbi } from '../../src/abi/swap/libraries/MineblastLibrary.sol/MineblastLibrary.json';
import { default as wethAbi } from '../../src/abi/mocks/RebasingWETHMock.sol/RebasingWETHMock.json';
import { Abi, erc20Abi } from 'viem';
import { createConfig, http } from 'wagmi';
import { blastSepolia } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';
import { type } from 'os';

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [blastSepolia],
    transports: {
      [blastSepolia.id]: http(blastSepolia.rpcUrls.default.http[0]),
    },

    // Required API Keys
    walletConnectProjectId: '',

    // Required App Info
    appName: 'Your App Name',

    // Optional App Info
    appDescription: 'MineBlast',
    appUrl: 'https://mineblast.co', // your app's url
    appIcon: 'https://mineblast.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

export type AddrString = `0x${string}`;

const typelessContracts = {
  erc20: { abi: erc20Abi },
  weth: { abi: wethAbi.abi as any },
  mineblastPair: { abi: mineblastPairAbi.abi as any },
  mineblastVault: { abi: mineblastVaultAbi.abi as any },
  mineblastFactory: {
    abi: mineblastFactoryAbi.abi as any,
    address: '0xDDC21B84Be02E76eF6A541A209CD9a40E02702cA' as AddrString,
  },
  mineblastRouter: {
    abi: mineblastRouterAbi.abi as any,
    address: '0x1ea46f363456655D02b542b70741B1E785e1AB86' as AddrString,
  },
  mineblastLibrary: {
    abi: mineblastLibraryAbi.abi as any,
    address: '0x75c622ddA2E8eEc20724Be2A0A36Cc114Ef3FDeA' as AddrString,
  },
  mineblastPairFactory: {
    abi: mineblastPairFactoryAbi.abi as any,
    address: '0x40530936598eEb8a37EF7EC5fe8aA9e915c511bD' as AddrString,
  },
};

type ContractsRecord = {
  [P in keyof typeof typelessContracts]: {
    abi: Abi;
    address?: AddrString;
  };
};

export const contracts: ContractsRecord = typelessContracts;
