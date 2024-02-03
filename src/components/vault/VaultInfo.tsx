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
import { Progress } from "@/components/ui/progress"

const VaultInfo = (props: {
  name: string, APR: number, TVL: number, 
  tokensSupply: number, tokensLeft: number, 
  endDate: Date, ownerShare: number, liqudity: number}) => {

  const timeLeft = Math.floor((props.endDate.getTime() - new Date().getTime()) / 1000);
  const tokensPerSecond = props.tokensLeft / timeLeft;
  const tokensFreed = props.tokensSupply - props.tokensLeft

  const formatLargeSum = function(value: number) {
    return Intl.NumberFormat('en-US', {
      notation: "compact",
      maximumFractionDigits: 1
    }).format(value);
  }

  const formatAPR = function(value: number) {
    if(value > 1000) {
      return Math.floor(value).toString();
    } else {
      return Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2
      }).format(value);
    }
  }

  const formatTimeLeft = function(value: number) {
    const days = Math.floor(value / 86400);
    const hours = Math.floor((value - days * 86400) / 3600);
    const minutes = Math.floor((value - days * 86400 - hours * 3600) / 60);
    if(days == 0){
      if(hours == 0){
        return `${minutes}m`;
      }
      return `${hours}h ${minutes}m`;
    }
    return `${days}d ${hours}h ${minutes}m`;
  }

  return (
    <Card className="min-w-[450px]">
        <CardHeader>
        <CardTitle className='text-3xl'>{props.name}</CardTitle>
        <Progress value={tokensFreed/props.tokensSupply*100} />
        <CardDescription>
        <div className="flex items-center justify-between">
        <p>minted: <CountUp start={tokensFreed} end={props.tokensSupply} useEasing={false} duration={timeLeft}/></p>
        <p>supply: {new Intl.NumberFormat().format(props.tokensSupply)}</p>
        </div>

        </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="flex items-center justify-between">
            <div className='flex flex-col items-center justify-center flex-grow'>
              <p className='text-3xl'>${formatLargeSum(props.TVL)}</p>
              <p className='text-xl'>TVL</p>
            </div>
            <div className='flex flex-col items-center justify-center flex-grow'>
              <p className='text-3xl'>{formatAPR(props.APR)}%</p>
              <p className='text-xl'>APR</p>
            </div>
            <div className="space-x-2">
            </div>
        </div>
        </CardContent>
        <CardFooter >
        <div className="flex items-center w-full justify-between">
            <p className='text-sm'>liqudity <br />${formatLargeSum(props.liqudity)}</p>
            <p className='text-sm'>creator share <br />{props.ownerShare}%</p>
            <p className='text-sm'>time left <br /> {formatTimeLeft(timeLeft)}</p>
        </div>
        </CardFooter>
    </Card>
  );
};

export default VaultInfo;
