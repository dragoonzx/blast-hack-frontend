import classNames from 'classnames';
import React from 'react';
import MineblastInput from './MineblastInput';
import { NumericFormat } from 'react-number-format';
import { truncate18Decimals } from '@/lib/utils';

interface TokenInputProps {
  className?: string;
  value?: string;
  maxValue?: string;
  onChange?: (e: string) => void;
}

const TokenInput = ({
  className,
  value,
  maxValue,
  onChange,
}: TokenInputProps) => {

    const setMaxAmount = () => {
        if (maxValue) {
            onChange!(maxValue);
        }
    }

  return (
    <div className='flex items-center justify-between mt-1'>
    <MineblastInput
        className={classNames(className)}
        value={value ? value.toString() : ''}
        onChange={(e) =>
            e.target.value.match(/^[0-9]*[.,]?[0-9]*$/) &&
            onChange!(e.target.value)
        }
        disabled={false}
    />
    <button
    onClick={setMaxAmount}
    className="bg-transparent border border-gray-600 hover:bg-gray-600/25 rounded-md px-2 py-1 text-xs"
    >
    MAX
    </button>
    </div>
  );
};

export default TokenInput;
