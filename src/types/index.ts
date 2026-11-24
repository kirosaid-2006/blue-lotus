export interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  description: string;
  image: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
}

export type PromoTargetType = 'all' | 'specific_product';

export interface PromoCode {
  id: string;
  code: string;
  marketerName: string;
  marketerPhone: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 15 for 15%, or 100 for 100 EGP
  targetType: PromoTargetType; // هل الخصم على كل المنتجات أم منتج محدد
  targetProductId?: string; // ID المنتج المحدد إذا كان targetType === 'specific_product'
  targetProductName?: string;
  maxUses: number;
  currentUses: number;
  expiryDate: string; // YYYY-MM-DD
  commissionType: 'percentage' | 'fixed';
  commissionValue: number; // e.g. 50 EGP per order or 10%
  isActive: boolean;
  createdAt: string;
}

export type OrderStatus =
  | 'pending'    // جديد قيد الانتظار
  | 'confirmed'  // تم التأكيد هاتفياً
  | 'preparing'  // قيد التجهيز والتغليف
  | 'shipping'   // في الطريق مع المندوب
  | 'delivered'  // تم التسليم بنجاح
  | 'cancelled'  // ملغي
  | 'returned';  // مرتجع

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerWhatsapp?: string;
  governorate: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  promoCodeUsed?: string;
  marketerName?: string;
  marketerCommission?: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GovernorateShipping {
  id: string;
  nameAr: string;
  nameEn: string;
  cost: number;
}

export type SocialPlatform =
  | 'facebook'
  | 'instagram'
  | 'tiktok'
  | 'whatsapp'
  | 'telegram'
  | 'youtube'
  | 'snapchat'
  | 'x';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
}

export interface StoreSettings {
  officialWhatsApp: string; // رقم الواتساب الرسمي للمتجر
  socialLinks: SocialLink[]; // لينكات السوشيال ميديا
}
