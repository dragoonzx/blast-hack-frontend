import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ConnectKitButton } from 'connectkit';
import { useAccount, useBalance, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';
import { contracts } from '@/lib/wagmiConfig';

const BuySellSwap = () => {
  const { address } = useAccount();
  const { data: ethBalanceData } = useBalance({
    address,
    query: {
      enabled: !!address,
    },
  });

  const fromBalanceData = ethBalanceData;
  const { data: erc20BalanceWithDecimalsData } = useReadContracts({
    contracts: [
      {
        abi: contracts.erc20.abi,
        // test mbti token
        address: '0xf75b2FC80bEBF328Ce4e1766A9C68d2055f76273',
        functionName: 'balanceOf',
        args: [address!],
      },
      {
        abi: contracts.erc20.abi,
        // test mbti token
        address: '0xf75b2FC80bEBF328Ce4e1766A9C68d2055f76273',
        functionName: 'decimals',
      },
    ],
    query: {
      enabled: !!address,
    },
  });
  const toBalanceData = erc20BalanceWithDecimalsData
    ? {
        value: erc20BalanceWithDecimalsData[0].result,
        decimals: erc20BalanceWithDecimalsData[1].result,
      }
    : null;

  return (
    <Card>
      <CardHeader>
        <h3 className="font-semibold leading-none tracking-tight">
          Swap panel
        </h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 font-sora">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between  w-full">
              <label className="text-sm text-muted-foreground">From</label>
              {address ? (
                <p className="text-xs">
                  <span className="text-muted-foreground">Balance: </span>
                  {fromBalanceData
                    ? formatUnits(
                        fromBalanceData!.value,
                        fromBalanceData!.decimals
                      )
                    : 0.0}
                </p>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <input
                className="h-12 flex items-center text-xl outline-none"
                inputMode="decimal"
                minLength={1}
                maxLength={79}
                type="text"
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder="0.0"
              />
              <button className="bg-[#ececfe] rounded-md px-2 py-1 text-xs mr-2">
                MAX
              </button>
              <div className="border rounded-md px-4 py-2 min-w-[100px] h-12 flex items-center justify-center">
                WETH
              </div>
            </div>
          </div>
          <div className="flex items-center w-full space-x-2">
            <div className="w-full bg-[#ececfe] h-0.5" />
            <button className="p-3 hover:bg-[#ececfe] rounded-md transition-colors">
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                focusable="false"
                className="fill-[#0c0a09]"
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
            <div className="w-full bg-[#ececfe] h-0.5" />
          </div>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between  w-full">
              <label className="text-sm text-muted-foreground">From</label>
              {address ? (
                <p className="text-xs">
                  <span className="text-muted-foreground">Balance: </span>
                  {toBalanceData
                    ? formatUnits(toBalanceData.value!, toBalanceData.decimals!)
                    : 0.0}
                </p>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <input
                className="h-12 flex items-center text-xl outline-none"
                inputMode="decimal"
                minLength={1}
                maxLength={79}
                type="text"
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder="0.0"
              />
              <div className="border rounded-md px-4 py-2 min-w-[100px] h-12 flex items-center justify-center">
                MIB
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
                    onClick={show}
                    className="flex w-full items-center justify-center border rounded-md px-4 py-2 border-[#e96828] space-x-2 cta"
                  >
                    {isConnected ? (
                      address ? (
                        `${address.slice(0, 6)}...${address.slice(-4)}`
                      ) : (
                        'Something wrong'
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