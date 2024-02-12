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
import { Loader2 } from "lucide-react"
import TokenInput from '../form/TokenInput';
import { formatNumberCompact } from '@/lib/utils';
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { MineblastProjectData } from '@/lib/onchain';
import { 
  useWriteMineblastVaultWrapAndDeposit, 
  useWriteMineblastVaultWithdrawAndUnwrap,
  useWriteMineblastVaultHarvest
} from '../../generated'
import { parseEther } from 'viem';


const VaultControlPanel = (props: {
  projectData: MineblastProjectData, claimableAmount: number, ethLocked: number, ethPrice: number, 
  afterClaim: () => void, afterDeposit: () => void, afterWithdraw: () => void
}) => {

  const { address, isConnecting, isDisconnected } = useAccount();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
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
    const amount = parseEther(depositAmount);

    depositWriteContract({
      address: props.projectData.vaultAddress,
      value: amount,
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
    const amount = parseEther(withdrawAmount);

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

  const depositLoading = depositTx.isLoading || isPendingDeposit;
  const withdrawLoading = withdrawTx.isLoading || isPendingWithdraw;
  const claimLoading = claimTx.isLoading || isPendingClaim;

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
            <TokenInput maxValue={ethBalanceFormatted.toString()} onChange={(n:string) => {setDepositAmount(n)}}/>
            <Button className="ml-2 w-32" disabled={depositLoading} onClick={depositEth}>
              {depositLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Deposit
            </Button>
          </div>
          {displayWithdraw && <div className='mb-3 mt-6'>ETH locked: {props.ethLocked}</div>}
          {displayWithdraw &&
            <div className='flex h-12'>
              <TokenInput maxValue={props.ethLocked.toString()} onChange={(n:string) => {setWithdrawAmount(n)}}/>
              <Button className="ml-2 w-32" disabled={withdrawLoading} onClick={withdrawEth}>
                {withdrawLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Withdraw
              </Button>
            </div>
          }
        </div>
        </CardContent>
        {displayClaim && 
          <CardFooter className='flex flex-col'>
            <div>
              {props.projectData.tokenSymbol} available: <CountUp decimals={2} start={props.claimableAmount} end={projectedBalanceInMonth} useEasing={false} duration={secondsInMonth}/>
            </div>
            <Button className="w-1/3" disabled={claimLoading} onClick={claimToken}>
              {claimLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Claim
            </Button>
          </CardFooter>
        }
    </Card>
  );
};



export default VaultControlPanel;
