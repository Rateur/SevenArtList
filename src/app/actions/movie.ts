"use server";

import { getMovieDetails, MovieDetails } from "@/lib/services/tmdb";
import { getWatchmodeSources, WatchmodeSource } from "@/lib/services/watchmode";

export interface ExtendedMovieDetails extends MovieDetails {
  streamingSources?: WatchmodeSource[];
  vodSources?: WatchmodeSource[];
}

/**
 * Server action to fetch movie details securely, including direct deep links from Watchmode.
 * @param id - The TMDB movie ID.
 * @returns - The detailed movie information with Watchmode source data.
 */
export async function getMovieDetailsAction(id: number): Promise<ExtendedMovieDetails> {
  try {
    const [details, sources] = await Promise.all([
      getMovieDetails(id),
      getWatchmodeSources(id, "movie")
    ]);

    // Categorize sources: streaming (subscription/free) and VOD (rent/buy)
    const streamingSources = sources.filter(s => s.type === "sub" || s.type === "free");
    const vodSources = sources.filter(s => s.type === "rent" || s.type === "buy");

    return {
      ...details,
      streamingSources: streamingSources.length > 0 ? streamingSources : undefined,
      vodSources: vodSources.length > 0 ? vodSources : undefined
    };
  } catch (error) {
    console.error("Get Movie Details Action Error:", error);
    throw new Error("Failed to fetch movie details. Please try again later.");
  }
}
