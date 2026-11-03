import React, { useState } from 'react';
import { Clock, Search, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { SalonService, ServiceCategory } from '../types/salon';
import { SALON_SERVICES } from '../data/salonData';
import { filterServices } from '../utils/booking';

interface ServicesProps {
  onSelectServiceForBooking: (serviceName: string) => void;
  onOpenDetails: (service: SalonService) => void;
}

export const Services: React.FC<ServicesProps> = ({
  onSelectServiceForBooking,
  onOpenDetails
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { label: string; value: ServiceCategory }[] = [
    { label: 'All Services (10)', value: 'all' },
    { label: 'Cuts & Styling', value: 'cut-style' },
    { label: 'Colour & Balayage', value: 'colour' },
    { label: 'Spa & Scalp Rituals', value: 'treatments' },
    { label: 'Texture & Bridal', value: 'texture-bridal' }
  ];

  const displayedServices = filterServices(SALON_SERVICES, selectedCategory, searchQuery);

  // 3 Marquee Signature Spotlights for visual editorial punch
  const spotlightServices = SALON_SERVICES.filter(
    (s) => s.id === 'haircut-styling' || s.id === 'hair-highlights' || s.id === 'keratin-treatment'
  );

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#0D0C0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium">
              Our Services
            </span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#FAF8F5] tracking-tight mb-4 [text-wrap:balance]">
            Crafted for Texture, Form &amp; Movement
          </h2>
          <p className="text-sm sm:text-base text-[#9E9584] leading-relaxed font-light max-w-xl mx-auto">
            From sculpted precision cuts and French balayage to restorative keratin peptide infusions, explore our complete salon service menu.
          </p>
        </div>

        {/* Marquee Featured Spotlights (Break the repetitive card grid) */}
        {!searchQuery && selectedCategory === 'all' && (
          <div className="mb-20">
            <div className="flex items-center justify-between pb-4 border-b border-[#23201A] mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                Atelier Signature Spotlights
              </span>
              <span className="text-xs text-[#8F8677] font-light hidden sm:inline">
                Most requested bespoke rituals
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {spotlightServices.map((service) => (
                <div
                  key={`spotlight-${service.id}`}
                  className="group relative bg-[#131210] border border-[#26221C] hover:border-[#C5A059]/60 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden bg-[#1A1815]">
                    <img
                      src={service.image}
                      alt={service.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131210] via-transparent to-black/20" />
                    
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#0D0C0B]/80 backdrop-blur-md border border-[#332E24] text-[11px] font-mono text-[#CDC5B4]">
                      {service.duration}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2 mb-2">
                        <h3 className="text-xl font-serif font-light text-[#FAF8F5] group-hover:text-[#C5A059] transition-colors">
                          {service.name}
                        </h3>
                      </div>
                      
                      <div className="text-xs font-mono text-[#C5A059] mb-3">
                        {service.pricePlaceholder}
                      </div>

                      <p className="text-sm text-[#9E9584] leading-relaxed mb-4 font-light line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#1F1C17] flex items-center justify-between gap-3">
                      <button
                        onClick={() => onOpenDetails(service)}
                        className="text-xs uppercase tracking-wider text-[#9E9584] hover:text-[#FAF8F5] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>

                      <button
                        onClick={() => onSelectServiceForBooking(service.name)}
                        className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0D0C0B] bg-[#C5A059] hover:bg-[#D4AF37] rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Book Filter Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#23201A]">
          {/* Functional Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#141311] border border-[#26221C] rounded-sm overflow-x-auto w-full md:w-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3.5 py-2 text-xs font-medium uppercase tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-[#C5A059] text-[#0D0C0B] font-semibold shadow-sm'
                    : 'text-[#9E9584] hover:text-[#FAF8F5] hover:bg-[#1B1916]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#7A7263] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by treatment or keyword..."
              className="w-full bg-[#141311] border border-[#26221C] focus:border-[#C5A059] text-xs text-[#FAF8F5] placeholder-[#665F52] pl-9 pr-4 py-2.5 rounded-sm focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Structured Editorial Service List */}
        {displayedServices.length === 0 ? (
          <div className="text-center py-16 bg-[#141311] border border-[#26221C] rounded-sm">
            <p className="text-sm text-[#CDC5B4] mb-2 font-light">No salon treatments match "{searchQuery}"</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs uppercase tracking-wider text-[#C5A059] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#1F1C17] border-y border-[#1F1C17]">
            {displayedServices.map((service, idx) => (
              <div
                key={service.id}
                className="group py-6 sm:py-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-[#131210]/60 px-4 -mx-4 rounded-sm transition-colors"
              >
                {/* Left: Thumbnail + Service Details */}
                <div className="flex items-start gap-5 sm:gap-6 flex-1">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-sm overflow-hidden bg-[#1A1815] border border-[#2B2720] shrink-0">
                    <img
                      src={service.image}
                      alt={service.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h3 className="text-lg sm:text-xl font-serif text-[#FAF8F5] font-normal group-hover:text-[#C5A059] transition-colors">
                        {service.name}
                      </h3>
                      <span className="text-xs font-mono text-[#8F8677] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C5A059]" />
                        <span>{service.duration}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#9E9584] font-light leading-relaxed mb-3 max-w-2xl">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#807768]">
                      {service.highlights.slice(0, 2).map((h, i) => (
                        <span key={i} className="flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                          <span>{h}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Price & Reservation Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-6 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#1B1916]">
                  <div className="text-left lg:text-right">
                    <span className="text-[11px] uppercase tracking-wider text-[#807768] block">Starting from</span>
                    <span className="text-sm sm:text-base font-mono font-medium text-[#FAF8F5]">
                      {service.pricePlaceholder.replace('Starting from ', '')}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onOpenDetails(service)}
                      className="px-3 py-2 text-xs uppercase tracking-wider text-[#9E9584] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => onSelectServiceForBooking(service.name)}
                      className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0D0C0B] bg-[#C5A059] hover:bg-[#D4AF37] rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pricing Disclosure Note */}
        <div className="mt-12 text-center max-w-xl mx-auto">
          <p className="text-xs text-[#807768] font-light leading-relaxed">
            * All figures are starting price estimates. Final fees are agreed during your 1-on-1 consultation based on hair density, length, and bespoke styling requirements.
          </p>
        </div>

      </div>
    </section>
  );
};
