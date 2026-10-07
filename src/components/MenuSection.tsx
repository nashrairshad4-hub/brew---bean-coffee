import React, { useState, useMemo } from 'react';
import { Search, Plus, SlidersHorizontal, Star, Coffee, Sparkles } from 'lucide-react';
import { COFFEE_MENU, CATEGORIES, Category, CoffeeItem } from '../data/coffeeData';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

interface MenuSectionProps {
  onCustomizeItem: (item: CoffeeItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onCustomizeItem }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return COFFEE_MENU.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.flavorNotes.some((n) =>
          n.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-24 bg-[#1F0F08] border-y border-[#3D1F12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E5B887] mb-2 px-3 py-1 rounded-full bg-[#2A150D] border border-[#4D2817]">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A773]" />
            <span>Artisanal Coffee & Bakes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7EBE1] tracking-tight">
            Our Handcrafted Menu
          </h2>
          <p className="mt-3 text-[#D5BFA8] text-sm sm:text-base">
            Every drink is pulled fresh to order with precision roast profiles and uncompromised organic ingredients.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 mb-10">
          {/* Search Input */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[#A89078] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by beverage name or tasting note..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-full border border-[#4E2818] bg-[#2A150D] text-[#F7EBE1] placeholder:text-[#A89078] focus:outline-none focus:ring-2 focus:ring-[#D9A773] shadow-md"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-2.5 text-xs text-[#A89078] hover:text-[#F7EBE1]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none px-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === 'All'
                  ? COFFEE_MENU.length
                  : COFFEE_MENU.filter((i) => i.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-[#D9A773] text-[#1C0D06] shadow-md font-bold'
                      : 'bg-[#2A150D] hover:bg-[#381D12] text-[#D5BFA8] border border-[#4E2818]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected
                        ? 'bg-[#1C0D06] text-[#D9A773]'
                        : 'bg-[#1C0D06] text-[#A89078]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-[#2A150D] rounded-2xl border border-[#4E2818] p-8 max-w-md mx-auto">
            <Coffee className="w-10 h-10 text-[#5C321E] mx-auto" />
            <h3 className="font-serif text-lg font-bold text-[#F7EBE1]">
              No coffee matches found
            </h3>
            <p className="text-xs text-[#D5BFA8]">
              We couldn't find any drinks matching "{searchQuery}". Try selecting another category or resetting your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2 rounded-full bg-[#D9A773] text-[#1C0D06] text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#2A150D] rounded-2xl border border-[#4E2818] overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#D9A773]/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Image area */}
                <div>
                  <div className="relative aspect-4/3 bg-[#1C0D06] overflow-hidden">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fallbackTitle={item.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2A150D] via-transparent to-transparent pointer-events-none" />

                    {/* Metadata Header */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] uppercase font-bold text-[#F7EBE1] bg-[#1C0D06]/80 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-[#4E2818]">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1 bg-[#1C0D06]/85 backdrop-blur-xs px-2 py-0.5 rounded-full border border-[#4E2818] text-[11px] font-bold text-[#E5B887]">
                        <Star className="w-3 h-3 fill-[#D9A773] text-[#D9A773]" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    {/* Quick customize overlay button */}
                    <button
                      type="button"
                      onClick={() => onCustomizeItem(item)}
                      className="absolute bottom-2.5 right-2.5 px-3 py-1 rounded-full bg-[#1C0D06]/90 hover:bg-[#1C0D06] text-[#F7EBE1] border border-[#5C321E] text-[11px] font-medium flex items-center gap-1 shadow-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <SlidersHorizontal className="w-3 h-3 text-[#D9A773]" />
                      <span>Custom</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-serif font-bold text-[#F7EBE1] group-hover:text-[#E5B887] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#C5B099] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Tasting notes */}
                    <div className="mt-2 text-[11px] text-[#A89078] truncate">
                      <span className="font-semibold text-[#D5BFA8]">Tasting: </span>
                      <span>{item.flavorNotes.join(', ')}</span>
                    </div>
                  </div>
                </div>

                {/* Footer price and quick add */}
                <div className="p-4 pt-0 mt-2 border-t border-[#3D1F12] flex items-center justify-between">
                  <div>
                    <span className="text-base font-serif font-bold text-[#E5B887] tabular-nums">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.prepTime && (
                      <span className="text-[10px] text-[#A89078] block">
                        Prep: {item.prepTime}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="p-2.5 rounded-full bg-[#3D1F12] hover:bg-[#4D2817] text-[#F7EBE1] border border-[#5C321E] hover:border-[#D9A773] flex items-center justify-center transition-all active:scale-95 shadow-xs"
                    aria-label={`Add ${item.name} to order`}
                    title={`Add ${item.name} to order`}
                  >
                    <Plus className="w-4 h-4 text-[#D9A773]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
