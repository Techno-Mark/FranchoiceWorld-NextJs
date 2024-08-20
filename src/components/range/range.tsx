import React, { useState, useEffect } from "react";


function DualRangeSlider({ min, max, onChange }: any) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      min,
      Math.min(Number(event.target.value), maxVal - 1)
    );
    setMinVal(value);
    onChange({ min: value, max: maxVal });
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      minVal + 1,
      Math.min(Number(event.target.value), max)
    );
    setMaxVal(value);
    onChange({ min: minVal, max: value });
  };

  return (
    <div className="relative w-full h-16">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={handleMinChange}
        className="absolute pointer-events-auto appearance-none z-30 h-2 w-full opacity-0 cursor-pointer"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
       onChange={handleMaxChange}
        className="absolute pointer-events-auto appearance-none z-30 h-2 w-full opacity-0 cursor-pointer"
      />

      <div className="relative z-10 h-2">
        <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>
        <div
          className="absolute z-20 top-0 bottom-0 rounded-md bg-[--hyper-link]"
          style={{
            left: `${((minVal - min) / (max - min)) * 100}%`,
            right: `${100 - ((maxVal - min) / (max - min)) * 100}%`,
          }}
        ></div>
        <div
          className="absolute z-30 w-6 h-6 top-[-8px] bg-[--hyper-link] border-2 border-[--hyper-link] rounded-full"
          style={{
            left: `calc(${((minVal - min) / (max - min)) * 100}% - 12px)`,
          }}
        ></div>
        <div
          className="absolute z-30 w-6 h-6 top-[-8px] bg-[--hyper-link] border-2 border-[--hyper-link] rounded-full"
          style={{
            left: `calc(${((maxVal - min) / (max - min)) * 100}% - 12px)`,
          }}
        ></div>
      </div>

      <div className="flex justify-between items-center pt-6">
        <div className="z-30 relative">Min: {minVal}</div>
        <div className="z-30 relative">Max: {maxVal}</div>
      </div>
    </div>
  );
}

export default DualRangeSlider;
