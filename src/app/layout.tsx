import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blue Lotus Skincare | منتجات العناية الفاخرة بالبشرة',
  description: 'براند العناية الطبيعية بالبشرة واللوتس الأزرق - كريمات ولوشن طبيعية فاخرة لترطيب ونضارة فائقة لكافة أنواع البشرة.',
  keywords: ['Blue Lotus Skincare', 'كريمات طبيعية', 'لوشن اللوتس الأزرق', 'عناية بالبشرة', 'كريم نهار', 'عناية ملكية'],
  icons: {
    icon: '/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#F8F5EE] text-[#0D2B55] antialiased selection:bg-[#D4AF37]/30 selection:text-[#0D2B55]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
