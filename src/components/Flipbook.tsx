'use client';

import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAMES = 4;

export function Flipbook() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const frameTexts = [
    {
      step: '01',
      title: 'The First Step',
      desc: 'Parent and child. One team. The journey begins on the first fairway.',
    },
    {
      step: '02',
      title: 'Finding the Rhythm',
      desc: 'Alternate shots. Shared strategy. Every step brings them closer.',
    },
    {
      step: '03',
      title: 'Into the Golden Hour',
      desc: 'The sun drops lower. The bond grows stronger. Midway through the series.',
    },
    {
      step: '04',
      title: 'Almost There',
      desc: 'The final fairway ahead. Memories made. One trophy to decide it all.',
    },
  ];

  useGSAP(() => {
    if (!pinRef.current || imagesLoaded < FRAMES) return;

    // Kill any existing ScrollTriggers on this element
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === pinRef.current) st.kill();
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 2}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });

    // Crossfade through frames
    for (let i = 1; i < FRAMES; i++) {
      const currentFrame = frameRefs.current[i];
      const prevFrame = frameRefs.current[i - 1];
      const currentText = textRef.current?.querySelector(`[data-step="${i}"]`) as HTMLElement;

      if (!currentFrame || !prevFrame) continue;

      // Fade in next frame
      tl.to(currentFrame, {
        opacity: 1,
        duration: 0.4,
      });

      // Fade out previous frame at the same time
      tl.to(
        prevFrame,
        {
          opacity: 0,
          duration: 0.4,
        },
        '<'
      );

      // Update step text
      if (currentText) {
        tl.set(
          currentText,
          { opacity: 1, y: 0 },
          '<'
        );
      }

      // Fade out previous step text
      const prevText = textRef.current?.querySelector(`[data-step="${i - 1}"]`) as HTMLElement;
      if (prevText) {
        tl.to(
          prevText,
          { opacity: 0, y: -20, duration: 0.3 },
          '<'
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [imagesLoaded]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-fairway-deeper overflow-hidden scroll-mt-20"
    >
      {/* Heading above pinned section */}
      <div className="relative z-20 pt-24 md:pt-32 pb-8 px-6 text-center">
        <p className="font-body text-gold-dim tracking-[0.25em] uppercase text-sm mb-4">
          The Journey
        </p>
        <h2 className="font-heading text-4xl md:text-5xl text-cream leading-tight">
          A Bond That Grows{' '}
          <span className="text-gold/70">With Every Step</span>
        </h2>
      </div>

      {/* Pinned flipbook */}
      <div ref={pinRef} className="relative h-screen">
        {/* Frame stack */}
        <div className="absolute inset-0">
          {Array.from({ length: FRAMES }, (_, i) => (
            <div
              key={i}
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
              className="absolute inset-0 bg-cover bg-center will-change-transform"
              style={{
                backgroundImage: `url(/flipbook/frame-0${i + 1}.jpg)`,
                opacity: i === 0 ? 1 : 0,
                zIndex: FRAMES - i,
              }}
            >
              {/* Preload image */}
              <img
                src={`/flipbook/frame-0${i + 1}.jpg`}
                alt=""
                className="hidden"
                onLoad={() => setImagesLoaded((p) => p + 1)}
                onError={() => setImagesLoaded((p) => p + 1)}
              />
            </div>
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-fairway-deeper/90 via-fairway-deeper/40 to-fairway-deeper/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-fairway-deeper/60 via-transparent to-fairway-deeper/40 z-10" />

        {/* Foreground content */}
        <div
          ref={textRef}
          className="absolute inset-0 z-20 flex items-end pb-12 md:pb-20"
        >
          <div className="max-w-5xl mx-auto px-6 w-full">
            {frameTexts.map((ft, i) => (
              <div
                key={ft.step}
                data-step={i}
                className="max-w-2xl"
                style={{
                  opacity: i === 0 ? 1 : 0,
                  transform: i === 0 ? 'translateY(0)' : 'translateY(-20px)',
                }}
              >
                <span className="font-heading text-7xl md:text-8xl text-gold/10 absolute -bottom-5 -left-2 select-none">
                  {ft.step}
                </span>
                <div className="relative">
                  <p className="font-body text-gold-dim tracking-[0.25em] uppercase text-xs md:text-sm mb-4">
                    Step {ft.step}
                  </p>
                  <h3 className="font-heading text-3xl md:text-4xl text-cream mb-6 leading-tight">
                    {ft.title}
                  </h3>
                  <p className="font-body text-cream/50 leading-relaxed text-sm md:text-base max-w-lg">
                    {ft.desc}
                  </p>
                  <div className="mt-8 h-px w-16 bg-gold/30" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="font-body text-cream/15 text-[8px] tracking-[0.3em] uppercase">
            Scroll to reveal
          </span>
          <div className="w-px h-8 bg-cream/10 overflow-hidden">
            <div className="w-full h-full bg-gold/40 origin-top animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
