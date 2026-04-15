import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import { ChevronRight, LayoutGrid } from 'lucide-react';

const CategoryNav = () => {
  const { data: categories } = useCategories();

  return (
    <nav className="bg-white border-b border-nest-border hidden sm:block shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center h-12 gap-8 overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-2 px-4 py-1.5 bg-nest-primary text-white rounded-lg font-bold text-xs whitespace-nowrap flex-shrink-0 hover:bg-nest-primary-hover transition-colors">
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
                ${isActive ? 'text-nest-primary' : 'text-nest-text hover:text-nest-primary'}
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
