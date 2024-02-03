import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { erc20Abi } from 'viem'
import {abi as mineblastPairAbi} from './src/abi/swap/MineblastSwapPair.sol/MineblastSwapPair.json'
import {abi as mineblastVaultAbi} from './src/abi/MineblastVault.sol/MineblastVault.json'
import {abi as mineblastFactoryAbi} from './src/abi/MineblastFactory.sol/MineblastFactory.json'
import {abi as mineblastRouterAbi} from './src/abi/swap/MineblastRouter.sol/MineblastRouter.json'
import {abi as mineblastLibraryAbi} from './src/abi/swap/libraries/MineblastLibrary.sol/MineblastLibrary.json'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20Abi,
    },
    {
      name: 'mineblastPair',
      abi: mineblastPairAbi as any,
    },
    {
      name: 'mineblastVault',
      abi: mineblastVaultAbi as any,
    },
    {
      name: 'mineblastFactory',
      abi: mineblastFactoryAbi as any,
      address: '0xb5787bfD3eAB099A55A308Bf148F8d3972E787A3'
    },
    {
      name: 'mineblastRouter',
      abi: mineblastRouterAbi as any,
      address: '0x2758CFfD8f7FEB64Ac2E977Cc40440Aecd5fb681'
    },
    {
      name: 'mineblastLibrary',
      abi: mineblastLibraryAbi as any,
      address: '0x0B947290432940D2A31027F1dE47C80b66EF134D'
    },
  ],
  plugins: [
    react(),
  ],
})
