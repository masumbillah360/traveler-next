"use client";

import { User } from "@prisma/client";
import React from "react";
import useCountries from "../hooks/useCountry";
import Heading from "../components/ui/Heading";
import Image from "next/image";
import HeartButton from "../components/ui/HeartButton";

interface ListingHeadProps {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser: User | null;
}

const ListingHead = ({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.value}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt={title}
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-4">
            <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
