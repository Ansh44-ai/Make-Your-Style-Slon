import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GalleryItem } from '../types/salon';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onNavigate
}) => {
  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = (currentIndex - 1 + items.length) % items.length;
    onNavigate(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = (currentIndex + 1) % items.length;
    onNavigate(next);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4 sm:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-black/60 hover:bg-[#0D0C0B] text-[#CDC5B4] hover:text-[#C5A059] border border-[#2E2922] transition-colors z-20 cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Prev button */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 bg-[#141311]/80 hover:bg-[#C5A059] text-[#CDC5B4] hover:text-[#0D0C0B] border border-[#2E2922] transition-colors z-20 cursor-pointer"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 bg-[#141311]/80 hover:bg-[#C5A059] text-[#CDC5B4] hover:text-[#0D0C0B] border border-[#2E2922] transition-colors z-20 cursor-pointer"
        aria-label="Next Image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Active Lightbox Item Content */}
      <div
        className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden border border-[#2E2922] shadow-2xl max-h-[70vh] flex items-center justify-center bg-[#0D0C0B]">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="max-h-[70vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Caption */}
        <div className="mt-5 text-center max-w-xl">
          <span className="text-[10px] uppercase tracking-[0.24em] text-[#C5A059] font-medium">
            {item.category} • {currentIndex + 1} of {items.length}
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-[#FAF8F5] font-normal mt-1">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#A89F8F] mt-1.5 font-light">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
