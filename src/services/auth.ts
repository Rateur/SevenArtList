import { supabase } from '@/lib/supabase';

/**
 * Service to handle authentication and session related operations.
 */
export const authService = {
  /**
   * Retrieves the current user session.
   * Currently placeholder as per initial setup.
   */
  async getSession() {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      return data.session;
    } catch (err) {
      console.error('Error fetching session:', err);
      return null;
    }
  },
};
