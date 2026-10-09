export type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  summary: string;
  achievements: string[];
  technologies: string[];
};

/** Professional experience from the owner's resume — dates marked "—" where not provided. */
export const experiences: Experience[] = [
  {
    id: "valuescore",
    company: "Valuescore Business Solution LLP",
    role: "AI/ML Intern",
    location: "Mumbai, India",
    start: "—",
    end: "—",
    summary:
      "End-to-end AI solution work spanning data handling, predictive modeling, NLP, LLM integration, and model deployment.",
    achievements: [
      "Built AI solutions covering data handling, predictive modeling, and evaluation.",
      "Worked with NLP and LLM integration for applied AI features.",
      "Contributed to model deployment workflows taking models beyond notebooks.",
    ],
    technologies: [
      "Python",
      "Scikit-learn",
      "NLP",
      "LLM Integration",
      "Model Deployment",
    ],
  },
  {
    id: "elite-forum",
    company: "Elite Forum",
    role: "Web Development Intern",
    location: "Mumbai, India",
    start: "—",
    end: "—",
    summary:
      "Web development internship focused on building and maintaining web interfaces.",
    achievements: [
      "Contributed to web development tasks across frontend interfaces.",
      "Worked with HTML, CSS, JavaScript, and modern web tooling.",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "Git"],
  },
  {
    id: "trackon",
    company: "Trackon Courier Pvt Ltd",
    role: "Account Manager",
    location: "Mumbai, India",
    start: "—",
    end: "—",
    summary:
      "Client-facing account management combining operations, communication, and ownership of outcomes.",
    achievements: [
      "Managed client accounts and day-to-day operational coordination.",
      "Built experience in stakeholder communication and accountability.",
    ],
    technologies: ["Excel", "Communication", "Operations"],
  },
  {
    id: "acropolis",
    company: "Acropolis",
    role: "Treasurer",
    location: "Mumbai, India",
    start: "—",
    end: "—",
    summary:
      "Student leadership role with ownership of budgets, planning, and organizational trust.",
    achievements: [
      "Owned budgeting and financial tracking for the organization.",
      "Coordinated with fellow office-bearers on events and initiatives.",
    ],
    technologies: ["Excel", "Leadership", "Planning"],
  },
  {
    id: "msme",
    company: "MSME",
    role: "Campus Ambassador",
    location: "Mumbai, India",
    start: "—",
    end: "—",
    summary:
      "Campus representation role focused on outreach, engagement, and community building.",
    achievements: [
      "Represented the program on campus and drove student engagement.",
      "Built outreach and community-organizing experience.",
    ],
    technologies: ["Outreach", "Community", "Communication"],
  },
];
