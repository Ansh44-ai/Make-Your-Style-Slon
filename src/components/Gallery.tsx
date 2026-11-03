import React, { useState } from 'react';
import { ZoomIn, SlidersHorizontal } from 'lucide-react';
import { GalleryItem } from '../types/salon';
import { SALON_GALLERY } from '../data/salonData';
import { LightboxModal } from './LightboxModal';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50);

  const categories = [
    { label: 'All Portfolio (8)', value: 'all' },
    { label: 'Transformations', value: 'transformation' },
    { label: 'Balayage & Colour', value: 'colour' },
    { label: 'Hairstyling', value: 'styling' },
    { label: 'Salon Interior', value: 'interior' },
  ];

  const filteredItems = activeCategory === 'all'
    ? SALON_GALLERY
    : SALON_GALLERY.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-[#0D0C0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium">
              Our Gallery
            </span>
            <span className="w-8 h-[1px] bg-[#C5A059]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#FAF8F5] tracking-tight mb-4 [text-wrap:balance]">
            Artistry in Every Strand
          </h2>
          <p className="text-sm sm:text-base text-[#9E9584] leading-relaxed font-light max-w-xl mx-auto">
            Witness the transformations, dimensional balayage tones, and bespoke occasion styling crafted inside the Make Your Style atelier.
          </p>
        </div>

        {/* Featured Transformation: Interactive Before / After Comparison */}
        <div className="mb-20 p-6 sm:p-10 bg-[#131210] border border-[#26221C] rounded-sm shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[#1F1C17]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-1">
                Transformation Case Study
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-light text-[#FAF8F5]">
                Keratin Restorative &amp; Frizz-Control Protocol
              </h3>
            </div>
            <div className="text-xs text-[#807768] font-mono">
              Slide to compare Before &amp; After
            </div>
          </div>

          {/* Interactive Split View */}
          <div className="relative h-72 sm:h-[420px] w-full rounded-sm overflow-hidden select-none border border-[#26221C]">
            {/* After Image (Background layer) */}
            <img
              src="/images/service-smoothening.jpg"
              alt="After transformation - Silky gloss"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 px-3 py-1 bg-[#0D0C0B]/85 backdrop-blur-md border border-[#332E24] text-xs font-mono tracking-wider text-[#C5A059]">
              After · Make Your Style Ritual
            </div>

            {/* Before Image (Clipped layer) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="/images/service-straightening.jpg"
                alt="Before transformation"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover filter saturate-40 contrast-95"
                style={{ width: '100%', minWidth: '100%' }}
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#0D0C0B]/85 backdrop-blur-md border border-[#332E24] text-xs font-mono tracking-wider text-[#CDC5B4]">
                Before
              </div>
            </div>

            {/* Divider Line */}
            <div
              className="absolute inset-y-0 w-1 bg-[#C5A059] shadow-[0_0_12px_rgba(197,160,89,0.7)] cursor-ew-resize flex items-center justify-center"
              style={{ left: `calc(${sliderPos}% - 2px)` }}
            >
              <div className="w-8 h-8 rounded-full bg-[#C5A059] text-[#0D0C0B] flex items-center justify-center shadow-lg">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>

            {/* Accessible Range Input */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              aria-label="Before and after transformation slider"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>
          <p className="text-xs text-[#807768] mt-4 text-center font-light">
            Restored with our proprietary formaldehyde-free botanical peptide infusion and heat-sealed cuticle smoothing.
          </p>
        </div>

        {/* Gallery Filter Navigation */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-[#C5A059] text-[#0D0C0B] font-semibold shadow-md'
                  : 'text-[#8F8677] hover:text-[#FAF8F5] bg-[#141311] border border-[#26221C]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Asymmetrical Masonry Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const isFeatured = idx === 0 || idx === 4;
            return (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className={`group relative h-80 rounded-sm overflow-hidden border border-[#23201A] bg-[#141311] cursor-pointer hover:border-[#C5A059]/60 transition-all duration-300 ${
                  isFeatured ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106 filter brightness-95 group-hover:brightness-105"
                />
                
                {/* Clean Scrim Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between text-[#C5A059] text-xs uppercase tracking-widest font-mono mb-1.5">
                    <span>{item.category}</span>
                    <ZoomIn className="w-4 h-4" />
                  </div>
                  <h4 className="text-lg font-serif text-[#FAF8F5] font-normal">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#CDC5B4] line-clamp-1 mt-1 font-light">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        item={activeLightboxItem}
        items={filteredItems}
        onClose={() => setActiveLightboxItem(null)}
        onNavigate={(index) => setActiveLightboxItem(filteredItems[index])}
      />
    </section>
  );
};
