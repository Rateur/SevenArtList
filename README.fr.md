<div align="center">

# SevenArtList

Centralisez votre liste de visionnage. Synchronisez-vous avec votre partenaire. Gamifiez votre expérience cinéma.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-1C1C1C?style=flat-square&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Stars](https://img.shields.io/github/stars/Rateur/SevenArtList?style=flat-square)](https://github.com/Rateur/SevenArtList/stargazers)

[Signaler un bug](https://github.com/Rateur/SevenArtList/issues/new?labels=bug&template=bug_report.md) • [Proposer une amélioration](https://github.com/Rateur/SevenArtList/issues/new?labels=enhancement&template=feature_request.md)

[🇬🇧 English](./README.md) • 🇫🇷 Français

</div>

---

## Vue d'ensemble

**SevenArtList** est une application web open-source conçue pour vous aider à suivre votre consommation de médias (films, séries, et animes) en un seul endroit.

Le nom provient du "7ème Art" (le Cinéma) combiné au concept de "Watchlist". Que vous soyez un spectateur solo ou en couple, SevenArtList offre une synchronisation en temps réel pour gérer vos listes ensemble, réaliser des marathons, et visualiser votre progression grâce à des statistiques avancées.

## Fonctionnalités

| Fonctionnalité | Description | Statut |
| :--- | :--- | :--- |
| | | |

## Stack Technique

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

## Structure du Projet

```text
seven-art-list/
├── src/
│   ├── app/              # Next.js App Router (Pages & API routes)
│   ├── components/       # React components
│   │   └── ui/           # Shadcn UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions & Supabase client
│   └── types/            # TypeScript definitions
├── public/               # Static assets
├── docs/                 # Technical documentation
├── tailwind.config.ts    # Tailwind CSS configuration
├── components.json       # Shadcn UI configuration
└── package.json          # Dependencies & Scripts
```

## Mise en route

### Prérequis

- Node.js 18+ 
- npm

### Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Rateur/SevenArtList.git
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez vos variables d'environnement (voir `.env.example`).
4. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.
