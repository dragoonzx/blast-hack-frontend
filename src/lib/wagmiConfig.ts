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

type Contract = {
  abi: Abi; // Use the appropriate type for abi
  address?: `0x${string}`; // Make address optional
};

export const contracts = {
  erc20: { abi: erc20Abi },
  weth: { abi: wethAbi.abi as any },
  mineblastPair: { abi: mineblastPairAbi.abi as any },
  mineblastVault: { abi: mineblastVaultAbi.abi as any },
  mineblastFactory: {
    abi: mineblastFactoryAbi.abi as any,
    address: '0xDDC21B84Be02E76eF6A541A209CD9a40E02702cA' as `0x${string}`,
  },
  mineblastRouter: {
    abi: mineblastRouterAbi.abi as any,
    address: '0x1ea46f363456655D02b542b70741B1E785e1AB86' as `0x${string}`,
  },
  mineblastLibrary: {
    abi: mineblastLibraryAbi.abi as any,
    address: '0x75c622ddA2E8eEc20724Be2A0A36Cc114Ef3FDeA' as `0x${string}`,
  },
  mineblastPairFactory: {
    abi: mineblastPairFactoryAbi.abi as any,
    address: '0x40530936598eEb8a37EF7EC5fe8aA9e915c511bD' as `0x${string}`,
  },
};
