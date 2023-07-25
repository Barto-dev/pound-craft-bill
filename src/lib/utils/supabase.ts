import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';
import type { Database } from '../../types/supabase';

// Create a single supabase client for interacting with your database
const supabaseUrl = env.PUBLIC_SUPABASE_URL!;
const supabaseKey = env.PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey,
);

export const loadAllInvoices = async () => {
  const { data, error } = await supabase
    .from('invoice')
    .select('*, client(id, name), lineItems(*)',);
  if (error) {
    console.error(error);
    return;
  }
  return data;
};

export type InvoiceType = Database['public']['Tables']['invoice']['Row'];
