'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Truck, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateCartQuantity,
    getCartSubtotal,
    freeShippingThreshold,
    clearCart,
  } = useStore();

  if (!isCartOpen) return null;

  const subtotal = getCartSubtotal();
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const diffToFree = Math.max(0, freeShippingThreshold - subtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 md:pl-10">
        <div className="w-screen max-w-md bg-gradient-to-b from-[#091526] via-[#060e1a] to-[#040810] border-r border-amber-500/30 text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-amber-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-black text-white">سلة المشتريات</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {cart.reduce((s, i) => s + i.quantity, 0)} قطع
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#0c1e36]/70 p-4 border-b border-amber-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-bold">
                <Truck className="w-4 h-4 text-amber-400" />
                {diffToFree === 0 ? (
                  <span className="text-amber-300">حصلت على الشحن المجاني! 🎁</span>
                ) : (
                  <span>
                    تبقي <span className="text-amber-400 font-black">{diffToFree} ج.م</span> للشحن المجاني
                  </span>
                )}
              </span>
              <span className="text-amber-300 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <p className="text-slate-300 font-bold text-base">سلة مشترياتك فارغة</p>
                <p className="text-xs text-slate-500">اختر من مجموعتنا الملكية ما يناسب ذوقك الرفيع</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/30 transition-all"
                >
                  تصفح المنتجات
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-xl bg-[#0d1f38]/60 border border-amber-500/20 relative group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-18 h-18 rounded-lg overflow-hidden shrink-0 border border-amber-500/30 bg-slate-900">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-amber-400 font-black mt-0.5">
                        {item.product.price} ج.م
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 bg-[#06101e] px-2 py-1 rounded-lg border border-amber-500/30">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="text-slate-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-white min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className={`text-slate-400 hover:text-white transition-colors ${
                            item.quantity >= item.product.stock ? 'opacity-30 cursor-not-allowed' : ''
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-400/70 hover:text-red-400 transition-colors p-1"
                        title="حذف المنتج"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-amber-500/20 bg-[#050b14]/90 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-bold">المجموع الفرعي:</span>
                <span className="text-xl font-black bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
                  {subtotal} ج.م
                </span>
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                * مصاريف الشحن والخصومات تُحسب بدقة في الخطوة التالية حسب محافظتك وكود الخصم.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="px-3 py-3 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
                  title="تفريغ السلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleProceedToCheckout}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-[#050b14] font-black text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>متابعة إتمام الطلب</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
