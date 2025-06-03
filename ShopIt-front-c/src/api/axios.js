import axios from 'axios';
import { API_CONFIG } from './config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    // 토큰이 있다면 헤더에 추가
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 서버가 응답을 반환한 경우
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // 인증 에러 처리
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('접근 권한이 없습니다.');
          break;
        case 404:
          console.error('요청한 리소스를 찾을 수 없습니다.');
          break;
        case 500:
          console.error('서버 에러가 발생했습니다.');
          break;
        default:
          console.error('API Error:', data);
      }
    } else if (error.request) {
      // 요청이 전송되었지만 응답을 받지 못한 경우
      console.error('Network Error:', error.request);
    } else {
      // 요청 설정 중에 오류가 발생한 경우
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api; 