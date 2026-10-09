import { siteConfig } from "@/content/site";
import { getFeaturedProjects, projects } from "@/content/projects";
import { experiences } from "@/content/experience";
import { certifications, education } from "@/content/achievements";
import { skillClusters } from "@/content/skills";

export type BotLink = { label: string; href: string };
export type BotAnswer = { text: string; links?: BotLink[] };

export const QUICK_REPLIES = [
  "What are his skills?",
  "Show me projects",
  "Tell me about the paper",
  "How do I contact him?",
];

export const GREETING: BotAnswer = {
  text: `Hey! I'm Prince's AI — ask me about his projects, skills, research, or how to reach him.`,
};

const has = (q: string, ...words: string[]) =>
  words.some((w) => q.includes(w));

// Whole-word match — so "hi" never fires inside "his" or "hire",
// and "ar"/"vr" never fire inside "are" or "learn".
const hasWord = (q: string, ...words: string[]) =>
  new RegExp(`\\b(${words.join("|")})\\b`).test(q);

function projectAnswer(slug: (typeof projects)[number]) {
  return {
    text: `${slug.title} (${slug.year}) — ${slug.summary} Stack: ${slug.stack.join(", ")}.`,
    links: [{ label: "Open case study", href: `/projects/${slug.slug}` }],
  };
}

export function answer(raw: string): BotAnswer {
  const q = raw.toLowerCase().trim();
  if (!q) return { text: "Ask me about Prince's work — try a quick reply below." };

  if (hasWord(q, "hello", "hi", "hey", "namaste", "yo")) {
    return GREETING;
  }
  if (has(q, "thank", "thanks", "great", "nice", "cool", "awesome")) {
    return { text: "Anytime! Want the project tour or his contact?" };
  }
  if (has(q, "who is prince", "about prince", "who are you", "yourself", "introduce")) {
    return {
      text: `${siteConfig.name} is an ${siteConfig.role} based in ${siteConfig.location}. ${siteConfig.tagline}`,
      links: [{ label: "About page", href: "/about" }],
    };
  }
  if (has(q, "disease", "health", "medical", "hospital")) {
    const p = projects.find((x) => x.slug === "disease-prediction-platform");
    return p ? projectAnswer(p) : allProjects();
  }
  if (has(q, "gym", "fitness", "workout", "chatbot")) {
    const p = projects.find((x) => x.slug === "gym-buddy-ai");
    return p ? projectAnswer(p) : allProjects();
  }
  if (has(q, "quiz", "game") && !has(q, "unity", "3d", "pushpa")) {
    const p = projects.find((x) => x.slug === "quiz-game");
    return p ? projectAnswer(p) : allProjects();
  }
  if (has(q, "pushpa", "unity", "3d") || hasWord(q, "ar", "vr")) {
    const p = projects.find((x) => x.slug === "pushpa-royale");
    return p ? projectAnswer(p) : allProjects();
  }
  if (has(q, "deepfake", "paper", "research", "publication", "publish", "icatt")) {
    const p = projects.find((x) => x.slug === "deepfake-detection-research");
    if (p) return projectAnswer(p);
    return {
      text: "Prince published Deepfake Detection research at ICATT-2025 (International Conference on Advanced Technology Trends). Full paper available on request — email him.",
      links: [{ label: "Email Prince", href: `mailto:${siteConfig.email}` }],
    };
  }
  if (has(q, "project", "work", "built", "portfolio", "best", "featured", "show")) {
    return allProjects();
  }
  if (has(q, "skill", "stack", "tech", "tool", "language", "python", "tensorflow", "pytorch")) {
    return {
      text: `Core clusters: ${skillClusters.map((c) => c.label).join(" · ")}. Strongest in Python, scikit-learn, NLP, and LLM-integrated products.`,
      links: [{ label: "Skills map", href: "/skills" }],
    };
  }
  if (has(q, "experience", "intern", "work history", "job", "company", "valuescore", "elite")) {
    return {
      text: `Latest: AI/ML Intern at Valuescore Business Solution LLP (end-to-end AI: data, modeling, NLP, LLM integration, deployment). Also: Web Dev Intern at Elite Forum, plus leadership roles. ${experiences.length} roles total.`,
      links: [{ label: "Timeline", href: "/experience" }],
    };
  }
  if (has(q, "education", "college", "degree", "study", "university", "cgpa", "school")) {
    return {
      text: education.map((e) => `${e.title} — ${e.institution}`).join(" | "),
      links: [{ label: "Achievements", href: "/achievements" }],
    };
  }
  if (has(q, "certificat", "certified", "course", "oci", "oracle")) {
    return {
      text: certifications.map((c) => `${c.name} (${c.issuer})`).join(" | "),
      links: [{ label: "All credentials", href: "/achievements" }],
    };
  }
  if (has(q, "hire", "freelance", "service", "offer", "capabilit", "available")) {
    return {
      text: `${siteConfig.availability.label}. He offers ML models, NLP/LLM apps, end-to-end AI products, and data analysis.`,
      links: [{ label: "Capabilities", href: "/services" }],
    };
  }
  if (has(q, "resume", "cv")) {
    return {
      text: "His resume page has the full story plus a downloadable PDF.",
      links: [
        { label: "Resume", href: "/resume" },
        { label: "Download PDF", href: "/resume.pdf" },
      ],
    };
  }
  if (has(q, "email", "mail", "contact", "reach", "phone", "call", "message")) {
    return {
      text: `Email him at ${siteConfig.email} — or use the contact page.`,
      links: [
        { label: "Contact page", href: "/contact" },
        { label: `Email`, href: `mailto:${siteConfig.email}` },
      ],
    };
  }
  if (has(q, "github", "repo", "code", "open source", "opensource")) {
    return {
      text: "His code lives on GitHub under Prince-8286 — ML projects plus the open-source page here.",
      links: [
        { label: "GitHub", href: "https://github.com/Prince-8286" },
        { label: "Open source", href: "/open-source" },
      ],
    };
  }
  if (has(q, "linkedin", "social", "connect", "kaggle", "hugging")) {
    return {
      text: "Connect with him on LinkedIn — and find everything else from the contact page.",
      links: [
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/princepandey89/",
        },
        { label: "Contact", href: "/contact" },
      ],
    };
  }
  if (has(q, "location", "where", "based", "city", "mumbai")) {
    return { text: `Based in ${siteConfig.location}, open to remote-friendly roles.` };
  }

  return {
    text: "Hmm, I only know Prince's portfolio — try skills, projects, the paper, or contact. Or email him directly and he'll answer properly.",
    links: [{ label: `Email ${siteConfig.email}`, href: `mailto:${siteConfig.email}` }],
  };
}

function allProjects(): BotAnswer {
  const featured = getFeaturedProjects();
  return {
    text: `Featured: ${featured.map((p) => p.title).join(" · ")} — plus ${projects.length - featured.length} more. Which one should I open?`,
    links: [
      ...featured.map((p) => ({ label: p.title, href: `/projects/${p.slug}` })),
      { label: "All work", href: "/projects" },
    ],
  };
}
