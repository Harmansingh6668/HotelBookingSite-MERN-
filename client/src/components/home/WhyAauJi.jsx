import Container from "../ui/Container";

const reasons = [
  {
    icon: "🏨",
    title: "Carefully selected stays",
    description:
      "Every stay is chosen for comfort, character, and a memorable experience.",
  },
  {
    icon: "🤝",
    title: "Easy booking",
    description:
      "Find the right place and book your next stay with just a few simple steps.",
  },
  {
    icon: "🌿",
    title: "Stays that feel like home",
    description:
      "Welcoming spaces and thoughtful details make every journey feel special.",
  },
];

function WhyAauJi() {
  return (
    <section className="bg-[#F2F5F1] py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-[#1F2925] sm:text-4xl">
            Why Aau Ji?
          </h2>

          <p className="mt-3 text-[#66736D]">
            More than a booking, it is the beginning of a better stay.
          </p>
        </div>

        <div className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden="true"
            className="absolute left-[16.67%] right-[16.67%] top-10 hidden border-t border-dashed border-[#C8922E]/50 md:block"
          />

          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="relative flex flex-col items-center text-center"
            >
              <div
                aria-label={reason.title}
                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#DDE5DF] bg-white text-4xl shadow-sm"
                role="img"
              >
                {reason.icon}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-[#1F2925]">
                {reason.title}
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#66736D]">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default WhyAauJi;