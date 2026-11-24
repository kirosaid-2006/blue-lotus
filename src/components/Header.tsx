'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Truck } from 'lucide-react';

export default function Header() {
  const {
    cart,
    setIsCartOpen,
    currentView,
    setCurrentView,
    freeShippingThreshold,
    getCartSubtotal,
  } = useStore();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = getCartSubtotal();
  const diffToFree = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#F8F5EE]/95 border-b border-[#0D2B55]/10 shadow-sm transition-all">
      {/* Top Free Shipping Bar - Powder Blue */}
      <div className="bg-[#E6F0FF] text-[#0D2B55] text-xs font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-[#0D2B55]/10">
        <Truck className="w-4 h-4 text-[#0D2B55]" />
        <span>
          {subtotal >= freeShippingThreshold ? (
            <span className="text-[#0D2B55] font-black">
              مبروك! لقد حصلت على شحن مجاني لكافة المحافظات 🎁
            </span>
          ) : (
            <span>
              أضف منتجات بقيمة <span className="underline font-black text-[#0D2B55]">{diffToFree} ج.م</span> إضافية واحصل على شحن مجاني!
            </span>
          )}
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <div 
          onClick={() => setCurrentView('store')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Circular Logo Badge - Full Circle Display */}
          <div className="relative w-13 h-13 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-sm bg-white p-0.5 shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/logo.jpg"
              alt="Blue Lotus Skincare Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <div>
            <span className="font-serif tracking-widest text-lg sm:text-2xl font-black text-[#0D2B55]">
              BLUE LOTUS
            </span>
            <p className="text-[10px] sm:text-xs text-[#0D2B55]/70 font-bold tracking-wider">
              SKINCARE • العناية الطبيعية
            </p>
          </div>
        </div>

        {/* Center: Store & Tracking only */}
        <nav className="flex items-center gap-1.5 bg-[#E6F0FF]/80 px-3 py-1.5 rounded-full border border-[#0D2B55]/10">
          <button
            onClick={() => setCurrentView('store')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              currentView === 'store'
                ? 'bg-[#0D2B55] text-white shadow-sm'
                : 'text-[#0D2B55]/70 hover:text-[#0D2B55] hover:bg-white/60'
            }`}
          >
            المتجر
          </button>
          
          <button
            onClick={() => setCurrentView('tracking')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              currentView === 'tracking'
                ? 'bg-[#0D2B55] text-white shadow-sm'
                : 'text-[#0D2B55]/70 hover:text-[#0D2B55] hover:bg-white/60'
            }`}
          >
            تتبع طلبك
          </button>
        </nav>

        {/* Left side: Cart Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-white border border-[#0D2B55]/20 text-[#0D2B55] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all shadow-sm group cursor-pointer"
            aria-label="سلة المشتريات"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#0D2B55] text-[#D4AF37] text-[11px] font-black flex items-center justify-center shadow-md border border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
