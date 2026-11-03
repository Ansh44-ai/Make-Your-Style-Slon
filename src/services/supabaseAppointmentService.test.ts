import test from 'node:test';
import assert from 'node:assert/strict';
import {
  saveAppointmentToSupabase,
  getLocalCachedAppointments,
  SUPABASE_SETUP_SQL
} from './supabaseAppointmentService.ts';

test('SUPABASE_SETUP_SQL contains required table structure and columns', () => {
  assert.ok(SUPABASE_SETUP_SQL.includes('CREATE TABLE IF NOT EXISTS public.appointments'));
  assert.ok(SUPABASE_SETUP_SQL.includes('reference_id'));
  assert.ok(SUPABASE_SETUP_SQL.includes('customer_name'));
  assert.ok(SUPABASE_SETUP_SQL.includes('phone_number'));
  assert.ok(SUPABASE_SETUP_SQL.includes('selected_service'));
  assert.ok(SUPABASE_SETUP_SQL.includes('preferred_date'));
  assert.ok(SUPABASE_SETUP_SQL.includes('preferred_time'));
  assert.ok(SUPABASE_SETUP_SQL.includes('ROW LEVEL SECURITY'));
});

test('saveAppointmentToSupabase safely handles reservation state and returns referenceId', async () => {
  const dummyState = {
    customerName: 'Samira Rao',
    phoneNumber: '+91 98888 77777',
    email: 'samira@example.com',
    selectedService: 'Keratin Treatment',
    preferredDate: '2026-11-20',
    preferredTime: '03:30 PM',
    stylistPreference: 'Master Stylist Vikram',
    notes: 'Gentle on hairline'
  };

  const result = await saveAppointmentToSupabase(dummyState, 'MYS-8821');
  assert.equal(result.success, true);
  assert.equal(result.referenceId, 'MYS-8821');
});
