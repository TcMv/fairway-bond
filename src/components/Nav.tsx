'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out',
    });
  });

  const links = [
    { label: 'Format', href: '#format' },
    { label: 'Courses', href: '#courses' },
    { label: 'Sponsors', href: '#sponsors' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-fairway-deeper/90 backdrop-blur-md border-b border-cream/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold/60 transition-colors duration-300">
              <div className="w-2 h-2 rounded-full bg-gold/60 group-hover:bg-gold transition-colors duration-300" />
            </div>
            <span className="font-heading text-base text-cream tracking-tight">
              The Fairway <span className="text-gold">Bond</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-body text-cream/40 text-xs tracking-[0.2em] uppercase hover:text-cream/80 transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#register"
              className="font-body text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-gold/30 text-gold/70 rounded-full hover:border-gold hover:text-gold transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
            >
              Register
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-cream/60 transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}
            />
            <span
              className={`block w-6 h-px bg-cream/60 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-px bg-cream/60 transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-fairway-deeper/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="font-heading text-3xl text-cream/70 hover:text-cream transition-colors"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#register"
          onClick={() => setMenuOpen(false)}
          className="font-body text-sm tracking-[0.2em] uppercase px-8 py-3 border border-gold/40 text-gold rounded-full hover:border-gold hover:bg-gold/5 transition-all duration-300"
        >
          Register Interest
        </a>
      </div>
    </>
  );
}
