'use client';

import React, { use, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import MineblastInput from '@/components/form/MineblastInput';

interface NameSymbolFormProps {
    className?: string;
    nameValue: string;
    symbolValue: string;
    onNameChange: (s: string) => void;
    onSymbolChange: (s: string) => void;
}

const NameSymbolForm = ({
    className,
    nameValue,
    symbolValue,
    onNameChange,
    onSymbolChange
}: NameSymbolFormProps) => {

  return (
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
                value={nameValue}
                onChange={onNameChange}
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
                value={symbolValue}
                onChange={onSymbolChange}
                />
            </div>
            </div>
        </div>
        </CardContent>
    </Card>
  );
};

export default NameSymbolForm;
