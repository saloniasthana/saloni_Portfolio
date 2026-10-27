import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import { education } from "../data/content";
import SectionHeading from "./SectionHeading";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading eyebrow="Education" title="Academic background" />

      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {education.map((item, i) => (
          <motion.div
            key={`${item.school}-${item.period}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="glow-border rounded-2xl glass p-6"
          >
            <div className="chip relative flex h-10 w-10 items-center justify-center rounded-full text-cyan">
              <span className="animate-pulse-glow absolute inset-0 rounded-full bg-cyan/20 blur-md" />
              <FiBookOpen size={18} className="relative" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-text">{item.school}</h3>
            <p className="mt-2 text-sm text-text-dim">{item.detail}</p>
            <span className="chip mt-3 inline-block rounded-full px-3 py-1 text-xs text-text-dim">
              {item.period}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
