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
} from '../../../lib/onchain';
import { useAccount } from 'wagmi';

const TokenPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { address, isConnecting, isDisconnected } = useAccount();

  const [vaultData, setVaultData] = useState<MineblastProjectData>({
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
    staked: number;
    pending: number;
  }>({ staked: 0, pending: 0 });

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
      }
    };
    fetchVaults();
  }, [address]);

  const getAPR = (
    TVL: number,
    outputPerSecond: number,
    tokenPriceUSD: number
  ): number => {
    if (TVL > 1) {
      return ((outputPerSecond * 31536000) / TVL) * 100 * tokenPriceUSD;
    } else {
      return 0;
    }
  };

  const getTokensLeft = (
    tokensSupply: number,
    outputPerSecond: number,
    endDate: Date
  ): number => {
    const timeLeft = Math.floor(
      (endDate.getTime() - new Date().getTime()) / 1000
    );
    return tokensSupply - outputPerSecond * timeLeft;
  };

  const getUserTokensPerSecond = (
    staked: number,
    TVL: number,
    outputPerSecond: number
  ): number => {
    return (staked / TVL) * outputPerSecond;
  };

  const onClaim = () => {};

  const onDeposit = (amount: number) => {};

  const onWithdraw = (amount: number) => {};

  return (
    <div className="flex items-start justify-center w-full space-x-8">
      <div className="w-1/2 flex flex-col">
        <VaultInfo
          name={vaultData.tokenName}
          APR={getAPR(
            vaultData.TVLInUSD,
            vaultData.projectOutputPerSecond,
            vaultData.tokenPriceInUSD
          )}
          TVL={vaultData.TVLInUSD}
          tokensSupply={vaultData.tokenTotalSupply}
          tokensLeft={getTokensLeft(
            vaultData.tokenTotalSupply,
            vaultData.projectOutputPerSecond,
            vaultData.projectEndDate
          )}
          endDate={vaultData.projectEndDate}
          ownerShare={10}
          liqudity={vaultData.liqudityInUSD}
        />
        <VaultControlPanel
          symbol={vaultData.tokenSymbol}
          claimableAmount={userVaultData.pending}
          claimableIncreasePerSecond={getUserTokensPerSecond(
            userVaultData.staked,
            vaultData.TVLInUSD,
            vaultData.projectOutputPerSecond
          )}
          ethLocked={userVaultData.staked}
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
