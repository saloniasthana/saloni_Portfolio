import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const ring = { x: 0, y: 0 };
    let raf;

    const onMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      ring.x = e.clientX;
      ring.y = e.clientY;
    };

    const animateRing = () => {
      if (ringRef.current) {
        const current = ringRef.current.dataset;
        const cx = parseFloat(current.x || ring.x);
        const cy = parseFloat(current.y || ring.y);
        const nx = cx + (ring.x - cx) * 0.18;
        const ny = cy + (ring.y - cy) * 0.18;
        ringRef.current.style.transform = `translate(${nx}px, ${ny}px)`;
        current.x = nx;
        current.y = ny;
      }
      raf = requestAnimationFrame(animateRing);
    };

    const onEnterInteractive = () => ringRef.current?.classList.add("scale-150", "opacity-80");
    const onLeaveInteractive = () => ringRef.current?.classList.remove("scale-150", "opacity-80");

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(animateRing);

    const interactive = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/70 transition-[transform,opacity] duration-150 ease-out"
      />
    </>
  );
}
