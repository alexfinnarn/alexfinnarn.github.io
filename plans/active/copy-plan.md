# Copy plan

How the empty "Fill in" slots on the built pages get filled. Claude drafts, Alex edits. Nothing a
visitor reads ships without Alex's pass.

- **Status:** Step 1 drafted. [docs/voice.md](../../docs/voice.md) is waiting for Alex's corrections
- **Gaps on the pages:** `grep -rn FillIn src/pages` lists every one

## How drafting works

- **Voice first.** Before any page copy, Claude reads Alex's existing writing and writes
  [docs/voice.md](../../docs/voice.md): how he actually writes, with short quoted examples. Alex corrects it.
  Every draft after that follows it.
- **Drafts go in the page, marked.** Each drafted line replaces its `FillIn` slot, wrapped in a
  `Draft` marker that's highlighted in dev and invisible in production. Alex edits in place and
  removes the marker when a line is his. `grep -rn "<Draft" src` lists what's still unapproved.
- **Two options for key lines.** For the lines that set the tone (Home positioning line, About
  opening question, the bio's first sentence), Claude drafts two and Alex picks or rewrites.
- **No invented facts.** Drafts use only what's in Alex's writing, the IA docs, or his answers.
  Anything else (numbers, names, dates, claims) is left as a question, not guessed.
- **Lists, not tables**, in this plan and in voice.md.

## Step 1: Voice study

Read the sources below, newest first, and write [docs/voice.md](../../docs/voice.md):

- How he opens and closes a piece
- Sentence length and rhythm
- Humor, swearing, self-deprecation: how much and where
- Words and phrases he uses often; words he'd never use
- What he pushes back on (from the IA answers: pretension, "not a fit for" lists, resumes,
  bios sliced per audience, client-name dropping)
- How the 2025 voice differs from the 2019–2023 voice, and which one the site should use

Sources:

- **This site, 2025 posts**
  - Where: `archive/writing/` (14 posts, about 15,700 words; four already copied to
    `src/content/writing/`)
  - Access: local
- **IA answers**
  - Where: `docs/ia/*.md`, the "Primary visitor", "Primary action" and Notes sections he wrote
  - Access: local. His most current voice, and his words about this site specifically
- **Medium**
  - Where: medium.com/@alexfinnarn
  - Access: the RSS feed (`medium.com/feed/@alexfinnarn`) has full text of 8 posts, 2020–2023:
    CKEditor 5 patch review, DrupalCamp NJ recap, DDEV add-on, two "Land a Job" posts, Read The
    Docs, University API Winter Workshop, Reviving ReactJS Columbus
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
  - Where: `obshittian`, `time-burglar`, `outliner`, `main-street-twin`, `cli-execute-mcp`, and
    similar
  - Access: `gh`. Short, and show the humor in naming and one-liners

Done when: Alex has read voice.md and corrected it.

## Step 2: About and Home

The pages that set the tone. Both need answers from Alex first (see "Inputs needed").

- **About**
  - Opening question (two options)
  - Bio, one version: history, talks and community organizing, system design and architecture,
    the move into a new industry framed as a strength
  - Principles, each with a sentence of explanation. Start from `publishing/boring-site/ethics.md`
    and the principles implied across the IA answers
  - Meta description
- **Home**
  - Positioning line (two options). Temporary until the story hero exists
  - Meta description

Done when: both pages read as Alex's, with no `Draft` markers left.

## Step 3: Consulting, skills and Work

- **Skills** (`src/data/skills.ts`, shared by Home and Consulting)
  - The list of skills: Alex names them; Claude drafts the one-line descriptions
  - Links to case studies, once those exist
- **Consulting**
  - Intro
  - Availability line, dated
  - Meta description
- **Work**
  - Intro
  - Case studies, Problem → Solution → Result. Alex picks the problems; Claude drafts from his
    description. Candidates from earlier notes: a 20-site Drupal migration with Playwright QA, a
    giving platform, federal backend work, the DU "Why" headless proposal, an Ignition Maker
    project (not done yet)
  - Meta description

Done when: at least three real case studies are published and each skill links to one.

## Step 4: Writing, articles and the small lines

- **Writing**
  - Intro
  - Which other archived posts to bring over, beyond the four already copied
  - Meta description
- **Articles**
  - A `cta` for each published article (heading, one or two sentences, button label, link),
    written to follow from that article
- **Contact**
  - The "what to get in touch about" sentence
  - Meta description
- **404**
  - The one sentence
- **Labels Claude wrote while building**, for Alex to keep or rewrite:
  - Buttons: Work, Contact, Consulting, Home
  - Links: All writing, Report a broken link
  - Section headings: What I do, Principles
  - RSS feed description: "Articles by Alex Finnarn, Senior Software Consultant."

Done when: `grep -rn FillIn src/pages` and `grep -rn "<Draft" src` both come back empty.

## Inputs needed from Alex

Rough answers are fine. Edit the line; Claude folds the answer in and deletes the question.

- **Voice:** the four "Corrections wanted" questions at the end of
  [docs/voice.md](../../docs/voice.md). Needed before any page copy.
- **Home:** who the page is mainly for and the one thing they should do next. Both are open in
  [docs/ia/home.md](../../docs/ia/home.md).
- **About, the move into a new industry:** which industry? The bio frames the move as a strength,
  so it has to name where you're headed. (Your repos suggest manufacturing and industrial
  automation, from the Ignition Maker project and Main Street Twin, but that's a guess.)
- **About, history:** what your writing already gives Claude is about 12 years on Drupal, starting
  around 2013 with junior work and ending up running whole applications; consulting work in
  Cincinnati; federal contract work until you quit in late 2024; a talk on Cypress at DrupalCamp
  NJ 2023; reviving ReactJS Columbus in 2020; community organizing in Tremont, Cleveland. What's
  missing or wrong? In particular:
  - Other talks: event, year, topic
  - Other groups you organized or helped run
  - Which employers or clients, if any, the bio should name
- **About, "best developer anywhere I've worked":** what's the evidence a visitor would believe?
  A promotion, a role, a system you were the one person able to fix, something someone said?
- **Skills:** the list, in your words, even rough.
- **Work:** which three or four problems to write up. The candidates so far: a 20-site Drupal
  migration with Playwright QA, a giving platform, federal backend work, the DU "Why" headless
  proposal, an Ignition Maker project (not done yet).
- **Medium:** links to older posts, if any matter.
- **Contact:** the booking page link, once the Google Calendar appointment schedule exists.

## Not in this plan

- The interactive story hero on Home
- The contact gate and form
- Reader feedback and analytics on articles

Each needs a design decision first; see the open questions in the page docs.
