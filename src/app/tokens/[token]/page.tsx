'use client';

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SwapCard from '@/components/swap/SwapCard';
import SwapCardHeader from '@/components/swap/SwapCardHeader';
import VaultInfo from '@/components/vault/VaultInfo';
import VaultControlPanel from '@/components/vault/VaultControlPanel';
import {getAllVaults, getVaultData, MineblastProjectData} from '../../../lib/onchain';

const TokenPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [vaultData, setVaultData] = useState<MineblastProjectData>({
    tokenName: "...",
    tokenSymbol: "...",
    tokenTotalSupply: 0,
    tokenPriceInUSD: 0,
    projectOutputPerSecond: 0,
    projectEndDate: new Date(Number(10000000000)),
    TVLInUSD: 0,
    liqudityInUSD: 0,
  });

  const getAPR = (TVL: number, outputPerSecond: number, tokenPriceUSD: number): number => {
    if(TVL > 1) {
      return (outputPerSecond * 31536000 / TVL * 100 * tokenPriceUSD);
    }
    else{
      return 0;
    }
  }

  const getTokensLeft = (tokensSupply: number, outputPerSecond: number, endDate: Date): number => {
    const timeLeft = Math.floor((endDate.getTime() - new Date().getTime()) / 1000);
    return tokensSupply - outputPerSecond * timeLeft;
  }

  useEffect(() => {
    const fetchVaults = async () => {
      const allVaults = await getAllVaults();
      const vaultData = await getVaultData(allVaults[0], 2300);
      setVaultData(vaultData);
    }
    fetchVaults();
  }, []);

  return (
    <div className="flex items-start justify-between w-full">
      <div className="w-1/2 flex flex-col">
        <VaultInfo 
          name={vaultData.tokenName}
          APR={getAPR(vaultData.TVLInUSD, vaultData.projectOutputPerSecond, vaultData.tokenPriceInUSD)} 
          TVL={vaultData.TVLInUSD} 
          tokensSupply={vaultData.tokenTotalSupply} 
          tokensLeft={getTokensLeft(vaultData.tokenTotalSupply, vaultData.projectOutputPerSecond, vaultData.projectEndDate)} 
          endDate={vaultData.projectEndDate}
          ownerShare={10}
          liqudity={vaultData.liqudityInUSD}
        />
        <VaultControlPanel
          symbol="BRUH"
          claimableAmount={500}
          claimableIncreasePerSecond={0.5}
        />
      </div>
      <Card className="w-1/3 min-w-[360px]">
        <CardHeader>
          <SwapCardHeader />
        </CardHeader>
        <CardContent>
          <SwapCard />
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenPage;
