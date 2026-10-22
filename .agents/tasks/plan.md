# Implementation Plan

## Overview
Build a Next.js (App Router) + TypeScript web app for random educational fun facts with categories: Python, TOEFL, Design, and Japanese. The app will use Groq API server-side, localStorage for favorites/history, and have fallback seed facts. UI includes dark mode, animations, and responsive design.

## Project Structure Rationale
- Using Next.js App Router for server-side API routes and React Server Components
- Tailwind CSS for styling with custom colors matching spec
- TypeScript for type safety
- Zod for validation
- localStorage for client-side persistence (favorites and history)
- Vercel deployment with environment variables for Groq API key

## Milestone 1: Setup Next.js + TypeScript, static page with one seed fact from data/seed-facts.json

- [ ] 1. Initialize Next.js project with TypeScript and Tailwind CSS
      Run: `npx create-next-app@latest . --typescript --tailwind --app --no-eslint --import-alias "@/*" --src-dir --no-src-dir`
      Files: package.json, tsconfig.json, next.config.ts, tailwind.config.ts, postcss.config.mjs
      Verify: `npm run dev` starts server on localhost:3000 without errors

- [ ] 2. Create data/seed-facts.json with minimum 3 facts per category (12 total)
      Follow exact Fact type structure from spec. Ensure examples match category requirements:
      Python: executable code snippets, TOEFL: English sentences with translations,
      Design: graphic design principles (no web/CSS), Japanese: beginner level with correct romaji
      Files: data/seed-facts.json
      Verify: JSON is valid and contains exactly 12 objects with proper structure

- [ ] 3. Create core TypeScript type definitions in lib/schema.ts
      Define Category enum, Fact type, and zod schemas for validation
      Include RequestSchema for API and FactSchema for response validation
      Files: lib/schema.ts
      Verify: TypeScript compiles without errors (`npm run build` succeeds)

- [ ] 4. Create basic layout with global styles in app/layout.tsx and app/globals.css
      Implement dark mode via prefers-color-scheme with colors from spec:
      Light: bg #f6f3ee, card #fffdf9, text #2f3338
      Dark: bg #1d1c1b, card #262523, text #e6e2da
      Base font 17px, line-height 1.75, max content width 620px
      Files: app/layout.tsx, app/globals.css
      Verify: Layout renders with correct colors in both light/dark modes

- [ ] 5. Create static home page in app/page.tsx displaying one seed fact
      Hard-code display of first fact from seed-facts.json
      Show basic card structure with all fields: title, body, example, result, why, howTo, usage
      Files: app/page.tsx
      Verify: Page loads showing one complete fact card with all sections

## Milestone 2: Category tabs, random button (from seed), complete card display

- [ ] 6. Create CategoryTabs component in components/CategoryTabs.tsx
      Implement tabs for: ✨ Campur, 🐍 Python, 📘 TOEFL, 🎨 Desain Grafis, 🌸 Bahasa Jepang
      Use aria-pressed for accessibility, category accent colors from spec
      Files: components/CategoryTabs.tsx
      Verify: Tabs render with correct labels and colors, aria-pressed toggles on click

- [ ] 7. Create FactCard component in components/FactCard.tsx
      Implement complete card display with all Fact fields
      Style with 18px border radius, thin shadow, top border with category color
      Category badge with accent colors: Python #2f5fc0, TOEFL #b4531f, Design #9a3fb0, Japanese #b8324a
      Code box styling for Python examples with white-space: pre-wrap
      Files: components/FactCard.tsx
      Verify: Component renders all fact fields with proper styling and category colors

- [ ] 8. Update app/page.tsx to integrate CategoryTabs and FactCard
      Add state for selected category and current fact
      Implement random fact button that selects from seed-facts.json based on category
      For "mixed" category, select random from all categories
      Files: app/page.tsx
      Verify: Clicking category tabs changes selection, random button shows new fact from correct category

- [ ] 9. Add "Sudah lihat N fakta" counter
      Track viewed facts count in component state
      Display below card
      Files: app/page.tsx
      Verify: Counter increments with each new fact shown

## Milestone 3: Favorites and history with localStorage

- [ ] 10. Create storage helper in lib/storage.ts
      Implement localStorage access wrapped in try/catch
      Functions: getFavorites(), saveFavorite(fact), removeFavorite(title), 
      getRecentTitles(), addRecentTitle(title), clearStorage()
      Keys: 'ff-favs' for Fact[], 'ff-recent' for string[] (max 30)
      Files: lib/storage.ts
      Verify: Functions handle localStorage errors gracefully, maintain max 30 limit for recent

- [ ] 11. Create Favorites component in components/Favorites.tsx
      Display list of saved facts below main card
      Clicking a favorite displays it in main card
      Remove favorite button for each item
      Files: components/Favorites.tsx
      Verify: Favorites display correctly, clicking shows fact, remove button works

- [ ] 12. Add favorite functionality to FactCard component
      Add ☆ Simpan button that toggles favorite status
      Show filled star for favorited facts
      Sync with localStorage via storage helper
      Files: components/FactCard.tsx
      Verify: Star button toggles, updates localStorage, persists across page refresh

- [ ] 13. Implement avoid list for recent titles
      Use recent titles from localStorage as avoid parameter
      Limit to 15 most recent as per spec
      Update when new facts are shown
      Files: app/page.tsx
      Verify: Recent titles are tracked and limited to 15, used in avoid list

