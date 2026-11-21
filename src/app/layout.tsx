import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blue Lotus | براند اللوتس الأزرق الملكي',
  description: 'المتجر الملكي لعطور وزيوت اللوتس الأزرق الفرعونية الفاخرة - تسوق أفخم المنتجات مع الدفع عند الاستلام والشحن السريع لجميع محافظات مصر.',
  keywords: ['عطور فرعونية', 'اللوتس الأزرق', 'زيت نفرتيتي', 'Blue Lotus', 'عطور مصرية فاخرة', 'أفلييت'],
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
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body className="min-h-full flex flex-col bg-[#040810] text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
