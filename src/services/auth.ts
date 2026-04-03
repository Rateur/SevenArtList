import { SupabaseClient } from '@supabase/supabase-js'

/**
 * Service to handle authentication and session related operations.
 */
export const authService = {
  /**
   * Signed in with email and password.
   */
  async signInWithEmail(supabase: SupabaseClient, email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  /**
   * Signs up with email and password.
   */
  async signUpWithEmail(supabase: SupabaseClient, email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  /**
   * Signs out the current user.
   */
  async signOut(supabase: SupabaseClient) {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  /**
   * Retrieves the current user session.
   */
  async getSession(supabase: SupabaseClient) {
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      return data.session
    } catch (err) {
      console.error('Error fetching session:', err)
      return null
    }
  },
}
