// Skills, in the order the Work page lists them: a plain menu of what Alex does, each with a
// one-line description.
export interface Skill {
  title: string;
  description: string;
}

export const skills: Skill[] = [
  {
    title: 'Content Management Systems',
    description: 'Building, upgrading and keeping big CMS sites running, from Drupal 7 to modern static site generators, like Astro.',
  },
  {
    title: 'Testing and QA',
    description: 'Behat, Cypress and Playwright suites that catch the bug before your users do.',
  },
  {
    title: 'Migrations and upgrades',
    description: 'Moving sites between versions and platforms without losing the content or the business logic.',
  },
  {
    title: 'AI-assisted workflows',
    description: 'Markdown workflows and MCP tools that make an AI assistant useful on a $20 plan.',
  },
  {
    title: 'Frontend components',
    description: 'Vue and React components and design systems that fit inside a CMS page.',
  },
  {
    title: 'Developer environments',
    description: 'Docker, DDEV and CI setups the next developer can actually get running.',
  },
  {
    title: 'Architecture proposals',
    description: 'Writing down what a system is for, and why, before anyone writes code.',
  },
];
