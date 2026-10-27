import velouraImg from "../assets/Veloura.jpg";
import medibotImg from "../assets/Medibot.png";
import quickgptImg from "../assets/Quickgpt.png";
import hirelyImg from "../assets/hirely.png";
import upskillImg from "../assets/Upskill.png";
import sketchbattleImg from "../assets/SketchBattle.png";

// TODO: swap `github` placeholders once real repo links are ready.
// Hirely & Upskill tech tags are assumed to match Saloni's usual MERN stack
// (confirm/correct if either project actually used a different backend).
export const projects = [
  {
    title: "Medibot",
    subtitle: "AI Medical Chatbot",
    description:
      "A Retrieval-Augmented Generation (RAG) medical chatbot built with LangChain, FAISS, and Hugging Face (Qwen2.5-7B-Instruct), giving context-aware, hallucination-free answers from medical documents through semantic search.",
    highlights: [
      "Streamlit app with PostgreSQL-backed auth and persistent chat history",
      "Document chunking, embeddings, and low-latency vector retrieval",
    ],
    tags: ["Python", "LangChain", "FAISS", "Hugging Face", "Streamlit", "PostgreSQL"],
    accent: "violet",
    github: "#",
    live: "#",
    image: medibotImg,
  },
  {
    title: "QuickGPT",
    subtitle: "AI Chat Application",
    description:
      "A full-stack MERN application integrating OpenAI-family models for intelligent chat — supporting both text and AI-generated image responses with a credit-based usage system.",
    highlights: [
      "Secure JWT auth, persistent chat history, Stripe subscription credits",
      "REST APIs connecting MongoDB, Gemini API, and ImageKit for real-time image generation",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "OpenAI API", "ImageKit"],
    accent: "cyan",
    github: "#",
    live: "#",
    image: quickgptImg,
  },
  {
    title: "Hirely",
    subtitle: "AI Job-Matching Platform",
    description:
      "A job-search platform that scores every application against the job description, tells recruiters who to talk to first, and turns a scattered inbox into a live, trackable pipeline.",
    highlights: [
      "AI match scoring for every application, plus a live Kanban pipeline (Applied → Interview → Offer)",
      "Ask-anything job search assistant for natural-language queries like \"remote React jobs under 2 years exp\"",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "OpenAI API"],
    accent: "gold",
    github: "#",
    live: "#",
    image: hirelyImg,
  },
  {
    title: "Upskill",
    subtitle: "Online Course Marketplace",
    description:
      "A two-sided learning platform — students learn at their own pace with lifetime access to any course they buy, while anyone with real experience can become an instructor and start selling a course in minutes.",
    highlights: [
      "Learner flow: browse, purchase, and revisit courses anytime with lifetime access",
      "Instructor flow: create and publish a paid course, no gatekeeping required",
    ],
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    accent: "magenta",
    github: "#",
    live: "#",
    image: upskillImg,
  },
  {
    title: "SketchBattle",
    subtitle: "Real-time Multiplayer Drawing & Guessing Game",
    description:
      "A real-time multiplayer drawing-and-guessing game with live canvas sync across clients, turn-based rounds, word-guess matching, and dynamic scoring over WebSockets.",
    highlights: [
      "OOP backend architecture (Player, Room, Game, RoomManager) with a turn-based state machine",
      "Solo practice mode with simulated bot players",
    ],
    tags: ["React.js", "TypeScript", "Node.js", "Socket.IO", "Tailwind CSS"],
    accent: "violet",
    github: "#",
    live: "#",
    image: sketchbattleImg,
  },
  {
    title: "Veloura",
    subtitle: "Luxury Fashion Ecommerce Platform",
    description:
      "A full-stack ecommerce storefront for a luxury fashion brand — a filterable product catalog with galleries, cart, and wishlist, a complete checkout flow, and a separate admin dashboard for managing orders, products, customers, and live sales stats.",
    highlights: [
      "JWT sessions in httpOnly cookies with bcrypt password hashing, plus order history and saved addresses",
      "PostgreSQL schema modeled in Prisma 7 with migrations and seed scripts, deployed on Vercel with Vercel Blob image storage",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    accent: "cyan",
    github: "#",
    live: "https://veloura-nine-iota.vercel.app/",
    image: velouraImg,
  },
];
