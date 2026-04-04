"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { MovieCard, MovieCardSkeleton } from "@/components/movie-card";
import { searchMoviesAction } from "@/app/actions/search";
import { TMDBMovie } from "@/lib/services/tmdb";
import { Search, Film } from "lucide-react";

export function SearchMovies() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults([]);
      setIsLoading(false);
      setHasSearched(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await searchMoviesAction(searchQuery);
      setResults(response.results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query);
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query, handleSearch]);

  return (
    <div className="w-full space-y-12">
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
        <Input
          type="text"
          placeholder="Rechercher un film (ex: Inception, Avatar...)"
          className="pl-10 h-12 text-lg rounded-xl border-zinc-200 focus:ring-zinc-900 dark:border-zinc-800 dark:focus:ring-zinc-100"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="min-h-[400px]">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : hasSearched ? (
          <div className="flex flex-col items-center justify-center pt-20 text-center animate-in fade-in duration-500">
            <div className="h-20 w-20 rounded-full bg-zinc-50 flex items-center justify-center dark:bg-zinc-900/50 mb-6 border border-zinc-100 dark:border-zinc-800">
              <Search className="h-8 w-8 text-zinc-300" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Aucun résultat trouvé
            </h3>
            <p className="mt-2 text-zinc-500 max-w-xs mx-auto">
              Nous n&apos;avons trouvé aucun film correspondant à &quot;{query}&quot;.
              Essayez avec un autre titre.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-20 text-center animate-in fade-in duration-700">
            <div className="h-24 w-24 rounded-full bg-zinc-50 flex items-center justify-center dark:bg-zinc-900/50 mb-8 border border-zinc-100 dark:border-zinc-800">
              <Film className="h-10 w-10 text-zinc-200 dark:text-zinc-800" />
            </div>
            <h2 className="text-2xl font-cinzel font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Explorez le Septième Art
            </h2>
            <p className="mt-3 text-zinc-500 max-w-md mx-auto leading-relaxed">
              Commencez à taper pour rechercher des films en temps réel et les ajouter à votre liste.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
