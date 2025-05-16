# DES-002 - Update Projects Page Design

- **Category**: Design
- **Priority**: Medium
- **Status**: Completed
- **Assignee**: Junie
- **Due Date**: 2025-5-17

**Description**:

The projects page currently only loads the `ShippingContainerBuild` component. However, it 
should list all projects on the website. 

The goal of this issue is to update the projects page to list projects in an alternating pattern 
where the design shows an image on the left and details on the right or vice versa.

**Acceptance Criteria**:
- Each project listing has an image, title, and description.
- The `shipping-container.astro` project is included as the first project and 
  `public/images/shipping-container-image.png` is used as the image.
- Two example projects are added to the page with made up content and placeholder images.
- The design alternates "image on left, text on right" and "text on left, image on right" for 
  each project in the listing. 
- The image portion should be 2/3 of the width of the page and text portion 1/3. 
- The two column project listing should collapse to one column on mobile screens with the image 
  first and text second.

