'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.about-text', {
      opacity: 0,
      x: -60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'top 40%',
        scrub: true,
      },
    });

    gsap.from('.about-stat', {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'top 40%',
        scrub: true,
      },
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 bg-gradient-to-b from-fairway-deeper to-fairway-dark overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-20">
          <p className="font-body text-gold-dim tracking-[0.25em] uppercase text-xs md:text-sm mb-4">
            About The Series
          </p>
          <div className="about-text">
            <h2 className="font-heading text-4xl md:text-6xl text-cream leading-tight">
              More Than a Round.
              <br />
              <span className="text-gold/70">
                A Bond Forged on the Fairway.
              </span>
            </h2>
          </div>
        </div>

        {/* Stats row — like Lando's site has quick facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {[
            { n: '4', l: 'Rounds' },
            { n: '4', l: 'Courses' },
            { n: '2', l: 'Generations' },
            { n: '1', l: 'Trophy' },
          ].map((s) => (
            <div key={s.l} className="about-stat text-center">
              <p className="font-heading text-5xl md:text-6xl text-gold mb-1">
                {s.n}
              </p>
              <p className="font-body text-cream/40 text-xs tracking-widest uppercase">
                {s.l}
              </p>
            </div>
          ))}
        </div>

        {/* Content split */}
        <div className="grid md:grid-cols-2 gap-16">
          <div className="about-text">
            <h3 className="font-heading text-xl text-cream mb-4">
              The Vision
            </h3>
            <p className="font-body text-cream/50 leading-relaxed text-sm md:text-base">
              The Fairway Bond is a 4-round parent-child golf series across the
              Sunshine Coast&rsquo;s finest courses. It&rsquo;s not about the
              scorecard &mdash; it&rsquo;s about the moments between shots. The
              walks down the 7th fairway. The high-fives after a par save. The
              shared joy of a game that spans generations.
            </p>
            <div className="mt-8 h-px w-16 bg-gold/30" />
          </div>
          <div className="about-text">
            <h3 className="font-heading text-xl text-cream mb-4">
              The Format
            </h3>
            <p className="font-body text-cream/50 leading-relaxed text-sm md:text-base">
              Alternate shot Ambrose. Parents tee off on odd holes, kids on even
              holes. Every round is played as a team &mdash; one ball, two
              generations, shared strategy. Handicapped for fairness. Designed
              for connection. Each course brings a unique challenge.
            </p>
            <div className="mt-8 h-px w-16 bg-gold/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
