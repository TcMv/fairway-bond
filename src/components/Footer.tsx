export function Footer() {
  return (
    <footer className="py-12 px-6 bg-fairway-dark border-t border-cream/5">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-heading text-lg text-cream">
            The Fairway <span className="text-gold">Bond</span>
          </p>
          <p className="font-body text-cream/30 text-sm mt-1">
            Sunshine Coast Parent-Child Golf Series
          </p>
        </div>

        <div className="flex items-center gap-6 text-cream/30 text-sm">
          <p>&copy; {new Date().getFullYear()} The Fairway Bond</p>
          <span className="hidden md:inline">|</span>
          <p>
            Presented by{' '}
            <a
              href="#"
              className="text-gold/50 hover:text-gold transition-colors"
            >
              Tortoise &amp; Hare Wellness
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
