const embers = [
  { left: "48%", size: 3, delay: 0, duration: 3.2, drift: "-10px", color: "#c97d2c" },
  { left: "56%", size: 2, delay: 0.6, duration: 2.6, drift: "14px", color: "#ff8a3d" },
  { left: "44%", size: 2.5, delay: 1.3, duration: 3.6, drift: "-18px", color: "#ff6b3d" },
  { left: "60%", size: 2, delay: 1.9, duration: 2.9, drift: "8px", color: "#c97d2c" },
  { left: "50%", size: 3, delay: 2.4, duration: 3.1, drift: "-6px", color: "#ff8a3d" },
];

// Small glowing sparks that continuously rise from the flame, reinforcing the
// "candle" motif with movement even before the visitor hovers anything.
export default function EmberParticles() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-1/2 h-24" aria-hidden>
      {embers.map((e, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: e.left,
            bottom: 0,
            width: e.size,
            height: e.size,
            background: e.color,
            boxShadow: `0 0 6px 1px ${e.color}`,
            "--drift": e.drift,
            animation: `ember-rise ${e.duration}s ease-out ${e.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
