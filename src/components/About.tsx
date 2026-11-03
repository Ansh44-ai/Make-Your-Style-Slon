import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AboutProps {
  onExploreServices: () => void;
}

export const About: React.FC<AboutProps> = ({ onExploreServices }) => {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#12110F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Editorial 2-Column Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Atelier Story */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Primary Master Stylist Photography */}
              <div className="overflow-hidden rounded-sm border border-[#2B2720] shadow-2xl">
                <img
                  src="/images/about-stylist.jpg"
                  alt="Make Your Style Salon Master Stylist cutting and styling hair"
                  referrerPolicy="no-referrer"
                  className="w-full h-[480px] sm:h-[560px] object-cover object-center filter contrast-[1.04] hover:scale-103 transition-transform duration-700"
                />
              </div>

              {/* Secondary Salon Architecture Vignette */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-48 sm:w-60 p-2.5 bg-[#1A1815] border border-[#332E24] rounded-sm shadow-2xl hidden md:block">
                <img
                  src="/images/salon-interior.jpg"
                  alt="Make Your Style Salon modern interior architecture"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded-sm mb-2"
                />
                <p className="text-[11px] uppercase tracking-wider text-[#C5A059] font-medium text-center">
                  Private Styling Atelier
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Craftsmanship */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Section Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium">
                About Make Your Style Salon
              </span>
            </div>

            {/* Requested Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#FAF8F5] tracking-tight leading-tight mb-6 [text-wrap:balance]">
              Where Style Meets Excellence.
            </h2>

            {/* Requested Description */}
            <p className="text-base sm:text-lg text-[#CDC5B4] leading-relaxed mb-6 font-light">
              At <strong className="font-semibold text-[#FAF8F5]">Make Your Style Salon</strong>, we believe every individual deserves a hairstyle that reflects their personality. Our focus is on professional hair care, modern styling, and delivering an exceptional salon experience.
            </p>

            <p className="text-sm sm:text-base text-[#9E9584] leading-relaxed mb-8 font-light">
              Rather than enforcing transient salon templates, we tailor every haircut, color glaze, and restorative ritual to the unique architecture of your bone structure, hair fiber health, and daily routine. We curate clean, dermatologically tested formulations that elevate hair health without compromising shine or longevity.
            </p>

            {/* Editorial Craft Pillars (Unboxed, natural typography, clean borders) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#26221B] mb-10">
              <div>
                <h4 className="text-sm font-serif text-[#FAF8F5] font-normal mb-1">
                  Bespoke Consultation
                </h4>
                <p className="text-xs text-[#9E9584] leading-relaxed font-light">
                  A personal diagnostic conversation covering hair history, texture behavior, and your styling goals before any service begins.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-serif text-[#FAF8F5] font-normal mb-1">
                  Gentle Chemical Discipline
                </h4>
                <p className="text-xs text-[#9E9584] leading-relaxed font-light">
                  Zero-ammonia toners, bond-protecting lighteners, and hydrolysed keratin treatments that nurture the cuticle.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-serif text-[#FAF8F5] font-normal mb-1">
                  Private Styling Stations
                </h4>
                <p className="text-xs text-[#9E9584] leading-relaxed font-light">
                  Calm, uncrowded spaces designed for discreet consultations and restorative head spas without the urban rush.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-serif text-[#FAF8F5] font-normal mb-1">
                  Dedicated Calibrated Daylight
                </h4>
                <p className="text-xs text-[#9E9584] leading-relaxed font-light">
                  High-CRI daylight mirrors ensure hair color looks authentic under both indoor ambience and outdoor sun.
                </p>
              </div>
            </div>

            {/* Action Link */}
            <div>
              <button
                onClick={onExploreServices}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0D0C0B] bg-[#C5A059] hover:bg-[#D4AF37] transition-colors rounded-sm cursor-pointer shadow-md"
              >
                <span>View Complete Service Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
