# DIRECTIVES D'ARCHITECTURE ET D'APPRENTISSAGE (SEVENARTLIST)

## WORKFLOW IMPÉRATIF (RÈGLES D'OR OPEN SOURCE)
0. Lire `tasks/context.md` — assimiler le domaine métier et l'architecture avant toute décision.
1. Planification dans `tasks/todo.md` exigée avant la production de toute fonctionnalité.
2. **BRANCHING STRICT :** Interdiction absolue de commit ou de merge directement sur la branche `main`. Pour chaque tâche, créer une branche dédiée (ex: `feat/tmdb-integration`, `fix/navbar-mobile`). Seul l'humain valide les Pull Requests.
3. Exécution systématique du linter, de Prettier et du build de test dans la sandbox du terminal avant de terminer une tâche.
4. Enregistrement de chaque résolution d'erreur critique dans ce fichier sous le format : `[Date] | cause racine | règle de prévention`.
5. Versioning : Exécution de commits atomiques. Respect strict de la convention Conventional Commits en anglais (ex: `feat(auth): implement Supabase dual account link`).
6. MISE À JOUR CONTINUE : À la fin de chaque tâche majeure ou avant chaque demande de merge, le `README.md` et la documentation technique doivent obligatoirement être mis à jour pour refléter les nouvelles fonctionnalités ou changements d'architecture.

## STANDARDS TECHNIQUES
- Stack Frontend : Next.js App Router (`/app`). Les Server Components sont la norme par défaut. Le code client (directive `use client`) est restreint aux interactions utilisateur strictes.
- UI/UX : Tailwind CSS exclusif. Pas de fichiers CSS externes hors configuration globale. Utilisation modulaire de Shadcn UI.
- Typage : TypeScript strict obligatoire. Pas de type `any`. Typer rigoureusement les retours des APIs externes (TMDB, AniList).
- Backend : Utilisation du client Supabase (`@supabase/supabase-js`). La sécurité des données (qui voit quoi) doit être gérée via les règles RLS (Row Level Security) directement sur PostgreSQL.
- Zéro Emoji : L'utilisation d'emojis est strictement interdite dans le code, les commits, le journal de bord et la documentation. Utiliser exclusivement des icônes professionnelles (ex: Lucide Icons pour l'UI, ou des badges/SVG pour la documentation).

## RETOUR D'EXPÉRIENCE (LOGS)
- [03/04/2026] | Initialisation des règles | Toujours vérifier que la branche active n'est pas `main` via `git branch --show-current` avant de coder.
