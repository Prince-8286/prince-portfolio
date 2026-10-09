export type SkillClusterId =
  | "frontend"
  | "backend"
  | "systems"
  | "design"
  | "leadership";

export type SkillNode = {
  id: string;
  label: string;
  detail: string;
  cluster: SkillClusterId;
};

export type SkillCluster = {
  id: SkillClusterId;
  label: string;
  description: string;
};

export const skillClusters: SkillCluster[] = [
  {
    id: "frontend",
    label: "Languages",
    description: "Programming languages and web foundations for AI products.",
  },
  {
    id: "backend",
    label: "ML & Deep Learning",
    description: "Classical ML, deep learning, and model evaluation.",
  },
  {
    id: "systems",
    label: "Data & tooling",
    description: "Data work, experiment tooling, and day-to-day engineering.",
  },
  {
    id: "design",
    label: "Visualization & 3D",
    description: "Charts, interfaces, and immersive 3D experience work.",
  },
  {
    id: "leadership",
    label: "LLMs & GenAI",
    description: "NLP, LLM integration, agents, and shipping AI to production.",
  },
];

/** Skills aligned to resume — no fake proficiency percentages */
export const skillNodes: SkillNode[] = [
  {
    id: "python",
    label: "Python",
    detail: "Primary language for ML, automation, chatbots, and Django services.",
    cluster: "frontend",
  },
  {
    id: "javascript",
    label: "JavaScript",
    detail: "Interactive apps and quiz/game interfaces alongside Python.",
    cluster: "frontend",
  },
  {
    id: "htmlcss",
    label: "HTML / CSS",
    detail: "Clean, user-friendly interfaces with instant feedback patterns.",
    cluster: "frontend",
  },
  {
    id: "bash",
    label: "Bash / JSON",
    detail: "Scripting, automation glue, and data interchange formats.",
    cluster: "frontend",
  },
  {
    id: "csharp",
    label: "C# (Unity)",
    detail: "Gameplay, combat mechanics, and 3D development in Unity.",
    cluster: "frontend",
  },
  {
    id: "sklearn",
    label: "Scikit-learn",
    detail: "Classification, regression, and disease-prediction modeling.",
    cluster: "backend",
  },
  {
    id: "tensorflow",
    label: "TensorFlow",
    detail: "Deep learning models including Deepfake Detection research.",
    cluster: "backend",
  },
  {
    id: "supervised",
    label: "Supervised learning",
    detail: "Classification, regression, feature engineering, and evaluation.",
    cluster: "backend",
  },
  {
    id: "deeplearning",
    label: "Deep learning",
    detail: "Neural models for detection and prediction tasks.",
    cluster: "backend",
  },
  {
    id: "pandas",
    label: "Pandas / NumPy",
    detail: "Data handling, preparation, and analysis for ML workflows.",
    cluster: "systems",
  },
  {
    id: "jupyter",
    label: "Jupyter",
    detail: "Experimentation, analysis, and model iteration.",
    cluster: "systems",
  },
  {
    id: "git",
    label: "Git / GitHub",
    detail: "Source control and public repositories under Prince-8286.",
    cluster: "systems",
  },
  {
    id: "linux",
    label: "Linux / Windows",
    detail: "Development across Linux and Windows environments.",
    cluster: "systems",
  },
  {
    id: "django",
    label: "Django",
    detail: "Healthcare platform backend serving ML models and chatbot APIs.",
    cluster: "systems",
  },
  {
    id: "matplotlib",
    label: "Matplotlib / Seaborn",
    detail: "Evaluation charts and data visualization for model work.",
    cluster: "design",
  },
  {
    id: "unity",
    label: "Unity 3D",
    detail: "Real-time 3D action game with physics and particle effects.",
    cluster: "design",
  },
  {
    id: "uidesign",
    label: "UI design",
    detail: "Clean quiz and app interfaces with scoring and feedback states.",
    cluster: "design",
  },
  {
    id: "nlp",
    label: "NLP",
    detail: "Chatbots for fitness guidance and doctor recommendations.",
    cluster: "leadership",
  },
  {
    id: "llm",
    label: "LLM integration",
    detail: "Wiring LLMs into products — chat, recommendations, teleconsultation.",
    cluster: "leadership",
  },
  {
    id: "prompt",
    label: "Prompt engineering",
    detail: "Advanced prompting certified via Simplilearn; OCI GenAI certified.",
    cluster: "leadership",
  },
  {
    id: "agents",
    label: "AI agents & automation",
    detail: "Agent-style workflows and N8n automation around AI products.",
    cluster: "leadership",
  },
  {
    id: "deployment",
    label: "Model deployment",
    detail: "Taking models from training to deployed Django-backed products.",
    cluster: "leadership",
  },
];
