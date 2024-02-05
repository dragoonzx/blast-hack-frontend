import React, { useState } from 'react';
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
  useWriteContract,
} from 'wagmi';
import { formatUnits, parseEther } from 'viem';
import { contracts } from '@/lib/wagmiConfig';
import { WETH_ADDR } from '@/lib/onchain';

const GetWETH = () => {
  const { address } = useAccount();
  const { data: ethBalanceData } = useBalance({
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

  const { writeContract, isPending } = useWriteContract();

  const depositEth = async () => {
    console.log({
      abi: contracts.weth.abi,
      address: WETH_ADDR,
      functionName: 'deposit',
      value: parseEther(amount),
      args: [],
    });
    writeContract({
      abi: contracts.weth.abi,
      address: WETH_ADDR,
      functionName: 'deposit',
      value: parseEther(amount),
      args: [],
    });
  };

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
                  <label className="text-sm text-muted-foreground">
                    Amount
                  </label>
                  {address ? (
                    <p className="text-xs">
                      <span className="text-muted-foreground">Balance: </span>
                      {formattedBalance}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <input
                  className="h-12 flex items-center text-xl outline-none w-full pr-2 overflow-ellipsis"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  inputMode="decimal"
                  minLength={1}
                  maxLength={79}
                  type="text"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0.0"
                />
                <button
                  onClick={setMaxAmount}
                  className="bg-[#ececfe] rounded-md px-2 py-1 text-xs mr-2"
                >
                  MAX
                </button>
                <div className="space-x-2 flex">
                  <button
                    className="border rounded-md p-2"
                    onClick={depositEth}
                  >
                    Deposit
                  </button>
                  <button
                    className="border rounded-md p-2"
                    onClick={() => {
                      writeContract({
                        abi: contracts.weth.abi,
                        address: WETH_ADDR,
                        functionName: 'withdraw',
                        args: [parseEther(amount)],
                      });
                    }}
                  >
                    Withdraw
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
