'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, RefreshCw, MessageSquare, Heart } from 'lucide-react';

export default function Footer() {
  const { setCurrentView } = useStore();

  return (
    <footer className="bg-[#03060c] border-t border-amber-500/20 text-slate-400 text-xs text-right pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-amber-400/80">
                <Image src="/logo.jpg" alt="Blue Lotus Logo" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-base font-serif font-bold text-amber-300 tracking-wider">
                  BLUE LOTUS
                </h3>
                <p className="text-[10px] text-slate-500">العطور والزيوت الفرعونية الفاخرة</p>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              براند مصري فاخر مستوحى من زهرة اللوتس الزرقاء وأسرار الجمال الفرعوني الملكي. نقدم أجود المكونات الطبيعية المعتقة.
            </p>
          </div>

          {/* Col 2: Customer Service */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white">خدمة العملاء</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => setCurrentView('tracking')} className="hover:text-amber-300">
                  تتبع مسار شحنتك
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('store')} className="hover:text-amber-300">
                  تصفح المنتجات الملكية
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/201000000000?text=أهلاً،%20أحتاج%20مساعدة%20بخصوص%20طلب%20من%20Blue%20Lotus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>تواصل عبر واتساب</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Guarantees */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white">الضمان الملكي</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>معاينة الشحنة قبل الاستلام والدفع</span>
              </li>
              <li className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                <span>ضمان استبدال واسترجاع لمدة 14 يوم</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>شحن سريع لـ 27 محافظة مصرية</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Admin Entry */}
          <div className="space-y-2 bg-[#060f1c] p-4 rounded-2xl border border-amber-500/20">
            <h4 className="text-xs font-bold text-amber-300">مسؤولي المتجر والمسوقين</h4>
            <p className="text-[11px] text-slate-400">
              لمتابعة الطلبات وتأكيدها وتوليد الأكواد وعمولات الأفلييت:
            </p>
            <button
              onClick={() => setCurrentView('admin')}
              className="w-full py-2 px-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition-all text-center"
            >
              دخول لوحة تحكم الأدمن
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Blue Lotus Egypt. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>صُنع بشغف ملكي في مصر</span>
            <span className="text-base">🇪🇬</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
