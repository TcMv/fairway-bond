'use client';

const sponsors = [
  {
    name: 'Tortoise & Hare Wellness',
    tier: 'Presenting Sponsor',
    desc: 'Pioneering AI-powered workplace psychological safety. Proud to support connection across generations.',
    logo: 'T&H',
    color: 'from-emerald-800/30',
  },
  {
    name: 'Your Brand Here',
    tier: 'Sponsor Slot Available',
    desc: 'Align your brand with a community-driven event celebrating family, sport, and the Sunshine Coast lifestyle.',
    logo: '+',
    color: 'from-cream/5',
    placeholder: true,
  },
  {
    name: 'Your Brand Here',
    tier: 'Sponsor Slot Available',
    desc: 'Multiple sponsorship tiers available. Reach families and golf enthusiasts across four events.',
    logo: '+',
    color: 'from-cream/5',
    placeholder: true,
  },
];

export function Sponsors() {
  return (
    <section className="relative py-32 px-6 bg-fairway-dark">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-gold tracking-[0.2em] uppercase text-sm mb-4">
          Supported By
        </p>
        <h2 className="font-heading text-4xl md:text-5xl text-cream mb-16 leading-tight">
          Our Sponsors
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {sponsors.map((s) => (
            <div
              key={s.name}
              className={`bg-gradient-to-br ${s.color} to-fairway-dark border ${
                s.placeholder ? 'border-dashed border-cream/20' : 'border-cream/10'
              } rounded-2xl p-8 text-center group hover:border-gold/30 transition-all duration-500`}
            >
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-heading ${
                  s.placeholder
                    ? 'bg-cream/5 text-cream/30'
                    : 'bg-gold/20 text-gold'
                }`}
              >
                {s.logo}
              </div>
              <h3 className="font-heading text-lg text-cream mb-1">{s.name}</h3>
              <p className="font-body text-gold/60 text-xs tracking-widest uppercase mb-4">
                {s.tier}
              </p>
              <p className="font-body text-cream/50 text-sm leading-relaxed">
                {s.desc}
              </p>
              {s.placeholder && (
                <a
                  href="#sponsor"
                  className="inline-block mt-6 text-gold text-sm hover:text-gold-light transition-colors"
                >
                  Enquire &rarr;
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
