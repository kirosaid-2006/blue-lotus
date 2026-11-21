'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, RefreshCw, MessageSquare, Lock } from 'lucide-react';

export default function Footer() {
  const { setCurrentView } = useStore();

  return (
    <footer className="bg-[#03060c] border-t border-amber-500/20 text-slate-400 text-xs text-right pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-amber-400/80">
                <Image src="/logo.jpg" alt="Blue Lotus Logo" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-amber-300 tracking-wider">
                  BLUE LOTUS
                </h3>
                <p className="text-[10px] text-slate-500">المتجر الرسمي</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] max-w-sm">
              أجود المنتجات العصرية والفاخرة. شحن سريع ومباشر لكافة محافظات جمهورية مصر العربية.
            </p>
          </div>

          {/* Col 2: Customer Service */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white">خدمة العملاء</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => setCurrentView('tracking')} className="hover:text-amber-300 cursor-pointer">
                  تتبع مسار شحنتك
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('store')} className="hover:text-amber-300 cursor-pointer">
                  تصفح المنتجات
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/201000000000?text=أهلاً،%20أحتاج%20مساعدة%20بخصوص%20طلب%20من%20Blue%20Lotus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>تواصل عبر واتساب</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Guarantees */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white">الضمان والتوصيل</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>معاينة الشحنة قبل الاستلام والدفع</span>
              </li>
              <li className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>ضمان استبدال واسترجاع 14 يوم</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>شحن وتوصيل لجميع المحافظات</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with discrete subtle admin entry */}
        <div className="pt-6 border-t border-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Blue Lotus. جميع الحقوق محفوظة.</p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-slate-400">
              <span>صُنع في مصر</span>
              <span className="text-base">🇪🇬</span>
            </div>

            {/* Discrete Admin Link (Locked with Password) */}
            <button
              onClick={() => setCurrentView('admin')}
              className="text-slate-600 hover:text-amber-400/80 transition-colors p-1 flex items-center gap-1 cursor-pointer"
              title="دخول الإدارة"
              aria-label="دخول الإدارة"
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
