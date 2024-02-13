'use client';

import React, { use, useEffect, useState } from 'react';
import {
  getAllVaults,
  getProjectData,
  MineblastProjectData,
} from '@/lib/onchain';
import { useAccount, useBalance } from 'wagmi';
import { AddrString } from '@/lib/wagmiConfig';
import { parseEther } from 'viem';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import MineblastInput from '@/components/form/MineblastInput';
import NumericInput from '@/components/form/NumericInput';
import { DatePickerWithPresets } from '@/components/form/DatePickerWithPresets';
import NewTokenForm from '@/components/create/NewTokenForm';
import VaultInfo from '@/components/vault/VaultInfo';
import { Button } from 'react-day-picker';

const CreatePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { address, isConnecting, isDisconnected } = useAccount();
  const ETHbalance = useBalance({ address });
  

  const [previewVaultData, setPreviewVaultData] = useState<MineblastProjectData>({
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
  //<VaultInfo projectData={previewVaultData} ETHPrice={2660} className='opacity-15 mt-4'/>

  return (
    <div className="flex items-start justify-center w-full space-x-8">
      <div className="w-1/2 flex flex-col">
        <NewTokenForm onChange={(s) => {}}/>
       
      </div>
    </div>
  );
};

export default CreatePage;
