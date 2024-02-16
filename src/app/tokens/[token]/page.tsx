'use client';

import React, { use, useEffect, useState } from 'react';
import VaultInfo from '@/components/vault/VaultInfo';
import VaultControlPanel from '@/components/vault/VaultControlPanel';
import AddLiquidityPanel from '@/components/swap/AddLiquidityPanel';

import BuySellSwap from '@/components/swap/BuySellSwap';
import GetWETH from '@/components/swap/GetWETH';
import RemoveLiquidityPanel from '@/components/swap/RemoveLiquidityPanel';
import {
  getAllVaults,
  getProjectData,
  MineblastProjectData,
  getProjectByName
} from '@/lib/onchain';
import { useAccount, useBalance } from 'wagmi';
import { AddrString } from '@/lib/wagmiConfig';
import { parseEther } from 'viem';
import { useReadErc20BalanceOf } from '@/generated';
import Vault404 from '@/components/vault/Vault404';

const TokenPage = ({ params }: { params: {token: string } }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { address, isConnecting, isDisconnected } = useAccount();
  const [notFound, setNotFound] = useState(false);
  const ETHbalance = useBalance({ address });

  const [projectData, setProjectData] = useState<MineblastProjectData>({
    vaultAddress: '0x0',
    pairAddress: '0x0',
    tokenAddress: '0x0',
    tokenName: '...',
    tokenSymbol: '...',
    tokenTotalSupply: 0,
    tokenPriceInUSD: 0,
    projectOutputPerSecond: 0,
    projectEndDate: new Date(Number(10000000000)),
    TVLInUSD: 0,
    pairETHBalanceRaw: 0n,
    pairTokenBalanceRaw: 0n,
  });

  
  const { data: lpTokenBalance, refetch: lpRefetch} = useReadErc20BalanceOf({address: projectData.pairAddress!, args: [address!]});

  const [userVaultData, setUserVaultData] = useState<{
    stakedETH: number;
    pending: number;
    tokenBalance: number;
  }>({ stakedETH: 0, pending: 0, tokenBalance: 0 });

  useEffect(() => {
    fetchProjectData();
  }, [address]);

  const [tokenAddr, setTokenAddr] = useState<AddrString | string>('');

  async function fetchProjectData() {
    const userAddress = address ?? '0x0000000000000000000000000000000000000000';
    const name = params.token;
    
    if(name === '' || name === undefined) return console.error('No name');
    const project = await getProjectByName(name);

    if(project.vault === '0x0000000000000000000000000000000000000000') {
      setNotFound(true);
      return;
    }

    const data = await getProjectData(
      userAddress,
      project,
      ETHPrice
    );

    setTokenAddr(project.token);
    setProjectData(data.projectData);
    setUserVaultData(data.userData);
  }

  const ETHPrice = 2300;

  const updateVaultData = () => {
    fetchProjectData();
  };

  const afterAddLiquidity = () => {
    fetchProjectData();
    lpRefetch();
  }

  const truncate18Decimals = (number: bigint, decimals: number = 4): number => {
    return Number(number / 10n ** BigInt(18 - decimals)) / 10 ** decimals;
  };

  return (
    <div className='w-full flex justify-center'>
      {notFound? 
      <Vault404 className='animate-[scaleIn_0.5s_ease-out] origin-top transition-all'></Vault404>
      :
      <div className="flex items-start justify-center w-full space-x-8 max-w-[1200px]">
        <div className="w-1/2 flex flex-col">
          <VaultInfo projectData={projectData} ETHPrice={ETHPrice} />
          {address && (
            <VaultControlPanel
              className='animate-[scaleIn_0.5s_ease-out] origin-top transition-all'
              projectData={projectData}
              claimableAmount={userVaultData.pending}
              ethLocked={userVaultData.stakedETH}
              ethPrice={ETHPrice}
              afterClaim={updateVaultData}
              afterDeposit={updateVaultData}
              afterWithdraw={updateVaultData}
            />
          )}
        </div>
        <div className="min-w-[360px] space-y-4">
          <BuySellSwap
            pairETHBalance={projectData.pairETHBalanceRaw}
            pairTokenBalance={projectData.pairTokenBalanceRaw}
            tokenAddr={tokenAddr}
          />
          {address && (
            <div className="space-y-4 animate-[scaleIn_0.5s_ease-out] origin-top">
              <AddLiquidityPanel
                projectData={projectData}
                userTokenBalance={parseEther(userVaultData.tokenBalance.toString())}
                userETHBalance={ETHbalance.data?.value ?? 0n}
                afterAddLiquidity={updateVaultData}
              />
              {(lpTokenBalance??0n) > 0n && 
                <RemoveLiquidityPanel
                  className='animate-[scaleIn_0.5s_ease-out] origin-top'
                  projectData={projectData}
                  lpTokenBalance={lpTokenBalance??0n}
                  afterRemoveLiquidity={updateVaultData}
                />
              }
            </div>
          )}
        </div>
      </div>
      }
    </div>
  );
};

export default TokenPage;
