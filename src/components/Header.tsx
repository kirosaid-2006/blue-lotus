'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ShieldCheck, Sparkles, LayoutDashboard, Search, Truck } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#050b14]/90 border-b border-amber-500/20 shadow-2xl transition-all">
      {/* Top Royal Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 text-[#050b14] text-xs md:text-sm font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 shadow-inner">
        <Sparkles className="w-4 h-4 animate-spin text-amber-950" style={{ animationDuration: '6s' }} />
        <span>
          {subtotal >= freeShippingThreshold ? (
            <span className="text-[#050b14] font-black">
              مبروك! لقد حصلت على ✨ شحن مجاني لكافة المحافظات ✨
            </span>
          ) : (
            <span>
              أضف منتجات بقيمة <span className="underline font-black">{diffToFree} ج.م</span> إضافية واحصل على شحن مجاني لكافة محافظات مصر!
            </span>
          )}
        </span>
        <Truck className="w-4 h-4 text-amber-950" />
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Right side: Logo & Brand */}
        <div 
          onClick={() => setCurrentView('store')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-transform group-hover:scale-105">
            <Image
              src="/logo.jpg"
              alt="Blue Lotus Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif tracking-widest text-lg md:text-2xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                BLUE LOTUS
              </span>
            </div>
            <p className="text-[10px] md:text-xs text-blue-200/70 font-medium tracking-wider">
              إرث الفراعنة الملكي • عطور وزيوت مقدسة
            </p>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0a1628]/80 px-3 py-1.5 rounded-full border border-amber-500/30">
          <button
            onClick={() => setCurrentView('store')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              currentView === 'store'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                : 'text-amber-100/80 hover:text-amber-300'
            }`}
          >
            المتجر الملكي
          </button>
          
          <button
            onClick={() => setCurrentView('tracking')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              currentView === 'tracking'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-bold'
                : 'text-amber-100/80 hover:text-amber-300'
            }`}
          >
            تتبع أوردرك
          </button>
        </nav>

        {/* Left side: Cart & Admin Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Admin Dashboard Pill Button */}
          <button
            onClick={() => setCurrentView(currentView === 'admin' ? 'store' : 'admin')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-bold border transition-all ${
              currentView === 'admin'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                : 'bg-[#0f223d]/80 text-amber-300 border-amber-500/40 hover:bg-[#1a365d]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-amber-400" />
            <span>{currentView === 'admin' ? 'الرجوع للمتجر' : 'لوحة الأدمن'}</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-gradient-to-br from-[#0f223d] to-[#0a1628] border border-amber-500/40 text-amber-300 hover:text-amber-100 hover:border-amber-400 transition-all shadow-lg group"
            aria-label="سلة المشتريات"
          >
            <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-amber-500 text-white text-[11px] font-black flex items-center justify-center shadow-md animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
