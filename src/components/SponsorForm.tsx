'use client';

import { useState, FormEvent } from 'react';
import { FadeInSection } from './FadeInSection';

export function SponsorForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch('/api/sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      });
    } catch {
      // pass
    } finally {
      setSubmitted(true);
      setLoading(false);
    }
  };

  return (
    <section
      id="sponsor"
      className="relative py-36 md:py-44 px-6 bg-fairway-deeper overflow-hidden"
    >
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[100px]" />

      <div className="max-w-3xl mx-auto relative z-10">
        <FadeInSection>
          <div className="text-center mb-14">
            <p className="font-body text-gold-dim tracking-[0.25em] uppercase text-sm mb-4">
              Partner With Us
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-cream mb-4 leading-tight">
              Sponsor Enquiries
            </h2>
            <p className="font-body text-cream/40 max-w-md mx-auto text-sm leading-relaxed">
              Want to get your brand in front of Sunshine Coast families and
              golf enthusiasts? We have packages to suit every level.
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
              Thanks for Your Interest
            </h3>
            <p className="font-body text-cream/50 text-sm">
              We&rsquo;ll send sponsorship packages shortly.
            </p>
          </div>
        ) : (
          <FadeInSection delay={0.15} y={30}>
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto space-y-5"
            >
              <input
                type="text"
                name="businessName"
                required
                placeholder="Business name"
                className="w-full px-4 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-gold/40 transition-colors"
              />

              <input
                type="text"
                name="contactName"
                required
                placeholder="Contact name"
                className="w-full px-4 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-gold/40 transition-colors"
              />

              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className="w-full px-4 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-full px-4 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>

              <select
                name="tier"
                required
                className="w-full px-4 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream text-sm focus:outline-none focus:border-gold/40 transition-colors"
              >
                <option value="" className="bg-fairway-dark">
                  Sponsorship level
                </option>
                <option value="presenting" className="bg-fairway-dark">
                  Presenting Sponsor
                </option>
                <option value="round" className="bg-fairway-dark">
                  Round Sponsor
                </option>
                <option value="hole" className="bg-fairway-dark">
                  Hole Sponsor
                </option>
                <option value="community" className="bg-fairway-dark">
                  Community Partner
                </option>
                <option value="other" className="bg-fairway-dark">
                  Other / Not Sure
                </option>
              </select>

              <textarea
                name="message"
                rows={3}
                placeholder="Tell us about your business (optional)"
                className="w-full px-4 py-3.5 bg-cream/5 border border-cream/10 rounded-xl text-cream placeholder-cream/20 text-sm focus:outline-none focus:border-gold/40 transition-colors resize-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold text-fairway-dark font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 text-sm tracking-wide disabled:opacity-50 hover:scale-[1.02]"
              >
                {loading ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          </FadeInSection>
        )}
      </div>
    </section>
  );
}
