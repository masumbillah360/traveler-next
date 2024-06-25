"use client";

import toast from "react-hot-toast";
import { User } from "@prisma/client";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../../ui/Avatar";
import MenuItem from "../../ui/MenuItem";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

interface userMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: userMenuProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 w-full">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
          Your Home
        </div>
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
            {currentUser ? (
              <>
                <MenuItem label="Trips" onClick={() => {}} />
                <MenuItem label="Favorites" onClick={() => {}} />
                <MenuItem label="Reservation" onClick={() => {}} />
                <MenuItem label="Properties" onClick={() => {}} />
                <MenuItem label="Traveler Home" onClick={() => {}} />
                <MenuItem label="Logout" onClick={() => {
                  signOut();
                  toast.success("Logged out successfully!");
                }} />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={() => {
                    setIsMenuOpen(false);
                    loginModal.onOpen();
                  }}
                />
                <MenuItem
                  label="Sign UP"
                  onClick={() => {
                    setIsMenuOpen(false);
                    registerModal.onOpen();
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
