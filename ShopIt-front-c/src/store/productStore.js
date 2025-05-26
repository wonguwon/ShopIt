import { create } from 'zustand';
import { getProducts, getProduct } from '../api/products';

const useProductStore = create((set, get) => ({
  // 상태
  currentProduct: null,
  loading: false,
  error: null,

  // 액션
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // 단일 상품 조회
  fetchProduct: async (id) => {
    try {
      set({ loading: true, error: null });
      const product = await getProduct(id);
      set({ 
        currentProduct: product,
        loading: false 
      });
    } catch (error) {
      set({ 
        error: '상품 정보를 불러오는데 실패했습니다.',
        loading: false 
      });
      console.error('Error fetching product:', error);
    }
  },

  // 상품 초기화
  resetProduct: () => set({ currentProduct: null }),
}));

export default useProductStore; 