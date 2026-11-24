'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  RefreshCw,
  MessageSquare,
  Lock,
  Send,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { SocialPlatform } from '../types';

export default function Footer() {
  const { setCurrentView, storeSettings } = useStore();

  const getCleanWhatsAppLink = (phone: string) => {
    let clean = (phone || '01000000000').replace(/\D/g, '');
    if (clean.startsWith('0')) {
      clean = '2' + clean;
    } else if (!clean.startsWith('20') && clean.length === 10) {
      clean = '20' + clean;
    }
    return `https://wa.me/${clean}?text=${encodeURIComponent('أهلاً، أرغب في الاستفسار بخصوص منتجات متجر Blue Lotus Skincare 🌸')}`;
  };

  const renderSocialIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'instagram':
        return (
          <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'telegram':
        return <Send className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4" />;
      case 'tiktok':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.25 1.25 2.29 2.5 2.53 1.09.21 2.26-.06 3.04-.84.66-.64.99-1.54 1.01-2.45V.02h-.73z" />
          </svg>
        );
      case 'x':
        return (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'snapchat':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12.001 2c-3.87 0-6.19 2.74-6.2 5.58 0 1.21.43 2.37 1.08 3.15.11.13.16.27.14.41-.04.28-.48.61-1.02.73-.39.09-.76.05-1.06-.11-.27-.15-.46-.37-.58-.55-.07-.12-.22-.17-.35-.11-.14.06-.21.21-.17.35.25.96 1.04 1.68 2.05 1.93.18.04.35.08.5.11.08.02.16.07.19.15.08.21-.05.58-.29.89-.5.65-1.15 1.08-1.87 1.26-.2.05-.32.25-.27.45.05.2.25.32.45.27.88-.22 1.66-.73 2.26-1.48.24-.3.49-.52.75-.61.16-.06.33-.03.47.07.72.54 1.76.9 2.94.9 1.18 0 2.22-.36 2.94-.9.14-.1.31-.13.47-.07.26.09.51.31.75.61.6.75 1.38 1.26 2.26 1.48.2.05.4-.07.45-.27.05-.2-.07-.4-.27-.45-.72-.18-1.37-.61-1.87-1.26-.24-.31-.37-.68-.29-.89.03-.08.11-.13.19-.15.15-.03.32-.07.5-.11 1.01-.25 1.8-.97 2.05-1.93.04-.14-.03-.29-.17-.35-.13-.06-.28-.01-.35.11-.12.18-.31.4-.58.55-.3.16-.67.2-1.06.11-.54-.12-.98-.45-1.02-.73-.02-.14.03-.28.14-.41.65-.78 1.08-1.94 1.08-3.15-.01-2.84-2.33-5.58-6.2-5.58z" />
          </svg>
        );
      default:
        return <Share2 className="w-4 h-4" />;
    }
  };

  const getPlatformName = (platform: SocialPlatform) => {
    switch (platform) {
      case 'instagram': return 'إنستغرام';
      case 'facebook': return 'فيسبوك';
      case 'tiktok': return 'تيك توك';
      case 'whatsapp': return 'واتساب';
      case 'telegram': return 'تيليجرام';
      case 'youtube': return 'يوتيوب';
      case 'x': return 'X (تويتر)';
      case 'snapchat': return 'سناب شات';
      default: return platform;
    }
  };

  return (
    <footer className="bg-[#0D2B55] border-t border-[#D4AF37]/30 text-slate-300 text-xs text-right pt-6 pb-4 sm:pt-10 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          
          {/* Col 1: Brand & Social */}
          <div className="col-span-2 md:col-span-1 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] bg-white p-0.5 shrink-0 shadow-sm">
                <Image src="/logo.jpg" alt="Blue Lotus Logo" fill className="object-contain rounded-full" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-serif font-black text-white tracking-widest">
                  BLUE LOTUS
                </h3>
                <p className="text-[9px] sm:text-[10px] text-[#D4AF37] font-bold">SKINCARE • براند العناية الطبيعية</p>
              </div>
            </div>

            {/* Social Media Links from Admin */}
            {storeSettings.socialLinks && storeSettings.socialLinks.length > 0 && (
              <div className="pt-1">
                <p className="text-[10px] sm:text-[11px] font-bold text-[#D4AF37] mb-1.5">تابعنا على السوشيال ميديا:</p>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {storeSettings.socialLinks.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#091F3D] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#D4AF37] hover:text-white flex items-center justify-center transition-all hover:scale-105"
                      title={getPlatformName(item.platform)}
                    >
                      {renderSocialIcon(item.platform)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Col 2: Customer Service */}
          <div className="col-span-1 space-y-1.5 sm:space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-white">خدمة العملاء</h4>
            <ul className="space-y-1 sm:space-y-1.5 text-slate-300 text-[11px] sm:text-xs">
              <li>
                <button onClick={() => setCurrentView('tracking')} className="hover:text-[#D4AF37] cursor-pointer">
                  تتبع مسار شحنتك
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('store')} className="hover:text-[#D4AF37] cursor-pointer">
                  تصفح المنتجات
                </button>
              </li>
              <li>
                <a
                  href={getCleanWhatsAppLink(storeSettings.officialWhatsApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1 cursor-pointer text-emerald-400 font-bold"
                >
                  <MessageSquare className="w-3 h-3 text-emerald-400" />
                  <span>تواصل واتساب</span>
                </a>
              </li>
              {storeSettings.officialWhatsApp && (
                <li className="text-[10px] sm:text-[11px] text-slate-300 font-mono">
                  خدمة العملاء: <span className="text-[#D4AF37] font-bold">{storeSettings.officialWhatsApp}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Guarantees */}
          <div className="col-span-1 space-y-1.5 sm:space-y-2">
            <h4 className="text-xs sm:text-sm font-bold text-white">الضمان والتوصيل</h4>
            <ul className="space-y-1 sm:space-y-1.5 text-slate-300 text-[11px] sm:text-xs">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>معاينة قبل الدفع</span>
              </li>
              <li className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>استبدال واسترجاع 14 يوم</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>شحن لـ 27 محافظة</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Contact Card */}
          <div className="col-span-2 md:col-span-1 space-y-1.5 sm:space-y-2 bg-[#091F3D] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#D4AF37]/30 shadow-md">
            <h4 className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>محادثة فورية للطلبات</span>
            </h4>
            <p className="text-[10px] sm:text-[11px] text-slate-300">
              فريق خدمة العملاء جاهز للرد على استفساراتك وتأكيد طلباتك يومياً.
            </p>
            <a
              href={getCleanWhatsAppLink(storeSettings.officialWhatsApp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 w-full py-2 px-3 rounded-lg sm:rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <span>راسلنا على واتساب 💬</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar with discrete subtle admin entry */}
        <div className="pt-3 sm:pt-6 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
          <p>© 2026 Blue Lotus Skincare. جميع الحقوق محفوظة.</p>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-slate-300 font-bold">
              <span>صُنع في مصر 🇪🇬</span>
            </div>

            {/* Discrete Admin Link (Locked with Password) */}
            <button
              onClick={() => setCurrentView('admin')}
              className="text-slate-500 hover:text-[#D4AF37] transition-colors p-1 flex items-center gap-1 cursor-pointer"
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
