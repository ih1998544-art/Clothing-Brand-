export type Currency = 'PKR' | 'USD' | 'AED' | 'GBP' | 'SAR';

export interface CurrencyConfig {
  code: Currency;
  symbol: string;
  rate: number; // relative to PKR (1 USD = 280 PKR, etc.)
}

export interface ProductVariant {
  colorName: string;
  colorHex: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  collection: string; // e.g. 'Noor-e-Khaas Festive 2026', 'Virasat Men's'
  category: 'women-pret' | 'unstitched' | 'men' | 'fragrances' | 'shawls';
  categoryLabel: string;
  pricePKR: number;
  originalPricePKR?: number;
  image: string;
  gallery: string[];
  fabric: string;
  pieces: string; // e.g. '3-Piece', 'Ready to Wear 2-Piece', '100ml EDP'
  description: string;
  details: string[];
  sizes: string[];
  colors: ProductVariant[];
  isNewArrival?: boolean;
  isBestseller?: boolean;
  isOnSale?: boolean;
  rating: number;
  reviewsCount: number;
  reviews: Review[];
  careInstructions: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}
