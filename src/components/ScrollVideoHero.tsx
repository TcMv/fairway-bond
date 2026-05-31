'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollVideoHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Wait for metadata so duration is known
    const init = () => {
      const duration = video.duration;

      // Pin the section and scrub video currentTime with scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          video.currentTime = self.progress * duration;
        },
      });

      // Scroll line fills as user scrolls
      gsap.to(scrollLineRef.current, {
        scaleY: 1,
        transformOrigin: 'top center',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=250%',
          scrub: true,
        },
      });
    };

    if (video.readyState >= 1) {
      init();
    } else {
      video.addEventListener('loadedmetadata', init, { once: true });
    }

    // Entrance animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.svh-pre', { y: 30, opacity: 0, duration: 0.8, delay: 0.3 });
    tl.from('.svh-title-line', { y: 100, opacity: 0, stagger: 0.15, duration: 1 }, '-=0.4');
    tl.from('.svh-sub', { y: 30, opacity: 0, duration: 0.7 }, '-=0.4');
    tl.from('.svh-cta', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3');
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex items-end justify-start bg-fairway-deeper"
    >
      {/* Scroll-scrubbed video */}
      <video
        ref={videoRef}
        src="/fairway-walk.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      {/* Gradient overlays — preserve text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-fairway-deeper via-fairway-deeper/40 to-fairway-deeper/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-fairway-deeper/60 via-transparent to-transparent" />

      {/* Content — bottom-left like Lando's site */}
      <div className="relative z-10 px-8 md:px-16 pb-20 md:pb-24 max-w-4xl">
        <p className="svh-pre font-body text-gold-dim tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
          Sunshine Coast &mdash; 2026
        </p>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-[96px] text-cream leading-[0.9] tracking-tight mb-6">
          <div className="svh-title-line overflow-hidden">
            <span className="inline-block">The Fairway</span>
          </div>
          <div className="svh-title-line overflow-hidden mt-1 md:mt-3">
            <span className="inline-block text-gold">Bond</span>
          </div>
        </h1>

        <p className="svh-sub font-body text-sm md:text-base text-cream/50 max-w-sm leading-relaxed mb-8">
          A 4-round parent-child golf series across the Sunshine Coast.
          <br />
          <span className="text-cream/70">Alternate shot Ambrose. One bond.</span>
        </p>

        <div className="svh-cta flex flex-wrap gap-3">
          <a
            href="#register"
            className="px-8 py-3.5 bg-gold text-fairway-dark font-semibold rounded-full hover:bg-gold-light transition-all duration-300 text-sm tracking-wide hover:scale-105"
          >
            Register Interest
          </a>
          <a
            href="#format"
            className="px-8 py-3.5 border border-cream/20 text-cream/60 rounded-full hover:border-cream/40 hover:text-cream transition-all duration-300 text-sm tracking-wide"
          >
            How It Works
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-10 flex flex-col items-center gap-3">
        <span className="font-body text-cream/20 text-[10px] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll
        </span>
        <div className="relative w-px h-16 bg-cream/10 overflow-hidden">
          <div
            ref={scrollLineRef}
            className="absolute top-0 left-0 w-full h-full bg-gold/60 origin-top scale-y-0"
          />
        </div>
      </div>
    </section>
  );
}
