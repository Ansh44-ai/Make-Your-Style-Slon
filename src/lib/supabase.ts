import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client configuration using the user's project credentials.
 * Project ID: jkzugoutudqqgxersobh
 * Publishable API Key: sb_publishable_w9Zu8g8LlEKk6rgp_fJzyQ_G0Sq_Vgf
 */
export const SUPABASE_PROJECT_ID = 'jkzugoutudqqgxersobh';
export const SUPABASE_URL =
  (import.meta as { env?: Record<string, string> }).env?.VITE_SUPABASE_URL ||
  `https://${SUPABASE_PROJECT_ID}.supabase.co`;

export const SUPABASE_PUBLISHABLE_KEY =
  (import.meta as { env?: Record<string, string> }).env?.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_w9Zu8g8LlEKk6rgp_fJzyQ_G0Sq_Vgf';

let clientInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!clientInstance) {
    clientInstance = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return clientInstance;
}
