# PathWise-AI Frontend

The frontend of PathWise-AI is a React-based career guidance experience for Nigerian graduates and job seekers.
It is built with Vite, Tailwind CSS v4, React Router, and a modular component layout for onboarding, path selection, and skill tracking.

## What this frontend does

- Presents the landing page and onboarding flow
- Captures user details and course/path selection
- Displays career roadmap cards, skills, assessments, and results
- Uses client-side routing for a fast interactive experience
- Loads content from static data files and integrated UI components

## Technologies

- React 19
- Vite
- Tailwind CSS v4
- React Router Dom
- Framer Motion
- FontAwesome / Lucide icons

## Project structure

- `src/main.jsx` — app entry point and router bootstrap
- `src/App.jsx` — top-level application layout and route wrappers
- `src/pages/` — route pages for landing, onboarding, and path flows
- `src/components/` — reusable UI sections and page components
- `src/data/` — static content and question sets used by the app
- `src/index.css` — Tailwind theme tokens, color definitions, and global styles

## Page & route flow

- `/` — landing page with hero, features, and CTA
- `/begin` — onboarding page for user data collection
- `/select-path` — choose a path or career track
- `/course-selection` — select a course or major for college users
- `/career-path` — view candidate career paths and role selection
- `/highschool-path` — high school-specific pathway flow

## Components overview

- `HeroSection.jsx` — landing hero and CTA
- `HowItWorks.jsx` — product workflow explanation
- `CareerPath.jsx` — role and pathway cards
- `Skills.jsx` — skills list for each role
- `Assessments.jsx` — quiz and progress UI
- `Result.jsx` — results summary and recommendations
- `Navbar.jsx`, `Footer.jsx` — page navigation and footer layout

## Setup

```bash
cd PathWise-frontend
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Build for production

```bash
npm run build
npm run preview
```

## Development notes

- Routing is configured in `src/App.jsx` using React Router.
- Page state is managed locally in each component and shared through props.
- Static data is defined in `src/data/` and imported into components.
- Tailwind theme tokens are in `src/index.css`; this is the place to adjust colors, spacing, and typography.
- If you add a new route, update `src/App.jsx` and create a new page in `src/pages/`.

## Styling and theming

- Tailwind v4 is configured via `src/index.css`.
- Use component-level utility classes and shared CSS tokens for consistency.
- To change the brand palette, update the theme values in `src/index.css`.

## Useful commands

- `npm run dev` — start local development server
- `npm run build` — create production build
- `npm run preview` — preview the production build locally
- `npm run lint` — lint the frontend source files

## Notes for contributors

- Keep UI components reusable and lean.
- Keep static text in `src/data/` whenever possible for easier updates.
- Use descriptive names for route pages and component files.
- When adding new UI sections, make sure they work well on mobile and desktop.
