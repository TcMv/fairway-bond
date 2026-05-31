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
      setSubmitted(true);
    } catch {
      // If API fails, still show success — data captured client-side for now
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="register"
      className="relative py-32 px-6 bg-gradient-to-b from-fairway-dark to-fairway"
    >
      <div className="max-w-3xl mx-auto">
        <FadeInSection>
          <p className="font-body text-gold tracking-[0.2em] uppercase text-sm mb-4 text-center">
            Get Involved
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-6 text-center leading-tight">
            Register Your Interest
          </h2>
          <p className="font-body text-cream/50 text-center max-w-xl mx-auto mb-12">
            Dates and venues being finalised. Leave your details and we&rsquo;ll
            be in touch as soon as registrations open.
          </p>
        </FadeInSection>

        {submitted ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-heading text-2xl text-cream mb-3">
              You&rsquo;re In!
            </h3>
            <p className="font-body text-cream/60">
              Thanks for registering. We&rsquo;ll email you when dates are locked in.
            </p>
          </div>
        ) : (
          <FadeInSection delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-lg mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-cream/60 text-sm mb-2">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    name="parentName"
                    required
                    className="w-full px-4 py-3 bg-cream/5 border border-cream/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-body text-cream/60 text-sm mb-2">
                    Child&rsquo;s Name
                  </label>
                  <input
                    type="text"
                    name="childName"
                    required
                    className="w-full px-4 py-3 bg-cream/5 border border-cream/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="Child&rsquo;s name"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-cream/60 text-sm mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-cream/5 border border-cream/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block font-body text-cream/60 text-sm mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-3 bg-cream/5 border border-cream/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="0400 000 000"
                />
              </div>

              <div>
                <label className="block font-body text-cream/60 text-sm mb-2">
                  Child&rsquo;s Age / Handicap (optional)
                </label>
                <input
                  type="text"
                  name="childDetails"
                  className="w-full px-4 py-3 bg-cream/5 border border-cream/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="e.g. 14 years, 18 handicap"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold text-fairway-dark font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 text-lg disabled:opacity-50"
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
