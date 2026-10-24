# Contact

- **URL:** `/contact`
- **Status:** draft

## Purpose

How to reach Alex, and a chance to book time with him.

## Decisions

- No plain email link, and the address isn't shown on the page. The visitor does something before
  the contact form appears. (The old site had a matching game of Alex's principles; nothing that
  elaborate is needed to start.)
- No phone number.
- A way to book a call. Google Calendar's appointment schedules (a booking page tied to Alex's
  free/busy time) may do this without Calendly. Check what Alex's account includes.
- LinkedIn stays in the footer as a way in that doesn't need the gate.

## Open questions

1. What does the visitor do before the form appears? Something short, ideally the same "make a
   choice" pattern as Home and About.
2. The form needs a service to deliver messages from a static site (Formspree, Basin, a Google Form,
   or similar). Any preference?
3. GitHub Discussions: you mentioned it could send people here. Is that a link from Discussions to
   this page, or a second way to get in touch listed on this page?

## Primary visitor and their question

*(Fill in)*

## Primary action

*(Fill in)*

## Sections

1. **Page header**
   - What it holds: Heading and a sentence on what to get in touch about
   - Component: PageHeader
   - Notes:
2. **Gate**
   - What it holds: The action that reveals the form
   - Component: ChoiceCard (to be decided)
   - Notes:
3. **Contact form**
   - What it holds: Name, email, message
   - Component: ContactForm
   - Notes:
4. **Book a call**
   - What it holds: Link to the booking page
   - Component: Button
   - Notes:

## Metadata

- **Title:** `Contact | Alex Finnarn — Senior Software Consultant, Troy, Ohio`
- **Description:** *(Fill in)*
