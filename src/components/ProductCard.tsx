'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, ShoppingBag, Zap, ShieldAlert, Sparkles, Check } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, setIsCheckoutOpen } = useStore();
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const success = addToCart(product, 1);
    if (success) {
      setIsAddedRecently(true);
      setTimeout(() => setIsAddedRecently(false), 2000);
    }
  };

  const handleQuickOrder = () => {
    if (isOutOfStock) return;
    addToCart(product, 1);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="group relative rounded-2xl bg-white border border-[#0D2B55]/10 hover:border-[#D4AF37]/60 p-4 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
      
      {/* Product Image */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-[#F8F5EE]">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isOutOfStock ? 'grayscale contrast-75 opacity-60' : ''
          }`}
          loading="lazy"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && !isOutOfStock && (
            <span className="px-2.5 py-1 rounded-full bg-[#0D2B55] text-[#D4AF37] text-xs font-black shadow-md flex items-center gap-1 border border-[#D4AF37]/30">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              خصم {discountPercent}%
            </span>
          )}

          {isOutOfStock ? (
            <span className="px-3 py-1 rounded-full bg-red-100 border border-red-300 text-red-700 text-xs font-bold shadow-sm flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              نفد من المخزون
            </span>
          ) : isLowStock ? (
            <span className="px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black shadow-sm animate-pulse">
              متبقي {product.stock} فقط!
            </span>
          ) : null}
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center p-4">
            <div className="bg-white/95 border border-red-300 shadow-md rounded-xl px-4 py-2 text-center">
              <p className="text-red-600 font-bold text-sm">مغلق مؤقتاً</p>
              <p className="text-slate-500 text-xs">سيتم توفيره قريباً</p>
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold px-2 py-0.5 rounded-md bg-[#E6F0FF] text-[#0D2B55] border border-[#0D2B55]/10">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span className="font-bold text-[#0D2B55]">{product.rating}</span>
              <span className="text-slate-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-black text-[#0D2B55] group-hover:text-[#0D2B55]/80 transition-colors mt-2">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            {product.nameEn}
          </p>

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Stock info */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#0D2B55]">
                {product.price}
              </span>
              <span className="text-xs font-bold text-slate-500">ج.م</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {product.originalPrice} ج.م
                </span>
              )}
            </div>
            
            {!isOutOfStock && (
              <span className="text-[11px] font-bold text-emerald-800 bg-[#A7C4A0]/25 border border-[#A7C4A0]/40 px-2 py-0.5 rounded-full">
                متاح بالمخزن
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : isAddedRecently
                ? 'bg-emerald-600 text-white font-black'
                : 'bg-[#E6F0FF] hover:bg-[#D4AF37]/20 text-[#0D2B55] border border-[#0D2B55]/15 hover:border-[#D4AF37]'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>أُضيف للسلة</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#0D2B55]" />
                <span>أضف للسلة</span>
              </>
            )}
          </button>

          {/* Quick Buy */}
          <button
            onClick={handleQuickOrder}
            disabled={isOutOfStock}
            className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                : 'bg-[#0D2B55] hover:bg-[#091F3D] text-white hover:text-[#D4AF37] border border-[#0D2B55] shadow-md hover:shadow-lg active:scale-95'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span>طلب فوري</span>
          </button>
        </div>

      </div>
    </div>
  );
}
