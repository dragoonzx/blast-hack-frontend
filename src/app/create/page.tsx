'use client';

import React, { use, useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { parseEther } from 'viem';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import MineblastInput from '@/components/form/MineblastInput';
import NumericInput from '@/components/form/NumericInput';
import { DatePickerWithPresets } from '@/components/form/DatePickerWithPresets';
import VaultInfo from '@/components/vault/VaultInfo';
import { Button } from '@/components/ui/button';
import NameSymbolForm from '@/components/create/NameSymbolForm';
import SupplyForm from '@/components/create/SupplyForm';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
  useWriteMineblastFactoryCreateVaultWithNewToken,
} from '../../generated'

const CreatePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { address, isConnecting, isDisconnected } = useAccount();
  const ETHbalance = useBalance({ address });
  
  const [tokenName, setTokenName] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');
  const [totalSupply, setTotalSupply] = useState<number|undefined>(0);
  const [ownerShare, setOwnerShare] = useState<number|undefined>(10);
  const [endDate, setEndDate] = useState<Date|undefined>();
  

  const buttonDisabled = tokenName === '' || tokenSymbol === '' || totalSupply === 0 || ownerShare === 0 || endDate === undefined;

  return (
    <div className="flex items-start justify-center w-full space-x-8">
      <p className='text-[240px] font-sora -z-50 text-gray-200 text-opacity-5 text-nowrap text-clip overflow-hidden select-none w-full absolute translate-y-[360px]'>{tokenName}</p>
      <p className='text-[240px] font-sora -z-50 text-gray-200 text-opacity-5 text-nowrap text-clip overflow-hidden select-none w-full absolute -translate-x-[40px]'>{tokenSymbol}</p>
      <div className=' -z-50 h-[400px] w-[400px] absolute translate-x-[300px] translate-y-[10px]'>
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
      <div className="w-[435px] flex flex-col">
        <NameSymbolForm
          nameValue={tokenName}
          symbolValue={tokenSymbol}
          onNameChange={setTokenName}
          onSymbolChange={setTokenSymbol}
        />
        <SupplyForm
          supplyValue={totalSupply}
          creatorShareValue={ownerShare}
          onSupplyChange={setTotalSupply}
          onCreatorShareChange={setOwnerShare}
        />
      <Card className='h-[110px] w-[400px] absolute -translate-x-[220px] translate-y-[220px] bg-gray-900'>
          <CardContent>
            <div className='mt-3'>
            <label className='text-xs'>end date</label>
            <DatePickerWithPresets value={endDate} onChange={setEndDate}/>
            </div>
          </CardContent>
      </Card>
      <div className="">
      <Button disabled={buttonDisabled} className="absolute translate-x-[200px] translate-y-[150px] disabled:text-gray-600 disabled:hover:bg-gray-900">Create</Button>
      </div>
    
      </div>
    </div>
  );
};

export default CreatePage;
