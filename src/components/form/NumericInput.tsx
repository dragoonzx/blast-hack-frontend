import { NumericFormat } from 'react-number-format';

import classNames from 'classnames';
import React from 'react';

interface NumericInputProps {
  className?: string;
  value?: number;
  onChange?: (n: number|undefined) => void;
  disabled?: boolean;
  placeholder?: string;
  type?: 'text' | 'decimal';
}

const NumericInput = ({
  className,
  value,
  onChange,
  disabled = false,
  placeholder = '0.0',
  type = 'decimal',
}: NumericInputProps) => {
  return (
    <NumericFormat
      className={classNames(
        'h-12 flex items-center text-xl outline-none w-full pr-2 bg-transparent overflow-ellipsis font-sora',
        className
      )}
      inputMode={type}
      minLength={1}
      maxLength={79}
      type="text"
      placeholder={placeholder}
      displayType="input"
      allowNegative={false}
      disabled={disabled}
      thousandSeparator={' '}
      onValueChange={(e) => onChange!(e.floatValue)}
    />
  );
};

export default NumericInput;
