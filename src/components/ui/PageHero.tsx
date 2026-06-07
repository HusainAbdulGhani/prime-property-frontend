interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
}

export function PageHero({ eyebrow, title, description, dark = false }: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden px-4 py-16 lg:px-8 lg:py-20 ${
        dark ? "bg-primaryBlack text-neutralWhite border-b border-accentGold/20" : "bg-softGray border-b border-primaryBlack/6"
      }`}
    >
      <div className="relative mx-auto max-w-7xl animate-slide-up">
        {eyebrow && (
          <p
            className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accentGold"
          >
            {eyebrow}
          </p>
        )}
        <h1
          className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${
            dark ? "text-neutralWhite" : "text-primaryBlack"
          }`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`mt-4 max-w-2xl text-base leading-relaxed ${
              dark ? "text-neutralWhite/70" : "text-primaryBlack/60"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
