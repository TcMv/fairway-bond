'use client';

const courses = [
  {
    name: 'Headland Golf Club',
    location: 'Buderim',
    desc: 'A championship layout winding through natural bushland. Tree-lined fairways and elevated greens demand precision.',
    color: 'from-emerald-900/40',
  },
  {
    name: 'Maroochydore Golf Club',
    location: 'Maroochydore',
    desc: 'Parkland style with water hazards in play on multiple holes. Strategic shot-making rewarded.',
    color: 'from-teal-900/40',
  },
  {
    name: 'Beerwah Golf Club',
    location: 'Beerwah',
    desc: 'Scenic hinterland course with views of the Glass House Mountains. Open fairways suit all skill levels.',
    color: 'from-green-900/40',
  },
  {
    name: 'Caloundra Golf Club',
    location: 'Caloundra',
    desc: 'Final round venue. A coastal layout where sea breezes test every club in the bag. The trophy is decided here.',
    color: 'from-sky-900/40',
  },
];

export function Courses() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-fairway to-fairway-dark">
      <div className="max-w-5xl mx-auto">
        <p className="font-body text-gold tracking-[0.2em] uppercase text-sm mb-4">
          The Courses
        </p>
        <h2 className="font-heading text-4xl md:text-5xl text-cream mb-4 leading-tight">
          Four Rounds.
          <br />
          <span className="text-gold/80">Four Venues.</span>
        </h2>
        <p className="font-body text-cream/50 mb-16 max-w-xl">
          Each round brings a new challenge. Dates to be confirmed &mdash;
          register your interest to be the first to know.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((c, i) => (
            <div
              key={c.name}
              className="group relative bg-gradient-to-br ${c.color} to-fairway-dark border border-cream/10 rounded-2xl p-8 hover:border-gold/30 transition-all duration-500"
            >
              <span className="font-heading text-gold/20 text-6xl absolute top-4 right-6">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="relative z-10">
                <p className="font-body text-cream/40 text-xs tracking-widest uppercase mb-2">
                  Round {i + 1}
                </p>
                <h3 className="font-heading text-xl text-cream mb-1">
                  {c.name}
                </h3>
                <p className="font-body text-gold/60 text-sm mb-4">
                  {c.location}
                </p>
                <p className="font-body text-cream/50 text-sm leading-relaxed">
                  {c.desc}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-gold/60 text-xs tracking-wider uppercase">
                  <span className="h-px w-6 bg-gold/30" />
                  Date TBD
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
