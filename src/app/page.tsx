'use client';

import React, { useState } from 'react';
import { StoreProvider, useStore } from '../context/StoreContext';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import CheckoutModal from '../components/CheckoutModal';
import AdminDashboard from '../components/AdminDashboard';
import OrderTrackingModal from '../components/OrderTrackingModal';
import Footer from '../components/Footer';
import { Sparkles, Crown, Shield, Heart, Search, Filter, Star, Truck } from 'lucide-react';

function StoreContent() {
  const { products, currentView, promoCodes } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['الكل', 'عطور ملكية', 'عناية فاخرة', 'عناية بالبشرة', 'أجواء منزلية'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'الكل' || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#040810]">
      <Header />

      <main className="flex-1">
        {currentView === 'store' && (
          <div>
            {/* Hero Section with 3D Three.js Lotus Canvas */}
            <HeroSection />

            {/* Promo Code Highlight Banner */}
            {promoCodes.length > 0 && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0c1f36] via-[#091526] to-[#0c1f36] border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-right">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">
                        عروض المسوقين الحصرية متاحة الآن!
                      </h4>
                      <p className="text-xs text-slate-400">
                        استخدم كود <span className="font-mono text-amber-300 font-bold">{promoCodes[0]?.code}</span> للحصول على خصم فوري عند إتمام طلبك
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-300 font-bold">كود الشهر:</span>
                    <span className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400 text-amber-300 font-mono font-black text-sm tracking-widest">
                      {promoCodes[0]?.code}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Products Section */}
            <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              
              {/* Section Header */}
              <div className="text-center space-y-3 mb-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>المجموعة المختارة</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white">
                  منتجات <span className="gold-gradient-text">Blue Lotus</span> الملكية
                </h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                  اختر من بين أفخم العطور والزيوت والمنتجات المعتقة بخلاصة اللوتس الأزرق. طلب مباشر وسريع والدفع عند الاستلام بعد المعاينة.
                </p>
              </div>

              {/* Filters & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                
                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md'
                          : 'bg-[#0a182b] text-slate-300 hover:text-white border border-amber-500/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="ابحث عن منتج بالاسم أو المكونات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 rounded-xl bg-[#07111e] border border-amber-500/30 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                  <Search className="w-4 h-4 text-amber-400/60 absolute right-3 top-2.5" />
                </div>

              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-[#0a182b]/40 rounded-3xl border border-amber-500/15 p-8">
                  <p className="text-slate-400 font-bold text-sm">لم نجد أي منتج يطابق بحثك حالياً</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('الكل');
                      setSearchQuery('');
                    }}
                    className="mt-3 text-xs text-amber-400 hover:text-amber-300 underline font-bold"
                  >
                    عرض كافة المنتجات
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

            </section>

            {/* Why Choose Blue Lotus Section */}
            <section className="py-16 bg-gradient-to-b from-[#060e1a] via-[#081526] to-[#040810] border-t border-amber-500/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center space-y-3 mb-12">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    لماذا يثق بنا أكثر من <span className="gold-gradient-text">10,000 عميل</span> في مصر؟
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
                    نحن لا نبيع مجرد عطور، بل ننقل إليك فخامة وسحر الطقوس الملكية المصرية القديمة
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="p-6 rounded-2xl bg-[#09172c]/70 border border-amber-500/25 text-right space-y-3 hover:border-amber-400/60 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Crown className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-white">مستخلصات نادرة أصلية</h4>
                    <p className="text-xs text-slate-300/80 leading-relaxed">
                      نستخدم زيوت ومستخلصات زهرة اللوتس الزرقاء النقية بنسبة 100% بدون أي مخففات صناعية ضارة، لتضمن أعلى ثبات وفوحان وأمان للبشرة.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#09172c]/70 border border-amber-500/25 text-right space-y-3 hover:border-amber-400/60 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Truck className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-white">تغطية وشحن لـ 27 محافظة</h4>
                    <p className="text-xs text-slate-300/80 leading-relaxed">
                      شراكات مع أسرع شركات الشحن في مصر لضمان وصول طلبك حتى باب منزلك في القاهرة، الإسكندرية، الدلتا، والصعيد خلال 24 - 48 ساعة فقط.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#09172c]/70 border border-amber-500/25 text-right space-y-3 hover:border-amber-400/60 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-white">معاينة قبل الدفع واسترجاع</h4>
                    <p className="text-xs text-slate-300/80 leading-relaxed">
                      يمكنك فتح الشحنة والتأكد من المنتج مع مندوب التوصيل قبل دفع أي مليم، مع ضمان كامل لاستبدال المنتج أو استرجاعه في غضون 14 يوماً.
                    </p>
                  </div>

                </div>

              </div>
            </section>
          </div>
        )}

        {currentView === 'admin' && <AdminDashboard />}

        {currentView === 'tracking' && <OrderTrackingModal />}
      </main>

      {/* Floating Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
