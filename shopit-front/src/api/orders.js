import api from './axios';
import { API_ENDPOINTS } from './config';

export const orderService = {
  // 주문 생성
  createOrder: async (orderData) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.ORDERS.BASE, orderData);
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '주문 생성에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // 주문 목록 조회
  getOrders: async (userEmail) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.ORDERS.BASE, {
        params: { userEmail }
      });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '주문 내역을 불러오는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // 주문 상세 조회
  getOrder: async (orderId) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.ORDERS.DETAIL(orderId));
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '주문 상세 정보를 불러오는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  }
}; 