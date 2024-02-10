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
  TVLInUSD: number;
  pairETHBalance: number;
  pairTokenBalance: number;
  pairETHBalanceRaw: bigint;
  pairTokenBalanceRaw: bigint;
}

export interface MineblastUserVaultData {
  stakedETH: number;
  pending: number;
  tokenBalance: number;
}

const convertToUSD = (eth: bigint, ethPrice: number): number => {
  return Number((eth * BigInt(ethPrice)) / 10n ** 12n) / 1000000;
};

const truncate18Decimals = (number: bigint, decimals: number = 4): number => {
  return Number(number / 10n ** BigInt(18 - decimals)) / 10 ** decimals;
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
    tokenTotalSupply: truncate18Decimals(BigInt(response[2])),
    tokenPriceInUSD: convertToUSD(BigInt(response[3]), ethPrice),
    projectOutputPerSecond: truncate18Decimals(BigInt(response[6])),
    projectEndDate: new Date(Number(response[7]) * 1000),
    TVLInUSD: convertToUSD(BigInt(response[11]), ethPrice),
    pairETHBalance: truncate18Decimals(BigInt(response[4])),
    pairETHBalanceRaw: response[4],
    pairTokenBalance: truncate18Decimals(BigInt(response[5])),
    pairTokenBalanceRaw: response[5],
  };

  const userData: MineblastUserVaultData = {
    stakedETH: truncate18Decimals(BigInt(response[12])),
    pending: truncate18Decimals(BigInt(response[13])),
    tokenBalance: truncate18Decimals(BigInt(response[14])),
  };

  return { projectData, userData };
}
