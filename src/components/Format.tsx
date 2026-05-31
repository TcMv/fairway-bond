'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    step: '01',
    title: 'Team Up',
    desc: 'One parent, one child. One team. Parents play from the back tees, kids from forward tees. Handicaps keep it competitive.',
  },
  {
    step: '02',
    title: 'Alternate Shot Ambrose',
    desc: 'Both tee off. Choose the best ball. Then alternate each shot until it&rsquo;s holed. Parents play odd-numbered holes, kids play even-numbered holes.',
  },
  {
    step: '03',
    title: 'Four Rounds',
    desc: 'One round at each course. Accumulate points across the series. The team with the most points at the end takes the trophy.',
  },
  {
    step: '04',
    title: 'Celebrate',
    desc: 'Winners announced after the final round at Caloundra. Presentations, prizes, and a shared memory that lasts.',
  },
];

export function Format() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.format-step', {
      opacity: 0,
      x: -40,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        end: 'top 30%',
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-fairway-dark overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <p className="font-body text-gold tracking-[0.2em] uppercase text-sm mb-4">
          How It Works
        </p>
        <h2 className="font-heading text-4xl md:text-5xl text-cream mb-16 leading-tight">
          The Format
        </h2>

        <div className="space-y-8">
          {steps.map((s) => (
            <div
              key={s.step}
              className="format-step flex gap-6 md:gap-10 items-start group"
            >
              <span className="font-heading text-3xl md:text-4xl text-gold/30 group-hover:text-gold/60 transition-colors duration-500 min-w-[60px]">
                {s.step}
              </span>
              <div className="flex-1 border-b border-cream/10 pb-8 group-last:border-0">
                <h3 className="font-heading text-xl text-cream mb-2">
                  {s.title}
                </h3>
                <p className="font-body text-cream/60 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
