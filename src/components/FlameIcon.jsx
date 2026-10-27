export default function FlameIcon({ size = 56, className = "" }) {
  return (
    <div className="relative flex items-center justify-center">
      <span
        className="animate-pulse-glow pointer-events-none absolute rounded-full blur-2xl"
        style={{
          width: size * 2.2,
          height: size * 2.2,
          background:
            "radial-gradient(circle, rgba(255,150,70,0.45), rgba(109,79,224,0.18) 55%, transparent 75%)",
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        className={`animate-flicker relative ${className}`}
      >
        <defs>
          <linearGradient id="flame-outer" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#6d4fe0" />
            <stop offset="55%" stopColor="#ff6b3d" />
            <stop offset="100%" stopColor="#c97d2c" />
          </linearGradient>
          <linearGradient id="flame-inner" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#0e8388" />
            <stop offset="100%" stopColor="#ffe9a8" />
          </linearGradient>
        </defs>
        <path
          d="M32 4C24 16 16 22 16 34a16 16 0 0 0 32 0c0-7-3-11-6-15 0 6-3 9-5 9 2-9-1-16-5-24z"
          fill="url(#flame-outer)"
        />
        <path
          d="M32 22c-3 6-6 9-6 15a6 6 0 0 0 12 0c0-3-1-5-2-7 0 3-1.5 4.5-2.5 4.5 1-5.5-.5-9-1.5-12.5z"
          fill="url(#flame-inner)"
        />
      </svg>
    </div>
  );
}
