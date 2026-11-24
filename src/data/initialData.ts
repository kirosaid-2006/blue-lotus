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
    name: 'عطر لوتس آمون الملكي 100ml',
    nameEn: 'Royal Amun Blue Lotus Extrait de Parfum',
    category: 'عطور ملكية',
    price: 850,
    originalPrice: 1100,
    stock: 25,
    description: 'تحفة عطرية مستوحاة من زهرة اللوتس الزرقاء مع نفحات العنبر والمسك الفاخر. ثبات يدوم 48 ساعة.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 18,
    isFeatured: true,
  },
  {
    id: 'prod-2',
    name: 'زيت نفرتيتي الذهبي للشعر والجسم',
    nameEn: 'Nefertiti Golden Elixir Body Oil',
    category: 'عناية فاخرة',
    price: 650,
    originalPrice: 800,
    stock: 30,
    description: 'إكسير مرطب طبيعي غني بجزيئات الذهب وخلاصة اللوتس لترطيب عميق ونعومة حريرية تدوم طوال اليوم.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 14,
    isFeatured: true,
  },
  {
    id: 'prod-3',
    name: 'سيروم اللوتس الأزرق لتجديد البشرة',
    nameEn: 'Blue Lotus Sacred Facial Serum',
    category: 'عناية بالبشرة',
    price: 520,
    originalPrice: 650,
    stock: 15,
    description: 'سيروم مركز بمضادات الأكسدة وحمض الهيالورونيك لنضارة فورية وشد البشرة.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewsCount: 9,
    isFeatured: true,
  },
  {
    id: 'prod-4',
    name: 'فواحة وبخور اللوتس الفاخر',
    nameEn: 'Sacred Lotus Diffuser & Incense',
    category: 'أجواء منزلية',
    price: 430,
    originalPrice: 550,
    stock: 10,
    description: 'مزيج هادئ من بخور اللوتس والصندل لنشر طاقة إيجابية وهدوء استرخائي فاخر.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 7,
    isFeatured: false,
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
