/**
 * Watchmode API Source Interface
 * Ref: https://api.watchmode.com/docs/#title-sources
 */
export interface WatchmodeSource {
  source_id: number;
  name: string;
  type: "sub" | "rent" | "buy" | "free";
  region: string;
  ios_url: string | null;
  android_url: string | null;
  web_url: string;
  format: string;
  price: number | null;
  seasons: number | null;
  episodes: number | null;
}

export interface WatchmodeSourcesResponse {
  sources: WatchmodeSource[];
}

const WATCHMODE_BASE_URL = "https://api.watchmode.com/v1";

/**
 * Fetches direct streaming and VOD sources from Watchmode.
 */
export async function getWatchmodeSources(
  tmdbId: number,
  type: "movie" | "tv" = "movie"
): Promise<WatchmodeSource[]> {
  const apiKey = process.env.WATCHMODE_API_KEY;

  if (!apiKey) {
    throw new Error("WATCHMODE_API_KEY is not defined in environment variables");
  }

  // Watchmode title ID format: movie-TMDB_ID or tv-TMDB_ID
  const titleId = `${type}-${tmdbId}`;
  const url = `${WATCHMODE_BASE_URL}/title/${titleId}/sources/?apiKey=${apiKey}&regions=FR`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 86400 }, // Cache results for 24 hours
    });

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      const errorBody = await response.text();
      throw new Error(`Watchmode API error: ${response.status} - ${errorBody}`);
    }

    const data: WatchmodeSource[] = await response.json();

    /**
     * Deduplication Logic:
     * The API may return multiple entries for different qualities (4K, HD) or formats.
     * We filter to keep only unique platforms by source_id, prioritizing better types (sub > free > rent > buy) 
     * and ensuring we have a valid web_url.
     */
    const uniqueSourcesMap = new Map<number, WatchmodeSource>();

    // Sort by priority before deduplicating: sub/free > rent/buy
    const sortedSources = [...data].sort((a, b) => {
      const priorityOrder = { sub: 1, free: 1, rent: 2, buy: 3 };
      return (priorityOrder[a.type] || 9) - (priorityOrder[b.type] || 9);
    });

    for (const source of sortedSources) {
      if (!uniqueSourcesMap.has(source.source_id)) {
        uniqueSourcesMap.set(source.source_id, source);
      }
    }

    return Array.from(uniqueSourcesMap.values());
  } catch (error) {
    console.error(`Error fetching Watchmode sources for ${type} ${tmdbId}:`, error);
    return [];
  }
}
