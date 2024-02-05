import { default as mineblastPairAbi } from '../../src/abi/swap/MineblastSwapPair.sol/MineblastSwapPair.json';
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
    address: '0xC7E62A952AF4A0bCCc8A73446e6243B454F6835D' as `0x${string}`,
  },
  mineblastRouter: {
    abi: mineblastRouterAbi.abi as any,
    address: '0x6f9FcE8f4AE3EF73a887570A1b4544AD52ecb6e7' as `0x${string}`,
  },
  mineblastLibrary: {
    abi: mineblastLibraryAbi.abi as any,
    address: '0x079BF1922a2C849d3edd84396074C9936CA03587' as `0x${string}`,
  },
};
