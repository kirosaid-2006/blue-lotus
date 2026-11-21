'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { Product, PromoCode, Order, OrderStatus } from '../types';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Tag,
  Truck,
  Phone,
  MessageSquare,
  CheckCircle,
  Clock,
  Send,
  Plus,
  Trash2,
  Edit,
  Search,
  Filter,
  DollarSign,
  Users,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
  Layers,
  ChevronDown,
  X,
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    orders,
    products,
    promoCodes,
    governorates,
    freeShippingThreshold,
    updateOrderStatus,
    deleteOrder,
    addProduct,
    updateProduct,
    deleteProduct,
    addPromoCode,
    updatePromoCode,
    deletePromoCode,
    updateGovernorateCost,
    setFreeShippingThreshold,
    generateWhatsAppLink,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'analytics' | 'products' | 'promos' | 'shipping'>('orders');

  // Orders Filter & Search
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearchQuery, setOrderSearchQuery] = useState<string>('');

  // Modals state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isAddPromoOpen, setIsAddPromoOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('عطور ملكية');
  const [newProdPrice, setNewProdPrice] = useState<number>(500);
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState<number>(700);
  const [newProdStock, setNewProdStock] = useState<number>(20);
  const [newProdImage, setNewProdImage] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');

  // New Promo Code Form State
  const [newCodeStr, setNewCodeStr] = useState('');
  const [newCodeMarketer, setNewCodeMarketer] = useState('');
  const [newCodePhone, setNewCodePhone] = useState('');
  const [newCodeType, setNewCodeType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCodeValue, setNewCodeValue] = useState<number>(10);
  const [newCodeMaxUses, setNewCodeMaxUses] = useState<number>(50);
  const [newCodeExpiry, setNewCodeExpiry] = useState<string>('2027-12-31');
  const [newCodeCommType, setNewCodeCommType] = useState<'percentage' | 'fixed'>('fixed');
  const [newCodeCommValue, setNewCodeCommValue] = useState<number>(40);

  // Stats Calculations
  const totalSales = orders.reduce((sum, o) => (o.status !== 'cancelled' ? sum + o.total : sum), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const confirmedOrdersCount = orders.filter((o) => o.status === 'confirmed').length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'delivered').length;
  const totalCommissionsOwed = orders.reduce((sum, o) => {
    if (o.status !== 'cancelled' && o.marketerCommission) {
      return sum + o.marketerCommission;
    }
    return sum;
  }, 0);

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
    const q = orderSearchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhone.includes(q) ||
      o.governorate.toLowerCase().includes(q) ||
      (o.promoCodeUsed && o.promoCodeUsed.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  // Handle Add Product Submit
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: newProdName,
        nameEn: newProdNameEn,
        category: newProdCategory,
        price: Number(newProdPrice),
        originalPrice: Number(newProdOriginalPrice) || undefined,
        stock: Number(newProdStock),
        image: newProdImage || editingProduct.image,
        description: newProdDesc,
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: newProdName,
        nameEn: newProdNameEn,
        category: newProdCategory,
        price: Number(newProdPrice),
        originalPrice: Number(newProdOriginalPrice) || undefined,
        stock: Number(newProdStock),
        image: newProdImage || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
        description: newProdDesc,
        rating: 5.0,
        reviewsCount: 1,
        isFeatured: true,
      });
    }
    setIsAddProductOpen(false);
    resetProductForm();
  };

  const openEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setNewProdName(prod.name);
    setNewProdNameEn(prod.nameEn);
    setNewProdCategory(prod.category);
    setNewProdPrice(prod.price);
    setNewProdOriginalPrice(prod.originalPrice || 0);
    setNewProdStock(prod.stock);
    setNewProdImage(prod.image);
    setNewProdDesc(prod.description);
    setIsAddProductOpen(true);
  };

  const resetProductForm = () => {
    setNewProdName('');
    setNewProdNameEn('');
    setNewProdCategory('عطور ملكية');
    setNewProdPrice(500);
    setNewProdOriginalPrice(700);
    setNewProdStock(20);
    setNewProdImage('');
    setNewProdDesc('');
    setEditingProduct(null);
  };

  // Handle Add Promo Code Submit
  const handleSavePromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPromo) {
      updatePromoCode(editingPromo.id, {
        code: newCodeStr,
        marketerName: newCodeMarketer,
        marketerPhone: newCodePhone,
        discountType: newCodeType,
        discountValue: Number(newCodeValue),
        maxUses: Number(newCodeMaxUses),
        expiryDate: newCodeExpiry,
        commissionType: newCodeCommType,
        commissionValue: Number(newCodeCommValue),
      });
      setEditingPromo(null);
    } else {
      addPromoCode({
        code: newCodeStr,
        marketerName: newCodeMarketer,
        marketerPhone: newCodePhone,
        discountType: newCodeType,
        discountValue: Number(newCodeValue),
        maxUses: Number(newCodeMaxUses),
        expiryDate: newCodeExpiry,
        commissionType: newCodeCommType,
        commissionValue: Number(newCodeCommValue),
        isActive: true,
      });
    }
    setIsAddPromoOpen(false);
    resetPromoForm();
  };

  const openEditPromo = (promo: PromoCode) => {
    setEditingPromo(promo);
    setNewCodeStr(promo.code);
    setNewCodeMarketer(promo.marketerName);
    setNewCodePhone(promo.marketerPhone);
    setNewCodeType(promo.discountType);
    setNewCodeValue(promo.discountValue);
    setNewCodeMaxUses(promo.maxUses);
    setNewCodeExpiry(promo.expiryDate);
    setNewCodeCommType(promo.commissionType);
    setNewCodeCommValue(promo.commissionValue);
    setIsAddPromoOpen(true);
  };

  const resetPromoForm = () => {
    setNewCodeStr('');
    setNewCodeMarketer('');
    setNewCodePhone('');
    setNewCodeType('percentage');
    setNewCodeValue(10);
    setNewCodeMaxUses(50);
    setNewCodeExpiry('2027-12-31');
    setNewCodeCommType('fixed');
    setNewCodeCommValue(40);
    setEditingPromo(null);
  };

  // Status Badge Helper
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1">
            <Clock className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
            جديد (بانتظار التأكيد)
          </span>
        );
      case 'confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            تم التأكيد هاتفياً
          </span>
        );
      case 'preparing':
        return (
          <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1">
            <Package className="w-3 h-3" />
            قيد التجهيز والتغليف
          </span>
        );
      case 'shipping':
        return (
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1">
            <Truck className="w-3 h-3" />
            في الطريق مع المندوب
          </span>
        );
      case 'delivered':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            تم التسليم بنجاح
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold">
            ملغي / لم يتم الرد
          </span>
        );
      case 'returned':
        return (
          <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
            مرتجع
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#040810] text-slate-100 pb-20">
      
      {/* Top Banner */}
      <div className="bg-[#091526] border-b border-amber-500/20 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              لوحة التحكم الملكية • Blue Lotus Admin
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              إدارة الطلبات، تأكيد الواتساب بضغطة زر، المخزون، والمسوقين
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-2">
              <span className="font-bold">أوردرات معلقة:</span>
              <span className="font-mono font-black text-amber-400 px-1.5 py-0.5 rounded-full bg-amber-500/20">
                {pendingOrdersCount}
              </span>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
              <span className="font-bold">مبيعات:</span>
              <span className="font-mono font-black text-emerald-400">
                {totalSales} ج.م
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-amber-500/20">
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'orders'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'bg-[#0a182b] text-slate-300 hover:text-white border border-amber-500/20'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>الطلبات ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-[10px] font-black animate-pulse">
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'analytics'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'bg-[#0a182b] text-slate-300 hover:text-white border border-amber-500/20'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>الإحصائيات والأرباح</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'products'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'bg-[#0a182b] text-slate-300 hover:text-white border border-amber-500/20'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>المنتجات والمخزون ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('promos')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'promos'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'bg-[#0a182b] text-slate-300 hover:text-white border border-amber-500/20'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>البرومو كود والمسوقين ({promoCodes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'shipping'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'bg-[#0a182b] text-slate-300 hover:text-white border border-amber-500/20'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>أسعار الشحن للمحافظات ({governorates.length})</span>
          </button>

        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        
        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl bg-[#091526]/80 border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="بحث برقم الطلب، اسم العميل، الهاتف، المحافظة..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-[#050b14] border border-amber-500/30 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                />
                <Search className="w-4 h-4 text-amber-400/60 absolute right-3 top-3" />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'pending', label: 'قيد الانتظار' },
                  { id: 'confirmed', label: 'تم التأكيد' },
                  { id: 'preparing', label: 'قيد التجهيز' },
                  { id: 'shipping', label: 'في الطريق' },
                  { id: 'delivered', label: 'تم التسليم' },
                  { id: 'cancelled', label: 'ملغي' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderStatusFilter(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                      orderStatusFilter === st.id
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-400/80'
                        : 'bg-slate-800/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-[#091526]/40 rounded-2xl border border-amber-500/10">
                <p className="text-slate-400 text-sm font-bold">لا توجد طلبات مطابقة للبحث</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-5 rounded-2xl bg-gradient-to-b from-[#0a182b] to-[#060e1a] border transition-all ${
                      order.status === 'pending'
                        ? 'border-amber-500/60 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                        : 'border-amber-500/20'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-amber-500/15">
                      
                      {/* Left Header info */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-base font-black text-amber-300 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                          #{order.orderNumber}
                        </span>
                        {getStatusBadge(order.status)}
                        <span className="text-xs text-slate-400">
                          {order.createdAt}
                        </span>
                      </div>

                      {/* Right Quick Actions: Call + WhatsApp */}
                      <div className="flex items-center gap-2 w-full lg:w-auto">
                        
                        {/* Direct Call Button */}
                        <a
                          href={`tel:${order.customerPhone}`}
                          className="flex-1 lg:flex-none px-3.5 py-2 rounded-xl bg-blue-950/80 text-blue-300 border border-blue-500/40 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-blue-900 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>اتصال ({order.customerPhone})</span>
                        </a>

                        {/* Instant Pre-formatted WhatsApp Button */}
                        <a
                          href={generateWhatsAppLink(order)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 lg:flex-none px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5 hover:brightness-110 transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-white" />
                          <span>تأكيد واتساب 💬</span>
                        </a>

                        {/* Delete Order */}
                        <button
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف هذا الأوردر نهائياً؟')) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                          title="حذف الأوردر"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>

                    {/* Order Body Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-xs">
                      
                      {/* Customer Details */}
                      <div className="space-y-1.5 text-right">
                        <p className="text-slate-400 font-bold">بيانات العميل والشحن:</p>
                        <p className="text-white text-sm font-black">{order.customerName}</p>
                        <p className="text-amber-300 font-bold">المحافظة: {order.governorate}</p>
                        <p className="text-slate-300">العنوان: {order.address}</p>
                        {order.notes && (
                          <p className="text-amber-200/70 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                            ملاحظة: {order.notes}
                          </p>
                        )}
                      </div>

                      {/* Items Ordered */}
                      <div className="space-y-2 text-right">
                        <p className="text-slate-400 font-bold">المنتجات المطلوبة ({order.items.length}):</p>
                        <div className="space-y-1.5">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#07111e] border border-amber-500/15">
                              <span className="text-white font-semibold line-clamp-1">{item.productName}</span>
                              <span className="text-amber-300 font-mono font-bold shrink-0">
                                × {item.quantity} ({item.price * item.quantity} ج.م)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Accounting, Promo & Status Controller */}
                      <div className="space-y-2 text-right bg-[#07111e] p-3.5 rounded-xl border border-amber-500/20">
                        <div className="flex justify-between">
                          <span className="text-slate-400">الشحن:</span>
                          <span className="text-white font-bold">
                            {order.shippingCost === 0 ? 'مجاني' : `${order.shippingCost} ج.م`}
                          </span>
                        </div>

                        {order.promoCodeUsed && (
                          <div className="flex justify-between text-emerald-400 font-bold">
                            <span>كود ({order.promoCodeUsed}):</span>
                            <span>- {order.discount} ج.م</span>
                          </div>
                        )}

                        {order.marketerName && (
                          <div className="flex justify-between text-amber-300 text-[11px] bg-amber-500/10 p-1.5 rounded">
                            <span>عمولة المسوق ({order.marketerName}):</span>
                            <span className="font-bold">{order.marketerCommission || 0} ج.م</span>
                          </div>
                        )}

                        <div className="flex justify-between text-sm font-black text-amber-400 pt-1 border-t border-amber-500/20">
                          <span>المطلوب تحصيله:</span>
                          <span className="text-base">{order.total} ج.م</span>
                        </div>

                        {/* Status Change Dropdown */}
                        <div className="pt-2">
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">
                            تحديث حالة الأوردر:
                          </label>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="w-full px-3 py-2 rounded-lg bg-[#050b14] border border-amber-500/30 text-white text-xs font-bold focus:border-amber-400 focus:outline-none"
                          >
                            <option value="pending">جديد (قيد الانتظار)</option>
                            <option value="confirmed">تم التأكيد هاتفياً</option>
                            <option value="preparing">قيد التجهيز والتغليف</option>
                            <option value="shipping">في الطريق مع المندوب</option>
                            <option value="delivered">تم التسليم بنجاح</option>
                            <option value="cancelled">ملغي / لم يتم الرد</option>
                            <option value="returned">مرتجع</option>
                          </select>
                        </div>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            
            {/* 4 Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1e36] to-[#07111e] border border-amber-500/30">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>إجمالي المبيعات</span>
                  <DollarSign className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-amber-300 mt-2">
                  {totalSales} <span className="text-sm font-normal text-amber-200/80">ج.م</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">من الطلبات المؤكدة والناجحة</p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1e36] to-[#07111e] border border-amber-500/30">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>إجمالي الطلبات</span>
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white mt-2">
                  {orders.length}
                </p>
                <p className="text-[11px] text-emerald-400 mt-1">{deliveredOrdersCount} طلب تم تسليمه بنجاح</p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1e36] to-[#07111e] border border-amber-500/30">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>أوردرات تنتظر الاتصال</span>
                  <Clock className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
                  {pendingOrdersCount}
                </p>
                <p className="text-[11px] text-amber-200/80 mt-1">تتطلب اتصال أو رسالة واتساب</p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1e36] to-[#07111e] border border-amber-500/30">
                <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
                  <span>عمولات المسوقين المستحقة</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-300 mt-2">
                  {totalCommissionsOwed} <span className="text-sm font-normal text-emerald-200/80">ج.م</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">أرباح أصحاب الأكواد</p>
              </div>

            </div>

            {/* Marketers Performance Table */}
            <div className="p-6 rounded-2xl bg-[#091526]/80 border border-amber-500/25 space-y-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>أداء المسوقين والعمولات المكتسبة (Affiliate Marketers)</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-amber-500/20 text-slate-400">
                      <th className="py-2.5 px-3">اسم المسوق</th>
                      <th className="py-2.5 px-3">الكود</th>
                      <th className="py-2.5 px-3">مرات الاستخدام</th>
                      <th className="py-2.5 px-3">الحد الأقصى</th>
                      <th className="py-2.5 px-3">نسبة أو قيمة الخصم</th>
                      <th className="py-2.5 px-3">العمولة لكل أوردر</th>
                      <th className="py-2.5 px-3">إجمالي أرباحه</th>
                      <th className="py-2.5 px-3">تواصل</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-amber-500/10">
                    {promoCodes.map((code) => {
                      const totalEarnings =
                        code.commissionType === 'fixed'
                          ? code.currentUses * code.commissionValue
                          : 'متغير حسب السعر';

                      return (
                        <tr key={code.id} className="hover:bg-white/5">
                          <td className="py-3 px-3 font-bold text-white">{code.marketerName}</td>
                          <td className="py-3 px-3 font-mono text-amber-300 font-bold">{code.code}</td>
                          <td className="py-3 px-3 font-mono font-bold">{code.currentUses}</td>
                          <td className="py-3 px-3 text-slate-400">{code.maxUses}</td>
                          <td className="py-3 px-3 text-emerald-400 font-bold">
                            {code.discountValue} {code.discountType === 'percentage' ? '%' : 'ج.م'}
                          </td>
                          <td className="py-3 px-3 text-amber-300 font-bold">
                            {code.commissionValue} {code.commissionType === 'percentage' ? '%' : 'ج.م'}
                          </td>
                          <td className="py-3 px-3 text-emerald-300 font-black font-mono">
                            {totalEarnings} ج.م
                          </td>
                          <td className="py-3 px-3">
                            <a
                              href={`https://wa.me/2${code.marketerPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                `أهلاً يا ${code.marketerName}، تقرير مبيعات كودك (${code.code}) في متجر Blue Lotus: تم استخدام كودك ${code.currentUses} مرة بإجمالي عمولة ${totalEarnings} ج.م!`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold hover:bg-emerald-500/30 flex items-center gap-1 w-max"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>واتساب</span>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PRODUCTS & STOCK */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            
            {/* Add Product Button */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white">إدارة المنتجات والمخزون</h3>
                <p className="text-xs text-slate-400">أضف منتجات جديدة أو عدّل الأسعار والكميات في أي وقت بدون لمس الكود</p>
              </div>

              <button
                onClick={() => {
                  resetProductForm();
                  setIsAddProductOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة منتج جديد</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => {
                const isOutOfStock = prod.stock <= 0;

                return (
                  <div
                    key={prod.id}
                    className={`p-4 rounded-2xl bg-[#0a182b] border ${
                      isOutOfStock ? 'border-red-500/40 bg-red-950/10' : 'border-amber-500/20'
                    } flex flex-col justify-between space-y-3`}
                  >
                    <div className="flex gap-3">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-amber-500/30 bg-slate-900">
                        <Image src={prod.image} alt={prod.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 text-right">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                          {prod.category}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">{prod.name}</h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-base font-black text-amber-400">{prod.price} ج.م</span>
                          {prod.originalPrice && (
                            <span className="text-xs text-slate-500 line-through">{prod.originalPrice} ج.م</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stock Controller */}
                    <div className="p-3 rounded-xl bg-[#050b14] border border-amber-500/20 flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-bold">الكمية بالمخزن:</span>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateProduct(prod.id, { stock: Math.max(0, prod.stock - 1) })}
                          className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-black"
                        >
                          -
                        </button>
                        
                        <span className={`font-mono font-black text-sm px-2 ${isOutOfStock ? 'text-red-400' : 'text-emerald-400'}`}>
                          {prod.stock}
                        </span>

                        <button
                          onClick={() => updateProduct(prod.id, { stock: prod.stock + 1 })}
                          className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-black"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {isOutOfStock && (
                      <div className="p-2 rounded-lg bg-red-950/80 border border-red-500/40 text-red-300 text-[11px] font-bold text-center">
                        ⚠️ المنتج مغلق أوتوماتيكياً أمام الزبائن لنفاد المخزون
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-amber-500/15">
                      <button
                        onClick={() => openEditProduct(prod)}
                        className="flex-1 py-2 rounded-lg bg-[#0f2542] hover:bg-[#163864] text-amber-200 text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكد من حذف المنتج "${prod.name}"؟`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30"
                        title="حذف المنتج"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 4: PROMO CODES & AFFILIATES */}
        {activeTab === 'promos' && (
          <div className="space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white">إدارة البرومو كود والمسوقين</h3>
                <p className="text-xs text-slate-400">أنشئ لكل مسوق كوده الخاص، مع تحديد عمولته، نسبة الخصم، وتاريخ الانتهاء</p>
              </div>

              <button
                onClick={() => {
                  resetPromoForm();
                  setIsAddPromoOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:brightness-110 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إنشاء كود جديد</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {promoCodes.map((code) => {
                const isExpired = new Date(code.expiryDate) < new Date();
                const isLimitReached = code.currentUses >= code.maxUses;

                return (
                  <div
                    key={code.id}
                    className={`p-5 rounded-2xl bg-[#0a182b] border ${
                      !code.isActive || isExpired || isLimitReached
                        ? 'border-slate-700 opacity-70'
                        : 'border-amber-500/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                    } space-y-4 text-right`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg font-black text-amber-300 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30">
                        {code.code}
                      </span>
                      <button
                        onClick={() => updatePromoCode(code.id, { isActive: !code.isActive })}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          code.isActive
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {code.isActive ? 'مفعّل' : 'معطّل'}
                      </button>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">اسم المسوق:</span>
                        <span className="text-white font-bold">{code.marketerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">هاتف المسوق:</span>
                        <span className="text-amber-300 font-mono">{code.marketerPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">قيمة الخصم للعميل:</span>
                        <span className="text-emerald-400 font-bold">
                          {code.discountValue} {code.discountType === 'percentage' ? '%' : 'ج.م'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">عمولة المسوق لكل أوردر:</span>
                        <span className="text-amber-300 font-bold">
                          {code.commissionValue} {code.commissionType === 'percentage' ? '%' : 'ج.م'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">تاريخ الانتهاء:</span>
                        <span className="text-slate-300 font-mono">{code.expiryDate}</span>
                      </div>
                    </div>

                    {/* Usage Progress */}
                    <div className="space-y-1.5 pt-2 border-t border-amber-500/15">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">مرات الاستخدام:</span>
                        <span className="text-amber-400 font-mono font-bold">
                          {code.currentUses} / {code.maxUses}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
                          style={{ width: `${Math.min(100, (code.currentUses / code.maxUses) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => openEditPromo(code)}
                        className="flex-1 py-2 rounded-lg bg-[#0f2542] hover:bg-[#163864] text-amber-200 text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`حذف كود الخصم "${code.code}"؟`)) {
                            deletePromoCode(code.id);
                          }
                        }}
                        className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB 5: SHIPPING RATES */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            
            {/* Free Shipping Threshold Setting */}
            <div className="p-5 rounded-2xl bg-[#091526]/80 border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-black text-white">حد الشحن المجاني (Free Shipping Threshold)</h3>
                <p className="text-xs text-slate-400">لو إجمالي مشتريات العميل وصلت لهذا الرقم، يحصل تلقائياً على شحن مجاني لكافة المحافظات</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={freeShippingThreshold}
                  onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                  className="w-28 px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-amber-300 font-mono font-black text-center text-base focus:border-amber-400 focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-300">ج.م</span>
              </div>
            </div>

            {/* Governorates Table */}
            <div className="p-5 rounded-2xl bg-[#091526]/80 border border-amber-500/25 space-y-4">
              <h3 className="text-sm font-black text-white">تسعيرة الشحن لكل محافظة من محافظات مصر (27 محافظة):</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {governorates.map((gov) => (
                  <div key={gov.id} className="p-3 rounded-xl bg-[#07111e] border border-amber-500/20 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{gov.nameAr}</p>
                      <p className="text-[10px] text-slate-500">{gov.nameEn}</p>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={gov.cost}
                        onChange={(e) => updateGovernorateCost(gov.id, Number(e.target.value))}
                        className="w-16 px-2 py-1 rounded bg-[#050b14] border border-amber-500/30 text-amber-300 text-xs font-mono font-bold text-center focus:border-amber-400 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 font-bold">ج.م</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#0c1a2e] border border-amber-500/40 rounded-3xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-4">
              <h3 className="text-lg font-black text-white">
                {editingProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج ملكي جديد'}
              </h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-right text-xs">
              <div>
                <label className="block text-slate-200 font-bold mb-1">اسم المنتج بالعربية *</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="مثال: عطر لوتس آمون 100ml"
                  className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">الاسم بالإنجليزية (اختياري)</label>
                <input
                  type="text"
                  value={newProdNameEn}
                  onChange={(e) => setNewProdNameEn(e.target.value)}
                  placeholder="Royal Amun Lotus Extrait"
                  className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white focus:border-amber-400 focus:outline-none text-left"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-bold mb-1">التصنيف</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="عطور ملكية">عطور ملكية</option>
                    <option value="عناية فاخرة">عناية فاخرة</option>
                    <option value="عناية بالبشرة">عناية بالبشرة</option>
                    <option value="أجواء منزلية">أجواء منزلية</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-200 font-bold mb-1">الكمية بالمخزن (Stock) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-bold mb-1">سعر البيع (ج.م) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-amber-300 font-bold focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 font-bold mb-1">السعر الأصلي قبل الخصم (ج.م)</label>
                  <input
                    type="number"
                    value={newProdOriginalPrice}
                    onChange={(e) => setNewProdOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-slate-400 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">رابط صورة المنتج (Image URL)</label>
                <input
                  type="url"
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white focus:border-amber-400 focus:outline-none text-left"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">وصف المنتج ومكوناته *</label>
                <textarea
                  rows={3}
                  required
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="مزيج فاخر من مستخلصات اللوتس وعنبر الملوك..."
                  className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md hover:brightness-110"
                >
                  حفظ المنتج
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PROMO CODE */}
      {isAddPromoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#0c1a2e] border border-amber-500/40 rounded-3xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-4">
              <h3 className="text-lg font-black text-white">
                {editingPromo ? 'تعديل البرومو كود' : 'إنشاء برومو كود جديد لمسوق'}
              </h3>
              <button
                onClick={() => setIsAddPromoOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePromoCode} className="space-y-4 text-right text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-bold mb-1">كود الخصم (Promo Code) *</label>
                  <input
                    type="text"
                    required
                    value={newCodeStr}
                    onChange={(e) => setNewCodeStr(e.target.value.toUpperCase())}
                    placeholder="مثال: SALMA20"
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-amber-300 font-mono font-bold uppercase focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 font-bold mb-1">اسم المسوق / الشخص *</label>
                  <input
                    type="text"
                    required
                    value={newCodeMarketer}
                    onChange={(e) => setNewCodeMarketer(e.target.value)}
                    placeholder="مثال: سلمى محمود"
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-200 font-bold mb-1">رقم هاتف المسوق (لإرسال العمولات على واتساب)</label>
                <input
                  type="tel"
                  required
                  value={newCodePhone}
                  onChange={(e) => setNewCodePhone(e.target.value)}
                  placeholder="010xxxxxxxx"
                  className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white font-mono text-left focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-bold mb-1">نوع الخصم للعميل</label>
                  <select
                    value={newCodeType}
                    onChange={(e) => setNewCodeType(e.target.value as 'percentage' | 'fixed')}
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="percentage">نسبة مئوية (%)</option>
                    <option value="fixed">مبلغ ثابت (ج.م)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-200 font-bold mb-1">قيمة الخصم *</label>
                  <input
                    type="number"
                    required
                    value={newCodeValue}
                    onChange={(e) => setNewCodeValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-emerald-300 font-bold focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-bold mb-1">نوع عمولة المسوق</label>
                  <select
                    value={newCodeCommType}
                    onChange={(e) => setNewCodeCommType(e.target.value as 'percentage' | 'fixed')}
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="fixed">مبلغ ثابت لكل أوردر (ج.م)</option>
                    <option value="percentage">نسبة مئوية من الأوردر (%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-200 font-bold mb-1">عمولة المسوق *</label>
                  <input
                    type="number"
                    required
                    value={newCodeCommValue}
                    onChange={(e) => setNewCodeCommValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-amber-300 font-bold focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-200 font-bold mb-1">حد أقصى لعدد الاستخدامات *</label>
                  <input
                    type="number"
                    required
                    value={newCodeMaxUses}
                    onChange={(e) => setNewCodeMaxUses(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-200 font-bold mb-1">تاريخ انتهاء الصلاحية *</label>
                  <input
                    type="date"
                    required
                    value={newCodeExpiry}
                    onChange={(e) => setNewCodeExpiry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#050b14] border border-amber-500/30 text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddPromoOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md hover:brightness-110"
                >
                  حفظ البرومو كود
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
