import React, { useState } from 'react';
import { Search, Calendar, Clock, Scissors, User, X, CheckCircle2, AlertCircle, Database } from 'lucide-react';
import { lookupAppointment, SupabaseAppointmentPayload } from '../services/supabaseAppointmentService';

interface TrackBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNew: () => void;
}

export const TrackBookingModal: React.FC<TrackBookingModalProps> = ({
  isOpen,
  onClose,
  onBookNew
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    appointment: SupabaseAppointmentPayload | null;
    foundInSupabase: boolean;
  } | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    const lookupResult = await lookupAppointment(query);
    setResult(lookupResult);
    setIsLoading(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-[#14120F] border border-[#2B261F] p-6 sm:p-8 shadow-2xl flex flex-col rounded-none">
        <div className="flex items-center justify-between pb-4 border-b border-[#231F19] mb-5">
          <div className="flex items-center gap-2.5">
            <Search className="w-5 h-5 text-[#C5A059]" />
            <div>
              <h3 className="text-base sm:text-lg font-serif text-[#FAF8F5]">
                Find &amp; Track Reservation
              </h3>
              <p className="text-xs text-[#8F8677]">Make Your Style Salon Concierge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8F8677] hover:text-[#FAF8F5] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSearch} className="mb-6">
          <label className="block text-xs uppercase tracking-wider text-[#A89F8F] mb-2 font-mono">
            Enter Reference ID (e.g. MYS-XXXXXX) or Phone Number:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              required
              placeholder="e.g., MYS-A782K9 or 9876543210"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-[#0E0D0C] border border-[#2B261F] text-[#FAF8F5] text-xs focus:border-[#C5A059] outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] disabled:opacity-50 text-[#0D0C0B] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {isLoading ? 'Checking...' : 'Lookup'}
            </button>
          </div>
        </form>

        {/* Results View */}
        {hasSearched && (
          <div className="animate-in fade-in duration-150">
            {result?.appointment ? (
              <div className="p-4 bg-[#1A1813] border border-[#3D3528] space-y-3">
                <div className="flex items-center justify-between border-b border-[#2A241C] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#C5A059] bg-[#0E0D0C] px-2 py-0.5 border border-[#3D3528]">
                      {result.appointment.reference_id}
                    </span>
                    <span className="text-[10px] text-[#34D399] uppercase font-mono px-2 py-0.5 bg-[#121B14] border border-[#234A29]">
                      {result.appointment.status || 'Confirmed'}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-[#10B981] font-mono">
                    <Database className="w-3 h-3" /> Supabase Verified
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-[#FAF8F5] font-medium">
                    <User className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{result.appointment.customer_name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#CDC5B4]">
                    <Scissors className="w-3.5 h-3.5 text-[#8F8677]" />
                    <span>{result.appointment.selected_service}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#C5A059] font-mono text-xs pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {result.appointment.preferred_date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {result.appointment.preferred_time}
                    </span>
                  </div>
                </div>

                {result.appointment.notes && (
                  <p className="text-[11px] text-[#8F8677] italic pt-1 border-t border-[#2A241C]">
                    "{result.appointment.notes}"
                  </p>
                )}
              </div>
            ) : (
              <div className="p-4 bg-[#1E1414] border border-[#3B1F1F] text-center space-y-1 text-xs text-[#FCA5A5]">
                <AlertCircle className="w-5 h-5 mx-auto text-[#EF4444] mb-1" />
                <p className="font-medium">No reservation found matching "{query}"</p>
                <p className="text-[11px] text-[#A89898]">
                  Please verify your reference ID or phone number.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[#231F19] flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => {
              onClose();
              onBookNew();
            }}
            className="text-[#C5A059] hover:underline"
          >
            + Make a New Appointment
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8F8677] hover:text-[#FAF8F5]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
