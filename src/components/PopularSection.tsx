import React from 'react';
import { Star, Plus, Sparkles, SlidersHorizontal } from 'lucide-react';
import { POPULAR_ITEMS, CoffeeItem } from '../data/coffeeData';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

interface PopularSectionProps {
  onCustomizeItem: (item: CoffeeItem) => void;
}

export const PopularSection: React.FC<PopularSectionProps> = ({ onCustomizeItem }) => {
  const { addToCart } = useCart();

  return (
    <section id="popular" className="py-16 sm:py-24 bg-[#1C0D06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E5B887] mb-2 px-3 py-1 rounded-full bg-[#2A150D] border border-[#4D2817]">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A773]" />
            <span>Customer Favorites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7EBE1] tracking-tight">
            Delight In a New Mix of Coffee
          </h2>
          <p className="mt-3 text-[#D5BFA8] text-sm sm:text-base">
            Explore all flavours of coffee with us. There is always a new cup worth experiencing.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {POPULAR_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group bg-[#2A150D] rounded-2xl border border-[#4E2818] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#D9A773]/60 transition-all duration-300 flex flex-col"
            >
              {/* Product Image Box */}
              <div className="relative aspect-4/3 bg-[#1C0D06] overflow-hidden">
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  fallbackTitle={item.name}
                />
                
                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A150D] via-transparent to-transparent pointer-events-none" />

                {/* Rating & Category header overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[11px] font-semibold text-[#F7EBE1] bg-[#1C0D06]/75 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#4E2818] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 bg-[#1C0D06]/85 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-[#4E2818] text-xs font-bold text-[#E5B887]">
                    <Star className="w-3.5 h-3.5 fill-[#D9A773] text-[#D9A773]" />
                    <span>{item.rating}</span>
                    <span className="text-[10px] text-[#A89078] font-normal">({item.reviewCount})</span>
                  </div>
                </div>

                {/* Quick customize button hover reveal */}
                <button
                  type="button"
                  onClick={() => onCustomizeItem(item)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#1C0D06]/90 hover:bg-[#1C0D06] text-[#F7EBE1] border border-[#5C321E] text-xs font-medium flex items-center gap-1.5 shadow-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label={`Customize ${item.name}`}
                >
                  <SlidersHorizontal className="w-3 h-3 text-[#D9A773]" />
                  <span>Customize</span>
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-serif font-bold text-[#F7EBE1] group-hover:text-[#E5B887] transition-colors leading-snug">
                    {item.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#C5B099] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Tasting notes */}
                  <div className="mt-3 flex items-center gap-1 text-[11px] text-[#A89078]">
                    <span className="font-semibold text-[#D5BFA8]">Notes:</span>
                    <span className="truncate">
                      {item.flavorNotes.join(' · ')}
                    </span>
                  </div>
                </div>

                {/* Price and Add to Cart Action */}
                <div className="pt-4 border-t border-[#3D1F12] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A89078] block">Price</span>
                    <span className="text-lg font-serif font-bold text-[#E5B887] tabular-nums">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="px-4 py-2 rounded-full bg-[#3D1F12] hover:bg-[#4D2817] text-[#F7EBE1] border border-[#5C321E] hover:border-[#D9A773] text-xs font-medium flex items-center gap-1.5 shadow-xs transition-all active:scale-[0.97]"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#D9A773]" />
                    <span>Order now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
