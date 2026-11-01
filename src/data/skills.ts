// The Consulting skills menu (and its short form on Home). Alex writes these; until then the
// pages show a Fill in box. `work` links point at case studies, e.g. '/work/<slug>/'.
// `draft: true` marks a skill Claude drafted (plans/active/copy-plan.md). Drafts show in dev
// only; delete the flag when a skill is Alex's.
export interface Skill {
  title: string;
  description: string;
  work?: { title: string; href: string }[];
  draft?: boolean;
}

export const skills: Skill[] = [
  {
    title: 'Drupal platforms',
    description: 'Building, upgrading and keeping big Drupal sites running, from Drupal 7 to today.',
    draft: true,
  },
  {
    title: 'Testing and QA',
    description: 'Behat, Cypress and Playwright suites that catch the bug before your users do.',
    draft: true,
  },
  {
    title: 'Migrations and upgrades',
    description: 'Moving sites between versions and platforms without losing the content or the business logic.',
    draft: true,
  },
  {
    title: 'AI-assisted workflows',
    description: 'Markdown workflows and MCP tools that make an AI assistant useful on a $20 plan.',
    draft: true,
  },
  {
    title: 'Frontend components',
    description: 'Vue and React components and design systems that fit inside a CMS page.',
    draft: true,
  },
  {
    title: 'Developer environments',
    description: 'Docker, DDEV and CI setups the next developer can actually get running.',
    draft: true,
  },
  {
    title: 'Architecture proposals',
    description: 'Writing down what a system is for, and why, before anyone writes code.',
    draft: true,
  },
];

/** Skills a visitor may see: everything in dev, only approved skills in production. */
export const shownSkills = skills.filter((skill) => import.meta.env.DEV || !skill.draft);
