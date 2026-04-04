"use server";

import { getMovieDetails, getMovieProviders, MovieDetails } from "@/lib/services/tmdb";

/**
 * Server action to fetch movie details securely, including watch providers.
 * @param id - The TMDB movie ID.
 * @returns - The detailed movie information with provider data.
 */
export async function getMovieDetailsAction(id: number): Promise<MovieDetails> {
  try {
    const [details, providers] = await Promise.all([
      getMovieDetails(id),
      getMovieProviders(id)
    ]);

    return {
      ...details,
      watchProviders: providers || undefined
    };
  } catch (error) {
    console.error("Get Movie Details Action Error:", error);
    throw new Error("Failed to fetch movie details. Please try again later.");
  }
}
