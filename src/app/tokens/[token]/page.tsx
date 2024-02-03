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

const TokenPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="flex items-start justify-between w-full">
      <div className="w-1/2 flex justify-center">
        <VaultInfo />
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
