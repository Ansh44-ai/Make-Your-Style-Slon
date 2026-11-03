import React from 'react';
import { X, Clock, Sparkles, Check, Calendar, ArrowRight } from 'lucide-react';
import { SalonService } from '../types/salon';

interface ServiceDetailModalProps {
  service: SalonService | null;
  onClose: () => void;
  onBook: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBook
}) => {
  React.useEffect(() => {
    if (!service) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl bg-[#141311] border border-[#2E2922] rounded-none shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Image */}
        <div className="relative h-56 sm:h-64 w-full shrink-0">
          <img
            src={service.image}
            alt={service.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141311] via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 bg-[#0D0C0B]/80 hover:bg-[#0D0C0B] text-[#CDC5B4] hover:text-[#C5A059] border border-[#2A261F] transition-colors cursor-pointer"
            aria-label="Close service details"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#C5A059] font-medium">
              Make Your Style Atelier Ritual
            </span>
            <h3 id="service-detail-title" className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] font-normal tracking-tight mt-1">
              {service.name}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Metadata Row: Duration & Price Placeholder */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-[#26221B] text-xs text-[#A89F8F]">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Duration: <strong className="text-[#FAF8F5] font-medium">{service.duration}</strong></span>
            </div>
            <div className="text-[#C5A059] font-medium tracking-wider uppercase text-xs">
              {service.pricePlaceholder}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#8E8475] mb-2 font-medium">
              Overview &amp; Experience
            </h4>
            <p className="text-sm text-[#CDC5B4] leading-relaxed font-light">
              {service.description}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#8E8475] mb-3 font-medium">
              Included in this Ritual
            </h4>
            <ul className="space-y-2.5">
              {service.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#FAF8F5]/90">
                  <span className="w-4 h-4 rounded-full bg-[#C5A059]/15 text-[#C5A059] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended For */}
          <div className="p-4 bg-[#181613] border border-[#2A251D]">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] mb-1 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span>Recommended For</span>
            </h4>
            <p className="text-xs text-[#CDC5B4]/85 leading-relaxed">
              {service.recommendedFor}
            </p>
          </div>

          <div className="text-[11px] text-[#7A7264] italic">
            * Note: All prices are indicative starting estimates. Final investment is confirmed following an initial consultation assessing hair density and length.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 sm:p-6 bg-[#0F0E0C] border-t border-[#26221B] flex items-center justify-between gap-4 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs uppercase tracking-[0.16em] text-[#8E8475] hover:text-[#FAF8F5] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onBook(service.name);
              onClose();
            }}
            className="px-6 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-[#0D0C0B] bg-[#C5A059] hover:bg-[#D4AF37] transition-colors shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve Appointment</span>
          </button>
        </div>
      </div>
    </div>
  );
};
