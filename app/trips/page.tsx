import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/ui/EmptyState";
import getReservation from "../actions/getReservation";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login first!" />;
  }
  const reservations = await getReservation({ userId: currentUser?.id });
  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservations"
        subTitle="You have no reservations yet!"
      />
    );
  }
  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
