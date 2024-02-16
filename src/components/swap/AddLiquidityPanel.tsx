import React, { use, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  useAccount,
  useBalance,
  useWaitForTransactionReceipt
} from 'wagmi';
import TokenInput from '../form/TokenInput';
import { 
  useWriteMineblastRouterAddLiquidityEth,
  useWriteErc20Approve,
  useReadErc20Allowance
} from '../../generated'
import { MineblastProjectData } from '@/lib/onchain';
import { Loader2 } from "lucide-react"
import { formatEther, maxUint256, parseEther } from 'viem';
import {contracts} from '@/lib/wagmiConfig';
import {truncate18Decimals, bigMin} from '@/lib/utils';

interface MineblastInputProps {
  projectData: MineblastProjectData;
  userETHBalance: bigint;
  userTokenBalance: bigint;
  afterAddLiquidity: () => void;
}

const AddLiquidityPanel = ({
  projectData,
  userETHBalance,
  userTokenBalance,
  afterAddLiquidity,
}: MineblastInputProps) => {
  const { address } = useAccount();
  const [tokenAmount, setTokenAmount] = useState('');
  const { data: allowance, refetch: allowanceRefetch} = useReadErc20Allowance({address: projectData.tokenAddress!, args: [address!, contracts.mineblastRouter.address!]});

  const {
    data: addLiquidityHash,
    writeContract: addLiquidityWriteContract,
    isPending: isPendingLiquidityAdd,
    error: liqError,
  } = useWriteMineblastRouterAddLiquidityEth();

  const { 
    data: approveHash, 
    writeContract: approveWriteContract,
    isPending: isPendingApprove
   } = useWriteErc20Approve();
  const approveTx = useWaitForTransactionReceipt({hash: approveHash});


  const addLiquidityTx =
    useWaitForTransactionReceipt({
      hash: addLiquidityHash,
    });

  const addLiquidity = async () => {
    if (!tokenAmount || address === undefined) {
      return;
    }
    const amount = parseEther(tokenAmount);
    if (allowance === undefined || allowance < amount) {
      approveWriteContract({
        address: projectData.tokenAddress!,
        args: [contracts.mineblastRouter.address!, maxUint256],
      });
      console.log('Approving');
      return;
    }
    
    const value = quote(amount, projectData.pairTokenBalanceRaw, projectData.pairETHBalanceRaw);
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);

    addLiquidityWriteContract({
      value: value,
      args: [projectData.tokenAddress!, amount, amount*997n/1000n, value*997n/1000n, address, deadline],
    });
  };

  useEffect(() => {
    if (addLiquidityTx.isSuccess) {
      afterAddLiquidity();
    }
  }, [addLiquidityTx.isSuccess]);

  useEffect(() => {
    if(approveTx.isSuccess) {
      allowanceRefetch().then(addLiquidity);
    }
  }, [approveTx.isSuccess]);

  const quote = (amountA: bigint, reserveA: bigint, reserveB: bigint): bigint => {
    if(reserveA === 0n || reserveB === 0n){
      return 10n**16n;
    }
    return amountA * reserveB / reserveA;
  };

  const getMaximumTokenAmount = (): bigint => {
    if(projectData.pairETHBalanceRaw === 0n || projectData.pairTokenBalanceRaw === 0n){
      return userTokenBalance;
    }

    const result = bigMin(userTokenBalance, quote(userETHBalance, projectData.pairETHBalanceRaw, projectData.pairTokenBalanceRaw));
    return result;
  }


  const truncateNumber = (number: number): number => {
    return Math.round( number * 1e4 ) / 1e4;
  }

  const addLiquidityLoading = addLiquidityTx.isLoading || isPendingLiquidityAdd || isPendingApprove || approveTx.isLoading;

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold leading-none tracking-tight">Add Liquidity</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 font-sora">
          <div className="flex flex-col">
            <div className=''>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between  w-full">
                  <label className="text-sm text-text-gray-300">
                  {projectData.tokenSymbol}
                  </label>
                  {address ? (
                    <p className="text-xs">
                      <span className="text-text-gray-300">Balance: </span>
                      {truncate18Decimals(userTokenBalance)} {projectData.tokenSymbol}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-between mt-1 h-12">
              <TokenInput value={tokenAmount.toString()} maxValue={formatEther(getMaximumTokenAmount())} onChange={setTokenAmount}/>
              <Button disabled={addLiquidityLoading} onClick={addLiquidity} className='ml-2'> 
              {addLiquidityLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add
              </Button>
              </div>
            </div >
            <label className="text-sm text-text-gray-300">
              ETH amount required: {truncate18Decimals(quote(parseEther(tokenAmount), projectData.pairTokenBalanceRaw, projectData.pairETHBalanceRaw))}
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddLiquidityPanel;
