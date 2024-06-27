import getCurrentUser from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import EmptyState from "@/app/components/ui/EmptyState";
import React from "react";
import ListingClient from "../ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const { data, success, message } = await getListingById({ params });
  if (!data && !success) {
    return <EmptyState showReset title="Not Found" subTitle={message} />;
  }
  const currentUser = await getCurrentUser();

  return <ListingClient currentUser={currentUser} listing={data!} />;
};

export default ListingPage;
