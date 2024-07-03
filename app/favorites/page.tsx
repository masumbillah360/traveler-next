import React from "react";
import EmptyState from "../components/ui/EmptyState";
import getFavoriteListings from "../actions/getFavoriteListings";
import getCurrentUser from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found!"
        subTitle="looks like you do not have favorite listings!"
      />
    );
  }
  return <FavoritesClient listings={listings} currentUser={currentUser} />
};

export default ListingPage;
