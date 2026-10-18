// Eye-test rounds for /styleguide. The LAST entry is the one the page runs.
// To start a new round: add the new themes to src/styles/tokens/themes.css and the
// options list in Styleguide.astro, then append a round here. Record the result on the
// round when it comes back. See docs/design/eye-test.md.

export interface Round {
  name: string;
  date: string;
  /** Theme id that starts as champion. */
  start: string;
  /** Theme ids that challenge the champion, in order. */
  challengers: string[];
  /** Filled in after the round is run. */
  result?: {
    winner: string;
    picks: string[];
    notes?: string;
  };
}

export const rounds: Round[] = [
  {
    name: 'Round 2',
    date: '2026-10-18',
    start: 'b1',
    challengers: ['b3', 'r1', 'r2', 'r3'],
    result: {
      winner: 'r3',
      picks: ['b1 over b3', 'b1 over r1', 'r2 over b1', 'r3 over r2'],
      notes: 'Orange "a bit jarring sometimes"; the softer sans type softens it.',
    },
  },
  {
    name: 'Round 3',
    date: '2026-10-18',
    start: 'r3',
    challengers: ['r3-less', 'r3-light', 'r3-one', 'r3-soft'],
    result: {
      winner: 'r3-less',
      picks: ['r3-less over r3', 'r3-less over r3-light', 'r3-less over r3-one', 'r3-less over r3-soft'],
      notes: 'Chosen as the site theme for now.',
    },
  },
];

export const currentRound = rounds[rounds.length - 1];
