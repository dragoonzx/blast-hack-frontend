import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { erc20Abi } from 'viem'
import {abi as mineblastPairAbi} from './src/abi/swap/MineblastSwapPair.sol/MineblastSwapPair.json'
import {abi as mineblastVaultAbi} from './src/abi/MineblastVault.sol/MineblastVault.json'
import {abi as mineblastFactory} from './src/abi/MineblastFactory.sol/MineblastFactory.json'
import {abi as mineblastRouter} from './src/abi/swap/MineblastRouter.sol/MineblastRouter.json'

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
      abi: mineblastFactory as any,
      address: '0xb5787bfD3eAB099A55A308Bf148F8d3972E787A3'
    },
    {
      name: 'mineblastRouter',
      abi: mineblastRouter as any,
      address: '0x2758CFfD8f7FEB64Ac2E977Cc40440Aecd5fb681'
    }
  ],
  plugins: [
    react(),
  ],
})
