import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProducts';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { ShoppingCart, Star, ArrowLeft, ShieldCheck, Truck, RefreshCcw, Heart, Share2 } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProductDetail(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBuyNow = () => {
    dispatch(addItem(product));
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-100 aspect-square rounded-[40px]" />
          <div className="space-y-6">
            <div className="h-8 bg-slate-100 rounded-full w-2/3" />
            <div className="h-4 bg-slate-100 rounded-full w-full" />
            <div className="h-12 bg-slate-100 rounded-2xl w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div className="text-center py-20 font-bold">Маҳсулот топилмади</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-12 font-black text-xs uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" />
        Ортга қайтиш
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
        {/* Gallery Area */}
        <div className="space-y-6">
          <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-sm flex items-center justify-center aspect-square overflow-hidden relative group">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-8 right-8 flex flex-col gap-3">
               <button className="p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl text-slate-400 hover:text-rose-500 transition-all"><Heart className="w-5 h-5" /></button>
               <button className="p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl text-slate-400 hover:text-primary transition-all"><Share2 className="w-5 h-5" /></button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.slice(0, 4).map((img, i) => (
              <div key={i} className="bg-white p-2 border-2 border-slate-50 rounded-3xl overflow-hidden aspect-square hover:border-primary/30 transition-colors cursor-pointer">
                <img src={img} alt="" className="w-full h-full object-cover rounded-2xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Info Area */}
        <div className="space-y-8 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.3em]">
              <span>{product.brand || 'Premium'}</span>
              <div className="h-4 w-[1px] bg-primary/20" />
              <span>{product.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 rounded-2xl text-yellow-700 font-black text-sm border border-yellow-100">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {product.rating}
              </div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">100+ Шарҳлар</span>
            </div>
          </div>

          <p className="text-slate-500 leading-relaxed text-lg font-medium border-l-4 border-slate-100 pl-6 py-2">
            {product.description}
          </p>

          <div className="bg-slate-50 p-8 rounded-[40px] space-y-6">
            <div className="flex items-end gap-4">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">${product.price}</span>
              <div className="flex flex-col mb-1">
                 <span className="text-primary font-black text-xs uppercase tracking-widest">Тежамкорлик: {Math.round(product.discountPercentage)}%</span>
                 <span className="text-slate-400 line-through text-sm font-bold">
                   ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                 </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => dispatch(addItem(product))}
                className="px-12 py-5 bg-primary text-white rounded-[24px] font-black flex-grow hover:bg-primary-dark transition-all shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-95 text-lg"
              >
                <ShoppingCart className="w-6 h-6" />
                Саватга қўшиш
              </button>
              <button 
                onClick={handleBuyNow}
                className="px-12 py-5 bg-slate-900 text-white rounded-[24px] font-black hover:bg-slate-800 transition-colors shadow-2xl shadow-slate-900/10"
              >
                Ҳозироқ сотиб олиш
              </button>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 px-4">
            {[
               { icon: Truck, title: 'Тезкор етказиш', desc: '2 соат ичида' },
               { icon: ShieldCheck, title: 'Сифат кафолати', desc: '100% Табиий' },
               { icon: RefreshCcw, title: 'Қайтариш', desc: '24 соат ичида' },
            ].map((prop, i) => (
              <div key={i} className="flex flex-col gap-2">
                 <prop.icon className="w-6 h-6 text-primary" />
                 <p className="font-black text-slate-800 text-xs uppercase tracking-wider">{prop.title}</p>
                 <p className="text-[10px] text-slate-400 font-bold">{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-32 space-y-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Мижозлар фикрлари</h2>
            <p className="text-slate-400 text-sm font-bold mt-1 uppercase tracking-widest">Ҳалол ва шаффоф баҳолаш</p>
          </div>
          <button className="px-6 py-3 border-2 border-slate-100 rounded-2xl font-black text-xs hover:border-primary/20 hover:text-primary transition-all">Фикр қолдириш</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {product.reviews?.map((review, i) => (
            <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-50 shadow-sm space-y-6 hover:shadow-xl hover:shadow-primary/5 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className={`w-3.5 h-3.5 ${idx < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-100'}`} />
                  ))}
                </div>
                <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <p className="text-slate-600 font-medium italic leading-relaxed text-sm">
                "{review.comment}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-primary text-xl shadow-inner uppercase">
                  {review.reviewerName.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900 tracking-tight">{review.reviewerName}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Харидор</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
