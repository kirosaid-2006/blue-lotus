'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
    <div className="group relative rounded-2xl bg-gradient-to-b from-[#0a182b] to-[#060e1a] border border-amber-500/25 hover:border-amber-400/80 p-4 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(212,175,55,0.2)] hover:-translate-y-1.5 flex flex-col justify-between">
      
      {/* Top badges */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 bg-slate-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            isOutOfStock ? 'grayscale contrast-75 opacity-60' : ''
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && !isOutOfStock && (
            <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              خصم {discountPercent}%
            </span>
          )}

          {isOutOfStock ? (
            <span className="px-3 py-1 rounded-full bg-red-950/90 border border-red-500/50 text-red-300 text-xs font-bold shadow-lg flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              نفد من المخزون
            </span>
          ) : isLowStock ? (
            <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-black shadow-lg animate-pulse">
              متبقي {product.stock} قطع فقط!
            </span>
          ) : null}
        </div>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-[#050b14]/90 border border-red-500/40 rounded-xl px-4 py-2 text-center">
              <p className="text-red-400 font-bold text-sm">مغلق مؤقتاً</p>
              <p className="text-slate-400 text-xs">سيتم توفيره قريباً</p>
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-amber-300/80">
            <span className="font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-slate-200">{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mt-2">
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 font-serif tracking-wider">
            {product.nameEn}
          </p>

          {/* Short Description */}
          <p className="text-xs text-slate-300/80 line-clamp-2 mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Stock info */}
        <div className="pt-3 border-t border-amber-500/15">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
                {product.price}
              </span>
              <span className="text-xs font-bold text-amber-200/70">ج.م</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through">
                  {product.originalPrice} ج.م
                </span>
              )}
            </div>
            
            {!isOutOfStock && (
              <span className="text-[11px] font-semibold text-emerald-400">
                متاح {product.stock} بالمخزن
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
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              isOutOfStock
                ? 'bg-slate-800/60 text-slate-500 cursor-not-allowed border border-slate-700/50'
                : isAddedRecently
                ? 'bg-emerald-600 text-white font-black'
                : 'bg-[#0f2542] hover:bg-[#163864] text-amber-200 border border-amber-500/40 hover:border-amber-400'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>أُضيف للسلة</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                <span>أضف للسلة</span>
              </>
            )}
          </button>

          {/* Quick Buy */}
          <button
            onClick={handleQuickOrder}
            disabled={isOutOfStock}
            className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md ${
              isOutOfStock
                ? 'bg-slate-800/40 text-slate-600 cursor-not-allowed border border-slate-800'
                : 'bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-[#050b14] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
            <span>طلب فوري</span>
          </button>
        </div>

      </div>
    </div>
  );
}
