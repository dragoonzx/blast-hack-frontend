'use client';

import React, { use, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import NumericInput from '@/components/form/NumericInput';
import { Slider } from "@/components/ui/slider"


interface NameSymbolFormProps {
    className?: string;
    supplyValue: number|undefined;
    creatorShareValue: number|undefined;
    onSupplyChange: (s: number|undefined) => void;
    onCreatorShareChange: (s: number|undefined) => void;
}

const SupplyForm = ({
    className,
    supplyValue,
    creatorShareValue,
    onSupplyChange,
    onCreatorShareChange
}: NameSymbolFormProps) => {

  return (
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
                value={supplyValue}
                onChange={onSupplyChange}
                />
            </div>
          </div>
          <div className='flex flex-col'>
            <label className='text-xs'>creator share %</label>
            <div className='flex items-center'>
                <NumericInput
                placeholder="9.5"
                value={creatorShareValue}
                onChange={onCreatorShareChange}
                />
            </div>
          </div>
          <Slider
            className='w-full'
            defaultValue={[10]} 
            step={0.5}
            max={50} 
            onValueChange={(v) => {onCreatorShareChange(v[0])}}
          />
      </div>
    </CardContent>
</Card>
  );
};

export default SupplyForm;
