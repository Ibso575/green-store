import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

export const fetchProducts = async (params = {}) => {
  const { category, search, limit = 20, skip = 0 } = params;
  let url = '/products';
  
  if (category) {
    url = `/products/category/${category}`;
  } else if (search) {
    url = `/products/search?q=${search}`;
  }

  const response = await api.get(url, { params: { limit, skip } });
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchComments = async () => {
  const response = await api.get('/comments');
  return response.data;
};

export default api;
