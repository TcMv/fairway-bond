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
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="sponsor"
      className="relative py-32 px-6 bg-fairway-dark"
    >
      <div className="max-w-3xl mx-auto">
        <FadeInSection>
          <p className="font-body text-gold tracking-[0.2em] uppercase text-sm mb-4 text-center">
            Partner With Us
          </p>
          <h2 className="font-heading text-4xl md:text-5xl text-cream mb-6 text-center leading-tight">
            Sponsor Enquiries
          </h2>
          <p className="font-body text-cream/50 text-center max-w-xl mx-auto mb-12">
            Want to get your brand in front of Sunshine Coast families and golf
            enthusiasts? We have sponsorship packages to suit every level.
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
              Thanks for Your Interest
            </h3>
            <p className="font-body text-cream/60">
              We&rsquo;ll be in touch with sponsorship packages.
            </p>
          </div>
        ) : (
          <FadeInSection delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-lg mx-auto"
            >
              <div>
                <label className="block font-body text-cream/60 text-sm mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  required
                  className="w-full px-4 py-3 bg-cream/5 border border-cream/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="Your business"
                />
              </div>

              <div>
                <label className="block font-body text-cream/60 text-sm mb-2">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  required
                  className="w-full px-4 py-3 bg-cream/5 border border-cream/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-cream/60 text-sm mb-2">
                    Email
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
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 bg-cream/5 border border-cream/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors"
                    placeholder="0400 000 000"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-cream/60 text-sm mb-2">
                  Sponsorship Level Interested In
                </label>
                <select
                  name="tier"
                  required
                  className="w-full px-4 py-3 bg-cream/5 border border-cream/20 rounded-xl text-cream focus:outline-none focus:border-gold/50 transition-colors"
                >
                  <option value="" className="bg-fairway-dark">
                    Select a tier
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
              </div>

              <div>
                <label className="block font-body text-cream/60 text-sm mb-2">
                  Message (optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full px-4 py-3 bg-cream/5 border border-cream/20 rounded-xl text-cream placeholder-cream/30 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  placeholder="Tell us about your business..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold text-fairway-dark font-semibold rounded-xl hover:bg-gold-light transition-all duration-300 text-lg disabled:opacity-50"
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
