import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import ProductCard from '../components/ProductCard';
import { Search, Filter, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('q') || '';
  
  const [page, setPage] = useState(1);
  const limit = 12;
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync state if URL search param changes (e.g. from Header search)
  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q !== searchTerm) {
      setSearchTerm(q);
      setSearchInput(q);
      setSelectedCategory('');
    }
  }, [searchParams]);

  // When filters change, reset array page to 1
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory]);

  const { data: categoriesData } = useCategories();
  
  // Custom API wrapper we created requires these params
  const { data: productsData, isLoading } = useProducts({ 
    limit, 
    skip: (page - 1) * limit, 
    category: selectedCategory, 
    search: searchTerm 
  });

  const totalProducts = productsData?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchInput.trim()) {
      setSearchParams({ q: searchInput });
    } else {
      setSearchParams({});
    }
    setSearchTerm(searchInput);
    setSelectedCategory(''); // Reset category when searching
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSearchTerm(''); // Reset search when clicking category
    setSearchInput('');
    setSearchParams({}); // clear URL params when selecting category
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12 font-heading">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-xl shadow-sm mb-4">
             <span className="font-bold text-nest-dark">Filter Products</span>
             <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="p-2 bg-nest-primary/10 text-nest-primary rounded-md">
                <Filter className="w-5 h-5" />
             </button>
          </div>

          {/* Left Sidebar - Filters */}
          <div className={`w-full lg:w-[25%] flex-shrink-0 lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-[15px] p-6 border border-nest-border shadow-sm sticky top-24">
               {/* Search */}
               <div className="mb-8">
                 <h3 className="text-[17px] font-bold text-nest-dark mb-4 border-b border-nest-border pb-3">Search</h3>
                 <form onSubmit={handleSearchSubmit} className="relative">
                   <input 
                     type="text" 
                     placeholder="Search products..." 
                     value={searchInput}
                     onChange={(e) => setSearchInput(e.target.value)}
                     className="w-full bg-[#f8f9fa] border border-transparent focus:border-nest-primary focus:bg-white px-4 py-3 rounded-[5px] text-[13px] outline-none transition-colors pr-10"
                   />
                   <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-nest-primary">
                     <Search className="w-4 h-4" />
                   </button>
                 </form>
               </div>

               {/* Categories */}
               <div>
                 <h3 className="text-[17px] font-bold text-nest-dark mb-4 border-b border-nest-border pb-3 relative">
                   Category
                   <span className="absolute bottom-[-1px] left-0 w-12 h-[2px] bg-nest-primary"></span>
                 </h3>
                 
                 <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto pr-2 category-scrollbar">
                   <button 
                      onClick={() => handleCategorySelect('')}
                      className={`flex items-center justify-between p-2 rounded-[5px] transition-colors text-[14px] font-bold ${!selectedCategory ? 'bg-nest-primary/10 text-nest-primary' : 'text-nest-dark hover:bg-slate-50'}`}
                    >
                      All Categories
                    </button>
                   {categoriesData?.map((cat) => {
                     const catName = typeof cat === 'string' ? cat : cat.slug; // Handle different dummyjson formats
                     const catLabel = typeof cat === 'string' ? cat : cat.name;
                     const isSelected = selectedCategory === catName;
                     
                     return (
                        <button 
                          key={catName}
                          onClick={() => handleCategorySelect(catName)}
                          className={`flex items-center justify-between p-2 rounded-[5px] transition-colors text-[14px] font-bold ${isSelected ? 'bg-nest-primary/10 text-nest-primary' : 'text-nest-dark hover:bg-slate-50 hover:text-nest-primary'}`}
                        >
                          <span className="capitalize">{catLabel.replace('-', ' ')}</span>
                        </button>
                     );
                   })}
                 </div>
               </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-[75%] flex flex-col">
             
             {/* Top Bar */}
             <div className="bg-white rounded-[15px] p-4 flex flex-col sm:flex-row sm:items-center justify-between border border-nest-border shadow-sm mb-6 gap-4">
                <div className="text-[14px] text-nest-text font-bold">
                   We found <span className="text-nest-primary">{totalProducts}</span> items for you!
                </div>
                {/* Visual dropdown just for design completion based on image, functionality not tied to backend yet */}
                <div className="flex items-center gap-2">
                   <span className="text-[14px] text-nest-text font-bold">Sort By :</span>
                   <select className="border border-nest-border rounded-[4px] px-3 py-2 text-[13px] font-bold text-nest-dark outline-none focus:border-nest-primary cursor-pointer">
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                   </select>
                </div>
             </div>

             {/* Active Filters Display */}
             {(searchTerm || selectedCategory) && (
               <div className="flex items-center gap-2 mb-6 flex-wrap">
                  <span className="text-[13px] font-bold text-nest-text">Active Filters:</span>
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1.5 bg-nest-primary/10 text-nest-primary px-3 py-1 rounded-full text-[12px] font-bold">
                       Search: {searchTerm}
                       <X className="w-3 h-3 cursor-pointer hover:text-nest-red" onClick={() => { setSearchTerm(''); setSearchInput(''); setSearchParams({}); }} />
                    </span>
                  )}
                  {selectedCategory && (
                    <span className="inline-flex items-center gap-1.5 bg-nest-primary/10 text-nest-primary px-3 py-1 rounded-full text-[12px] font-bold">
                       Category: {selectedCategory.replace('-', ' ')}
                       <X className="w-3 h-3 cursor-pointer hover:text-nest-red" onClick={() => {setSelectedCategory(''); setSearchParams({});}} />
                    </span>
                  )}
               </div>
             )}

             {/* Products Grid */}
             {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 animate-pulse">
                   {[...Array(limit)].map((_, i) => (
                      <div key={i} className="bg-white rounded-[15px] h-[350px] border border-nest-border"></div>
                   ))}
                </div>
             ) : productsData?.products?.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6">
                   {productsData.products.map(product => (
                      <ProductCard key={product.id} product={product} />
                   ))}
                </div>
             ) : (
                <div className="bg-white rounded-[15px] p-12 flex flex-col items-center justify-center border border-nest-border text-center">
                   <h3 className="text-xl font-bold text-nest-dark mb-2">No products found</h3>
                   <p className="text-nest-text max-w-md">Try checking your spelling or use more general terms.</p>
                   <button 
                     onClick={() => { setSearchTerm(''); setSelectedCategory(''); setSearchInput(''); setSearchParams({}); }} 
                     className="mt-6 bg-nest-primary text-white px-6 py-2.5 rounded-[4px] font-bold text-[14px] hover:bg-nest-primary-hover transition-colors"
                   >
                     Clear Filters
                   </button>
                </div>
             )}

             {/* Pagination */}
             {totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                   <div className="flex items-center gap-2">
                     <button 
                        disabled={page === 1}
                        onClick={() => setPage(prev => Math.max(1, prev - 1))}
                        className={`flex items-center gap-1 px-4 py-2 rounded-full font-bold text-[14px] transition-all ${page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-nest-text hover:text-nest-primary hover:bg-nest-primary/5'}`}
                     >
                        <ChevronLeft className="w-4 h-4" /> Previous
                     </button>

                     <div className="flex items-center gap-1.5">
                       {[...Array(totalPages)].map((_, i) => {
                         const pageNum = i + 1;
                         // Show current, first, last, and pages adjacent to current
                         const shouldShow = pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - page) <= 1;
                         const isCurrent = page === pageNum;

                         if (!shouldShow) {
                            if (pageNum === 2 || pageNum === totalPages - 1) return <span key={pageNum} className="text-gray-400">...</span>;
                            return null;
                         }

                         return (
                            <button
                               key={pageNum}
                               onClick={() => setPage(pageNum)}
                               className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all ${isCurrent ? 'bg-nest-primary text-white shadow-md' : 'text-nest-text hover:bg-nest-primary/10 hover:text-nest-primary'}`}
                            >
                               {pageNum}
                            </button>
                         )
                       })}
                     </div>

                     <button 
                        disabled={page === totalPages}
                        onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                        className={`flex items-center gap-1 px-4 py-2 rounded-full font-bold text-[14px] transition-all ${page === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-nest-text hover:text-nest-primary hover:bg-nest-primary/5'}`}
                     >
                        Next <ChevronRight className="w-4 h-4" />
                     </button>
                   </div>
                </div>
             )}

          </div>
        </div>
      </div>
      
      {/* Custom Styles for scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .category-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .category-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
          border-radius: 4px;
        }
        .category-scrollbar::-webkit-scrollbar-thumb {
          background: #3BB77E; 
          border-radius: 4px;
        }
      `}} />
    </div>
  );
};

export default ShopPage;
