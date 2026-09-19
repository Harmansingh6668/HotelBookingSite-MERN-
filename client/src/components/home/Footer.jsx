import Container from "../ui/Container";

const footerSections = [
  {
    title: "Explore",
    links: ["Hotels", "Destinations", "Offers"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact", "Cancellation"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms"],
  },
];

function Footer() {
  return (
    <footer className="bg-[#0B4F3A] py-12 text-white">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div>
            <h2 className="text-2xl font-semibold">Aau Ji</h2>
            <p className="mt-1 text-xl font-medium" lang="pa">
              ਆਓ ਜੀ
            </p>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#E8EFEA]">
              Discover welcoming stays across India.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        className="text-sm text-[#E8EFEA] transition-colors hover:text-[#E6C77A]"
                        href="#"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-[#E8EFEA]">
          © 2026 Aau Ji
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
