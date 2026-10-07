import React, { createContext, useContext, useState, useEffect } from 'react';
import { CoffeeItem } from '../data/coffeeData';

export interface CustomOptions {
  size: 'Small' | 'Regular' | 'Large';
  milk: 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'No Milk';
  sweetness: 'Standard' | 'Less Sweet' | 'Unsweetened' | 'Extra Sweet';
  extraShot: boolean;
  notes?: string;
}

export interface CartItem {
  cartItemId: string;
  item: CoffeeItem;
  quantity: number;
  options: CustomOptions;
  unitPrice: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CoffeeItem, options?: Partial<CustomOptions>, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orderType: 'pickup' | 'dine-in' | 'delivery';
  setOrderType: (type: 'pickup' | 'dine-in' | 'delivery') => void;
  promoCode: string;
  discount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  totalItemsCount: number;
  toastMessage: string | null;
  clearToast: () => void;
}

const defaultOptions: CustomOptions = {
  size: 'Regular',
  milk: 'Whole Milk',
  sweetness: 'Standard',
  extraShot: false,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('brew_bean_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderType, setOrderType] = useState<'pickup' | 'dine-in' | 'delivery'>('pickup');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('brew_bean_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  const calculateItemUnitPrice = (basePrice: number, opts: CustomOptions): number => {
    let price = basePrice;
    if (opts.size === 'Large') price += 0.75;
    if (opts.size === 'Small') price -= 0.35;
    if (opts.milk === 'Oat Milk' || opts.milk === 'Almond Milk') price += 0.50;
    if (opts.extraShot) price += 0.85;
    return Math.max(1.0, Math.round(price * 100) / 100);
  };

  const addToCart = (item: CoffeeItem, options?: Partial<CustomOptions>, quantity: number = 1) => {
    const finalOptions: CustomOptions = { ...defaultOptions, ...options };
    const unitPrice = calculateItemUnitPrice(item.price, finalOptions);

    const optionKey = `${item.id}-${finalOptions.size}-${finalOptions.milk}-${finalOptions.sweetness}-${finalOptions.extraShot}`;
    
    setCart((prev) => {
      const existingIdx = prev.findIndex((ci) => ci.cartItemId === optionKey);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: optionKey,
          item,
          quantity,
          options: finalOptions,
          unitPrice,
        },
      ];
    });

    setToastMessage(`Added ${quantity} × ${item.name} to your order!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.cartItemId === cartItemId) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const sanitized = code.trim().toUpperCase();
    if (sanitized === 'BREW15') {
      setPromoCode(sanitized);
      setDiscountPercent(0.15);
      setDiscountAmount(0);
      return { success: true, message: '15% discount applied successfully!' };
    }
    if (sanitized === 'FIRSTSIP') {
      setPromoCode(sanitized);
      setDiscountAmount(3.0);
      setDiscountPercent(0);
      return { success: true, message: '$3.00 welcome voucher applied!' };
    }
    if (sanitized === 'FREESHIP') {
      setPromoCode(sanitized);
      setDiscountPercent(0);
      setDiscountAmount(0);
      return { success: true, message: 'Free courier delivery unlocked!' };
    }
    return { success: false, message: 'Invalid promo code. Try "BREW15" or "FIRSTSIP".' };
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
    setDiscountAmount(0);
  };

  const clearToast = () => setToastMessage(null);

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const calculatedDiscount = discountPercent > 0 
    ? subtotal * discountPercent 
    : Math.min(subtotal, discountAmount);
  
  const deliveryFee = orderType === 'delivery' 
    ? (promoCode === 'FREESHIP' || subtotal >= 25 ? 0 : 2.99)
    : 0;

  const tax = Math.round((subtotal - calculatedDiscount) * 0.08 * 100) / 100;
  const total = Math.max(0, Math.round((subtotal - calculatedDiscount + deliveryFee + tax) * 100) / 100);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orderType,
        setOrderType,
        promoCode,
        discount: calculatedDiscount,
        applyPromoCode,
        removePromoCode,
        subtotal,
        tax,
        deliveryFee,
        total,
        totalItemsCount,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
