"use client";

import { User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
interface Props {
  listingId: string;
  currentUser: User | null | undefined;
}
const HeartButton = ({ listingId, currentUser }: Props) => {
    const hasFavorite = true;
    const toggleFavorite = () => {};

  return <div onClick={toggleFavorite} className="relative hover:opacity-80 cursor-pointer transition">
    <AiOutlineHeart size={26} className="fill-white absolute -top-[2px] -right-[2px]" />
    <AiFillHeart size={24} className={hasFavorite ? "fill-rose-500": "fill-neutral-500/70"} />
  </div>;
};

export default HeartButton;
