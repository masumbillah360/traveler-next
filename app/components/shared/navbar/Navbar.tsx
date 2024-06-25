import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Container from "../../ui/Container";

// imported user type
import { User } from "@prisma/client";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-8">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
