import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../data/coffeeData';
import { SafeImage } from './SafeImage';

interface OfferSectionProps {
  onShopNow: () => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ onShopNow }) => {
  return (
    <section id="offers" className="py-16 sm:py-20 bg-[#160A04] border-y border-[#3D1F12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#26130B] rounded-3xl border border-[#4E2818] p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D9A773]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="font-serif italic text-2xl sm:text-3xl text-[#D9A773] block">
                Offer
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7EBE1] tracking-tight">
                Up To 50% Off Special Roasts
              </h2>

              <p className="text-sm sm:text-base text-[#D5BFA8] leading-relaxed max-w-xl">
                At our cafe, we take pride in providing our customers with the best coffee around. Our carefully-selected coffees come from some of the most renowned coffee growing regions in the world, ensuring that every cup is pure perfection.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#E5B887]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D9A773]" />
                  <span>Use voucher code <strong className="font-mono text-[#F7EBE1]">BREW15</strong> or <strong className="font-mono text-[#F7EBE1]">FIRSTSIP</strong></span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={onShopNow}
                  className="px-8 py-3 rounded-full bg-[#1C0D06] hover:bg-[#2A150D] text-[#F7EBE1] border border-[#5C321E] hover:border-[#D9A773] font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9A773]" />
                </button>
              </div>
            </div>

            {/* Right: Coffee Bags / Roast Imagery Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#4E2818] bg-[#1C0D06] shadow-xl aspect-4/3 group">
                <SafeImage
                  src={ASSETS.coldBrew}
                  alt="Brew & Bean Coffee Specialty Beans and Brews"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fallbackTitle="Specialty Coffee Collection"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C0D06] via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#2A150D]/90 backdrop-blur-xs border border-[#4E2818] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D9A773]" />
                    <span className="text-xs font-semibold text-[#F7EBE1]">Micro-Batch Reserve Bags</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#E5B887]">Save 50%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
