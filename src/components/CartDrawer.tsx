import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check, Bike, Store, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SafeImage } from './SafeImage';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    tax,
    deliveryFee,
    total,
    orderType,
    setOrderType,
    promoCode,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyPromoCode(couponInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) setCouponInput('');
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-[#1C0D06] border-l border-[#4E2818] shadow-2xl flex flex-col text-[#F7EBE1]">
          {/* Header */}
          <div className="p-4 px-6 bg-[#26130B] border-b border-[#3D1F12] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D9A773]" />
              <h2 className="text-base font-serif font-bold text-[#F7EBE1]">Your Order</h2>
              <span className="text-xs bg-[#3D1F12] text-[#E5B887] border border-[#522B19] px-2 py-0.5 rounded-full font-mono font-medium">
                {cart.reduce((s, c) => s + c.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-[#D5BFA8] hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fulfillment Mode Switcher */}
          <div className="p-3 bg-[#23120A] border-b border-[#3D1F12] shrink-0">
            <div className="grid grid-cols-3 gap-1 bg-[#1C0D06] p-1 rounded-xl text-xs border border-[#3D1F12]">
              <button
                type="button"
                onClick={() => setOrderType('pickup')}
                className={`py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'pickup'
                    ? 'bg-[#3D1F12] text-[#E5B887] font-bold border border-[#5C321E]'
                    : 'text-[#A89078] hover:text-[#F7EBE1]'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-[#D9A773]" />
                <span>Pickup</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('dine-in')}
                className={`py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'dine-in'
                    ? 'bg-[#3D1F12] text-[#E5B887] font-bold border border-[#5C321E]'
                    : 'text-[#A89078] hover:text-[#F7EBE1]'
                }`}
              >
                <Utensils className="w-3.5 h-3.5 text-[#D9A773]" />
                <span>Dine-In</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-1.5 px-2 rounded-lg font-medium flex items-center justify-center gap-1.5 transition-all ${
                  orderType === 'delivery'
                    ? 'bg-[#3D1F12] text-[#E5B887] font-bold border border-[#5C321E]'
                    : 'text-[#A89078] hover:text-[#F7EBE1]'
                }`}
              >
                <Bike className="w-3.5 h-3.5 text-[#D9A773]" />
                <span>Delivery</span>
              </button>
            </div>
            {orderType === 'delivery' && (
              <p className="text-[11px] text-[#A89078] mt-1.5 text-center">
                Free courier delivery on orders over $25.00
              </p>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#26130B] border border-[#3D1F12] flex items-center justify-center text-[#A89078]">
                  <ShoppingBag className="w-8 h-8 text-[#D9A773]/60" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[#F7EBE1]">
                  Your cup is empty
                </h3>
                <p className="text-xs text-[#A89078] max-w-xs">
                  Browse our handcrafted menu to discover freshly roasted single-origin coffees, lattes, and artisan treats.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    const el = document.getElementById('menu');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-2 px-6 py-2.5 rounded-full bg-[#D9A773] hover:bg-[#E5B887] text-[#1C0D06] text-xs font-bold shadow-md"
                >
                  Explore Coffee Menu
                </button>
              </div>
            ) : (
              cart.map((ci) => (
                <div
                  key={ci.cartItemId}
                  className="bg-[#2A150D] rounded-2xl p-3 border border-[#4E2818] flex gap-3 shadow-md hover:border-[#D9A773]/50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#1C0D06] shrink-0 relative">
                    <SafeImage
                      src={ci.item.image}
                      alt={ci.item.name}
                      className="w-full h-full object-cover"
                      fallbackTitle={ci.item.name}
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-serif font-bold text-[#F7EBE1] truncate">
                        {ci.item.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(ci.cartItemId)}
                        className="text-[#A89078] hover:text-red-400 transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization Details */}
                    <p className="text-[11px] text-[#A89078] line-clamp-1 mt-0.5">
                      {ci.options.size}
                      {ci.item.category !== 'Desserts' && ` · ${ci.options.milk}`}
                      {ci.options.extraShot && ' · +Extra Shot'}
                    </p>
                    {ci.options.notes && (
                      <p className="text-[10px] text-[#D9A773] italic truncate">
                        "{ci.options.notes}"
                      </p>
                    )}

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#3D1F12]">
                      <span className="text-xs font-semibold text-[#E5B887] tabular-nums">
                        ${(ci.unitPrice * ci.quantity).toFixed(2)}
                      </span>

                      <div className="flex items-center border border-[#4E2818] rounded-full bg-[#1C0D06]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(ci.cartItemId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-[#D5BFA8] hover:text-white"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold tabular-nums text-[#F7EBE1]">
                          {ci.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(ci.cartItemId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#D5BFA8] hover:text-white"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & checkout */}
          {cart.length > 0 && (
            <div className="p-4 bg-[#23120A] border-t border-[#4E2818] space-y-3 shrink-0">
              {/* Promo code form */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between bg-[#1C0D06] border border-emerald-700/60 px-3 py-1.5 rounded-xl text-xs text-emerald-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Check className="w-3.5 h-3.5" />
                      Promo '{promoCode}' active
                    </span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-[#A89078] hover:text-red-400 text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-[#A89078] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Promo code (e.g. BREW15)"
                        className="w-full pl-8 pr-2 py-1.5 text-xs rounded-full border border-[#4E2818] bg-[#1C0D06] text-[#F7EBE1] uppercase placeholder:normal-case placeholder:text-[#6D4C3D] focus:outline-none focus:ring-1 focus:ring-[#D9A773]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-full bg-[#3D1F12] text-[#F7EBE1] hover:bg-[#4D2817] border border-[#5C321E] text-xs font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <p className={`text-[11px] mt-1 ${promoMessage.isError ? 'text-red-400' : 'text-emerald-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Pricing breakdown */}
              <div className="space-y-1.5 text-xs text-[#D5BFA8] pt-1 border-t border-[#3D1F12]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#F7EBE1]">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-${discount.toFixed(2)}</span>
                  </div>
                )}
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Courier Delivery</span>
                    <span className="font-mono tabular-nums text-[#F7EBE1]">
                      {deliveryFee === 0 ? 'Free' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono tabular-nums text-[#F7EBE1]">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-serif font-bold text-base text-[#F7EBE1] pt-1.5 border-t border-[#3D1F12]">
                  <span>Order Total</span>
                  <span className="font-mono tabular-nums text-[#E5B887]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={handleOpenCheckout}
                className="w-full py-3.5 px-4 rounded-full bg-[#D9A773] hover:bg-[#E5B887] text-[#1C0D06] font-bold text-sm flex items-center justify-between shadow-xl transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <span className="flex items-center gap-1 font-mono">
                  ${total.toFixed(2)}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
