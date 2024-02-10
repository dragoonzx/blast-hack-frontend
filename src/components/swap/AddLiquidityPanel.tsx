import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ConnectKitButton } from 'connectkit';
import {
  useAccount,
  useBalance,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import SwapInput from '@/components/swap/SwapInput';
import { formatUnits, parseEther } from 'viem';
import { contracts } from '@/lib/wagmiConfig';
import { WETH_ADDR } from '@/lib/onchain';
import { useToast } from '../ui/use-toast';

const AddLiquidityPanel = () => {
  const { address } = useAccount();
  const { data: ethBalanceData, refetch } = useBalance({
    address,
    query: {
      enabled: !!address,
    },
  });

  const formattedBalance = ethBalanceData
    ? formatUnits(ethBalanceData!.value, ethBalanceData!.decimals)
    : 0.0;

  const [amount, setAmount] = useState('');
  const setMaxAmount = () => {
    formattedBalance && setAmount(formattedBalance);
  };

  const {
    data: depositHash,
    writeContract: depositWriteContract,
    isPending: isPendingDeposit,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: depositHash,
    });

  const depositEth = async () => {
    if (!amount) {
      return;
    }

    depositWriteContract({
      abi: contracts.weth.abi,
      address: WETH_ADDR,
      functionName: 'deposit',
      value: parseEther(amount),
      args: [],
    });
  };

  const { toast } = useToast();

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: 'Successfully get WETH',
      });
      refetch();
      setAmount('');
    }
  }, [isConfirmed, toast, refetch]);

  return (
    <Card className='pb-4'>
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
                    Token
                  </label>
                  {address ? (
                    <p className="text-xs">
                      <span className="text-muted-foreground">Balance: </span>
                      {formattedBalance} ETH
                    </p>
                  ) : null}
                </div>
              </div>
              <SwapInput maxValue={100000} onChange={(n:number) => {console.log(n)}}/>
            </div >
            <div className='h-12 mt-8'>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between  w-full">
                  <label className="text-sm text-muted-foreground">
                    ETH
                  </label>
                  {address ? (
                    <p className="text-xs">
                      <span className="text-muted-foreground">Balance: </span>
                      {formattedBalance} ETH
                    </p>
                  ) : null}
                </div>
              </div>
              <SwapInput maxValue={100000} onChange={(n:number) => {console.log(n)}}/>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddLiquidityPanel;
