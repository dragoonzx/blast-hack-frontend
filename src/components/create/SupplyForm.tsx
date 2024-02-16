'use client';

import React, { use, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import NumericInput from '@/components/form/NumericInput';
import { Slider } from "@/components/ui/slider"
import classNames from 'classnames';


interface NameSymbolFormProps {
    className?: string;
    supplyValue: number;
    creatorShareValue: number;
    defaultValue?: number;
    onSupplyChange: (s: number) => void;
    onCreatorShareChange: (s: number) => void;
}

const SupplyForm = ({
    className,
    supplyValue,
    creatorShareValue,
    defaultValue,
    onSupplyChange,
    onCreatorShareChange
}: NameSymbolFormProps) => {

  return (
    <Card className={classNames(
        'h-[200px] w-[400px] bg-gray-900',
        className
    )}>
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
            defaultValue={[defaultValue??2]} 
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
