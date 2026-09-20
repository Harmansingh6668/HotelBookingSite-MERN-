import Container from "../components/ui/Container";
import SearchBox from "../components/search/SearchBox";
import PopularDestinations from "../components/home/PopularDestinations";
import FeaturedHotels from "../components/home/FeaturedHotels";
import WhyAauJi from "../components/home/WhyAauJi";
function Home() {
  return (
    <div>
      <section className="relative min-h-[680px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2200&q=85"
          alt="Luxury hotel surrounded by nature"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#083D2D]/90 via-[#083D2D]/65 to-[#083D2D]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#083D2D]/60 via-transparent to-transparent" />

        <Container className="relative flex min-h-[680px] items-center">
          <div className="w-full max-w-4xl py-20 text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#E6C77A] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#E6C77A]" />
              Stay somewhere special
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-7xl">
              Find your perfect stay, wherever you go.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
              Discover welcoming hotels, beautiful destinations, and stays that
              make every journey feel like home.
            </p>

            <SearchBox />

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">
              <span>✓ Handpicked stays</span>
              <span>✓ Best price promise</span>
              <span>✓ Trusted by travellers</span>
            </div>
          </div>
        </Container>
      </section>

      <PopularDestinations />

      <FeaturedHotels />

      <WhyAauJi />
    </div>
  );
}

export default Home;
