import React from 'react';
import { SALON_FEATURES } from '../data/salonData';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 sm:py-32 bg-[#12110F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium">
              The Salon Standard
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#FAF8F5] tracking-tight mb-4 [text-wrap:balance]">
            Why Choose Make Your Style Salon?
          </h2>
          <p className="text-sm sm:text-base text-[#9E9584] leading-relaxed font-light">
            We built our salon as an antidote to rushed chain salons. Here is our unwavering commitment to client care, clinical hygiene, and genuine hair health.
          </p>
        </div>

        {/* Asymmetrical Editorial Grid (No identical card clones) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#26221B] border border-[#26221B]">
          {SALON_FEATURES.map((feature, idx) => (
            <div
              key={feature.title}
              className="p-8 sm:p-10 bg-[#141311] hover:bg-[#171613] transition-colors duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#807768] font-mono mb-6">
                  <span>Standard 0{idx + 1}</span>
                  <span className="text-[#C5A059]">•</span>
                </div>

                <h3 className="text-xl font-serif text-[#FAF8F5] font-normal mb-3">
                  {feature.title}
                </h3>

                <p className="text-sm text-[#9E9584] leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1F1C17] text-[11px] uppercase tracking-wider text-[#736B5E]">
                Guaranteed by Salon Directors
              </div>
            </div>
          ))}
        </div>

        {/* Quiet Reassurance Strip */}
        <div className="mt-12 p-6 bg-[#161513] border border-[#26221B] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9E9584]">
          <p className="font-light">
            Every appointment begins with a seated diagnostic consultation. We never start cutting until we understand your routine and vision.
          </p>
          <a
            href="#booking"
            className="text-[#C5A059] hover:underline uppercase tracking-wider font-medium whitespace-nowrap"
          >
            Schedule Consultation →
          </a>
        </div>

      </div>
    </section>
  );
};
