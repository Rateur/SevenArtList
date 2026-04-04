<div align="center">

# SevenArtList

Centralisez votre liste de visionnage. Synchronisez-vous avec votre partenaire. Gamifiez votre expérience cinéma.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-1C1C1C?style=flat-square&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GitHub Stars](https://img.shields.io/github/stars/Rateur/SevenArtList?style=flat-square)](https://github.com/Rateur/SevenArtList/stargazers)
[![CI](https://github.com/Rateur/SevenArtList/actions/workflows/ci.yml/badge.svg)](https://github.com/Rateur/SevenArtList/actions/workflows/ci.yml)

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
| **Infrastructure Data** | Setup Supabase & Schéma PostgreSQL | `[Terminé]` |
| **Système d'Auth** | Connexion, Sessions & Middleware | `[Terminé]` |
| **Recherche Médias** | API TMDB (Fonctionnelle), Moteur de recherche temps réel (Debounced), Filtrage Gold Standard | `[Terminé]` |
| **Détails des films (Modal)** | Modale immersive avec données TMDB et casting | `[Terminé]` |
| **Watchlist** | Suivi Personnel & Partagé | `[Prévu]` |

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
SevenArtList/
├── docs/                   # Schémas SQL & Documentation
├── public/                 # Contenu statique (images, logos)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── actions/        # Server Actions (movie.ts, search.ts)
│   │   ├── login/          # Pages d'authentification
│   │   └── ...
│   ├── components/         # Composants React
│   │   ├── ui/             # Shadcn UI (dialog, badge, skeleton, etc.)
│   │   ├── movie-card.tsx
│   │   ├── movie-details-dialog.tsx
│   │   └── ...
│   ├── lib/                # Utilitaires partagés
│   │   ├── services/       # Logique du Service API TMDB
│   │   └── supabase/       # Config client/middleware Supabase
│   └── services/           # Logique Backend / Auth
├── tasks/                  # Tâches, Leçons & Contexte
├── next.config.ts          # Configuration Next.js
├── package.json            # Dépendances & Scripts
└── ...
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

### Database Setup

1. **Création du projet** : Créer un projet sur [Supabase](https://supabase.com/).
2. **Schéma SQL** : Copier le contenu de [docs/database_schema.sql](./docs/database_schema.sql) et l'exécuter dans le **SQL Editor** de Supabase.
3. **Variables d'environnement** : Créer un fichier `.env.local` à partir du [.env.example](./.env.example) et y renseigner `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### Configuration TMDB

1. **Création du Compte** : Créez un compte sur [TheMovieDB.org](https://www.themoviedb.org/).
2. **Paramètres API** : Allez dans la section **API** des paramètres de votre compte.
3. **Récupération du Jeton** : Récupérez le **Jeton d'accès en lecture à l'API (v4)**.
4. **Variables d'environnement** : Ajoutez-le dans votre fichier `.env.local` sous la variable `TMDB_TOKEN`.
