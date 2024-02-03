'use client';

import React, { useEffect } from 'react';
import CountUp from 'react-countup';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SwapInput from '@/components/swap/SwapInput';


const VaultControlPanel = (props: {
  symbol: string, claimableAmount: number, claimableIncreasePerSecond: number

}) => {

  const formatLargeSum = function(value: number) {
    return Intl.NumberFormat('en-US', {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value);
  }

  const secondsInMonth = 30 * 24 * 60 * 60;
  const projectedBalanceInMonth = props.claimableAmount + props.claimableIncreasePerSecond * secondsInMonth;

  return (
    <Card className="min-w-[450px] mt-4">
        <CardHeader>
        <CardTitle className=''>Control panel</CardTitle>
        <CardDescription>
        <div className="flex items-center justify-between">
          <p>heyy</p>
        </div>
        </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="flex flex-col h-40 items-center justify-between">
          ETH balance: 51.35
          <div className='flex'>
            <Button className="drop-shadow-xl w-1/3">Deposit</Button>
            <SwapInput maxValue={400} onChange={(a:number) => {console.log(a)}}/>
          </div>
          ETH locked: 12.221
          <div className='flex'>
            <Button className="drop-shadow-xl w-1/3">Withdraw</Button>
            <SwapInput maxValue={400} onChange={(a:number) => {console.log(a)}}/>
          </div>
        </div>
        </CardContent>
        <CardFooter className='flex flex-col mt-4'>
          <div>
            {props.symbol} available: <CountUp decimals={2} start={props.claimableAmount} end={projectedBalanceInMonth} useEasing={false} duration={secondsInMonth}/>
          </div>
          <Button className="w-full">Claim</Button>
        </CardFooter>
    </Card>
  );
};

export default VaultControlPanel;
