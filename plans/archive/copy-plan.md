# Copy plan

How the empty "Fill in" slots on the built pages get filled. Claude drafts, Alex edits. Nothing a visitor reads ships without Alex's pass.

- **Status:** first drafts went on every page with a slot (2026-10-27). On 2026-11-01 Alex edited some and kept the rest for launch, and the draft markers were removed: everything on the pages now goes live. Still Fill in: case studies, the booking link, the contact form, and the part of the bio about the new industry (needs [docs/interview.md](../../docs/interview.md))
- **Gaps on the pages:** `grep -rn FillIn src/pages` lists every one

## How drafting works

- **Voice first.** Before any page copy, Claude reads Alex's existing writing and writes [docs/voice.md](../../docs/voice.md): how he actually writes, with short quoted examples. Alex corrects it. Every draft after that follows it.
- **Drafts go in the page, marked.** Each drafted line replaces its `FillIn` slot, marked so a production build shows the Fill in box instead. The markers (a `Draft` component, a `draft()` helper for meta descriptions, and `draft: true` flags on skills and article CTAs) were removed at launch on 2026-11-01. To draft that way again, restore them from git (commit `fd37788`).
- **Two options for key lines.** For the lines that set the tone (Home positioning line, About opening question, the bio's first sentence), Claude drafts two and Alex picks or rewrites.
- **No invented facts.** Drafts use only what's in Alex's writing, the IA docs, or his answers. Anything else (numbers, names, dates, claims) is left as a question, not guessed.
- **Lists, not tables**, in this plan and in voice.md.

## Step 1: Voice study

Read the sources below, newest first, and write [docs/voice.md](../../docs/voice.md):

- How he opens and closes a piece
- Sentence length and rhythm
- Humor, swearing, self-deprecation: how much and where
- Words and phrases he uses often; words he'd never use
- What he pushes back on (from the IA answers: pretension, "not a fit for" lists, resumes, bios sliced per audience, client-name dropping)
- How the 2025 voice differs from the 2019–2023 voice, and which one the site should use

Sources:

- **This site, 2025 posts**
  - Where: `archive/writing/` (14 posts, about 15,700 words; nine already copied to `src/content/writing/`)
  - Access: local
- **IA answers**
  - Where: `docs/ia/*.md`, the "Alex's notes" sections he wrote
  - Access: local. His most current voice, and his words about this site specifically
- **Medium**
  - Where: medium.com/@alexfinnarn
  - Access: the RSS feed (`medium.com/feed/@alexfinnarn`) has full text of 8 posts, 2020–2023: CKEditor 5 patch review, DrupalCamp NJ recap, DDEV add-on, two "Land a Job" posts, Read The Docs, University API Winter Workshop, Reviving ReactJS Columbus
  - Gap: the feed only carries recent stories. Older Medium posts need links from Alex
- **GitHub: `publishing`**
  - Where: `boring-site/about.md`, `boring-site/ethics.md`, `plans/`
  - Access: `gh`. Likely the closest existing material for About and principles
- **GitHub: `blog`** (Gatsby, archived)
  - Where: about 40 posts under `content/`, 2018–2020 era
  - Access: `gh`. Older voice; read a sample, not all
- **GitHub: `blurg`** (Hugo, archived)
  - Where: about 12 posts under `content/`
  - Access: `gh`
- **GitHub: `alexfinnarn`**
  - Where: `content/` (2 posts) and README
  - Access: `gh`
- **GitHub: talks**
  - Where: `component-library-talk` (deck.mdx), `ds-presentation`, `talks-behat-intro`
  - Access: `gh`. How he explains things out loud
- **GitHub: project READMEs**
  - Where: `obshittian`, `time-burglar`, `outliner`, `main-street-twin`, `cli-execute-mcp`, and similar
  - Access: `gh`. Short, and show the humor in naming and one-liners

Done when: Alex has read voice.md and corrected it.

## Step 2: About and Home

The pages that set the tone. Both need answers from Alex first (see "Inputs needed").

- **About**
  - Opening question (two options)
  - Bio, one version: history, talks and community organizing, system design and architecture, the move into a new industry framed as a strength
  - Principles, each with a sentence of explanation. Start from `publishing/boring-site/ethics.md` and the principles implied across the IA answers
  - Meta description
- **Home**
  - Positioning line (two options). Temporary until the story hero exists
  - "What I do": 3 situations a visitor might be in, in their words, each with a reply of a sentence or two (`title` and `reply` in `src/data/situations.ts`)
  - Meta description

Done when: both pages read as Alex's.

## Step 3: Skills and Work

- **Skills** (`src/data/skills.ts`, listed on Work)
  - The list of skills: Alex names them; Claude drafts the one-line descriptions
- **Work**
  - Intro
  - Availability line, dated
  - Case studies, Problem → Solution → Result. Alex picks the problems; Claude drafts from his description. Candidates from earlier notes: a 20-site Drupal migration with Playwright QA, a giving platform, federal backend work, the DU "Why" headless proposal, an Ignition Maker project (not done yet)
  - Meta description

Done when: at least three real case studies are published.

## Step 4: Writing, articles and the small lines

- **Writing**
  - Intro
  - Whether to bring over the container windows post, and which Medium pieces to list
  - Meta description
- **Articles**
  - A `cta` for each published article (heading, one or two sentences, button label, link), written to follow from that article
- **Contact**
  - The "what to get in touch about" sentence
  - Meta description
- **404**
  - The one sentence
- **Labels Claude wrote while building**, for Alex to keep or rewrite:
  - Buttons: Work, Contact, Home
  - Links: All writing, All work, Report a broken link
  - Work example links: Read the case study, Read the article, See the project, Watch the talk
  - Section headings: What I do, Principles
  - RSS feed description: "Articles by Alex Finnarn, Senior Software Consultant."

Done when: `grep -rn FillIn src/pages` comes back empty.

## Inputs needed from Alex

- **Voice:** the "Corrections wanted" questions at the end of [docs/voice.md](../../docs/voice.md). Needed before any page copy.
- **Facts:** anything wrong in [docs/facts.md](../../docs/facts.md), especially the lines marked **(check)**.
- **Interview:** [docs/interview.md](../../docs/interview.md). Covers the bio, the new industry, Home's visitor and action, skills and case studies.
- **Sources to unlock**, so the voice study can go deeper. Exports and private writing go in `~/Sites/personal/sources/`, never in this public repo, and that folder gets added to the session:
  - Medium export: done (read 2026-10-27)
  - LinkedIn export: Settings → Data privacy → Get a copy of your data (full archive)
  - X archive: Settings → Your account → Download an archive of your data
  - Links to talk recordings
  - Private writing you're OK sharing: old resumes, cover letters, proposals, talk abstracts
  - Nothing needed for mr.alexfinnarn.com: Claude reads it from the Wayback Machine once the Internet Archive is back online
- **Contact:** the booking page link, once the Google Calendar appointment schedule exists.

## Not in this plan

- The interactive story hero on Home
- The contact gate and form
- Reader feedback and analytics on articles

Each needs a design decision first; see the open questions in the page docs.
