import Container from "../ui/Container";
import DestinationCard from "./DestinationCard";

const destinations = [
  {
    name: "Amritsar",
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Chandigarh",
    image:
      "https://th.bing.com/th/id/OIP.2jmUIvRBzCpP8ZmvjUI9NwHaDt?w=346&h=174&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3",
  },
  {
    name: "Delhi",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Goa",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
  },
];

function PopularDestinations() {
  return (
    <section className="bg-[#FAF8F2] py-20">
      <Container>

        <h2 className="text-3xl font-semibold text-[#1F2925] sm:text-4xl">
          Explore Popular Destinations
        </h2>

        <p className="mt-3 text-[#66736D]">
          From peaceful retreats to vibrant city hotels.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.name}
              destination={destination}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}

export default PopularDestinations;