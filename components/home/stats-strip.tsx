import { projects } from "@/content/projects";
import { achievements, certifications } from "@/content/achievements";
import { experiences } from "@/content/experience";
import { Container } from "@/components/layout/container";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";

const stats = [
  { value: projects.length, label: "AI projects shipped" },
  { value: certifications.length, label: "Certifications" },
  {
    value: achievements.filter((a) => a.category === "Research").length,
    label: "Published papers",
  },
  { value: experiences.length, label: "Roles held" },
];

export function StatsStrip() {
  return (
    <section aria-label="By the numbers" className="relative z-[1]">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-xl)] border border-border-default bg-border-subtle lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 bg-surface-0 px-4 py-6 text-center"
              >
                <dd className="text-display text-3xl text-text-primary md:text-4xl">
                  <CountUp value={stat.value} />
                </dd>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-text-muted">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
