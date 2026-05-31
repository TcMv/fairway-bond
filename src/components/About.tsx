'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.about-line', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 50%',
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={ref}
      className="relative py-32 px-6 bg-gradient-to-b from-fairway-dark to-fairway"
    >
      <div className="max-w-4xl mx-auto">
        <div className="about-line h-px bg-gold/50 mb-12" />

        <h2 className="font-heading text-4xl md:text-5xl text-cream mb-8 leading-tight">
          More Than a Round.
          <br />
          <span className="text-gold/80">A Bond Forged on the Fairway.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div>
            <h3 className="font-heading text-xl text-gold mb-4">The Vision</h3>
            <p className="font-body text-cream/70 leading-relaxed">
              The Fairway Bond is a 4-round parent-child golf series across the
              Sunshine Coast&rsquo;s finest courses. It&rsquo;s not about the
              scorecard &mdash; it&rsquo;s about the moments between shots. The
              walks down the 7th fairway. The high-fives after a par save. The
              shared joy of a game that spans generations.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl text-gold mb-4">The Format</h3>
            <p className="font-body text-cream/70 leading-relaxed">
              Alternate shot Ambrose. Parents tee off on odd holes, kids on even
              holes. Every round is played as a team &mdash; one ball, two
              generations, shared strategy. Handicapped for fairness. Designed
              for connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
