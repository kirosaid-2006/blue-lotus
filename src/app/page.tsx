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
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Footer from '../components/Footer';
import { Search } from 'lucide-react';

function StoreContent() {
  const { products, currentView } = useStore();
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
            {/* Clean Hero */}
            <HeroSection />

            {/* Products Section */}
            <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              
              {/* Section Header */}
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  المنتجات المتاحة
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  تصفح المنتجات وأضف ما يناسبك إلى السلة لإتمام الطلب
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
                    placeholder="ابحث عن منتج بالاسم..."
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
                  <p className="text-slate-400 font-bold text-sm">لا توجد منتجات حالياً</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('الكل');
                      setSearchQuery('');
                    }}
                    className="mt-3 text-xs text-amber-400 hover:text-amber-300 underline font-bold cursor-pointer"
                  >
                    عرض كافة المنتجات
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

            </section>
          </div>
        )}

        {currentView === 'admin' && <AdminDashboard />}

        {currentView === 'tracking' && <OrderTrackingModal />}
      </main>

      {/* Floating Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <FloatingWhatsApp />

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
