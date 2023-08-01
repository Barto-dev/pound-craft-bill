import type { SupabaseClient, Session } from '@supabase/supabase-js'
import type { Database } from './types/supabase';

declare global {
  namespace App {
    interface Locals {
      supabase: SupabaseClient<Database>
      getSession(): Promise<Session | null>
    }
    interface PageData {
      session: Session | null
    }
    // interface Error {}
    // interface Platform {}
  }

  namespace svelteHtml {
    interface HTMLAttributes<T> {
      'on:outofview'?: (event) => void;
    }
  }
}
