import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/coffeeData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-16 sm:py-24 bg-[#1C0D06] border-t border-[#3D1F12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header matching user's screenshot style */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-[#F7EBE1] tracking-tight">
            Customer Review
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#A89078]">
            What our morning regulars have to say about their daily cup
          </p>
        </div>

        {/* Featured Review Card with carousel navigation matching screenshot */}
        <div className="max-w-2xl mx-auto relative">
          <div className="bg-[#2A150D] rounded-3xl border border-[#4E2818] p-8 sm:p-10 shadow-2xl relative text-center space-y-5">
            {/* Elegant quotation mark */}
            <div className="text-4xl font-serif text-[#D9A773] leading-none select-none">
              “
            </div>

            {/* Avatar & Name */}
            <div className="space-y-1">
              <div className="w-16 h-16 rounded-full bg-[#3D1F12] border-2 border-[#D9A773]/70 text-[#E5B887] font-serif text-xl font-bold flex items-center justify-center mx-auto shadow-md">
                {current.name.charAt(0)}
              </div>
              <h3 className="text-base font-serif font-bold text-[#F7EBE1] pt-2">
                {current.name}
              </h3>
              <p className="text-xs text-[#A89078]">{current.role}</p>
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D9A773] text-[#D9A773]" />
              ))}
            </div>

            {/* Review Quote Text */}
            <p className="text-sm sm:text-base text-[#D5BFA8] italic leading-relaxed max-w-lg mx-auto">
              "{current.quote}"
            </p>

            {/* Carousel navigation controls */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-[#3D1F12]">
              <button
                type="button"
                onClick={prev}
                className="w-9 h-9 rounded-full bg-[#1C0D06] hover:bg-[#381D12] border border-[#4E2818] text-[#F7EBE1] flex items-center justify-center transition-colors shadow-xs"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      currentIndex === idx ? 'w-6 bg-[#D9A773]' : 'w-2 bg-[#4E2818]'
                    }`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="w-9 h-9 rounded-full bg-[#1C0D06] hover:bg-[#381D12] border border-[#4E2818] text-[#F7EBE1] flex items-center justify-center transition-colors shadow-xs"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
