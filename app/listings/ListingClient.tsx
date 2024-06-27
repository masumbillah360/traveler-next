"use client";

import { Listing, User } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import { categories } from "../components/shared/navbar/Categories";
import Container from "../components/ui/Container";
import ListingHead from "./ListingHead";
export type ListingWithUser = Listing & { user: User };

interface IListing {
  listing: ListingWithUser;
  currentUser: User | null;
}

const ListingClient = ({ listing, currentUser }: IListing) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  if (!hasMounted) {
    return null;
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            currentUser={currentUser}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
