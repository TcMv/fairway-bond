import { Nav } from '@/components/Nav';
import { Cursor } from '@/components/Cursor';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { Format } from '@/components/Format';
import { Courses } from '@/components/Courses';
import { Sponsors } from '@/components/Sponsors';
import { RegisterForm } from '@/components/RegisterForm';
import { SponsorForm } from '@/components/SponsorForm';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Marquee
          text="Alternate Shot · Ambrose · Four Courses · Four Rounds · One Trophy · Sunshine Coast · "
          reverse
        />
        <Format />
        <div id="courses" className="scroll-mt-20">
          <Courses />
        </div>
        <Marquee
          text="Headland · Maroochydore · Beerwah · Caloundra · Sunshine Coast Golf · 2026 · "
          speed={30}
        />
        <div id="sponsors" className="scroll-mt-20">
          <Sponsors />
        </div>
        <RegisterForm />
        <SponsorForm />
        <Footer />
      </main>
    </>
  );
}
