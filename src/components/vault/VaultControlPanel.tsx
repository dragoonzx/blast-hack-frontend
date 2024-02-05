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
import { MineblastProjectData } from '@/lib/onchain';
import { 
  useWriteMineblastVaultWrapAndDeposit, 
  useWriteMineblastVaultWithdrawAndUnwrap,
  useWriteMineblastVaultHarvest
} from '../../generated'


const VaultControlPanel = (props: {
  projectData: MineblastProjectData, claimableAmount: number, ethLocked: number, ethPrice: number, 
  afterClaim: () => void, afterDeposit: () => void, afterWithdraw: () => void
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

  const depositTx =
    useWaitForTransactionReceipt({
      hash: depositHash,
    });

  const depositEth = async () => {
    if (!depositAmount) {
      return;
    }

    depositWriteContract({
      address: props.projectData.vaultAddress,
      value: BigInt(depositAmount * 100000) * (10n**13n),
      args: [],
    });
  };

  const {
    data: withdrawHash,
    writeContract: withdrawWriteContract,
    isPending: isPendingWithdraw,
  } = useWriteMineblastVaultWithdrawAndUnwrap();

  const withdrawTx =
    useWaitForTransactionReceipt({
      hash: withdrawHash,
    });

  const withdrawEth = async () => {
    if (!withdrawAmount || !address) {
      return;
    }

    const amount = BigInt(withdrawAmount * 100000) * (10n**13n);

    withdrawWriteContract({
      address: props.projectData.vaultAddress,
      args: [amount, address]
    });
  };

  const {
    data: claimHash,
    writeContract: claimWriteContract,
    isPending: isPendingClaim,
  } = useWriteMineblastVaultHarvest();

  const claimTx =
    useWaitForTransactionReceipt({
      hash: claimHash,
    });

  const claimToken = async () => {
    if (!address) {
      return;
    }

    claimWriteContract({
      address: props.projectData.vaultAddress,
      args: [0n, address]
    });
  };

  useEffect(() => {
    if (depositTx.isSuccess) {
      props.afterDeposit();
    }
  }, [depositTx.isSuccess]);

  useEffect(() => {
    if (withdrawTx.isSuccess) {
      props.afterWithdraw();
    }
  }, [withdrawTx.isSuccess]);

  useEffect(() => {
    if (claimTx.isSuccess) {
      props.afterClaim();
    }
  }, [claimTx.isSuccess]);

  const getTokensPerETHPerDay = (): number => {
    if (props.ethLocked === 0) {
      return props.projectData.projectOutputPerSecond * 86400;
    }
    return (props.projectData.projectOutputPerSecond * 86400) / props.ethLocked;
  };

  const getUserTokensPerSecond = (): number => {
    return (props.ethLocked / props.projectData.TVLInUSD * props.ethPrice) * props.projectData.projectOutputPerSecond;
  };

  const secondsInMonth = 30 * 24 * 60 * 60;
  const projectedBalanceInMonth = props.claimableAmount + getUserTokensPerSecond() * secondsInMonth;
  const ethBalanceFormatted = ETHbalance.data ? (Number(ETHbalance.data.value / 10n**15n)/1000) : 0;
  const displayWithdraw = props.ethLocked > 0;
  const displayClaim = props.claimableAmount > 0;

  return (
    <Card className="min-w-[450px] mt-4">
        <CardHeader>
        <CardTitle className=''>Control panel</CardTitle>
        <CardDescription>
          {formatNumberCompact(getTokensPerETHPerDay())} {props.projectData.tokenSymbol} per ETH per day estimated
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
              <Button className="drop-shadow-xl w-1/3 h-full" onClick={withdrawEth}>Withdraw</Button>
              <SwapInput maxValue={props.ethLocked} onChange={(n:number) => {setWithdrawAmount(n)}}/>
            </div>
          }
        </div>
        </CardContent>
        {displayClaim && 
          <CardFooter className='flex flex-col'>
            <div>
              {props.projectData.tokenSymbol} available: <CountUp decimals={2} start={props.claimableAmount} end={projectedBalanceInMonth} useEasing={false} duration={secondsInMonth}/>
            </div>
            <Button className="w-1/2" onClick={claimToken}>Claim</Button>
          </CardFooter>
        }
    </Card>
  );
};



export default VaultControlPanel;
