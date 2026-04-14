import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { updateQuantity, removeItem } from '../store/cartSlice';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
           <ShoppingBag className="w-10 h-10 text-slate-200" />
        </div>
        <h2 className="text-3xl font-black mb-4 tracking-tight">Саватингиз ҳозирча бўш</h2>
        <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto italic">
          Маҳсулотларни танланг ва уларни саватга қўшинг. Сизнинг танловингиз шу ерда пайдо бўлади.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-[20px] font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Харидларни бошлаш
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-slate-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Харид савати</h1>
          <p className="text-slate-400 text-xs font-bold uppercase mt-2 tracking-widest">
            Сиз {cartItems.length} та маҳсулот танладингиз
          </p>
        </div>
        <Link to="/" className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
           <ArrowLeft className="w-4 h-4" />
           Танлашда давом этиш
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white p-6 rounded-[32px] flex flex-col sm:flex-row gap-6 items-center border border-slate-100 shadow-sm hover:border-primary/20 transition-all"
            >
              <div className="w-40 h-40 bg-slate-50 rounded-[28px] p-4 flex-shrink-0 flex items-center justify-center border border-slate-50 group-hover:bg-white transition-colors">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              
              <div className="flex-grow flex flex-col justify-between h-full py-2 space-y-4 sm:space-y-0 text-center sm:text-left">
                <div>
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">{item.title}</h3>
                  <p className="text-primary font-bold text-sm uppercase tracking-widest mt-1">
                    {item.category}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Нархи</span>
                    <span className="text-xl font-black text-slate-900">${item.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-primary transition-colors hover:bg-primary/5"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-10 text-center font-black text-slate-900">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:text-primary transition-colors hover:bg-primary/5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Жами</span>
                    <span className="text-xl font-black text-primary tracking-tighter">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="p-4 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all self-center shadow-sm sm:shadow-none hover:shadow-rose-100"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-900/5 sticky top-32 space-y-8">
            <h2 className="text-2xl font-black tracking-tight">Буюртма тафсилоти</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-bold text-slate-500">
                <span>Маҳсулотлар жами</span>
                <span className="text-slate-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-500">
                <span>Етказиб бериш</span>
                <span className="text-primary uppercase tracking-widest text-[10px]">Бепул</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-500 pb-4">
                <span>Чегирма</span>
                <span className="text-rose-500">-$0.00</span>
              </div>
              <div className="border-t-2 border-dashed border-slate-100 pt-6 flex justify-between items-end">
                <span className="text-lg font-black text-slate-900">Жами тўлов</span>
                <span className="text-4xl font-black text-primary tracking-tighter">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4">
               <button className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-lg shadow-2xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                 Ориятга олиш
                 <ArrowLeft className="w-5 h-5 rotate-180" />
               </button>
               <p className="text-[10px] text-slate-400 text-center mt-4 font-bold uppercase tracking-widest leading-relaxed">
                 Тугмани босиш билан сиз бизнинг <br /> <span className="text-primary cursor-pointer hover:underline">фойдаланиш шартларимизга</span> рози бўласиз.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
