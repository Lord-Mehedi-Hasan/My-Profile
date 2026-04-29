import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Services from '@/components/sections/Services';
import Skills from '@/components/sections/Skills';
import Research from '@/components/sections/Research';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Projects />
      <Services />
      <Skills />
      <Research />
      <Education />
      <Contact />
    </main>
  );
}
