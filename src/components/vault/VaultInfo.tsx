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

const VaultInfo = () => {

  return (
    <Card className="min-w-[450px]">
        <CardHeader>
        <CardTitle>BlastCockInu</CardTitle>
        <CardDescription>Token for brave cryptoids</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="space-y-2">
            <p>APR: 9000%</p>
            <p>TVL:</p>
            <p>tokens left:</p>
            <div className="space-x-2">
            <Button variant="outline">Deposit</Button>
            <Button variant="outline">Withdraw</Button>
            </div>
        </div>
        </CardContent>
        <CardFooter>
        <div className="flex items-center w-full justify-between">
            <p>9000.. BCI</p>
            <Button>Claim</Button>
        </div>
        </CardFooter>
    </Card>
  );
};

export default VaultInfo;
