import React, { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { CoffeeItem } from '../data/coffeeData';
import { useCart, CustomOptions } from '../context/CartContext';
import { SafeImage } from './SafeImage';

interface CustomizeModalProps {
  item: CoffeeItem | null;
  onClose: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();

  const [size, setSize] = useState<CustomOptions['size']>('Regular');
  const [milk, setMilk] = useState<CustomOptions['milk']>('Whole Milk');
  const [sweetness, setSweetness] = useState<CustomOptions['sweetness']>('Standard');
  const [extraShot, setExtraShot] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  if (!item) return null;

  // Size price diff
  const sizeDiff = size === 'Large' ? 0.75 : size === 'Small' ? -0.35 : 0;
  const milkDiff = milk === 'Oat Milk' || milk === 'Almond Milk' ? 0.50 : 0;
  const shotDiff = extraShot ? 0.85 : 0;
  const unitPrice = Math.max(1.0, Math.round((item.price + sizeDiff + milkDiff + shotDiff) * 100) / 100);
  const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

  const isBeverage = item.category !== 'Desserts';

  const handleAdd = () => {
    addToCart(
      item,
      {
        size,
        milk: isBeverage ? milk : 'No Milk',
        sweetness: isBeverage ? sweetness : 'Standard',
        extraShot: isBeverage ? extraShot : false,
        notes: notes.trim() || undefined,
      },
      quantity
    );
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-lg bg-[#23120A] rounded-3xl shadow-2xl border border-[#4E2818] overflow-hidden flex flex-col max-h-[90vh] text-[#F7EBE1]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image preview */}
        <div className="relative h-44 bg-[#1C0D06] overflow-hidden shrink-0">
          <SafeImage
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover opacity-85"
            fallbackTitle={item.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#23120A] via-black/40 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 text-[#F7EBE1] hover:bg-black/80 flex items-center justify-center transition-colors backdrop-blur-xs border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-xs uppercase tracking-wider text-[#D9A773] font-semibold">
              {item.category} · {item.roast || 'Fresh Pastry'}
            </span>
            <h3 className="text-xl font-serif font-bold text-[#F7EBE1] leading-tight">
              {item.name}
            </h3>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          <p className="text-[#D5BFA8] leading-relaxed">
            {item.description}
          </p>

          {/* Flavor Notes */}
          {item.flavorNotes && item.flavorNotes.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap text-xs text-[#A89078] pt-1">
              <span className="font-semibold text-[#E5B887]">Tasting Notes:</span>
              {item.flavorNotes.map((note, idx) => (
                <span key={note} className="inline-flex items-center">
                  <span className="text-[#F7EBE1] font-medium">{note}</span>
                  {idx < item.flavorNotes.length - 1 && <span className="mx-1 text-[#4E2818]">·</span>}
                </span>
              ))}
            </div>
          )}

          {isBeverage && (
            <>
              {/* Cup Size */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#E5B887] mb-2">
                  Select Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Small', 'Regular', 'Large'] as const).map((s) => {
                    const priceLabel = s === 'Large' ? '+$0.75' : s === 'Small' ? '-$0.35' : 'Base';
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`p-2.5 rounded-2xl border text-center transition-all ${
                          size === s
                            ? 'border-[#D9A773] bg-[#3D1F12] text-[#F7EBE1] font-bold ring-2 ring-[#D9A773]/30'
                            : 'border-[#4E2818] bg-[#1C0D06] hover:border-[#5C321E] text-[#D5BFA8]'
                        }`}
                      >
                        <div className="text-xs font-medium">{s}</div>
                        <div className="text-[11px] text-[#A89078] tabular-nums">{priceLabel}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Milk Option */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#E5B887] mb-2">
                  Milk Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Whole Milk', 'Oat Milk', 'Almond Milk', 'No Milk'] as const).map((m) => {
                    const extra = m === 'Oat Milk' || m === 'Almond Milk' ? '+$0.50' : 'Included';
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMilk(m)}
                        className={`px-3 py-2 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          milk === m
                            ? 'border-[#D9A773] bg-[#3D1F12] text-[#F7EBE1] font-bold ring-2 ring-[#D9A773]/30'
                            : 'border-[#4E2818] bg-[#1C0D06] hover:border-[#5C321E] text-[#D5BFA8]'
                        }`}
                      >
                        <span className="text-xs truncate">{m}</span>
                        <span className="text-[11px] text-[#A89078] tabular-nums">{extra}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sweetness */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#E5B887] mb-2">
                  Sweetness
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['Unsweetened', 'Less Sweet', 'Standard', 'Extra Sweet'] as const).map((sw) => (
                    <button
                      key={sw}
                      type="button"
                      onClick={() => setSweetness(sw)}
                      className={`py-2 px-1 rounded-xl border text-center text-[11px] transition-all truncate ${
                        sweetness === sw
                          ? 'border-[#D9A773] bg-[#3D1F12] text-[#F7EBE1] font-bold ring-2 ring-[#D9A773]/30'
                          : 'border-[#4E2818] bg-[#1C0D06] hover:border-[#5C321E] text-[#D5BFA8]'
                      }`}
                    >
                      {sw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Espresso Shot */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setExtraShot(!extraShot)}
                  className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all ${
                    extraShot
                      ? 'border-[#D9A773] bg-[#3D1F12] text-[#F7EBE1] font-bold ring-2 ring-[#D9A773]/30'
                      : 'border-[#4E2818] bg-[#1C0D06] hover:border-[#5C321E] text-[#D5BFA8]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${extraShot ? 'bg-[#D9A773] border-[#D9A773] text-[#1C0D06]' : 'border-[#5C321E]'}`}>
                      {extraShot && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">Add Extra Espresso Shot</span>
                  </div>
                  <span className="text-xs text-[#E5B887] tabular-nums">+$0.85</span>
                </button>
              </div>
            </>
          )}

          {/* Barista Special Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#E5B887] mb-1.5">
              Barista Special Instructions
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Extra hot, light ice, warm pastry..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#4E2818] bg-[#1C0D06] text-[#F7EBE1] placeholder:text-[#6D4C3D] focus:outline-none focus:ring-2 focus:ring-[#D9A773]"
              maxLength={80}
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#1C0D06] border-t border-[#3D1F12] flex items-center justify-between gap-3 shrink-0">
          {/* Quantity stepper */}
          <div className="flex items-center border border-[#4E2818] rounded-full bg-[#23120A] p-1">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#D5BFA8] hover:text-white disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold tabular-nums text-[#F7EBE1]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#D5BFA8] hover:text-white"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to order CTA */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 py-3 px-5 rounded-full bg-[#D9A773] hover:bg-[#E5B887] text-[#1C0D06] font-bold text-sm flex items-center justify-between shadow-xl transition-all active:scale-[0.99]"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#1C0D06]" />
              <span>Add to Order</span>
            </span>
            <span className="font-mono font-bold text-[#1C0D06]">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
