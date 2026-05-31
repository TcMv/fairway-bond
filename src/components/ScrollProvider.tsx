'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Sync GSAP ScrollTrigger with Lenis
    const lenis = document.querySelector('html');
    if (lenis) {
      const update = () => ScrollTrigger.update();
      lenis.addEventListener('scroll', update);
      return () => {
        lenis.removeEventListener('scroll', update);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }
  }, []);

  return <ReactLenis root>{children}</ReactLenis>;
}
