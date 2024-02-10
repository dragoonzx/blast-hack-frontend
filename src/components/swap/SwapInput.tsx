import { NumericFormat } from 'react-number-format';
import { useState } from 'react';

const styleInputDisabled = {
  '--tw-border-opacity': 0.1,
  borderColor: 'hsla(var(--bc) / var(--tw-border-opacity, 1))',
};

const SwapInput = (props: {maxValue: number, onChange: (value:number)=>void}) => {
  const [value, setValue] = useState<number|undefined>(0);

  const onMaxClick = () => {
    setValue(props.maxValue);

    props.onChange(props.maxValue);
  }

  const onValueChange = (value: number|undefined) => {
    setValue(value);

    props.onChange(value || 0);
  }

  return (
    <div className="form-control h-full w-full relative drop-shadow-xl">
      <NumericFormat
        style={{}}
        value={value}
        className="input input-bordered focus:shadow-none hover:border-opacity-40 focus:border-opacity-40 !rounded-l-none px-0 pl-4 pr-12 w-full h-full"
        displayType="input"
        allowNegative={false}
        disabled={false}
        thousandSeparator={' '}
        onValueChange={(e) => onValueChange(e.floatValue)}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <button onClick={onMaxClick} className="btn btn-ghost btn-xs">max</button>
      </div>
    </div>
  );
};

export default SwapInput;
