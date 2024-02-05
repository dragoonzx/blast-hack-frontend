'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import SwapCard from '@/components/swap/SwapCard';
import SwapCardHeader from '@/components/swap/SwapCardHeader';
import VaultInfo from '@/components/vault/VaultInfo';
import VaultControlPanel from '@/components/vault/VaultControlPanel';

import BuySellSwap from '@/components/swap/BuySellSwap';
import GetWETH from '@/components/swap/GetWETH';
import {
  getAllVaults,
  getVaultData,
  getUserVaultData,
  MineblastProjectData,
} from '@/lib/onchain';
import { useAccount } from 'wagmi';

const TokenPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { address, isConnecting, isDisconnected } = useAccount();

  const [vaultData, setVaultData] = useState<MineblastProjectData>({
    vaultAddress: '0x0',
    tokenName: '...',
    tokenSymbol: '...',
    tokenTotalSupply: 0,
    tokenPriceInUSD: 0,
    projectOutputPerSecond: 0,
    projectEndDate: new Date(Number(10000000000)),
    TVLInUSD: 0,
    liqudityInUSD: 0,
  });

  const [userVaultData, setUserVaultData] = useState<{
    stakedETH: number;
    pending: number;
  }>({ stakedETH: 0, pending: 0 });

  useEffect(() => {
    const fetchVaults = async () => {
      const allVaults = await getAllVaults();
      const vaultData = await getVaultData(allVaults[0], 2300);
      setVaultData(vaultData);

      if (address) {
        const userVaultData = await getUserVaultData(
          allVaults[0].vault,
          address
        );
        setUserVaultData(userVaultData);
      }
    };
    fetchVaults();
  }, [address]);

  const ETHPrice = 2300;

  const getTokensPerETHPerDay = (
    TVLnETH: number,
    outputPerSecond: number
  ): number => {
    if (TVLnETH === 0) {
      return outputPerSecond * 86400;
    }
    return (outputPerSecond * 86400) / TVLnETH;
  };

  const getUserTokensPerSecond = (
    stakedETH: number,
    TVLETH: number,
    outputPerSecond: number
  ): number => {
    return (stakedETH / TVLETH) * outputPerSecond;
  };

  const onClaim = () => {};

  const onDeposit = (amount: number) => {};

  const onWithdraw = (amount: number) => {};

  return (
    <div className="flex items-start justify-center w-full space-x-8">
      <div className="w-1/2 flex flex-col">
        <VaultInfo projectData={vaultData} />
        <VaultControlPanel
          symbol={vaultData.tokenSymbol}
          claimableAmount={userVaultData.pending}
          claimableIncreasePerSecond={getUserTokensPerSecond(
            userVaultData.stakedETH,
            vaultData.TVLInUSD/ETHPrice,
            vaultData.projectOutputPerSecond
          )}
          ethLocked={userVaultData.stakedETH}
          tokensPerETHPerDay={getTokensPerETHPerDay(
            vaultData.TVLInUSD * ETHPrice,
            vaultData.projectOutputPerSecond
          )}
          vaultAddress={vaultData.vaultAddress}
          onClaim={onClaim}
          onDeposit={onDeposit}
          onWithdraw={onWithdraw}
        />
      </div>
      <div className="min-w-[360px] space-y-4">
        <BuySellSwap />
        <GetWETH />
      </div>
    </div>
  );
};

export default TokenPage;
