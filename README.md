<div align="center">

# SevenArtList

Centralize your watchlist. Sync with your partner. Gamify your cinema experience.

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

**SevenArtList** is an open-source web application designed to help you track your media consumption (movies, series, and animes) in one place. 

The name comes from the "7th Art" (Cinema) combined with the concept of a "Watchlist". Whether you're a solo viewer or part of a couple, SevenArtList offers real-time synchronization to manage your watchlists together, complete marathons, and visualize your progress through advanced statistics.

## Features

| Feature | Description | Status |
| :--- | :--- | :--- |
| **Data Infrastructure** | Supabase Setup & PostgreSQL Schema | `[Done]` |
| **Auth System** | Login, Sessions & Middleware | `[Done]` |
| **Media Search** | TMDB API (Functional), Debounced Real-time Search, Gold Standard Filtering | `[Done]` |
| **Movie Details (Modal)** | Immersive modal with TMDB data and casting | `[Done]` |
| **Watchlist** | Personal & Shared Tracking | `[Planned]` |

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

## Project Structure

```text
SevenArtList/
├── docs/                   # SQL Schemas & Documentation
├── public/                 # Static assets (images, logos)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── actions/        # Server Actions (movie.ts, search.ts)
│   │   ├── login/          # Auth pages
│   │   └── ...
│   ├── components/         # React Components
│   │   ├── ui/             # Shadcn UI (dialog, badge, skeleton, etc.)
│   │   ├── movie-card.tsx
│   │   ├── movie-details-dialog.tsx
│   │   └── ...
│   ├── lib/                # Shared utilities
│   │   ├── services/       # TMDB API Service logic
│   │   └── supabase/       # Config client/middleware config
│   └── services/           # Backend / Auth logic
├── tasks/                  # Tasks, Lessons & Context
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies & Scripts
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rateur/SevenArtList.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables (see `.env.example`).
4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Database Setup

1. **Create Project**: Create a new project on [Supabase](https://supabase.com/).
2. **SQL Schema**: Copy the content of [docs/database_schema.sql](./docs/database_schema.sql) and execute it in the **SQL Editor** of your Supabase project.
3. **Environment Variables**: Create a `.env.local` file from [.env.example](./.env.example) and fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### TMDB Setup

1. **Create Account**: Create an account on [TheMovieDB.org](https://www.themoviedb.org/).
2. **API Settings**: Go to the **API** section in your account settings.
3. **Get Token**: Retrieve the **API Read Access Token (v4)**.
4. **Environment Variables**: Add it to your `.env.local` file under the variable `TMDB_TOKEN`.
5. **Documentation**: TMDB is used for metadata (sysnopsis, posters, casting).

### Watchmode Setup (Streaming Links)

1. **Create Account**: Create a free account on [api.watchmode.com](https://api.watchmode.com/).
2. **Get API Key**: Retrieve your API key from the dashboard.
3. **Environment Variables**: Add it to your `.env.local` file under the variable `WATCHMODE_API_KEY`.
4. **Deep Links**: Watchmode is used to obtain direct links to streaming services (Netflix, Prime, etc.), bypassing JustWatch redirects for a better UX.
