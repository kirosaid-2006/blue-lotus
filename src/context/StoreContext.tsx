'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  PromoCode,
  Order,
  OrderStatus,
  GovernorateShipping,
  StoreSettings,
  SocialLink,
  SocialPlatform,
  PromoTargetType,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_PROMO_CODES,
  INITIAL_ORDERS,
  INITIAL_GOVERNORATES,
  INITIAL_SETTINGS,
} from '../data/initialData';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ValidationResult {
  valid: boolean;
  discountAmount: number;
  promoCode?: PromoCode;
  message?: string;
}

interface StoreContextType {
  products: Product[];
  promoCodes: PromoCode[];
  orders: Order[];
  governorates: GovernorateShipping[];
  freeShippingThreshold: number;
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  currentView: 'store' | 'admin' | 'tracking';
  setCurrentView: (view: 'store' | 'admin' | 'tracking') => void;
  
  // Store Settings (WhatsApp & Social Links)
  storeSettings: StoreSettings;
  updateOfficialWhatsApp: (newNumber: string) => void;
  addSocialLink: (link: Omit<SocialLink, 'id'>) => void;
  updateSocialLink: (id: string, updates: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (newPassword: string) => void;
  clearAllOrders: () => void;

  // Cart Actions
  addToCart: (product: Product, quantity?: number) => boolean;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;

  // Products CRUD
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Promo Codes CRUD & Validation
  addPromoCode: (code: Omit<PromoCode, 'id' | 'currentUses' | 'createdAt'>) => void;
  updatePromoCode: (id: string, updates: Partial<PromoCode>) => void;
  deletePromoCode: (id: string) => void;
  validatePromoCode: (codeStr: string, subtotal: number, items?: CartItem[]) => ValidationResult;

  // Orders CRUD
  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerWhatsapp?: string;
    governorate: string;
    address: string;
    notes?: string;
    promoCodeUsed?: string;
  }) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Shipping
  updateGovernorateCost: (id: string, newCost: number) => void;
  setFreeShippingThreshold: (val: number) => void;

  // WhatsApp generator
  generateWhatsAppLink: (order: Order) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'blue_lotus_products_v4',
  PROMO_CODES: 'blue_lotus_promo_codes_v4',
  ORDERS: 'blue_lotus_orders_v4',
  GOVERNORATES: 'blue_lotus_governorates_v4',
  CART: 'blue_lotus_cart_v4',
  SETTINGS: 'blue_lotus_settings_v4',
  ADMIN_PASSWORD: 'blue_lotus_admin_pwd_v4',
  ADMIN_LOGGED_IN: 'blue_lotus_admin_auth_v4',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(INITIAL_PROMO_CODES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [governorates, setGovernorates] = useState<GovernorateShipping[]>(INITIAL_GOVERNORATES);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(1200);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'store' | 'admin' | 'tracking'>('store');

  // Admin Auth State - Default password set to 'andro_abdo'
  const [adminPassword, setAdminPassword] = useState<string>('andro_abdo');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedProds = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (storedProds) {
        setProducts(JSON.parse(storedProds));
      } else {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      }

      const storedCodes = localStorage.getItem(STORAGE_KEYS.PROMO_CODES);
      if (storedCodes) setPromoCodes(JSON.parse(storedCodes));

      const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedGovs = localStorage.getItem(STORAGE_KEYS.GOVERNORATES);
      if (storedGovs) setGovernorates(JSON.parse(storedGovs));

      const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) {
        setStoreSettings(JSON.parse(storedSettings));
      } else {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      }

      const storedPwd = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
      if (storedPwd) {
        setAdminPassword(storedPwd);
      } else {
        localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, 'andro_abdo');
      }

      const storedAuth = sessionStorage.getItem(STORAGE_KEYS.ADMIN_LOGGED_IN);
      if (storedAuth === 'true') setIsAdminLoggedIn(true);
    } catch (e) {
      console.warn('LocalStorage initialization error:', e);
    }
  }, []);

  // Multi-Tab & Cross-Window Instant Sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.newValue) return;
      try {
        if (e.key === STORAGE_KEYS.PRODUCTS) {
          setProducts(JSON.parse(e.newValue));
        } else if (e.key === STORAGE_KEYS.ORDERS) {
          setOrders(JSON.parse(e.newValue));
        } else if (e.key === STORAGE_KEYS.PROMO_CODES) {
          setPromoCodes(JSON.parse(e.newValue));
        } else if (e.key === STORAGE_KEYS.GOVERNORATES) {
          setGovernorates(JSON.parse(e.newValue));
        } else if (e.key === STORAGE_KEYS.SETTINGS) {
          setStoreSettings(JSON.parse(e.newValue));
        } else if (e.key === STORAGE_KEYS.ADMIN_PASSWORD) {
          setAdminPassword(e.newValue);
        }
      } catch (err) {
        console.error('Storage sync error:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync Cart
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Store Settings (WhatsApp & Social Links)
  const updateOfficialWhatsApp = (newNumber: string) => {
    const cleanNumber = newNumber.trim();
    setStoreSettings((prev) => {
      const updated = { ...prev, officialWhatsApp: cleanNumber };
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const addSocialLink = (linkData: Omit<SocialLink, 'id'>) => {
    const newLink: SocialLink = {
      ...linkData,
      id: 'soc-' + Date.now(),
    };
    setStoreSettings((prev) => {
      const updated = {
        ...prev,
        socialLinks: [...prev.socialLinks, newLink],
      };
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    setStoreSettings((prev) => {
      const updated = {
        ...prev,
        socialLinks: prev.socialLinks.map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      };
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deleteSocialLink = (id: string) => {
    setStoreSettings((prev) => {
      const updated = {
        ...prev,
        socialLinks: prev.socialLinks.filter((item) => item.id !== id),
      };
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Admin Auth functions
  const loginAdmin = (enteredPassword: string): boolean => {
    if (enteredPassword.trim() === adminPassword.trim()) {
      setIsAdminLoggedIn(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_LOGGED_IN, 'true');
      } catch (e) {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_LOGGED_IN);
    } catch (e) {}
    setCurrentView('store');
  };

  const changeAdminPassword = (newPassword: string) => {
    if (!newPassword.trim()) return;
    const cleanPwd = newPassword.trim();
    setAdminPassword(cleanPwd);
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, cleanPwd);
    } catch (e) {}
  };

  const clearAllOrders = () => {
    setOrders([]);
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
    } catch (e) {}
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1): boolean => {
    if (product.stock <= 0) return false;
    
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + quantity, product.stock);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(quantity, product.stock) }];
    });
    setIsCartOpen(true);
    return true;
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.min(quantity, item.product.stock);
          return { ...item, quantity: validQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const getCartSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  // Products CRUD with synchronous LocalStorage persistence
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...prodData,
      id: 'prod-' + Date.now(),
    };
    setProducts((prev) => {
      const updated = [newProduct, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    removeFromCart(id);
  };

  // Promo Code CRUD with synchronous LocalStorage persistence
  const addPromoCode = (codeData: Omit<PromoCode, 'id' | 'currentUses' | 'createdAt'>) => {
    const newCode: PromoCode = {
      ...codeData,
      id: 'code-' + Date.now(),
      code: codeData.code.trim().toUpperCase(),
      currentUses: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setPromoCodes((prev) => {
      const updated = [newCode, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.PROMO_CODES, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updatePromoCode = (id: string, updates: Partial<PromoCode>) => {
    setPromoCodes((prev) => {
      const updated = prev.map((c) =>
        c.id === id
          ? {
              ...c,
              ...updates,
              code: updates.code ? updates.code.trim().toUpperCase() : c.code,
            }
          : c
      );
      try {
        localStorage.setItem(STORAGE_KEYS.PROMO_CODES, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deletePromoCode = (id: string) => {
    setPromoCodes((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.PROMO_CODES, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Validate Promo Code (Handles both "All Products" and "Specific Product")
  const validatePromoCode = (
    codeStr: string,
    subtotal: number,
    items?: CartItem[]
  ): ValidationResult => {
    if (!codeStr || !codeStr.trim()) {
      return { valid: false, discountAmount: 0 };
    }
    const cleanCode = codeStr.trim().toUpperCase();
    const found = promoCodes.find((c) => c.code === cleanCode);

    if (!found) {
      return { valid: false, discountAmount: 0, message: 'كود الخصم غير موجود أو غير صحيح' };
    }

    if (!found.isActive) {
      return { valid: false, discountAmount: 0, message: 'هذا الكود غير مفعّل حالياً' };
    }

    if (found.currentUses >= found.maxUses) {
      return { valid: false, discountAmount: 0, message: 'تم استهلاك الحد الأقصى لاستخدام هذا الكود' };
    }

    const today = new Date().toISOString().split('T')[0];
    if (found.expiryDate && found.expiryDate < today) {
      return { valid: false, discountAmount: 0, message: 'انتهت صلاحية هذا الكود' };
    }

    const cartItems = items || cart;

    // Specific Product Discount Logic
    if (found.targetType === 'specific_product' && found.targetProductId) {
      const targetItem = cartItems.find((item) => item.product.id === found.targetProductId);

      if (!targetItem) {
        return {
          valid: false,
          discountAmount: 0,
          message: `هذا الكود خاص بمنتج "${found.targetProductName || 'محدد'}" وهو غير موجود في سلتك`,
        };
      }

      const itemTotal = targetItem.product.price * targetItem.quantity;
      let discountAmount = 0;

      if (found.discountType === 'percentage') {
        discountAmount = Math.round((itemTotal * found.discountValue) / 100);
      } else {
        discountAmount = Math.min(found.discountValue, itemTotal);
      }

      return {
        valid: true,
        discountAmount,
        promoCode: found,
        message: `تم تطبيق خصم ${discountAmount} ج.م على منتج (${found.targetProductName || targetItem.product.name})`,
      };
    }

    // All Products Discount Logic
    let discountAmount = 0;
    if (found.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * found.discountValue) / 100);
    } else {
      discountAmount = Math.min(found.discountValue, subtotal);
    }

    return {
      valid: true,
      discountAmount,
      promoCode: found,
      message: `تم تطبيق خصم بقيمة ${discountAmount} ج.م (كود المسوق: ${found.marketerName})`,
    };
  };

  // Orders Management with synchronous LocalStorage persistence
  const createOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    customerWhatsapp?: string;
    governorate: string;
    address: string;
    notes?: string;
    promoCodeUsed?: string;
  }): Order | null => {
    if (cart.length === 0) return null;

    const subtotal = getCartSubtotal();
    let discount = 0;
    let marketerName = '';
    let marketerCommission = 0;
    let validPromoCode: PromoCode | undefined;

    if (orderData.promoCodeUsed) {
      const val = validatePromoCode(orderData.promoCodeUsed, subtotal, cart);
      if (val.valid && val.promoCode) {
        discount = val.discountAmount;
        validPromoCode = val.promoCode;
        marketerName = val.promoCode.marketerName;
        
        if (val.promoCode.commissionType === 'percentage') {
          marketerCommission = Math.round((subtotal * val.promoCode.commissionValue) / 100);
        } else {
          marketerCommission = val.promoCode.commissionValue;
        }

        updatePromoCode(val.promoCode.id, {
          currentUses: val.promoCode.currentUses + 1,
        });
      }
    }

    const govObj = governorates.find((g) => g.nameAr === orderData.governorate);
    const standardCost = govObj ? govObj.cost : 60;
    const shippingCost = subtotal >= freeShippingThreshold ? 0 : standardCost;

    const total = Math.max(0, subtotal - discount) + shippingCost;
    const orderNum = 'BL-' + Math.floor(1000 + Math.random() * 9000);

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: orderNum,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerWhatsapp: orderData.customerWhatsapp || orderData.customerPhone,
      governorate: orderData.governorate,
      address: orderData.address,
      notes: orderData.notes,
      items: cart.map((c) => ({
        productId: c.product.id,
        productName: c.product.name,
        price: c.product.price,
        quantity: c.quantity,
        image: c.product.image,
      })),
      subtotal,
      discount,
      shippingCost,
      total,
      promoCodeUsed: validPromoCode ? validPromoCode.code : undefined,
      marketerName: marketerName || undefined,
      marketerCommission: marketerCommission || undefined,
      status: 'pending',
      createdAt: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
      updatedAt: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
    };

    // Deduct stock
    setProducts((prev) => {
      const updated = prev.map((prod) => {
        const inCart = cart.find((c) => c.product.id === prod.id);
        if (inCart) {
          const remainingStock = Math.max(0, prod.stock - inCart.quantity);
          return { ...prod, stock: remainingStock };
        }
        return prod;
      });
      try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => {
      const updated = prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status,
              updatedAt: new Date().toLocaleString('ar-EG', { dateStyle: 'short', timeStyle: 'short' }),
            }
          : o
      );
      try {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => {
      const updated = prev.filter((o) => o.id !== orderId);
      try {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateGovernorateCost = (id: string, newCost: number) => {
    setGovernorates((prev) => {
      const updated = prev.map((g) => (g.id === id ? { ...g, cost: newCost } : g));
      try {
        localStorage.setItem(STORAGE_KEYS.GOVERNORATES, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const generateWhatsAppLink = (order: Order): string => {
    let cleanPhone = (order.customerWhatsapp || order.customerPhone).replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '2' + cleanPhone;
    } else if (!cleanPhone.startsWith('20') && cleanPhone.length === 10) {
      cleanPhone = '20' + cleanPhone;
    }

    const itemsList = order.items
      .map((item) => `▪️ ${item.productName} (العدد: ${item.quantity}) - ${item.price * item.quantity} ج.م`)
      .join('\n');

    const promoLine = order.promoCodeUsed
      ? `\n🎟️ كود الخصم: ${order.promoCodeUsed} (خصم: ${order.discount} ج.م)`
      : '';

    const message = `أهلاً بحضرتك يا فندم *${order.customerName}* 🌸👑
مع حضرتك إدارة براند *Blue Lotus*.

بنتواصل مع حضرتك لتأكيد تفاصيل طلبك رقم *#${order.orderNumber}*:
----------------------------------
${itemsList}${promoLine}
📦 مصاريف الشحن: ${order.shippingCost === 0 ? 'مجاني 🎁' : `${order.shippingCost} ج.م`}
💰 *الإجمالي المستحق عند الاستلام: ${order.total} ج.م*
📍 محافظة: *${order.governorate}*
🏠 العنوان: ${order.address}
${order.notes ? `📝 ملاحظات: ${order.notes}\n` : ''}----------------------------------
من فضلك أكد لنا مناسبة البيانات لنبدأ تجهيز وتغليف شحنتك على الفور؟ ✨`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        promoCodes,
        orders,
        governorates,
        freeShippingThreshold,
        cart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        currentView,
        setCurrentView,
        storeSettings,
        updateOfficialWhatsApp,
        addSocialLink,
        updateSocialLink,
        deleteSocialLink,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        clearAllOrders,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartSubtotal,
        addProduct,
        updateProduct,
        deleteProduct,
        addPromoCode,
        updatePromoCode,
        deletePromoCode,
        validatePromoCode,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        updateGovernorateCost,
        setFreeShippingThreshold,
        generateWhatsAppLink,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
