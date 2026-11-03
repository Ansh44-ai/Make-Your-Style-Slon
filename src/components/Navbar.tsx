import React, { useState, useEffect } from 'react';
import { Menu, X, MessageSquare, Calendar, Phone, Database, Search } from 'lucide-react';
import { SalonContactInfo } from '../types/salon';

interface NavbarProps {
  contact: SalonContactInfo;
  onBookClick: () => void;
  onOpenAppointmentsDesk?: () => void;
  onOpenTrackBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  contact,
  onBookClick,
  onOpenAppointmentsDesk,
  onOpenTrackBooking
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Philosophy', href: '#why-us' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0E0D0C]/95 backdrop-blur-md py-4 border-b border-[#26221C] shadow-xl'
          : 'bg-gradient-to-b from-[#0D0C0B]/90 via-[#0D0C0B]/50 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text wordmark */}
          <a
            href="#"
            className="text-lg sm:text-xl font-serif tracking-[0.2em] text-[#FAF7F2] uppercase whitespace-nowrap shrink-0 group flex items-center gap-2"
          >
            <span className="font-medium tracking-[0.2em]">Make Your Style Salon</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] opacity-80 group-hover:scale-125 transition-transform" />
          </a>

          {/* Zone 2: Clean single-line text links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#CDC5B4]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#FAF7F2] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all whitespace-nowrap shrink-0"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary action button + WhatsApp link */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            {onOpenAppointmentsDesk && (
              <button
                type="button"
                onClick={onOpenAppointmentsDesk}
                className="text-xs uppercase tracking-wider text-[#A89F8F] hover:text-[#C5A059] transition-colors flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 cursor-pointer"
                title="Salon Reception & Appointments Desk (Supabase)"
              >
                <Database className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Desk</span>
              </button>
            )}

            {onOpenTrackBooking && (
              <button
                type="button"
                onClick={onOpenTrackBooking}
                className="text-xs uppercase tracking-wider text-[#A89F8F] hover:text-[#FAF8F5] transition-colors flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 cursor-pointer"
                title="Lookup Existing Booking"
              >
                <Search className="w-3.5 h-3.5 text-[#8F8677]" />
                <span>Track</span>
              </button>
            )}

            <a
              href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-[#A89F8F] hover:text-[#25D366] transition-colors flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={onBookClick}
              className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B] bg-[#C5A059] hover:bg-[#D4AF37] transition-colors duration-200 rounded-sm whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={onBookClick}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0D0C0B] bg-[#C5A059] rounded-sm sm:hidden"
            >
              Reserve
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#FAF7F2] hover:text-[#C5A059] transition-colors focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#11100E] border-b border-[#28231C] px-6 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-serif tracking-widest uppercase text-[#FAF7F2] hover:text-[#C5A059] py-2 border-b border-[#1E1B16] transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full py-3 text-center text-xs font-semibold uppercase tracking-widest text-[#0D0C0B] bg-[#C5A059] rounded-sm shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {onOpenAppointmentsDesk && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAppointmentsDesk();
                    }}
                    className="py-2.5 px-3 bg-[#1A1813] border border-[#2B261F] text-[#C5A059] text-xs font-mono uppercase tracking-wider rounded flex items-center justify-center gap-1.5"
                  >
                    <Database className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Reception Desk</span>
                  </button>
                )}
                {onOpenTrackBooking && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenTrackBooking();
                    }}
                    className="py-2.5 px-3 bg-[#14120F] border border-[#26221C] text-[#CDC5B4] text-xs font-mono uppercase tracking-wider rounded flex items-center justify-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5 text-[#8F8677]" />
                    <span>Track Booking</span>
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-[#9E9584] pt-2">
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-1.5 hover:text-[#FAF7F2]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{contact.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#25D366] hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
