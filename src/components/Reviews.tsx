import React, { useState } from 'react';
import { MessageSquarePlus, Check, X, Star } from 'lucide-react';
import { ReviewItem } from '../types/salon';
import { TESTIMONIALS } from '../data/salonData';

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(TESTIMONIALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newService, setNewService] = useState('Haircut & Styling');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      service: newService,
      rating: newRating,
      date: 'November 2026',
      comment: newComment.trim(),
      avatarInitial: newAuthor.trim().charAt(0).toUpperCase()
    };

    setReviews([newRev, ...reviews]);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setIsModalOpen(false);
      setNewAuthor('');
      setNewComment('');
    }, 1800);
  };

  const featuredReview = reviews[0];

  return (
    <section id="reviews" className="py-24 sm:py-32 bg-[#0D0C0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-[#C5A059]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium">
                Client Experiences
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#FAF8F5] tracking-tight [text-wrap:balance]">
              Words from Our Atelier Guests
            </h2>
            <p className="text-sm sm:text-base text-[#9E9584] leading-relaxed font-light mt-3">
              Honest impressions from guests who trust us with their hair transformations, ongoing care, and special occasions.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF8F5] border border-[#423C31] hover:border-[#C5A059] hover:bg-[#C5A059]/10 transition-colors rounded-sm flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#C5A059]" />
            <span>Share Feedback</span>
          </button>
        </div>

        {/* Featured Large Testimonial Quote */}
        {featuredReview && (
          <div className="mb-14 p-8 sm:p-12 bg-[#131210] border border-[#26221C] rounded-sm relative">
            <span className="text-4xl sm:text-6xl font-serif text-[#C5A059]/40 leading-none select-none block mb-4">
              “
            </span>
            <p className="text-lg sm:text-2xl font-serif font-light text-[#FAF8F5] leading-relaxed mb-6 [text-wrap:balance]">
              {featuredReview.comment}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#1F1C17] text-xs text-[#9E9584]">
              <div>
                <strong className="text-sm font-medium text-[#FAF8F5] block font-sans">
                  {featuredReview.author}
                </strong>
                <span>{featuredReview.service}</span>
                {featuredReview.location && <span> · {featuredReview.location}</span>}
              </div>

              <div className="font-mono text-[#807768]">
                Verified Guest Experience · {featuredReview.date}
              </div>
            </div>
          </div>
        )}

        {/* Remaining Reviews (Refined 3-Column Editorial Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(1).map((rev) => (
            <article
              key={rev.id}
              className="p-7 bg-[#131210] border border-[#23201A] hover:border-[#332E24] rounded-sm transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#807768] font-mono mb-4">
                  <span>{rev.service}</span>
                  <span>{rev.date}</span>
                </div>

                <p className="text-sm text-[#CDC5B4] font-light leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1C1A16] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A1815] border border-[#2B2720] text-[#C5A059] font-serif text-xs font-semibold flex items-center justify-center shrink-0">
                  {rev.avatarInitial}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#FAF8F5]">
                    {rev.author}
                  </h4>
                  {rev.location && <span className="text-[11px] text-[#736B5E]">{rev.location}</span>}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
        >
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />

          <div className="relative z-10 w-full max-w-md bg-[#141311] border border-[#2B2720] p-6 sm:p-8 rounded-sm shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#8F8677] hover:text-[#FAF8F5] cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 id="review-modal-title" className="text-2xl font-serif font-light text-[#FAF8F5] mb-1">
              Share Your Experience
            </h3>
            <p className="text-xs text-[#9E9584] mb-6 font-light">
              Your candid thoughts help us continually hone our craft and guest care.
            </p>

            {submittedFeedback ? (
              <div className="py-8 text-center text-sm text-[#C5A059] flex flex-col items-center gap-2">
                <Check className="w-8 h-8 rounded-full bg-[#C5A059]/20 p-1" />
                <p className="font-medium">Thank you. Your feedback has been added.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A89F8F] mb-1 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Shalini Roy"
                    className="w-full bg-[#1A1815] border border-[#2B2720] focus:border-[#C5A059] text-xs text-[#FAF8F5] px-3.5 py-2.5 rounded-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A89F8F] mb-1 font-medium">
                    Treatment Received
                  </label>
                  <select
                    value={newService}
                    onChange={(e) => setNewService(e.target.value)}
                    className="w-full bg-[#1A1815] border border-[#2B2720] focus:border-[#C5A059] text-xs text-[#FAF8F5] px-3.5 py-2.5 rounded-sm focus:outline-none"
                  >
                    <option value="Haircut & Styling">Haircut & Styling</option>
                    <option value="Hair Spa">Hair Spa</option>
                    <option value="Hair Smoothening">Hair Smoothening</option>
                    <option value="Hair Straightening">Hair Straightening</option>
                    <option value="Hair Colouring">Hair Colouring</option>
                    <option value="Hair Highlights">Hair Highlights</option>
                    <option value="Keratin Treatment">Keratin Treatment</option>
                    <option value="Hair Wash & Blow Dry">Hair Wash & Blow Dry</option>
                    <option value="Bridal Hairstyling">Bridal Hairstyling</option>
                    <option value="Hair Treatment & Care">Hair Treatment & Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#A89F8F] mb-1 font-medium">
                    Your Thoughts
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts on the cut, color, consultation, or atmosphere..."
                    className="w-full bg-[#1A1815] border border-[#2B2720] focus:border-[#C5A059] text-xs text-[#FAF8F5] px-3.5 py-2.5 rounded-sm focus:outline-none font-light"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs uppercase tracking-wider text-[#8F8677] hover:text-[#FAF8F5]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#0D0C0B] bg-[#C5A059] hover:bg-[#D4AF37] rounded-sm transition-colors cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
