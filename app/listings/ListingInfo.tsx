"use client";

import { User } from "@prisma/client";
import React from "react";
import { IconType } from "react-icons";
import useCountries from "../hooks/useCountry";
import Avatar from "../components/ui/Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

interface ListingInfoProps {
  user: User;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}: ListingInfoProps) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  const Map = dynamic(() => import("../components/ui/Map"), { ssr: false });
  return (
    <div className="flex flex-col gap-8 col-span-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-xl font-semibold">
          <div className="">Hosted by {user.name}</div>
          <Avatar src={user.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>
            {guestCount} {guestCount > 1 ? "guests" : "guest"}
          </div>
          <div>
            {roomCount} {roomCount > 1 ? "rooms" : "room"}
          </div>
          <div>
            {bathroomCount} {bathroomCount > 1 ? "bathrooms" : "bathroom"}
          </div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
