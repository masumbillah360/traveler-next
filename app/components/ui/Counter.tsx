"use client";

import React, { useCallback } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";

interface CounterProps {
  title: string;
  subTitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter = ({ title, subTitle, value, onChange }: CounterProps) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [value, onChange]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [value, onChange]);

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subTitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={onReduce}
        >
          <BiMinus />
        </div>
        <div className="font-light text-xl text-neutral-800">{value}</div>
        <div
          className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
          onClick={onAdd}
        >
          <BiPlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
