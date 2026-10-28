<div align="center">

# SevenArtList

Cherchez des films, voyez où les regarder, suivez ce que vous regardez.

*Projet personnel en cours.*

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-1C1C1C?style=flat-square&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![Watchmode](https://img.shields.io/badge/Watchmode-CEC9FF?style=flat-square&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAWklEQVQ4y2NgGAWjYBSMAlSAsZHxf0pS8v+k5OT/pKTk/0lJSf9JSUn/SUnJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf+TUlL/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf+TUlL/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/0lJSf9JSUn/SUlJ/GkFBQFAAAAAASUVORK5CYII=&logoColor=black)](https://api.watchmode.com/)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=flat-square&logo=themoviedb&logoColor=white)
[![GitHub Stars](https://img.shields.io/github/stars/Rateur/SevenArtList?style=flat-square)](https://github.com/Rateur/SevenArtList/stargazers)
[![CI](https://github.com/Rateur/SevenArtList/actions/workflows/ci.yml/badge.svg)](https://github.com/Rateur/SevenArtList/actions/workflows/ci.yml)

[Signaler un bug](https://github.com/Rateur/SevenArtList/issues/new?labels=bug&template=bug_report.md) • [Proposer une amélioration](https://github.com/Rateur/SevenArtList/issues/new?labels=enhancement&template=feature_request.md)

[🇬🇧 English](./README.md) • 🇫🇷 Français

</div>

---

## Vue d'ensemble

**SevenArtList** est une application web open-source pour trouver un film, voir où le regarder en France et suivre ce que vous regardez.

Le nom provient du "7ème Art" (le Cinéma) combiné au concept de "Watchlist".

## Statut

Projet personnel, **en cours**. Aucune démo hébergée n'est liée.

- **Fonctionne aujourd'hui :** inscription et connexion, recherche de films, fiche détaillée, liens de streaming, watchlist personnelle (statut et note). Films uniquement, un utilisateur par liste.
- **Pas encore construit :** séries et animés, listes partagées, statistiques. Voir [Prévu](#prévu).
- **Tests :** 8 tests Vitest répartis dans 3 fichiers (page d'accueil, service TMDB, service d'authentification). La CI lance lint, tests et build sur Node 20 à chaque push et pull request vers `main`.
- **Langue :** l'interface est en français.

## Fonctionnalités

| Fonctionnalité | Description | Statut |
| :--- | :--- | :--- |
| **Infrastructure Data** | Projet Supabase et schéma PostgreSQL (`docs/database_schema.sql`) | `[Terminé]` |
| **Système d'Auth** | Inscription et connexion par e-mail et mot de passe avec Supabase. Rafraîchissement de session dans `src/proxy.ts`. `/` redirige vers `/login` si vous n'êtes pas connecté | `[Terminé]` |
| **Recherche de films** | Recherche TMDB en français, délai de 500 ms, 2 caractères minimum. Un résultat doit avoir une affiche, n'être ni un documentaire ni un téléfilm, et avoir une popularité d'au moins 5 ou au moins 10 votes | `[Terminé]` |
| **Détails du film (modale)** | Synopsis, durée, note TMDB, genres, 5 premiers acteurs | `[Terminé]` |
| **Où regarder** | Liens de streaming, location et achat pour la France via Watchmode, avec les logos des plateformes TMDB | `[Terminé]` |
| **Watchlist personnelle** | Depuis la modale : choisir un statut (à voir, en cours, terminé, abandonné), une note de 1 à 5 étoiles, ou retirer le film. Stockée dans la table `user_media` | `[Terminé]` |

## Prévu

- **Page "Ma Liste".** Le bouton du menu est désactivé.
- **Séries et animés.** La recherche et la modale ne gèrent que les films. Les actions serveur de la watchlist et `user_media` acceptent déjà le type `tv`.
- **Listes partagées.** Le schéma contient `squads`, `squad_members` et des politiques de sécurité par ligne. Aucun code de l'application ne les utilise.
- **Synchronisation en temps réel** entre partenaires.
- **Marathons, statistiques, gamification.** Pas commencé.
- **Page de profil et bouton de déconnexion.** `authService.signOut` existe, rien ne l'appelle. Le bouton "Profil" du menu est désactivé.
- **Document d'architecture.** `docs/architecture.md` est un fichier vide.

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

Versions de `package.json` :

- **Next.js** 16.2.2 (App Router, Server Actions) et **React** 19.2.4
- **TypeScript** ^5
- **Tailwind CSS** ^4, avec des composants shadcn/ui construits sur Base UI (`@base-ui/react` ^1.3.0)
- **Supabase** : `@supabase/supabase-js` ^2.101.1 et `@supabase/ssr` ^0.10.0 (auth et PostgreSQL)
- API **TMDB** pour les données des films, API **Watchmode** pour les liens de streaming
- **Formulaires et notifications** : react-hook-form ^7.72.1, zod ^4.3.6, sonner ^2.0.7
- **Tests et lint** : Vitest ^4.1.2, Testing Library, ESLint ^9

## Structure du Projet

```text
SevenArtList/
├── .github/workflows/      # CI : lint, tests, build
├── docs/                   # Schéma SQL, document d'architecture vide
├── public/                 # Contenu statique (images, logos)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── actions/        # Server Actions (movie.ts, search.ts, watchlist.ts)
│   │   ├── login/          # Page de connexion et d'inscription
│   │   └── page.tsx        # Accueil : recherche de films
│   ├── components/         # Composants React
│   │   ├── ui/             # shadcn/ui (dialog, badge, skeleton, etc.)
│   │   ├── movie-card.tsx
│   │   ├── movie-details-dialog.tsx
│   │   ├── search-movies.tsx
│   │   └── watchlist-button.tsx
│   ├── lib/                # Utilitaires partagés
│   │   ├── services/       # Clients TMDB et Watchmode
│   │   └── supabase/       # Clients navigateur, serveur et middleware
│   ├── services/           # Service d'authentification
│   └── proxy.ts            # Rafraîchissement de session et redirections
├── .env.example            # Noms des variables d'environnement
├── next.config.ts          # Configuration Next.js
├── package.json            # Dépendances & Scripts
└── ...
```

## Mise en route

### Prérequis

- Node.js 20 ou plus (la version utilisée par la CI)
- npm
- Un projet [Supabase](https://supabase.com/), un compte [TMDB](https://www.themoviedb.org/) et un compte [Watchmode](https://api.watchmode.com/)

### Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/Rateur/SevenArtList.git
   cd SevenArtList
   ```
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Créez `.env.local` à partir de `.env.example` et renseignez les quatre variables (voir ci-dessous) :
   ```bash
   cp .env.example .env.local
   ```
4. Créez les tables de la base (voir [Base de données](#base-de-données)).
5. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
6. Ouvrez [http://localhost:3000](http://localhost:3000). Vous êtes envoyé vers `/login` tant que vous n'êtes pas connecté. Créez un compte. Supabase peut demander de confirmer votre e-mail.

### Variables d'environnement

Les quatre sont nécessaires. Les noms sont dans `.env.example`, les valeurs sont les vôtres.

| Variable | Utilité | Où la trouver |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Auth et base de données | Réglages du projet Supabase, section API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Auth et base de données | Même page |
| `TMDB_TOKEN` | Recherche et détails des films | Compte TMDB, section API, **Jeton d'accès en lecture à l'API (v4)** |
| `WATCHMODE_API_KEY` | Liens de streaming | Tableau de bord Watchmode |

Sans `TMDB_TOKEN`, la recherche ne renvoie rien. Sans `WATCHMODE_API_KEY`, la modale du film ne se charge pas. Ne committez jamais `.env.local`.

### Base de données

1. **Création du projet** : créez un projet sur [Supabase](https://supabase.com/).
2. **Schéma SQL** : copiez le contenu de [docs/database_schema.sql](./docs/database_schema.sql) et exécutez-le dans le **SQL Editor** de Supabase.
3. **À noter** : le fichier contient le premier schéma (`profiles`, `squads`, `watchlists`...) et `user_media`. L'application lit et écrit uniquement `user_media`.

### Autres commandes

```bash
npm run lint    # ESLint
npm test        # Vitest, une seule exécution
npm run build   # Build de production
npm start       # Sert le build de production
```

## Auteur

Valentin Périès ([@Rateur](https://github.com/Rateur)). Publié sous [licence MIT](./LICENSE). Voir [CONTRIBUTING.md](./CONTRIBUTING.md) pour contribuer.
