'use client';

import React, { useEffect, useState } from 'react';
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
import { useAccount } from "wagmi";
import { useBalance } from 'wagmi'


const VaultControlPanel = (props: {
  symbol: string, claimableAmount: number, claimableIncreasePerSecond: number, ethLocked: number
  onClaim: () => void, onDeposit: (amount: number) => void, onWithdraw: (amount: number) => void
}) => {

  const { address, isConnecting, isDisconnected } = useAccount();
  const ETHbalance = useBalance({address});

  const formatLargeSum = function(value: number) {
    return Intl.NumberFormat('en-US', {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value);
  }

  const secondsInMonth = 30 * 24 * 60 * 60;
  const projectedBalanceInMonth = props.claimableAmount + props.claimableIncreasePerSecond * secondsInMonth;
  const ethBalanceFormatted = ETHbalance.data ? (Number(ETHbalance.data.value / 10n**15n)/1000) : 0;
  const displayWithdraw = props.ethLocked > 0;
  const displayClaim = props.claimableAmount > 0;

  return (
    <Card className="min-w-[450px] mt-4">
        <CardHeader>
        <CardTitle className=''>Control panel</CardTitle>
        <CardDescription>
          heyy
        </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="flex flex-col items-center mb-4">
          <div className='mb-3'>ETH balance: {ethBalanceFormatted}</div>
          <div className='flex h-12'>
            <Button className="drop-shadow-xl w-1/3 h-full">Deposit</Button>
            <SwapInput maxValue={ethBalanceFormatted} onChange={(a:number) => {console.log(a)}}/>
          </div>
          {displayWithdraw && <div className='mb-3 mt-6'>ETH locked: {props.ethLocked}</div>}
          {displayWithdraw &&
            <div className='flex h-12'>
              <Button className="drop-shadow-xl w-1/3 h-full">Withdraw</Button>
              <SwapInput maxValue={props.ethLocked} onChange={(a:number) => {console.log(a)}}/>
            </div>
          }
        </div>
        </CardContent>
        {displayClaim && 
          <CardFooter className='flex flex-col'>
            <div>
              {props.symbol} available: <CountUp decimals={2} start={props.claimableAmount} end={projectedBalanceInMonth} useEasing={false} duration={secondsInMonth}/>
            </div>
            <Button className="w-1/2">Claim</Button>
          </CardFooter>
        }
    </Card>
  );
};

export default VaultControlPanel;
