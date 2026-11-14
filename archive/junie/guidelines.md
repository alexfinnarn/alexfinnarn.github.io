# Project Guidelines for Junie

## Project Overview
This is a personal website/blog built with Astro, named "Finn's Big Web". The site is primarily focused on writing 
content (articles/blog posts) with a simple, clean design.

## Project Structure
- `/src/` - Contains the source code for the website
  - `/src/assets/` - Static assets like images
  - `/src/components/` - Reusable UI components
  - `/src/content/` - Content collections (primarily writing)
    - `/src/content/writing/` - Writing/blog post content in MDX format
  - `/src/layouts/` - Page layout components
  - `/src/pages/` - Page components that define routes
- `/public/` - Static files served directly by the web server
- `/docs/` - Documentation and project management
  - `/docs/tasks.md` - Structured task list for collaboration
- `/.junie/` - Guidelines and configuration for Junie

## Content Management
- Writing content is managed through Astro's content collections
- Each writing piece has metadata like title, description, publishedDate, tags, etc.
- Draft status can be set to control visibility in production

## Build and Development
- **Development**: Run `npm run dev` to start the development server at localhost:4321
- **Build**: Run `npm run build` to build the production site to ./dist/
- **Preview**: Run `npm run preview` to preview the build locally before deploying

## Testing Guidelines

### Manual Testing
When making changes:
1. Run the development server to verify changes work as expected
2. Check that content displays correctly
3. Ensure responsive design works on different screen sizes
4. Verify that navigation between pages works correctly

### Automated Testing
Playwright is used to run functional tests.

```bash
npm run test
```

Guidelines for adding tests:
- Add tests to the appropriate file for each page, if the test is related to an individual page or part of a page
- Add tests to the appropriate feature file, if the test relates to a feature across the whole website
- Where possible, test for accessibility compliance to WCAG standards

## Code Style Guidelines
- Follow Astro's component structure with frontmatter at the top
- Use consistent indentation (spaces)
- Keep components modular and reusable
- Use TypeScript for type safety
- Follow the existing styling patterns in the project

## Task Collaboration
The project uses a structured task system for collaboration between Alex and Junie, documented in `/docs/tasks.md`.

### Task Structure
Each task includes:
- **Task ID and Title**: Unique identifier (e.g., CONT-001) and descriptive title
- **Metadata**: Category, Priority, Status, Assignee, and Due Date
- **Description**: Detailed explanation of the task
- **Acceptance Criteria**: Specific requirements that must be met
- **Notes**: Additional context or references

### Working with Tasks
When working on tasks:
1. Update the task status as you progress (Not Started → In Progress → Review → Completed)
2. Reference the task ID in commit messages when making changes related to a task
3. Ensure all acceptance criteria are met before marking a task as completed
4. Add new tasks following the established structure when needed
5. Prioritize tasks marked as "High" priority

### Task Categories
- **Content**: Writing blog posts, updating content, creating documentation
- **Design**: UI/UX improvements, visual elements, styling
- **Technical**: Code improvements, bug fixes, new features
- **Other**: Tasks that don't fit into the above categories
