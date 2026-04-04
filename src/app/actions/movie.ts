"use server";

import { getMovieDetails, MovieDetails } from "@/lib/services/tmdb";

/**
 * Server action to fetch movie details securely.
 * @param id - The TMDB movie ID.
 * @returns - The detailed movie information.
 */
export async function getMovieDetailsAction(id: number): Promise<MovieDetails> {
  try {
    return await getMovieDetails(id);
  } catch (error) {
    console.error("Get Movie Details Action Error:", error);
    throw new Error("Failed to fetch movie details. Please try again later.");
  }
}
