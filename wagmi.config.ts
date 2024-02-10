import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import { contracts } from './src/lib/wagmiConfig';

const contractsFormatted = Object.entries(contracts)
.map(
  ([name, contract]) => ({
    name,
    abi: contract.abi,
    address: contract?.address,
  })
).filter(x => x.name !== "mineblastPairFactory"); //filter bugged out contract




export default defineConfig({
  out: 'src/generated.ts',
  contracts: contractsFormatted,
  plugins: [react()],
});
