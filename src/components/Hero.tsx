import React from 'react';
import { ArrowRight, Sparkles, Award, Coffee, Clock } from 'lucide-react';
import { ASSETS } from '../data/coffeeData';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onOrderNow: () => void;
  onExploreMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onExploreMenu }) => {
  return (
    <section className="relative overflow-hidden bg-[#1C0D06] py-10 sm:py-16 lg:py-20 border-b border-[#3D1F12]">
      {/* Subtle radial warmth background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4A2414]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Top pill badge inspired by reference image */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A150D] border border-[#4D2817] text-xs font-medium text-[#E5B887]">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A773]" />
              <span>Great ideas start with great coffee</span>
            </div>

            {/* Primary Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-[#F7EBE1] leading-[1.12] text-balance">
              Fresh Coffee, Made With Love
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-[#D5BFA8] max-w-2xl leading-relaxed">
              Explore all flavours of coffee with us. There is always a new cup worth experiencing—from ethical high-elevation beans to micro-batch roasts hand-crafted by master baristas.
            </p>

            {/* Action Buttons matching pill design in reference screenshot */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onOrderNow}
                className="px-7 py-3 rounded-full bg-[#D9A773] hover:bg-[#E5B887] text-[#1C0D06] font-bold text-sm shadow-md transition-all duration-200 flex items-center gap-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A773]"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4 text-[#1C0D06]" />
              </button>

              <button
                type="button"
                onClick={onExploreMenu}
                className="px-7 py-3 rounded-full border border-[#5C321E] bg-[#2A150D]/80 hover:bg-[#381D12] hover:border-[#D9A773] text-[#F7EBE1] font-semibold text-sm transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A773]"
              >
                Explore Menu
              </button>
            </div>

            {/* Quality Trust Indicators */}
            <div className="pt-6 border-t border-[#3D1F12] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F7EBE1] mb-1">
                  <Coffee className="w-3.5 h-3.5 text-[#D9A773]" />
                  <span>100% Arabica</span>
                </div>
                <p className="text-[12px] text-[#A89078]">Single-origin direct trade</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F7EBE1] mb-1">
                  <Award className="w-3.5 h-3.5 text-[#D9A773]" />
                  <span>Fresh Roast</span>
                </div>
                <p className="text-[12px] text-[#A89078]">Daily micro-batch roasted</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F7EBE1] mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#D9A773]" />
                  <span>Fast Pickup</span>
                </div>
                <p className="text-[12px] text-[#A89078]">Ready in 10-15 minutes</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Background ambient warm halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#D9A773]/20 via-[#4A2414]/30 to-transparent rounded-3xl filter blur-xl transform -rotate-1" />

              {/* Main Photo Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#4D2817] bg-[#2A150D] aspect-4/3 lg:aspect-5/4 group">
                <SafeImage
                  src={ASSETS.hero}
                  alt="Artisanal Brew & Bean Coffee bar and espresso machine"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  fallbackTitle="Brew & Bean Coffee Atmosphere"
                />
                
                {/* Scrim for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                {/* Floating Bottom Card Banner */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#23120A]/95 backdrop-blur-md shadow-xl border border-[#522B19] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#E5B887] font-bold block">
                      Barista's Choice
                    </span>
                    <h3 className="text-sm font-serif font-bold text-[#F7EBE1]">
                      Velvet Golden Latte & Pastry
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-[#D5BFA8] mt-0.5">
                      <span>Notes of Toasted Pecan</span>
                      <span>·</span>
                      <span className="text-[#D9A773] font-semibold">★ 4.9 (300+ reviews)</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onOrderNow}
                    className="p-2.5 rounded-lg bg-[#3D1F12] hover:bg-[#4D2817] text-[#E5B887] border border-[#5C321E] transition-colors"
                    aria-label="Order Barista's Choice"
                  >
                    <ArrowRight className="w-4 h-4 text-[#D9A773]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
