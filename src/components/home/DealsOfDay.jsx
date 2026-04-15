import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Star, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/cartSlice';

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
          [...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 h-[300px] rounded-[15px] animate-pulse"></div>
          ))
        ) : (
          data?.products?.map((product, idx) => (
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
    // Random future date for demo
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
    <div className="relative rounded-[15px] overflow-hidden group h-[350px]">
      {/* Background with product thumbnail as fallack for generated image */}
      <div className="absolute inset-0 bg-slate-100">
         <img 
           src={product.thumbnail} 
           alt="deal" 
           className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content Box Overlay */}
      <div className="absolute bottom-6 left-6 right-6 bg-white rounded-[10px] p-6 shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform">
         {/* Timer */}
         <div className="flex justify-center -mt-12 mb-4 gap-3">
            <TimerBox val={timeLeft.days} label="Days" />
            <TimerBox val={timeLeft.hours} label="Hours" />
            <TimerBox val={timeLeft.mins} label="Mins" />
            <TimerBox val={timeLeft.secs} label="Secs" />
         </div>

         <div className="space-y-3">
            <h4 className="font-bold text-nest-dark line-clamp-1">{product.title}</h4>
            <div className="flex items-center gap-1">
               <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-nest-yellow text-nest-yellow' : 'text-gray-300'}`} />
                  ))}
               </div>
               <span className="text-[12px] text-nest-text">({product.rating})</span>
            </div>
            
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-nest-primary">${product.price}</span>
                  <span className="text-sm text-nest-text line-through opacity-60 font-medium">${(product.price * 1.3).toFixed(2)}</span>
               </div>
               <button 
                 onClick={onAdd}
                 className="flex items-center gap-2 px-5 py-2 bg-nest-red text-white hover:bg-nest-red/90 rounded-[4px] font-bold text-sm transition-all"
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
  <div className="w-12 h-14 bg-white rounded-[5px] flex flex-col items-center justify-center shadow-md border border-gray-50">
     <span className="text-nest-primary font-bold text-lg leading-none">{val}</span>
     <span className="text-[10px] text-nest-text font-medium">{label}</span>
  </div>
);

export default DealsOfDay;
