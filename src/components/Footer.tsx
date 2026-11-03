import React from 'react';
import { Instagram, Facebook, Phone, MessageSquare, MapPin, ArrowUp } from 'lucide-react';
import { SalonContactInfo } from '../types/salon';
import { SALON_SERVICES } from '../data/salonData';

interface FooterProps {
  contact: SalonContactInfo;
  onSelectService: (serviceName: string) => void;
  onOpenAppointmentsDesk?: () => void;
  onOpenTrackBooking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  contact,
  onSelectService,
  onOpenAppointmentsDesk,
  onOpenTrackBooking
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090807] text-[#CDC5B4] border-t border-[#1F1C17] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1A1814]">
          
          {/* Brand & Short Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
              <span className="text-xl font-serif tracking-[0.2em] text-[#FAF8F5] uppercase font-light">
                {contact.name}
              </span>
            </div>
            <p className="text-sm text-[#8F8677] leading-relaxed font-light">
              Where Style Meets Excellence. An exclusive hair salon dedicated to architectural precision cutting, multidimensional French balayage, and restorative hair care.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#141311] border border-[#26221C] hover:border-[#C5A059] text-[#CDC5B4] hover:text-[#FAF8F5] flex items-center justify-center transition-colors"
                aria-label={`${contact.name} Instagram`}
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#141311] border border-[#26221C] hover:border-[#C5A059] text-[#CDC5B4] hover:text-[#FAF8F5] flex items-center justify-center transition-colors"
                aria-label={`${contact.name} Facebook`}
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#141311] border border-[#26221C] hover:border-[#25D366] text-[#CDC5B4] hover:text-[#25D366] flex items-center justify-center transition-colors"
                aria-label={`${contact.name} WhatsApp`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#FAF8F5] font-medium font-mono">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#8F8677]">
              <li>
                <a href="#about" className="hover:text-[#FAF8F5] transition-colors">
                  About Atelier
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#FAF8F5] transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#FAF8F5] transition-colors">
                  Portfolio &amp; Cases
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#FAF8F5] transition-colors">
                  The Standard
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#FAF8F5] transition-colors">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-[#FAF8F5] transition-colors">
                  Reserve Online
                </a>
              </li>
              {onOpenAppointmentsDesk && (
                <li>
                  <button
                    onClick={onOpenAppointmentsDesk}
                    className="hover:text-[#C5A059] text-[#CDC5B4] font-medium transition-colors cursor-pointer text-left"
                  >
                    Appointments Desk (Supabase)
                  </button>
                </li>
              )}
              {onOpenTrackBooking && (
                <li>
                  <button
                    onClick={onOpenTrackBooking}
                    className="hover:text-[#FAF8F5] transition-colors cursor-pointer text-left"
                  >
                    Track Existing Booking
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Signature Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#FAF8F5] font-medium font-mono">
              Treatments
            </h4>
            <ul className="space-y-2 text-xs text-[#8F8677]">
              {SALON_SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      onSelectService(service.name);
                      const el = document.getElementById('booking');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#FAF8F5] text-left transition-colors cursor-pointer"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#FAF8F5] font-medium font-mono">
              Salon Atelier
            </h4>
            <div className="space-y-2 text-xs text-[#8F8677]">
              <p className="flex items-start gap-2 leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>{contact.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#FAF8F5] font-mono">
                  {contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] font-mono">
                  {contact.whatsapp}
                </a>
              </p>
              <div className="pt-2 border-t border-[#1C1A16] text-[11px] leading-relaxed">
                <p className="text-[#A89F8F]">{contact.hoursWeekday}</p>
                <p className="text-[#7A7263]">{contact.hoursWeekend}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736B5E]">
          <p>© {new Date().getFullYear()} {contact.name}. All rights reserved. Where Style Meets Excellence.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#131210] border border-[#23201A] hover:border-[#C5A059] text-[#CDC5B4] hover:text-[#FAF8F5] transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
