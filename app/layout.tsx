import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ZARIYA | Luxury Eastern Fashion & Fragrances',
  description:
    'Premier Eastern clothing and luxury fragrance brand inspired by J. and Khaadi. Shop unstitched festive lawns, ready-to-wear pret, men\'s kurta shalwar, waistcoats, and artisanal oud perfumes.',
  openGraph: {
    title: 'ZARIYA | Luxury Eastern Fashion & Fragrances',
    description:
      'Premier Eastern clothing and luxury fragrance brand inspired by J. and Khaadi. Shop unstitched festive lawns, ready-to-wear pret, men\'s kurta shalwar, waistcoats, and artisanal oud perfumes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZARIYA | Luxury Eastern Fashion & Fragrances',
    description:
      'Premier Eastern clothing and luxury fragrance brand inspired by J. and Khaadi. Shop unstitched festive lawns, ready-to-wear pret, men\'s kurta shalwar, waistcoats, and artisanal oud perfumes.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body suppressHydrationWarning className="bg-[#FAF9F5] text-[#1A1A1A] antialiased">
        {children}
      </body>
    </html>
  );
}
