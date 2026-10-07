/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { PopularSection } from './components/PopularSection';
import { OfferSection } from './components/OfferSection';
import { MenuSection } from './components/MenuSection';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CustomizeModal } from './components/CustomizeModal';
import { CoffeeItem } from './data/coffeeData';
import { Check, X } from 'lucide-react';

function CoffeeShopApp() {
  const [activeSection, setActiveSection] = useState('home');
  const [customizingItem, setCustomizingItem] = useState<CoffeeItem | null>(null);
  const { toastMessage, clearToast, isCheckoutOpen, setIsCheckoutOpen, setIsCartOpen } = useCart();

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      const topOffset = 80;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Scroll spy to highlight active section in Navbar
  useEffect(() => {
    const sections = ['home', 'popular', 'offers', 'menu', 'about', 'contact'];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#1C0D06] text-[#F7EBE1] flex flex-col font-sans selection:bg-[#D9A773] selection:text-[#1C0D06]">
      {/* Navigation */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Home / Hero Section */}
        <div id="home">
          <Hero
            onOrderNow={() => {
              const el = document.getElementById('menu');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreMenu={() => handleNavigate('menu')}
          />
        </div>

        {/* Popular Items ("Delight In a new mix of the Coffee World") */}
        <PopularSection onCustomizeItem={(item) => setCustomizingItem(item)} />

        {/* Special Roasts Offer Banner ("Offer Up To 50% off") */}
        <OfferSection onShopNow={() => handleNavigate('menu')} />

        {/* Handcrafted Coffee & Food Menu */}
        <MenuSection onCustomizeItem={(item) => setCustomizingItem(item)} />

        {/* About Us Story & Barista Craft */}
        <About />

        {/* Customer Reviews & Testimonials Carousel */}
        <Testimonials />

        {/* Contact Us, Hours & Location */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Slide-out Shopping Cart Drawer */}
      <CartDrawer />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Item Customization Modal */}
      <CustomizeModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
      />

      {/* Floating Cart Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#2A150D] text-[#F7EBE1] px-4 py-3 rounded-full shadow-2xl border border-[#4E2818] animate-in slide-in-from-bottom-5 duration-300">
          <div className="w-6 h-6 rounded-full bg-[#D9A773] text-[#1C0D06] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs font-medium text-[#F7EBE1]">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="text-xs underline text-[#E5B887] font-bold hover:text-[#F7EBE1] ml-1"
          >
            View
          </button>
          <button
            type="button"
            onClick={clearToast}
            className="text-[#A89078] hover:text-white p-1 ml-1"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <CoffeeShopApp />
    </CartProvider>
  );
}
