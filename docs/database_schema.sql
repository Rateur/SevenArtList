-- Database Schema for SevenArtList
-- Sprint 2 - Phase 1: Supabase Infrastructure

-- 1. Profiles (Extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Squads (Groups/Couples)
CREATE TABLE squads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

ALTER TABLE squads ENABLE ROW LEVEL SECURITY;

-- 3. Squad Members (Junction table)
CREATE TABLE squad_members (
  squad_id UUID REFERENCES squads ON DELETE CASCADE,
  user_id UUID REFERENCES profiles ON DELETE CASCADE,
  role TEXT DEFAULT 'member',
  PRIMARY KEY (squad_id, user_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

ALTER TABLE squad_members ENABLE ROW LEVEL SECURITY;

-- 4. Media Items (Cache for TMDB data)
CREATE TABLE media_items (
  tmdb_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('movie', 'series', 'anime')),
  title TEXT NOT NULL,
  poster_path TEXT,
  PRIMARY KEY (tmdb_id, type),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL
);

ALTER TABLE media_items ENABLE ROW LEVEL SECURITY;

-- 5. Watchlists (The core tracking table)
CREATE TABLE watchlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles ON DELETE CASCADE NOT NULL,
  media_tmdb_id TEXT NOT NULL,
  media_type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('plan_to_watch', 'watching', 'completed', 'dropped')),
  rating INTEGER CHECK (rating >= 0 AND rating <= 10),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()) NOT NULL,
  FOREIGN KEY (media_tmdb_id, media_type) REFERENCES media_items (tmdb_id, type)
);

ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- Profiles: Public read, self-update
CREATE POLICY "Profiles are viewable by everyone" ON profiles
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Squads: Visible to members
CREATE POLICY "Squads are viewable by members" ON squads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM squad_members
      WHERE squad_members.squad_id = squads.id
      AND squad_members.user_id = auth.uid()
    )
  );

-- Squad Members: Visible to fellow members
CREATE POLICY "Squad members are viewable by fellow members" ON squad_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM squad_members AS my_memberships
      WHERE my_memberships.squad_id = squad_members.squad_id
      AND my_memberships.user_id = auth.uid()
    )
  );

-- Media Items: Public read
CREATE POLICY "Media items are viewable by everyone" ON media_items
  FOR SELECT USING (TRUE);

-- Watchlists: Own items OR squad member items
CREATE POLICY "Users can view own or squad members' watchlists" ON watchlists
  FOR SELECT USING (
    auth.uid() = user_id
    OR
    EXISTS (
      SELECT 1 FROM squad_members AS me
      JOIN squad_members AS others ON me.squad_id = others.squad_id
      WHERE me.user_id = auth.uid()
      AND others.user_id = watchlists.user_id
    )
  );

CREATE POLICY "Users can insert own watchlist items" ON watchlists
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own watchlist items" ON watchlists
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own watchlist items" ON watchlists
  FOR DELETE USING (auth.uid() = user_id);

-- PHASE 5: User Media (Watchlist)
CREATE TABLE public.user_media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    tmdb_id INTEGER NOT NULL,
    media_type TEXT CHECK (media_type IN ('movie', 'tv')) NOT NULL,
    status TEXT CHECK (status IN ('to_watch', 'in_progress', 'completed', 'dropped')) DEFAULT 'to_watch',
    rating INTEGER CHECK (rating >= 0 AND rating <= 100),
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, tmdb_id, media_type)
);

ALTER TABLE public.user_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own media items" 
ON public.user_media 
FOR ALL 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);
