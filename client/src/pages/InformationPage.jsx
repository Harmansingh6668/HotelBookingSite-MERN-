import Container from "../components/ui/Container";

const pageContent = {
  help: {
    eyebrow: "Support",
    title: "Help Center",
    intro: "Find quick answers about searching, booking, payments, and managing your stay.",
    sections: [
      ["How do I search for a hotel?", "Enter a destination, check-in date, check-out date, guest count, and room count in the search bar. Results are filtered using the selected dates and room availability."],
      ["How do I manage a booking?", "Open your Profile page after signing in to view your booking history and upcoming stays."],
      ["What if I need more help?", "Use the Contact page to reach the Aau Ji support team."],
    ],
  },
  contact: {
    eyebrow: "Support",
    title: "Contact",
    intro: "We are here to help with your stay and booking questions.",
    sections: [
      ["Email", "support@aauji.example"],
      ["Response time", "Our support team aims to respond within one business day."],
      ["Before contacting us", "Keep your booking reference, account email, and stay dates ready so we can help faster."],
    ],
  },
  cancellation: {
    eyebrow: "Booking policy",
    title: "Cancellation policy",
    intro: "Cancellation terms depend on the property and the booking status.",
    sections: [
      ["Before cancelling", "Review your booking details and the applicable property policy. Some reservations may have date or availability restrictions."],
      ["How to request cancellation", "Sign in and contact support with your booking reference. Cancellation availability is confirmed by the booking system."],
      ["Refunds", "If a refund applies, the timing depends on the payment method and payment provider."],
    ],
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy policy",
    intro: "Aau Ji uses account and booking information to provide hotel search, reservations, and support.",
    sections: [
      ["Information we use", "We use information such as your name, email, phone number, search details, and booking details to operate the service."],
      ["How we protect it", "Access to account and booking data is restricted to authenticated users and authorized service operations."],
      ["Your choices", "Contact support if you need help reviewing or updating your account information."],
    ],
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms of service",
    intro: "By using Aau Ji, you agree to provide accurate booking information and use the service lawfully.",
    sections: [
      ["Bookings", "A booking is subject to room availability, valid dates, guest limits, and the property’s policies."],
      ["Account responsibility", "Keep your login credentials secure and notify support if you suspect unauthorized access."],
      ["Service information", "Hotel availability, prices, amenities, and policies may change as properties update their listings."],
    ],
  },
};

function InformationPage({ type }) {
  const content = pageContent[type];

  return (
    <main className="min-h-screen bg-[#FAF8F2] py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#C8922E]">
            {content.eyebrow}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[#1F2925] sm:text-4xl">
            {content.title}
          </h1>
          <p className="mt-4 text-[#66736D]">{content.intro}</p>

          <div className="mt-10 space-y-5">
            {content.sections.map(([heading, text]) => (
              <section
                key={heading}
                className="rounded-[16px] border border-[#DDE5DF] bg-white p-6"
              >
                <h2 className="text-lg font-semibold text-[#1F2925]">{heading}</h2>
                <p className="mt-2 text-sm leading-6 text-[#66736D]">{text}</p>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}

export default InformationPage;
