<div align="center">

# SevenArtList

Search movies, see where to stream them, track what you watch.

*Personal project, work in progress.*

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-1C1C1C?style=flat-square&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![Watchmode](https://img.shields.io/badge/Watchmode-CEC9FF?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWklEQVQ4y2NgGAWjYBSMAlSAsZHxf0pS8v+k5OT/pKTk/0lJSf9JSUn/SUnJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf+TUlL/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf+TUlL/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/GkFBQFAAAAAASUVORK5CYII=&logoColor=black)](https://api.watchmode.com/)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=flat-square&logo=themoviedb&logoColor=white)
[![GitHub Stars](https://img.shields.io/github/stars/Rateur/SevenArtList?style=flat-square)](https://github.com/Rateur/SevenArtList/stargazers)
[![CI](https://github.com/Rateur/SevenArtList/actions/workflows/ci.yml/badge.svg)](https://github.com/Rateur/SevenArtList/actions/workflows/ci.yml)

[Report a bug](https://github.com/Rateur/SevenArtList/issues/new?labels=bug&template=bug_report.md) • [Request a feature](https://github.com/Rateur/SevenArtList/issues/new?labels=enhancement&template=feature_request.md)

🇬🇧 English • [🇫🇷 Français](./README.fr.md)

</div>

---

## Overview

**SevenArtList** is an open-source web application to find a movie, see where to stream it in France, and keep track of what you watch.

The name comes from the "7th Art" (Cinema) combined with the concept of a "Watchlist".

## Status

Personal project, **work in progress**. No hosted demo is linked.

- **Works today:** account sign-up and login, movie search, movie details, streaming links, personal watchlist (status and rating). Movies only, one user per list.
- **Not built yet:** series and anime, shared watchlists, statistics. See [Planned](#planned).
- **Tests:** 8 Vitest tests in 3 files (home page, TMDB service, auth service). CI runs lint, tests and build on Node 20 for each push and pull request to `main`.
- **Language:** the interface is in French.

## Features

| Feature | Description | Status |
| :--- | :--- | :--- |
| **Data Infrastructure** | Supabase project and PostgreSQL schema (`docs/database_schema.sql`) | `[Done]` |
| **Auth System** | Email and password sign-up and login with Supabase. Session refresh in `src/proxy.ts`. `/` redirects to `/login` when signed out | `[Done]` |
| **Movie Search** | TMDB search in French, 500 ms debounce, 2-character minimum. Results need a poster, exclude documentaries and TV movies, and need popularity of 5 or more, or 10 votes or more | `[Done]` |
| **Movie Details (Modal)** | Synopsis, runtime, TMDB rating, genres, first 5 cast members | `[Done]` |
| **Where to Watch** | Streaming and rent/buy links for France from Watchmode, with TMDB provider logos | `[Done]` |
| **Personal Watchlist** | From the movie modal: set a status (to watch, in progress, completed, dropped), a 1 to 5 star rating, or remove the movie. Stored in the `user_media` table | `[Done]` |

## Planned

- **"My List" page.** The nav button is disabled.
- **Series and anime.** Search and the modal only handle movies. The watchlist server actions and `user_media` already accept a `tv` type.
- **Shared watchlists.** The schema has `squads`, `squad_members` and row-level security policies. No app code uses them yet.
- **Real-time sync** between partners.
- **Marathons, statistics, gamification.** Not started.
- **Profile page and sign-out button.** `authService.signOut` exists, nothing calls it. The nav "Profil" button is disabled.
- **Architecture doc.** `docs/architecture.md` is an empty stub.

## Tech Stack

<table>
  <tr>
    <td align="center" width="96">
      <a href="https://nextjs.org/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="48" height="48" alt="Next.js" />
      </a>
      <br />Next.js
    </td>
    <td align="center" width="96">
      <a href="https://supabase.com/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" width="48" height="48" alt="Supabase" />
      </a>
      <br />Supabase
    </td>
    <td align="center" width="96">
      <a href="https://tailwindcss.com/">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="48" height="48" alt="Tailwind CSS" />
      </a>
      <br />Tailwind
    </td>
    <td align="center" width="96">
      <a href="https://www.themoviedb.org/">
        <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" width="48" height="48" alt="TMDB" />
      </a>
      <br />TMDB
    </td>
    <td align="center" width="96">
      <a href="https://api.watchmode.com/">
        <img src="https://cdn.watchmode.com/assets/favicons/apple-touch-icon.png" width="40" height="40" alt="Watchmode" />
      </a>
      <br />Watchmode
    </td>
  </tr>
</table>

Versions from `package.json`:

- **Next.js** 16.2.2 (App Router, Server Actions) and **React** 19.2.4
- **TypeScript** ^5
- **Tailwind CSS** ^4, with shadcn/ui components built on Base UI (`@base-ui/react` ^1.3.0)
- **Supabase**: `@supabase/supabase-js` ^2.101.1 and `@supabase/ssr` ^0.10.0 (auth and PostgreSQL)
- **TMDB** API for movie data, **Watchmode** API for streaming links
- **Forms and toasts**: react-hook-form ^7.72.1, zod ^4.3.6, sonner ^2.0.7
- **Tests and lint**: Vitest ^4.1.2, Testing Library, ESLint ^9

## Project Structure

```text
SevenArtList/
├── .github/workflows/      # CI: lint, test, build
├── docs/                   # SQL schema, architecture stub
├── public/                 # Static assets (images, logos)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── actions/        # Server Actions (movie.ts, search.ts, watchlist.ts)
│   │   ├── login/          # Login and sign-up page
│   │   └── page.tsx        # Home: movie search
│   ├── components/         # React Components
│   │   ├── ui/             # shadcn/ui (dialog, badge, skeleton, etc.)
│   │   ├── movie-card.tsx
│   │   ├── movie-details-dialog.tsx
│   │   ├── search-movies.tsx
│   │   └── watchlist-button.tsx
│   ├── lib/                # Shared utilities
│   │   ├── services/       # TMDB and Watchmode clients
│   │   └── supabase/       # Browser, server and middleware clients
│   ├── services/           # Auth service
│   └── proxy.ts            # Session refresh and redirects
├── .env.example            # Environment variable names
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies & Scripts
└── ...
```

## Getting Started

### Prerequisites

- Node.js 20 or later (the version CI uses)
- npm
- A [Supabase](https://supabase.com/) project, a [TMDB](https://www.themoviedb.org/) account and a [Watchmode](https://api.watchmode.com/) account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rateur/SevenArtList.git
   cd SevenArtList
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` from `.env.example` and fill in the four variables (see below):
   ```bash
   cp .env.example .env.local
   ```
4. Create the database tables (see [Database Setup](#database-setup)).
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000). You are sent to `/login` until you are signed in. Create an account there. Supabase may ask you to confirm your email.

### Environment Variables

All four are needed. The names are in `.env.example`, the values are yours.

| Variable | Used for | Where to get it |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Auth and database | Supabase project settings, API section |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Auth and database | Same page |
| `TMDB_TOKEN` | Search and movie details | TMDB account, API section, **API Read Access Token (v4)** |
| `WATCHMODE_API_KEY` | Streaming links | Watchmode dashboard |

Without `TMDB_TOKEN`, search returns nothing. Without `WATCHMODE_API_KEY`, the movie modal does not load. Never commit `.env.local`.

### Database Setup

1. **Create Project**: Create a new project on [Supabase](https://supabase.com/).
2. **SQL Schema**: Copy the content of [docs/database_schema.sql](./docs/database_schema.sql) and run it in the **SQL Editor** of your Supabase project.
3. **Note**: the file holds the first schema (`profiles`, `squads`, `watchlists`...) and `user_media`. The app reads and writes `user_media` only.

### Other Scripts

```bash
npm run lint    # ESLint
npm test        # Vitest, single run
npm run build   # Production build
npm start       # Serve the production build
```

## Author

Valentin Périès ([@Rateur](https://github.com/Rateur)). Released under the [MIT License](./LICENSE). See [CONTRIBUTING.md](./CONTRIBUTING.md) to contribute.
