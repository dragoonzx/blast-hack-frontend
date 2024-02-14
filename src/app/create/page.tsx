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

const CreatePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { address, isConnecting, isDisconnected } = useAccount();
  const ETHbalance = useBalance({ address });
  
  const [tokenName, setTokenName] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');
  const [totalSupply, setTotalSupply] = useState<number|undefined>(0);
  const [ownerShare, setOwnerShare] = useState<number|undefined>(0);
  const [endDate, setEndDate] = useState<Date|undefined>();

  return (
    <div className="flex items-start justify-center w-full space-x-8">
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
      <Button className="absolute translate-x-[200px] translate-y-[150px]">Create</Button>
      </div>

      </div>
    </div>
  );
};

export default CreatePage;
