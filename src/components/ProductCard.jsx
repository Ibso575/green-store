import React from 'react';
import { ShoppingCart, Star, Plus, Heart, GitCompare, Eye } from 'lucide-react';
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

  // Badge logic based on dummy data
  const getBadge = () => {
    if (product.discountPercentage > 15) return { text: 'Hot', color: 'bg-nest-pink' };
    if (product.id % 5 === 0) return { text: 'New', color: 'bg-nest-primary' };
    if (product.id % 3 === 0) return { text: 'Sale', color: 'bg-nest-yellow' };
    return null;
  };

  const badge = getBadge();

  return (
    <div className="group bg-white rounded-[15px] overflow-hidden border border-nest-border hover:border-nest-primary/30 hover:shadow-xl transition-all duration-300 relative flex flex-col h-full font-heading">
      {/* Badge */}
      {badge && (
        <span className={`absolute top-0 left-0 z-10 ${badge.color} text-white text-[12px] font-medium px-4 py-1.5 rounded-br-[20px] rounded-tl-[15px]`}>
          {badge.text}
        </span>
      )}

      {/* Image Area */}
      <div className="relative aspect-square overflow-hidden p-8 flex items-center justify-center">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Hover Actions */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <ActionButton icon={<Heart className="w-4 h-4" />} />
          <ActionButton icon={<GitCompare className="w-4 h-4" />} />
          <ActionButton icon={<Eye className="w-4 h-4" />} />
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-5 flex-grow flex flex-col">
        <span className="text-[12px] text-nest-text mb-1">{product.category}</span>
        <Link to={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-bold text-nest-dark text-md leading-snug hover:text-nest-primary transition-colors line-clamp-2 min-h-[44px]">
            {product.title}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-nest-yellow text-nest-yellow' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-[12px] text-nest-text">({product.rating})</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-1 mb-1">
             <span className="text-[12px] text-nest-text">By</span>
             <span className="text-[12px] text-nest-primary font-bold hover:text-nest-yellow transition-colors cursor-pointer">NestFood</span>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-nest-primary">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="text-[14px] text-nest-text line-through opacity-60 font-bold">
                  ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                </span>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-5 py-2 bg-nest-red/10 text-nest-red hover:bg-nest-red hover:text-white rounded-[4px] font-bold text-sm transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon }) => (
  <button className="w-9 h-9 bg-white border border-nest-primary/20 rounded-[5px] flex items-center justify-center text-nest-primary hover:bg-nest-primary hover:text-white hover:border-nest-primary transition-all shadow-md">
    {icon}
  </button>
);

export default ProductCard;
