import classNames from 'classnames';
import React from 'react';

interface MineblastInputProps {
  className?: string;
  value?: string;
  onChange?: (s: string) => void;
  disabled?: boolean;
  placeholder?: string;
  type?: 'text' | 'decimal';
}

const MineblastInput = ({
  className,
  value,
  onChange,
  disabled,
  placeholder = '0.0',
  type = 'decimal',
}: MineblastInputProps) => {
  return (
    <input
      className={classNames(
        'h-12 flex items-center text-xl outline-none w-full pr-2 bg-transparent overflow-ellipsis font-sora',
        className
      )}
      inputMode={type}
      minLength={1}
      maxLength={79}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange!(e.target.value)}
      disabled={disabled}
    />
  );
};

export default MineblastInput;
