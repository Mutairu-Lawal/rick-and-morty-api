# Rick & Morty Explorer

A Next.js app to explore Rick & Morty characters, view details, and manage favorites.

---

## 🚀 How to Run

1. **Install dependencies:**
   ```bash
   pnpm install
   ```
2. **Start the development server:**
   ```bash
   pnpm dev
   ```
3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture & Trade-offs

- **Framework:** Built with Next.js 13+ (App Router, React Server Components).
- **Data Fetching:** Uses React Query for client-side caching and async state management.
- **Styling:** Tailwind CSS for rapid, utility-first styling and dark mode support.
- **Image Optimization:** Next.js `<Image />` for optimized, responsive images. External domains are whitelisted in `next.config.ts`.
- **Favorites:** Managed in localStorage via a custom React hook for persistence across sessions.
- **Debounced Search:** Custom hook to reduce API calls while searching.
- **Component Structure:**
  - `CharacterCard` for list/grid display
  - `SearchBar` for filtering
  - `ThemeToggle` for dark/light mode
  - Detail page for each character

**Trade-offs:**

- Chose React Query for simplicity and caching, but for larger apps, server-side fetching or SWR could be considered.
- LocalStorage for favorites is simple but not shareable across devices.
- No global state manager (like Redux) to keep the app lightweight.

---

## ⏳ If I Had More Time, I Would...

- Add pagination or infinite scroll for character lists.
- Implement error boundaries and loading skeletons for better UX.
- Add tests (unit, integration, e2e) for reliability.
- Improve accessibility (a11y) and keyboard navigation.
- Polish UI/UX with animations and transitions.
- Deploy to Vercel with preview URLs.

---

Feel free to reach out for questions or suggestions!
