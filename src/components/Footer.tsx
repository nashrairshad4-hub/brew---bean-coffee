import React, { useState } from 'react';
import { Coffee, Instagram, Facebook, Twitter, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#120602] text-[#F7EBE1] pt-16 pb-12 border-t border-[#3D1F12] relative overflow-hidden">
      {/* Background ambient dark warmth */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#381D12]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#2C160D]">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2A150D] text-[#D9A773] border border-[#4E2818] flex items-center justify-center">
                <Coffee className="w-4 h-4" />
              </div>
              <span className="font-serif italic text-2xl font-bold tracking-tight text-[#F7EBE1]">
                Brew & Bean Coffee
              </span>
            </div>

            <p className="text-xs text-[#D5BFA8] max-w-sm leading-relaxed">
              Brew & Bean Coffee is an artisan coffee roastery and bar that offers the widest selection of specialty coffees from around the world. From medium-dark roast single origins to flavored espresso blends, ethically sourced to tantalize every cup.
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1C0D06] hover:bg-[#2A150D] border border-[#4E2818] text-[#D5BFA8] hover:text-[#E5B887] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1C0D06] hover:bg-[#2A150D] border border-[#4E2818] text-[#D5BFA8] hover:text-[#E5B887] flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#1C0D06] hover:bg-[#2A150D] border border-[#4E2818] text-[#D5BFA8] hover:text-[#E5B887] flex items-center justify-center transition-colors"
                aria-label="X Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5B887]">
              About
            </h4>
            <ul className="space-y-2 text-xs text-[#D5BFA8]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#F7EBE1] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#F7EBE1] transition-colors"
                >
                  Our Heritage
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#F7EBE1] transition-colors"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('popular')}
                  className="hover:text-[#F7EBE1] transition-colors"
                >
                  Features & Popular
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('offers')}
                  className="hover:text-[#F7EBE1] transition-colors"
                >
                  Special Offers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Roastery Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5B887]">
              Company & Hours
            </h4>
            <div className="space-y-2 text-xs text-[#D5BFA8]">
              <div>
                <span className="text-[#F7EBE1] block font-medium">Monday – Friday</span>
                <span className="text-[#A89078]">6:30 AM – 8:00 PM</span>
              </div>
              <div>
                <span className="text-[#F7EBE1] block font-medium">Saturday – Sunday</span>
                <span className="text-[#A89078]">7:30 AM – 9:00 PM</span>
              </div>
              <p className="text-[11px] text-[#D9A773] pt-1">
                *Kitchen closes 30 mins prior to bar
              </p>
            </div>
          </div>

          {/* Col 5: Coffee Club Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5B887]">
              Contact Us
            </h4>
            <p className="text-xs text-[#D5BFA8] leading-relaxed">
              {CAFE_INFO.address}
            </p>
            <p className="text-xs text-[#E5B887]">
              {CAFE_INFO.phone}
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-[#D9A773] text-xs py-2 bg-[#2A150D] px-3 rounded-xl border border-[#4E2818]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A89078] absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email..."
                    required
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-full bg-[#1C0D06] border border-[#4E2818] text-[#F7EBE1] placeholder:text-[#6D4C3D] focus:outline-none focus:ring-1 focus:ring-[#D9A773]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-full bg-[#D9A773] hover:bg-[#E5B887] text-[#1C0D06] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A89078] gap-3">
          <p>© {new Date().getFullYear()} {CAFE_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[#A89078]">
            <span>Fresh Coffee, Made With Love</span>
            <span>·</span>
            <span>Seattle, WA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
