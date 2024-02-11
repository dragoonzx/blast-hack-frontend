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
import SwapInput from '@/components/swap/SwapInput';
import { 
  useWriteMineblastRouterAddLiquidityEth,
  useWriteErc20Approve,
  useReadErc20Allowance
} from '../../generated'
import { MineblastProjectData } from '@/lib/onchain';
import { Loader2 } from "lucide-react"
import { maxUint256, parseEther } from 'viem';
import {contracts} from '@/lib/wagmiConfig';



interface MineblastInputProps {
  projectData: MineblastProjectData;
  userETHBalance: number;
  userTokenBalance: number;
  afterAddLiquidity: () => void;
}

const AddLiquidityPanel = ({
  projectData,
  userETHBalance,
  userTokenBalance,
  afterAddLiquidity,
}: MineblastInputProps) => {
  const { address } = useAccount();
  const [tokenAmount, setTokenAmount] = useState(0);
  const { data: allowance} = useReadErc20Allowance({address: projectData.tokenAddress, args: [address!, contracts.mineblastRouter.address!]});

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
    if (allowance === undefined || allowance < tokenAmount) {
      approveWriteContract({
        address: projectData.tokenAddress,
        args: [contracts.mineblastRouter.address!, maxUint256],
      });
      return;
    }

    
    const value = parseEther(quote(tokenAmount, projectData.pairTokenBalance, projectData.pairETHBalance).toString());
    console.log(projectData.pairTokenBalance);
    console.log(projectData.pairETHBalance);
    console.log(tokenAmount);
    console.log(value);
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);
    const tokenAmountParsed = parseEther(tokenAmount.toString());
    console.log(tokenAmountParsed);

    addLiquidityWriteContract({
      value: value,
      args: [projectData.tokenAddress, tokenAmountParsed, tokenAmountParsed*997n/1000n, value*997n/1000n, address, deadline],
    });
  };

  useEffect(() => {
    if(liqError !== null)
      console.log(liqError);
  }, [liqError?.message]);

  useEffect(() => {
    if (addLiquidityTx.isSuccess) {
      afterAddLiquidity();
    }
  }, [addLiquidityTx.isSuccess]);

  useEffect(() => {
    if(approveTx.isSuccess) {
      addLiquidity();
    }
  }, [approveTx.isSuccess]);

  const quote = (amountA: number, reserveA: number, reserveB: number): number => {
    return amountA * reserveB / reserveA;
  };

  const getMaximumTokenAmount = (): number => {
    return Math.min(userTokenBalance, quote(userETHBalance, projectData.pairETHBalance, projectData.pairTokenBalance));
  }

  const truncateNumber = (number: number): number => {
    return Math.round( number * 1e4 ) / 1e4;
  }

  const addLiquidityLoading = addLiquidityTx.isLoading || isPendingLiquidityAdd || isPendingApprove || approveTx.isLoading;

  return (
    <Card className=''>
      <CardHeader>
        <h3 className="font-semibold leading-none tracking-tight">Add Liquidity</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 font-sora">
          <div className="flex flex-col">
            <div className='h-12'>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between  w-full">
                  <label className="text-sm text-muted-foreground">
                  {projectData.tokenSymbol}
                  </label>
                  {address ? (
                    <p className="text-xs">
                      <span className="text-muted-foreground">Balance: </span>
                      {userTokenBalance} {projectData.tokenSymbol}
                    </p>
                  ) : null}
                </div>
              </div>
              <SwapInput maxValue={truncateNumber(getMaximumTokenAmount())} onChange={(n:number) => {setTokenAmount(n)}}/>
            </div >
            <div className='h-12 mt-8'>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between  w-full">
                  <label className="text-sm text-muted-foreground">
                    ETH amount required: {truncateNumber(quote(tokenAmount, projectData.pairTokenBalance, projectData.pairETHBalance))}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button disabled={addLiquidityLoading} onClick={addLiquidity}> 
        {addLiquidityLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Add
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddLiquidityPanel;
