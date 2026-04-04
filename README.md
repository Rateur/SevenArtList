<div align="center">

# SevenArtList

Centralize your watchlist. Sync with your partner. Gamify your cinema experience.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-1C1C1C?style=flat-square&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
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
| **Immersive Details** | Movie Details Modal with TMDB data and casting | `[Done]` |
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
  </tr>
</table>

## Project Structure

```text
SevenArtList/
├── docs/                   # SQL Schemas & Documentation
├── public/                 # Static assets (images, logos)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── actions/        # Server Actions (TMDB, Auth)
│   │   ├── login/          # Auth pages
│   │   └── ...
│   ├── components/         # React Components
│   │   ├── ui/             # Shadcn UI (Reusable Atoms)
│   │   ├── movie-card.tsx
│   │   ├── movie-details-dialog.tsx
│   │   └── ...
│   ├── lib/                # Shared utilities
│   │   ├── services/       # TMDB API Service logic
│   │   └── supabase/       # Supabase client/middleware config
│   ├── services/           # Backend / Auth logic
│   └── proxy.ts            # Next.js Proxy configuration
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies & Scripts
├── tailwind.config.ts      # Tailwind CSS configuration (if used)
└── tsconfig.json           # TypeScript configuration
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
