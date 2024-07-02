"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm transition hover:shadow-md cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          Any Week
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-200 flex flex-row items-center gap-3">
          <div className="hidden sm:block ">Add Guest</div>
          <div className="p-3 bg-rose-500 rounded-full text-white">
            <BiSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
