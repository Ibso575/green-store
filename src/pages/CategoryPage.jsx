import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { ArrowLeft, Filter, SlidersHorizontal } from 'lucide-react';

const CategoryPage = () => {
  const { slug } = useParams();
  const { data, isLoading } = useProducts({ category: slug });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 min-h-screen">
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-10">
        <div className="space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-black text-[10px] uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3.5 h-3.5" />
            Бош саҳифа
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 capitalize tracking-tight leading-tight">
            {slug?.replace(/-/g, ' ')}
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-widest">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl shadow-lg shadow-slate-900/10">
            <Filter className="w-3.5 h-3.5" />
            Фильтр
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-500 rounded-xl hover:text-primary hover:border-primary/20 transition-all cursor-pointer">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Саралаш
          </div>
          <span className="text-slate-300 ml-2">{data?.total || 0} маҳсулот</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <div key={i} className="bg-slate-50 aspect-[3/4] rounded-[32px] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
          {data?.products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {data?.products?.length === 0 && (
            <div className="col-span-full py-32 text-center space-y-4">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                 <Filter className="w-8 h-8 text-slate-200" />
               </div>
               <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Бу бўлимда ҳозирча маҳсулотлар йўқ</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
