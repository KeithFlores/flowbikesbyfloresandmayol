import { createClient } from '@supabase/supabase-js';

// These grab the keys you put in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// This creates the "Bridge" to your database
export const supabase = createClient(supabaseUrl, supabaseKey);