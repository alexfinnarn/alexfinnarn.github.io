// The Consulting skills menu (and its short form on Home). Alex writes these; until then the
// pages show a Fill in box. `work` links point at case studies, e.g. '/work/<slug>/'.
export interface Skill {
  title: string;
  description: string;
  work?: { title: string; href: string }[];
}

export const skills: Skill[] = [];
