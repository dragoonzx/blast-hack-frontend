'use client';

import React, { useEffect } from 'react';
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
import {getAllVaults} from '../../../lib/onchain';

const TokenPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  
  useEffect(() => {
    const fetchVaults = async () => {
      const allVaults = await getAllVaults();
      console.log("Vaults: " + JSON.stringify(allVaults));
    }
    fetchVaults();
  }, []);

  return (
    <div className="flex items-start justify-between w-full">
      <div className="w-1/2 flex flex-col">
        <VaultInfo 
          name="BRUHcoin" 
          APR={9000.95} 
          TVL={59067057} 
          tokensSupply={21_000_000} 
          tokensLeft={4_589_050} 
          endDate={new Date(new Date().getTime() + 10*24*60*60*1000)}
          ownerShare={10}
          liqudity={70721}
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
