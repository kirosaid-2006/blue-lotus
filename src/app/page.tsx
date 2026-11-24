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

  const categories = ['الكل', 'عناية بالبشرة', 'عناية بالجسم', 'عناية باليدين', 'سيروم ونضارة'];

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
    <div className="min-h-screen flex flex-col justify-between bg-[#F8F5EE] text-[#0D2B55]">
      <Header />

      <main className="flex-1">
        {currentView === 'store' && (
          <div>
            {/* Hero Banner */}
            <HeroSection />

            {/* Products Section */}
            <section id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              
              {/* Section Header */}
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-[#0D2B55]">
                  منتجات العناية بالبشرة
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  تركيبات طبيعية فاخرة لتغذية وترطيب ونضارة فائقة لبشرتك
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
                          ? 'bg-[#0D2B55] text-white font-black shadow-sm'
                          : 'bg-white text-[#0D2B55] hover:text-[#0D2B55] border border-[#0D2B55]/15 hover:border-[#D4AF37]'
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
                    className="w-full pl-4 pr-10 py-2 rounded-xl bg-white border border-[#0D2B55]/20 text-xs text-[#0D2B55] placeholder-slate-400 focus:border-[#D4AF37] focus:outline-none shadow-sm"
                  />
                  <Search className="w-4 h-4 text-[#0D2B55]/60 absolute right-3 top-2.5" />
                </div>

              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border border-[#0D2B55]/10 p-8 shadow-sm">
                  <p className="text-slate-600 font-bold text-sm">لا توجد منتجات مطابقة للبحث</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('الكل');
                      setSearchQuery('');
                    }}
                    className="mt-3 text-xs text-[#0D2B55] hover:text-[#D4AF37] underline font-bold cursor-pointer"
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
