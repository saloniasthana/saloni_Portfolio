import { useEffect, useState } from "react";

export default function RoleCycler({ roles, typeSpeed = 55, deleteSpeed = 30, hold = 1400 }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const current = roles[index];
    let timeout;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), hold);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
      } else {
        setPhase("typing");
        setIndex((i) => (i + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, index, roles, typeSpeed, deleteSpeed, hold]);

  return (
    <span className="text-gradient">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-cyan align-middle" style={{ height: "1em" }} />
    </span>
  );
}
