import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  // We log this only in development to help with setup
  if (process.env.NODE_ENV === 'development') {
    console.warn('Supabase environment variables are missing. Please check your .env file.');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
