import React from 'react';

const SwapCardFooter = () => {
  return (
    <div className="font-light">
      <div className="flex justify-between text-sm">
        <span>Price impact</span>
        <span>
          <span className="flex font-bold">{12} %</span>
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Gas cost</span>
        <span>
          <span className="font-light text-xs">~$12</span>
          <span className="font-bold ml-2">1 BSC</span>
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Min. receive</span>
        <span>
          <span className="font-bold ml-2"> 12 BSC</span>
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Service fee</span>
        <span>
          <span className="font-bold">0</span>
        </span>
      </div>
    </div>
  );
};

export default SwapCardFooter;
