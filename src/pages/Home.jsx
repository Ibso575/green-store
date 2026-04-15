import React from 'react';
import Hero from '../components/home/Hero';
import Banners from '../components/home/Banners';
import PopularProducts from '../components/home/PopularProducts';
import DailyBestSells from '../components/home/DailyBestSells';
import DealsOfDay from '../components/home/DealsOfDay';
import BottomLists from '../components/home/BottomLists';
import { Send, Clock, MapPin, Headphones, RotateCcw, CreditCard } from 'lucide-react';
import deliver from '../assets/deliver.png'

const Home = () => {
  return (
    <div className="pb-10 font-heading">
      <Hero />
      <Banners />
      <PopularProducts />
      <DailyBestSells />
      <DealsOfDay />
      <BottomLists />

      {/* Newsletter Section */}
      <section className="container-custom py-10">
        <div className="relative rounded-[20px] overflow-hidden bg-[#D8F1E5] p-12 lg:p-20 flex items-center min-h-[400px]">
           {/* Background decorative leaf elements */}
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-10 right-1/4 -rotate-45">
                 <svg width="100" height="100" viewBox="0 0 100 100"><path d="M20 80C20 80 40 20 80 20" stroke="#3BB77E" strokeWidth="2" fill="none"/></svg>
              </div>
              <div className="absolute bottom-10 left-10 rotate-12">
                 <svg width="80" height="80" viewBox="0 0 100 100"><path d="M10 50C10 50 50 10 90 50C50 90 10 50 10 50Z" stroke="#3BB77E" strokeWidth="2" fill="none"/></svg>
              </div>
           </div>

           <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-xl space-y-6">
                 <h2 className="text-3xl md:text-5xl font-black text-nest-dark leading-tight">
                   Stay home & get your daily <br /> needs from our shop
                 </h2>
                 <p className="text-nest-text text-lg font-medium">
                   Start You're Daily Shopping with <span className="text-nest-primary font-bold">Nest Mart</span>
                 </p>
                 
                 <div className="flex max-w-md bg-white rounded-full p-1 shadow-md overflow-hidden group border border-transparent focus-within:border-nest-primary/20 transition-all">
                   <div className="flex items-center px-4">
                      <Send className="w-5 h-5 text-nest-text opacity-40 group-focus-within:text-nest-primary transition-colors" />
                   </div>
                   <input 
                     type="email" 
                     placeholder="Your email address" 
                     className="flex-grow px-2 py-4 outline-none text-sm text-nest-dark font-medium"
                   />
                   <button className="bg-nest-red hover:bg-nest-red/90 text-white px-10 py-4 rounded-full font-bold text-sm transition-all active:scale-95 shadow-lg shadow-nest-red/20">
                     Subscribe
                   </button>
                 </div>
              </div>

              {/* Image Placeholder for Delivery Man */}
              <div className="absolute bottom-[-80px] right-0 w-full lg:w-1/2 justify-end pointer-events-none hidden lg:flex">
                 <img 
                   src={deliver}
                   alt="Delivery Man" 
                   className="w-full max-w-[500px] lg:max-w-[650px] object-contain object-bottom drop-shadow-xl"
                   onError={(e) => e.target.style.display = 'none'}
                 />
              </div>
           </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="container-custom py-10">
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <FeatureItem 
               icon={<Clock className="w-10 h-10 text-[#3BB77E]" />} 
               title="Best prices & offers" 
               desc="Orders $50 or more" 
            />
            <FeatureItem 
               icon={<MapPin className="w-10 h-10 text-[#3BB77E]" />} 
               title="Free delivery" 
               desc="24/7 amazing services" 
            />
            <FeatureItem 
               icon={<RotateCcw className="w-10 h-10 text-[#3BB77E]" />} 
               title="Great daily deal" 
               desc="When you sign up" 
            />
            <FeatureItem 
               icon={<Headphones className="w-10 h-10 text-[#3BB77E]" />} 
               title="Wide assortment" 
               desc="Mega Discounts" 
            />
            <FeatureItem 
               icon={<CreditCard className="w-10 h-10 text-[#3BB77E]" />} 
               title="Easy returns" 
               desc="Within 30 days" 
            />
         </div>
      </section>
    </div>
  );
};

const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4 bg-[#F4F6FA] p-6 rounded-[15px] hover:-translate-y-2 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:bg-white border border-transparent hover:border-nest-primary/10">
     <div className="group-hover:scale-110 transition-transform duration-300">{icon}</div>
     <div className="space-y-1">
        <h4 className="font-bold text-nest-dark text-[14px]">{title}</h4>
        <p className="text-[12px] text-nest-text font-medium opacity-60">{desc}</p>
     </div>
  </div>
);

export default Home;
