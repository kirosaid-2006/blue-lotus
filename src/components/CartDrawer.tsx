'use client';

import React from 'react';
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
        className="absolute inset-0 bg-[#0D2B55]/40 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 md:pl-10">
        <div className="w-screen max-w-md bg-[#F8F5EE] border-r border-[#0D2B55]/15 text-[#0D2B55] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-[#0D2B55]/10 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0D2B55]" />
              <h2 className="text-lg font-black text-[#0D2B55]">سلة المشتريات</h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#E6F0FF] text-[#0D2B55] border border-[#0D2B55]/15">
                {cart.reduce((s, i) => s + i.quantity, 0)} قطع
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#0D2B55] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#E6F0FF] p-4 border-b border-[#0D2B55]/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#0D2B55] flex items-center gap-1.5 font-bold">
                <Truck className="w-4 h-4 text-[#0D2B55]" />
                {diffToFree === 0 ? (
                  <span className="text-[#0D2B55] font-black">حصلت على الشحن المجاني! 🎁</span>
                ) : (
                  <span>
                    تبقي <span className="text-[#0D2B55] font-black">{diffToFree} ج.م</span> للشحن المجاني
                  </span>
                )}
              </span>
              <span className="text-[#0D2B55] font-black">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white overflow-hidden border border-[#0D2B55]/10">
              <div
                className="h-full bg-[#0D2B55] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#0D2B55]/10 flex items-center justify-center text-[#0D2B55] shadow-sm">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <p className="text-[#0D2B55] font-bold text-base">سلة مشترياتك فارغة</p>
                <p className="text-xs text-slate-500">اختر من منتجات العناية بالبشرة ما يناسبك</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#0D2B55] text-white text-xs font-bold hover:bg-[#091F3D] transition-all cursor-pointer shadow-sm"
                >
                  تصفح المنتجات
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 rounded-2xl bg-white border border-[#0D2B55]/10 shadow-sm relative group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-18 h-18 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-[#F8F5EE]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#0D2B55] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#0D2B55] font-black mt-0.5">
                        {item.product.price} ج.م
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 bg-[#F8F5EE] px-2 py-1 rounded-lg border border-[#0D2B55]/15">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="text-[#0D2B55] hover:text-black transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-[#0D2B55] min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className={`text-[#0D2B55] hover:text-black transition-colors cursor-pointer ${
                            item.quantity >= item.product.stock ? 'opacity-30 cursor-not-allowed' : ''
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
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
            <div className="p-5 border-t border-[#0D2B55]/10 bg-white space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 font-bold">المجموع الفرعي:</span>
                <span className="text-xl font-black text-[#0D2B55]">
                  {subtotal} ج.م
                </span>
              </div>
              <p className="text-[11px] text-slate-500 text-center">
                * مصاريف الشحن والخصومات تُحسب بدقة في الخطوة التالية حسب محافظتك وكود الخصم.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="px-3 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold cursor-pointer"
                  title="تفريغ السلة"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleProceedToCheckout}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-[#0D2B55] hover:bg-[#091F3D] text-white hover:text-[#D4AF37] font-black text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#0D2B55]"
                >
                  <span>متابعة إتمام الطلب</span>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
