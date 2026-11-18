import { useEffect } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Work from "../sections/Work";
import Experience from "../sections/Experience";
import Skills from "../sections/Skills";
import Education from "../sections/Education";
import Contact from "../sections/Contact";
import { personalDetails } from "../portfolio-details";

export default function HomePage() {
  useEffect(() => {
    document.title = `${personalDetails.name} — ${personalDetails.title}`;
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Work />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}
