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
} from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core';
import { formatUnits, maxUint256, parseEther, parseUnits } from 'viem';
import { AddrString, config, contracts } from '@/lib/wagmiConfig';
import {
  useReadErc20Allowance,
  useReadMineblastRouterGetAmountOut,
  useWriteErc20Approve,
  useWriteMineblastRouterSwapEthForExactTokens,
  useWriteMineblastRouterSwapExactTokensForEth,
} from '@/generated';
import { WETH_ADDR, truncate18Decimals } from '@/lib/onchain';

enum SWAP_STATE {
  'from_native',
  'to_native',
}

type SwapState = {
  state: SWAP_STATE;
  from: {
    amount: string;
    address: string;
    symbol: string;
    balance: bigint;
  };
  to: {
    amount: string;
    address: string;
    symbol: string;
    balance: bigint;
  };
};

interface BuySellSwapProps {
  pairETHBalance: bigint;
  pairTokenBalance: bigint;
  tokenAddr: AddrString | string;
}

const BuySellSwap = ({
  pairETHBalance,
  pairTokenBalance,
  tokenAddr,
}: BuySellSwapProps) => {
  const { address } = useAccount();
  const { data: ethBalanceData } = useBalance({
    address,
    query: {
      enabled: !!address,
    },
  });

  const [swapState, setSwapState] = useState<SwapState>({
    state: SWAP_STATE.from_native,
    from: {
      amount: '',
      address: '',
      symbol: 'ETH',
      balance: BigInt(0),
    },
    to: {
      amount: '',
      address: '',
      symbol: 'MIB',
      balance: BigInt(0),
    },
  });

  const handleFromToAmount = (value: string, type: 'from' | 'to') => {
    setSwapState({
      ...swapState,
      [type]: {
        ...swapState[type],
        amount: value,
      },
    });
  };

  const swapFromToState = () => {
    const { state, from, to } = swapState;

    const newState: SwapState = {
      state:
        state === SWAP_STATE.from_native
          ? SWAP_STATE.to_native
          : SWAP_STATE.from_native,
      from: to,
      to: from,
    };
    setSwapState(newState);
  };

  const { data: amountOutData } = useReadMineblastRouterGetAmountOut({
    args: [
      parseUnits(swapState.from.amount, 18),
      swapState.state === SWAP_STATE.from_native
        ? pairETHBalance
        : pairTokenBalance,
      swapState.state === SWAP_STATE.from_native
        ? pairTokenBalance
        : pairETHBalance,
    ],
  });

  useEffect(() => {
    setSwapState({
      ...swapState,
      to: {
        ...swapState.to,
        amount: !amountOutData
          ? ''
          : Number(formatUnits(amountOutData, 18)).toFixed(6),
      },
    });
  }, [amountOutData]);

  const {
    data: swapEthForExactTokensHash,
    writeContract: writeSwapEthForExactTokens,
    isPending: isWriteSwapEthPending,
  } = useWriteMineblastRouterSwapEthForExactTokens();

  const { isSuccess: isSwapEthSuccess, isLoading: isSwapEthPending } =
    useWaitForTransactionReceipt({
      hash: swapEthForExactTokensHash,
      query: {
        enabled: !!swapEthForExactTokensHash,
      },
    });

  const {
    data: swapTokensForEthHash,
    writeContract: writeSwapTokensForEth,
    isPending: isWriteSwapTokensForEthPending,
  } = useWriteMineblastRouterSwapExactTokensForEth();

  const { isSuccess: isSwapTokensSuccessfull, isLoading: isSwapTokensPending } =
    useWaitForTransactionReceipt({
      hash: swapTokensForEthHash,
      query: {
        enabled: !!swapTokensForEthHash,
      },
    });

  const { data: erc20BalanceWithDecimalsData } = useReadContracts({
    contracts: [
      {
        abi: contracts.erc20.abi,
        address: tokenAddr as AddrString,
        functionName: 'balanceOf',
        args: [address!],
      },
    ],
    query: {
      enabled: !!(address && tokenAddr),
    },
  });
  const fromBalanceData =
    swapState.state === SWAP_STATE.from_native
      ? ethBalanceData
      : {
          value: erc20BalanceWithDecimalsData
            ? (erc20BalanceWithDecimalsData[0].result as bigint)
            : BigInt(0),
          decimals: 18,
        };

  const toBalanceData =
    swapState.state === SWAP_STATE.to_native
      ? ethBalanceData
      : {
          value: erc20BalanceWithDecimalsData
            ? (erc20BalanceWithDecimalsData[0].result as bigint)
            : BigInt(0),
          decimals: 18,
        };

  const { data: allowance } = useReadErc20Allowance({
    address: tokenAddr as AddrString,
    args: [address!, contracts.mineblastRouter.address!],
    query: {
      enabled: !!address,
    },
  });
  const { writeContractAsync: writeErc20Approve } = useWriteErc20Approve();

  const handleSwap = async () => {
    if (!(amountOutData && address)) return;
    if (swapState.state === SWAP_STATE.from_native) {
      writeSwapEthForExactTokens({
        args: [
          amountOutData - (amountOutData * 100n) / 5000n,
          [WETH_ADDR, tokenAddr as AddrString],
          address,
          maxUint256,
        ],
        value: parseEther(swapState.from.amount),
      });
    } else if (swapState.state === SWAP_STATE.to_native) {
      if (!allowance || allowance < parseEther(swapState.from.amount)) {
        const approveHash = await writeErc20Approve({
          address: tokenAddr as AddrString,
          args: [contracts.mineblastRouter.address!, maxUint256],
        });
        await waitForTransactionReceipt(config, { hash: approveHash });
      }

      writeSwapTokensForEth({
        args: [
          parseEther(swapState.from.amount),
          amountOutData - (amountOutData * 100n) / 5000n,
          [tokenAddr as AddrString, WETH_ADDR],
          address,
          maxUint256,
        ],
      });
    }
  };

  const needApproval =
    swapState.state === SWAP_STATE.to_native &&
    allowance &&
    allowance <= parseEther(swapState.from.amount);

  const isSwapping =
    isWriteSwapEthPending ||
    isWriteSwapTokensForEthPending ||
    isSwapTokensPending ||
    isSwapEthPending;

  return (
    <Card className='bg-gray-950'>
      <CardHeader>
        <h3 className="font-semibold leading-none tracking-tight">
          Swap
        </h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 font-sora">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between  w-full">
              <label className="text-sm text-gray-300">From</label>
              {address ? (
                <p className="text-xs">
                  <span className="text-gray-300">Balance: </span>
                  {fromBalanceData
                    ? Number(
                        formatUnits(
                          fromBalanceData!.value,
                          fromBalanceData!.decimals
                        )
                      ).toFixed(6)
                    : 0.0}
                </p>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <input
                className="h-12 flex items-center text-xl outline-none bg-transparent w-full"
                inputMode="decimal"
                minLength={1}
                maxLength={79}
                type="text"
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder="0.0"
                value={swapState.from.amount}
                onChange={(e) =>
                  e.target.value.match(/^[0-9]*[.,]?[0-9]*$/) &&
                  handleFromToAmount(e.target.value, 'from')
                }
              />
              <div className="flex items-center">
                <button className="bg-transparent border border-gray-600 hover:bg-gray-600/25 rounded-md px-2 py-1 text-xs mr-2">
                  MAX
                </button>
                <div className="border border-gray-600  rounded-md px-4 py-2 min-w-[100px] h-12 flex items-center justify-center">
                  {swapState.from.symbol}
                </div>
              </div>
            </div>
            <div className="flex items-center w-full space-x-2">
              <div className="w-full bg-white/20 h-0.5" />
              <button
                onClick={swapFromToState}
                className="p-3 hover:bg-gray-600/70 rounded-md transition-colors"
              >
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  focusable="false"
                  className="fill-gray-300"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.70711 1.29289L4 0.585785L3.29289 1.29289L0.292893 4.29289C-0.0976311 4.68342 -0.0976311 5.31658 0.292893 5.70711C0.683418 6.09763 1.31658 6.09763 1.70711 5.70711L3 4.41421L3 14C3 14.5523 3.44772 15 4 15C4.55229 15 5 14.5523 5 14L5 4.41421L6.29289 5.7071C6.68342 6.09763 7.31658 6.09763 7.70711 5.7071C8.09763 5.31658 8.09763 4.68341 7.70711 4.29289L4.70711 1.29289ZM11.2929 16.7071L12 17.4142L12.7071 16.7071L15.7071 13.7071C16.0976 13.3166 16.0976 12.6834 15.7071 12.2929C15.3166 11.9024 14.6834 11.9024 14.2929 12.2929L13 13.5858L13 4C13 3.44771 12.5523 3 12 3C11.4477 3 11 3.44771 11 4L11 13.5858L9.70711 12.2929C9.31658 11.9024 8.68342 11.9024 8.29289 12.2929C7.90237 12.6834 7.90237 13.3166 8.29289 13.7071L11.2929 16.7071Z"
                    fill="current"
                  ></path>
                </svg>
              </button>
              <div className="w-full bg-white/20 h-0.5" />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between  w-full">
                <label className="text-sm text-gray-300">From</label>
                {address ? (
                  <p className="text-xs">
                    <span className="text-gray-300">Balance: </span>
                    {toBalanceData
                      ? Number(
                          formatUnits(
                            toBalanceData.value!,
                            toBalanceData.decimals!
                          )
                        ).toFixed(6)
                      : 0.0}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center justify-between">
                <input
                  className="h-12 flex items-center text-xl outline-none bg-transparent"
                  inputMode="decimal"
                  minLength={1}
                  maxLength={79}
                  type="text"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  placeholder="0.0"
                  value={swapState.to.amount}
                  onChange={(e) =>
                    e.target.value.match(/^[0-9]*[.,]?[0-9]*$/) &&
                    handleFromToAmount(e.target.value, 'to')
                  }
                />
                <div className="border border-gray-600  rounded-md px-4 py-2 min-w-[100px] h-12 flex items-center justify-center">
                  {swapState.to.symbol}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <ConnectKitButton.Custom>
              {({
                isConnected,
                isConnecting,
                show,
                hide,
                address,
                ensName,
                chain,
              }) => {
                return (
                  <button
                    onClick={isConnected ? handleSwap : show}
                    className="flex w-full items-center justify-center rounded-md px-4 py-2 border border-gray-600  space-x-2"
                  >
                    {isSwapping ? (
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
                    {isConnected ? (
                      needApproval ? (
                        isSwapping ? (
                          'Approving & Swapping...'
                        ) : (
                          'Approve & Swap'
                        )
                      ) : isSwapping ? (
                        'Swapping...'
                      ) : (
                        'Swap'
                      )
                    ) : (
                      <>
                        <span className="">Connect wallet_</span>
                        <span className="">
                          <svg
                            width="48px"
                            height="24px"
                            viewBox="0 0 66 43"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <g
                              id="arrow"
                              stroke="none"
                              strokeWidth="1"
                              fill="none"
                              fillRule="evenodd"
                            >
                              <path
                                className="one"
                                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                                fill="#0c0a09"
                              ></path>
                              <path
                                className="two"
                                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                                fill="#0c0a09"
                              ></path>
                              <path
                                className="three"
                                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                                fill="#0c0a09"
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </>
                    )}
                  </button>
                );
              }}
            </ConnectKitButton.Custom>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuySellSwap;
