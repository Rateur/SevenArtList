"use server";

import { getMovieDetails, getMovieProviders, MovieDetails, WatchProvidersData } from "@/lib/services/tmdb";
import { getWatchmodeSources, WatchmodeSource } from "@/lib/services/watchmode";

export interface ExtendedMovieDetails extends MovieDetails {
  streamingSources?: WatchmodeSource[];
  vodSources?: WatchmodeSource[];
  tmdbProviders?: WatchProvidersData;
}

/**
 * Mapping dictionary to handle subtle naming differences between Watchmode and TMDB.
 * Keys are normalized Watchmode names (lowercase, no spaces, no special chars).
 * Values are lists of possible names in TMDB or Watchmode.
 */
export const PROVIDER_NAME_MAPPING: Record<string, string[]> = {
  "primevideo": ["amazon prime video", "amazon video", "prime video"],
  "amazon": ["amazon prime video", "amazon video", "prime video"],
  "appletv": ["apple tv", "apple tv plus", "apple tv+", "apple tv"],
  "max": ["max", "hbo max"],
  "disney": ["disney plus", "disney+"],
};

/**
 * Server action to fetch movie details securely, including direct deep links from Watchmode
 * and platform logos from TMDB.
 * @param id - The TMDB movie ID.
 * @returns - The detailed movie information with merged source data.
 */
export async function getMovieDetailsAction(id: number): Promise<ExtendedMovieDetails> {
  try {
    const [details, sources, tmdbProviders] = await Promise.all([
      getMovieDetails(id),
      getWatchmodeSources(id, "movie"),
      getMovieProviders(id)
    ]);

    // Categorize sources: streaming (subscription/free) and VOD (rent/buy)
    const streamingSources = sources.filter(s => s.type === "sub" || s.type === "free");
    const vodSources = sources.filter(s => s.type === "rent" || s.type === "buy");

    return {
      ...details,
      streamingSources: streamingSources.length > 0 ? streamingSources : undefined,
      vodSources: vodSources.length > 0 ? vodSources : undefined,
      tmdbProviders: tmdbProviders || undefined
    };
  } catch (error) {
    console.error("Get Movie Details Action Error:", error);
    throw new Error("Failed to fetch movie details. Please try again later.");
  }
}
