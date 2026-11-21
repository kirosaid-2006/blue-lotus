'use client';

import React from 'react';
import ThreeLotusScene from './ThreeLotusScene';
import { Sparkles, Crown, ShieldCheck, Truck, Clock } from 'lucide-react';

export default function HeroSection() {
  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:py-20 bg-gradient-to-b from-[#050b14] via-[#091526] to-[#050b14]">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Right Text Column (In RTL Arabic, this will appear on the right) */}
          <div className="lg:col-span-7 text-center lg:text-right space-y-6">
            
            {/* Royal Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border border-amber-500/40 text-amber-300 text-xs md:text-sm font-bold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>الإصدار الملكي الحصري • مستوحى من عصر نفرتيتي وآمون</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              أسرار الفخامة المصرية في كل قطرة من{' '}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(212,175,55,0.3)]">
                اللوتس الأزرق
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              مجموعتنا الفاخرة من العطور النادرة، والزيوت الذهبية، والسيروم المعتق بأسرار الجمال الفرعوني. تجربة تمنحك هيبة الملوك وجاذبية لا تُقاوم.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={scrollToProducts}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-[#050b14] font-black text-base shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>تسوق المجموعة الملكية</span>
                <Sparkles className="w-4 h-4 text-slate-950" />
              </button>

              <div className="flex items-center gap-2 text-amber-200/90 text-sm font-semibold px-4 py-3 rounded-xl bg-[#0a1628]/80 border border-amber-500/20">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>عروض وخصومات بالبرومو كود حتى 15%</span>
              </div>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-amber-500/15">
              <div className="flex items-center gap-2 text-right">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Crown className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-xs text-slate-200 font-bold">مستخلص أصلي 100%</span>
              </div>

              <div className="flex items-center gap-2 text-right">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-xs text-slate-200 font-bold">شحن لجميع المحافظات</span>
              </div>

              <div className="flex items-center gap-2 text-right">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-xs text-slate-200 font-bold">دفع عند الاستلام</span>
              </div>

              <div className="flex items-center gap-2 text-right">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-xs text-slate-200 font-bold">تأكيد فوري بالواتساب</span>
              </div>
            </div>

          </div>

          {/* Left Column: 3D Lotus Blossom Interactive Experience */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-3xl bg-gradient-to-b from-[#0c1a2e]/90 to-[#060e1a]/90 p-2 border border-amber-500/30 shadow-[0_0_50px_rgba(11,25,44,0.8)] backdrop-blur-md">
              
              {/* Badge Over 3D Canvas */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050b14]/80 border border-amber-400/40 text-[11px] font-bold text-amber-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>مجسم 3D تفاعلي (حرك الماوس)</span>
              </div>

              {/* The 3D Scene */}
              <ThreeLotusScene />

              {/* Bottom Card Ribbon */}
              <div className="text-center pb-3 pt-1">
                <p className="text-xs text-amber-200/80 font-serif tracking-widest uppercase">
                  Sacred Egyptian Blue Lotus • Nymphaea Caerulea
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
