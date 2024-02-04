import {abi as mineblastPairAbi} from '../../src/abi/swap/MineblastSwapPair.sol/MineblastSwapPair.json'
import {abi as mineblastVaultAbi} from '../../src/abi/MineblastVault.sol/MineblastVault.json'
import {abi as mineblastFactoryAbi} from '../../src/abi/MineblastFactory.sol/MineblastFactory.json'
import {abi as mineblastRouterAbi} from '../../src/abi/swap/MineblastRouter.sol/MineblastRouter.json'
import {abi as mineblastLibraryAbi} from '../../src/abi/swap/libraries/MineblastLibrary.sol/MineblastLibrary.json'
import { Abi, erc20Abi } from 'viem'
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

export const contracts: Record<string, Contract> =  {
  erc20: { abi: erc20Abi },
  mineblastPair: { abi: mineblastPairAbi as any },
  mineblastVault: { abi: mineblastVaultAbi as any },
  mineblastFactory: { abi: mineblastFactoryAbi as any, address: '0xb5787bfD3eAB099A55A308Bf148F8d3972E787A3'},
  mineblastRouter: { abi: mineblastRouterAbi as any, address: '0x2758CFfD8f7FEB64Ac2E977Cc40440Aecd5fb681'},
  mineblastLibrary: { abi: mineblastLibraryAbi as any, address: '0x0B947290432940D2A31027F1dE47C80b66EF134D'}
}
