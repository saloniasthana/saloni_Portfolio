import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

const MOTE_COUNT = 26;
const MOTE_COLORS = ["#6d4fe0", "#c97d2c", "#0e8388"];

export default function BackgroundFX() {
  const wrapRef = useRef(null);

  const motes = useMemo(
    () =>
      Array.from({ length: MOTE_COUNT }, (_, i) => ({
        left: `${(i * 61.8) % 100}%`,
        top: `${(i * 37.1) % 100}%`,
        size: 2 + (i % 3),
        delay: (i % 10) * 0.35,
        duration: 4 + (i % 5),
        color: MOTE_COLORS[i % MOTE_COLORS.length],
      })),
    []
  );

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const blobs = el.querySelectorAll("[data-blob]");

    const ctx = gsap.context(() => {
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: i % 2 === 0 ? 60 : -50,
          y: i % 2 === 0 ? -40 : 50,
          duration: 14 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const onMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        gsap.to(el, { "--mx": `${x}px`, "--my": `${y}px`, duration: 1.2, ease: "power2.out" });
      };
      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg"
      style={{ "--mx": "0px", "--my": "0px" }}
    >
      <div
        data-blob
        className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full opacity-25 blur-[110px]"
        style={{
          background: "radial-gradient(circle, var(--color-violet), transparent 70%)",
          transform: "translate(var(--mx), var(--my))",
        }}
      />
      <div
        data-blob
        className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full opacity-20 blur-[110px]"
        style={{
          background: "radial-gradient(circle, var(--color-cyan), transparent 70%)",
        }}
      />
      <div
        data-blob
        className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full opacity-[0.15] blur-[110px]"
        style={{
          background: "radial-gradient(circle, var(--color-violet), transparent 70%)",
        }}
      />
      <div
        data-blob
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full opacity-[0.12] blur-[100px]"
        style={{
          background: "radial-gradient(circle, var(--color-magenta), transparent 70%)",
        }}
      />
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: m.left,
            top: m.top,
            width: m.size,
            height: m.size,
            background: m.color,
            opacity: 0.3,
            animation: `twinkle ${m.duration}s ease-in-out ${m.delay}s infinite`,
          }}
        />
      ))}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-text) 1px, transparent 1px), linear-gradient(to bottom, var(--color-text) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, var(--color-bg) 85%)",
        }}
      />
    </div>
  );
}
