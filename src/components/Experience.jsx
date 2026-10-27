import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from "../data/content";
import SectionHeading from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const trackRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        }
      );
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've built & learned"
        description="From production RESTful APIs to RAG research — a quick look at the roles that shaped how I build software."
      />

      <div ref={trackRef} className="relative mt-16 pl-8 sm:pl-10">
        <div className="absolute left-[3px] top-1 bottom-1 w-[2px] bg-border sm:left-[7px]" />
        <div
          ref={lineRef}
          className="absolute left-[3px] top-1 bottom-1 w-[2px] origin-top bg-gradient-to-b from-violet to-cyan sm:left-[7px]"
        />

        <div className="space-y-14">
          {experience.map((job, i) => (
            <motion.div
              key={job.org}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
              className="relative"
            >
              <span className="absolute -left-8 top-1.5 h-3 w-3 rounded-full bg-cyan shadow-[0_0_12px_2px_rgba(14,131,136,0.5)] sm:-left-10" />

              <div className="glow-border rounded-2xl glass p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-text">
                    {job.role} <span className="text-text-dim">· {job.org}</span>
                  </h3>
                  <span className="chip rounded-full px-3 py-1 text-xs text-text-dim">
                    {job.period}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {job.points.map((point, j) => (
                    <li key={j} className="flex gap-2 text-sm text-text-dim">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
