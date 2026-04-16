import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, Heart, Phone, ChevronDown, Home, LayoutGrid } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartDrawer from './CartDrawer';
import logo from '../assets/logo.svg'

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState('');
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(headerSearch.trim()) {
       navigate(`/shop?q=${encodeURIComponent(headerSearch.trim())}`);
       setHeaderSearch('');
    }
  };

  return (
    <div className="w-full bg-white font-heading">
      {/* 1. Top Bar (Desktop Only) */}
      <div className="border-b border-nest-border py-4 hidden lg:block">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-10">
            <button className="text-nest-dark hover:text-nest-primary transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <nav className="hidden lg:flex items-center gap-6 text-[13px] font-bold text-nest-dark uppercase tracking-wide">
              <Link to="/" className="hover:text-nest-primary transition-colors">Home</Link>
              <Link to="/shop" className="flex items-center gap-1 hover:text-nest-primary transition-colors">
                Category <ChevronDown className="w-2.5 h-2.5 opacity-50" />
              </Link>
              <Link to="/products" className="flex items-center gap-1 hover:text-nest-primary transition-colors">
                Products <ChevronDown className="w-2.5 h-2.5 opacity-50" />
              </Link>
              <Link to="/pages" className="flex items-center gap-1 hover:text-nest-primary transition-colors">
                Pages <ChevronDown className="w-2.5 h-2.5 opacity-50" />
              </Link>
              <Link to="/blog" className="flex items-center gap-1 hover:text-nest-primary transition-colors">
                Blog <ChevronDown className="w-2.5 h-2.5 opacity-50" />
              </Link>
              <Link to="/elements" className="flex items-center gap-1 hover:text-nest-primary transition-colors">
                Elements <ChevronDown className="w-2.5 h-2.5 opacity-50" />
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2 text-nest-dark font-bold text-[13px]">
            <Phone className="w-4 h-4 text-nest-primary" />
            <span>+123 ( 456 ) 7890</span>
          </div>
        </div>
      </div>

      {/* 2. Main Bar (Responsive) */}
      <div className="py-5 lg:py-6 relative z-50">
        <div className="container-custom flex items-center justify-between gap-4">
          
          {/* Mobile: Logo Left | Desktop: Logo Left */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
             <img 
               src={logo}
               alt="Foodzy Logo" 
               className="h-12 lg:h-16 w-auto object-contain transition-transform group-hover:scale-105"
               onError={(e) => e.target.style.display = 'none'} 
             />
          </Link>

          {/* Desktop Only Search & Actions */}
          <div className="hidden lg:flex flex-grow items-center justify-between gap-10">
            {/* Search Bar */}
            <div className="flex-grow max-w-2xl">
              <form onSubmit={handleSearchSubmit} className="flex items-center border border-nest-border rounded-[4px] h-11 bg-white focus-within:border-nest-primary transition-all overflow-hidden">
                <button type="button" className="px-5 h-full flex items-center gap-2 text-nest-dark font-bold text-[13px] border-r border-nest-border hover:text-nest-primary shrink-0">
                  All Categories <ChevronDown className="w-3 h-3" />
                </button>
                <input
                  type="text"
                  value={headerSearch}
                  onChange={(e) => setHeaderSearch(e.target.value)}
                  placeholder="Search For Items..."
                  className="flex-grow h-full px-4 outline-none text-[13px] text-nest-dark placeholder:text-nest-text/40 font-medium"
                />
                <button type="submit" className="px-5 h-full bg-nest-red text-white hover:bg-nest-red/90 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-6 flex-shrink-0">
               <HeaderAction 
                  icon={<User className="w-5 h-5" />} 
                  label="Account" 
                  count={undefined} 
               />
               <HeaderAction 
                  icon={<Heart className="w-5 h-5" />} 
                  label="Wishlist" 
                  count="0" 
               />
               <div onClick={() => setIsCartOpen(true)} className="cursor-pointer">
                  <HeaderAction 
                    icon={<ShoppingCart className="w-5 h-5" />} 
                    label="Cart" 
                    count={cartCount} 
                  />
               </div>
            </div>
          </div>

          {/* Mobile Only: Hamburger Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-nest-dark hover:text-nest-primary transition-colors"
          >
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* 3. Mobile Sidebar Menu */}
      <div className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
         {/* Overlay */}
         <div onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
         
         {/* Sidebar */}
         <div className={`absolute top-0 right-0 h-full w-[300px] bg-white shadow-2xl transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 h-full flex flex-col">
               <div className="flex items-center justify-between mb-10 border-b pb-6">
                  <h3 className="text-xl font-bold text-nest-dark">Menu</h3>
                  <button onClick={() => setIsMenuOpen(false)} className="text-nest-dark font-bold text-sm">CLOSE</button>
               </div>
               
               <nav className="flex flex-col gap-6 text-[15px] font-bold text-nest-dark uppercase tracking-wide">
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="hover:text-nest-primary transition-colors">Home</Link>
                  <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="hover:text-nest-primary transition-colors">Category</Link>
                  <Link to="/products" onClick={() => setIsMenuOpen(false)} className="hover:text-nest-primary transition-colors">Products</Link>
                  <Link to="/pages" onClick={() => setIsMenuOpen(false)} className="hover:text-nest-primary transition-colors">Pages</Link>
                  <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="hover:text-nest-primary transition-colors">Blog</Link>
                  <button onClick={() => {setIsCartOpen(true); setIsMenuOpen(false)}} className="hover:text-nest-primary transition-colors capitalize text-left">Cart ({cartCount})</button>
               </nav>

               <div className="mt-auto pt-10 border-t">
                  <div className="flex items-center gap-3 text-nest-dark font-bold">
                     <Phone className="w-5 h-5 text-nest-primary" />
                     <span>+123 ( 456 ) 7890</span>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* 4. Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-nest-border px-6 py-2.5 flex justify-between items-center z-[90] shadow-[0_-5px_15px_rgba(0,0,0,0.03)] pb-[envs(safe-area-inset-bottom)]">
         <Link to="/" className="flex flex-col items-center gap-1 text-nest-text hover:text-nest-primary transition-colors">
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-bold">Home</span>
         </Link>
         <Link to="/shop" className="flex flex-col items-center gap-1 text-nest-text hover:text-nest-primary transition-colors">
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[10px] font-bold">Shop</span>
         </Link>
         <Link to="/shop" className="flex flex-col items-center gap-1 text-nest-text hover:text-nest-primary transition-colors">
            <Heart className="w-5 h-5" />
            <span className="text-[10px] font-bold">Wishlist</span>
         </Link>
         <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 text-nest-primary transition-colors relative">
            <div className="relative">
               <ShoppingCart className="w-5 h-5" />
               <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-nest-red text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
                 {cartCount}
               </span>
            </div>
            <span className="text-[10px] font-bold">Cart</span>
         </button>
         <Link to="/shop" className="flex flex-col items-center gap-1 text-nest-text hover:text-nest-primary transition-colors">
            <User className="w-5 h-5" />
            <span className="text-[10px] font-bold">Account</span>
         </Link>
      </div>
    </div>
  );
};

const HeaderAction = ({ icon, label, count }) => (
  <div className="flex items-center gap-1.5 group cursor-pointer">
    <div className="relative text-nest-dark">
      {icon}
      {count !== undefined && (
        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-nest-red text-white text-[9px] font-bold flex items-center justify-center rounded-full border border-white">
          {count}
        </span>
      )}
    </div>
    <span className="text-[12px] text-nest-dark font-bold uppercase tracking-wide group-hover:text-nest-primary transition-colors">{label}</span>
  </div>
);

export default Header;
