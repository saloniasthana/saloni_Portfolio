import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackgroundFX from "./components/BackgroundFX";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SectionDivider from "./components/SectionDivider";
import { profile } from "./data/content";

function Preloader() {
  return (
    <motion.div
      key="preloader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
          <defs>
            <linearGradient id="preloader-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6d4fe0" />
              <stop offset="100%" stopColor="#0e8388" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="url(#preloader-ring)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </svg>
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.4em", scale: 0.85 }}
          animate={{ opacity: 1, letterSpacing: "0.05em", scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-display text-2xl font-semibold text-gradient"
        >
          {profile.initials}
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <Preloader />}</AnimatePresence>

      <BackgroundFX />
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
