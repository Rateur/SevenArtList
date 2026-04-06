"use server";

import { createClient } from "@/lib/supabase/server";

export type WatchlistStatus = 'to_watch' | 'in_progress' | 'completed' | 'dropped';

/**
 * Inserts or updates a media item in the user's watchlist.
 * @param tmdbId The TMDB ID of the media.
 * @param mediaType The type of media ('movie' or 'tv').
 * @param status The current status (e.g., 'to_watch', 'in_progress').
 * @param rating Optional rating between 0 and 100.
 */
export async function upsertWatchlistItemAction(
  tmdbId: number, 
  mediaType: 'movie' | 'tv', 
  status: WatchlistStatus,
  rating?: number
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Vous devez être connecté pour gérer votre liste.");
  }

  const { error } = await supabase
    .from('user_media')
    .upsert({
      user_id: user.id,
      tmdb_id: tmdbId,
      media_type: mediaType,
      status,
      rating: rating ?? null,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id, tmdb_id, media_type'
    });

  if (error) {
    console.error("Error upserting watchlist item:", error);
    throw new Error("Erreur lors de la mise à jour de votre liste.");
  }

  return { success: true };
}

/**
 * Removes a media item from the user's watchlist.
 */
export async function removeWatchlistItemAction(tmdbId: number, mediaType: 'movie' | 'tv') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Vous devez être connecté pour gérer votre liste.");
  }

  const { error } = await supabase
    .from('user_media')
    .delete()
    .eq('user_id', user.id)
    .eq('tmdb_id', tmdbId)
    .eq('media_type', mediaType);

  if (error) {
    console.error("Error removing from watchlist:", error);
    throw new Error("Erreur lors de la suppression de l'élément.");
  }

  return { success: true };
}

/**
 * Checks if a specific media item is in the user's watchlist and returns its data.
 */
export async function checkWatchlistStatusAction(tmdbId: number, mediaType: 'movie' | 'tv') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('user_media')
    .select('status, rating')
    .eq('user_id', user.id)
    .eq('tmdb_id', tmdbId)
    .eq('media_type', mediaType)
    .maybeSingle();

  if (error) {
    console.error("Error checking watchlist status:", error);
    return null;
  }

  return data;
}

