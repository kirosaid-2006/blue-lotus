import { Product, PromoCode, Order, GovernorateShipping, StoreSettings } from '../types';

export const INITIAL_GOVERNORATES: GovernorateShipping[] = [
  { id: 'cairo', nameAr: 'القاهرة', nameEn: 'Cairo', cost: 50 },
  { id: 'giza', nameAr: 'الجيزة', nameEn: 'Giza', cost: 50 },
  { id: 'alexandria', nameAr: 'الإسكندرية', nameEn: 'Alexandria', cost: 60 },
  { id: 'qalyubia', nameAr: 'القليوبية', nameEn: 'Qalyubia', cost: 65 },
  { id: 'sharqia', nameAr: 'الشرقية', nameEn: 'Sharqia', cost: 65 },
  { id: 'gharbia', nameAr: 'الغربية', nameEn: 'Gharbia', cost: 65 },
  { id: 'monufia', nameAr: 'المنوفية', nameEn: 'Monufia', cost: 65 },
  { id: 'dakahlia', nameAr: 'الدقهلية', nameEn: 'Dakahlia', cost: 65 },
  { id: 'beheira', nameAr: 'البحيرة', nameEn: 'Beheira', cost: 65 },
  { id: 'kafr_el_sheikh', nameAr: 'كفر الشيخ', nameEn: 'Kafr El Sheikh', cost: 65 },
  { id: 'damietta', nameAr: 'دمياط', nameEn: 'Damietta', cost: 65 },
  { id: 'port_said', nameAr: 'بورسعيد', nameEn: 'Port Said', cost: 65 },
  { id: 'ismailia', nameAr: 'الإسماعيلية', nameEn: 'Ismailia', cost: 65 },
  { id: 'suez', nameAr: 'السويس', nameEn: 'Suez', cost: 65 },
  { id: 'fayoum', nameAr: 'الفيوم', nameEn: 'Fayoum', cost: 75 },
  { id: 'beni_suef', nameAr: 'بني سويف', nameEn: 'Beni Suef', cost: 75 },
  { id: 'minya', nameAr: 'المنيا', nameEn: 'Minya', cost: 80 },
  { id: 'assiut', nameAr: 'أسيوط', nameEn: 'Assiut', cost: 80 },
  { id: 'sohag', nameAr: 'سوهاج', nameEn: 'Sohag', cost: 85 },
  { id: 'qena', nameAr: 'قنا', nameEn: 'Qena', cost: 90 },
  { id: 'luxor', nameAr: 'الأقصر', nameEn: 'Luxor', cost: 90 },
  { id: 'aswan', nameAr: 'أسوان', nameEn: 'Aswan', cost: 95 },
  { id: 'red_sea', nameAr: 'البحر الأحمر', nameEn: 'Red Sea', cost: 95 },
  { id: 'matrouh', nameAr: 'مطروح', nameEn: 'Matrouh', cost: 95 },
  { id: 'new_valley', nameAr: 'الوادي الجديد', nameEn: 'New Valley', cost: 100 },
  { id: 'south_sinai', nameAr: 'جنوب سيناء', nameEn: 'South Sinai', cost: 100 },
  { id: 'north_sinai', nameAr: 'شمال سيناء', nameEn: 'North Sinai', cost: 100 },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'كريم نهار اللوتس المرطب والمغذي 50ml',
    nameEn: 'Blue Lotus Day Cream - Hydrating & Nourishing',
    category: 'عناية بالبشرة',
    price: 380,
    originalPrice: 480,
    stock: 25,
    description: 'كريم نهار مخملي غني بمستخلصات زهرة اللوتس الزرقاء وزبدة الشيا وفيتامين E لتغذية عميقة وحماية من الجفاف وإشراقة طبيعية تدوم طوال اليوم.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 24,
    isFeatured: true,
  },
  {
    id: 'prod-2',
    name: 'لوشن الجسم باللوتس والترطيب العميق 250ml',
    nameEn: 'Blue Lotus Body Lotion - Deep Moisture',
    category: 'عناية بالجسم',
    price: 420,
    originalPrice: 520,
    stock: 30,
    description: 'لوشن فاخر خفيف وسريع الامتصاص بمستخلصات طبيعية يمنح بشرة الجسم نعومة حريرية متجددة وترطيباً مكثفاً يدوم حتى 48 ساعة.',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 19,
    isFeatured: true,
  },
  {
    id: 'prod-3',
    name: 'كريم اليدين فائق النعومة والترطيب 100ml',
    nameEn: 'Blue Lotus Hand Cream - Moisturizing & Softening',
    category: 'عناية باليدين',
    price: 220,
    originalPrice: 290,
    stock: 20,
    description: 'تركيبة غنية وسريعة الامتصاص لحماية وتنعيم اليدين والأظافر مع لمسة ترطيب مخملية وعطر زهرة اللوتس المنعش دون أي ملمس دهني.',
    image: 'https://images.unsplash.com/photo-1608248597359-25f0a4005ba9?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 15,
    isFeatured: true,
  },
  {
    id: 'prod-4',
    name: 'سيروم اللوتس الأزرق المركز للنضارة 30ml',
    nameEn: 'Blue Lotus Radiant Glow Face Serum',
    category: 'سيروم ونضارة',
    price: 490,
    originalPrice: 620,
    stock: 15,
    description: 'سيروم مكثف بمضادات الأكسدة وحمض الهيالورونيك وخلاصة اللوتس لشد البشرة وتوحيد لونها ومحاربة علامات الإجهاد والتجاعيد المبكرة.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 11,
    isFeatured: true,
  },
];

// Start clean without dummy promo codes (Admin will generate real codes per marketer)
export const INITIAL_PROMO_CODES: PromoCode[] = [];

// Start clean without dummy orders
export const INITIAL_ORDERS: Order[] = [];

// Initial Store Contact & Social Settings
export const INITIAL_SETTINGS: StoreSettings = {
  officialWhatsApp: '01012345678',
  socialLinks: [
    { id: 'soc-1', platform: 'instagram', url: 'https://instagram.com' },
    { id: 'soc-2', platform: 'facebook', url: 'https://facebook.com' },
    { id: 'soc-3', platform: 'tiktok', url: 'https://tiktok.com' },
  ],
};
