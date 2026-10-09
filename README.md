# Prince Pandey — Portfolio

Personal portfolio site for **Prince Pandey**, an AI/ML engineer based in Mumbai.

Built with Next.js (App Router), TypeScript, and Tailwind CSS. Dark-first editorial design with copper accents, real project case studies, and content managed as TypeScript modules (easy to edit without a CMS).

**Live:** *(your production domain — set `NEXT_PUBLIC_SITE_URL`)*  
**Contact:** [princep22196@gmail.com](mailto:princep22196@gmail.com)  
**GitHub:** [Prince-8286](https://github.com/Prince-8286) · **LinkedIn:** [princepandey89](https://www.linkedin.com/in/princepandey89/)

---

## Features

- Home hero, stats bar, skills marquee, selected work, about, experience timeline, skills constellation, process, contact CTA
- Project case studies with system architecture diagrams and live/demo links
- About, experience, skills, contact form, print-friendly resume
- Achievements, open-source list, capabilities (secondary nav)
- "Prince's AI" chatbot (rule-based answers from portfolio content)
- Dark / light theme, command palette (`⌘K` / `Ctrl+K`)
- SEO: metadata, sitemap, robots, JSON-LD, Open Graph image
- Accessibility basics: skip link, focus styles, reduced motion support

---

## Tech stack

| Layer | Choice |
|--------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS variables |
| Motion | Framer Motion, Lenis |
| UI primitives | Radix UI (slot, dialog, label, etc.) |
| Icons | Lucide React |
| Package manager | pnpm |

---

## Getting started

### Requirements

- Node.js 20+  
- [pnpm](https://pnpm.io/)  

### Install & run

```bash
pnpm install
pnpm approve-builds sharp unrs-resolver
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier |

---

## Project structure

```text
app/                 # Routes (App Router)
components/          # UI, layout, hero, projects, motion, bot, intro
content/             # Site copy, projects, experience, skills
lib/                 # utils, fonts, SEO, contact action
public/              # Static assets (images, resume.pdf)
```

---

## Editing content

All main copy lives under `content/`:

| File | What to edit |
|------|----------------|
| `content/site.ts` | Name, role, email, socials, nav, availability, site URL |
| `content/projects.ts` | Case studies, `featured` flags, live/GitHub links |
| `content/experience.ts` | Work history |
| `content/about.ts` | About page narrative |
| `content/skills.ts` | Skills constellation nodes |
| `content/achievements.ts` | Awards, education, certifications |
| `content/open-source.ts` | Public repos list |
| `content/services.ts` | Capabilities page |

### Selected work (home)

Only projects with `featured: true` in `content/projects.ts` appear in the home “Selected work” section. Order follows the array order in that file.

### Hero portrait

- Sketch avatar: **`public/portrait-sketch.png`** (header logo, hero, favicon)
- Photo: **`public/portrait.jpg`** (kept as spare)

### Resume PDF

Place or replace: **`public/resume.pdf`**  
Linked from the resume and contact sections.

### Project images

| Path | Used for |
|------|----------|
| `public/Disease_Prediction/` | Disease platform architecture diagram |
| `public/Gym_Buddy/` | Gym Buddy architecture diagram |
| `public/Quiz_Game/` | Quiz game architecture diagram |
| `public/Pushpa_Royale/` | Pushpa Royale architecture diagram |

Drop screenshots next to the diagrams — wire them via each project's `visuals` array in `content/projects.ts`.

---

## Environment variables

Create `.env.local` (never committed — covered by `.gitignore`):

```bash
# Production site URL (SEO, sitemap, canonicals)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: contact form email via Resend
RESEND_API_KEY=
CONTACT_TO_EMAIL=princep22196@gmail.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

Without `RESEND_API_KEY`, the contact form validates and succeeds in demo mode (logged in development).

---

## Deploy (Netlify)

This project is **Next.js**, not a static `dist` site. A `netlify.toml` is included with `@netlify/plugin-nextjs`.

1. Push to GitHub, then **Add new site → Import an existing project** in Netlify.
2. In **Site configuration → Build & deploy → Build settings**:

| Setting | Set to |
|---------|--------|
| **Build command** | `npm run build` |
| **Publish directory** | **Clear / leave empty** (remove `dist`) |
| **Functions directory** | (leave default) |

3. Environment (Site configuration → Environment variables): `NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app`, plus `RESEND_API_KEY` / `CONTACT_TO_EMAIL` if you want real contact emails.
4. **Save** and **trigger a new deploy**.

### Deploy (Vercel)

Import the repo, framework preset **Next.js**, set `NEXT_PUBLIC_SITE_URL`, deploy.

---

## Design notes

- **Theme:** Dark-first editorial UI, copper accent (`#D4A574`), steel secondary (`#7A9EAD`)  
- **Fonts:** Newsreader (display), Geist Sans, Geist Mono  
- **Tokens:** `app/globals.css`  

---

## License

Private personal portfolio. All rights reserved unless you add a license file.
