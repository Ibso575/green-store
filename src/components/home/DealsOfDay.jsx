import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Star, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import ProductSkeleton from '../ProductSkeleton';

const DealsOfDay = () => {
  const { data, isLoading } = useProducts({ category: 'groceries', limit: 4, skip: 10 });
  const dispatch = useDispatch();

  return (
    <section className="container-custom py-10 font-heading">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-nest-dark">Deals Of The Day</h2>
        <button className="text-nest-text hover:text-nest-primary font-bold flex items-center gap-2">
           All Deals
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : (
          data?.products?.map((product) => (
            <DealCard key={product.id} product={product} onAdd={() => dispatch(addItem(product))} />
          ))
        )}
      </div>
    </section>
  );
};

const DealCard = ({ product, onAdd }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, mins: 0, secs: 0
  });

  useEffect(() => {
    const target = new Date();
    target.setHours(target.getHours() + (Math.random() * 100 + 48));

    const timer = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / 1000 / 60) % 60),
        secs: Math.floor((diff / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-[15px] overflow-hidden group h-[400px] font-heading">
      {/* Background Image Container */}
      <div className="absolute inset-0 bg-[#f8f9fa]">
         <img 
           src={product.thumbnail} 
           alt={product.title} 
           className="w-full h-full object-contain p-10 opacity-80 group-hover:scale-110 transition-transform duration-700"
         />
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content Box Overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-white rounded-[15px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)] transform translate-y-2 group-hover:translate-y-[-10px] transition-all duration-500 border border-nest-border/30">
         {/* Timer Overlay */}
         <div className="flex justify-center -mt-14 mb-5 gap-3">
            <TimerBox val={timeLeft.days} label="Days" />
            <TimerBox val={timeLeft.hours} label="Hours" />
            <TimerBox val={timeLeft.mins} label="Mins" />
            <TimerBox val={timeLeft.secs} label="Secs" />
         </div>

         <div className="space-y-4">
            <h4 className="font-bold text-nest-dark hover:text-nest-primary cursor-pointer transition-colors line-clamp-1 text-[15px]">{product.title}</h4>
            
            <div className="flex items-center gap-1.5">
               <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-nest-yellow text-nest-yellow' : 'text-gray-300'}`} />
                  ))}
               </div>
               <span className="text-[12px] text-nest-text font-medium">({product.rating})</span>
            </div>
            
            <div className="flex items-center justify-between pt-1">
               <div className="flex flex-col">
                  <span className="text-lg font-bold text-nest-primary leading-none">${product.price}</span>
                  <span className="text-[13px] text-nest-text line-through opacity-50 font-bold mt-1">${(product.price * 1.3).toFixed(2)}</span>
               </div>
               <button 
                 onClick={onAdd}
                 className="flex items-center gap-2 px-5 py-2.5 bg-nest-primary/10 text-nest-primary hover:bg-nest-primary hover:text-white rounded-[4px] font-bold text-[13px] transition-all active:scale-95 shadow-sm"
               >
                 <ShoppingCart className="w-4 h-4" />
                 Add
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};


const TimerBox = ({ val, label }) => (
  <div className="w-12 h-14 bg-white rounded-[8px] flex flex-col items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-nest-border/10">
     <span className="text-nest-primary font-bold text-lg leading-none">{val}</span>
     <span className="text-[10px] text-nest-text font-bold uppercase mt-1">{label}</span>
  </div>
);

export default DealsOfDay;
