import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { skillIcons } from "../data/skillIcons";

const ACCENT_COLORS = {
  violet: "#6d4fe0",
  cyan: "#0e8388",
  magenta: "#d1477a",
  gold: "#c97d2c",
};

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const accentHex = ACCENT_COLORS[project.accent] ?? ACCENT_COLORS.violet;
  const headerGradient = `linear-gradient(135deg, ${accentHex}3d, ${accentHex}14)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="spin-border group flex h-full flex-col overflow-hidden rounded-2xl glass"
      >
        <div className="relative h-44 w-full overflow-hidden" style={{ background: headerGradient }}>
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} screenshot`}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="font-display text-4xl font-bold text-gradient opacity-70 transition-transform duration-500 group-hover:scale-110">
                {project.title}
              </span>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_60%)]" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
          <span
            className="absolute bottom-3 left-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm"
            style={{ background: accentHex }}
          >
            {project.subtitle}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6" style={{ transform: "translateZ(40px)" }}>
          <h3 className="font-display text-xl font-semibold text-text">{project.title}</h3>
          <p className="mt-3 text-sm text-text-dim">{project.description}</p>

          <ul className="mt-4 space-y-1.5">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex gap-2 text-xs text-text-dim">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => {
              const Icon = skillIcons[tag];
              return (
                <span
                  key={tag}
                  className="chip flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] text-text-dim"
                >
                  {Icon && <Icon size={11} />}
                  {tag}
                </span>
              );
            })}
          </div>

          <div className="mt-6 flex gap-3 border-t border-border pt-4">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-text-dim transition-colors hover:text-text"
            >
              <FiGithub size={15} /> Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-text-dim transition-colors hover:text-text"
            >
              <FiExternalLink size={15} /> Live
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
