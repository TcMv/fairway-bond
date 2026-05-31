'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    name: 'Headland Golf Club',
    location: 'Buderim',
    round: 'Round 1',
    desc: 'A championship layout winding through natural bushland. Tree-lined fairways and elevated greens demand precision.',
    img: 'https://images.unsplash.com/photo-1587174486073-ae5aac77b6d6?w=800&q=80',
    imgHover: 'https://images.unsplash.com/photo-1593111774240-3d66aa584a56?w=800&q=80',
  },
  {
    name: 'Maroochydore Golf Club',
    location: 'Maroochydore',
    round: 'Round 2',
    desc: 'Parkland style with water hazards in play on multiple holes. Strategic shot-making rewarded at every turn.',
    img: 'https://images.unsplash.com/photo-1599596781116-acc382c1fa32?w=800&q=80',
    imgHover: 'https://images.unsplash.com/photo-1587174486073-ae5aac77b6d6?w=800&q=80',
  },
  {
    name: 'Beerwah Golf Club',
    location: 'Beerwah',
    round: 'Round 3',
    desc: 'Scenic hinterland course with views of the Glass House Mountains. Open fairways suit all skill levels.',
    img: 'https://images.unsplash.com/photo-1593111774240-3d66aa584a56?w=800&q=80',
    imgHover: 'https://images.unsplash.com/photo-1617242025661-7319c14cf138?w=800&q=80',
  },
  {
    name: 'Caloundra Golf Club',
    location: 'Caloundra',
    round: 'Final Round',
    desc: 'Coastal layout where sea breezes test every club in the bag. The trophy is decided here.',
    img: 'https://images.unsplash.com/photo-1617242025661-7319c14cf138?w=800&q=80',
    imgHover: 'https://images.unsplash.com/photo-1599596781116-acc382c1fa32?w=800&q=80',
  },
];

// Gallery images for the horizontal scroll strip
const galleryImages = [
  'https://images.unsplash.com/photo-1587174486073-ae5aac77b6d6?w=600&q=80',
  'https://images.unsplash.com/photo-1593111774240-3d66aa584a56?w=600&q=80',
  'https://images.unsplash.com/photo-1599596781116-acc382c1fa32?w=600&q=80',
  'https://images.unsplash.com/photo-1617242025661-7319c14cf138?w=600&q=80',
  'https://images.unsplash.com/photo-1535131741446-b73d1b05b6e2?w=600&q=80',
  'https://images.unsplash.com/photo-1560195577-d67e71e5fa23?w=600&q=80',
  'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
];

export function Courses() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.course-card', {
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'top 30%',
        scrub: true,
      },
    });

    // Horizontal scroll with GSAP drag
    if (scrollRef.current) {
      gsap.to(scrollRef.current, {
        x: () => -(scrollRef.current!.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: scrollRef.current,
          start: 'top 70%',
          end: () => `+=${scrollRef.current!.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }
  });

  return (
    <>
      {/* Horizontal gallery strip — like Lando's horizontal image rows */}
      <section className="relative overflow-hidden bg-fairway-dark py-24">
        <div className="px-6 mb-12">
          <p className="font-body text-gold-dim tracking-[0.25em] uppercase text-sm mb-4">
            The Venues
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-cream leading-tight">
            Four Rounds.
            <br />
            <span className="text-gold/70">Four Courses.</span>
          </h2>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 px-6 will-change-transform"
        >
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] md:w-[350px] h-[400px] rounded-2xl overflow-hidden relative group"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fairway-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-body text-cream/30 text-xs tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Course cards — hover-swap like Lando's helmets */}
      <section
        ref={sectionRef}
        className="relative py-24 md:py-32 px-6 bg-gradient-to-b from-fairway-dark to-fairway-deeper"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((c, i) => (
              <div
                key={c.name}
                className="course-card group relative bg-gradient-to-br from-cream/5 to-fairway-dark border border-cream/10 rounded-2xl overflow-hidden transition-all duration-700 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5"
              >
                {/* Image container — swaps on hover like helmet cards */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:opacity-0"
                    style={{ backgroundImage: `url(${c.img})` }}
                  />
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-0 transition-all duration-700 group-hover:opacity-100 scale-105 group-hover:scale-110"
                    style={{ backgroundImage: `url(${c.imgHover})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fairway-dark via-fairway-dark/20 to-transparent" />

                  {/* Round badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-fairway-deeper/60 backdrop-blur-sm rounded-full border border-cream/10">
                    <span className="font-body text-cream/50 text-[10px] tracking-widest uppercase">
                      {c.round}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="font-body text-gold-dim/60 text-xs tracking-widest uppercase mb-1">
                    {c.location}
                  </p>
                  <h3 className="font-heading text-xl text-cream mb-2 group-hover:text-gold transition-colors duration-500">
                    {c.name}
                  </h3>
                  <p className="font-body text-cream/40 text-sm leading-relaxed">
                    {c.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-gold-dim/40 text-[10px] tracking-wider uppercase">
                    <span className="h-px w-6 bg-gold-dim/20" />
                    Date TBD
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
