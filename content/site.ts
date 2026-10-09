export const siteConfig = {
  name: "Prince Pandey",
  role: "AI/ML Engineer",
  slogan: "Build intelligent systems.",
  tagline:
    "AI/ML engineer focused on Python, machine learning, LLM apps, and end-to-end AI products.",
  description:
    "Portfolio of Prince Pandey — AI/ML engineer based in Mumbai. Python, machine learning, LLMs, AI agents, and deployed AI products.",
  email: "princep22196@gmail.com",
  location: "Mumbai, India",
  availability: {
    status: "available" as const,
    label: "Open to AI/ML opportunities",
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://prince-pandey.netlify.app",
  socials: [
    {
      name: "GitHub",
      href: "https://github.com/Prince-8286",
      label: "GitHub",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/princepandey89/",
      label: "LinkedIn",
    },
    {
      name: "Email",
      href: "mailto:princep22196@gmail.com",
      label: "Email",
    },
  ],
  /** Primary navigation */
  nav: [
    { href: "/projects", label: "Work", id: "work" },
    { href: "/about", label: "About", id: "about" },
    { href: "/experience", label: "Experience", id: "experience" },
    { href: "/skills", label: "Skills", id: "skills" },
    { href: "/contact", label: "Contact", id: "contact" },
  ],
  /** Footer / mobile secondary — real pages only, no fake marketing */
  secondaryNav: [
    { href: "/open-source", label: "Open Source" },
    { href: "/achievements", label: "Achievements" },
    { href: "/services", label: "Capabilities" },
    { href: "/resume", label: "Resume" },
    { href: "/privacy", label: "Privacy" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
