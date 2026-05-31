import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Format } from '@/components/Format';
import { Courses } from '@/components/Courses';
import { Sponsors } from '@/components/Sponsors';
import { RegisterForm } from '@/components/RegisterForm';
import { SponsorForm } from '@/components/SponsorForm';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Format />
      <Courses />
      <Sponsors />
      <RegisterForm />
      <SponsorForm />
      <Footer />
    </main>
  );
}
