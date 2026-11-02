// Skills, in the order Home's "What I do" and the Work filters show them. Work examples are tagged
// with these titles (`skills` in src/content/work/). A skill shows only once something is
// tagged with it; its description heads its filter page.
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
