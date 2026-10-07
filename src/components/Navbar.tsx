import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'popular', label: 'Popular' },
    { id: 'offers', label: 'Offers' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#1C0D06]/95 backdrop-blur-md shadow-lg border-b border-[#4D2817]/70 py-3.5'
            : 'bg-[#1C0D06]/85 backdrop-blur-xs border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single text element wordmark */}
            <button
              type="button"
              onClick={() => handleLinkClick('home')}
              className="group flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A773] rounded-lg"
            >
              <div className="w-8 h-8 rounded-lg bg-[#2E170E] text-[#E5B887] border border-[#522B19] flex items-center justify-center transition-transform group-hover:scale-105 shadow-inner">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#F7EBE1] whitespace-nowrap">
                Brew & Bean Coffee
              </span>
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#D5BFA8]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative py-1 whitespace-nowrap transition-colors hover:text-[#F7EBE1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A773] rounded ${
                      isActive ? 'text-[#E5B887] font-semibold' : 'text-[#D5BFA8]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9A773] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Cart & Action */}
            <div className="flex items-center gap-3">
              {/* Shopping Cart button with counter badge */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl border border-[#4D2817] bg-[#2A150D] hover:bg-[#381D12] text-[#F7EBE1] transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A773]"
                aria-label={`View cart with ${totalItemsCount} items`}
              >
                <ShoppingBag className="w-5 h-5 text-[#E5B887]" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#D9A773] text-[#1C0D06] text-[11px] font-bold rounded-full flex items-center justify-center shadow-xs animate-in zoom-in-50">
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Order Now CTA pill button matching uploaded image style */}
              <button
                type="button"
                onClick={() => handleLinkClick('menu')}
                className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#F7EBE1] bg-[#2F180E] hover:bg-[#3D2013] border border-[#5C321E] hover:border-[#D9A773] rounded-full transition-all shadow-xs active:scale-[0.98] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A773]"
              >
                Order Now
              </button>

              {/* Mobile hamburger menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-[#F7EBE1] hover:bg-[#2A150D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9A773]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#22110A] border-b border-[#4D2817] px-6 py-5 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#331A10] text-[#E5B887] font-semibold border border-[#4D2817]'
                      : 'text-[#D5BFA8] hover:bg-[#2A150D]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#4D2817] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full py-2.5 px-3 rounded-xl border border-[#4D2817] bg-[#2A150D] text-[#F7EBE1] text-xs font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#E5B887]" />
                <span>View Cart ({totalItemsCount} items)</span>
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick('menu')}
                className="w-full py-2.5 px-3 rounded-full bg-[#D9A773] text-[#1C0D06] text-xs font-bold uppercase tracking-wider text-center"
              >
                Explore Full Menu
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed top navbar */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
};
