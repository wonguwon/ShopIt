import { API_ENDPOINTS } from './config';
import axiosInstance from './axios';

export const getProducts = async () => {
  try {
    const { data } = await axiosInstance.get(API_ENDPOINTS.PRODUCTS);
    return data;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const { data } = await axiosInstance.get(API_ENDPOINTS.PRODUCT_DETAIL(id));
    return data;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
}; 