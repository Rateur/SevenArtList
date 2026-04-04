import { SearchMovies } from "@/components/search-movies";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="sticky top-0 z-40 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-cinzel font-bold tracking-widest text-zinc-900 dark:text-zinc-50">
              SEVEN ART LIST
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
              Ma Liste
            </button>
            <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
              Profil
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1 px-6 py-12 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <section className="mb-16 text-center">
            <h1 className="text-4xl font-cinzel font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
              Votre bibliothèque personnelle
            </h1>
            <p className="mt-6 text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Recherchez, gérez et partagez vos films préférés. Une expérience minimaliste pour les amateurs du septième art.
            </p>
          </section>

          <SearchMovies />
        </div>
      </main>

      <footer className="border-t border-zinc-100 py-8 px-6 dark:border-zinc-800/50 bg-white dark:bg-black">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-zinc-400 dark:text-zinc-600">
            © 2026 Seven Art List. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-zinc-400">
              Confidentialité
            </a>
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-zinc-400">
              Conditions
            </a>
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-900 dark:text-zinc-600 dark:hover:text-zinc-400">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
