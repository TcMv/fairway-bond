export function Footer() {
  return (
    <footer className="py-16 px-6 bg-fairway-deeper border-t border-cream/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="text-center md:text-left">
            <p className="font-heading text-xl text-cream">
              The Fairway <span className="text-gold">Bond</span>
            </p>
            <p className="font-body text-cream/20 text-xs mt-1 tracking-wide">
              Sunshine Coast Parent-Child Golf Series
            </p>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="#register"
              className="font-body text-cream/30 text-xs tracking-widest uppercase hover:text-cream/60 transition-colors"
            >
              Register
            </a>
            <a
              href="#sponsor"
              className="font-body text-cream/30 text-xs tracking-widest uppercase hover:text-cream/60 transition-colors"
            >
              Sponsor
            </a>
          </div>
        </div>

        <div className="h-px bg-cream/5 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-cream/15 text-xs">
            &copy; {new Date().getFullYear()} The Fairway Bond
          </p>
          <p className="font-body text-cream/15 text-xs">
            Presented by{' '}
            <a
              href="#"
              className="text-gold/30 hover:text-gold/60 transition-colors"
            >
              Tortoise &amp; Hare Wellness
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
