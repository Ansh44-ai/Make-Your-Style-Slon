import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Phone,
  User,
  MessageSquare,
  CheckCircle2,
  CalendarPlus,
  Settings2,
  AlertCircle
} from 'lucide-react';
import { BookingFormState, SalonContactInfo } from '../types/salon';
import { SALON_SERVICES, TIME_SLOTS, STYLIST_OPTIONS } from '../data/salonData';
import {
  validateBookingForm,
  generateBookingReference,
  buildWhatsAppBookingUrl,
  generateCalendarIcs
} from '../utils/booking';
import {
  saveAppointmentToSupabase
} from '../services/supabaseAppointmentService';

interface BookingSectionProps {
  contact: SalonContactInfo;
  onUpdateContact: (newContact: Partial<SalonContactInfo>) => void;
  selectedServicePreload?: string;
  onOpenAppointmentsDesk?: () => void;
  onOpenTrackBooking?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  contact,
  onUpdateContact,
  selectedServicePreload
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formState, setFormState] = useState<BookingFormState>({
    customerName: '',
    phoneNumber: '',
    email: '',
    selectedService: selectedServicePreload || SALON_SERVICES[0].name,
    preferredDate: todayStr,
    preferredTime: '11:30 AM',
    notes: '',
    stylistPreference: STYLIST_OPTIONS[0]
  });

  useEffect(() => {
    if (selectedServicePreload) {
      setFormState((prev) => ({ ...prev, selectedService: selectedServicePreload }));
    }
  }, [selectedServicePreload]);

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormState, string>>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<{
    referenceId: string;
    state: BookingFormState;
    synced: boolean;
    error?: string;
  } | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editableWhatsApp, setEditableWhatsApp] = useState(contact.whatsapp);
  const [editablePhone, setEditablePhone] = useState(contact.phone);

  const handleInputChange = (field: keyof BookingFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm(formState);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSaving(true);
    const ref = generateBookingReference();

    // Persist to Supabase and local cache
    const saveResult = await saveAppointmentToSupabase(formState, ref);

    setIsSaving(false);
    setConfirmedBooking({
      referenceId: ref,
      state: { ...formState },
      synced: saveResult.synced,
      error: saveResult.error
    });
  };

  const handleBookViaWhatsApp = async () => {
    const validation = validateBookingForm(formState);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSaving(true);
    const ref = generateBookingReference();

    // Save to Supabase as well
    await saveAppointmentToSupabase(formState, ref);
    setIsSaving(false);

    const url = buildWhatsAppBookingUrl(contact.whatsapp, formState, ref);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSaveContactConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContact({
      whatsapp: editableWhatsApp.trim(),
      phone: editablePhone.trim()
    });
    setIsEditingContact(false);
  };

  return (
    <section id="booking" className="py-24 sm:py-32 bg-[#12110F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium">
              Appointments &amp; Inquiries
            </span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#FAF8F5] tracking-tight mb-4 [text-wrap:balance]">
            Reserve Your Hair Sanctuary Session
          </h2>
          <p className="text-sm sm:text-base text-[#9E9584] leading-relaxed font-light max-w-xl mx-auto">
            Reserve your appointment with our master stylists or connect directly with our salon concierge via WhatsApp.
          </p>
        </div>

        {/* Confirmed Booking View */}
        {confirmedBooking ? (
          <div className="max-w-2xl mx-auto bg-[#161513] border border-[#2F2A21] p-8 sm:p-12 rounded-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[#C5A059] mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                Appointment Requested
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#FAF8F5] mt-1 mb-2">
                We Look Forward to Welcoming You
              </h3>
              <p className="text-xs sm:text-sm text-[#9E9584] font-light">
                Your reservation reference is generated below. Our salon desk has received your request.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#1A1815] border border-[#2B2720] p-6 rounded-sm space-y-3.5 mb-8 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-[#26221C]">
                <span className="text-[#807768] uppercase tracking-wider text-xs font-mono">Reference Code</span>
                <span className="text-[#C5A059] font-mono font-bold tracking-wider">{confirmedBooking.referenceId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#807768] text-xs">Guest Name</span>
                <span className="text-[#FAF8F5] font-medium">{confirmedBooking.state.customerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#807768] text-xs">Treatment</span>
                <span className="text-[#FAF8F5] font-medium">{confirmedBooking.state.selectedService}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#807768] text-xs">Date &amp; Time</span>
                <span className="text-[#C5A059] font-medium font-mono text-xs">
                  {confirmedBooking.state.preferredDate} at {confirmedBooking.state.preferredTime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#807768] text-xs">Stylist Choice</span>
                <span className="text-[#FAF8F5] text-xs">{confirmedBooking.state.stylistPreference}</span>
              </div>
              {confirmedBooking.state.notes && (
                <div className="pt-2 border-t border-[#26221C]">
                  <span className="text-[#807768] block text-[11px] uppercase tracking-wider mb-1">Hair Notes:</span>
                  <p className="text-xs text-[#CDC5B4] italic font-light">{confirmedBooking.state.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={generateCalendarIcs(confirmedBooking.state, contact.name, contact.address)}
                download={`Make-Your-Style-Appointment-${confirmedBooking.referenceId}.ics`}
                className="flex-1 py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B] bg-[#C5A059] hover:bg-[#D4AF37] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </a>

              <a
                href={buildWhatsAppBookingUrl(contact.whatsapp, confirmedBooking.state, confirmedBooking.referenceId)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-[#25D366] hover:bg-[#20ba5a] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setConfirmedBooking(null)}
                className="text-xs uppercase tracking-wider text-[#8F8677] hover:text-[#FAF8F5] transition-colors cursor-pointer"
              >
                ← Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Main Two-Column Reservation Spread */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left Column: Salon Concierge Guidelines & WhatsApp Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 bg-[#151412] border border-[#26221C] rounded-sm">
                <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium mb-2 block">
                  Concierge Service
                </span>
                <h3 className="text-2xl font-serif font-light text-[#FAF8F5] mb-4">
                  Prefer Booking via WhatsApp?
                </h3>
                <p className="text-sm text-[#9E9584] leading-relaxed mb-6 font-light">
                  Complete your preferred date, time, and service details, then click the green <strong className="text-[#FAF8F5] font-medium">"Book via WhatsApp"</strong> button. We will open WhatsApp with your appointment request pre-filled for immediate front-desk confirmation.
                </p>

                {/* WhatsApp Line Config Box */}
                <div className="p-4 bg-[#1B1A17] border border-[#2D2820] rounded-sm mb-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-[#807768]">Salon WhatsApp Line:</span>
                    <button
                      onClick={() => setIsEditingContact(!isEditingContact)}
                      className="text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer text-xs"
                      title="Edit WhatsApp number"
                    >
                      <Settings2 className="w-3.5 h-3.5" />
                      <span>{isEditingContact ? 'Cancel' : 'Change Number'}</span>
                    </button>
                  </div>
                  
                  {isEditingContact ? (
                    <form onSubmit={handleSaveContactConfig} className="space-y-3 pt-2">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#9E9584] block mb-1">
                          WhatsApp Number (with country code)
                        </label>
                        <input
                          type="text"
                          value={editableWhatsApp}
                          onChange={(e) => setEditableWhatsApp(e.target.value)}
                          placeholder="+919876543210"
                          className="w-full bg-[#12110F] border border-[#332E24] focus:border-[#C5A059] text-xs text-[#FAF8F5] px-3 py-1.5 rounded-sm"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="submit"
                          className="px-3 py-1 bg-[#C5A059] text-[#0D0C0B] text-xs font-semibold uppercase rounded-sm"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center gap-2 text-sm font-mono text-[#FAF8F5]">
                      <MessageSquare className="w-4 h-4 text-[#25D366]" />
                      <span>{contact.whatsapp}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 text-xs text-[#8F8677] font-light">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                    <span>Complimentary diagnostic consultation included with every service</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                    <span>Zero cancellation fees up to 4 hours prior</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                    <span>Private sanitised suites with fresh linen service</span>
                  </div>
                </div>
              </div>

              {/* Direct Call Assistance */}
              <div className="p-6 bg-[#151412] border border-[#26221C] rounded-sm flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-[#FAF8F5]">Prefer to Call?</h4>
                  <p className="text-xs text-[#8F8677] font-light">Speak directly with our concierge desk</p>
                </div>
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#C5A059] border border-[#332E24] hover:border-[#C5A059] rounded-sm flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Right Column: Reservation Form */}
            <div className="lg:col-span-7 bg-[#151412] border border-[#26221C] p-8 sm:p-10 rounded-sm shadow-xl">
              <form onSubmit={handleBookNow} className="space-y-6">
                
                {/* Guest Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#CDC5B4] mb-2 font-medium">
                    Your Full Name <span className="text-[#C5A059]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7A7263] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formState.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="e.g. Shalini Roy"
                      className={`w-full bg-[#1A1916] border ${
                        errors.customerName ? 'border-red-500' : 'border-[#2D2820] focus:border-[#C5A059]'
                      } text-xs sm:text-sm text-[#FAF8F5] pl-10 pr-4 py-3 rounded-sm focus:outline-none transition-colors`}
                    />
                  </div>
                  {errors.customerName && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.customerName}</span>
                    </p>
                  )}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#CDC5B4] mb-2 font-medium">
                      Phone Number <span className="text-[#C5A059]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#7A7263] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={formState.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="+91 98765 43210"
                        className={`w-full bg-[#1A1916] border ${
                          errors.phoneNumber ? 'border-red-500' : 'border-[#2D2820] focus:border-[#C5A059]'
                        } text-xs sm:text-sm text-[#FAF8F5] pl-10 pr-4 py-3 rounded-sm focus:outline-none transition-colors font-mono`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phoneNumber}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#CDC5B4] mb-2 font-medium">
                      Email Address <span className="text-[#7A7263] text-[11px]">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="guest@example.com"
                      className="w-full bg-[#1A1916] border border-[#2D2820] focus:border-[#C5A059] text-xs sm:text-sm text-[#FAF8F5] px-4 py-3 rounded-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#CDC5B4] mb-2 font-medium">
                    Select Treatment <span className="text-[#C5A059]">*</span>
                  </label>
                  <select
                    value={formState.selectedService}
                    onChange={(e) => handleInputChange('selectedService', e.target.value)}
                    className="w-full bg-[#1A1916] border border-[#2D2820] focus:border-[#C5A059] text-xs sm:text-sm text-[#FAF8F5] px-4 py-3 rounded-sm focus:outline-none transition-colors cursor-pointer"
                  >
                    {SALON_SERVICES.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.pricePlaceholder})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date & Stylist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#CDC5B4] mb-2 font-medium">
                      Preferred Date <span className="text-[#C5A059]">*</span>
                    </label>
                    <div className="relative">
                      <CalendarIcon className="w-4 h-4 text-[#7A7263] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        min={todayStr}
                        value={formState.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        className={`w-full bg-[#1A1916] border ${
                          errors.preferredDate ? 'border-red-500' : 'border-[#2D2820] focus:border-[#C5A059]'
                        } text-xs sm:text-sm text-[#FAF8F5] pl-10 pr-4 py-3 rounded-sm focus:outline-none transition-colors font-mono`}
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#CDC5B4] mb-2 font-medium">
                      Stylist Preference
                    </label>
                    <select
                      value={formState.stylistPreference}
                      onChange={(e) => handleInputChange('stylistPreference', e.target.value)}
                      className="w-full bg-[#1A1916] border border-[#2D2820] focus:border-[#C5A059] text-xs sm:text-sm text-[#FAF8F5] px-4 py-3 rounded-sm focus:outline-none transition-colors cursor-pointer"
                    >
                      {STYLIST_OPTIONS.map((stylist) => (
                        <option key={stylist} value={stylist}>
                          {stylist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#CDC5B4] mb-2 font-medium">
                    Preferred Time Slot <span className="text-[#C5A059]">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => handleInputChange('preferredTime', slot)}
                        className={`py-2 px-2 text-xs rounded-sm transition-all text-center cursor-pointer font-mono ${
                          formState.preferredTime === slot
                            ? 'bg-[#C5A059] text-[#0D0C0B] font-bold shadow-sm'
                            : 'bg-[#1D1C19] border border-[#2B2720] text-[#B8AE9D] hover:border-[#C5A059]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.preferredTime && (
                    <p className="text-xs text-red-400 mt-1">{errors.preferredTime}</p>
                  )}
                </div>

                {/* Additional Message / Hair Notes */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#CDC5B4] mb-2 font-medium">
                    Hair History &amp; Styling Vision <span className="text-[#7A7263] text-[11px]">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formState.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Tell us about recent chemical treatments, natural curl pattern, or desired transformation..."
                    className="w-full bg-[#1A1916] border border-[#2D2820] focus:border-[#C5A059] text-xs sm:text-sm text-[#FAF8F5] px-4 py-3 rounded-sm focus:outline-none transition-colors font-light"
                  />
                </div>

                {/* Dual Prominent Actions */}
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#0D0C0B] bg-[#C5A059] hover:bg-[#D4AF37] disabled:opacity-50 transition-all rounded-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>{isSaving ? 'Saving to Supabase...' : 'Confirm Online'}</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={handleBookViaWhatsApp}
                    className="flex-1 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white bg-[#25D366] hover:bg-[#20ba5a] disabled:opacity-50 transition-all rounded-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{isSaving ? 'Securing Slot...' : 'Book via WhatsApp'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-[#787163] text-center pt-2 font-light">
                  🔒 Your details remain strictly confidential and protected.
                </p>

              </form>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
