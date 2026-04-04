"use server";

import { searchMovies, TMDBSearchResponse } from "@/lib/services/tmdb";

/**
 * Server action to search for movies on TMDB securely.
 * @param query - The search query string.
 * @returns - The TMDB search response.
 */
export async function searchMoviesAction(query: string): Promise<TMDBSearchResponse> {
  try {
    if (!query || query.length < 2) {
      return {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      };
    }
    
    return await searchMovies(query);
  } catch (error) {
    console.error("Search Action Error:", error);
    throw new Error("Failed to search movies. Please try again later.");
  }
}
