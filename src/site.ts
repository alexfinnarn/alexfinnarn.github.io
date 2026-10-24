// Facts that appear on more than one page. Change them here, not in the pages.
// Copy (taglines, bios) is not stored here until Alex writes it.

export const site = {
  name: 'Alex Finnarn',
  role: 'Senior Software Consultant',
  location: 'Troy, Ohio',
  linkedin: 'https://www.linkedin.com/in/alexfinnarn/',
  github: 'https://github.com/alexfinnarn',
};

export const titleSuffix = `${site.name} — ${site.role}, ${site.location}`;

export const nav = [
  { href: '/work', label: 'Work' },
  { href: '/writing', label: 'Writing' },
  { href: '/consulting', label: 'Consulting' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

// The design option the site uses: a data-theme value from src/styles/tokens/themes.css.
// Chosen with the eye test in /styleguide; see docs/design/decisions.md.
export const theme = 'r3-less';
