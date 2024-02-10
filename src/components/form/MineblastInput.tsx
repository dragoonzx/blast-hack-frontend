import classNames from 'classnames';
import React from 'react';

interface MineblastInputProps {
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MineblastInput = ({
  className,
  value,
  onChange,
}: MineblastInputProps) => {
  return (
    <input
      className={classNames(
        'min-h-12 flex items-center text-xl outline-none',
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
    />
  );
};

export default MineblastInput;
