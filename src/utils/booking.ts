import { BookingFormState, SalonService, ServiceCategory } from '../types/salon';

export interface BookingValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof BookingFormState, string>>;
}

/**
 * Validates the appointment booking form fields.
 */
export function validateBookingForm(state: BookingFormState): BookingValidationResult {
  const errors: Partial<Record<keyof BookingFormState, string>> = {};

  if (!state.customerName || state.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name (minimum 2 characters).';
  }

  const phoneDigits = (state.phoneNumber || '').replace(/\D/g, '');
  if (!phoneDigits || phoneDigits.length < 8) {
    errors.phoneNumber = 'Please enter a valid phone number (at least 8 digits).';
  }

  if (!state.selectedService || state.selectedService.trim() === '') {
    errors.selectedService = 'Please select a salon service.';
  }

  if (!state.preferredDate) {
    errors.preferredDate = 'Please choose a preferred appointment date.';
  } else {
    // Check if selected date is in the past
    const selected = new Date(state.preferredDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      errors.preferredDate = 'Please select today or a future date.';
    }
  }

  if (!state.preferredTime) {
    errors.preferredTime = 'Please select a convenient time slot.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Generates an elegant alphanumeric booking reference code.
 */
export function generateBookingReference(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomStr = '';
  for (let i = 0; i < 4; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SH-${randomStr}`;
}

/**
 * Builds a direct WhatsApp chat URL with pre-filled, cleanly formatted appointment details.
 */
export function buildWhatsAppBookingUrl(
  whatsappNumber: string,
  state: BookingFormState,
  referenceId?: string
): string {
  // Strip non-numeric characters except leading +
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const lines = [
    '✨ *Appointment Request – Make Your Style Salon*',
    referenceId ? `Ref: ${referenceId}` : '',
    '',
    `• *Client Name:* ${state.customerName.trim()}`,
    `• *Phone:* ${state.phoneNumber.trim()}`,
    state.email ? `• *Email:* ${state.email.trim()}` : '',
    `• *Service:* ${state.selectedService}`,
    `• *Preferred Date:* ${state.preferredDate}`,
    `• *Preferred Time:* ${state.preferredTime}`,
    state.stylistPreference ? `• *Stylist:* ${state.stylistPreference}` : '',
    state.notes ? `• *Notes / Requests:* ${state.notes.trim()}` : '',
    '',
    'Kindly confirm slot availability. Thank you!'
  ].filter(line => line !== '');

  const message = lines.join('\n');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Filters a list of salon services by category and optional search query.
 */
export function filterServices(
  services: SalonService[],
  category: ServiceCategory,
  query: string = ''
): SalonService[] {
  const trimmed = query.trim().toLowerCase();

  return services.filter(service => {
    const matchesCategory = category === 'all' || service.category === category;
    const matchesQuery = !trimmed ||
      service.name.toLowerCase().includes(trimmed) ||
      service.description.toLowerCase().includes(trimmed) ||
      service.highlights.some(h => h.toLowerCase().includes(trimmed));

    return matchesCategory && matchesQuery;
  });
}

/**
 * Creates an .ics calendar file data URI for the booked appointment.
 */
export function generateCalendarIcs(
  state: BookingFormState,
  salonName: string = 'Make Your Style Salon',
  address: string = 'Suite 402, High Street Boulevard'
): string {
  const dateFormatted = state.preferredDate.replace(/-/g, '');
  const [hourStr, minuteAndPeriod] = (state.preferredTime || '10:00 AM').split(':');
  const [minuteStr, period] = minuteAndPeriod.split(' ');
  let hour = parseInt(hourStr, 10);
  if (period === 'PM' && hour < 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  const startHourStr = hour.toString().padStart(2, '0');
  const endHourStr = (hour + 1).toString().padStart(2, '0');
  const minClean = (minuteStr || '00').padStart(2, '0');

  const startDateTime = `${dateFormatted}T${startHourStr}${minClean}00`;
  const endDateTime = `${dateFormatted}T${endHourStr}${minClean}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Make Your Style Salon//Appointment Scheduler//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:Make Your Style Salon – ${state.selectedService}`,
    `DESCRIPTION:Appointment for ${state.customerName} (${state.selectedService}). Stylist: ${state.stylistPreference || 'Senior Stylist'}.`,
    `LOCATION:${salonName}, ${address}`,
    `DTSTART:${startDateTime}`,
    `DTEND:${endDateTime}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;
}
