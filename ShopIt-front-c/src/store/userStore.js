import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand를 사용한 사용자 상태 관리 스토어
 * persist 미들웨어를 사용하여 로컬 스토리지에 상태 유지
 */
const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      /**
       * 로그인 처리
       * @param {Object} userData - 사용자 정보 (id, email, username 등)
       */
      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
        });
      },

      /**
       * 로그아웃 처리
       * 사용자 정보와 인증 상태를 초기화
       */
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      /**
       * 사용자 정보 업데이트
       * @param {Object} userData - 업데이트할 사용자 정보
       */
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
    }),
    {
      name: 'user-storage', // 로컬 스토리지에 저장될 키 이름
      partialize: (state) => ({
        // 저장할 상태 선택 (user와 isAuthenticated만 저장)
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useUserStore;
