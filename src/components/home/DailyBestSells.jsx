import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Plus, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { Link } from 'react-router-dom';
import dailyBanner from '../../assets/daily-banner.png';

const DailyBestSells = () => {
  const { data, isLoading } = useProducts({ category: 'groceries', limit: 4, skip: 5 });
  const dispatch = useDispatch();

  return (
    <section className="container-custom py-10 font-heading">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-nest-dark">Daily Best Sells</h2>
        <div className="flex flex-wrap gap-6 text-[15px] font-bold">
           <button className="text-nest-primary">Featured</button>
           <button className="text-nest-dark hover:text-nest-primary transition-colors">Popular</button>
           <button className="text-nest-dark hover:text-nest-primary transition-colors">New added</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Banner */}
        <div className="lg:w-1/4 relative h-[450px] lg:h-auto rounded-[15px] overflow-hidden group">
      
           
            <Link to="/shop">
              <img 
            src={dailyBanner} 
            alt="Daily deals" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
            </Link>
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-100 h-[450px] rounded-[15px] animate-pulse"></div>
              ))
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {data?.products?.map((product) => (
                  <DailyProductCard key={product.id} product={product} onAdd={() => dispatch(addItem(product))} />
                ))}
              </div>
            )}
        </div>
      </div>
    </section>
  );
};

const DailyProductCard = ({ product, onAdd }) => {
  // Mock stock data for the progress bar
  const total = 120;
  const sold = Math.floor(product.rating * 20); // Just for visual

  return (
    <div className="bg-white border border-nest-border rounded-[15px] p-5 flex flex-col h-full hover:shadow-xl transition-all group">
       <div className="aspect-square mb-4 p-4 flex items-center justify-center relative">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
            />
          </Link>
          {product.discountPercentage > 15 && (
            <span className="absolute top-0 left-0 bg-nest-red text-white text-[12px] font-medium px-4 py-1.5 rounded-br-[20px] rounded-tl-[10px]">
               Hot
            </span>
          )}
       </div>

       <div className="flex-grow flex flex-col">
          <span className="text-[12px] text-nest-text mb-1">{product.category}</span>
          <Link to={`/product/${product.id}`}>
            <h4 className="font-bold text-nest-dark hover:text-nest-primary transition-colors line-clamp-2 min-h-[44px] mb-2">
              {product.title}
            </h4>
          </Link>

          <div className="flex items-center gap-2 mb-4">
             <span className="text-lg font-bold text-nest-primary">${product.price}</span>
             <span className="text-sm text-nest-text line-through opacity-60 font-medium">${(product.price * 1.25).toFixed(2)}</span>
          </div>

          <div className="mt-auto space-y-3">
             {/* Progress Bar */}
             <div className="space-y-1.5">
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                   <div className="h-full bg-nest-primary" style={{ width: `${(sold/total)*100}%` }}></div>
                </div>
                <p className="text-[13px] text-nest-dark font-medium">Sold: {sold}/{total}</p>
             </div>

             <button 
               onClick={onAdd}
               className="w-full py-2.5 bg-nest-red hover:bg-nest-red/90 text-white rounded-[4px] font-bold text-sm flex items-center justify-center gap-2 transition-all"
             >
               <ShoppingCart className="w-4 h-4" />
               Add to Cart
             </button>
          </div>
       </div>
    </div>
  );
};

export default DailyBestSells;
