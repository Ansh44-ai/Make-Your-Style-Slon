import { getSupabase } from '../lib/supabase';
import { BookingFormState } from '../types/salon';

export interface SupabaseAppointmentPayload {
  reference_id: string;
  customer_name: string;
  phone_number: string;
  email?: string | null;
  selected_service: string;
  preferred_date: string;
  preferred_time: string;
  stylist_preference?: string | null;
  notes?: string | null;
  status: string;
  created_at: string;
}

export interface SaveAppointmentResult {
  success: boolean;
  synced: boolean;
  referenceId: string;
  error?: string;
  code?: string;
}

const LOCAL_STORAGE_KEY = 'mys_salon_appointments';

export const SUPABASE_SETUP_SQL = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/jkzugoutudqqgxersobh/sql)
CREATE TABLE IF NOT EXISTS public.appointments (
  id BIGSERIAL PRIMARY KEY,
  reference_id TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  selected_service TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  stylist_preference TEXT,
  notes TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous reservation submissions
CREATE POLICY "Allow public booking inserts"
ON public.appointments
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow public read access
CREATE POLICY "Allow public read access"
ON public.appointments
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow status updates
CREATE POLICY "Allow public updates"
ON public.appointments
FOR UPDATE
TO anon, authenticated
USING (true);
`;

/**
 * Saves appointment details locally in browser storage as an immediate, reliable fallback.
 */
function saveToLocalStorage(payload: SupabaseAppointmentPayload) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const existingRaw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const list: SupabaseAppointmentPayload[] = existingRaw ? JSON.parse(existingRaw) : [];
    // Prevent duplicate reference IDs
    const filtered = list.filter((item) => item.reference_id !== payload.reference_id);
    filtered.unshift(payload);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered.slice(0, 50)));
  } catch (err) {
    console.warn('Could not cache appointment to localStorage:', err);
  }
}

/**
 * Gets cached appointments from local storage.
 */
export function getLocalCachedAppointments(): SupabaseAppointmentPayload[] {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Updates an appointment's status in local storage.
 */
function updateInLocalStorage(referenceId: string, status: string) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    const existingRaw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!existingRaw) return;
    const list: SupabaseAppointmentPayload[] = JSON.parse(existingRaw);
    const updated = list.map((item) => (item.reference_id === referenceId ? { ...item, status } : item));
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not update appointment in localStorage:', err);
  }
}

/**
 * Saves reservation details to the user's Supabase database.
 * Falls back safely to client caching if the database table is pending setup in the dashboard.
 */
export async function saveAppointmentToSupabase(
  state: BookingFormState,
  referenceId: string
): Promise<SaveAppointmentResult> {
  const payload: SupabaseAppointmentPayload = {
    reference_id: referenceId,
    customer_name: state.customerName.trim(),
    phone_number: state.phoneNumber.trim(),
    email: state.email ? state.email.trim() : null,
    selected_service: state.selectedService,
    preferred_date: state.preferredDate,
    preferred_time: state.preferredTime,
    stylist_preference: state.stylistPreference || 'Any Senior Stylist',
    notes: state.notes ? state.notes.trim() : null,
    status: 'confirmed',
    created_at: new Date().toISOString(),
  };

  // Always back up locally first so the appointment is never lost
  saveToLocalStorage(payload);

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('appointments').insert([payload]);

    if (error) {
      console.warn('Supabase insert note:', error.message, error.code);
      return {
        success: true, // The booking succeeded for the customer
        synced: false,
        referenceId,
        error: error.message,
        code: error.code,
      };
    }

    return {
      success: true,
      synced: true,
      referenceId,
    };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Network error';
    console.error('Error saving appointment to Supabase:', err);
    return {
      success: true,
      synced: false,
      referenceId,
      error: errorMessage,
    };
  }
}

/**
 * Fetches all appointments from Supabase, seamlessly falling back or merging with local cache.
 */
export async function fetchAppointmentsFromSupabase(): Promise<{
  appointments: SupabaseAppointmentPayload[];
  isFromSupabase: boolean;
  error?: string;
}> {
  const localList = getLocalCachedAppointments();

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return {
        appointments: localList,
        isFromSupabase: false,
        error: error.message,
      };
    }

    if (data && Array.isArray(data)) {
      // Also cache fetched appointments locally for offline access
      data.forEach((row) => saveToLocalStorage(row as SupabaseAppointmentPayload));
      return {
        appointments: data as SupabaseAppointmentPayload[],
        isFromSupabase: true,
      };
    }

    return {
      appointments: localList,
      isFromSupabase: true,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Fetch failed';
    return {
      appointments: localList,
      isFromSupabase: false,
      error: message,
    };
  }
}

/**
 * Looks up a specific appointment by reference ID or phone number.
 */
export async function lookupAppointment(
  query: string
): Promise<{ appointment: SupabaseAppointmentPayload | null; foundInSupabase: boolean }> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return { appointment: null, foundInSupabase: false };

  // Try Supabase first
  try {
    const supabase = getSupabase();
    const isReference = cleanQuery.toUpperCase().startsWith('MYS-') || cleanQuery.length >= 8;

    let filterBuilder = supabase.from('appointments').select('*');
    if (isReference) {
      filterBuilder = filterBuilder.eq('reference_id', cleanQuery.toUpperCase());
    } else {
      filterBuilder = filterBuilder.ilike('phone_number', `%${cleanQuery}%`);
    }

    const { data, error } = await filterBuilder.limit(1);

    if (!error && data && data.length > 0) {
      return {
        appointment: data[0] as SupabaseAppointmentPayload,
        foundInSupabase: true,
      };
    }
  } catch (err) {
    console.warn('Supabase lookup note:', err);
  }

  // Fall back to local storage
  const localList = getLocalCachedAppointments();
  const match = localList.find(
    (item) =>
      item.reference_id.toLowerCase() === cleanQuery.toLowerCase() ||
      item.phone_number.includes(cleanQuery)
  );

  return {
    appointment: match || null,
    foundInSupabase: false,
  };
}

/**
 * Updates status of an appointment (e.g., 'confirmed', 'completed', 'cancelled').
 */
export async function updateAppointmentStatus(
  referenceId: string,
  newStatus: string
): Promise<{ success: boolean; synced: boolean }> {
  updateInLocalStorage(referenceId, newStatus);

  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('reference_id', referenceId);

    if (!error) {
      return { success: true, synced: true };
    }
    return { success: true, synced: false };
  } catch {
    return { success: true, synced: false };
  }
}

/**
 * Tests connection to the user's Supabase project.
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  tableExists: boolean;
  message: string;
}> {
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from('appointments').select('id').limit(1);

    if (!error) {
      return {
        connected: true,
        tableExists: true,
        message: 'Connected to Supabase. appointments table is active.',
      };
    }

    if (error.code === 'PGRST205') {
      return {
        connected: true,
        tableExists: false,
        message: 'Connected to Supabase project, but public.appointments table has not been created yet.',
      };
    }

    return {
      connected: true,
      tableExists: false,
      message: `Supabase responded: ${error.message}`,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      tableExists: false,
      message: `Failed to connect: ${msg}`,
    };
  }
}

