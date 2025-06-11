import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      // 로그인
      login: (userData) => {
        set({
          user: {
            email: userData.email,
            username: userData.username,
            role: userData.role,
          },
          isAuthenticated: true,
        });
      },

      // 로그아웃
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      // 사용자 정보 업데이트
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },
    }),
    {
      name: 'user-storage', // localStorage에 저장될 키 이름
      storage: localStorage, // 기본은 localStorage (생략해도 됨)
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useUserStore;
