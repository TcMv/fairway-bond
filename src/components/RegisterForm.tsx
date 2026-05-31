'use client';

import { useState, FormEvent } from 'react';
import { FadeInSection } from './FadeInSection';

export function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      });
    } catch {
      // Client-side capture only for now
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <section
      id="register"
      className="relative py-36 md:py-44 px-6 bg-gradient-to-b from-fairway-deeper to-fairway-dark overflow-hidden"
    >
      {/* Accent glow */}
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-fairway-light/5 rounded-full blur-[100px]" />

      <div className="max-w-3xl mx-auto relative z-10">
        <FadeInSection>
          <div className="text-center mb-14">
            <p className="font-body text-gold-dim tracking-[0.25em] uppercase text-sm mb-4">
              Get Involved
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-cream mb-4 leading-tight">
              Register Your Interest
            </h2>
            <p className="font-body text-cream/40 max-w-md mx-auto text-sm leading-relaxed">
              Dates and venues being finalised. Leave your details and
              we&rsquo;ll be in touch as soon as registrations open.
            </p>
          </div>
        </FadeInSection>

        {submitted ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-heading text-2xl text-cream mb-2">
              You&rsquo;re In
            </h3>
            <p className="font-body text-cream/50 text-sm">
            </p>
          </div>
        ) : (
          <FadeInSection delay={0.15} y={30}>
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <input
                    type="text"
                    name="parentName"
                    required
                    placeholder="Parent / Guardian name"
                    className="w-full px-4 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="childName"
                    required
                    placeholder="Child&rsquo;s name"
                    className="w-full px-4 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email address"
                  className="w-full px-4 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    className="w-full px-4 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="childDetails"
                    placeholder="Age / Handicap (optional)"
                    className="w-full px-4 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold text-fairway-dark font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 text-sm tracking-wide disabled:opacity-50 hover:scale-[1.02]"
              >
                {loading ? 'Submitting...' : 'Register Interest'}
              </button>
            </form>
          </FadeInSection>
        )}
      </div>
    </section>
  );
}
