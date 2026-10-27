import { useEffect, useRef, useState } from "react";

// Base text stays dim; an identical colored copy is revealed only where the
// cursor hovers, via a CSS mask that tracks pointer position — "lighting up"
// the narrative as you move over it, with a soft ember glow trailing the
// cursor underneath. Falls back to fully visible on touch.
export default function EmberText({ text, className = "" }) {
  const overlayRef = useRef(null);
  const glowRef = useRef(null);
  const [hoverable, setHoverable] = useState(true);

  useEffect(() => {
    setHoverable(window.matchMedia("(hover: hover)").matches);
  }, []);

  const handleMove = (e) => {
    const overlay = overlayRef.current;
    const glow = glowRef.current;
    if (!overlay) return;
    const rect = overlay.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    overlay.style.maskImage = `radial-gradient(220px circle at ${x}px ${y}px, black, transparent)`;
    overlay.style.webkitMaskImage = `radial-gradient(220px circle at ${x}px ${y}px, black, transparent)`;
    if (glow) {
      glow.style.opacity = "1";
      glow.style.transform = `translate(${x - 110}px, ${y - 110}px)`;
    }
  };

  const handleLeave = () => {
    const overlay = overlayRef.current;
    const glow = glowRef.current;
    if (!overlay) return;
    overlay.style.maskImage = "radial-gradient(0px circle at 50% 50%, black, transparent)";
    overlay.style.webkitMaskImage = "radial-gradient(0px circle at 50% 50%, black, transparent)";
    if (glow) glow.style.opacity = "0";
  };

  return (
    <div
      className="relative"
      onMouseMove={hoverable ? handleMove : undefined}
      onMouseLeave={hoverable ? handleLeave : undefined}
    >
      {hoverable && (
        <span
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute h-55 w-55 rounded-full opacity-0 blur-3xl transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle, rgba(255,150,70,0.3), rgba(14,131,136,0.16) 60%, transparent 75%)",
          }}
        />
      )}
      <p className={`text-text-dim/70 ${className}`}>{text}</p>
      <p
        ref={overlayRef}
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-gold via-[#ff5c7a] to-cyan bg-clip-text text-transparent ${className}`}
        style={
          hoverable
            ? { maskImage: "radial-gradient(0px circle at 50% 50%, black, transparent)" }
            : {
                background: "linear-gradient(90deg,#c97d2c,#ff5c7a,#0e8388)",
                WebkitBackgroundClip: "text",
              }
        }
      >
        {text}
      </p>
    </div>
  );
}
