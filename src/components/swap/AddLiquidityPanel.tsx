import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAccount, useBalance, useWaitForTransactionReceipt } from 'wagmi';
import SwapInput from '@/components/swap/SwapInput';
import { useWriteMineblastRouterAddLiquidityEth } from '../../generated';
import { MineblastProjectData } from '@/lib/onchain';
import { Loader2 } from 'lucide-react';
import { parseEther } from 'viem';
import { AddrString } from '@/lib/wagmiConfig';

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

  const {
    data: addLiquidityHash,
    writeContract: addLiquidityWriteContract,
    isPending: isPendingLiquidityAdd,
  } = useWriteMineblastRouterAddLiquidityEth();

  const addLiquidityTx = useWaitForTransactionReceipt({
    hash: addLiquidityHash,
  });

  const addLiquidity = async () => {
    if (!tokenAmount || address === undefined) {
      return;
    }

    const value = parseEther(
      quote(
        tokenAmount,
        projectData.pairTokenBalance,
        projectData.pairETHBalance
      ).toString()
    );
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);
    console.log(parseEther(tokenAmount.toString()));
    console.log(value);

    addLiquidityWriteContract({
      value: value,
      args: [
        projectData.tokenAddress! as AddrString,
        parseEther(tokenAmount.toString()),
        parseEther(tokenAmount.toString()),
        value,
        address,
        deadline,
      ],
    });
  };

  useEffect(() => {
    if (addLiquidityTx.isSuccess) {
      afterAddLiquidity();
    }
  }, [addLiquidityTx.isSuccess]);

  const quote = (
    amountA: number,
    reserveA: number,
    reserveB: number
  ): number => {
    return (amountA * reserveB) / reserveA;
  };

  const getMaximumTokenAmount = (): number => {
    return Math.min(
      userTokenBalance,
      quote(
        userETHBalance,
        projectData.pairETHBalance,
        projectData.pairTokenBalance
      )
    );
  };

  const truncateNumber = (number: number): number => {
    return Math.round(number * 1e4) / 1e4;
  };

  const addLiquidityLoading = addLiquidityTx.isLoading || isPendingLiquidityAdd;

  return (
    <Card className="pb-4">
      <CardHeader>
        <h3 className="font-semibold leading-none tracking-tight">
          Add Liquidity
        </h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 font-sora">
          <div className="flex flex-col">
            <div className="h-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between  w-full">
                  <label className="text-sm text-gray-300">Token</label>
                  {address ? (
                    <p className="text-xs">
                      <span className="text-gray-300">Balance: </span>
                      {userTokenBalance} {projectData.tokenSymbol}
                    </p>
                  ) : null}
                </div>
              </div>
              <SwapInput
                maxValue={truncateNumber(getMaximumTokenAmount())}
                onChange={(n: number) => {
                  setTokenAmount(n);
                }}
              />
            </div>
            <div className="h-12 mt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between  w-full">
                  <label className="text-sm text-gray-300">
                    ETH amount required:{' '}
                    {truncateNumber(
                      quote(
                        tokenAmount,
                        projectData.pairTokenBalance,
                        projectData.pairETHBalance
                      )
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button disabled={addLiquidityLoading} onClick={addLiquidity}>
          {addLiquidityLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Add
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddLiquidityPanel;
