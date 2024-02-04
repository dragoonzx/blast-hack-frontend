import { contracts, config } from './wagmiConfig'
import { readContract, readContracts } from '@wagmi/core'
import { formatUnits, formatEther } from 'viem'

interface Vault {
    vault: `0x${string}`, 
    pair: `0x${string}`, 
    token: `0x${string}`
}

export interface MineblastProjectData{
    tokenName: string,
    tokenSymbol: string,
    tokenTotalSupply: number,
    tokenPriceInUSD: number
    projectOutputPerSecond: number,
    projectEndDate: Date,
    TVLInUSD: number,
    liqudityInUSD: number,
}

const convertToUSD = (eth: bigint, ethPrice: number): number =>{
    return Number((eth * BigInt(ethPrice)) / 10n**12n) / 1000000
}

const truncate18To3Decimals = (number: bigint): number => {
    return Number(number / 10n**15n) / 1000
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

export async function getVaultData(vault: Vault, ethPrice: number): Promise<MineblastProjectData>{
    const pairContract = {
        address: vault.pair,
        abi: contracts.mineblastPair.abi
    }
    const tokenContract = {
        address: vault.token,
        abi: contracts.erc20.abi
    }
    const vaultContract = {
        address: vault.vault,
        abi: contracts.mineblastVault.abi
    }
    const wethContract: {address: `0x${string}`, abi: any} = {
        address: '0x4200000000000000000000000000000000000023',
        abi: contracts.erc20.abi
    }

    const response = await readContracts(config, {
        contracts:[
            { ...pairContract, functionName: 'getAveragePrice', args: [BigInt("1000000000000000000"), 50] },
            { ...pairContract, functionName: 'getReserves' },
            { ...vaultContract, functionName: 'outputPerSecond' },
            { ...vaultContract, functionName: 'endDate' },
            { ...tokenContract, functionName: 'totalSupply' },
            { ...tokenContract, functionName: 'symbol'},
            { ...tokenContract, functionName: 'name'},
            { ...wethContract, functionName: 'balanceOf', args: [vault.vault] },
        ]
    })

    const tokenName = response[6].result as string
    const tokenSymbol = response[5].result as string
    const tokenTotalSupply = response[4].result as bigint
    const tokenPriceInETH = response[0].result as bigint
    const projectOutputPerSecond = response[2].result as bigint
    const projectEndDate = response[3].result as bigint
    const TVLInETH = response[7].result as bigint
    const liqudityInETH = (response[1].result as bigint[])[0]* 2n

    const result = {
        tokenName,
        tokenSymbol,
        tokenTotalSupply: truncate18To3Decimals(tokenTotalSupply),
        tokenPriceInUSD: convertToUSD(tokenPriceInETH, ethPrice),
        projectOutputPerSecond: truncate18To3Decimals(projectOutputPerSecond),
        projectEndDate: new Date(Number(projectEndDate) * 1000),
        TVLInUSD: convertToUSD(TVLInETH, ethPrice),
        liqudityInUSD: convertToUSD(liqudityInETH, ethPrice)
    }
    console.log(result);

    return result;

}
