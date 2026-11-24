'use client';

import React from 'react';
import { ArrowDown, ShoppingBag } from 'lucide-react';

export default function HeroSection() {
  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full p-0 m-0 overflow-hidden bg-white">
      {/* Edge-to-Edge Hero Banner Container touching navbar and sides */}
      <div className="relative w-full aspect-[2/1] overflow-hidden bg-white">
        {/* Full rectangular hero image touching page edges */}
        <img
          src="/hero.jpg"
          alt="Blue Lotus Natural Skincare Banner"
          className="w-full h-full object-cover select-none"
        />

        {/* Action Button Only - Positioned on the Left */}
        <div 
          className="absolute left-3 sm:left-6 md:left-10 lg:left-14 bottom-2.5 sm:bottom-5 md:bottom-7 lg:bottom-9 z-20"
          dir="ltr"
        >
          <button
            onClick={scrollToProducts}
            dir="rtl"
            className="group px-3 py-1.5 sm:px-5 sm:py-2.5 md:px-7 md:py-3.5 rounded-full bg-[#0D2B55] hover:bg-[#091F3D] text-white font-bold text-[11px] sm:text-xs md:text-sm tracking-wide shadow-xl hover:shadow-2xl border border-[#D4AF37]/60 hover:border-[#D4AF37] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 sm:gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] transition-transform group-hover:scale-110" />
            <span className="font-black">تسوق منتجاتنا الآن</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
