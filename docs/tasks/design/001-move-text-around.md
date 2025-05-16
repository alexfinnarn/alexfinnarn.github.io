# DES-001 - Animate Projects 

- **Category**: Design
- **Priority**: Medium
- **Status**: Not Started
- **Assignee**: Junie
- **Due Date**: 2025-5-17

**Description**:

Add text movement to the project with the GSAP library. Start with the short paragraphs of text 
on the writing and projects page animating them. Make sure to add a setting for `reduced-motion` 
and honor that so when a user has it enabled the text does not animate.

**Acceptance Criteria**:
- Install GSAP into the project with `npm install gsap`
- Animate the intro text on the `/writing` page to come in a random order
- Animate the intro text on the `/projects` page to fade up from the bottom
- Add a form element to the settings form to enable reduced motion
- Do not animate the text if a user has asked for reduced motion

**Notes**:
You will need to add dependencies in this issue.
Follow any guidelines the Astro framework has for testing.
