import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductById } from '../api/api';

export const useProducts = (params) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
  });
};

export const useProductDetail = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
};
