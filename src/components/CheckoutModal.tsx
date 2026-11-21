'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle2, Tag, Truck, ShieldCheck, Phone, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { Order } from '../types';

export default function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    governorates,
    freeShippingThreshold,
    getCartSubtotal,
    validatePromoCode,
    createOrder,
    generateWhatsAppLink,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState(governorates[0]?.nameAr || 'القاهرة');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  
  // Promo code state
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Completed order state
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const subtotal = getCartSubtotal();
  const govObj = governorates.find((g) => g.nameAr === selectedGovernorate);
  const standardShippingCost = govObj ? govObj.cost : 50;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : standardShippingCost;
  const total = Math.max(0, subtotal - promoDiscount) + shippingCost;

  // Validate Promo Code
  const handleApplyPromo = () => {
    if (!promoCodeInput.trim()) return;
    const res = validatePromoCode(promoCodeInput, subtotal);
    if (res.valid && res.promoCode) {
      setAppliedPromo(res.promoCode.code);
      setPromoDiscount(res.discountAmount);
      setPromoMessage({ text: res.message || 'تم تطبيق كود الخصم بنجاح!', isError: false });
    } else {
      setAppliedPromo('');
      setPromoDiscount(0);
      setPromoMessage({ text: res.message || 'كود غير صالح', isError: true });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
    setPromoDiscount(0);
    setPromoCodeInput('');
    setPromoMessage(null);
  };

  // Submit Order
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate phone number (Egyptian 11 digits: 010, 011, 012, 015)
    const cleanPhone = customerPhone.replace(/\s+/g, '');
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      setFormError('من فضلك أدخل رقم هاتف مصري صحيح مكون من 11 رقماً (يبدأ بـ 010 أو 011 أو 012 أو 015)');
      return;
    }

    if (!customerName.trim() || customerName.trim().length < 3) {
      setFormError('من فضلك أدخل الاسم بالكامل ثلاثي أو ثنائي على الأقل');
      return;
    }

    if (!address.trim() || address.trim().length < 5) {
      setFormError('من فضلك أدخل العنوان بالتفصيل (اسم الشارع، رقم العمارة، علامة مميزة)');
      return;
    }

    setIsSubmitting(true);

    try {
      const order = createOrder({
        customerName: customerName.trim(),
        customerPhone: cleanPhone,
        governorate: selectedGovernorate,
        address: address.trim(),
        notes: notes.trim(),
        promoCodeUsed: appliedPromo || undefined,
      });

      if (order) {
        setCompletedOrder(order);
        // Trigger celebratory confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#1e3a8a', '#f3e5ab', '#3b82f6'],
        });
      }
    } catch (err) {
      setFormError('حدث خطأ أثناء حفظ الطلب. برجاء المحاولة مجدداً.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
    setCustomerName('');
    setCustomerPhone('');
    setAddress('');
    setNotes('');
    setAppliedPromo('');
    setPromoDiscount(0);
    setPromoMessage(null);
    setFormError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0c1a2e] to-[#060e1a] border border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-5 border-b border-amber-500/20 bg-[#091526] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-black text-white">
              {completedOrder ? 'تم تأكيد طلبك الملكي بنجاح!' : 'تأكيد بيانات الشحن والتوصيل'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {completedOrder ? (
          /* Success Screen */
          <div className="p-6 md:p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-1 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              <div className="w-full h-full rounded-full bg-[#050b14] flex items-center justify-center text-amber-400">
                <CheckCircle2 className="w-12 h-12" />
              </div>
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-sm font-bold">
                رقم الأوردر: #{completedOrder.orderNumber}
              </span>
              <h4 className="text-2xl font-black text-white mt-3">
                شكراً لاختيارك Blue Lotus يا {completedOrder.customerName}! 🌸
              </h4>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                تم تسجيل طلبك بنجاح في نظامنا الملكي. سيتواصل معك أحد مسؤولي التأكيد خلال دقائق لتأكيد الموعد وتجهيز الشحنة.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="rounded-2xl bg-[#091526]/80 border border-amber-500/25 p-4 text-right space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>المحافظة والعنوان:</span>
                <span className="font-bold text-white">{completedOrder.governorate} - {completedOrder.address}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>رقم الهاتف للتواصل:</span>
                <span className="font-bold text-white font-mono">{completedOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>مصاريف الشحن:</span>
                <span className="font-bold text-emerald-400">
                  {completedOrder.shippingCost === 0 ? 'مجاني 🎁' : `${completedOrder.shippingCost} ج.م`}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-amber-300 pt-2 border-t border-amber-500/20">
                <span>المبلغ المطلوب عند الاستلام:</span>
                <span>{completedOrder.total} ج.م</span>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="space-y-3 pt-2">
              <a
                href={generateWhatsAppLink(completedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-sm md:text-base shadow-[0_0_25px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>تأكيد الأوردر فوراً عبر محادثة واتساب خدمة العملاء 💬</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-all"
              >
                العودة للتسوق في المتجر
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 md:p-8 space-y-5">
            {formError && (
              <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 text-right">
                  الاسم بالكامل *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: أحمد عبد الله"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#07111e] border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Customer Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 text-right">
                  رقم الموبايل (مصر) *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="010xxxxxxxx أو 011 / 012 / 015"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#07111e] border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none text-right font-mono"
                  />
                  <Phone className="w-4 h-4 text-amber-400/60 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Governorate Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 text-right">
                  المحافظة *
                </label>
                <select
                  value={selectedGovernorate}
                  onChange={(e) => setSelectedGovernorate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#07111e] border border-amber-500/30 text-white text-sm focus:border-amber-400 focus:outline-none"
                >
                  {governorates.map((gov) => (
                    <option key={gov.id} value={gov.nameAr} className="bg-slate-900 text-white">
                      {gov.nameAr} ({gov.cost} ج.م شحن)
                    </option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-slate-200 mb-1.5 text-right">
                  العنوان بالتفصيل *
                </label>
                <input
                  type="text"
                  required
                  placeholder="المنطقة - اسم الشارع - رقم العمارة والشقة"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#07111e] border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1.5 text-right">
                ملاحظات للتوصيل (اختياري)
              </label>
              <input
                type="text"
                placeholder="مثال: الاتصال قبل الوصول بنصف ساعة أو مواعيد مفضلة"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#07111e] border border-amber-500/30 text-white placeholder-slate-500 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            {/* Promo Code Box */}
            <div className="p-3.5 rounded-xl bg-[#091526]/80 border border-amber-500/25 space-y-2">
              <label className="block text-xs font-bold text-amber-300 text-right flex items-center justify-between">
                <span>هل لديك برومو كود أو كود مسوق؟</span>
                <Tag className="w-3.5 h-3.5 text-amber-400" />
              </label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="أدخل الكود (مثال: NEFERTITI15)"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                  disabled={!!appliedPromo}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#050b14] border border-amber-500/30 text-white placeholder-slate-500 text-xs uppercase font-mono tracking-wider focus:border-amber-400 focus:outline-none"
                />
                {appliedPromo ? (
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="px-3 py-2 rounded-lg bg-red-950/80 text-red-300 border border-red-500/40 text-xs font-bold hover:bg-red-900"
                  >
                    إلغاء
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30"
                  >
                    تطبيق
                  </button>
                )}
              </div>

              {promoMessage && (
                <p className={`text-xs ${promoMessage.isError ? 'text-red-400' : 'text-emerald-400'} font-semibold`}>
                  {promoMessage.text}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="rounded-xl bg-[#07111e] p-4 border border-amber-500/20 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>المجموع الفرعي ({cart.reduce((s, i) => s + i.quantity, 0)} قطع):</span>
                <span>{subtotal} ج.م</span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>خصم كود ({appliedPromo}):</span>
                  <span>- {promoDiscount} ج.م</span>
                </div>
              )}

              <div className="flex justify-between text-slate-300">
                <span className="flex items-center gap-1">
                  <span>مصاريف الشحن لـ ({selectedGovernorate}):</span>
                  {isFreeShipping && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      عرض شحن مجاني
                    </span>
                  )}
                </span>
                <span className={shippingCost === 0 ? 'text-emerald-400 font-bold' : ''}>
                  {shippingCost === 0 ? '0 ج.م' : `${shippingCost} ج.م`}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-amber-300 pt-2 border-t border-amber-500/20">
                <span>الإجمالي النهائي للدفع عند الاستلام:</span>
                <span className="text-xl">{total} ج.م</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-[#050b14] font-black text-base shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <span>{isSubmitting ? 'جاري تسجيل الطلب...' : 'تأكيد طلب الأوردر الآن (الدفع عند الاستلام)'}</span>
              <Sparkles className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>معاينة مجانية للمنتج قبل الدفع مع المندوب وضمان استبدال واسترجاع</span>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
