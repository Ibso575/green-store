import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { ChevronRight, LayoutGrid } from 'lucide-react';

const CategoryNav = () => {
  const { data: categories } = useCategories();

  return (
    <nav className="bg-white border-b border-slate-100 hidden sm:block sticky top-20 z-40 shadow-sm shadow-slate-900/5">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-12 gap-8 overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-2 px-4 py-1.5 bg-primary text-white rounded-lg font-bold text-xs whitespace-nowrap flex-shrink-0">
          <LayoutGrid className="w-3.5 h-3.5" />
          Barcha bo'limlar
        </button>
        
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          {categories?.slice(0, 10).map((cat) => (
            <NavLink
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={({ isActive }) => `
                text-[13px] font-bold whitespace-nowrap transition-colors
                ${isActive ? 'text-primary' : 'text-slate-500 hover:text-primary'}
              `}
            >
              {cat.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;
