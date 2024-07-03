import EmptyState from "../components/ui/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservation";
import ReservationsClient from "./ReservationsClient";

const ReserVationPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login first!" />;
  }

  const reservations = await getReservation({
    authorId: currentUser.id
  })

  if(reservations.length === 0) {
    return (
      <EmptyState
        title="No Reservations"
        subTitle="You have no reservations yet!"
      />
    );
  }
  return <ReservationsClient reservations={reservations} currentUser={currentUser} />;
};

export default ReserVationPage;
