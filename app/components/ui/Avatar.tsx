"use client";

import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      alt="Avatar"
      className="rounded-full p-1 border border-neutral-200"
      height={30}
      width={30}
      src={src}
    />
  );
};

export default Avatar;
