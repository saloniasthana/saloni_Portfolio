import { motion } from "framer-motion";

// A thin gradient seam with a traveling glow — a small signature touch that
// ties every section transition back to the site's violet/cyan/gold palette.
export default function SectionDivider() {
  return (
    <div className="relative mx-auto h-px max-w-4xl overflow-visible bg-border">
      <motion.div
        className="absolute top-1/2 h-2 w-24 -translate-y-1/2 rounded-full blur-md"
        style={{
          background: "linear-gradient(90deg, transparent, #6d4fe0, #0e8388, #c97d2c, transparent)",
        }}
        initial={{ left: "-10%" }}
        whileInView={{ left: "110%" }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
    </div>
  );
}
