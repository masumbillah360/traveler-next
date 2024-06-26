"use client";

import React from "react";
import Container from "../../ui/Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../../ui/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "Discover beach-themed experiences",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "Indulge in windmill-inspired adventures",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Discover modern-inspired accommodations",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "Experience mountain-themed experiences",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "Experience mountain-themed experiences",
  },
  {
    label: "Island",
    icon: GiIsland,
    description: "Experience mountain-themed experiences",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "Experience mountain-themed experiences",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "Experience mountain-themed experiences",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "Experience mountain-themed experiences",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "Experience mountain-themed experiences",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "Experience mountain-themed experiences",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "Experience mountain-themed experiences",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "Experience mountain-themed experiences",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "Experience mountain-themed experiences",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "Experience mountain-themed experiences",
  },
];
const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";
  if (!isMainPage) return null;

  return (
    <Container>
      <div className="flex flex-row items-center justify-between pt-4 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-h-0 scrollbar-w-0 scrollbar-corner-rose-500 scrollbar scrollbar-thumb-rose-500 scrollbar-track-slate-300 overflow-scroll overflow-x-auto overflow-y-hidden">
        {categories.map(({ label, icon, description }) => (
          <CategoryBox
            key={label + "Nav"}
            label={label}
            icon={icon}
            description={description}
            selected={category === label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
