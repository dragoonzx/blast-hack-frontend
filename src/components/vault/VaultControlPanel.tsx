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
import { formatNumberCompact } from '@/lib/utils';
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { formatUnits, parseEther } from 'viem';
import { useWriteMineblastVaultWrapAndDeposit} from '../../generated'


const VaultControlPanel = (props: {
  symbol: string, claimableAmount: number, claimableIncreasePerSecond: number, ethLocked: number, tokensPerETHPerDay: number, vaultAddress: `0x${string}`
  onClaim: () => void, onDeposit: (amount: number) => void, onWithdraw: (amount: number) => void
}) => {

  const { address, isConnecting, isDisconnected } = useAccount();
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const ETHbalance = useBalance({address});

  const {
    data: depositHash,
    writeContract: depositWriteContract,
    isPending: isPendingDeposit,
  } = useWriteMineblastVaultWrapAndDeposit();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: depositHash,
    });

  const depositEth = async () => {
    if (!depositAmount) {
      return;
    }

    depositWriteContract({
      address: props.vaultAddress,
      value: BigInt(depositAmount * 100000) * (10n**13n),
      args: [],
    });
  };

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
          {formatNumberCompact(props.tokensPerETHPerDay)} {props.symbol} per ETH per day estimated
        </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="flex flex-col items-center mb-4">
          <div className='mb-3'>ETH balance: {ethBalanceFormatted}</div>
          <div className='flex h-12'>
            <Button className="drop-shadow-xl w-1/3 h-full" onClick={depositEth}>Deposit</Button>
            <SwapInput maxValue={ethBalanceFormatted} onChange={(n:number) => {setDepositAmount(n)}}/>
          </div>
          {displayWithdraw && <div className='mb-3 mt-6'>ETH locked: {props.ethLocked}</div>}
          {displayWithdraw &&
            <div className='flex h-12'>
              <Button className="drop-shadow-xl w-1/3 h-full">Withdraw</Button>
              <SwapInput maxValue={props.ethLocked} onChange={(n:number) => {setWithdrawAmount(n)}}/>
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
