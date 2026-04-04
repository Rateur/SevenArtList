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
  popularity: number;
}

export interface TMDBSearchResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Standard Filtering Constants
const MIN_POPULARITY = 5;
const MIN_VOTE_COUNT = 10;
const EXCLUDED_GENRES = [99, 10770]; // 99: Documentary, 10770: TV Movie

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
 * Searches for movies on TMDB with robust post-filtering.
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
  const response = await fetchTMDB<TMDBSearchResponse>(
    `/search/movie?query=${encodedQuery}&language=fr-FR&page=${page}&include_adult=false`
  );

  /**
   * Industry Standard Post-Filtering:
   * 1. Must have a poster (Aesthetic guarantee)
   * 2. Exclude Documentaries (99) and TV Movies/Behind the scenes (10770)
   * 3. Must meet a minimum popularity (5) OR vote count (10) threshold
   */
  const filteredResults = response.results.filter((movie) => {
    const hasPoster = movie.poster_path !== null;
    const isExcludedGenre = movie.genre_ids.some((id) => EXCLUDED_GENRES.includes(id));
    const meetsQualityBar = movie.popularity >= MIN_POPULARITY || movie.vote_count >= MIN_VOTE_COUNT;

    return hasPoster && !isExcludedGenre && meetsQualityBar;
  });

  return {
    ...response,
    results: filteredResults,
  };
}

/**
 * Gets the full poster URL for a given path.
 */
export function getPosterUrl(path: string | null, size: "w342" | "w500" | "w780" | "original" = "w500"): string {
  if (!path) return "/placeholder-movie.png"; // We'll need a placeholder later
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
