import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Scissors,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  Download,
  Plus,
  X,
  Database,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import {
  fetchAppointmentsFromSupabase,
  updateAppointmentStatus,
  saveAppointmentToSupabase,
  SupabaseAppointmentPayload
} from '../services/supabaseAppointmentService';
import { SALON_SERVICES } from '../data/salonData';
import { generateBookingReference } from '../utils/booking';

interface AppointmentsDeskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookingForm: () => void;
}

export const AppointmentsDeskModal: React.FC<AppointmentsDeskModalProps> = ({
  isOpen,
  onClose,
  onOpenBookingForm
}) => {
  const [appointments, setAppointments] = useState<SupabaseAppointmentPayload[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFromSupabase, setIsFromSupabase] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isCreatingQuick, setIsCreatingQuick] = useState<boolean>(false);
  const [updatingRef, setUpdatingRef] = useState<string | null>(null);

  // Quick Book Form state
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickService, setQuickService] = useState(SALON_SERVICES[0].name);
  const [quickDate, setQuickDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [quickTime, setQuickTime] = useState('11:00 AM');
  const [quickStylist, setQuickStylist] = useState('Senior Creative Stylist');
  const [quickNotes, setQuickNotes] = useState('');
  const [isSubmittingQuick, setIsSubmittingQuick] = useState(false);

  const loadAppointments = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const res = await fetchAppointmentsFromSupabase();
    setAppointments(res.appointments);
    setIsFromSupabase(res.isFromSupabase);
    if (res.error) {
      setErrorMessage(res.error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadAppointments();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStatusChange = async (refId: string, newStatus: string) => {
    setUpdatingRef(refId);
    await updateAppointmentStatus(refId, newStatus);
    setAppointments((prev) =>
      prev.map((app) => (app.reference_id === refId ? { ...app, status: newStatus } : app))
    );
    setUpdatingRef(null);
  };

  const handleCreateQuickAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim() || !quickPhone.trim()) return;

    setIsSubmittingQuick(true);
    const ref = generateBookingReference();

    const payload = {
      customerName: quickName.trim(),
      phoneNumber: quickPhone.trim(),
      email: '',
      selectedService: quickService,
      preferredDate: quickDate,
      preferredTime: quickTime,
      stylistPreference: quickStylist,
      notes: quickNotes.trim()
    };

    await saveAppointmentToSupabase(payload, ref);

    // Refresh list
    await loadAppointments();

    // Reset quick form
    setQuickName('');
    setQuickPhone('');
    setQuickNotes('');
    setIsCreatingQuick(false);
    setIsSubmittingQuick(false);
  };

  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch =
      app.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone_number.includes(searchQuery) ||
      app.reference_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.selected_service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ? true : (app.status || 'confirmed').toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    if (appointments.length === 0) return;
    const headers = [
      'Reference ID',
      'Customer Name',
      'Phone',
      'Email',
      'Service',
      'Date',
      'Time',
      'Stylist',
      'Status',
      'Notes'
    ];
    const rows = appointments.map((a) => [
      `"${a.reference_id}"`,
      `"${a.customer_name}"`,
      `"${a.phone_number}"`,
      `"${a.email || ''}"`,
      `"${a.selected_service}"`,
      `"${a.preferred_date}"`,
      `"${a.preferred_time}"`,
      `"${a.stylist_preference || ''}"`,
      `"${a.status || 'confirmed'}"`,
      `"${(a.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `MakeYourStyle_Appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-5xl bg-[#12110F] border border-[#2B261F] shadow-2xl flex flex-col max-h-[92vh] rounded-none overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 sm:p-6 border-b border-[#231F19] bg-[#161411] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-serif text-[#FAF8F5] tracking-wide">
                  Salon Reception &amp; Appointments Desk
                </h2>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#C5A059]/20 text-[#D4AF37] border border-[#C5A059]/30 rounded">
                  Supabase Live
                </span>
              </div>
              <p className="text-xs text-[#8F8677] font-light">
                Project ID: <span className="font-mono text-[#C5A059]">jkzugoutudqqgxersobh</span> · Table: <code className="text-[#CDC5B4]">public.appointments</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              disabled={appointments.length === 0}
              className="px-3 py-1.5 bg-[#1F1C17] hover:bg-[#2A2620] disabled:opacity-40 text-[#CDC5B4] text-xs font-mono uppercase tracking-wider rounded border border-[#2B261F] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download Appointments CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={() => setIsCreatingQuick(!isCreatingQuick)}
              className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D0C0B] text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors cursor-pointer shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Make One More</span>
            </button>

            <button
              onClick={loadAppointments}
              className="p-1.5 text-[#8F8677] hover:text-[#FAF8F5] transition-colors rounded hover:bg-[#1F1C17] cursor-pointer"
              title="Refresh from Supabase"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#C5A059]' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#8F8677] hover:text-[#FAF8F5] transition-colors rounded hover:bg-[#1F1C17] cursor-pointer ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Booking Drawer */}
        {isCreatingQuick && (
          <form
            onSubmit={handleCreateQuickAppointment}
            className="p-4 sm:p-5 bg-[#1A1813] border-b border-[#2C271F] animate-in slide-in-from-top-2 duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Make One More Reservation (Instant Supabase Insert)
              </span>
              <button
                type="button"
                onClick={() => setIsCreatingQuick(false)}
                className="text-xs text-[#8F8677] hover:text-[#FAF8F5]"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-[#A89F8F] uppercase tracking-wider mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Ananya Verma"
                  value={quickName}
                  onChange={(e) => setQuickName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0E0D0C] border border-[#2B261F] text-[#FAF8F5] text-xs focus:border-[#C5A059] outline-none rounded-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#A89F8F] uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={quickPhone}
                  onChange={(e) => setQuickPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0E0D0C] border border-[#2B261F] text-[#FAF8F5] text-xs focus:border-[#C5A059] outline-none rounded-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#A89F8F] uppercase tracking-wider mb-1">
                  Service Treatment *
                </label>
                <select
                  value={quickService}
                  onChange={(e) => setQuickService(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0E0D0C] border border-[#2B261F] text-[#FAF8F5] text-xs focus:border-[#C5A059] outline-none rounded-none"
                >
                  {SALON_SERVICES.map((s) => (
                    <option key={s.id} value={s.name} className="bg-[#141311]">
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#A89F8F] uppercase tracking-wider mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  required
                  value={quickDate}
                  onChange={(e) => setQuickDate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0E0D0C] border border-[#2B261F] text-[#FAF8F5] text-xs focus:border-[#C5A059] outline-none rounded-none"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#A89F8F] uppercase tracking-wider mb-1">
                  Preferred Time *
                </label>
                <select
                  value={quickTime}
                  onChange={(e) => setQuickTime(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0E0D0C] border border-[#2B261F] text-[#FAF8F5] text-xs focus:border-[#C5A059] outline-none rounded-none"
                >
                  {['10:00 AM', '11:00 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'].map((t) => (
                    <option key={t} value={t} className="bg-[#141311]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-[#A89F8F] uppercase tracking-wider mb-1">
                  Stylist Choice
                </label>
                <input
                  type="text"
                  placeholder="Master Stylist / Creative Director"
                  value={quickStylist}
                  onChange={(e) => setQuickStylist(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0E0D0C] border border-[#2B261F] text-[#FAF8F5] text-xs focus:border-[#C5A059] outline-none rounded-none"
                />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <input
                type="text"
                placeholder="Optional notes or client requests..."
                value={quickNotes}
                onChange={(e) => setQuickNotes(e.target.value)}
                className="flex-1 mr-3 px-3 py-2 bg-[#0E0D0C] border border-[#2B261F] text-[#FAF8F5] text-xs focus:border-[#C5A059] outline-none rounded-none"
              />
              <button
                type="submit"
                disabled={isSubmittingQuick}
                className="px-5 py-2 bg-[#C5A059] hover:bg-[#D4AF37] disabled:opacity-50 text-[#0D0C0B] text-xs font-semibold uppercase tracking-wider rounded cursor-pointer whitespace-nowrap"
              >
                {isSubmittingQuick ? 'Saving to Supabase...' : 'Save Reservation'}
              </button>
            </div>
          </form>
        )}

        {/* Filter and Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[#231F19] bg-[#0E0D0C] flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-[#8F8677] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer name, phone, or MYS- reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#161411] border border-[#26221C] text-[#FAF8F5] text-xs placeholder-[#6B6456] focus:border-[#C5A059] outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#8F8677] uppercase tracking-wider hidden sm:inline">
              Filter:
            </span>
            <div className="flex gap-1 bg-[#161411] p-1 border border-[#26221C]">
              {['all', 'confirmed', 'completed', 'cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 text-[11px] uppercase tracking-wider transition-colors cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#C5A059] text-[#0D0C0B] font-semibold'
                      : 'text-[#8F8677] hover:text-[#FAF8F5]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 bg-[#0A0A09]">
          {isLoading ? (
            <div className="py-16 text-center text-[#8F8677]">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#C5A059] mb-3" />
              <p className="text-xs uppercase tracking-wider">Syncing with your Supabase database...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-16 text-center text-[#8F8677] space-y-3">
              <Calendar className="w-10 h-10 mx-auto text-[#4A4338]" />
              <p className="text-sm text-[#FAF8F5] font-serif">No appointments found</p>
              <p className="text-xs text-[#8F8677] max-w-sm mx-auto">
                {searchQuery || statusFilter !== 'all'
                  ? 'No reservations matched your search filter.'
                  : 'No appointments in the database yet. Click "Make One More" above to create your next reservation!'}
              </p>
              <button
                onClick={() => setIsCreatingQuick(true)}
                className="mt-2 px-4 py-2 bg-[#C5A059] text-[#0D0C0B] text-xs font-semibold uppercase tracking-wider rounded"
              >
                + Make One More Reservation
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredAppointments.map((app) => (
                <div
                  key={app.reference_id}
                  className="p-4 bg-[#14120F] border border-[#26221B] hover:border-[#3D3528] transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Ref code + Status */}
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#231F19]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[#C5A059] bg-[#1F1C16] px-2 py-0.5 border border-[#3D3528]">
                          {app.reference_id}
                        </span>
                        <span className="text-[10px] text-[#6B6456] font-mono">
                          {app.created_at ? new Date(app.created_at).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        value={app.status || 'confirmed'}
                        onChange={(e) => handleStatusChange(app.reference_id, e.target.value)}
                        disabled={updatingRef === app.reference_id}
                        className={`text-[10px] uppercase font-mono tracking-wider px-2 py-1 border cursor-pointer outline-none rounded-none ${
                          (app.status || 'confirmed') === 'completed'
                            ? 'bg-[#121B14] text-[#34D399] border-[#234A29]'
                            : (app.status || 'confirmed') === 'cancelled'
                            ? 'bg-[#2B1414] text-[#F87171] border-[#4A2323]'
                            : 'bg-[#1E1B15] text-[#FBBF24] border-[#4A3B1E]'
                        }`}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Customer & Service Details */}
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-2 text-[#FAF8F5] font-medium">
                        <User className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                        <span>{app.customer_name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-[#CDC5B4]">
                        <Scissors className="w-3.5 h-3.5 text-[#8F8677] shrink-0" />
                        <span className="font-medium text-[#FAF8F5]">{app.selected_service}</span>
                      </div>

                      <div className="flex items-center gap-4 text-[#A89F8F] font-mono text-[11px] pt-1">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-[#C5A059]" />
                          <span>{app.preferred_date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-[#C5A059]" />
                          <span>{app.preferred_time}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#8F8677] text-[11px] pt-1">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3 text-[#6B6456]" />
                          <a href={`tel:${app.phone_number}`} className="hover:text-[#C5A059] underline">
                            {app.phone_number}
                          </a>
                        </div>
                        {app.email && (
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-[#6B6456]" />
                            <span>{app.email}</span>
                          </div>
                        )}
                      </div>

                      {app.stylist_preference && (
                        <div className="text-[11px] text-[#7A7264] pt-0.5">
                          Stylist: <span className="text-[#CDC5B4]">{app.stylist_preference}</span>
                        </div>
                      )}

                      {app.notes && (
                        <div className="pt-2 text-[11px] text-[#A89F8F] italic bg-[#0F0E0C] p-2 border border-[#201D17]">
                          "{app.notes}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Bar */}
                  <div className="mt-3 pt-2.5 border-t border-[#1F1C16] flex items-center justify-between text-[10px] text-[#6B6456]">
                    <span className="flex items-center gap-1">
                      <Database className="w-3 h-3 text-[#10B981]" /> Stored in Supabase
                    </span>
                    <a
                      href={`https://wa.me/${app.phone_number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello ${app.customer_name}, this is Make Your Style Salon regarding your reservation (${app.reference_id}) for ${app.selected_service} on ${app.preferred_date} at ${app.preferred_time}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline"
                    >
                      Message on WhatsApp →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="p-3.5 sm:p-4 bg-[#14120F] border-t border-[#231F19] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8F8677]">
          <div>
            Showing <strong className="text-[#FAF8F5]">{filteredAppointments.length}</strong> of{' '}
            <strong className="text-[#FAF8F5]">{appointments.length}</strong> reservations in Supabase
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://supabase.com/dashboard/project/jkzugoutudqqgxersobh/editor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C5A059] hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>Open Supabase Table Editor</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
