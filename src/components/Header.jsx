import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartDrawer from './CartDrawer';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 text-[11px] sm:text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
              <MapPin className="w-3 h-3 text-primary" />
              Toshkent, O'zbekiston
            </span>
            <span className="hidden sm:flex items-center gap-1.5 opacity-80 hover:opacity-100 cursor-pointer transition-opacity">
              <Phone className="w-3 h-3 text-primary" />
              +998 71 123 45 67
            </span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-primary transition-colors cursor-pointer">Yetkazib berish</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Yordam</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6 md:gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 bg-primary rounded-[12px] flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <LeafIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">FoodStore</span>
              <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">Fresh Market</span>
            </div>
          </Link>

          {/* Search Bar - Redesigned */}
          <div className="flex-grow max-w-2xl hidden md:block">
            <div className="relative group">
              <input
                type="text"
                placeholder="Qidirish..."
                className="w-full h-11 pl-5 pr-28 bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-full transition-all outline-none text-sm"
              />
              <button className="absolute right-1 top-1 bottom-1 px-6 bg-primary text-white rounded-full font-bold text-xs hover:bg-primary-dark transition-colors flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                Topish
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
            <button className="flex items-center gap-2.5 px-4 py-2 hover:bg-slate-50 rounded-xl transition-all group">
              <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hisobim</span>
                <span className="text-sm font-bold text-slate-700">Kirish</span>
              </div>
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all relative"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-primary text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-[10px] opacity-70 font-bold uppercase tracking-wider">Savat</span>
                <span className="text-sm font-bold">$0.00</span>
              </div>
            </button>

            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

const LeafIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8a7 7 0 0 1-7 7c-1 0-2-.13-3-.4" />
    <path d="M7 2a4 4 0 0 0-4 4c0 3 2 4 4 6s4 3 4 6" />
    <path d="M2 \22 22-2" />
  </svg>
);

export default Header;
