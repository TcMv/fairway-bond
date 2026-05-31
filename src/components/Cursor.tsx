'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const blob = blobRef.current;
    if (!dot || !blob) return;

    // Add class to body for cursor-none
    document.body.classList.add('custom-cursor-active');

    // Dot follows instantly
    const onMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX - 4, y: e.clientY - 4 });
    };
    window.addEventListener('mousemove', onMove);

    // Blob follows with lag
    gsap.set(blob, { xPercent: -50, yPercent: -50 });
    const tl = gsap.timeline({ paused: true });
    tl.to(blob, {
      scale: 2.5,
      opacity: 0.15,
      duration: 0.3,
      ease: 'power2.out',
    });

    const onMoveBlob = (e: MouseEvent) => {
      gsap.to(blob, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.55,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', onMoveBlob);

    // Scale up on interactive elements
    const hoverIn = () => {
      tl.play();
    };
    const hoverOut = () => {
      tl.reverse();
    };

    const elements = document.querySelectorAll<HTMLElement>(
      'a, button, [data-cursor]'
    ) as NodeListOf<HTMLElement>;
    elements.forEach((el) => {
      el.addEventListener('mouseenter', hoverIn as EventListener);
      el.addEventListener('mouseleave', hoverOut as EventListener);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousemove', onMoveBlob);
      document.body.classList.remove('custom-cursor-active');
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', hoverIn as EventListener);
        el.removeEventListener('mouseleave', hoverOut as EventListener);
      });
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ transform: 'translateZ(0)' }}
      />
      {/* Large trailing blob */}
      <div
        ref={blobRef}
        className="hidden md:block fixed top-0 left-0 w-10 h-10 bg-gold rounded-full pointer-events-none z-[9998] mix-blend-screen will-change-transform"
        style={{
          transform: 'translateZ(0)',
          opacity: 0.1,
          filter: 'blur(2px)',
        }}
      />
    </>
  );
}
