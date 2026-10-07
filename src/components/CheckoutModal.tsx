import React, { useState } from 'react';
import { X, CheckCircle2, Coffee, Clock, MapPin, CreditCard, ShieldCheck, ArrowRight, Printer } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CAFE_INFO } from '../data/coffeeData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    subtotal,
    discount,
    tax,
    deliveryFee,
    total,
    orderType,
    promoCode,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<'form' | 'processing' | 'confirmed'>('form');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pickupTime, setPickupTime] = useState('In 10-15 minutes');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'digital' | 'counter'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.name = 'Full name is required';
    if (!customerEmail.trim() || !customerEmail.includes('@')) errs.email = 'Valid email is required';
    if (!customerPhone.trim() || customerPhone.length < 7) errs.phone = 'Valid phone is required';
    if (orderType === 'delivery' && !address.trim()) errs.address = 'Delivery address is required';
    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 12) {
        errs.card = 'Valid card number is required';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStep('processing');
    const randomOrder = 'BB-' + Math.floor(1000 + Math.random() * 9000);
    setOrderNumber(randomOrder);

    setTimeout(() => {
      setStep('confirmed');
    }, 1200);
  };

  const handleFinish = () => {
    clearCart();
    setStep('form');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-2xl bg-[#23120A] rounded-3xl shadow-2xl border border-[#4E2818] overflow-hidden flex flex-col max-h-[92vh] text-[#F7EBE1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-4 px-6 bg-[#1C0D06] text-[#F7EBE1] border-b border-[#3D1F12] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2A150D] border border-[#4E2818] flex items-center justify-center text-[#D9A773]">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white">
                {step === 'confirmed' ? 'Order Confirmed!' : 'Brew & Bean Checkout'}
              </h2>
              <p className="text-[11px] text-[#A89078]">
                {step === 'confirmed'
                  ? `Receipt for Order #${orderNumber}`
                  : `${orderType === 'delivery' ? 'Courier Delivery' : orderType === 'dine-in' ? 'Dine-In Table Order' : 'Store Pickup'} · ${cart.length} unique items`}
              </p>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              onClick={step === 'confirmed' ? handleFinish : onClose}
              className="text-[#A89078] hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {step === 'processing' && (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#4E2818] border-t-[#D9A773] animate-spin mx-auto" />
              <h3 className="text-lg font-serif font-semibold text-[#F7EBE1]">
                Connecting with Brew Barista...
              </h3>
              <p className="text-xs text-[#A89078] max-w-sm mx-auto">
                Transmitting order details, reserving freshly roasted beans, and preparing preparation queue.
              </p>
            </div>
          )}

          {step === 'confirmed' && (
            <div className="space-y-6 py-2">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-[#1C0D06] border border-emerald-600 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                  Payment & Ticket Approved
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#F7EBE1]">
                  Thank you, {customerName}!
                </h3>
                <p className="text-xs text-[#D5BFA8] max-w-md mx-auto">
                  Your ticket has been sent straight to our espresso bar. We'll send a live notification to <span className="font-semibold text-white">{customerEmail}</span> once your order is ready.
                </p>
              </div>

              {/* Order Status Timeline Card */}
              <div className="p-4 rounded-2xl bg-[#1C0D06] border border-[#4E2818] space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-[#3D1F12] pb-2">
                  <span className="text-[#A89078]">Order Number</span>
                  <span className="font-mono font-bold text-[#E5B887] text-sm">{orderNumber}</span>
                </div>
                <div className="flex items-center justify-between text-xs border-b border-[#3D1F12] pb-2">
                  <span className="text-[#A89078]">Estimated Ready Time</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {pickupTime}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A89078]">Location</span>
                  <span className="font-medium text-[#F7EBE1] text-right">
                    {orderType === 'delivery' ? address : CAFE_INFO.address}
                  </span>
                </div>
              </div>

              {/* Itemized Receipt */}
              <div className="bg-[#2A150D] p-4 rounded-2xl border border-[#4E2818] space-y-2 text-xs">
                <div className="font-semibold text-[#E5B887] uppercase tracking-wider text-[11px] mb-2">
                  Receipt Summary
                </div>
                {cart.map((ci) => (
                  <div key={ci.cartItemId} className="flex justify-between items-start text-[#D5BFA8]">
                    <div>
                      <span className="font-medium text-[#F7EBE1]">{ci.quantity} × {ci.item.name}</span>
                      <span className="text-[#A89078] text-[11px] block">
                        {ci.options.size} · {ci.options.milk}
                      </span>
                    </div>
                    <span className="font-mono tabular-nums text-[#F7EBE1]">
                      ${(ci.unitPrice * ci.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#3D1F12] pt-2 mt-2 space-y-1 text-[#A89078]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums text-[#F7EBE1]">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Voucher Discount</span>
                      <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  {deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="font-mono tabular-nums text-[#F7EBE1]">${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span className="font-mono tabular-nums text-[#F7EBE1]">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#F7EBE1] border-t border-[#3D1F12] pt-1.5 mt-1">
                    <span>Total Paid</span>
                    <span className="font-mono tabular-nums text-[#E5B887]">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-full border border-[#4E2818] bg-[#1C0D06] hover:bg-[#2A150D] text-[#F7EBE1] text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Receipt
                </button>
                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex-1 py-2.5 px-4 rounded-full bg-[#D9A773] hover:bg-[#E5B887] text-[#1C0D06] text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Done / Back to Cafe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              {/* Customer Contact */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#E5B887] flex items-center gap-1.5">
                  <span>1. Contact Details</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#D5BFA8] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-[#1C0D06] text-[#F7EBE1] placeholder:text-[#6D4C3D] focus:outline-none focus:ring-2 focus:ring-[#D9A773] ${
                        errors.name ? 'border-red-500' : 'border-[#4E2818]'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-red-400 mt-0.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#D5BFA8] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="eleanor@example.com"
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-[#1C0D06] text-[#F7EBE1] placeholder:text-[#6D4C3D] focus:outline-none focus:ring-2 focus:ring-[#D9A773] ${
                        errors.email ? 'border-red-500' : 'border-[#4E2818]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-red-400 mt-0.5">{errors.email}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#D5BFA8] mb-1">
                      Phone Number * (for barista SMS pickup alert)
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-[#1C0D06] text-[#F7EBE1] placeholder:text-[#6D4C3D] focus:outline-none focus:ring-2 focus:ring-[#D9A773] ${
                        errors.phone ? 'border-red-500' : 'border-[#4E2818]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-red-400 mt-0.5">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Fulfillment Option */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#E5B887] flex items-center gap-1.5">
                  <span>2. Fulfillment & Timing</span>
                </h3>

                {orderType === 'delivery' ? (
                  <div>
                    <label className="block text-xs font-medium text-[#D5BFA8] mb-1">
                      Delivery Street Address & Apt *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-[#A89078] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="742 Evergreen Terrace, Apt 3B"
                        className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-[#1C0D06] text-[#F7EBE1] placeholder:text-[#6D4C3D] focus:outline-none focus:ring-2 focus:ring-[#D9A773] ${
                          errors.address ? 'border-red-500' : 'border-[#4E2818]'
                        }`}
                      />
                    </div>
                    {errors.address && <p className="text-[11px] text-red-400 mt-0.5">{errors.address}</p>}
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-[#D5BFA8] mb-1">
                      {orderType === 'dine-in' ? 'Seating Status' : 'Pickup Time Slot'}
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#4E2818] bg-[#1C0D06] text-[#F7EBE1] focus:outline-none focus:ring-2 focus:ring-[#D9A773]"
                    >
                      <option value="In 10-15 minutes">As soon as possible (~10-15 min)</option>
                      <option value="In 30 minutes">In 30 minutes</option>
                      <option value="In 45 minutes">In 45 minutes</option>
                      <option value="Schedule for 12:00 PM lunch">Schedule for 12:00 PM</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#E5B887] flex items-center gap-1.5">
                  <span>3. Payment Method</span>
                </h3>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#D9A773] bg-[#3D1F12] font-semibold text-[#F7EBE1]'
                        : 'border-[#4E2818] bg-[#1C0D06] text-[#A89078] hover:border-[#5C321E]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1 text-[#D9A773]" />
                    <span className="text-[11px]">Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('digital')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'digital'
                        ? 'border-[#D9A773] bg-[#3D1F12] font-semibold text-[#F7EBE1]'
                        : 'border-[#4E2818] bg-[#1C0D06] text-[#A89078] hover:border-[#5C321E]'
                    }`}
                  >
                    <span className="text-xs font-bold block mb-1">Pay / GPay</span>
                    <span className="text-[11px]">1-Tap Wallet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('counter')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      paymentMethod === 'counter'
                        ? 'border-[#D9A773] bg-[#3D1F12] font-semibold text-[#F7EBE1]'
                        : 'border-[#4E2818] bg-[#1C0D06] text-[#A89078] hover:border-[#5C321E]'
                    }`}
                  >
                    <Coffee className="w-4 h-4 mx-auto mb-1 text-[#D9A773]" />
                    <span className="text-[11px]">Pay at Bar</span>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-[#1C0D06] rounded-xl border border-[#4E2818] space-y-2">
                    <div>
                      <label className="block text-[11px] font-medium text-[#A89078] mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 •••• •••• 8821"
                        maxLength={19}
                        className={`w-full px-3 py-1.5 text-xs rounded-lg border bg-[#23120A] text-[#F7EBE1] font-mono ${
                          errors.card ? 'border-red-500' : 'border-[#4E2818]'
                        }`}
                      />
                      {errors.card && <p className="text-[11px] text-red-400 mt-0.5">{errors.card}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-medium text-[#A89078] mb-1">Expires</label>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          placeholder="MM / YY"
                          maxLength={5}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#4E2818] bg-[#23120A] text-[#F7EBE1] font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[#A89078] mb-1">CVC / CVV</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#4E2818] bg-[#23120A] text-[#F7EBE1] font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'digital' && (
                  <div className="p-3 bg-[#1C0D06] rounded-xl border border-[#4E2818] text-xs text-[#D5BFA8] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Your device wallet biometric authorization will be requested when you confirm below.</span>
                  </div>
                )}

                {paymentMethod === 'counter' && (
                  <div className="p-3 bg-[#1C0D06] rounded-xl border border-[#4E2818] text-xs text-[#D5BFA8] flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-[#D9A773] shrink-0" />
                    <span>You can pay with Cash, Card or Mobile tap directly when picking up at the barista counter.</span>
                  </div>
                )}
              </div>

              {/* Order summary bar */}
              <div className="p-3 bg-[#2A150D] rounded-xl border border-[#4E2818] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#A89078] block">Total amount due:</span>
                  {promoCode && <span className="text-[11px] text-emerald-400">Promo: {promoCode} applied</span>}
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-serif text-[#E5B887] tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-full bg-[#D9A773] hover:bg-[#E5B887] text-[#1C0D06] font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.99]"
              >
                <ShieldCheck className="w-4 h-4 text-[#1C0D06]" />
                <span>Confirm & Place Order (${total.toFixed(2)})</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
