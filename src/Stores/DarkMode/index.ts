import create from 'zustand';
import { IsDarkModeType } from './type';

const useDarkModeStore = create<IsDarkModeType>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));

export default useDarkModeStore;
