import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiSend, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import { profile } from "../data/content";
import SectionHeading from "./SectionHeading";

// TODO: this currently opens the visitor's email client via `mailto:`.
// For a proper inbox (no mail client popup), wire this form to Formspree
// or EmailJS and POST `form` there instead of building the mailto link.
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something together"
        align="center"
        description="Have a role, project, or idea in mind? My inbox is open."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="glow-border flex flex-col justify-between rounded-2xl glass p-8"
        >
          <div className="space-y-5">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-text-dim hover:text-text">
              <span className="chip flex h-10 w-10 items-center justify-center rounded-full text-cyan">
                <FiMail />
              </span>
              {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-text-dim hover:text-text">
              <span className="chip flex h-10 w-10 items-center justify-center rounded-full text-cyan">
                <FiPhone />
              </span>
              {profile.phone}
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            {[
              { href: profile.socials.github, icon: FiGithub },
              { href: profile.socials.linkedin, icon: FiLinkedin },
              { href: profile.socials.leetcode, icon: SiLeetcode },
            ].map(({ href, icon: Icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full glass text-text-dim transition-colors hover:text-cyan"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="glow-border space-y-4 rounded-2xl glass p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="chip rounded-xl border border-border px-4 py-3 text-sm text-text outline-none placeholder:text-text-dim focus:border-cyan focus:shadow-[0_0_0_3px_rgba(14,131,136,0.15)] transition-shadow"
            />
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="chip rounded-xl border border-border px-4 py-3 text-sm text-text outline-none placeholder:text-text-dim focus:border-cyan focus:shadow-[0_0_0_3px_rgba(14,131,136,0.15)] transition-shadow"
            />
          </div>
          <textarea
            required
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell me about your project or opportunity..."
            className="chip w-full resize-none rounded-xl border border-border px-4 py-3 text-sm text-text outline-none placeholder:text-text-dim focus:border-cyan focus:shadow-[0_0_0_3px_rgba(14,131,136,0.15)] transition-shadow"
          />
          <button
            type="submit"
            className="glow-cta flex w-full items-center justify-center gap-2 rounded-xl bg-text px-6 py-3 font-display text-sm font-medium text-bg transition-transform hover:scale-[1.02]"
          >
            Send Message <FiSend />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
