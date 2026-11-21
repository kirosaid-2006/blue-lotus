'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown, ShoppingBag } from 'lucide-react';

export default function HeroSection() {
  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden py-12 md:py-16 bg-gradient-to-b from-[#050b14] via-[#091526] to-[#050b14] border-b border-amber-500/20">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        {/* Brand Emblem */}
        <div className="inline-block relative">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-2 border-amber-400 shadow-[0_0_35px_rgba(212,175,55,0.4)]">
            <Image
              src="/logo.jpg"
              alt="Blue Lotus Emblem"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Main Brand Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            متجر{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)] font-serif tracking-wide">
              BLUE LOTUS
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto font-medium">
            منتجات راقية ومميزة - تسوق طلبك الآن واستلمه عند باب منزلك مع الدفع عند الاستلام بعد المعاينة
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={scrollToProducts}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-[#050b14] font-black text-sm shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            <span>عرض كافة المنتجات</span>
            <ArrowDown className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>
    </section>
  );
}
