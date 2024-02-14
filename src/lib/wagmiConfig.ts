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
    address: '0x337F188f937541Db27213cddb6c6645Eb1eE3e5d' as AddrString,
  },
  mineblastRouter: {
    abi: mineblastRouterAbi.abi as any,
    address: '0xef83EA7d0DFe4ED7eB9b9c2CE5ae057Af2B2CE78' as AddrString,
  },
  mineblastPairFactory: {
    abi: mineblastPairFactoryAbi.abi as any,
    address: '0x0448a767626d4E8CcEE2d5dd7a9964C954E11061' as `0x${string}`,
  },
};

type ContractsRecord = {
  [P in keyof typeof typelessContracts]: {
    abi: Abi;
    address?: AddrString;
  };
};

export const contracts: ContractsRecord = typelessContracts;
