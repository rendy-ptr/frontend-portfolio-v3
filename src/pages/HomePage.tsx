import Navbar from "../components/Navbar";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Experience from "../components/sections/Experience";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Certificate from "../components/sections/Certificate";
import Contact from "../components/sections/Contact";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certificate />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
