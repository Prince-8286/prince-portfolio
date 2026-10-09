export type ProjectDomain =
  | "product"
  | "platform"
  | "design-system"
  | "oss"
  | "research";

export type ProjectSection = {
  title: string;
  body?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ProjectFeature = {
  title: string;
  body: string;
  bullets?: string[];
};

export type TechGroup = {
  label: string;
  items: string[];
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  role: string;
  cover: {
    gradient: string;
    label: string;
  };
  stack: string[];
  /** Only real outcomes — avoid invented percentages */
  metrics: { label: string; value: string }[];
  links: {
    github?: string;
    live?: string;
    docs?: string;
  };
  featured: boolean;
  domains: ProjectDomain[];
  problem: string;
  approach: string;
  impact: string;
  challenges: string[];
  architecture: string[];
  lessons: string[];
  timeline: string;
  sections: ProjectSection[];
  /** Optional product-case-study fields */
  overview?: string[];
  goals?: string[];
  features?: ProjectFeature[];
  techGroups?: TechGroup[];
  architectureDiagram?: string;
  engineeringDecisions?: string[];
  roadmap?: string[];
  statusNote?: string;
  /** Product screenshots / diagrams under /public */
  visuals?: {
    label: string;
    src: string;
    alt: string;
  }[];
  /** Optional cover image for cards (path under /public) */
  coverImage?: string;
  /**
   * Layout tone for the case study page:
   * - product: deep product case study
   * - showcase: image-first frontend engineering showcase
   * - default: compact project page
   */
  layout?: "product" | "showcase" | "default";
  /** Showcase-style challenge cards */
  showcaseChallenges?: {
    title: string;
    description: string;
    skills: string[];
    image?: string;
    featured?: boolean;
    source?: string;
    live?: string;
  }[];
  skillObjectives?: {
    label: string;
    items: string[];
  }[];
  whyBuilt?: string[];
  repositoryNote?: string;
  /** Explicit ownership / contribution bullets */
  contributions?: string[];
  securityLayers?: { label: string; items: string[] }[];
  researchNotes?: string[];
  solutionSteps?: string[];
};

/**
 * Projects from the owner's resume.
 * Repo links omitted until confirmed — no invented URLs.
 */
export const projects: Project[] = [
  {
    slug: "disease-prediction-platform",
    title: "Multi-Model Disease Prediction Platform",
    summary:
      "A healthcare platform that analyzes multiple diseases in one system — ML models for detection and stage prediction, plus chatbot support for doctors and teleconsultation.",
    year: 2025,
    role: "AI/ML Project · Personal",
    cover: {
      gradient:
        "linear-gradient(145deg, #141210 0%, #232020 40%, #0e1a22 100%)",
      label: "ML · Healthcare",
    },
    stack: [
      "Python",
      "Scikit-learn",
      "NLP",
      "Django",
      "Pandas",
      "NumPy",
    ],
    metrics: [
      { label: "Type", value: "Multi-disease" },
      { label: "Models", value: "ML + NLP" },
      { label: "App", value: "Django" },
    ],
    links: {},
    featured: true,
    domains: ["product"],
    problem:
      "Health screening tools usually target one condition at a time. Patients and early-stage triage need a single system that can analyze multiple diseases, explain the stage, and point to next steps — nearby doctors, teleconsultation, and medication guidance.",
    approach:
      "I designed one Django-backed platform serving multiple machine learning models: scikit-learn classifiers for disease detection and stage prediction, an NLP chatbot for doctor recommendations and teleconsultation, and personalized medicine and supplement suggestions generated from the analysis.",
    impact:
      "A complete path from symptoms to model output to actionable guidance — demonstrating multi-model ML serving inside a real product surface, not a notebook demo.",
    challenges: [
      "Serving multiple disease models behind one coherent Django app",
      "Keeping detection, stage prediction, and chatbot advice consistent",
      "Designing suggestions that guide users without overclaiming",
    ],
    architecture: [
      "Django backend serving ML models and chatbot APIs",
      "Scikit-learn models for detection and stage prediction",
      "NLP chatbot for doctor recommendations and teleconsultation",
      "Pandas/NumPy data preparation and feature pipelines",
    ],
    lessons: [
      "Multi-model products need clear boundaries per model",
      "Healthcare UX must be careful — guidance, not diagnosis",
      "Serving models is as much engineering as training them",
    ],
    timeline: "2025 · Independent",
    layout: "product",
    overview: [
      "The platform brings several disease checks into one place. A user submits health inputs, the system runs the relevant ML models, and returns detection results with stage prediction.",
      "Around the models sits a full product: chatbot support that recommends nearby doctors and teleconsultation, plus personalized medicine and supplement suggestions based on the analysis.",
    ],
    goals: [
      "Analyze multiple diseases in one system",
      "Detect conditions and predict stage with ML",
      "Recommend nearby doctors and teleconsultation via chatbot",
      "Suggest personalized medicine and supplements",
    ],
    features: [
      {
        title: "Multi-disease analysis",
        body: "One system capable of analyzing multiple diseases instead of single-condition tools.",
      },
      {
        title: "Detection & stage prediction",
        body: "Machine learning models for disease detection with stage prediction on top.",
      },
      {
        title: "Doctor-finder chatbot",
        body: "NLP chatbot support for nearby doctor recommendations and teleconsultation.",
        bullets: [
          "Nearby doctor recommendations",
          "Teleconsultation guidance",
        ],
      },
      {
        title: "Personalized suggestions",
        body: "Medicine and supplement suggestions personalized from the analysis.",
      },
    ],
    techGroups: [
      {
        label: "ML & Data",
        items: ["Python", "Scikit-learn", "Pandas", "NumPy"],
      },
      {
        label: "App",
        items: ["Django", "NLP chatbot"],
      },
    ],
    statusNote:
      "Repository link will be added once confirmed on the owner's GitHub — screenshots to follow.",
    visuals: [
      {
        label: "System architecture",
        src: "/Disease_Prediction/diagram.svg",
        alt: "Architecture diagram: health inputs to Django backend to ML models and chatbot to patient report",
      },
    ],
    sections: [],
  },
  {
    slug: "gym-buddy-ai",
    title: "Gym Buddy with AI Chatbot",
    summary:
      "A fitness companion app with personalized workout and nutrition recommendations, an NLP chatbot for real-time guidance, and progress tracking.",
    year: 2025,
    role: "AI/ML Project · Personal",
    cover: {
      gradient:
        "linear-gradient(160deg, #12141a 0%, #201a16 45%, #142018 100%)",
      label: "AI · Fitness",
    },
    stack: ["Python", "NLP", "AI Chatbot", "Automation"],
    metrics: [
      { label: "Type", value: "AI chatbot" },
      { label: "AI", value: "NLP" },
      { label: "Tracking", value: "Workouts" },
    ],
    links: {},
    featured: true,
    domains: ["product"],
    problem:
      "Generic fitness plans ignore the individual. People need workout and nutrition recommendations that adapt to them — plus answers in the moment, not static articles.",
    approach:
      "I built a fitness companion with personalized workout and nutrition recommendations, an AI-powered NLP chatbot for real-time fitness guidance, and progress tracking for workouts, calories, and performance monitoring.",
    impact:
      "A complete loop from recommendation to conversation to tracked progress — showing NLP integration inside a product users open daily.",
    challenges: [
      "Making chatbot guidance feel personal and context-aware",
      "Designing tracking that users actually maintain",
      "Balancing automation with trustworthy fitness advice",
    ],
    architecture: [
      "Python app with personalized recommendation logic",
      "NLP chatbot for real-time fitness guidance",
      "Progress tracking for workouts, calories, and performance",
    ],
    lessons: [
      "Conversational UX needs tight product boundaries",
      "Tracking features make or break fitness products",
      "Personalization is a data problem before it is a model problem",
    ],
    timeline: "2025 · Independent",
    layout: "default",
    features: [
      {
        title: "Personalized plans",
        body: "Workout and nutrition recommendations tailored to the user.",
      },
      {
        title: "AI fitness chatbot",
        body: "NLP-powered chatbot providing real-time fitness guidance.",
      },
      {
        title: "Progress tracking",
        body: "Monitoring for workouts, calories, and performance over time.",
        bullets: ["Workouts", "Calories", "Performance"],
      },
    ],
    techGroups: [
      {
        label: "AI",
        items: ["Python", "NLP", "AI Chatbot"],
      },
      {
        label: "Product",
        items: ["Automation", "Progress tracking"],
      },
    ],
    statusNote:
      "Repository link will be added once confirmed on the owner's GitHub — screenshots to follow.",
    visuals: [
      {
        label: "System architecture",
        src: "/Gym_Buddy/diagram.svg",
        alt: "Architecture diagram: user goals to recommendation engine to chatbot and tracking to adaptive plans",
      },
    ],
    sections: [],
  },
  {
    slug: "deepfake-detection-research",
    title: "Deepfake Detection Research",
    summary:
      "Published research on detecting AI-generated fake media — presented at ICATT-2025 (International Conference on Advanced Technology Trends).",
    year: 2025,
    role: "Research · Published at ICATT-2025",
    cover: {
      gradient:
        "linear-gradient(150deg, #101014 0%, #1a1c26 55%, #161a14 100%)",
      label: "Research · Published",
    },
    stack: ["Python", "TensorFlow", "Deep Learning", "Model Evaluation"],
    metrics: [
      { label: "Venue", value: "ICATT-2025" },
      { label: "Type", value: "Research" },
      { label: "Status", value: "Published" },
    ],
    links: {},
    featured: true,
    domains: ["research"],
    problem:
      "AI-generated fake images and videos are now cheap to produce and hard to spot by eye. Platforms, newsrooms, and everyday viewers need automated detection they can trust — with honest numbers about where it works and where it fails.",
    approach:
      "I researched deep learning approaches to telling real media from synthetic media: curating data, preprocessing consistently, training detection models, and evaluating them with discipline — reporting what the numbers actually say rather than what sounds good.",
    impact:
      "The work was accepted and published at ICATT-2025 (International Conference on Advanced Technology Trends) — peer validation that the methodology and evaluation hold up.",
    challenges: [
      "High-quality fakes leave fewer and subtler traces",
      "Evaluation must be leakage-free to mean anything",
      "Detection must generalize beyond the training distribution",
    ],
    architecture: [
      "Dataset curation for real and synthetic media",
      "Consistent preprocessing pipeline",
      "Deep learning detection model",
      "Disciplined train/test evaluation",
      "Write-up, review, and publication",
    ],
    lessons: [
      "Evaluation discipline is the whole game in detection research",
      "Honest metrics beat impressive-sounding ones",
      "Writing the paper sharpens the method",
    ],
    timeline: "2025 · Published at ICATT-2025",
    layout: "default",
    sections: [
      {
        title: "Publication",
        body: "International Conference on Advanced Technology Trends (ICATT-2025). Full paper available on request — contact by email.",
      },
    ],
  },
  {
    slug: "quiz-game",
    title: "Quiz Game",
    summary:
      "An interactive quiz game with randomized questions, difficulty levels, real-time scoring, timer, and leaderboard.",
    year: 2024,
    role: "Software Project · Personal",
    cover: {
      gradient:
        "linear-gradient(135deg, #0c1218 0%, #1a2030 50%, #1a1612 100%)",
      label: "App · Interactive",
    },
    stack: ["Python", "JavaScript", "UI Design"],
    metrics: [
      { label: "Type", value: "Interactive" },
      { label: "Modes", value: "Levels" },
      { label: "Feedback", value: "Real-time" },
    ],
    links: {},
    featured: false,
    domains: ["product"],
    problem:
      "Quiz apps get boring fast with fixed question sets. Players need randomized questions, real difficulty progression, and instant feedback to stay engaged.",
    approach:
      "I developed an interactive quiz game with randomized questions and difficulty levels, real-time scoring with a timer and leaderboard, and a clean interface giving instant feedback on every answer.",
    impact:
      "A polished, engaging game loop built from scratch — demonstrating UI design, state management, and real-time interaction.",
    challenges: [
      "Randomizing questions while keeping difficulty fair",
      "Real-time scoring, timer, and leaderboard state",
      "Instant, readable feedback on every answer",
    ],
    architecture: [
      "Python and JavaScript game logic",
      "Randomized question engine with difficulty levels",
      "Real-time scoring, timer, and leaderboard",
      "Clean UI with instant answer feedback",
    ],
    lessons: [
      "Game feel comes from tight feedback loops",
      "Randomness needs design constraints",
      "Simple, readable UI wins in fast interactions",
    ],
    timeline: "2024 · Independent",
    layout: "default",
    visuals: [
      {
        label: "System architecture",
        src: "/Quiz_Game/diagram.svg",
        alt: "Architecture diagram: question bank to randomizer to game loop to feedback and leaderboard",
      },
    ],
    sections: [],
  },
  {
    slug: "pushpa-royale",
    title: "Pushpa Royale (Unity Game)",
    summary:
      "A real-time 3D action game in Unity with immersive environments, combat mechanics, and optimized cross-device performance.",
    year: 2024,
    role: "Game Project · Personal",
    cover: {
      gradient:
        "linear-gradient(150deg, #14120e 0%, #1e1a24 55%, #121816 100%)",
      label: "3D · Unity",
    },
    stack: ["Unity", "C#", "AR/VR/MR", "3D Development"],
    metrics: [
      { label: "Engine", value: "Unity" },
      { label: "Mode", value: "Real-time 3D" },
      { label: "Scope", value: "Action" },
    ],
    links: {},
    featured: false,
    domains: ["product"],
    problem:
      "Action games live or die on feel: environments must immerse, combat must respond, and performance must hold across devices.",
    approach:
      "I developed a real-time 3D action game in Unity with immersive environments and character models, combat mechanics with animations, physics, and particle effects — optimized for smooth cross-device play with responsive controls.",
    impact:
      "A complete 3D action experience showing engineering range beyond ML — real-time systems, performance optimization, and game feel.",
    challenges: [
      "Combat mechanics that feel responsive and fair",
      "Balancing visual richness with cross-device performance",
      "Coordinating animations, physics, and particle effects",
    ],
    architecture: [
      "Unity with C# gameplay systems",
      "Immersive environments and character models",
      "Combat, animation, physics, and particle systems",
      "Performance optimization for cross-device play",
    ],
    lessons: [
      "Performance budgets shape design from day one",
      "Game feel is systems working together, not one trick",
      "Responsive controls are the core feature",
    ],
    timeline: "2024 · Independent",
    layout: "default",
    visuals: [
      {
        label: "System architecture",
        src: "/Pushpa_Royale/diagram.svg",
        alt: "Architecture diagram: player input to Unity gameplay to world effects and performance to final frame",
      },
    ],
    sections: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: projects[index - 1] ?? null,
    next: projects[index + 1] ?? null,
  };
}
