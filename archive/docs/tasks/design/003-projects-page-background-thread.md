# DES-003 - Add Background Thread to Projects Page

- **Category**: Design
- **Priority**: Medium
- **Status**: Completed
- **Assignee**: Junie
- **Due Date**: 2025-5-20

**Description**:

The projects page currently has alternating "image on left, text on right" and "text on left, 
image on right" layout to describe each project. The image is set to be 1.25 times bigger than 
the text which leaves a gap where visually the images overlap as you scroll. 

I want to add a background thread to the projects page that will change colors slightly as the 
user scrolls down the page. The "thread" can simply be a line that curves back and forth as it 
winds down the page, and it should remain in the middle of the screen.


**Acceptance Criteria**:
- A squiggly line is in the background of the projects page representing a "thread". 
- As the user scrolls down the page, the line changes color slightly.
- The line is only visible in the `#projects-listing` section of the page.
- The line is in the center of the screen.
- The line is behind the images it will overlap.
