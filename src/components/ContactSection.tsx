import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Instagram,
  Facebook,
  Copy,
  Check,
  ExternalLink,
  Navigation,
  Send
} from 'lucide-react';
import { SalonContactInfo } from '../types/salon';

interface ContactSectionProps {
  contact: SalonContactInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const [copied, setCopied] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [sentInquiry, setSentInquiry] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(contact.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryMessage.trim()) return;
    setSentInquiry(true);
    setTimeout(() => {
      setSentInquiry(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
    }, 2500);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0D0C0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium">
              Find Our Atelier
            </span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#FAF8F5] tracking-tight mb-4 [text-wrap:balance]">
            Contact {contact.name}
          </h2>
          <p className="text-sm sm:text-base text-[#9E9584] leading-relaxed font-light max-w-xl mx-auto">
            Experience our welcoming sanctuary. Walk-ins are accommodated upon availability; reservations are warmly recommended.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Contact Details & Hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-[#141311] border border-[#26221C] p-8 sm:p-10 rounded-sm space-y-8">
              
              {/* Salon Name & Address */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#1B1A17] border border-[#2D2820] text-[#C5A059] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium block mb-1">
                    Salon Atelier
                  </span>
                  <h3 className="text-base font-serif text-[#FAF8F5] font-normal mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CDC5B4] leading-relaxed font-light mb-3">
                    {contact.address}
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs text-[#8F8677] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Address copied to clipboard' : 'Copy salon address'}</span>
                  </button>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#1F1C17]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B1A17] border border-[#2D2820] text-[#C5A059] flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#807768] block mb-0.5 font-mono">
                      Phone
                    </span>
                    <a
                      href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                      className="text-xs sm:text-sm text-[#FAF8F5] hover:text-[#C5A059] transition-colors font-mono"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B1A17] border border-[#2D2820] text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#807768] block mb-0.5 font-mono">
                      WhatsApp
                    </span>
                    <a
                      href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-[#FAF8F5] hover:text-[#25D366] transition-colors font-mono flex items-center gap-1"
                    >
                      <span>{contact.whatsapp}</span>
                      <ExternalLink className="w-3 h-3 text-[#736B5E]" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="pt-6 border-t border-[#1F1C17] flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#1B1A17] border border-[#2D2820] text-[#C5A059] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium block mb-1">
                    Opening Hours
                  </span>
                  <div className="space-y-1 text-xs sm:text-sm text-[#CDC5B4] font-light">
                    <p>{contact.hoursWeekday}</p>
                    <p>{contact.hoursWeekend}</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-6 border-t border-[#1F1C17]">
                <span className="text-xs uppercase tracking-widest text-[#807768] block mb-3 font-mono">
                  Social Channels
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#191815] border border-[#29251E] hover:border-[#C5A059] text-xs uppercase tracking-wider text-[#CDC5B4] hover:text-[#FAF8F5] rounded-sm transition-colors flex items-center gap-2"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#191815] border border-[#29251E] hover:border-[#C5A059] text-xs uppercase tracking-wider text-[#CDC5B4] hover:text-[#FAF8F5] rounded-sm transition-colors flex items-center gap-2"
                  >
                    <Facebook className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Google Maps Interactive Location Card & Quick Inquiry */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Interactive Map Visual */}
            <div className="relative h-80 sm:h-96 rounded-sm overflow-hidden border border-[#26221C] bg-[#141311] shadow-2xl flex flex-col justify-between p-6">
              {/* Subtle Architectural Grid Lines */}
              <div className="absolute inset-0 bg-[#12110F] opacity-90 pointer-events-none">
                <svg className="w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C5A059" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                <div className="absolute top-1/2 left-0 right-0 h-3 bg-[#1C1A17]" />
                <div className="absolute left-1/3 top-0 bottom-0 w-3 bg-[#1C1A17]" />
              </div>

              {/* Top Map Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="px-3 py-1.5 bg-[#0D0C0B]/90 backdrop-blur-md border border-[#332E24] rounded-sm text-xs font-mono text-[#C5A059] flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps Coordinates</span>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${contact.mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#C5A059] hover:bg-[#D4AF37] text-[#0D0C0B] text-xs font-semibold uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-colors shadow-md"
                >
                  <span>Open Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Atelier Landmark Marker */}
              <div className="relative z-10 mx-auto text-center flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-[#C5A059] text-[#0D0C0B] flex items-center justify-center shadow-[0_0_20px_rgba(197,160,89,0.6)]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="mt-3 px-4 py-2 bg-[#161513]/95 backdrop-blur-md border border-[#C5A059]/40 rounded-sm shadow-xl">
                  <h4 className="text-sm font-serif font-normal text-[#FAF8F5]">
                    {contact.name}
                  </h4>
                  <p className="text-xs text-[#9E9584]">
                    {contact.address}
                  </p>
                </div>
              </div>

              {/* Bottom Note */}
              <div className="relative z-10 text-xs text-[#807768] text-center font-light">
                Valet parking available for all reserved guests.
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="p-6 sm:p-8 bg-[#141311] border border-[#26221C] rounded-sm">
              <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mb-1">
                Direct Inquiry
              </h4>
              <p className="text-xs text-[#9E9584] mb-4 font-light">
                Send a note to our atelier concierge regarding bridal trials, group bookings, or consultations.
              </p>

              {sentInquiry ? (
                <div className="p-4 bg-[#1A1815] border border-[#C5A059]/40 text-xs text-[#C5A059] text-center rounded-sm">
                  ✓ Message received. Our front-desk concierge will reach out promptly.
                </div>
              ) : (
                <form onSubmit={handleSendInquiry} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full bg-[#191815] border border-[#26221C] focus:border-[#C5A059] text-xs text-[#FAF8F5] px-3.5 py-2.5 rounded-sm focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="Your Email or Phone"
                      className="w-full bg-[#191815] border border-[#26221C] focus:border-[#C5A059] text-xs text-[#FAF8F5] px-3.5 py-2.5 rounded-sm focus:outline-none"
                    />
                  </div>
                  <textarea
                    required
                    rows={2}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Describe your styling inquiry or event date..."
                    className="w-full bg-[#191815] border border-[#26221C] focus:border-[#C5A059] text-xs text-[#FAF8F5] px-3.5 py-2 rounded-sm focus:outline-none font-light"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#0D0C0B] bg-[#C5A059] hover:bg-[#D4AF37] rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
