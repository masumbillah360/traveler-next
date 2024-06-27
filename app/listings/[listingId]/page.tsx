import getCurrentUser from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import EmptyState from "@/app/components/ui/EmptyState";
import React from "react";
import ListingClient from "../ListingClient";
import getReservation from "@/app/actions/getReservation";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { data, success, message } = await getListingById({ params });
  if (!data && !success) {
    return <EmptyState showReset title="Not Found" subTitle={message} />;
  }
  const currentUser = await getCurrentUser();
  const reservations = await getReservation(params);

  return (
    <ListingClient
      currentUser={currentUser}
      listing={data!}
      reservations={reservations}
    />
  );
};

export default ListingPage;
