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
  useReadErc20Allowance
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

const removeLiquidty = () => {

}

const removeLoading = false;

const RemoveLiquidityPanel = ({
  projectData,
  afterRemoveLiquidity,
}: RemoveLiquidityPanelProps) => {
  const { address } = useAccount();
  const [tokenAmount, setTokenAmount] = useState('');
  const [outputTokens, setOutputTokens] = useState({ethAmount: 0n, tokenAmount: 0n});
  //const { data: allowance} = useReadErc20Allowance({address: projectData.tokenAddress!, args: [address!, contracts.mineblastRouter.address!]});

  const { data: lpTokenBalance} = useReadErc20BalanceOf({address: projectData.pairAddress!, args: [address!]});

  const onInputChanged = (val: string) => {
    const lp = (lpTokenBalance ?? 0n);
    setTokenAmount(val);
    setOutputTokens(getTokensAmount(parseEther(val), lp, projectData.pairTokenBalanceRaw, projectData.pairETHBalanceRaw));
  }

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
                <Button className='mt-3' disabled={removeLoading} onClick={removeLiquidty}> 
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
