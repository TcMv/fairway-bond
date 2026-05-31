'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: 'Format', href: '#format' },
  { label: 'Courses', href: '#courses' },
  { label: 'Sponsors', href: '#sponsors' },
];

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // Animate nav sliding in on mount
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.3,
    });
  });

  // Sticky → solid on scroll
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile overlay animation
  useGSAP(() => {
    if (open) {
      gsap.to(overlayRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
        display: 'flex',
      });
      gsap.from('.nav-overlay-link', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.15,
      });
    } else {
      gsap.to(overlayRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        },
      });
    }
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-500"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-gold/50 flex items-center justify-center group-hover:border-gold transition-colors duration-300">
            <div className="w-2 h-2 rounded-full bg-gold" />
          </div>
          <span className="font-heading text-sm text-cream hidden sm:inline">
            The Fairway <span className="text-gold">Bond</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-[10px] tracking-[0.25em] uppercase text-cream/40 hover:text-cream/80 transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#register"
            className="ml-4 px-5 py-2 rounded-full border border-gold/40 text-gold text-[10px] tracking-[0.25em] uppercase font-semibold hover:bg-gold hover:text-fairway-dark transition-all duration-300"
          >
            Register
          </a>
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden relative w-6 h-5 flex flex-col justify-between"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-full bg-cream transition-all duration-300 ${open ? 'rotate-45 translate-y-[9px]' : ''}`}
          />
          <span
            className={`block h-px w-full bg-cream transition-all duration-300 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-full bg-cream transition-all duration-300 ${open ? '-rotate-45 -translate-y-[9px]' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 hidden flex-col items-center justify-center bg-fairway-deeper/95 backdrop-blur-xl gap-10"
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={close}
            className="nav-overlay-link font-heading text-4xl text-cream hover:text-gold transition-colors duration-300"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#register"
          onClick={close}
          className="nav-overlay-link mt-6 px-10 py-4 rounded-full border border-gold/50 text-gold font-heading text-xl hover:bg-gold hover:text-fairway-dark transition-all duration-300"
        >
          Register
        </a>
      </div>
    </>
  );
}
