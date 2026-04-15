import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-[15px] overflow-hidden border border-nest-border p-5 flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-gray-200 aspect-square rounded-[10px] mb-4"></div>
      
      {/* Category Skeleton */}
      <div className="h-3 bg-gray-200 rounded-full w-20 mb-3"></div>
      
      {/* Title Skeleton */}
      <div className="h-5 bg-gray-200 rounded-full w-full mb-2"></div>
      <div className="h-5 bg-gray-200 rounded-full w-2/3 mb-4"></div>
      
      {/* Rating Skeleton */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
        ))}
        <div className="w-8 h-3 bg-gray-200 rounded-full ml-2"></div>
      </div>
      
      {/* Brand/Author Skeleton */}
      <div className="h-3 bg-gray-200 rounded-full w-24 mb-4"></div>
      
      {/* Price and Button Skeleton */}
      <div className="mt-auto flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 rounded-full w-12"></div>
          <div className="h-4 bg-gray-200 rounded-full w-10 mt-1"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-[4px] w-20"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
