"use client";

import * as React from "react";
import Image from "next/image";
import { Star, Clock, Calendar, Users, Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MovieDetails, 
  getPosterUrl, 
  getBackdropUrl 
} from "@/lib/services/tmdb";
import { getMovieDetailsAction } from "@/app/actions/movie";

interface MovieDetailsDialogProps {
  movieId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MovieDetailsDialog({ 
  movieId, 
  open, 
  onOpenChange 
}: MovieDetailsDialogProps) {
  const [movie, setMovie] = React.useState<MovieDetails | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (open && movieId) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const details = await getMovieDetailsAction(movieId);
          setMovie(details);
        } catch (error) {
          console.error("Failed to fetch movie details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    } else if (!open) {
      // Clear movie data when dialog closes to avoid flash of old data
      setMovie(null);
    }
  }, [open, movieId]);

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const releaseYear = movie?.release_date 
    ? new Date(movie.release_date).getFullYear() 
    : "N/A";

  const cast = movie?.credits?.cast.slice(0, 5) || [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl overflow-hidden p-0 bg-zinc-950 border-zinc-800 text-zinc-100">
        <div className="relative">
          {/* Backdrop Section */}
          <div className="relative h-[250px] sm:h-[400px] w-full overflow-hidden">
            {loading ? (
              <Skeleton className="h-full w-full bg-zinc-900" />
            ) : movie?.backdrop_path ? (
              <>
                <Image
                  src={getBackdropUrl(movie.backdrop_path, "original")}
                  alt={movie.title}
                  fill
                  className="object-cover opacity-60"
                  priority
                />
                {/* Immersive Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              </>
            ) : (
              <div className="h-full w-full bg-zinc-900" />
            )}
          </div>

          {/* Content Over Backdrop */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-end sm:items-start">
              {/* Poster */}
              <div className="relative hidden sm:block w-40 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl border border-zinc-800 flex-shrink-0">
                {loading ? (
                  <Skeleton className="h-full w-full bg-zinc-800" />
                ) : (
                  <Image
                    src={getPosterUrl(movie?.poster_path || null, "w500")}
                    alt={movie?.title || "Poster"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Main Info */}
              <div className="flex-1 space-y-2">
                {loading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-3/4 bg-zinc-800" />
                    <div className="flex gap-4">
                      <Skeleton className="h-5 w-20 bg-zinc-800" />
                      <Skeleton className="h-5 w-20 bg-zinc-800" />
                      <Skeleton className="h-5 w-20 bg-zinc-800" />
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-tight text-white line-clamp-2">
                      {movie?.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        <span>{releaseYear}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{formatRuntime(movie?.runtime || null)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-yellow-500/90">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{movie?.vote_average?.toFixed(1)} / 10</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {movie?.genres.map((genre) => (
                        <Badge 
                          key={genre.id} 
                          variant="secondary" 
                          className="bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 border-none"
                        >
                          {genre.name}
                        </Badge>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[50vh]">
          {/* Synopsis */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-zinc-200 border-l-4 border-zinc-700 pl-3">
              Synopsis
            </h3>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-zinc-900" />
                <Skeleton className="h-4 w-full bg-zinc-900" />
                <Skeleton className="h-4 w-2/3 bg-zinc-900" />
              </div>
            ) : (
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                {movie?.overview || "Aucun synopsis disponible."}
              </p>
            )}
          </div>

          {/* Casting */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-zinc-200 border-l-4 border-zinc-700 pl-3 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Casting
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="aspect-square rounded-full bg-zinc-900 mx-auto" />
                    <Skeleton className="h-3 w-3/4 mx-auto bg-zinc-900" />
                  </div>
                ))
              ) : cast.length > 0 ? (
                cast.map((actor) => (
                  <div key={actor.id} className="text-center group">
                    <div className="relative aspect-square rounded-full overflow-hidden mb-2 border-2 border-zinc-800 group-hover:border-zinc-600 transition-colors bg-zinc-900">
                      {actor.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-zinc-600">
                          <Users className="h-8 w-8" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-zinc-200 line-clamp-1">{actor.name}</p>
                    <p className="text-[10px] text-zinc-500 line-clamp-1">{actor.character}</p>
                  </div>
                ))
              ) : (
                <p className="text-zinc-500 text-sm col-span-full italic">Information indisponible.</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex justify-end">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto h-12 px-8 border-zinc-800 hover:bg-zinc-800 text-zinc-300 gap-2 text-base font-medium"
            >
              <Plus className="h-5 w-5" />
              Ajouter à ma liste
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
