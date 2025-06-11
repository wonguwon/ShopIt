import api from './axios';
import { API_ENDPOINTS } from './config';

export const userService = {
  // 회원가입
  signUp: async (userData) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.USERS.BASE, {
        email: userData.email,
        password: userData.password,
        username: userData.username,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '회원가입에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // 이메일 중복 체크
  checkEmailDuplicate: async (email) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.USERS.CHECK_EMAIL(email));
      return data.length > 0;
    } catch (error) {
      if (error.response) {
        console.error('이메일 중복 체크 서버 에러:', error.response.data);
      } else {
        console.error('이메일 중복 체크 네트워크 에러:', error.message);
      }
      return false;
    }
  },

  // 로그인
  login: async (email, password) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.USERS.LOGIN(email, password));
      return data[0]; // 이메일은 유니크하므로 첫 번째 결과만 반환
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '로그인에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // 프로필 수정
  updateProfile: async (email, newUserData) => {
    try {
      const { data } = await api.patch(API_ENDPOINTS.USERS.EDIT(email), newUserData);
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '프로필 수정에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // 회원 탈퇴
  deleteAccount: async (email) => {
    try {
      await api.delete(API_ENDPOINTS.USERS.DELETE(email));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '회원 탈퇴에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },
};
