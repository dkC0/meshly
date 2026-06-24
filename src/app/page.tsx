import Loader        from '@/components/ui/Loader';
import Nav           from '@/components/layout/Nav';
import Footer        from '@/components/layout/Footer';
import Hero          from '@/components/sections/Hero';
import ResultsBand   from '@/components/sections/ResultsBand';
import Work          from '@/components/sections/Work';
import Philosophy    from '@/components/sections/Philosophy';
import Services      from '@/components/sections/Services';
import About         from '@/components/sections/About';
import Contact       from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main id="main-content">
        <Hero />
        <ResultsBand />
        <Work />
        <Philosophy />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
