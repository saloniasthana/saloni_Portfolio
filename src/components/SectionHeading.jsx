import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={isCenter ? "text-center" : "text-left"}
    >
      {eyebrow && (
        <span className="mb-3 inline-block font-display text-sm font-medium uppercase tracking-[0.25em] text-cyan">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl font-semibold text-text sm:text-4xl">{title}</h2>
      {description && (
        <p
          className={`mt-4 max-w-2xl text-text-dim ${isCenter ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
