// Home's "What I do": situations a visitor might be in, in the order the scraps show them.
// Keep 3 to 5 (docs/ia/home.md). Each needs real proof: `proof` is the id of a work example
// (a file in src/content/work/), and `skill` one of the titles in src/data/skills.ts. A
// situation whose proof is a draft shows only in dev.
//
// `title` and `reply` are Alex's to write (plans/active/copy-plan.md). Until then the scrap
// shows a Fill in.
export interface SituationEntry {
  /** The visitor's situation, in their words. */
  title?: string;
  /** How Alex would handle it, in a sentence or two. */
  reply?: string;
  skill: string;
  proof: string;
}

export const situations: SituationEntry[] = [
  { skill: 'Content Management Systems', proof: 'cms-content-complexity' },
  { skill: 'AI-assisted workflows', proof: 'prompts-are-tickets' },
  { skill: 'Architecture proposals', proof: 'cms-first-principles' },
];
