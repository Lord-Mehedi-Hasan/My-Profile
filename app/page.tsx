import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Research from '@/components/sections/Research';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Research />
      <Education />
      <Contact />
    </main>
  );
}
