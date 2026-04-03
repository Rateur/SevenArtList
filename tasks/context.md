# CONTEXTE MÉTIER : SEVENARTLIST

## OBJECTIF
Application web Open Source de suivi de visionnage (Films, Séries, Animes) centralisée. Conçue pour un usage Solo ou Couple avec synchronisation en temps réel, gamification (statistiques croisées, pourcentage de complétion des marathons) et interface premium.

## DOMAINE DE DONNÉES (DATA)
- Médias : Films et Séries via l'API TMDB (Affiches, synopsis, durées). Animes via l'API AniList (GraphQL).
- Métriques utilisateurs : Watchlists partagées, temps de visionnage total, état d'avancement des sagas. Données relationnelles entre les comptes (Système de "Squad"/Liaison).

## ARCHITECTURE CIBLE
- Backend & Base de données : Supabase (PostgreSQL, Auth, Realtime pour la synchro en couple).
- Frontend : Next.js 14+ (App Router).
- Interface (UI) : Tailwind CSS et composants Shadcn UI.
- Hébergement & CI/CD : Netlify (déploiement) et GitHub Actions (tests et linter).
- Langues du projet : Application en Français/Anglais. Documentation stricte bilingue (FR/EN) pour l'Open Source.
