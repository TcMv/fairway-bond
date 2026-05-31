'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: '01',
    t: 'Team Up',
    d: 'One parent, one child. One team. Parents from the back tees, kids from forward tees. Handicaps keep it fair.',
  },
  {
    n: '02',
    t: 'Alternate Shot Ambrose',
    d: 'Both tee off. Choose the best ball. Then alternate each shot until holed. Parents play odd holes, kids play even.',
  },
  {
    n: '03',
    t: 'Four Rounds',
    d: 'One round at each course across the Sunshine Coast. Accumulate points. The team with the most wins the trophy.',
  },
  {
    n: '04',
    t: 'Celebrate',
    d: 'Winners announced after the final round at Caloundra. Presentations, prizes, and memories that last a lifetime.',
  },
];

export function Format() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        pin: true,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
      },
    });

    // Animate through each step
    steps.forEach((_, i) => {
      const prevIdx = i - 1;
      if (prevIdx >= 0) {
        tl.to(`.step-${prevIdx}`, {
          opacity: 0,
          y: -30,
          duration: 0.4,
        });
      }
      tl.to(
        `.step-${i}`,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        },
        '<'
      );
    });
  });

  // Mobile: just show all steps without pinning
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(max-width: 767px)', () => {
      // Kill any pinning from above on mobile
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.pin) st.kill();
      });
    });
  });

  return (
    <section
      ref={sectionRef}
      id="format"
      className="relative bg-fairway-dark overflow-hidden scroll-mt-20 pb-16 md:pb-20"
    >
      {/* Desktop: pinned scroll section */}
      <div ref={pinRef} className="hidden md:flex relative h-screen items-center">
        <div className="max-w-5xl mx-auto px-6 w-full">
          <p className="font-body text-gold-dim tracking-[0.25em] uppercase text-sm mb-4">
            How It Works
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-16">
            The Format
          </h2>

          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`step-${i} absolute max-w-3xl ${i === 0 ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: i === 0 ? 'translateY(0)' : 'translateY(-30px)' }}
            >
              <div className="flex items-start gap-6">
                <span className="font-heading text-5xl md:text-6xl text-gold/20 min-w-[80px]">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-heading text-2xl text-cream mb-3">{s.t}</h3>
                  <p className="font-body text-cream/50 leading-relaxed max-w-xl">
                    {s.d}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`step-dot w-2 h-2 rounded-full transition-colors duration-500 ${i === 0 ? 'bg-gold' : 'bg-cream/20'}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="md:hidden py-20 px-6">
        <p className="font-body text-gold-dim tracking-[0.25em] uppercase text-sm mb-4">
          How It Works
        </p>
        <h2 className="font-heading text-4xl text-cream mb-12">The Format</h2>

        <div className="space-y-12">
          {steps.map((s) => (
            <div key={s.n} className="flex items-start gap-4">
              <span className="font-heading text-3xl text-gold/20 min-w-[50px]">
                {s.n}
              </span>
              <div>
                <h3 className="font-heading text-xl text-cream mb-2">{s.t}</h3>
                <p className="font-body text-cream/50 leading-relaxed text-sm">
                  {s.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
