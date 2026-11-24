'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useStore } from '../context/StoreContext';
import { Product, PromoCode, Order, OrderStatus, SocialPlatform, PromoTargetType } from '../types';
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
  Plus,
  Trash2,
  Edit,
  Search,
  DollarSign,
  Users,
  ShieldCheck,
  X,
  Lock,
  LogOut,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  Upload,
  Share2,
  Globe,
  MessageCircle,
  ExternalLink,
  Check,
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
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    changeAdminPassword,
    clearAllOrders,
    setCurrentView,
    storeSettings,
    updateOfficialWhatsApp,
    addSocialLink,
    deleteSocialLink,
  } = useStore();

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Change Password Modal
  const [isChangePwdOpen, setIsChangePwdOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [pwdChangedSuccess, setPwdChangedSuccess] = useState(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'analytics' | 'products' | 'promos' | 'shipping' | 'settings'>('orders');

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
  const [newCodeTargetType, setNewCodeTargetType] = useState<PromoTargetType>('all');
  const [newCodeTargetProdId, setNewCodeTargetProdId] = useState<string>('');
  const [newCodeMaxUses, setNewCodeMaxUses] = useState<number>(50);
  const [newCodeExpiry, setNewCodeExpiry] = useState<string>('2027-12-31');
  const [newCodeCommType, setNewCodeCommType] = useState<'percentage' | 'fixed'>('fixed');
  const [newCodeCommValue, setNewCodeCommValue] = useState<number>(40);

  // Store Settings State (WhatsApp & Social Links)
  const [tempWhatsApp, setTempWhatsApp] = useState<string>(storeSettings?.officialWhatsApp || '');
  const [whatsAppSavedSuccess, setWhatsAppSavedSuccess] = useState<boolean>(false);
  const [newSocialPlatform, setNewSocialPlatform] = useState<SocialPlatform>('instagram');
  const [newSocialUrl, setNewSocialUrl] = useState<string>('');
  const [socialError, setSocialError] = useState<string | null>(null);

  useEffect(() => {
    if (storeSettings?.officialWhatsApp) {
      setTempWhatsApp(storeSettings.officialWhatsApp);
    }
  }, [storeSettings?.officialWhatsApp]);

  const handleSaveWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempWhatsApp.trim()) return;
    updateOfficialWhatsApp(tempWhatsApp.trim());
    setWhatsAppSavedSuccess(true);
    setTimeout(() => {
      setWhatsAppSavedSuccess(false);
    }, 3500);
  };

  const handleAddSocial = (e: React.FormEvent) => {
    e.preventDefault();
    setSocialError(null);
    let trimmed = newSocialUrl.trim();
    if (!trimmed) {
      setSocialError('يرجى كتابة رابط الحساب أو القناة');
      return;
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      trimmed = 'https://' + trimmed;
    }
    addSocialLink({ platform: newSocialPlatform, url: trimmed });
    setNewSocialUrl('');
  };

  const platformDisplayNames: Record<SocialPlatform, string> = {
    instagram: 'إنستغرام (Instagram)',
    facebook: 'فيسبوك (Facebook)',
    tiktok: 'تيك توك (TikTok)',
    whatsapp: 'واتساب (WhatsApp)',
    telegram: 'تيليجرام (Telegram)',
    youtube: 'يوتيوب (YouTube)',
    snapchat: 'سناب شات (Snapchat)',
    x: 'منصة X (تويتر)',
  };

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const success = loginAdmin(passwordInput);
    if (!success) {
      setLoginError('كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى');
    } else {
      setPasswordInput('');
    }
  };

  // If NOT logged in, show Password Protected Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#040810]">
        <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#0c1a2e] to-[#060e1a] border border-amber-500/40 shadow-2xl space-y-6 text-center">
          
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-xl font-black text-white">لوحة تحكم الإدارة</h2>
            <p className="text-xs text-slate-400">
              هذه الصفحة مخصصة لمالك المتجر فقط، أدخل كلمة المرور للدخول
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 text-right">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="أدخل كلمة المرور..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#050b14] border border-amber-500/30 text-white placeholder-slate-500 text-sm text-center font-mono focus:border-amber-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              دخول لوحة الأدمن
            </button>
          </form>

          <div className="pt-2 border-t border-amber-500/15 flex items-center justify-center text-xs text-slate-500">
            <button
              onClick={() => setCurrentView('store')}
              className="text-slate-400 hover:text-amber-300 underline font-bold"
            >
              العودة للمتجر
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Stats Calculations
  const totalSales = orders.reduce((sum, o) => (o.status !== 'cancelled' ? sum + o.total : sum), 0);
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
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

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setNewProdImage(compressedDataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
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
    const targetProd = products.find((p) => p.id === newCodeTargetProdId);
    const targetData = {
      targetType: newCodeTargetType,
      targetProductId: newCodeTargetType === 'specific_product' ? newCodeTargetProdId : undefined,
      targetProductName: newCodeTargetType === 'specific_product' && targetProd ? targetProd.name : undefined,
    };

    if (editingPromo) {
      updatePromoCode(editingPromo.id, {
        code: newCodeStr,
        marketerName: newCodeMarketer,
        marketerPhone: newCodePhone,
        discountType: newCodeType,
        discountValue: Number(newCodeValue),
        ...targetData,
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
        ...targetData,
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
    setNewCodeTargetType(promo.targetType || 'all');
    setNewCodeTargetProdId(promo.targetProductId || (products[0]?.id || ''));
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
    setNewCodeTargetType('all');
    setNewCodeTargetProdId(products[0]?.id || '');
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
            <Clock className="w-3 h-3" />
            جديد (بانتظار التأكيد)
          </span>
        );
      case 'confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            تم التأكيد
          </span>
        );
      case 'preparing':
        return (
          <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1">
            <Package className="w-3 h-3" />
            قيد التجهيز
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
            ملغي
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
              لوحة تحكم المتجر (الأدمن)
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              متابعة الطلبات، تأكيد الواتساب، إدارة المنتجات والمسوقين
            </p>
          </div>

          {/* Quick Metrics Bar & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-center gap-2">
              <span className="font-bold">أوردرات جديدة:</span>
              <span className="font-mono font-black text-amber-400 px-1.5 py-0.5 rounded-full bg-amber-500/20">
                {pendingOrdersCount}
              </span>
            </div>

            <button
              onClick={() => setIsChangePwdOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1 font-bold"
              title="تغيير كلمة المرور"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>الباسورد</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-xl bg-red-950/80 text-red-300 hover:bg-red-900 border border-red-500/40 flex items-center gap-1 font-bold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-amber-500/20">
          
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
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
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
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
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
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
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
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
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'shipping'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'bg-[#0a182b] text-slate-300 hover:text-white border border-amber-500/20'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>أسعار الشحن للمحافظات</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'bg-[#0a182b] text-slate-300 hover:text-white border border-amber-500/20'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>التواصل والسوشيال ميديا</span>
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
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
              <div className="text-center py-16 bg-[#091526]/40 rounded-2xl border border-amber-500/10 space-y-2">
                <ShoppingBag className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                <p className="text-slate-300 text-sm font-bold">لا توجد طلبات مسجلة حالياً</p>
                <p className="text-xs text-slate-500">
                  بمجرد أن يقوم العميل بطلب منتج من المتجر، سيظهر هنا فوراً مع بياناته ورقم هاتفه وزر الواتساب.
                </p>
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
                            if (confirm('هل أنت متأكد من حذف هذا الأوردر؟')) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
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
                        <p className="text-slate-400 font-bold">بيانات العميل:</p>
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
                            <option value="cancelled">ملغي</option>
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

              {promoCodes.length === 0 ? (
                <p className="text-slate-400 text-xs text-center py-6">
                  لم تقم بإنشاء أي برومو كود لمسوقين بعد. يمكنك إضافة كود جديد من تبويب "البرومو كود والمسوقين".
                </p>
              ) : (
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
                                  `أهلاً يا ${code.marketerName}، تقرير مبيعات كودك (${code.code}): تم استخدام كودك ${code.currentUses} مرة بإجمالي عمولة ${totalEarnings} ج.م!`
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
              )}
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
                <p className="text-xs text-slate-400">أضف منتجات جديدة، عدّل الأسعار والمخزون، أو احذف منتجات في أي وقت</p>
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
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
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
                          className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-black cursor-pointer"
                        >
                          -
                        </button>
                        
                        <span className={`font-mono font-black text-sm px-2 ${isOutOfStock ? 'text-red-400' : 'text-emerald-400'}`}>
                          {prod.stock}
                        </span>

                        <button
                          onClick={() => updateProduct(prod.id, { stock: prod.stock + 1 })}
                          className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-black cursor-pointer"
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
                        className="flex-1 py-2 rounded-lg bg-[#0f2542] hover:bg-[#163864] text-amber-200 text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-1 cursor-pointer"
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
                        className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30 cursor-pointer"
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

            {promoCodes.length === 0 ? (
              <div className="text-center py-16 bg-[#091526]/40 rounded-2xl border border-amber-500/10 space-y-2">
                <Tag className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                <p className="text-slate-300 text-sm font-bold">لا يوجد أي برومو كود حالياً</p>
                <p className="text-xs text-slate-500">
                  اضغط على زر "إنشاء كود جديد" لإنشاء كود خصم خاص بمسوق محدد باسمه وعمولته.
                </p>
              </div>
            ) : (
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
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer ${
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
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">قيمة الخصم للعميل:</span>
                          <span className="text-emerald-400 font-bold">
                            {code.discountValue} {code.discountType === 'percentage' ? '%' : 'ج.م'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">نطاق تطبيق الخصم:</span>
                          {code.targetType === 'specific_product' ? (
                            <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-bold">
                              🎯 {code.targetProductName || 'منتج محدد'}
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px] font-bold">
                              ✨ كل المنتجات
                            </span>
                          )}
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
                          className="flex-1 py-2 rounded-lg bg-[#0f2542] hover:bg-[#163864] text-amber-200 text-xs font-bold border border-amber-500/30 flex items-center justify-center gap-1 cursor-pointer"
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
                          className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* TAB 5: SHIPPING RATES */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            
            {/* Free Shipping Threshold Setting */}
            <div className="p-5 rounded-2xl bg-[#091526]/80 border border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-sm sm:text-base font-black text-white">حد الشحن المجاني</h3>
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

        {/* TAB 6: SETTINGS (WHATSAPP & SOCIAL MEDIA) */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            
            {/* Header info */}
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">إعدادات التواصل وحسابات السوشيال ميديا</h3>
              <p className="text-xs text-slate-400">
                تحكم برقم الواتساب الرسمي لخدمة العملاء وروابط صفحاتك على مواقع التواصل الاجتماعي لتظهر لجميع عملائك
              </p>
            </div>

            {/* SECTION 1: OFFICIAL WHATSAPP */}
            <div className="p-6 rounded-2xl bg-[#091526]/90 border border-amber-500/30 space-y-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white">رقم الواتساب الرسمي لخدمة العملاء</h4>
                  <p className="text-xs text-slate-400">
                    هذا الرقم يظهر في الزر العائم، أسفل الموقع (Footer)، ورسائل تأكيد الطلب للعملاء
                  </p>
                </div>
              </div>

              {whatsAppSavedSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>تم حفظ وتحديث رقم الواتساب الرسمي بنجاح! تم ربطه مع كافة صفحات المتجر.</span>
                </div>
              )}

              <form onSubmit={handleSaveWhatsApp} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <div className="relative flex-1">
                  <input
                    type="tel"
                    required
                    value={tempWhatsApp}
                    onChange={(e) => setTempWhatsApp(e.target.value)}
                    placeholder="مثال: 01012345678"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050b14] border border-amber-500/30 text-white font-mono text-base font-bold text-left focus:border-amber-400 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-mono">
                    🇪🇬 مصر (+20)
                  </span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-xs sm:text-sm hover:brightness-110 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>حفظ رقم الواتساب</span>
                </button>
              </form>

              {tempWhatsApp && (
                <div className="pt-2 flex items-center gap-2 text-xs">
                  <span className="text-slate-400">معاينة رابط الدردشة:</span>
                  <a
                    href={`https://wa.me/2${tempWhatsApp.replace(/\D/g, '')}?text=${encodeURIComponent('مرحباً، أود الاستفسار عن عطور بلو لوتس الملكية')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 font-mono underline flex items-center gap-1"
                  >
                    <span>فتح محادثة تجريبية على هذا الرقم</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* SECTION 2: SOCIAL MEDIA PLATFORMS */}
            <div className="p-6 rounded-2xl bg-[#091526]/90 border border-amber-500/30 space-y-6 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-black text-white">منصات ومواقع التواصل الاجتماعي</h4>
                  <p className="text-xs text-slate-400">
                    أضف روابط حساباتك الرسمية لتظهر كأيقونات تفاعلية في أسفل المتجر (Footer)
                  </p>
                </div>
              </div>

              {/* Add New Social Link Form */}
              <form onSubmit={handleAddSocial} className="p-4 rounded-xl bg-[#050b14] border border-amber-500/20 space-y-3">
                <div className="text-xs font-bold text-amber-300">إضافة رابط منصة جديدة:</div>
                
                {socialError && (
                  <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{socialError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-300 text-xs mb-1 font-bold">اختر المنصة:</label>
                    <select
                      value={newSocialPlatform}
                      onChange={(e) => setNewSocialPlatform(e.target.value as SocialPlatform)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0a182b] border border-amber-500/30 text-white text-xs font-bold focus:border-amber-400 focus:outline-none"
                    >
                      <option value="instagram">إنستغرام (Instagram)</option>
                      <option value="facebook">فيسبوك (Facebook)</option>
                      <option value="tiktok">تيك توك (TikTok)</option>
                      <option value="whatsapp">واتساب (WhatsApp)</option>
                      <option value="telegram">تيليجرام (Telegram)</option>
                      <option value="youtube">يوتيوب (YouTube)</option>
                      <option value="snapchat">سناب شات (Snapchat)</option>
                      <option value="x">منصة X (تويتر سابقاً)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 text-xs mb-1 font-bold">رابط الصفحة أو الحساب:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSocialUrl}
                        onChange={(e) => setNewSocialUrl(e.target.value)}
                        placeholder="https://instagram.com/yourpage"
                        className="flex-1 px-3 py-2 rounded-xl bg-[#0a182b] border border-amber-500/30 text-white font-mono text-xs text-left focus:border-amber-400 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 shrink-0 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة الرابط</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Active Social Media Links List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-300">الروابط المضافة حالياً وتظهر لعملائك:</h5>
                  <span className="text-[11px] text-amber-400 font-mono">
                    {storeSettings?.socialLinks?.length || 0} منصات مضافة
                  </span>
                </div>

                {(!storeSettings?.socialLinks || storeSettings.socialLinks.length === 0) ? (
                  <div className="text-center py-8 bg-[#050b14] rounded-xl border border-dashed border-slate-700 space-y-1">
                    <Share2 className="w-8 h-8 mx-auto text-slate-600 mb-1" />
                    <p className="text-slate-400 text-xs">لا يوجد روابط سوشيال ميديا مضافة بعد</p>
                    <p className="text-[11px] text-slate-600">أضف حساباتك أعلاه لتظهر للعملاء في الفوتر</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {storeSettings.socialLinks.map((link) => (
                      <div
                        key={link.id}
                        className="p-3.5 rounded-xl bg-[#07111e] border border-amber-500/20 flex items-center justify-between gap-3 hover:border-amber-500/40 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                            <Globe className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white">
                              {platformDisplayNames[link.platform] || link.platform}
                            </div>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-slate-400 hover:text-amber-300 font-mono truncate block text-left"
                              dir="ltr"
                            >
                              {link.url}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-[#0f2542] hover:bg-[#163864] text-amber-300 border border-amber-500/20"
                            title="فتح الرابط"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`هل أنت متأكد من حذف رابط ${platformDisplayNames[link.platform]}؟`)) {
                                deleteSocialLink(link.id);
                              }
                            }}
                            className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-500/30 cursor-pointer"
                            title="حذف الرابط"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        )}

      </div>

      {/* MODAL: CHANGE ADMIN PASSWORD */}
      {isChangePwdOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-sm bg-[#0c1a2e] border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <h3 className="text-base font-black text-white">تغيير كلمة مرور لوحة الأدمن</h3>
            
            {pwdChangedSuccess ? (
              <div className="p-4 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl font-bold">
                تم تغيير كلمة المرور بنجاح!
              </div>
            ) : (
              <div className="space-y-3">
                <input
                  type="password"
                  placeholder="أدخل كلمة المرور الجديدة..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#050b14] border border-amber-500/30 text-white text-center font-mono text-sm focus:border-amber-400 focus:outline-none"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsChangePwdOpen(false)}
                    className="w-1/3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => {
                      if (newPassword.trim().length >= 4) {
                        changeAdminPassword(newPassword);
                        setPwdChangedSuccess(true);
                        setTimeout(() => {
                          setPwdChangedSuccess(false);
                          setIsChangePwdOpen(false);
                          setNewPassword('');
                        }, 1500);
                      } else {
                        alert('يرجى إدخال كلمة مرور مكونة من 4 خانات على الأقل');
                      }
                    }}
                    className="flex-1 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-black hover:brightness-110 cursor-pointer"
                  >
                    حفظ الكلمة الجديدة
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#0c1a2e] border border-amber-500/40 rounded-3xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-4">
              <h3 className="text-lg font-black text-white">
                {editingProduct ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد'}
              </h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-right text-xs">
              <div>
                <label className="block text-slate-200 font-bold mb-1">اسم المنتج *</label>
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
                <label className="block text-slate-200 font-bold mb-1">صورة المنتج *</label>
                
                <div className="space-y-2">
                  {/* Image Preview */}
                  {newProdImage && (
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-amber-400/80 bg-slate-900 mx-auto group shadow-md">
                      <img
                        src={newProdImage}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setNewProdImage('')}
                        className="absolute inset-0 bg-red-950/80 text-red-300 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold transition-opacity cursor-pointer"
                      >
                        إزالة الصورة
                      </button>
                    </div>
                  )}

                  {/* Device File Upload Picker */}
                  <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-amber-500/40 hover:border-amber-400 rounded-xl bg-[#050b14] cursor-pointer transition-colors group">
                    <Upload className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform mb-1" />
                    <span className="text-xs font-bold text-amber-300">
                      اضغط لاختيار صورة من جهازك / موبايلك
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5">
                      يتم ضغط الصورة تلقائياً لتناسب التخزين وسرعة التصفح
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>

                  {/* Or Direct Image Link Input */}
                  <div>
                    <input
                      type="url"
                      value={newProdImage.startsWith('data:') ? '' : newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      placeholder="أو ضع رابط صورة خارجي اختياري (URL)..."
                      className="w-full px-3 py-1.5 rounded-lg bg-[#050b14] border border-amber-500/20 text-slate-300 text-[11px] focus:border-amber-400 focus:outline-none text-left"
                    />
                  </div>
                </div>
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
                  className="w-1/3 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md hover:brightness-110 cursor-pointer"
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
                className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
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

              {/* Promo Code Scope (All Products vs Specific Product) */}
              <div className="p-3.5 rounded-2xl bg-[#050b14] border border-amber-500/30 space-y-3">
                <div>
                  <label className="block text-slate-200 font-bold mb-1.5">
                    نطاق تطبيق الخصم:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewCodeTargetType('all')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        newCodeTargetType === 'all'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
                          : 'bg-[#091526] border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>✨ كل المنتجات (عام)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setNewCodeTargetType('specific_product');
                        if (!newCodeTargetProdId && products.length > 0) {
                          setNewCodeTargetProdId(products[0].id);
                        }
                      }}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        newCodeTargetType === 'specific_product'
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-sm'
                          : 'bg-[#091526] border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>🎯 منتج محدد فقط</span>
                    </button>
                  </div>
                </div>

                {newCodeTargetType === 'specific_product' && (
                  <div className="pt-2 border-t border-amber-500/20 space-y-1.5">
                    <label className="block text-amber-300 font-bold mb-1">
                      اختر المنتج المستهدف بالخصم: *
                    </label>
                    <select
                      value={newCodeTargetProdId}
                      onChange={(e) => setNewCodeTargetProdId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#091526] border border-amber-500/40 text-white font-bold focus:border-amber-400 focus:outline-none"
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — {p.price} ج.م ({p.category})
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-400">
                      سيتم تطبيق الخصم وقبوله فقط إذا احتوت سلة مشتريات العميل على هذا المنتج المحدد.
                    </p>
                  </div>
                )}
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
                  className="w-1/3 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md hover:brightness-110 cursor-pointer"
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
