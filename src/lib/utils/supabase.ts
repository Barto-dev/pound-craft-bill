import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

// Create a single supabase client for interacting with your database
const supabaseUrl = env.PUBLIC_SUPABASE_URL!;
const supabaseKey = env.PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);
