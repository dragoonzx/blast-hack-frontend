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
import {
  MineblastProjectData,
} from '@/lib/onchain';
import { formatNumberCompact } from '@/lib/utils';
import { Progress } from "@/components/ui/progress"

const VaultInfo = (props: {projectData: MineblastProjectData, ETHPrice: number}) => {

  const timeLeft = Math.floor((props.projectData.projectEndDate.getTime() - new Date().getTime()) / 1000);
  const tokensLeft = props.projectData.projectOutputPerSecond * timeLeft;
  const tokensFreed = props.projectData.tokenTotalSupply - tokensLeft;

  const getAndFormatAPR = (): string => {
    let value = 0;
    const tvl = props.projectData.TVLInUSD;
    if (tvl > 1) {
      value =  ((props.projectData.projectOutputPerSecond * 31536000) / tvl) * 100 * props.projectData.tokenPriceInUSD;
    } else {
      value = 0;
    }

    if(value > 9000){
      return ">9000"
    }
    else if(value > 100) {
      return Math.floor(value).toString();
    } else {
      return Intl.NumberFormat('en-US', {
        maximumFractionDigits: 2
      }).format(value);
    }
  };

  const getTimeLeftFormatted = function() {
    const days = Math.floor(timeLeft / 86400);
    const hours = Math.floor((timeLeft - days * 86400) / 3600);
    const minutes = Math.floor((timeLeft - days * 86400 - hours * 3600) / 60);
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
        <CardTitle className='text-3xl'>{props.projectData.tokenName}</CardTitle>
        <Progress value={tokensFreed/props.projectData.tokenTotalSupply*100} />
        <div className="flex items-center justify-between text-gray-400">
        <div suppressHydrationWarning>
          minted: <CountUp start={tokensFreed} end={props.projectData.tokenTotalSupply} useEasing={false} duration={timeLeft}/>
        </div >
        <p suppressHydrationWarning>supply: {new Intl.NumberFormat().format(props.projectData.tokenTotalSupply)}</p>
        </div>

        </CardHeader>
        <CardContent>
        <div className="flex items-center justify-between">
            <div className='flex flex-col items-center justify-center flex-grow'>
              <p className='text-3xl'>${formatNumberCompact(props.projectData.TVLInUSD)}</p>
              <p className='text-xl'>TVL</p>
            </div>
            <div className='flex flex-col items-center justify-center flex-grow'>
              <p className='text-3xl'>{getAndFormatAPR()}%</p>
              <p className='text-xl'>APR</p>
            </div>
            <div className="space-x-2">
            </div>
        </div>
        </CardContent>
        <CardFooter >
        <div className="flex items-center w-full justify-between">
            <p className='text-sm'>liqudity <br />${formatNumberCompact(props.projectData.pairETHBalance * props.ETHPrice * 2)}</p>
            <p className='text-sm'>creator share <br />{10}%</p>
            <p className='text-sm'>time left <br /> {getTimeLeftFormatted()}</p>
        </div>
        </CardFooter>
    </Card>
  );
};

export default VaultInfo;
