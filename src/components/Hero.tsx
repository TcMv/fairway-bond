'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Background particles/stars fade in
    tl.fromTo(
      '.hero-dot',
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, stagger: 0.03, duration: 0.6 }
    );

    // Title reveal
    tl.from(
      '.hero-title-line',
      { y: 120, opacity: 0, stagger: 0.15, duration: 1 },
      '-=0.3'
    );

    // Subtitle
    tl.from(
      '.hero-sub',
      { y: 40, opacity: 0, duration: 0.8 },
      '-=0.5'
    );

    // CTA
    tl.from(
      '.hero-cta',
      { y: 30, opacity: 0, duration: 0.6 },
      '-=0.3'
    );

    // Parallax on scroll
    gsap.to('.hero-bg', {
      y: '20%',
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Scroll line animation
    gsap.to(scrollLineRef.current, {
      scaleY: 1,
      transformOrigin: 'top center',
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Generate floating dots for ambient effect
  const dots = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 0.5,
  }));

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-center justify-center bg-fairway-deeper"
    >
      {/* Dark ambient gradient layers */}
      <div className="hero-bg absolute inset-0 will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-b from-fairway-deeper via-fairway-dark/80 to-fairway/40" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fairway-light/10 rounded-full blur-[100px]" />
      </div>

      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dots.map((d) => (
          <div
            key={d.id}
            className="hero-dot absolute rounded-full bg-gold/20"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: `${d.size}px`,
              height: `${d.size}px`,
              transitionDelay: `${d.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Pre-title */}
        <p className="hero-sub font-body text-gold-dim tracking-[0.3em] uppercase text-xs md:text-sm mb-8">
          Sunshine Coast &mdash; 2026
        </p>

        {/* Main title — big and dramatic like Lando's site */}
        <h1
          ref={titleRef}
          className="font-heading text-6xl md:text-8xl lg:text-[120px] text-cream leading-[0.9] tracking-tight"
        >
          <div className="hero-title-line overflow-hidden">
            <span className="inline-block">The Fairway</span>
          </div>
          <div className="hero-title-line overflow-hidden mt-2 md:mt-4">
            <span className="inline-block text-gold">Bond</span>
          </div>
        </h1>

        {/* Tagline */}
        <p className="hero-sub font-body text-base md:text-lg text-cream/40 mt-8 max-w-xl mx-auto leading-relaxed tracking-wide">
          A 4-round parent-child golf series across the Sunshine Coast.
          <br />
          <span className="text-cream/60">
            Alternate shot Ambrose. One bond.
          </span>
        </p>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a
            href="#register"
            className="px-10 py-4 bg-gold text-fairway-dark font-semibold rounded-full hover:bg-gold-light transition-all duration-300 text-base tracking-wide hover:scale-105"
          >
            Register Interest
          </a>
          <a
            href="#format"
            className="px-10 py-4 border border-cream/20 text-cream/70 rounded-full hover:border-cream/40 hover:text-cream transition-all duration-300 text-base tracking-wide"
          >
            How It Works
          </a>
        </div>
      </div>

      {/* Scroll indicator — vertical line style */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-body text-cream/20 text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="relative w-px h-12 bg-cream/10 overflow-hidden">
          <div
            ref={scrollLineRef}
            className="absolute top-0 left-0 w-full h-full bg-gold/60 origin-top scale-y-0"
          />
        </div>
      </div>
    </section>
  );
}
