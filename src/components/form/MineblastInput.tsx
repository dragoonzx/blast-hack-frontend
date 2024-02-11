import classNames from 'classnames';
import React from 'react';

interface MineblastInputProps {
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const MineblastInput = ({
  className,
  value,
  onChange,
  disabled,
}: MineblastInputProps) => {
  return (
    <input
      className={classNames(
        'h-12 flex items-center text-xl outline-none w-full pr-2 bg-transparent overflow-ellipsis',
        className
      )}
      inputMode="decimal"
      minLength={1}
      maxLength={79}
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder="0.0"
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default MineblastInput;
