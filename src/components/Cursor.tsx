'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Cursor() {
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    const dot = dotRef.current;
    if (!blob || !dot) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 });

      // Blob lags behind
      gsap.to(blob, {
        x: mouseX - 20,
        y: mouseY - 20,
        duration: 0.55,
        ease: 'power2.out',
      });
    };

    // Scale up blob on hovering interactive elements
    const onEnter = () => {
      gsap.to(blob, { scale: 2.5, opacity: 0.15, duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(blob, { scale: 1, opacity: 0.1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);

    const interactive = document.querySelectorAll('a, button, [data-cursor]');
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Blob — slow follower */}
      <div
        ref={blobRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full bg-gold pointer-events-none z-[9999] opacity-10 mix-blend-screen will-change-transform hidden md:block"
      />
      {/* Dot — instant follower */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold pointer-events-none z-[9999] will-change-transform hidden md:block"
      />
    </>
  );
}
