// Facts that appear on more than one page. Change them here, not in the pages.
// Copy (taglines, bios) is not stored here until Alex writes it.

export const site = {
  name: 'Alex Finnarn',
  role: 'Senior Software Consultant',
  location: 'Troy, Ohio',
  linkedin: 'https://www.linkedin.com/in/alexfinnarn/',
  github: 'https://github.com/alexfinnarn',
  medium: 'https://medium.com/@alexfinnarn',
};

export const titleSuffix = `${site.name} — ${site.role}, ${site.location}`;

// Work and About are off the site until there is more to show (2026-11-14). To bring one back:
// 1. Rename its page so it is built again: src/pages/_about.astro -> about.astro, or the folder
//    src/pages/_work -> work. (Astro skips pages whose name starts with an underscore.)
// 2. Uncomment its line below.
// 3. For Work, point the old-URL redirects in astro.config.mjs back at '/work'.
export const nav = [
  // { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  // { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
