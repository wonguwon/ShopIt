import api from './axios';
import { API_ENDPOINTS } from './config';

export const productService = {
  // 상품 목록 조회
  getProducts: async (params) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.PRODUCTS.BASE, { params });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '상품 목록을 불러오는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // 상품 상세 조회
  getProductDetail: async (id) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.PRODUCTS.DETAIL(id));
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '상품 상세 정보를 불러오는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // 상품 검색
  searchProducts: async (query) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.PRODUCTS.SEARCH(query));
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '상품 검색에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // 카테고리별 상품 조회
  getProductsByCategory: async (category) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.PRODUCTS.CATEGORY(category));
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '카테고리별 상품을 불러오는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  }
}; 