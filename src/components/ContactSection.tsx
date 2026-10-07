import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Instagram, Facebook, Twitter, Wifi, Coffee, Sparkles } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [inquiryType, setInquiryType] = useState('General');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please provide a valid email';
    if (!phone.trim()) errs.phone = 'Please provide a phone number';
    if (!message.trim() || message.length < 5) errs.message = 'Please enter a message (at least 5 characters)';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setInquiryType('General');
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#1C0D06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E5B887] mb-2 px-3 py-1 rounded-full bg-[#2A150D] border border-[#4E2818]">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A773]" />
            <span>Visit Us or Say Hello</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#F7EBE1] tracking-tight">
            Connect With Our Baristas
          </h2>
          <p className="mt-3 text-[#D5BFA8] text-sm sm:text-base">
            Drop by our sunlit neighborhood bar, inquire about whole-bean coffee subscriptions, or book our cozy mezzanine for private tastings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-[#2A150D] border border-[#4E2818] shadow-xl space-y-4">
              <h3 className="text-lg font-serif font-bold text-[#F7EBE1]">
                Brew & Bean Specialty Coffee
              </h3>

              <div className="space-y-3.5 text-xs text-[#D5BFA8]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1C0D06] text-[#D9A773] border border-[#4E2818] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#F7EBE1] block text-xs">Roastery & Coffee Bar</span>
                    <span>{CAFE_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1C0D06] text-[#D9A773] border border-[#4E2818] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#F7EBE1] block text-xs">Barista Hotline</span>
                    <span>{CAFE_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1C0D06] text-[#D9A773] border border-[#4E2818] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#F7EBE1] block text-xs">Email Desk</span>
                    <span>{CAFE_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1C0D06] text-[#D9A773] border border-[#4E2818] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-[#F7EBE1] block text-xs">Opening Hours</span>
                    <span>{CAFE_INFO.hours.weekdays}</span>
                    <span className="block">{CAFE_INFO.hours.weekends}</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-[#3D1F12]">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#A89078] block mb-2.5">
                  Follow Our Brew Journey
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full border border-[#4E2818] bg-[#1C0D06] hover:bg-[#381D12] text-[#F7EBE1] flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 text-[#D9A773]" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full border border-[#4E2818] bg-[#1C0D06] hover:bg-[#381D12] text-[#F7EBE1] flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 text-[#D9A773]" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-full border border-[#4E2818] bg-[#1C0D06] hover:bg-[#381D12] text-[#F7EBE1] flex items-center justify-center transition-colors"
                    aria-label="X Twitter"
                  >
                    <Twitter className="w-4 h-4 text-[#D9A773]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Cafe Amenities Badge Card */}
            <div className="p-4 rounded-2xl bg-[#2A150D]/80 border border-[#4E2818] flex items-center justify-between text-xs text-[#D5BFA8]">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-[#D9A773]" />
                <span>Fiber WiFi</span>
              </div>
              <div className="text-[#4E2818]">·</div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-[#D9A773]" />
                <span>Oat & Almond</span>
              </div>
              <div className="text-[#4E2818]">·</div>
              <span>Dog Friendly Patio</span>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#2A150D] rounded-3xl border border-[#4E2818] p-6 sm:p-8 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#1C0D06] border border-[#D9A773] text-[#D9A773] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#F7EBE1]">
                    Message Received!
                  </h3>
                  <p className="text-xs text-[#D5BFA8] max-w-sm mx-auto">
                    Thank you, {name}. Our head roaster will review your {inquiryType.toLowerCase()} note and reply to {email} within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#D9A773] text-[#1C0D06] text-xs font-bold hover:bg-[#E5B887] transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="border-b border-[#3D1F12] pb-3 mb-2">
                    <h3 className="text-base font-serif font-bold text-[#F7EBE1]">
                      Send Us a Message
                    </h3>
                    <p className="text-[11px] text-[#A89078] mt-0.5">
                      Have questions about our single-origin roasts, catering, or private bookings?
                    </p>
                  </div>

                  {/* Inquiry category selector */}
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#D5BFA8] mb-1.5">
                      Inquiry Topic
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['General', 'Catering', 'Wholesale', 'Table Reserve'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setInquiryType(type)}
                          className={`py-2 px-2 rounded-full border text-center transition-all truncate text-[11px] ${
                            inquiryType === type
                              ? 'border-[#D9A773] bg-[#3D1F12] text-[#E5B887] font-bold'
                              : 'border-[#4E2818] bg-[#1C0D06] text-[#A89078] hover:border-[#5C321E]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-[#D5BFA8] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Thomas Keller"
                        className={`w-full px-3 py-2.5 rounded-xl border bg-[#1C0D06] text-[#F7EBE1] placeholder:text-[#6D4C3D] focus:outline-none focus:ring-2 focus:ring-[#D9A773] ${
                          errors.name ? 'border-red-500' : 'border-[#4E2818]'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-400 mt-0.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block font-medium text-[#D5BFA8] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="thomas@example.com"
                        className={`w-full px-3 py-2.5 rounded-xl border bg-[#1C0D06] text-[#F7EBE1] placeholder:text-[#6D4C3D] focus:outline-none focus:ring-2 focus:ring-[#D9A773] ${
                          errors.email ? 'border-red-500' : 'border-[#4E2818]'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-400 mt-0.5">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-[#D5BFA8] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (206) 555-0144"
                      className={`w-full px-3 py-2.5 rounded-xl border bg-[#1C0D06] text-[#F7EBE1] placeholder:text-[#6D4C3D] focus:outline-none focus:ring-2 focus:ring-[#D9A773] ${
                        errors.phone ? 'border-red-500' : 'border-[#4E2818]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-0.5">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block font-medium text-[#D5BFA8] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you're thinking or inquire about our roasts..."
                      className={`w-full px-3 py-2.5 rounded-xl border bg-[#1C0D06] text-[#F7EBE1] placeholder:text-[#6D4C3D] focus:outline-none focus:ring-2 focus:ring-[#D9A773] ${
                        errors.message ? 'border-red-500' : 'border-[#4E2818]'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-400 mt-0.5">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-full bg-[#D9A773] hover:bg-[#E5B887] text-[#1C0D06] font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99]"
                  >
                    <Send className="w-3.5 h-3.5 text-[#1C0D06]" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
