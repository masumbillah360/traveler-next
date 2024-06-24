"use client";

import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../../ui/Avatar";
import MenuItem from "../../ui/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu = () => {
  const { isOpen, onOpen } = useRegisterModal();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 w-full">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Your Home
        </div>
        <div
          onClick={() => setIsMenuOpen(!isOpen)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src="/images/placeholder.jpeg" />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="
            absolute rounded-xl shadow-md w-[40vw] md:w-full bg-white overflow-hidden right-0 top-12 text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem label="Login" onClick={() => onOpen()} />
              <MenuItem label="Sign UP" onClick={() => onOpen()} />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
