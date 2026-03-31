/**
 * /components/sections/StatsSection.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Server Component — no 'use client' directive.
 * Each stat item is wrapped in <AnimateInView> for staggered reveal.
 */

import { AnimateInView } from '@/components/ui/AnimateInView';

const STATS = [
  { value: '20+',  label: 'Years of mastery' },
  { value: '84',   label: 'Destinations unlocked' },
  { value: '40',   label: 'Clients per year, maximum' },
  { value: '100%', label: 'Bespoke — always' },
] as const;

export function StatsSection() {
  return (
    <section
      className="py-16 bg-obsidian-900 border-y border-obsidian-800"
      aria-label="Key statistics"
    >
      <div className="container mx-auto px-6">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, i) => (
            <AnimateInView
              key={stat.label}
              as="div"
              variant="fadeUp"
              duration={0.6}
              delay={i * 0.12}
              className="flex flex-col items-center text-center gap-2"
            >
              <dt className="font-display text-4xl lg:text-5xl font-light text-gold-400">
                {stat.value}
              </dt>
              <dd className="text-2xs uppercase tracking-widest text-obsidian-400">
                {stat.label}
              </dd>
            </AnimateInView>
          ))}
        </dl>
      </div>
    </section>
  );
}
