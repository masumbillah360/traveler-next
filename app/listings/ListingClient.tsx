"use client";

import axios from "axios";
import toast from "react-hot-toast";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import Container from "../components/ui/Container";
import useLoginModal from "../hooks/useLoginModal";
import ListingReservation from "./ListingReservation";
import { Listing, Reservation, User } from "@prisma/client";
import { categories } from "../components/shared/navbar/Categories";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export type ListingWithUser = Listing & { user: User };

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface IListing {
  listing: ListingWithUser;
  reservations?: Reservation[];
  currentUser: User | null;
}

const ListingClient = ({
  listing,
  currentUser,
  reservations = [],
}: IListing) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [totalPrice, setTotalPrice] = useState(listing.price);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);
    axios
      .post("/api/reservation", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success("Reservation created successfully!");
        setDateRange(initialDateRange);
        router.push(`/trips`);
      })
      .catch(() => {
        toast.error("Failed to create reservation");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    dateRange.startDate,
    dateRange.endDate,
    listing.id,
    loginModal,
    totalPrice,
    router,
  ]);
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);
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
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 gap-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
