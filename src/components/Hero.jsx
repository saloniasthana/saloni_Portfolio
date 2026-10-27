import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { profile } from "../data/content";
import RoleCycler from "./RoleCycler";
import { Sparkle, SquigglyArrow, Underline } from "./Doodles";

const HeroOrb = lazy(() => import("./HeroOrb"));

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const socials = [
  { href: profile.socials.github, icon: FiGithub, label: "GitHub" },
  { href: profile.socials.linkedin, icon: FiLinkedin, label: "LinkedIn" },
  { href: profile.socials.leetcode, icon: SiLeetcode, label: "LeetCode" },
  { href: profile.socials.portfolio, icon: FiExternalLink, label: "Old Portfolio" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left"
        >
          <motion.span
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-body text-xs uppercase tracking-[0.2em] text-text-dim"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan" />
            Open to opportunities
          </motion.span>

          <motion.h1
            variants={item}
            className="relative font-serif text-4xl font-semibold leading-tight text-text sm:text-6xl"
          >
            <motion.span
              animate={{ rotate: [0, 15, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-2 -top-6 hidden text-gold sm:-right-4 sm:-top-8 sm:block"
            >
              <Sparkle className="h-6 w-6 sm:h-8 sm:w-8" />
            </motion.span>
            Hi, I'm {profile.name.split(" ")[0]} —
            <br />
            <span className="relative inline-block min-h-[1.2em]">
              <RoleCycler roles={profile.roles} />
              <Underline className="absolute -bottom-2 left-0 h-3 w-full text-violet/50" />
            </span>
          </motion.h1>

          <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-lg text-text-dim lg:mx-0">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="relative mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 left-24 hidden text-text-dim/60 lg:block"
            >
              <SquigglyArrow className="h-10 w-20 -scale-x-100" />
            </motion.span>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="glow-border glow-cta rounded-full bg-text px-6 py-3 font-display text-sm font-medium text-bg transition-transform hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="glow-border rounded-full glass px-6 py-3 font-display text-sm font-medium text-text transition-transform hover:scale-105"
            >
              Get In Touch
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full glass text-text-dim transition-colors hover:text-cyan"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          className="hidden lg:block"
        >
          <Suspense fallback={null}>
            <HeroOrb />
          </Suspense>
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-text-dim"
        aria-label="Scroll down"
      >
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiArrowDown />
        </motion.span>
      </motion.button>
    </section>
  );
}
