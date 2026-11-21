'use client';

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';
import { Search, CheckCircle2, Clock, Truck, Package, X, AlertCircle } from 'lucide-react';

export default function OrderTrackingModal() {
  const { orders, setCurrentView } = useStore();
  const [searchInput, setSearchInput] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchInput.trim().toUpperCase().replace('#', '');
    if (!q) return;

    const match = orders.find(
      (o) =>
        o.orderNumber.toUpperCase() === q ||
        o.customerPhone.includes(q) ||
        o.customerPhone.replace(/\D/g, '').includes(q)
    );

    setFoundOrder(match || null);
    setHasSearched(true);
  };

  const steps: { key: OrderStatus; label: string; icon: any }[] = [
    { key: 'pending', label: 'تم استلام الطلب', icon: Clock },
    { key: 'confirmed', label: 'تم التأكيد هاتفياً', icon: CheckCircle2 },
    { key: 'preparing', label: 'قيد التجهيز والتغليف', icon: Package },
    { key: 'shipping', label: 'في الطريق مع المندوب', icon: Truck },
    { key: 'delivered', label: 'تم التسليم بنجاح', icon: CheckCircle2 },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'preparing':
        return 2;
      case 'shipping':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-right">
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#0c1a2e] to-[#060e1a] border border-amber-500/30 shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
            نظام التتبع الملكي
          </span>
          <h2 className="text-2xl font-black text-white">تتبع حالة طلبك</h2>
          <p className="text-xs text-slate-400">
            أدخل رقم الأوردر (مثال: BL-1021) أو رقم هاتفك لمعرفة مكان شحنتك الآن
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            required
            placeholder="رقم الأوردر أو رقم الموبايل..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-[#050b14] border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none text-right font-mono"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>بحث</span>
          </button>
        </form>

        {/* Result Area */}
        {hasSearched && (
          <div>
            {foundOrder ? (
              <div className="mt-8 p-6 rounded-2xl bg-[#091526] border border-amber-500/25 space-y-6">
                
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-amber-500/20 text-xs">
                  <div>
                    <span className="text-slate-400">رقم الطلب:</span>
                    <span className="font-mono text-base font-black text-amber-300 mr-2">
                      #{foundOrder.orderNumber}
                    </span>
                  </div>
                  <div className="text-slate-300">
                    <span>العميل: </span>
                    <span className="font-bold text-white">{foundOrder.customerName}</span>
                  </div>
                  <div className="text-slate-300">
                    <span>المحافظة: </span>
                    <span className="font-bold text-amber-300">{foundOrder.governorate}</span>
                  </div>
                </div>

                {/* Tracking Progress Steps */}
                {foundOrder.status === 'cancelled' || foundOrder.status === 'returned' ? (
                  <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs text-center font-bold">
                    تم إلغاء هذا الطلب أو إرجاعه. لمزيد من التفاصيل يرجى التواصل مع خدمة العملاء.
                  </div>
                ) : (
                  <div className="relative py-4">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      {steps.map((st, idx) => {
                        const currentIdx = getStepIndex(foundOrder.status);
                        const isDone = idx <= currentIdx;
                        const isCurrent = idx === currentIdx;
                        const Icon = st.icon;

                        return (
                          <div key={st.key} className="flex flex-col items-center text-center space-y-2">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                                isDone
                                  ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                  : 'bg-slate-800 text-slate-500 border border-slate-700'
                              } ${isCurrent ? 'ring-4 ring-amber-400/30 animate-pulse' : ''}`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <span
                              className={`text-xs font-bold ${
                                isDone ? 'text-amber-300' : 'text-slate-500'
                              }`}
                            >
                              {st.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Order Details Brief */}
                <div className="p-4 rounded-xl bg-[#060e1a] border border-amber-500/15 text-xs space-y-2">
                  <p className="text-slate-400 font-bold mb-2">محتويات الشحنة:</p>
                  {foundOrder.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-slate-200">
                      <span>• {it.productName} (× {it.quantity})</span>
                      <span className="font-mono text-amber-300">{it.price * it.quantity} ج.م</span>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-amber-500/15 flex justify-between font-black text-amber-400 text-sm">
                    <span>المبلغ المطلوب عند الاستلام:</span>
                    <span>{foundOrder.total} ج.م</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-8 p-4 rounded-2xl bg-red-950/20 border border-red-500/30 text-xs">
                <AlertCircle className="w-8 h-8 mx-auto text-red-400 mb-2" />
                <p className="text-red-300 font-bold">لم نتمكن من العثور على أوردر بهذا الرقم أو الهاتف</p>
                <p className="text-slate-400 mt-1">تأكد من كتابة الرقم بدقة مثل: BL-1021 أو رقم الموبايل 010xxxxxxxx</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentView('store')}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold underline"
          >
            العودة للمتجر الملكي
          </button>
        </div>

      </div>
    </div>
  );
}
