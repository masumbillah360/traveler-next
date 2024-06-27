import Container from "./components/ui/Container";
import EmptyState from "./components/ui/EmptyState";

export default function Home() {
  const isEmpty = true;
  if (isEmpty) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <div>My Future listings</div>
      </div>
    </Container>
  );
}
