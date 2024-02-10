import { contracts, config } from './wagmiConfig';
import { readContract, readContracts } from '@wagmi/core';
import { formatUnits, formatEther } from 'viem';

export const WETH_ADDR = '0x4200000000000000000000000000000000000023';

interface Project {
  vault: `0x${string}`;
  pair: `0x${string}`;
  token: `0x${string}`;
}

export interface MineblastProjectData {
  vaultAddress: `0x${string}`;
  tokenName: string;
  tokenSymbol: string;
  tokenTotalSupply: number;
  tokenPriceInUSD: number;
  projectOutputPerSecond: number;
  projectEndDate: Date;
  //projectDurationInSeconds: number;
  TVLInUSD: number;
  pairETHBalance: number;
}

export interface MineblastUserVaultData {
  stakedETH: number;
  pending: number;
}

const convertToUSD = (eth: bigint, ethPrice: number): number => {
  return Number((eth * BigInt(ethPrice)) / 10n ** 12n) / 1000000;
};

const truncate18Decimals = (number: bigint, decimals: number = 4): number => {
  return Number(number / 10n ** BigInt(18-decimals)) / 10**decimals;
};

export async function getAllVaults(): Promise<Project[]> {
  const a = contracts.mineblastFactory.abi;

  if (contracts.mineblastFactory.address === undefined) {
    return [];
  }

  const result: Project[] = [];

  const response = (await readContract(config, {
    abi: contracts.mineblastFactory.abi,
    address: contracts.mineblastFactory.address,
    functionName: 'allVaults',
    args: [0],
  })) as [`0x${string}`, `0x${string}`, `0x${string}`];

  result.push({
    vault: response[0],
    pair: response[1],
    token: response[2],
  });

  return result;
}

export async function getProjectData(
  user: `0x${string}`,
  project: Project,
  ethPrice: number
): Promise<{
  projectData: MineblastProjectData;
  userData: MineblastUserVaultData;
}> {
  const pairFactoryContract = {
    address: contracts.mineblastPairFactory.address!,
    abi: contracts.mineblastPairFactory.abi,
  };

  const response = (await readContract(config, {
    ...pairFactoryContract,
    functionName: 'getProjectInfo',
    args: [user, project.vault, project.pair, project.token],
  })) as any[];

  const projectData: MineblastProjectData = {
    vaultAddress: project.vault,
    tokenName: response[0],
    tokenSymbol: response[1],
    tokenTotalSupply: truncate18Decimals(response[2]),
    tokenPriceInUSD: convertToUSD(response[3], ethPrice),
    projectOutputPerSecond: truncate18Decimals(response[5]),
    projectEndDate: new Date(Number(response[6]) * 1000),
    TVLInUSD: convertToUSD(response[11], ethPrice),
    pairETHBalance: truncate18Decimals(response[4]),
  };

  const userData: MineblastUserVaultData = {
    stakedETH: truncate18Decimals(response[12]),
    pending: truncate18Decimals(response[13]),
  };

  return { projectData, userData };
}

export async function getVaultData(
  vault: Project,
  ethPrice: number
): Promise<MineblastProjectData> {
  const pairContract = {
    address: vault.pair,
    abi: contracts.mineblastPair.abi,
  };
  const tokenContract = {
    address: vault.token,
    abi: contracts.erc20.abi,
  };
  const vaultContract = {
    address: vault.vault,
    abi: contracts.mineblastVault.abi,
  };
  const wethContract: { address: `0x${string}`; abi: any } = {
    address: WETH_ADDR,
    abi: contracts.weth.abi,
  };

  const response = await readContracts(config, {
    contracts: [
      {
        ...pairContract,
        functionName: 'getAveragePrice',
        args: [BigInt('1000000000000000000'), 50],
      },
      { ...pairContract, functionName: 'getReserves', args: [] },
      { ...vaultContract, functionName: 'outputPerSecond', args: [] },
      { ...vaultContract, functionName: 'endDate', args: [] },
      { ...tokenContract, functionName: 'totalSupply' },
      { ...tokenContract, functionName: 'symbol' },
      { ...tokenContract, functionName: 'name' },
      { ...wethContract, functionName: 'balanceOf', args: [vault.vault] },
      { ...vaultContract, functionName: 'duration', args: [] },
    ],
  });

  const tokenName = response[6].result as string;
  const tokenSymbol = response[5].result as string;
  const tokenTotalSupply = response[4].result as bigint;
  const tokenPriceInETH = response[0].result as bigint;
  const projectOutputPerSecond = response[2].result as bigint;
  const projectEndDate = response[3].result as bigint;
  //const projectDuration = response[8].result as bigint;
  const TVLInETH = response[7].result as bigint;
  const pairETHBalance = (response[1].result as bigint[])[0];

  const result = {
    vaultAddress: vault.vault,
    tokenName,
    tokenSymbol,
    tokenTotalSupply: truncate18Decimals(tokenTotalSupply),
    tokenPriceInUSD: convertToUSD(tokenPriceInETH, ethPrice),
    projectOutputPerSecond: truncate18Decimals(projectOutputPerSecond),
    projectEndDate: new Date(Number(projectEndDate) * 1000),
    //projectDurationInSeconds: Number(projectDuration),
    TVLInUSD: convertToUSD(TVLInETH, ethPrice),
    pairETHBalance: truncate18Decimals(pairETHBalance),
  };
  console.log(result);

  return result;
}

export async function getUserVaultData(
  vaultAddress: `0x${string}`,
  userAddress: `0x${string}`
): Promise<{ stakedETH: number; pending: number }> {
  const vaultContract = {
    address: vaultAddress,
    abi: contracts.mineblastVault.abi,
  };

  const response = await readContracts(config, {
    contracts: [
      { ...vaultContract, functionName: 'userInfo', args: [0, userAddress] },
      { ...vaultContract, functionName: 'getPending', args: [0, userAddress] },
    ],
  });

  const staked = (response[0].result as bigint[])[0];
  const pending = response[1].result as bigint;

  const result = {
    stakedETH: truncate18Decimals(staked),
    pending: truncate18Decimals(pending),
  };

  return result;
}
