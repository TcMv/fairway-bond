'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background
    gsap.to('.hero-bg', {
      y: '25%',
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Text fade out on scroll
    gsap.to(textRef.current, {
      y: -80,
      opacity: 0,
      scale: 0.9,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Scroll hint pulse
    gsap.to(scrollHintRef.current, {
      y: 10,
      opacity: 0.3,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background gradient overlay */}
      <div className="hero-bg absolute inset-0 will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-b from-fairway-dark/60 via-fairway/50 to-fairway-dark/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--color-cream) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <p className="font-body text-gold tracking-[0.3em] uppercase text-sm md:text-base mb-6">
          Sunshine Coast &mdash; 2026
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-cream mb-6 leading-tight">
          The Fairway
          <br />
          <span className="text-gold">Bond</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-cream/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          A 4-round parent-child golf series across the Sunshine Coast.
          <br />
          Alternate shot Ambrose. One bond.
        </p>
        <a
          href="#register"
          className="inline-block px-10 py-4 bg-gold text-fairway-dark font-semibold rounded-full hover:bg-gold-light transition-all duration-300 text-lg tracking-wide"
        >
          Register Interest
        </a>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-cream/40 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <svg
          width="20"
          height="30"
          viewBox="0 0 20 30"
          fill="none"
          className="text-cream/40"
        >
          <rect
            x="1.5"
            y="1.5"
            width="17"
            height="27"
            rx="8.5"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="10" cy="10" r="2" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
