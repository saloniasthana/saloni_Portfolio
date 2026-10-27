# Saloni Asthana — Portfolio

Animated dark/glow-themed portfolio built with React, Vite, Tailwind CSS v4, Framer Motion, and GSAP.

## Run locally

```bash
npm install
npm run dev
```

## Build for deployment (Netlify, etc.)

```bash
npm run build
```

Outputs a static site to `dist/` — drag-and-drop that folder onto Netlify, or connect this repo for continuous deploys.

## Content you'll want to swap in

All resume-derived content lives in `src/data/`:

- `src/data/content.js` — profile, socials, bio, experience, education, skills, achievements
  - `profile.resumeUrl` — currently `"#"`, point it at a real `resume.pdf` (drop the file in `public/` and reference `/resume.pdf`)
  - `profile.socials.leetcode` — currently `"#"`, add your real LeetCode profile URL
- `src/data/projects.js` — the 3 featured projects
  - `github` / `live` — currently `"#"` placeholders, add real links
  - `image` — currently `null` (renders a designed gradient placeholder); set to a path under `public/` once you have real screenshots

No other code changes are needed — components read straight from these files.

## Contact form

`src/components/Contact.jsx` currently opens the visitor's email client via a `mailto:` link (no backend required). To collect submissions directly instead, wire the form to a service like Formspree or EmailJS — the TODO comment in that file marks the spot.
