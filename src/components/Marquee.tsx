'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface MarqueeProps {
  text?: string;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

const DEFAULT_TEXT =
  'The Fairway Bond · Sunshine Coast · 2026 · Parent & Child · Alternate Shot Ambrose · ';

export function Marquee({
  text = DEFAULT_TEXT,
  speed = 40,
  reverse = false,
  className = '',
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    const duration = totalWidth / speed;

    gsap.fromTo(
      track,
      { x: reverse ? -totalWidth : 0 },
      {
        x: reverse ? 0 : -totalWidth,
        duration,
        ease: 'none',
        repeat: -1,
      }
    );
  });

  // Duplicate text for seamless loop
  const repeated = text.repeat(8);

  return (
    <div
      className={`overflow-hidden border-y border-cream/5 py-4 bg-fairway-deeper/50 ${className}`}
    >
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        <span className="font-body text-xs tracking-[0.3em] uppercase text-cream/20 pr-0">
          {repeated}
        </span>
        <span className="font-body text-xs tracking-[0.3em] uppercase text-cream/20">
          {repeated}
        </span>
      </div>
    </div>
  );
}
