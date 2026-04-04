import Image from "next/image";
import { TMDBMovie } from "@/lib/services/tmdb";
import { Card, CardContent } from "@/components/ui/card";
import { getPosterUrl } from "@/lib/services/tmdb";

interface MovieCardProps {
  movie: TMDBMovie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <Card className="overflow-hidden border-zinc-200 transition-all hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600 bg-white dark:bg-zinc-950">
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {movie.poster_path ? (
          <Image
            src={getPosterUrl(movie.poster_path, "w500")}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-100 p-4 text-center dark:bg-zinc-900">
            <span className="text-sm font-medium text-zinc-500">Pas d&apos;affiche</span>
            <span className="mt-2 text-xs text-zinc-400">{movie.title}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {movie.title}
        </h3>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {releaseYear}
        </p>
      </CardContent>
    </Card>
  );
}

export function MovieCardSkeleton() {
  return (
    <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 animate-pulse">
      <div className="aspect-[2/3] w-full bg-zinc-100 dark:bg-zinc-900" />
      <CardContent className="p-4">
        <div className="h-4 w-3/4 rounded bg-zinc-100 dark:bg-zinc-900" />
        <div className="mt-2 h-3 w-1/4 rounded bg-zinc-100 dark:bg-zinc-900" />
      </CardContent>
    </Card>
  );
}
