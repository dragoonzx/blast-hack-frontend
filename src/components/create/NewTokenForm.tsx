'use client';

import React, { use, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import MineblastInput from '@/components/form/MineblastInput';
import NumericInput from '@/components/form/NumericInput';
import { DatePickerWithPresets } from '@/components/form/DatePickerWithPresets';

interface NewVaultInfo {
    tokenName: string | undefined;
    tokenSymbol: string| undefined;
    totalSupply: number| undefined;
    ownerShare: number| undefined;
    endDate: Date| undefined;
}

interface VaultInfoProps {
    className?: string;
    onChange: (info: NewVaultInfo) => void;
}

const NewTokenForm = ({
    className,
    onChange
}: VaultInfoProps) => {

  const [tokenName, setTokenName] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');
  const [totalSupply, setTotalSupply] = useState<number|undefined>(0);
  const [ownerShare, setOwnerShare] = useState<number|undefined>(0);
  const [endDate, setEndDate] = useState<Date|undefined>();
    
    useEffect(() => {
        onChange({tokenName, tokenSymbol, totalSupply, ownerShare, endDate});
    }, [tokenName, tokenSymbol, totalSupply, ownerShare, endDate]);

  return (
    <Card>
        <CardHeader>
            <h3 className="font-semibold leading-none tracking-tight">Create Token & Pool</h3>
        </CardHeader>
        <CardContent>
            <div>
            <div className="font-sora flex">
                <div className='flex flex-col w-1/3'>
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
                <div className='flex flex-col'>
                <label className='text-xs'>token name</label>
                <div className='flex items-center'>
                    <MineblastInput
                    className='w-full'
                    type="text" 
                    placeholder="Token Name"
                    value={tokenName}
                    onChange={setTokenName}
                    />
                </div>
                </div>
            </div>
            <div className="font-sora flex">
                <div className='flex flex-col w-1/3'>
                <label className='text-xs'>creator share %</label>
                <div className='flex items-center'>
                    <NumericInput
                    placeholder="9.5"
                    value={ownerShare}
                    onChange={setOwnerShare}
                    />
                </div>
                </div>
                <div className='flex flex-col'>
                <label className='text-xs'>total supply</label>
                <div className='flex items-center'>
                    <NumericInput
                    className='w-full'
                    placeholder="100 000 000"
                    value={totalSupply}
                    onChange={setTotalSupply}
                    />
                </div>
                </div>
            </div>
            <div className='mt-3'>
                <label className='text-xs'>end date</label>
                <DatePickerWithPresets value={endDate} onChange={setEndDate}/>
            </div>
            </div>
        </CardContent>
    </Card>
  );
};

export default NewTokenForm;
