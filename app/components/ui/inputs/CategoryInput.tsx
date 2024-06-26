"use client";

import React from "react";
import { IconType } from "react-icons";

interface Props {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
}

const CategoryInput = ({
  onClick,
  selected = false,
  label,
  icon: Icon,
}: Props) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col gap-3 items-center justify-center rounded-xl border-2 p-4 transition cursor-pointer hover:border-black ${
        selected ? "border-black" : "border-neutral-200"
      }`}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
