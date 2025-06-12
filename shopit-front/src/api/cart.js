import api from './axios';
import { API_ENDPOINTS } from './config';
import useUserStore from '../store/userStore';

export const cartService = {
  // 장바구니에 상품 추가
  addToCart: async (productId, productName, price) => {
    const { user } = useUserStore.getState();
    if (!user) {
      throw new Error('로그인이 필요한 서비스입니다.');
    }

    try {
      // 상품 정보 가져오기
      const { data: product } = await api.get(`${API_ENDPOINTS.PRODUCTS.BASE}/${productId}`);
      
      const cartItems = await cartService.getCartItems();
      const existingItem = cartItems.find(item => item.productId === productId);

      if (existingItem) {
        // 이미 장바구니에 있는 상품이면 수량만 증가
        const { data } = await api.patch(API_ENDPOINTS.CART.UPDATE(existingItem.id), {
          quantity: existingItem.quantity + 1,
          updatedAt: new Date().toISOString()
        });
        return data;
      } else {
        // 새로운 상품이면 추가
        const { data } = await api.post(API_ENDPOINTS.CART.BASE, {
          productId,
          productName,
          price,
          image: product.image, // 상품의 이미지 URL 저장
          email: user.email,
          quantity: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        return data;
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '장바구니에 상품을 추가하는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // 장바구니 상품 목록 조회
  getCartItems: async () => {
    const { user } = useUserStore.getState();
    if (!user) {
      throw new Error('로그인이 필요한 서비스입니다.');
    }

    try {
      const { data } = await api.get(API_ENDPOINTS.CART.BASE, {
        params: { email: user.email }
      });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '장바구니 상품을 불러오는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // 장바구니 상품 수량 수정
  updateCartItemQuantity: async (cartItemId, quantity) => {
    const { user } = useUserStore.getState();
    if (!user) {
      throw new Error('로그인이 필요한 서비스입니다.');
    }

    try {
      const { data } = await api.patch(API_ENDPOINTS.CART.UPDATE(cartItemId), {
        quantity,
        updatedAt: new Date().toISOString()
      });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '장바구니 상품 수량을 수정하는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // 장바구니 상품 삭제
  removeFromCart: async (cartItemId) => {
    const { user } = useUserStore.getState();
    if (!user) {
      throw new Error('로그인이 필요한 서비스입니다.');
    }

    try {
      await api.delete(API_ENDPOINTS.CART.DELETE(cartItemId));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '장바구니 상품을 삭제하는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },
}; 