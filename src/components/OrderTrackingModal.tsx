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
      <div className="p-6 md:p-8 rounded-3xl bg-white border border-[#0D2B55]/15 shadow-xl space-y-6 text-[#0D2B55]">
        
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#E6F0FF] border border-[#0D2B55]/15 text-[#0D2B55] text-xs font-bold">
            خدمة التتبع المباشر
          </span>
          <h2 className="text-2xl font-black text-[#0D2B55]">تتبع حالة طلبك</h2>
          <p className="text-xs text-slate-500">
            أدخل رقم الأوردر (مثال: BL-1021) أو رقم هاتفك لمعرفة حالة شحنتك الآن
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
            className="flex-1 px-4 py-3 rounded-xl bg-[#F8F5EE] border border-[#0D2B55]/20 text-[#0D2B55] placeholder-slate-400 text-sm focus:border-[#D4AF37] focus:outline-none text-right font-mono"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#0D2B55] hover:bg-[#091F3D] text-white hover:text-[#D4AF37] font-black text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Search className="w-4 h-4" />
            <span>بحث</span>
          </button>
        </form>

        {/* Result Area */}
        {hasSearched && (
          <div>
            {foundOrder ? (
              <div className="mt-8 p-6 rounded-2xl bg-[#F8F5EE] border border-[#0D2B55]/15 space-y-6">
                
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#0D2B55]/10 text-xs">
                  <div>
                    <span className="text-slate-500">رقم الطلب:</span>
                    <span className="font-mono text-base font-black text-[#0D2B55] mr-2">
                      #{foundOrder.orderNumber}
                    </span>
                  </div>
                  <div className="text-slate-600">
                    <span>العميل: </span>
                    <span className="font-bold text-[#0D2B55]">{foundOrder.customerName}</span>
                  </div>
                  <div className="text-slate-600">
                    <span>المحافظة: </span>
                    <span className="font-bold text-[#0D2B55]">{foundOrder.governorate}</span>
                  </div>
                </div>

                {/* Tracking Progress Steps */}
                {foundOrder.status === 'cancelled' || foundOrder.status === 'returned' ? (
                  <div className="p-4 rounded-xl bg-red-100 border border-red-300 text-red-700 text-xs text-center font-bold">
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
                                  ? 'bg-[#0D2B55] text-white shadow-md'
                                  : 'bg-white text-slate-400 border border-slate-200'
                              } ${isCurrent ? 'ring-4 ring-[#D4AF37]/50' : ''}`}
                            >
                              <Icon className="w-5 h-5 text-current" />
                            </div>
                            <span
                              className={`text-xs font-bold ${
                                isDone ? 'text-[#0D2B55]' : 'text-slate-400'
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
                <div className="p-4 rounded-xl bg-white border border-[#0D2B55]/10 text-xs space-y-2 shadow-sm">
                  <p className="text-slate-500 font-bold mb-2">محتويات الشحنة:</p>
                  {foundOrder.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-[#0D2B55]">
                      <span>• {it.productName} (× {it.quantity})</span>
                      <span className="font-mono font-bold">{it.price * it.quantity} ج.م</span>
                    </div>
                  ))}

                  <div className="pt-2 border-t border-slate-100 flex justify-between font-black text-[#0D2B55] text-sm">
                    <span>المبلغ المطلوب عند الاستلام:</span>
                    <span>{foundOrder.total} ج.م</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs">
                <AlertCircle className="w-8 h-8 mx-auto text-red-500 mb-2" />
                <p className="text-red-700 font-bold">لم نتمكن من العثور على أوردر بهذا الرقم أو الهاتف</p>
                <p className="text-slate-500 mt-1">تأكد من كتابة الرقم بدقة مثل: BL-1021 أو رقم الموبايل 010xxxxxxxx</p>
              </div>
            )}
          </div>
        )}

        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentView('store')}
            className="text-xs text-[#0D2B55] hover:text-[#D4AF37] font-bold underline cursor-pointer"
          >
            العودة للمتجر
          </button>
        </div>

      </div>
    </div>
  );
}
