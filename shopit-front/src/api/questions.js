import api from './axios';
import { API_ENDPOINTS } from './config';

export const questionService = {
  // QnA 게시글 목록 조회
  getQuestions: async (search = '') => {
    try {
      const params = new URLSearchParams();
      if (search) {
        params.append('q', search);
      }

      const { data } = await api.get(API_ENDPOINTS.QUESTIONS.BASE, { params });
      return {
        data
      };
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '게시글을 불러오는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // QnA 게시글 상세 조회
  getQuestion: async (id) => {
    try {
      const { data } = await api.get(API_ENDPOINTS.QUESTIONS.DETAIL(id));
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '게시글을 불러오는데 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // QnA 게시글 작성
  createQuestion: async (questionData) => {
    try {
      const { data } = await api.post(API_ENDPOINTS.QUESTIONS.BASE, questionData);
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '게시글 작성에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // QnA 게시글 수정
  updateQuestion: async (id, questionData) => {
    try {
      const { data } = await api.put(API_ENDPOINTS.QUESTIONS.UPDATE(id), questionData);
      return data;
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '게시글 수정에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  },

  // QnA 게시글 삭제
  deleteQuestion: async (id) => {
    try {
      await api.delete(API_ENDPOINTS.QUESTIONS.DELETE(id));
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.message || '게시글 삭제에 실패했습니다.';
        throw new Error(errorMessage);
      }
      throw new Error('서버와의 통신에 실패했습니다.');
    }
  }
}; 