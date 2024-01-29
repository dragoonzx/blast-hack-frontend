import { NumericFormat } from 'react-number-format';

const styleInputDisabled = {
  '--tw-border-opacity': 0.1,
  borderColor: 'hsla(var(--bc) / var(--tw-border-opacity, 1))',
};

const SwapInput = () => {
  return (
    <div className="form-control h-full w-full relative">
      <NumericFormat
        style={{}}
        value={0}
        className="input input-bordered focus:shadow-none hover:border-opacity-40 focus:border-opacity-40 !rounded-l-none px-0 pl-4 pr-12 w-full h-full"
        displayType="input"
        allowNegative={false}
        disabled={false}
        thousandSeparator={' '}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <button className="btn btn-ghost btn-xs">max</button>
      </div>
    </div>
  );
};

export default SwapInput;
