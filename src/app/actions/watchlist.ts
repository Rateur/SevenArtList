"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Toggles a media item's presence in the user's watchlist.
 * If it exists, it is removed. If not, it is added with 'to_watch' status.
 */
export async function toggleWatchlistAction(tmdbId: number, mediaType: 'movie' | 'tv') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Vous devez être connecté pour gérer votre liste.");
  }

  // Check if the media is already in the list
  const { data: existing, error: fetchError } = await supabase
    .from('user_media')
    .select('id')
    .eq('user_id', user.id)
    .eq('tmdb_id', tmdbId)
    .eq('media_type', mediaType)
    .maybeSingle();

  if (fetchError) {
    console.error("Error fetching watchlist status:", fetchError);
    throw new Error("Erreur lors de la vérification de la liste.");
  }

  if (existing) {
    // If it exists, remove it
    const { error: deleteError } = await supabase
      .from('user_media')
      .delete()
      .eq('id', existing.id);

    if (deleteError) {
      console.error("Error removing from watchlist:", deleteError);
      throw new Error("Erreur lors de la suppression de la liste.");
    }
    return { status: 'removed' };
  } else {
    // If it doesn't exist, insert it
    const { error: insertError } = await supabase
      .from('user_media')
      .insert({
        user_id: user.id,
        tmdb_id: tmdbId,
        media_type: mediaType,
        status: 'to_watch'
      });

    if (insertError) {
      console.error("Error adding to watchlist:", insertError);
      throw new Error("Erreur lors de l'ajout à la liste.");
    }
    return { status: 'added' };
  }
}

/**
 * Checks if a specific media item is in the user's watchlist.
 */
export async function checkWatchlistStatusAction(tmdbId: number, mediaType: 'movie' | 'tv') {
  const supabase = await createClient();
  
  // We use getSession first to be faster/lighter if not logged in
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  const { data, error } = await supabase
    .from('user_media')
    .select('id')
    .eq('user_id', user.id)
    .eq('tmdb_id', tmdbId)
    .eq('media_type', mediaType)
    .maybeSingle();

  if (error) {
    console.error("Error checking watchlist status:", error);
    return false;
  }

  return !!data;
}
