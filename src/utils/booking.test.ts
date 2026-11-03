import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateBookingForm,
  generateBookingReference,
  buildWhatsAppBookingUrl,
  filterServices
} from './booking.ts';
import { SALON_SERVICES } from '../data/salonData.ts';

test('validateBookingForm detects empty required fields', () => {
  const emptyState = {
    customerName: '',
    phoneNumber: '',
    email: '',
    selectedService: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  };

  const result = validateBookingForm(emptyState);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.customerName);
  assert.ok(result.errors.phoneNumber);
  assert.ok(result.errors.selectedService);
  assert.ok(result.errors.preferredDate);
  assert.ok(result.errors.preferredTime);
});

test('validateBookingForm accepts valid future booking', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 3);
  const dateStr = futureDate.toISOString().split('T')[0];

  const validState = {
    customerName: 'Aarohi Sen',
    phoneNumber: '+91 98765 43210',
    email: 'aarohi@example.com',
    selectedService: 'Keratin Treatment',
    preferredDate: dateStr,
    preferredTime: '11:30 AM',
    notes: 'Sensitive scalp'
  };

  const result = validateBookingForm(validState);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('generateBookingReference creates correct prefix format', () => {
  const ref = generateBookingReference();
  assert.ok(ref.startsWith('SH-'));
  assert.equal(ref.length, 7);
});

test('buildWhatsAppBookingUrl encodes customer details and phone number correctly', () => {
  const state = {
    customerName: 'Priya Kapoor',
    phoneNumber: '+91 99999 88888',
    email: 'priya@example.com',
    selectedService: 'Hair Highlights',
    preferredDate: '2026-11-15',
    preferredTime: '02:00 PM',
    notes: 'Warm honey balayage'
  };

  const url = buildWhatsAppBookingUrl('+91 98765 43210', state, 'SH-9921');
  assert.ok(url.startsWith('https://wa.me/919876543210?text='));
  assert.ok(url.includes('Priya%20Kapoor'));
  assert.ok(url.includes('Hair%20Highlights'));
  assert.ok(url.includes('SH-9921'));
});

test('filterServices filters by category and search keyword', () => {
  const colourServices = filterServices(SALON_SERVICES, 'colour');
  assert.ok(colourServices.length > 0);
  assert.ok(colourServices.every(s => s.category === 'colour'));

  const searched = filterServices(SALON_SERVICES, 'all', 'keratin');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, 'keratin-treatment');
});
