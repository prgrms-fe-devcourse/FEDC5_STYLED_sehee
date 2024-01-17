import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IsDarkModeType } from './type';
import { SESSION_STORAGE } from '@/Constants/storage';

const useDarkModeStore = create(
  persist<IsDarkModeType>(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: SESSION_STORAGE.THEME_MODE,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useDarkModeStore;
