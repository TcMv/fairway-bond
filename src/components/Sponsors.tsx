'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
  {
    name: 'Tortoise & Hare Wellness',
    tier: 'Presenting Sponsor',
    logo: 'T&H',
    active: true,
  },
  {
    name: 'Partner Slot',
    tier: 'Available',
    placeholder: true,
  },
  {
    name: 'Partner Slot',
    tier: 'Available',
    placeholder: true,
  },
  {
    name: 'Partner Slot',
    tier: 'Available',
    placeholder: true,
  },
  {
    name: 'Partner Slot',
    tier: 'Available',
    placeholder: true,
  },
  {
    name: 'Partner Slot',
    tier: 'Available',
    placeholder: true,
  },
];

export function Sponsors() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.sponsor-logo', {
      opacity: 0,
      y: 30,
      stagger: 0.08,
      duration: 0.6,
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
      className="relative py-28 md:py-36 px-6 bg-fairway-deeper overflow-hidden"
    >
      {/* Background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-[100px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="font-body text-gold-dim tracking-[0.25em] uppercase text-sm mb-4">
            Supported By
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-cream leading-tight">
            Partners{' '}
            <span className="text-gold/70">&amp; Sponsors</span>
          </h2>
        </div>

        {/* Sponsor grid - like Lando's partner logos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {sponsors.map((s) => (
            <div
              key={s.name}
              className={`sponsor-logo flex flex-col items-center justify-center p-8 md:p-10 rounded-2xl border transition-all duration-500 min-h-[140px] ${
                s.placeholder
                  ? 'border-dashed border-cream/10 bg-cream/[0.02] hover:border-gold/20'
                  : 'border-cream/10 bg-gradient-to-br from-cream/5 to-fairway-dark hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5'
              }`}
            >
              {s.placeholder ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-cream/5 flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-cream/20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <p className="font-body text-cream/20 text-xs tracking-widest uppercase">
                    Your Brand
                  </p>
                  <a
                    href="#sponsor"
                    className="font-body text-gold-dim/40 text-[10px] tracking-wider uppercase mt-2 hover:text-gold transition-colors"
                  >
                    Enquire &rarr;
                  </a>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <span className="font-heading text-xl text-gold">
                      {s.logo}
                    </span>
                  </div>
                  <p className="font-heading text-sm text-cream text-center leading-tight">
                    {s.name}
                  </p>
                  <p className="font-body text-gold-dim/50 text-[10px] tracking-widest uppercase mt-2">
                    {s.tier}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
