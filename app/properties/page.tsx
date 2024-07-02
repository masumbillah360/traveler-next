import PropertiesClient from "./PropertiesClient";
import EmptyState from "../components/ui/EmptyState";
import { getListings } from "../actions/getListings";
import getCurrentUser from "../actions/getCurrentUser";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please login first!" />;
  }
  const listings = await getListings({ userId: currentUser?.id });
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subTitle="You have no properties yet!"
      />
    );
  }
  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
