import React from 'react';
import { ASSETS, CAFE_INFO } from '../data/coffeeData';
import { SafeImage } from './SafeImage';
import { Heart, ShieldCheck, Flame, Users, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 sm:py-24 bg-[#180B05] border-y border-[#3D1F12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E5B887] mb-2 px-3 py-1 rounded-full bg-[#2A150D] border border-[#4D2817]">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A773]" />
            <span>Our Heritage & Passion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7EBE1] tracking-tight text-balance">
            Rooted in Craft, Roasted with Soul
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#D5BFA8] leading-relaxed">
            Founded with an uncompromising devotion to the cup, Brew & Bean Coffee began with a simple belief: exceptional coffee is not just a morning routine—it is a moment of pure connection.
          </p>
        </div>

        {/* 2-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Barista Image with Craft Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#4E2818] bg-[#1C0D06] aspect-4/3 group">
              <SafeImage
                src={ASSETS.story}
                alt="Master barista hand-pouring specialty coffee using a V60 dripper"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                fallbackTitle="Barista Pour-Over Craft at Brew & Bean"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#180B05] via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider text-[#D9A773] font-semibold">
                  The Pour-Over Ritual
                </span>
                <p className="text-sm font-serif font-medium text-[#F7EBE1] mt-1">
                  "Every pour is calibrated to the second, honoring the soil and farmers who nurtured the harvest."
                </p>
              </div>
            </div>

            {/* Overlapping craft accent card */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#2A150D] p-4 rounded-2xl shadow-xl border border-[#4E2818] max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1C0D06] text-[#D9A773] flex items-center justify-center font-serif text-lg font-bold border border-[#4E2818]">
                  18h
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#F7EBE1]">Slow Cold Extraction</h4>
                  <p className="text-[11px] text-[#A89078]">Kyoto slow glass-tower dripping</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission and Quality Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4 text-[#D5BFA8] text-sm sm:text-base leading-relaxed">
              <h3 className="text-xl font-serif font-bold text-[#F7EBE1]">
                From Seed to Sip: Our Mission
              </h3>
              <p>
                We travel directly to family-owned micro-lots in Ethiopia, Colombia, Guatemala, and Sumatra. By cutting out middlemen and paying above fair-trade baseline, we ensure farmers thrive while securing the world's most expressive beans.
              </p>
              <p>
                Back in our roastery, we roast beans in bespoke small batches of just 12 kilograms. Our roasters listen for the subtle first crack and smell the caramelizing natural sugars, finding the exact apex of flavor before rapid air cooling.
              </p>
            </div>

            {/* Core Values 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#221008] border border-[#4E2818] space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#381D12] text-[#D9A773] flex items-center justify-center mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#F7EBE1] uppercase tracking-wider">
                  Ethical Direct Trade
                </h4>
                <p className="text-xs text-[#A89078]">
                  100% traceable origins with sustainable living wages paid to smallholder farm families.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#221008] border border-[#4E2818] space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#381D12] text-[#D9A773] flex items-center justify-center mb-2">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#F7EBE1] uppercase tracking-wider">
                  Micro-Batch Roasted
                </h4>
                <p className="text-xs text-secondary text-[#A89078]">
                  Precision temperature curve tracking to highlight terroir, sweetness, and delicate floral notes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#221008] border border-[#4E2818] space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#381D12] text-[#D9A773] flex items-center justify-center mb-2">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#F7EBE1] uppercase tracking-wider">
                  Clean Ingredients
                </h4>
                <p className="text-xs text-[#A89078]">
                  House-made vanilla bean syrups, organic oat milks, and Valrhona artisan chocolate.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#221008] border border-[#4E2818] space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#381D12] text-[#D9A773] flex items-center justify-center mb-2">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-[#F7EBE1] uppercase tracking-wider">
                  Neighborhood Warmth
                </h4>
                <p className="text-xs text-[#A89078]">
                  A sanctuary designed for lively morning conversations, quiet reading, and community gatherings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Real Stats Row */}
        <div className="mt-14 sm:mt-20 pt-10 border-t border-[#3D1F12] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {CAFE_INFO.stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#E5B887] tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-[#A89078]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
