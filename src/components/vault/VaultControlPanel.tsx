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
import classNames from 'classnames';

interface VaultInfoProps {
  className?: string;
  projectData: MineblastProjectData, 
  claimableAmount: number, 
  ethLocked: number, 
  ethPrice: number,
  afterClaim: () => void, 
  afterDeposit: () => void, 
  afterWithdraw: () => void
}

const VaultControlPanel = ({
  className,
  projectData,
  claimableAmount,
  ethLocked, 
  ethPrice, 
  afterClaim, 
  afterDeposit,
  afterWithdraw
}: VaultInfoProps) => {

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
      address: projectData.vaultAddress,
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
      address: projectData.vaultAddress,
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
      address: projectData.vaultAddress,
      args: [0n, address]
    });
  };

  useEffect(() => {
    if (depositTx.isSuccess) {
      afterDeposit();
    }
  }, [depositTx.isSuccess]);

  useEffect(() => {
    if (withdrawTx.isSuccess) {
      afterWithdraw();
    }
  }, [withdrawTx.isSuccess]);

  useEffect(() => {
    if (claimTx.isSuccess) {
      afterClaim();
    }
  }, [claimTx.isSuccess]);

  const getTokensPerETHPerDay = (): number => {
    if (ethLocked === 0) {
      return projectData.projectOutputPerSecond * 86400;
    }
    return (projectData.projectOutputPerSecond * 86400) / ethLocked;
  };

  const getUserTokensPerSecond = (): number => {
    return (ethLocked / projectData.TVLInUSD * ethPrice) * projectData.projectOutputPerSecond;
  };

  const secondsInMonth = 30 * 24 * 60 * 60;
  const projectedBalanceInMonth = claimableAmount + getUserTokensPerSecond() * secondsInMonth;
  const ethBalanceFormatted = ETHbalance.data ? (Number(ETHbalance.data.value / 10n**15n)/1000) : 0;
  const displayWithdraw = ethLocked > 0;
  const displayClaim = claimableAmount > 0;

  const depositLoading = depositTx.isLoading || isPendingDeposit;
  const withdrawLoading = withdrawTx.isLoading || isPendingWithdraw;
  const claimLoading = claimTx.isLoading || isPendingClaim;

  return (
    <Card className={classNames(
      'min-w-[450px] mt-4',
      className
    )}>
      <CardHeader>
      <CardTitle className=''>Control panel</CardTitle>
      <CardDescription>
        {formatNumberCompact(getTokensPerETHPerDay())} {projectData.tokenSymbol} per ETH per day estimated
      </CardDescription>
      </CardHeader>
      <CardContent>
      <div className='flex flex-col items-center'>
        <div className="flex flex-col items-center mb-4">
          <div className='flex justify-between items-center w-full'>
            <div className='text-sm'>ETH</div>
            <p className='text-text-gray-300 text-xs'>Balance: {ethBalanceFormatted} ETH</p>
          </div>
          <div className='flex h-12 mt-2'>
            <TokenInput value={depositAmount} maxValue={ethBalanceFormatted.toString()} onChange={setDepositAmount}/>
            <Button className="ml-2 w-32" disabled={depositLoading} onClick={depositEth}>
              {depositLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Deposit
            </Button>
          </div>
        </div>
        {displayWithdraw &&
          <div className='flex flex-col items-end mt-2'>
            <div className='flex justify-between items-center w-full'>
              <div className='text-sm'>ETH</div>
              <p className='text-text-gray-300 text-xs'>Locked: {ethLocked} ETH</p>
            </div>
            <div className='flex h-12 mt-2'>
              <TokenInput value={withdrawAmount} maxValue={ethLocked.toString()} onChange={setWithdrawAmount}/>
              <Button className="ml-2 w-32" disabled={withdrawLoading} onClick={withdrawEth}>
                {withdrawLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Withdraw
              </Button>
            </div>
          </div>
        }
      </div>
      </CardContent>
      {displayClaim && 
        <CardFooter className='flex flex-col'>
          <div>
            {projectData.tokenSymbol} available: <CountUp className='text-[#f77334]' decimals={2} start={claimableAmount} end={projectedBalanceInMonth} useEasing={false} duration={secondsInMonth}/>
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
