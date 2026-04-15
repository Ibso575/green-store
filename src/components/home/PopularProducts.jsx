import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../ProductCard';
import ProductSkeleton from '../ProductSkeleton';

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const categories = ["All", "Milks & Dairies", "Coffee & Teas", "Pet Foods", "Meats", "Vegetables", "Fruits"];

const PopularProducts = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { data, isLoading } = useProducts({ category: 'groceries', limit: 10 });

  return (
    <section className="container-custom py-10 font-heading">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <h2 className="text-3xl font-bold text-nest-dark">Popular Products</h2>
        
        <div className="flex flex-wrap items-center gap-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-[15px] font-bold transition-colors ${
                activeTab === cat ? 'text-nest-primary' : 'text-nest-dark hover:text-nest-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {[...Array(10)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
        >
          {data?.products?.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default PopularProducts;
