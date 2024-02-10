'use client';

import React, { use, useEffect, useState } from 'react';
import VaultInfo from '@/components/vault/VaultInfo';
import VaultControlPanel from '@/components/vault/VaultControlPanel';
import AddLiquidityPanel from '@/components/swap/AddLiquidityPanel';

import BuySellSwap from '@/components/swap/BuySellSwap';
import GetWETH from '@/components/swap/GetWETH';
import {
  getAllVaults,
  getProjectData,
  MineblastProjectData,
} from '@/lib/onchain';
import { useAccount, useBalance } from 'wagmi';
import { AddrString } from '@/lib/wagmiConfig';

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
    pairETHBalance: 0,
  });

  const [userVaultData, setUserVaultData] = useState<{
    stakedETH: number;
    pending: number;
  }>({ stakedETH: 0, pending: 0 });

  useEffect(() => {
    fetchProjectData();
  }, [address]);

  const [tokenAddr, setTokenAddr] = useState<AddrString | string>('');

  async function fetchProjectData() {
    const userAddress = address ?? '0x0000000000000000000000000000000000000000';

    const allVaults = await getAllVaults(); //temp, will be in props in the future
    const projectData = await getProjectData(
      userAddress,
      allVaults[0],
      ETHPrice
    );
    console.log({ allVaults });
    setTokenAddr(allVaults[0].token);
    setVaultData(projectData.projectData);
    setUserVaultData(projectData.userData);
  }

  const ETHPrice = 2300;

  const onClaim = () => {
    fetchProjectData();
  };

  const onDeposit = () => {
    fetchProjectData();
  };

  const onWithdraw = () => {
    fetchProjectData();
  };

  return (
    <div className="flex items-start justify-center w-full space-x-8">
      <div className="w-1/2 flex flex-col">
        <VaultInfo projectData={vaultData} ETHPrice={ETHPrice} />
        {address && (
          <VaultControlPanel
            projectData={vaultData}
            claimableAmount={userVaultData.pending}
            ethLocked={userVaultData.stakedETH}
            ethPrice={ETHPrice}
            afterClaim={onClaim}
            afterDeposit={onDeposit}
            afterWithdraw={onWithdraw}
          />
        )}
      </div>
      <div className="min-w-[360px] space-y-4">
        <BuySellSwap
          pairETHBalance={vaultData.pairETHBalanceRaw}
          pairTokenBalance={vaultData.pairTokenBalanceRaw}
          tokenAddr={tokenAddr}
        />
        {address && (
          <div className="space-y-4">
            <GetWETH />
            <AddLiquidityPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenPage;
