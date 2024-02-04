import { contracts, config } from './wagmiConfig'
import { readContract } from '@wagmi/core'

interface Vault {
    vault: `0x${string}`, 
    pair: `0x${string}`, 
    token: `0x${string}`
}

export async function getAllVaults(): Promise<Vault[]>{

    const a = contracts.mineblastFactory.abi;

    if(contracts.mineblastFactory.address === undefined){
        return []
    }

    const result: Vault[] = [] 

    const response = (await readContract(config, {
        abi: contracts.mineblastFactory.abi,
        address: contracts.mineblastFactory.address,
        functionName: 'allVaults',
        args: [0],
    })) as [`0x${string}`, `0x${string}`, `0x${string}`]

    result.push({
        vault: response[0],
        pair: response[1],
        token: response[2]
    })

    return result

}
