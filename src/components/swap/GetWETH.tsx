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
import { formatUnits, parseEther } from 'viem';
import { contracts } from '@/lib/wagmiConfig';
import { WETH_ADDR } from '@/lib/onchain';
import { useToast } from '../ui/use-toast';

const GetWETH = () => {
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
    <Card>
      <CardHeader>
        <h3 className="font-semibold leading-none tracking-tight">Get WETH</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 font-sora">
          <div className="flex flex-col">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between  w-full">
                  <label className="text-sm text-gray-300">Amount</label>
                  {address ? (
                    <p className="text-xs">
                      <span className="text-gray-300">Balance: </span>
                      {formattedBalance} ETH
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <input
                  className="h-12 flex items-center text-xl outline-none w-full pr-2 bg-transparent overflow-ellipsis"
                  value={amount}
                  onChange={(e) =>
                    e.target.value.match(/^[0-9]*[.,]?[0-9]*$/) &&
                    setAmount(e.target.value)
                  }
                  inputMode="decimal"
                  minLength={1}
                  maxLength={79}
                  type="text"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0.0"
                />
                <button
                  onClick={setMaxAmount}
                  className="bg-transparent border border-gray-600 hover:bg-gray-600/25 rounded-md px-2 py-1 text-xs mr-2"
                >
                  MAX
                </button>
                <div className="space-x-2 flex">
                  <button
                    disabled={isPendingDeposit}
                    className="border border-gray-600 hover:bg-gray-600/25 rounded-md p-2 flex items-center"
                    onClick={depositEth}
                  >
                    {isPendingDeposit || isConfirming ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : null}
                    {isPendingDeposit || isConfirming
                      ? 'Depositing...'
                      : 'Deposit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GetWETH;
