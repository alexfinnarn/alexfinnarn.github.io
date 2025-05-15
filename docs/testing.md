# Testing

These are the testing guidelines for this codebase. It has different content in different 
sections and we will test various things starting with functional tests. 

## Functional Tests

Playwright is used to run functional tests. 

```bash
npm run test
```

Guidelines:
- Add tests to the appropriate file for each page, if the test is related to an individual page 
  or part of a page.
- Add tests to the appropriate feature file, if the test relates to a feature across the whole 
  website.
- Where possible, test for accessibility compliance to WCAG standards.