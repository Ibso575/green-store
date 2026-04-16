import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

const SuccessPage = () => {

  useEffect(() => {
    // Basic native confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

     // Try calling confetti if available via simple window script, but since we don't have it installed natively, we'll just rely on CSS
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 font-heading px-4">
      <div className="bg-white p-6 sm:p-10 md:p-16 rounded-[32px] shadow-sm border border-slate-100 max-w-lg w-full text-center flex flex-col items-center relative overflow-hidden group">
        
        {/* Animated Checkmark */}
        <div className="relative mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce-short">
                <CheckCircle className="w-12 h-12 text-[#3BB77E] animate-scale-in" />
            </div>
            
            {/* Sparkles / Particles */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                 <div className="absolute top-1 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
                 <div className="absolute bottom-2 right-1 w-3 h-3 bg-nest-primary rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                 <div className="absolute top-4 right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          Thank You!
        </h1>
        
        <p className="text-slate-500 font-medium leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          Your order has been successfully placed. We've sent a confirmation email with your order details.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <Link to="/shop" className="flex-1 bg-[#3BB77E] hover:bg-[#2e9c68] text-white py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-green-500/20">
               <ShoppingBag className="w-5 h-5" /> Continue Shopping
            </Link>
            <Link to="/" className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95">
               Go to Home <ArrowRight className="w-4 h-4" />
            </Link>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
         @keyframes scale-in {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
         }
         @keyframes bounce-short {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
            60% { transform: translateY(-10px); }
         }
         @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
         }
         .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
         .animate-bounce-short { animation: bounce-short 1s ease-in-out; }
         .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
      `}} />
    </div>
  );
};

export default SuccessPage;
