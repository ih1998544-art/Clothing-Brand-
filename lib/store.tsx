'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Currency } from './types';
import { CURRENCIES, PRODUCTS } from './data';

interface OrderConfirmation {
  orderId: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  paymentMethod: string;
  courier: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  date: string;
  currency: Currency;
}

interface StoreContextType {
  // Currency
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (pkrAmount: number) => string;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalPKR: number;
  cartDrawerOpen: boolean;
  setCartDrawerOpen: (open: boolean) => void;

  // Promo code
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedDiscountPKR: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Navigation
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  sizeGuideOpen: boolean;
  setSizeGuideOpen: (open: boolean) => void;
  checkoutModalOpen: boolean;
  setCheckoutModalOpen: (open: boolean) => void;
  storeLocatorOpen: boolean;
  setStoreLocatorOpen: (open: boolean) => void;

  // Active filters
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Order state
  lastOrder: OrderConfirmation | null;
  setLastOrder: (order: OrderConfirmation | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('PKR');

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem('zariya_cart');
        if (savedCart) return JSON.parse(savedCart);
      } catch {
        // fallback
      }
    }
    const defaultItem = PRODUCTS[0];
    return [
      {
        product: defaultItem,
        selectedSize: 'Unstitched',
        selectedColor: defaultItem.colors[0]?.colorName || 'Pistachio Mint',
        quantity: 1,
      },
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedWishlist = localStorage.getItem('zariya_wishlist');
        if (savedWishlist) return JSON.parse(savedWishlist);
      } catch {
        // fallback
      }
    }
    return [];
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [storeLocatorOpen, setStoreLocatorOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedDiscountPKR, setAppliedDiscountPKR] = useState<number>(0);
  const [lastOrder, setLastOrder] = useState<OrderConfirmation | null>(null);

  // Sync to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem('zariya_cart', JSON.stringify(cart));
    } catch {
      // storage unavailable
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('zariya_wishlist', JSON.stringify(wishlist));
    } catch {
      // storage unavailable
    }
  }, [wishlist]);

  const formatPrice = (pkrAmount: number): string => {
    const curr = CURRENCIES[currency] || CURRENCIES.PKR;
    const converted = pkrAmount * curr.rate;

    if (currency === 'PKR') {
      return `${curr.symbol} ${Math.round(converted).toLocaleString('en-US')}`;
    }
    if (currency === 'USD' || currency === 'GBP') {
      return `${curr.symbol}${converted.toFixed(2)}`;
    }
    return `${curr.symbol} ${Math.round(converted).toLocaleString('en-US')}`;
  };

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
    });
    setCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedSize === size && item.selectedColor === color)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor === color
        ) {
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscountPKR(0);
    setPromoCode('');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotalPKR = cart.reduce(
    (sum, item) => sum + item.product.pricePKR * item.quantity,
    0
  );

  const applyPromoCode = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'EID2026' || cleaned === 'KHAAS10') {
      const discount = Math.round(cartSubtotalPKR * 0.1);
      setAppliedDiscountPKR(discount);
      setPromoCode(cleaned);
      return { success: true, message: 'Promo code applied! 10% discount added.' };
    }
    if (cleaned === 'WELCOME10') {
      const discount = 1000;
      setAppliedDiscountPKR(discount);
      setPromoCode(cleaned);
      return { success: true, message: 'Welcome voucher applied! Rs. 1,000 off.' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try EID2026 or WELCOME10' };
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  return (
    <StoreContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotalPKR,
        cartDrawerOpen,
        setCartDrawerOpen,
        promoCode,
        setPromoCode,
        appliedDiscountPKR,
        applyPromoCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        sizeGuideOpen,
        setSizeGuideOpen,
        checkoutModalOpen,
        setCheckoutModalOpen,
        storeLocatorOpen,
        setStoreLocatorOpen,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        lastOrder,
        setLastOrder,
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
