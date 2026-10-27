// Small hand-drawn-style SVG accents (sparkle, squiggly arrow, underline)
// used sparingly near the hero copy for a touch of personality.

export function Sparkle({ className = "", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 3c1 6 2 10 4 12s6 3 12 4c-6 1-10 2-12 4s-3 6-4 12c-1-6-2-10-4-12s-6-3-12-4c6-1 10-2 12-4s3-6 4-12z"
        fill={color}
      />
    </svg>
  );
}

export function SquigglyArrow({ className = "", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 90 60" fill="none" className={className}>
      <path
        d="M4 6c14 2 22 14 18 26-3 9-14 12-13 3 1-7 12-10 20-4 10 8 11 22 22 25"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />
      <path
        d="M60 48c3 2 8 4 11 6M71 54c-1-3-1-8 0-11"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Underline({ className = "", color = "currentColor" }) {
  return (
    <svg viewBox="0 0 160 16" fill="none" className={className}>
      <path
        d="M2 10c26-7 106-9 156 2"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
