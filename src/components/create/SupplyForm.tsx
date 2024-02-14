'use client';

import React, { use, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import NumericInput from '@/components/form/NumericInput';
import { Slider } from "@/components/ui/slider"


interface NameSymbolFormProps {
    className?: string;
    supplyValue: number;
    creatorShareValue: number;
    onSupplyChange: (s: number) => void;
    onCreatorShareChange: (s: number) => void;
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
                onChange={(v) => onSupplyChange(v??0)}
                />
            </div>
          </div>
          <p className='text-base my-3'>creator share: {creatorShareValue?.toFixed(1)}%</p>
          <Slider
            className='w-full bg-gray-700'
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
