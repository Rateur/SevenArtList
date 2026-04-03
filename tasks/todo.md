# PLAN D'EXÉCUTION TECHNIQUE - SPRINT 1 : FONDATIONS OPEN SOURCE

## ⚡ RÈGLE RÉCURRENTE : MISE À JOUR DU JOURNAL (ACTION OBLIGATOIRE)
- [ ] Mettre à jour `tasks/lesson.md` à la fin de chaque PHASE (Fiche Incident/Solution).
- [ ] Vérifier la création d'une branche isolée pour chaque nouvelle phase.

## PHASE 1 : INITIALISATION FRONTEND (CLEAN ARCHITECTURE)
- [ ] Initialiser le projet Next.js (App Router, TypeScript, Tailwind).
- [ ] Configurer ESLint et Prettier pour un standard de code strict.
- [ ] Installer et initialiser Shadcn UI (`components.json`).
- [ ] Nettoyer le boilerplate et structurer les dossiers : `components/`, `lib/`, `hooks/`, `types/`.

## PHASE 2 : STANDARDS OPEN SOURCE (DOCUMENTATION)
- [ ] Rédiger le `README.md` (Anglais) et `README.fr.md` (Français) : inclure l'explication du nom "SevenArtList", les badges tech, et la vision Solo/Couple.
- [ ] Créer le fichier `CONTRIBUTING.md` détaillant le processus de fork, création de branche et PR pour les contributeurs.
- [ ] Ajouter la licence Open Source (MIT) dans le fichier `LICENSE`.
- [ ] Créer la structure initiale de `docs/` pour la documentation technique.

## PHASE 3 : INTÉGRATION CONTINUE (CI/CD)
- [ ] Créer le workflow `.github/workflows/ci.yml`.
- [ ] Configurer les jobs pour exécuter ESLint, le formatage Prettier et vérifier le build Next.js à chaque PR vers `main`.

## PHASE 4 : ARCHITECTURE BASE DE DONNÉES (SUPABASE)
- [ ] Définir le schéma SQL de base (Tables : `users`, `squads` pour les couples, `watchlists`, `media_items`).
- [ ] Définir les premières règles RLS (Row Level Security) pour restreindre la lecture aux utilisateurs et à leurs partenaires de squad.
- [ ] Documenter le schéma SQL dans `docs/DATABASE.md`.
- [ ] Connecter Next.js à Supabase via les variables `.env.local` et créer le client Supabase dans `lib/supabase.ts`.
