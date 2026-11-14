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

// Work and About are out of the menu until there is more to show (2026-11-14). Their pages are
// still built; uncomment the lines to bring the links back.
export const nav = [
  // { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  // { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];
