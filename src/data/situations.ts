// Home's "What I do": situations a visitor might be in, in the order the scraps show them.
// Keep 3 to 5 (docs/ia/home.md). Each needs real proof: one piece of work, with its title and
// where it links.
//
// `title` and `reply` are Alex's to write (plans/active/copy-plan.md). Until then the scrap
// shows a Fill in.
export interface Situation {
  /** The visitor's situation, in their words. */
  title?: string;
  /** How Alex would handle it, in a sentence or two. */
  reply?: string;
  proof: {
    kind: 'case study' | 'article' | 'project' | 'talk';
    title: string;
    href: string;
  };
}

export const situations: Situation[] = [
  { proof: { kind: 'article', title: 'CMS First Principles: Content Over Complexity', href: '/writing/cms-content-complexity/' } },
  { proof: { kind: 'article', title: 'AI Musings: Prompts are Tickets', href: '/writing/prompts-are-tickets/' } },
  { proof: { kind: 'article', title: 'Creating CMS First Principles', href: '/writing/cms-first-principles/' } },
];
