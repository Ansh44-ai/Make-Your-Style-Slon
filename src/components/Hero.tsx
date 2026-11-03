import React from 'react';
import { Calendar, ChevronDown, ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onServicesClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onServicesClick }) => {
  return (
    <section className="relative min-h-[94vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0C0B]">
      {/* Background Salon Imagery with Subtle Architectural Warmth */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-salon.jpg"
          alt="Make Your Style Salon Sanctuary"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-100 filter brightness-[0.72] contrast-[1.05]"
        />
        {/* Soft, measured photographic scrim (no muddy heavy gradients) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0B] via-[#0D0C0B]/65 to-black/60" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#0D0C0B]/40 to-[#0D0C0B]/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center flex flex-col items-center">
        
        {/* Editorial Eyebrow (No pill box, unboxed clean luxury text) */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#C5A059]/60" />
          <span className="text-xs uppercase tracking-[0.35em] text-[#C5A059] font-medium">
            Haute Coiffure &amp; Hair Sanctuary
          </span>
          <span className="w-8 h-[1px] bg-[#C5A059]/60" />
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light text-[#FAF8F5] tracking-tight leading-[1.06] mb-6 max-w-4xl [text-wrap:balance]">
          Your Hair, <span className="italic font-normal text-[#C5A059]">Your Style</span>, Your Identity.
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-[#C9C2B2] font-light max-w-2xl mx-auto mb-10 leading-relaxed [text-wrap:balance]">
          Experience professional hair styling, expert care, and a transformation designed just for you.
        </p>

        {/* Two CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#0D0C0B] bg-[#C5A059] hover:bg-[#D4AF37] transition-all duration-200 rounded-sm shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book an Appointment</span>
          </button>

          <button
            onClick={onServicesClick}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#FAF8F5] border border-[#4A4235] hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-all duration-200 rounded-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
          </button>
        </div>

        {/* Hallmark Editorial Text Row (Unboxed, clean typographic separators, no generic cards) */}
        <div className="pt-8 border-t border-[#26221C] w-full max-w-3xl flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs text-[#B8AE9D] tracking-wider uppercase font-light">
          <span>Master Hair Stylists</span>
          <span className="text-[#C5A059] select-none">·</span>
          <span>Ammonia-Free Formulations</span>
          <span className="text-[#C5A059] select-none">·</span>
          <span>Bespoke Facial Diagnosis</span>
          <span className="text-[#C5A059] select-none">·</span>
          <span>Private Styling Suites</span>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={onServicesClick}
        aria-label="Scroll to services"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#8F8677] hover:text-[#C5A059] transition-colors p-2 cursor-pointer z-10"
      >
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};
