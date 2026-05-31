'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MarqueeProps {
  text?: string;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  text = 'The Fairway Bond · Sunshine Coast · 2026 · Parent & Child · Alternate Shot Ambrose · ',
  speed = 40,
  reverse = false,
  className = '',
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2; // half since duplicated

    gsap.to(track, {
      x: reverse ? 0 : -totalWidth,
      duration: totalWidth / speed,
      ease: 'none',
      repeat: -1,
      overwrite: true,
    });

    return () => {
      gsap.killTweensOf(track);
    };
  }, [speed, reverse]);

  return (
    <div
      className={`border-y border-cream/5 py-4 bg-fairway-deeper/50 overflow-hidden ${className}`}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
      >
        <span className="text-cream/20 text-xs tracking-[0.3em] uppercase px-4">
          {text}
        </span>
        <span className="text-cream/20 text-xs tracking-[0.3em] uppercase px-4">
          {text}
        </span>
      </div>
    </div>
  );
}
