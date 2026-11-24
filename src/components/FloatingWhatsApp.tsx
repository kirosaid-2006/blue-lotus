'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
  const { storeSettings, currentView } = useStore();

  if (currentView === 'admin') return null;

  let clean = (storeSettings.officialWhatsApp || '01000000000').replace(/\D/g, '');
  if (clean.startsWith('0')) {
    clean = '2' + clean;
  } else if (!clean.startsWith('20') && clean.length === 10) {
    clean = '20' + clean;
  }

  const url = `https://wa.me/${clean}?text=${encodeURIComponent('أهلاً، أرغب في الاستفسار عن منتج في متجر Blue Lotus 🌸')}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white px-3.5 py-3 rounded-full shadow-[0_5px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.6)] hover:scale-105 active:scale-95 transition-all group"
      title="تواصل معنا عبر واتساب"
      aria-label="تواصل معنا عبر واتساب"
    >
      <div className="relative">
        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
      </div>
      <span className="text-xs font-black tracking-wide hidden sm:inline">
        تواصل واتساب
      </span>
    </a>
  );
}
