import { useMemo } from 'react';
import SwapInput from './SwapInput';

const SwapCardInputs = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm">
        <span>Send tokens</span>
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block w-4 mr-2 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="font-medium">
            {'0.0'} {'BSC'}
          </span>
        </span>
      </div>
      <div className="flex h-16 pt-2 relative">
        {/* <SwapSelect
          tokenList={tokenList}
          token={swapSnap[tokenType]}
          setToken={(token: TokenType) => {
            swapState[tokenType] = token;
            onTokenChange && onTokenChange(token);
          }}
        /> */}
        <div className="relative w-full">
          <span className="text-xs right-0 -bottom-6 absolute font-light">
            {2}
          </span>
          <SwapInput />
        </div>
      </div>
    </div>
  );
};

export default SwapCardInputs;
