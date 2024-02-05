'use client';

import React, { use, useEffect, useState } from 'react';
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
import { useAccount, useBalance } from 'wagmi';

const TokenPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { address, isConnecting, isDisconnected } = useAccount();
  const ETHbalance = useBalance({ address });

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
    fetchVaultData();
  }, [address]);

  useEffect(() => {
    if(address && vaultData.vaultAddress !== '0x0') {
      fetchUserVaultData(address);
    }
  }, [address, vaultData]);

  async function fetchVaultData() {
    const allVaults = await getAllVaults(); //temp, will be in props in the future
    const vaultData = await getVaultData(allVaults[0], 2300);
    setVaultData(vaultData);
  }

  async function fetchUserVaultData(address: `0x${string}`) {
    const userVaultData = await getUserVaultData(
      vaultData.vaultAddress,
      address
    );
    setUserVaultData(userVaultData);
  }

  const ETHPrice = 2300;

  const onClaim = () => {
    //vault data not chainging, no need to refetch
    if(address)
      fetchUserVaultData(address);
  };

  const onDeposit = () => {
    fetchVaultData() 
    //user data will be refetched in the useEffect
  };

  const onWithdraw = () => {
    fetchVaultData()
    //user data will be refetched in the useEffect
  };

  return (
    <div className="flex items-start justify-center w-full space-x-8">
      <div className="w-1/2 flex flex-col">
        <VaultInfo projectData={vaultData} />
        <VaultControlPanel
          projectData={vaultData}
          claimableAmount={userVaultData.pending}
          ethLocked={userVaultData.stakedETH}
          ethPrice={ETHPrice}
          afterClaim={onClaim}
          afterDeposit={onDeposit}
          afterWithdraw={onWithdraw}
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
