export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

/**
 * Utility to fetch from TMDB with the Bearer token.
 */
async function fetchTMDB<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = process.env.TMDB_TOKEN;

  if (!token) {
    throw new Error("TMDB_TOKEN is not defined in environment variables");
  }

  const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`TMDB API error: ${response.status} - ${errorBody}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Searches for movies on TMDB.
 */
export async function searchMovies(query: string, page = 1): Promise<TMDBSearchResponse> {
  if (!query) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  const encodedQuery = encodeURIComponent(query);
  return fetchTMDB<TMDBSearchResponse>(
    `/search/movie?query=${encodedQuery}&language=fr-FR&page=${page}&include_adult=false`
  );
}

/**
 * Gets the full poster URL for a given path.
 */
export function getPosterUrl(path: string | null, size: "w342" | "w500" | "w780" | "original" = "w500"): string {
  if (!path) return "/placeholder-movie.png"; // We'll need a placeholder later
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
