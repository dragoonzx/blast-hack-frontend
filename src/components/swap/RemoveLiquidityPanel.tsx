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
  useReadErc20BalanceOf,
  useWriteErc20Approve,
  useReadErc20Allowance,
  useWriteMineblastRouterRemoveLiquidityEth
} from '../../generated'
import { MineblastProjectData } from '@/lib/onchain';
import { Loader2 } from "lucide-react"
import { formatEther, maxUint256, parseEther } from 'viem';
import {contracts} from '@/lib/wagmiConfig';



interface RemoveLiquidityPanelProps {
  projectData: MineblastProjectData;
  afterRemoveLiquidity: () => void;
}

const getTokensAmount = (lpTokenAmount: bigint, lpTokenSupply: bigint, tokenReserve: bigint, ethReserve: bigint): {ethAmount: bigint, tokenAmount: bigint} => {
  const ethAmount = lpTokenAmount * ethReserve / lpTokenSupply;
  const tokenAmount = lpTokenAmount * tokenReserve / lpTokenSupply;
  return {ethAmount, tokenAmount};
}


const truncateNumber = (number: number): number => {
    return Math.round( number * 1e4 ) / 1e4;
}

const truncate18Decimals = (number: bigint, decimals: number = 4): number => {
  return Number(number / 10n ** BigInt(18 - decimals)) / 10 ** decimals;
};

const RemoveLiquidityPanel = ({
  projectData,
  afterRemoveLiquidity,
}: RemoveLiquidityPanelProps) => {
  const { address } = useAccount();
  const [tokenAmount, setTokenAmount] = useState('');
  const [outputTokens, setOutputTokens] = useState({ethAmount: 0n, tokenAmount: 0n});

  const { data: lpTokenBalance, refetch: balanceRefetch} = useReadErc20BalanceOf({address: projectData.pairAddress!, args: [address!]});
  const { data: allowance, refetch: allowanceRefetch} = useReadErc20Allowance({address: projectData.pairAddress!, args: [address!, contracts.mineblastRouter.address!]});

  const {
    data: removeLiquidityHash,
    writeContract: removeLiquidityWriteContract,
    isPending: isPendingLiquidityRemove,
    error: liqError,
  } = useWriteMineblastRouterRemoveLiquidityEth();
  
  const { 
    data: approveHash, 
    writeContract: approveWriteContract,
    isPending: isPendingApprove
   } = useWriteErc20Approve();
  const approveTx = useWaitForTransactionReceipt({hash: approveHash});
  
  
  const removeLiquidityTx =
    useWaitForTransactionReceipt({
      hash: removeLiquidityHash,
  });
  
  const removeLiquidity = async () => {
    if (!tokenAmount || address === undefined) {
      return;
    }
    const amount = parseEther(tokenAmount);
    const outputAmounts = getTokensAmount(amount, lpTokenBalance??0n, projectData.pairTokenBalanceRaw, projectData.pairETHBalanceRaw);

    if (allowance === undefined || allowance < amount) {
      approveWriteContract({
        address: projectData.pairAddress!,
        args: [contracts.mineblastRouter.address!, maxUint256],
      });
      console.log('Approving');
      return;
    }
    
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);
  
    removeLiquidityWriteContract({
      args: [projectData.tokenAddress!, amount, outputAmounts.tokenAmount*997n/1000n, outputAmounts.ethAmount*997n/1000n, address, deadline],
    });
  };

  useEffect(() => {
    if (removeLiquidityTx.isSuccess) {
      afterRemoveLiquidity()
      balanceRefetch();
    }
  }, [removeLiquidityTx.isSuccess]);

  useEffect(() => {
    if(approveTx.isSuccess) {
      allowanceRefetch().then(removeLiquidity);
    }
  }, [approveTx.isSuccess]);

  const onInputChanged = (val: string) => {
    const lp = (lpTokenBalance ?? 0n);
    setTokenAmount(val);
    setOutputTokens(getTokensAmount(parseEther(val), lp, projectData.pairTokenBalanceRaw, projectData.pairETHBalanceRaw));
  }

  const removeLoading = removeLiquidityTx.isLoading || isPendingLiquidityRemove || isPendingApprove || approveTx.isLoading;

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold leading-none tracking-tight">Remove Liquidity</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 font-sora">
          <div className="flex flex-col">
            <div className='h-12'>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between  w-full">
                  <label className="text-sm text-text-gray-300">
                  LP Tokens
                  </label>
                  {address ? (
                    <p className="text-xs">
                      <span className="text-text-gray-300">Balance: </span>
                      {truncate18Decimals(lpTokenBalance??0n)} pool tokens
                    </p>
                  ) : null}
                </div>
              </div>
              <TokenInput value={tokenAmount} maxValue={formatEther(lpTokenBalance??0n)} onChange={onInputChanged}/>
            </div >
            <div className='mt-8'>
              <div className="flex flex-col items-center justify-center w-full">
                <label className="text-sm text-text-gray-300 mb-3">
                🥵Output:
                </label>
                <div>{truncate18Decimals(outputTokens.ethAmount)} ETH</div>
                <div>{truncate18Decimals(outputTokens.tokenAmount)} {projectData.tokenSymbol}</div>
                <Button className='mt-3' disabled={removeLoading} onClick={removeLiquidity}> 
                {removeLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Remove
                </Button>
              </div>
            </div>

          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RemoveLiquidityPanel;
