import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const BottomLists = () => {
  const { data: topSelling } = useProducts({ category: 'groceries', limit: 3, skip: 0 });
  const { data: trending } = useProducts({ category: 'groceries', limit: 3, skip: 3 });
  const { data: recentlyAdded } = useProducts({ category: 'groceries', limit: 3, skip: 6 });
  const { data: topRated } = useProducts({ category: 'groceries', limit: 3, skip: 9 });

  const columns = [
    { title: "Top Selling", products: topSelling?.products },
    { title: "Trending Products", products: trending?.products },
    { title: "Recently added", products: recentlyAdded?.products },
    { title: "Top Rated", products: topRated?.products }
  ];

  return (
    <section className="container-custom py-14 font-heading">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
        {columns.map((col, i) => (
          <div key={i} className="space-y-8">
            <div className="relative pb-4">
              <h3 className="text-xl font-bold text-nest-dark">{col.title}</h3>
              <div className="absolute bottom-0 left-0 w-20 h-0.5 bg-nest-primary/30">
                <div className="w-10 h-full bg-nest-primary"></div>
              </div>
            </div>

            <div className="space-y-6">
              {col.products?.map((product) => (
                <div key={product.id} className="flex gap-4 group">
                  <div className="w-24 h-24 bg-gray-50 rounded-[10px] overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.thumbnail} 
                        alt={product.title} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <Link to={`/product/${product.id}`}>
                      <h4 className="font-bold text-nest-dark text-[15px] leading-tight hover:text-nest-primary transition-colors line-clamp-2">
                        {product.title}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-nest-yellow text-nest-yellow' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-nest-primary font-bold">${product.price}</span>
                       <span className="text-nest-text text-sm line-through opacity-50">${(product.price * 1.2).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BottomLists;
