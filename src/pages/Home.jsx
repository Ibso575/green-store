import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useQuery } from '@tanstack/react-query';
import { fetchComments } from '../api/api';
import ProductCard from '../components/ProductCard';
import { NavLink, Link } from 'react-router-dom';
import { ArrowRight, Zap, Star } from 'lucide-react';

const Home = () => {
  const { data: productsData, isLoading: productsLoading } = useProducts({ limit: 12 });
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  const { data: commentsData } = useQuery({ queryKey: ['comments'], queryFn: fetchComments });

  // Popular grocery categories for icons
  const homeCategories = categoriesData?.slice(0, 8) || [];

  return (
    <div className="space-y-12 pb-0">
      {/* Hero Section - Refined */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="relative rounded-[40px] overflow-hidden bg-primary/5 h-[350px] md:h-[450px]">
            <div className="absolute inset-0 flex items-center px-8 md:px-20 z-10">
              <div className="max-w-xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full text-primary text-[10px] font-black uppercase tracking-widest shadow-sm">
                  <Zap className="w-3 h-3 fill-primary" />
                  Eнг яхши таклифлар
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-slate-800 leading-tight">
                  Сабзавотлар <br /> ва <span className="text-primary tracking-tighter">Мевалар</span>
                </h1>
                <p className="text-sm md:text-lg text-slate-500 font-medium max-w-sm">
                  Кунлик янги ва сервитамин маҳсулотларни ҳамёнбоп нархларда харид қилинг.
                </p>
                <div className="pt-2">
                  <button className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95">
                    Ҳозироқ харид қилиш
                  </button>
                </div>
              </div>
            </div>
            
            {/* Visual element placeholder (representing a fresh food image) */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-primary/10 to-transparent flex items-center justify-center p-20 hidden lg:flex">
              <div className="w-full h-full bg-slate-200/50 rounded-[40px] animate-pulse flex items-center justify-center text-slate-400 font-black italic text-2xl rotate-3 border-4 border-dashed border-slate-300">
                Fresh Produce Image
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid - Refined */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Маркет тоифалари</h2>
          <Link to="/" className="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
            Ҳаммасини кўриш <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
          {categoriesLoading ? (
             [1,2,3,4,5,6,7,8].map(i => <div key={i} className="aspect-square bg-slate-100 rounded-[32px] animate-pulse" />)
          ) : (
            homeCategories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-full aspect-square bg-white border border-slate-100 rounded-[32px] flex items-center justify-center group-hover:bg-primary/5 group-hover:border-primary/20 transition-all shadow-sm group-hover:shadow-xl group-hover:shadow-primary/5">
                  <span className="text-3xl grayscale group-hover:grayscale-0 transition-opacity">🛒</span>
                </div>
                <span className="text-xs font-black text-slate-800 tracking-tight text-center line-clamp-1 truncate w-full px-2">
                   {cat.name}
                </span>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Product Grid - Refined */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Янги маҳсулотлар</h2>
            <p className="text-slate-400 text-xs font-medium uppercase mt-1 tracking-widest">Куннинг энг саралари</p>
          </div>
          <div className="flex gap-2">
             <button className="p-2.5 bg-white border border-slate-200 rounded-xl hover:text-primary transition-colors hover:border-primary/20 shadow-sm"><Zap className="w-4 h-4" /></button>
          </div>
        </div>
        
        {productsLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
              <div key={i} className="bg-slate-50 aspect-[3/4] rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 md:gap-8">
            {productsData?.products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Testimonials */}
      {commentsData?.comments && (
        <section className="bg-slate-900 py-24 mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20 space-y-4">
              <span className="text-primary font-black uppercase text-[10px] tracking-widest bg-primary/10 px-4 py-2 rounded-full">Testimonials</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Мижозларимиз фикрлари</h2>
              <p className="text-slate-400 font-medium">Ҳар куни минглаб оилалар бизнинг хизматимиздан мамнун.</p>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar scroll-smooth">
              {commentsData.comments.slice(0, 10).map((comment) => (
                <div key={comment.id} className="min-w-[320px] bg-white/[0.03] backdrop-blur-xl p-8 rounded-[40px] space-y-6 border border-white/10 hover:border-white/20 transition-all group">
                  <div className="flex items-center gap-1 text-primary">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < 4 ? 'fill-primary' : ''}`} />
                    ))}
                  </div>
                  <p className="text-white/80 font-medium leading-relaxed italic text-sm">"{comment.body}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black text-lg border-2 border-white/10 group-hover:rotate-6 transition-transform">
                      {comment.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">{comment.user.username}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Мамнун мижоз</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
