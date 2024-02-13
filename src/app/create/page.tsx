'use client';

import React, { use, useEffect, useState } from 'react';
import {
  getAllVaults,
  getProjectData,
  MineblastProjectData,
} from '@/lib/onchain';
import { useAccount, useBalance } from 'wagmi';
import { AddrString } from '@/lib/wagmiConfig';
import { parseEther } from 'viem';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import MineblastInput from '@/components/form/MineblastInput';
import NumericInput from '@/components/form/NumericInput';
import { DatePickerWithPresets } from '@/components/form/DatePickerWithPresets';
import NewTokenForm from '@/components/create/NewTokenForm';
import VaultInfo from '@/components/vault/VaultInfo';
import { Button } from '@/components/ui/button';

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
      <Card className='h-[200px] w-[400px]'>
          <CardHeader>
              <h3 className="font-semibold leading-none tracking-tight">Create token & vault</h3>
          </CardHeader>
          <CardContent>
          <div className="font-sora">
                <div className='flex flex-col'>
                <label className='text-xs'>token name</label>
                <div className='flex items-center'>
                    <MineblastInput
                    className=''
                    type="text" 
                    placeholder="Token Name"
                    value={tokenName}
                    onChange={setTokenName}
                    />
                </div>
                </div>
                <div className='flex flex-col'>
                <label className='text-xs'>symbol</label>
                <div className='flex items-center'>
                    <p className='text-xl'>$ </p>
                    <MineblastInput
                    type="text" 
                    placeholder="TKN"
                    value={tokenSymbol}
                    onChange={setTokenSymbol}
                    />
                </div>
                </div>
            </div>
          </CardContent>
      </Card>
      <Card className='h-[200px] w-[400px] absolute translate-x-[200px] translate-y-[130px] bg-gray-900'>
          <CardHeader>
          </CardHeader>
          <CardContent>
            <div className="font-sora">
                <div className='flex flex-col'>
                  <label className='text-xs'>total supply</label>
                  <div className='flex items-center'>
                      <NumericInput
                      className=''
                      placeholder="100 000 000"
                      value={totalSupply}
                      onChange={setTotalSupply}
                      />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <label className='text-xs'>creator share %</label>
                  <div className='flex items-center'>
                      <NumericInput
                      placeholder="9.5"
                      value={ownerShare}
                      onChange={setOwnerShare}
                      />
                  </div>
                </div>
            </div>
          </CardContent>
      </Card>
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
