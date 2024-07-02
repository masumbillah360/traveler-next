"use client";

import toast from "react-hot-toast";
import { User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../../ui/Avatar";
import MenuItem from "../../ui/MenuItem";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface userMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: userMenuProps) => {
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3 w-full">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Your Home
        </div>
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-300 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
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
                <MenuItem label="Trips" onClick={() => router.push("/trips")} />
                <MenuItem label="Favorites" onClick={() => router.push("/favorites") } />
                <MenuItem label="Reservation" onClick={() => router.push("/reservations")} />
                <MenuItem label="Properties" onClick={() => {}} />
                <MenuItem label="Traveler Home" onClick={rentModal.onOpen} />
                <MenuItem
                  label="Logout"
                  onClick={() => {
                    signOut();
                    toast.success("Logged out successfully!");
                  }}
                />
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