## Milestone 4: Route handler /api/fact + Groq integration + zod validation + fallback

- [ ] 14. Create prompt builder in lib/prompts.ts
      Define subtopic arrays for each category (from spec section 7)
      Function: buildMessages(category, avoid[]) returns Groq messages array
      Function: pickCategory() for "mixed" category selection
      Include system prompt with category-specific instructions from spec
      Files: lib/prompts.ts
      Verify: Functions return correct message structure, subtopics are defined per spec

- [ ] 15. Create API route handler in app/api/fact/route.ts
      Implement POST handler with maxDuration 30
      Validate request with RequestSchema from lib/schema.ts
      Call Groq API with proper headers and timeout
      Parse response, validate with FactSchema
      Fallback to seed-facts.json on any error
      Return { fact, source: "ai" | "seed" }
      Files: app/api/fact/route.ts
      Verify: API returns valid fact, handles errors, uses fallback when Groq fails

- [ ] 16. Create .env.example with required environment variables
      Include GROQ_API_KEY and GROQ_MODEL (default: llama-3.3-70b-versatile)
      Files: .env.example
      Verify: File exists with correct variable names and comments

- [ ] 17. Update random button to call API instead of using seed facts
      Modify app/page.tsx to fetch from /api/fact with category and avoid list
      Handle loading states
      Display source indicator (AI or seed)
      Files: app/page.tsx
      Verify: Button fetches from API, shows loading, displays fact with source

## Milestone 5: Random subtopics and avoid list for diversity

- [ ] 18. Enhance lib/prompts.ts with random subtopic selection
      Modify buildMessages() to randomly select subtopic from category array
      Ensure avoid list is properly formatted in prompt
      Files: lib/prompts.ts
      Verify: Each API call includes random subtopic, avoid list in prompt

- [ ] 19. Implement client-side rate limiting
      Add 1-second delay between button clicks to prevent abuse
      Disable button during cooldown
      Files: app/page.tsx
      Verify: Button has cooldown, prevents rapid clicks

- [ ] 20. Enhance avoid list functionality
      Ensure avoid list excludes current fact's title
      Update localStorage with new titles
      Files: app/page.tsx, lib/storage.ts
      Verify: Current fact not in own avoid list, list updates properly

## Milestone 6: Polish UI (dark mode, animations, loading, error states)

- [ ] 21. Implement proper dark mode in globals.css
      Use prefers-color-scheme media query
      Apply all color variables from spec
      Ensure category accent colors remain visible in dark mode
      Files: app/globals.css
      Verify: Colors switch correctly in light/dark mode, all elements visible

- [ ] 22. Add fade animations to FactCard
      0.35s fade transition on fact change
      Respect prefers-reduced-motion
      Files: components/FactCard.tsx, app/globals.css
      Verify: Smooth fade animation, disabled when prefers-reduced-motion

- [ ] 23. Implement loading skeleton state
      Show skeleton UI while fetching from API
      Disable buttons during loading
      Files: components/FactCard.tsx
      Verify: Skeleton shows during API calls, buttons disabled

- [ ] 24. Add error and fallback states
      Show "Fakta cadangan (AI sedang sibuk)" label when using seed facts
      Handle API errors gracefully
      Files: components/FactCard.tsx
      Verify: Fallback label appears when using seed facts, errors don't crash app

- [ ] 25. Add footer note and polish text styles
      Include "Dibuat AI, jadi cek ulang kalau mau dipakai serius." note
      Ensure all text follows spec: base 17px, line-height 1.75
      Files: app/page.tsx, app/globals.css
      Verify: Footer note present, typography matches spec

- [ ] 26. Make responsive for mobile
      Ensure single column layout on small screens
      Adequate touch target sizes for buttons
      Files: components/*.tsx, app/globals.css
      Verify: UI works well on mobile viewport

## Milestone 7: Deploy preparation (.env.example, vercel config notes)

- [ ] 27. Update package.json with proper scripts
      Include build, dev, start scripts
      Add TypeScript checking
      Files: package.json
      Verify: `npm run build` completes successfully

- [ ] 28. Create next.config.ts deployment configuration
      Set up for Vercel deployment
      Files: next.config.ts
      Verify: Configuration valid for Vercel

- [ ] 29. Create README.md with deployment instructions
      Include setup steps: clone, npm install, env vars, deploy to Vercel
      Files: README.md
      Verify: README contains clear deployment instructions

- [ ] 30. Final verification
      Run full test: all categories work, favorites persist, API falls back to seed
      Check for any TypeScript errors
      Files: (all)
      Verify: `npm run build` succeeds, app works end-to-end

## Key Technical Decisions

1. **State Management**: Using React useState and localStorage - no need for complex state libraries for this single-page app
2. **API Security**: Groq API key only in server-side route handler, never exposed to client
3. **Error Handling**: Comprehensive try/catch around localStorage and API calls with fallback to seed data
4. **Accessibility**: aria-pressed for tabs, focus rings, prefers-reduced-motion support
5. **Performance**: Client-side rate limiting, API timeout, optimized re-renders with React.memo where appropriate
6. **Type Safety**: Full TypeScript coverage with zod validation for API responses
7. **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Verification Commands

Each milestone should be verified with:
- `npm run build` - TypeScript compilation and Next.js build
- `npm run dev` - Local development server running
- Manual testing in browser for UI functionality
- Network tab inspection for API calls (ensure no API key exposure)
- localStorage inspection for proper data persistence