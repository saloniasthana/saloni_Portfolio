import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { skillGroups } from "../data/content";
import { skillIcons } from "../data/skillIcons";
import { skillConnections } from "../data/skillConnections";

const particles = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  delay: (i % 7) * 0.4,
  duration: 4 + (i % 5),
}));

export default function TechGraph() {
  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const [paths, setPaths] = useState([]);

  const setNodeRef = (name) => (el) => {
    if (el) nodeRefs.current[name] = el;
  };

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();

      const next = skillConnections
        .map(([a, b], i) => {
          const elA = nodeRefs.current[a];
          const elB = nodeRefs.current[b];
          if (!elA || !elB) return null;
          const rA = elA.getBoundingClientRect();
          const rB = elB.getBoundingClientRect();
          const x1 = rA.left + rA.width / 2 - cRect.left;
          const y1 = rA.top + rA.height / 2 - cRect.top;
          const x2 = rB.left + rB.width / 2 - cRect.left;
          const y2 = rB.top + rB.height / 2 - cRect.top;
          const dx = Math.max(Math.abs(x2 - x1) * 0.5, 50);
          const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
          return { d, key: `${a}-${b}-${i}` };
        })
        .filter(Boolean);

      setPaths(next);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {particles.map((p, i) => (
        <span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-cyan/60"
          style={{
            left: p.left,
            top: p.top,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id="line-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6d4fe0" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#0e8388" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        {paths.map((p, i) => (
          <motion.path
            key={p.key}
            d={p.d}
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: i * 0.03, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <div className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {skillGroups.map((group, gi) => (
          <div key={group.title} className="flex flex-col items-start gap-3">
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-text-dim">
              {group.title}
            </span>
            {group.skills.map((skill, si) => {
              const Icon = skillIcons[skill];
              return (
                <motion.div
                  key={skill}
                  ref={setNodeRef(skill)}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4, delay: gi * 0.06 + si * 0.05, ease: "easeOut" }}
                  className="glow-border flex w-34 items-center gap-2 rounded-full glass px-3 py-2 text-xs text-text-dim sm:w-38 sm:text-sm"
                >
                  {Icon && <Icon className="shrink-0 text-cyan" size={15} />}
                  <span className="truncate">{skill}</span>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
