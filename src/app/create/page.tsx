'use client';

import React, { use, useEffect, useState } from 'react';
import { useAccount, useBalance, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DatePickerWithPresets } from '@/components/form/DatePickerWithPresets';
import { Button } from '@/components/ui/button';
import NameSymbolForm from '@/components/create/NameSymbolForm';
import SupplyForm from '@/components/create/SupplyForm';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Loader2 } from "lucide-react"
import { 
  useWriteMineblastFactoryCreateVaultWithNewToken,
} from '../../generated'
import { useRouter } from 'next/navigation'
import { formatNameForLink, formatNameForOnchain } from '@/lib/onchain';


const CreatePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { address, isConnecting, isDisconnected } = useAccount();
  const ETHbalance = useBalance({ address });
  
  const [tokenName, setTokenName] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [ownerShare, setOwnerShare] = useState<number>(2);
  const [endDate, setEndDate] = useState<Date|undefined>();

  const [finalName, setFinalName] = useState<string>('');

  const {
    data: createHash,
    writeContract: createWriteContract,
    isPending: isPendingCreate,
    error: liqError,
  } = useWriteMineblastFactoryCreateVaultWithNewToken();

  const createTx =
    useWaitForTransactionReceipt({
      hash: createHash,
    });

  const create = async () => {
    if (notEnoughInfo) {
      return;
    }
    const supply = BigInt(totalSupply) * 10n**18n;
    const duration = BigInt(Math.floor((endDate?.getTime() ?? 0) / 1000) - Math.floor(Date.now() / 1000));
    const name = formatNameForOnchain(tokenName);
    setFinalName(name);

    createWriteContract({
      args: [supply, name, tokenSymbol, duration, ownerShare*100],
    });
  };

  const router = useRouter()

  useEffect(() => {
    if (createTx.isSuccess) {
      router.replace(`/tokens/${formatNameForLink(finalName)}`)
    }
  }, [createTx.isSuccess]);

  const notEnoughInfo = tokenName === '' || tokenSymbol === '' || totalSupply === 0 || endDate === undefined;
  const createTxLoading = isPendingCreate || createTx.isLoading;
  const buttonDisabled = createTxLoading || notEnoughInfo;

  return (
    <div className="flex items-start justify-center w-full space-x-8">
      <p className='text-[240px] font-sora -z-50 text-white text-opacity-[0.02] text-nowrap text-clip overflow-hidden select-none w-full absolute translate-y-[360px]'>{tokenName}</p>
      <p className='text-[280px] font-sora -z-50 text-white text-opacity-[0.02] text-nowrap text-clip overflow-hidden select-none w-full absolute -translate-x-[40px]'>{tokenSymbol}</p>
      <div className="w-[435px] flex flex-col items-center">
        <NameSymbolForm
          nameValue={tokenName}
          symbolValue={tokenSymbol}
          onNameChange={setTokenName}
          onSymbolChange={setTokenSymbol}
        />
        {(tokenName.length>0 && tokenSymbol.length>0) && 
          <div className='mt-6 animate-[scaleIn_0.5s_ease-out] origin-top'>
            <SupplyForm
              supplyValue={totalSupply}
              creatorShareValue={ownerShare}
              onSupplyChange={setTotalSupply}
              onCreatorShareChange={setOwnerShare}
              defaultValue={ownerShare}
            />
            <div className=' -z-50 h-[300px] w-[300px] absolute translate-x-[300px] -translate-y-[350px] opacity-30'>
              <CircularProgressbar 
                styles={buildStyles({
                  rotation: 0.66,
                  pathColor: `rgba(229, 231, 235, 0.05)`,
                  trailColor: `rgba(0, 0, 0, 0)`,
                  backgroundColor: '#3e98c7',
                })} 
                strokeWidth={10}
                value={((ownerShare??0)*2)} 
                />
            </div>
          </div>
        }
        {totalSupply>0 &&
        <Card className='h-[110px] w-[400px] bg-gray-900 mt-6 animate-[scaleIn_0.5s_ease-out] origin-top'>
            <CardContent>
              <div className='mt-3'>
              <label className='text-xs'>end date</label>
              <DatePickerWithPresets value={endDate} onChange={setEndDate}/>
              </div>
            </CardContent>
        </Card>
        }
      <div className="">
      <Button 
      onClick={create} 
      disabled={buttonDisabled} 
      className="disabled:text-gray-600 disabled:border-gray-600 disabled:hover:bg-gray-900 mt-6 border-[#f77334] text-[#f77334]">
        {createTxLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create
      </Button>
      </div>
    
      </div>
    </div>
  );
};

export default CreatePage;
