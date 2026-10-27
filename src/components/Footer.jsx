import { motion } from "framer-motion";
import { FiArrowUp, FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { profile } from "../data/content";

const socials = [
  { href: profile.socials.github, icon: FiGithub, label: "GitHub" },
  { href: profile.socials.linkedin, icon: FiLinkedin, label: "LinkedIn" },
  { href: profile.socials.leetcode, icon: SiLeetcode, label: "LeetCode" },
  { href: profile.socials.portfolio, icon: FiExternalLink, label: "Old Portfolio" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-6 pb-8 pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, #6d4fe0, #0e8388, #c97d2c, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--color-violet), transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <h2 className="font-display text-2xl font-semibold text-text sm:text-3xl">
          Still scrolling? Let&rsquo;s make something{" "}
          <span className="text-gradient">worth shipping</span>.
        </h2>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="glow-cta mt-6 inline-block rounded-full bg-text px-6 py-3 font-display text-sm font-medium text-bg transition-transform hover:scale-105"
        >
          Say Hello
        </a>

        <div className="mt-10 flex items-center justify-center gap-3">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full glass text-text-dim transition-all duration-300 hover:-translate-y-1 hover:text-cyan"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </motion.div>

      <div className="relative mx-auto mt-14 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
        <p className="text-xs text-text-dim">
          © {new Date().getFullYear()} {profile.name}. All Rights Reserved.
        </p>
        <button
          onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
          className="flex items-center gap-2 text-xs text-text-dim transition-colors hover:text-cyan"
        >
          Back to top <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}
