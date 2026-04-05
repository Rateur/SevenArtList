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
