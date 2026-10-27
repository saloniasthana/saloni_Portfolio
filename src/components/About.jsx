import { motion } from "framer-motion";
import { about, profile } from "../data/content";
import EmberParticles from "./EmberParticles";
import EmberText from "./EmberText";
import FlameIcon from "./FlameIcon";

export default function About() {
  const narrative = about.bio.join(" ");

  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-28 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: "conic-gradient(from 180deg, #6d4fe0, #0e8388, #6d4fe0)",
          padding: "2px",
          boxShadow: "0 0 24px 4px rgba(109,79,224,0.25)",
        }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-bg-soft">
          <span className="font-display text-sm font-semibold text-gradient">
            {profile.initials}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="relative mt-4 flex flex-col items-center"
      >
        <EmberParticles />
        <FlameIcon size={60} />
        <span className="mt-3 text-xs uppercase tracking-[0.25em] text-text-dim">
          Hover over the flame&rsquo;s glow to light up the story
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="mt-6 font-serif text-4xl italic text-text sm:text-5xl"
      >
        About Me
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="mt-8"
      >
        <EmberText
          text={narrative}
          className="text-lg leading-relaxed sm:text-xl sm:leading-relaxed"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {about.facts.map((fact) => (
          <div key={fact.label} className="glow-border rounded-xl glass px-4 py-3 text-left">
            <p className="text-xs uppercase tracking-wide text-text-dim">{fact.label}</p>
            <p className="mt-1 font-display text-sm font-medium text-text">{fact.value}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
