import React from 'react';
import SwapCardInputs from './SwapCardInputs';
import SwapCardFooter from './SwapCardFooter';

const SwapCard = () => {
  return (
    <div className="card  w-full">
      <div className="card-body">
        <div className="mb-4 space-x-2">
          <SwapCardInputs />
        </div>
        <div className="flex items-center justify-center relative h-12">
          <button type="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>
        <div className="mb-10 space-x-2">
          <SwapCardInputs />
        </div>
        <div className="w-full">
          <button className="btn w-full btn-primary">Swap</button>
        </div>
        <div className="mt-4">
          <SwapCardFooter />
        </div>
      </div>
    </div>
  );
};

export default SwapCard;
