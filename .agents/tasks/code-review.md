# Fun facts Next.js app implementation review

A complete Next.js application for random educational facts across four categories, with AI-generated content via Groq API and client-side persistence. The implementation matches the specification's structure: category tabs, fact card display, localStorage favorites, and a server-side API route that protects the AI key.

**Verdict**: APPROVED

## High-level view

The route handler validates incoming requests with zod, calls Groq API with proper timeout and retry logic, and falls back to seed facts on any failure. The client sends only category and avoid list to the API, never raw prompts or the API key. Subtopics per category are defined in prompts.ts and selected randomly to diversify output.

Category-specific formatting is enforced in the prompt system: Python examples must be runnable code, TOEFL includes translation, design avoids web topics, and Japanese includes authentic script with romaji. The UI renders each field distinctly with appropriate code block styling for Python and Japanese examples.

Client components wrap localStorage access in try/catch and respect SSR constraints. The app tracks recently viewed titles to populate the avoid list sent to the API, preventing repetition within a session. A 1-second cooldown prevents rapid API abuse.

The styling implements the exact color palette from the spec in both light and dark modes with CSS custom properties. Fade animations respect prefers-reduced-motion. All required UI sections are present: title, subtitle, category tabs with aria-pressed, complete fact card with all fields, save and random buttons, view counter, favorites list, and footer disclaimer.

<details>
<summary>Issues (0)</summary>

No blocking concerns identified.

</details>

<details>
<summary>Details</summary>

### Route handler and API security

The `/api/fact` route validates incoming requests with zod's `ReqSchema`, which matches the spec exactly: category must be one of the five values (including "mixed"), avoid is an array of strings limited to 15 items. The handler extracts the API key from `process.env.GROQ_API_KEY` and never exposes it in client code or network responses.

On parse or validation failure of the Groq response, the code attempts once more before falling through to seed data. The timeout is set to 20 seconds with `AbortSignal.timeout`, and `maxDuration` is configured to 30 seconds for Vercel compatibility.

### Prompt construction and category rules

`lib/prompts.ts` contains complete subtopic arrays for each category as specified. The `buildMessages` function assembles the system prompt with all required rules: accuracy requirement, avoidance of specified titles, simplicity for beginners, and the instruction to return only JSON.

Category-specific rules are appended to the user message exactly as the spec dictates. For design, the prompt explicitly forbids web, CSS, HTML, app, or mobile references. For Japanese, it requires authentic script plus romaji on the next line.

### Data validation and typing

`lib/schema.ts` defines the `FactSchema` with all required fields and constraints: `title` max 120 characters, `howTo` array with 2-5 items, proper category enum. The `RequestSchema` matches the API contract.

The seed data in `data/seed-facts.json` contains exactly 3 facts per category (12 total), all in Indonesian. Python examples are executable snippets. Japanese entries include authentic Japanese script followed by romaji. Design facts avoid web topics entirely.

### Client-side storage and avoid list management

`lib/storage.ts` implements all required functions with proper error handling in try/catch blocks. The `getFavorites`, `saveFavorite`, and `removeFavorite` functions use the `ff-favs` key. `addToRecent` and `getRecent` use `ff-recent` with a 30-item limit, and the page sends the most recent 15 as the avoid list.

Storage access is guarded with `typeof window === "undefined"` checks to avoid SSR errors.

### UI component completeness

`app/page.tsx` includes all required sections in the correct order: header with title and subtitle, category tabs, fact card, action buttons with view counter, favorites list, and footer note.

The `FactCard` component renders every field from the spec: category badge, title, body, example, result (with appropriate label per category), why explanation, numbered how-to steps, and usage.

`CategoryTabs` implements proper accessibility with `role="tablist"`, `role="tab"`, `aria-selected`, and `aria-pressed`. Each tab has descriptive `aria-label` text.

`Favorites` displays saved facts with category badges and remove buttons. Clicking a favorite displays it in the main card.

### Styling and theming

`app/globals.css` defines the exact color values from the spec as CSS custom properties: `#f6f3ee` for light background, `#fffdf9` for cards, `#2f3338` for text. Dark mode switches to `#1d1c1b`, `#262523`, and `#e6e2da`. Category accent colors are defined: Python `#2f5fc0`, TOEFL `#b4531f`, Design `#9a3fb0`, Japanese `#b8324a`.

The base font size is 17px with 1.75 line-height as specified. Maximum content width is controlled via `max-w-2xl` (≈ 640px) matching the spec's 620px guideline.

</details>

<details>
<summary>File map</summary>

- `app/layout.tsx` – Root layout with metadata and font setup
- `app/page.tsx` – Main page component with state management and API integration  
- `app/globals.css` – Global styles with theme variables and animations
- `app/api/fact/route.ts` – API route handler for Groq integration with validation
- `components/FactCard.tsx` – Complete fact display with all fields and save button
- `components/CategoryTabs.tsx` – Category selector tabs with accessibility attributes
- `components/Favorites.tsx` – Saved facts list with remove functionality
- `lib/prompts.ts` – Prompt templates and subtopic definitions for all categories
- `lib/schema.ts` – Zod schemas and TypeScript types for data validation
- `lib/storage.ts` – localStorage helpers with error handling
- `data/seed-facts.json` – 12 seed facts (3 per category) in Indonesian
- `.env.example` – Environment variable template with security warnings
- `package.json` – Dependencies and scripts for Next.js + TypeScript

</details>