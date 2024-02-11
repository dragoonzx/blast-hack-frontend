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
    address: '0x28f55fbB7540370446eAef394CB1d3F7921082f2' as AddrString,
  },
  mineblastRouter: {
    abi: mineblastRouterAbi.abi as any,
    address: '0x09f180Fe7e71CFDb27e8b42599a99bBf2F5d3299' as AddrString,
  },
  mineblastLibrary: {
    abi: mineblastLibraryAbi.abi as any,
    address: '0xfe2A32f72b0b6D546E3D366209AAf1F7d0c62A48' as AddrString,
  },
  mineblastPairFactory: {
    abi: mineblastPairFactoryAbi.abi as any,
    address: '0xd28CA1399b460DbD75C51F041954a9718C206e64' as `0x${string}`,
  },
};

type ContractsRecord = {
  [P in keyof typeof typelessContracts]: {
    abi: Abi;
    address?: AddrString;
  };
};

export const contracts: ContractsRecord = typelessContracts;
