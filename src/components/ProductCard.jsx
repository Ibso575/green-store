import React from 'react';
import { ShoppingCart, Star, Plus, Heart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
  };

  return (
    <div className="group bg-white rounded-[24px] overflow-hidden border border-slate-100 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative flex flex-col h-full">
      {/* Favorite Button */}
      <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-rose-500 transition-colors shadow-sm">
        <Heart className="w-4 h-4" />
      </button>

      {/* Discount Badge */}
      {product.discountPercentage > 0 && (
        <span className="absolute top-4 left-4 z-10 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg shadow-primary/20">
          -{Math.round(product.discountPercentage)}%
        </span>
      )}

      {/* Image Gallery Area */}
      <Link 
        to={`/product/${product.id}`}
        className="block aspect-square overflow-hidden bg-slate-50 relative group-hover:bg-white transition-colors duration-500"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </Link>

      {/* Info Area */}
      <div className="p-5 flex-grow flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1">
             <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
             <span className="text-[10px] font-bold text-slate-700">{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-slate-800 text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 min-h-[40px]">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex flex-col pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-slate-400 line-through font-medium">
                ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-primary font-bold">1 kg / 1 dona</span>
        </div>
      </div>

      {/* Full Width Button */}
      <div className="px-5 pb-5">
        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-primary text-white rounded-[14px] flex items-center justify-center gap-2 font-black text-xs hover:bg-primary-dark active:scale-[0.97] transition-all shadow-xl shadow-primary/10 group-hover:shadow-primary/20"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Savatga
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
