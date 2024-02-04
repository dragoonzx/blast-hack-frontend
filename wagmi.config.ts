import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import {contracts} from './src/lib/wagmiConfig'

const contractsFormatted = Object.entries(contracts).map(([name, contract]) => ({
  name,
  abi: contract.abi,
  address: contract.address || undefined,
}));

export default defineConfig({
  out: 'src/generated.ts',
  contracts: contractsFormatted,
  plugins: [
    react(),
  ],
})
